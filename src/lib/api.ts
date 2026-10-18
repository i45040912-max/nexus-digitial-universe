const BASE=(import.meta.env.VITE_API_URL || 'http://localhost:4000/api').replace(/\/$/,'')
const TOKEN_KEY='nexus-auth-token'
export type User={id:string;name:string;email:string;createdAt:string}
export type ApiError=Error & {status?:number}
export const getToken=()=>localStorage.getItem(TOKEN_KEY)
export const setToken=(token:string|null)=>token?localStorage.setItem(TOKEN_KEY,token):localStorage.removeItem(TOKEN_KEY)

export async function apiRequest<T>(path:string,options:RequestInit={},authenticated=true):Promise<T>{
  const headers=new Headers(options.headers)
  if(options.body&&!headers.has('Content-Type'))headers.set('Content-Type','application/json')
  if(authenticated){const token=getToken();if(token)headers.set('Authorization',`Bearer ${token}`)}
  let response:Response
  try{response=await fetch(`${BASE}${path}`,{...options,headers})}
  catch{throw new Error('Не удалось связаться с сервером. Проверь API и подключение.')}
  if(response.status===204)return undefined as T
  const data=await response.json().catch(()=>({})) as {error?:string}
  if(!response.ok){const e=new Error(data.error||`Ошибка запроса (${response.status})`) as ApiError;e.status=response.status;throw e}
  return data as T
}
export const api={
  register:(input:{name:string;email:string;password:string})=>apiRequest<{token:string;user:User}>('/auth/register',{method:'POST',body:JSON.stringify(input)},false),
  login:(input:{email:string;password:string})=>apiRequest<{token:string;user:User}>('/auth/login',{method:'POST',body:JSON.stringify(input)},false),
  me:()=>apiRequest<{user:User}>('/auth/me'),
  updateMe:(name:string)=>apiRequest<{user:User}>('/auth/me',{method:'PATCH',body:JSON.stringify({name})})
}
