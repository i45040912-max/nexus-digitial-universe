import { Bell, Command, Search, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Topbar({ search, setSearch, onToast }: { search: string; setSearch: (value: string) => void; onToast: (message: string) => void }) {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  return <header className="topbar">
    <div className="breadcrumb"><span>SPACE</span><span className="crumb-slash">/</span><strong>NEXUS CONSOLE</strong><span className="live-pill"><i /> LIVE</span></div>
    <div className="topbar-actions">
      <label className="search-box"><Search size={16} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по вселенной..." /><kbd><Command size={11} /> K</kbd></label>
      <button className="icon-button notification-button" onClick={() => onToast('Новых уведомлений пока нет')} aria-label="Уведомления"><Bell size={18} /><i /></button>
      <button className="avatar-button" onClick={() => navigate(user ? '/profile' : '/login')} aria-label="Открыть профиль">{user ? user.name.slice(0,2).toUpperCase() : 'IN'}</button>
      <button className="account-action" onClick={() => { if (user) { signOut(); onToast('Ты вышел из аккаунта') } else navigate('/login') }}>{user ? 'Выйти' : 'Войти'}</button>
      <button className="mobile-menu-button" onClick={() => onToast('На мобильном используйте нижнюю панель навигации')}><Sparkles size={19} /></button>
    </div>
  </header>
}
