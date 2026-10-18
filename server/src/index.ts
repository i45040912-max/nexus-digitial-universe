import 'dotenv/config'
import express, { type NextFunction, type Request, type Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { z, ZodError } from 'zod'

const app = express()
const prisma = new PrismaClient()
const PORT = Number(process.env.PORT || 4000)
const SECRET = process.env.JWT_SECRET
if (!SECRET || SECRET.length < 32) throw new Error('JWT_SECRET must contain at least 32 characters.')

const origins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',').map(x => x.trim())
app.disable('x-powered-by')
app.use(helmet())
app.use(cors({ origin(origin, cb) { if (!origin || origins.includes(origin)) return cb(null, true); cb(new Error('Origin is not allowed by CORS')) } }))
app.use(express.json({ limit: '1mb' }))

type AuthRequest = Request & { userId?: string }
function tokenFor(id: string) {
  return jwt.sign({}, SECRET!, { subject: id, expiresIn: '7d', issuer: 'nexus-api', audience: 'nexus-client' })
}
const safeUser = (u: {id:string; name:string; email:string; createdAt:Date}) => ({ id:u.id, name:u.name, email:u.email, createdAt:u.createdAt })
function auth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : ''
  if (!token) return res.status(401).json({ error: 'Требуется авторизация.' })
  try {
    const payload = jwt.verify(token, SECRET!, { issuer:'nexus-api', audience:'nexus-client' }) as jwt.JwtPayload
    if (!payload.sub) return res.status(401).json({ error:'Недействительный токен.' })
    req.userId = payload.sub
    next()
  } catch { return res.status(401).json({ error:'Сессия истекла. Войди снова.' }) }
}
const registerInput = z.object({
  name:z.string().trim().min(2).max(60),
  email:z.string().trim().email().max(254).transform(v=>v.toLowerCase()),
  password:z.string().min(8).max(72)
})
const loginInput = z.object({
  email:z.string().trim().email().max(254).transform(v=>v.toLowerCase()),
  password:z.string().min(1).max(72)
})
const projectInput = z.object({
  title:z.string().trim().min(1).max(120),
  description:z.string().max(2000).optional().default(''),
  status:z.enum(['IN_PROGRESS','PLANNING','COMPLETED']).optional().default('IN_PROGRESS'),
  color:z.enum(['violet','cyan','pink','green','orange']).optional().default('violet')
})
const taskInput = z.object({
  title:z.string().trim().min(1).max(160),
  description:z.string().max(3000).optional().default(''),
  completed:z.boolean().optional().default(false),
  priority:z.enum(['LOW','MEDIUM','HIGH']).optional().default('MEDIUM'),
  dueDate:z.string().datetime().nullable().optional()
})
const noteInput = z.object({
  title:z.string().trim().min(1).max(160),
  content:z.string().max(20000).optional().default(''),
  tags:z.array(z.string().trim().min(1).max(30)).max(12).optional().default([])
})

app.get('/api/health', (_req,res)=>res.json({status:'ok',service:'nexus-api',timestamp:new Date().toISOString()}))
app.post('/api/auth/register', async (req,res,next)=>{
  try {
    const data=registerInput.parse(req.body)
    if(await prisma.user.findUnique({where:{email:data.email}})) return res.status(409).json({error:'Аккаунт с этой почтой уже существует.'})
    const passwordHash=await bcrypt.hash(data.password,12)
    const user=await prisma.user.create({data:{name:data.name,email:data.email,passwordHash},select:{id:true,name:true,email:true,createdAt:true}})
    res.status(201).json({token:tokenFor(user.id),user:safeUser(user)})
  } catch(e){next(e)}
})
app.post('/api/auth/login', async (req,res,next)=>{
  try {
    const data=loginInput.parse(req.body)
    const user=await prisma.user.findUnique({where:{email:data.email}})
    if(!user || !(await bcrypt.compare(data.password,user.passwordHash))) return res.status(401).json({error:'Неверная почта или пароль.'})
    res.json({token:tokenFor(user.id),user:safeUser(user)})
  } catch(e){next(e)}
})
app.get('/api/auth/me',auth,async(req:AuthRequest,res,next)=>{
  try {
    const user=await prisma.user.findUnique({where:{id:req.userId!},select:{id:true,name:true,email:true,createdAt:true}})
    if(!user)return res.status(401).json({error:'Пользователь не найден.'})
    res.json({user:safeUser(user)})
  }catch(e){next(e)}
})
app.patch('/api/auth/me',auth,async(req:AuthRequest,res,next)=>{
  try {
    const {name}=z.object({name:z.string().trim().min(2).max(60)}).parse(req.body)
    const user=await prisma.user.update({where:{id:req.userId!},data:{name},select:{id:true,name:true,email:true,createdAt:true}})
    res.json({user:safeUser(user)})
  }catch(e){next(e)}
})

// Each resource is owner-scoped on the server. Client-supplied owner IDs are never accepted.
for (const resource of ['projects','tasks','notes'] as const) {
  const model = resource === 'projects' ? prisma.project : resource === 'tasks' ? prisma.task : prisma.note
  const schema = resource === 'projects' ? projectInput : resource === 'tasks' ? taskInput : noteInput
  app.get(`/api/${resource}`,auth,async(req:AuthRequest,res,next)=>{
    try { const items=await (model as any).findMany({where:{ownerId:req.userId},orderBy:{updatedAt:'desc'}}); res.json({items}) } catch(e){next(e)}
  })
  app.post(`/api/${resource}`,auth,async(req:AuthRequest,res,next)=>{
    try {
      const input=schema.parse(req.body) as any
      if(resource==='tasks' && input.dueDate) input.dueDate=new Date(input.dueDate)
      const item=await (model as any).create({data:{...input,ownerId:req.userId}})
      res.status(201).json({item})
    }catch(e){next(e)}
  })
  app.patch(`/api/${resource}/:id`,auth,async(req:AuthRequest,res,next)=>{
    try {
      const input=schema.partial().parse(req.body) as any
      if(resource==='tasks' && input.dueDate !== undefined) input.dueDate=input.dueDate ? new Date(input.dueDate) : null
      const result=await (model as any).updateMany({where:{id:req.params.id,ownerId:req.userId},data:input})
      if(!result.count)return res.status(404).json({error:'Запись не найдена.'})
      const item=await (model as any).findFirst({where:{id:req.params.id,ownerId:req.userId}})
      res.json({item})
    }catch(e){next(e)}
  })
  app.delete(`/api/${resource}/:id`,auth,async(req:AuthRequest,res,next)=>{
    try {
      const result=await (model as any).deleteMany({where:{id:req.params.id,ownerId:req.userId}})
      if(!result.count)return res.status(404).json({error:'Запись не найдена.'})
      res.status(204).end()
    }catch(e){next(e)}
  })
}

app.use((err:unknown,_req:Request,res:Response,_next:NextFunction)=>{
  if(err instanceof ZodError) return res.status(400).json({error:'Проверь введённые данные.',details:err.issues.map(i=>({field:i.path.join('.'),message:i.message}))})
  if(err instanceof Error && err.message==='Origin is not allowed by CORS') return res.status(403).json({error:'Origin is not allowed.'})
  console.error(err)
  return res.status(500).json({error:'Внутренняя ошибка сервера.'})
})
const server=app.listen(PORT,()=>console.log(`NEXUS API listening on http://localhost:${PORT}`))
async function shutdown(){server.close();await prisma.$disconnect()}
process.on('SIGINT',shutdown)
process.on('SIGTERM',shutdown)
