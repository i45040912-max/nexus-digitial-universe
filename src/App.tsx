import {Navigate,Route,Routes} from 'react-router-dom'
import {AppShell} from './components/AppShell'
import {RequireAuth} from './components/RequireAuth'
import {Dashboard} from './pages/Dashboard'
import {DirectoryPage} from './pages/DirectoryPage'
import {GenericPage} from './pages/GenericPage'
import {AuthPage} from './pages/AuthPage'
export default function App(){
 return <Routes>
  <Route path="/login" element={<AuthPage mode="login"/>}/>
  <Route path="/register" element={<AuthPage mode="register"/>}/>
  <Route element={<AppShell/>}>
   <Route index element={<Dashboard/>}/>
   <Route path="explore" element={<DirectoryPage mode="explore"/>}/>
   <Route path="apps" element={<DirectoryPage mode="apps"/>}/>
   <Route element={<RequireAuth/>}>
    <Route path="bookmarks" element={<DirectoryPage mode="bookmarks"/>}/>
    {['projects','collections','tasks','calendar','notes','files','integrations','api','docs','status','profile','settings'].map(path=><Route key={path} path={path} element={<GenericPage/>}/>)}
   </Route>
   {['lab','community','feed','analytics'].map(path=><Route key={path} path={path} element={<GenericPage/>}/>)}
   <Route path="*" element={<Navigate to="/" replace/>}/>
  </Route>
 </Routes>
}
