import {useState,type FormEvent} from 'react'
import {Link,Navigate,useLocation,useNavigate} from 'react-router-dom'
import {Atom,ArrowLeft,ArrowRight,Eye,EyeOff,LockKeyhole,Mail,ShieldCheck,UserRound,Zap} from 'lucide-react'
import {useAuth} from '../context/AuthContext'
export function AuthPage({mode}:{mode:'login'|'register'}){
  const {user,signIn,signUp}=useAuth();const navigate=useNavigate();const location=useLocation()
  const [name,setName]=useState('');const [email,setEmail]=useState('');const [password,setPassword]=useState('')
  const [show,setShow]=useState(false);const [error,setError]=useState('');const [busy,setBusy]=useState(false)
  const registering=mode==='register';const destination=(location.state as {from?:string}|null)?.from||'/profile'
  if(user)return <Navigate to="/" replace/>
  async function submit(event:FormEvent){
    event.preventDefault();setError('');setBusy(true)
    try{if(registering)await signUp(name,email,password);else await signIn(email,password);navigate(destination,{replace:true})}
    catch(e){setError(e instanceof Error?e.message:'Не удалось выполнить запрос.')}finally{setBusy(false)}
  }
  return <div className="auth-page"><div className="auth-backdrop"/>
    <Link to="/" className="auth-back-link"><ArrowLeft size={15}/> Вернуться в NEXUS</Link>
    <div className="auth-card">
      <div className="auth-brand"><span className="auth-brand-icon"><Atom size={28}/></span><div><strong>NEXUS</strong><small>DIGITAL UNIVERSE</small></div></div>
      <div className="auth-eyebrow"><span className="online-dot"/> SECURE ACCESS GATE</div>
      <h1>{registering?'Создай свою':'С возвращением'}<br/><span>{registering?'цифровую идентичность.':'цифровую вселенную.'}</span></h1>
      <p className="auth-intro">{registering?'Создай аккаунт, чтобы сохранять проекты, задачи и идеи в своём пространстве.':'Войди в пространство NEXUS и продолжи исследование.'}</p>
      <form onSubmit={submit} className="auth-form">
        {registering&&<label className="auth-field"><span>ИМЯ</span><div><UserRound size={17}/><input autoComplete="name" value={name} onChange={e=>setName(e.target.value)} placeholder="Как к тебе обращаться" minLength={2} maxLength={60} required/></div></label>}
        <label className="auth-field"><span>ЭЛЕКТРОННАЯ ПОЧТА</span><div><Mail size={17}/><input type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" maxLength={254} required/></div></label>
        <label className="auth-field"><span>ПАРОЛЬ</span><div><LockKeyhole size={17}/><input type={show?'text':'password'} autoComplete={registering?'new-password':'current-password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder={registering?'Минимум 8 символов':'Введи пароль'} minLength={registering?8:1} maxLength={72} required/><button type="button" className="password-toggle" onClick={()=>setShow(v=>!v)} aria-label={show?'Скрыть пароль':'Показать пароль'}>{show?<EyeOff size={16}/>:<Eye size={16}/>}</button></div></label>
        {error&&<div className="auth-error" role="alert">{error}</div>}
        <button className="auth-submit" type="submit" disabled={busy}>{busy?'Подключение...':registering?'Создать аккаунт':'Войти в NEXUS'}{busy?<span className="button-spinner"/>:<ArrowRight size={17}/>}</button>
      </form>
      <div className="auth-switch">{registering?'Уже есть аккаунт?':'Впервые в NEXUS?'} <Link to={registering?'/login':'/register'}>{registering?'Войти':'Создать аккаунт'}</Link></div>
      <div className="auth-security"><ShieldCheck size={15}/><span>Защищённое соединение</span><span className="security-divider"/><Zap size={14}/><span>JWT · bcrypt</span></div>
    </div>
    <div className="auth-footer">NEXUS SYSTEMS <span>·</span> YOUR NEXT DIMENSION</div>
  </div>
}
