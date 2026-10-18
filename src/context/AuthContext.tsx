import {createContext,useCallback,useContext,useEffect,useMemo,useState,type ReactNode} from 'react'
import {api,getToken,setToken,type User} from '../lib/api'
type AuthValue={user:User|null;loading:boolean;signIn:(email:string,password:string)=>Promise<void>;signUp:(name:string,email:string,password:string)=>Promise<void>;signOut:()=>void;refreshUser:()=>Promise<void>}
const Context=createContext<AuthValue|null>(null)
export function AuthProvider({children}:{children:ReactNode}){
  const [user,setUser]=useState<User|null>(null)
  const [loading,setLoading]=useState(Boolean(getToken()))
  const refreshUser=useCallback(async()=>{
    if(!getToken()){setUser(null);setLoading(false);return}
    try{setUser((await api.me()).user)}catch{setToken(null);setUser(null)}finally{setLoading(false)}
  },[])
  useEffect(()=>{void refreshUser()},[refreshUser])
  const signIn=useCallback(async(email:string,password:string)=>{const r=await api.login({email,password});setToken(r.token);setUser(r.user)},[])
  const signUp=useCallback(async(name:string,email:string,password:string)=>{const r=await api.register({name,email,password});setToken(r.token);setUser(r.user)},[])
  const signOut=useCallback(()=>{setToken(null);setUser(null)},[])
  const value=useMemo(()=>({user,loading,signIn,signUp,signOut,refreshUser}),[user,loading,signIn,signUp,signOut,refreshUser])
  return <Context.Provider value={value}>{children}</Context.Provider>
}
export function useAuth(){const value=useContext(Context);if(!value)throw new Error('useAuth must be used within AuthProvider');return value}
