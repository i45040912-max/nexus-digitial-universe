import { NavLink } from 'react-router-dom'
import { Atom, ChevronDown, CircleHelp, Plus, Radio, Zap } from 'lucide-react'
import { navigation } from '../data/navigation'

export function Sidebar({ onToast }: { onToast: (message: string) => void }) {
  return <aside className="sidebar">
    <NavLink to="/" className="brand"><span className="brand-mark"><Atom size={25} /></span><span>NEXUS<small>DIGITAL UNIVERSE</small></span></NavLink>
    <button className="workspace-switch" onClick={() => onToast('Переключение пространств появится в следующем обновлении')}><span className="workspace-avatar">N</span><span className="workspace-name">Nexus Space<small>Personal workspace</small></span><ChevronDown size={15} /></button>
    <nav className="nav-groups">
      {navigation.map(section => <div className="nav-section" key={section.group}>
        <div className="nav-section-title">{section.group}</div>
        {section.items.map(item => {
          const Icon = item.icon
          return <NavLink key={item.path} to={item.path} end={item.path === '/'} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Icon size={17} strokeWidth={1.8} /><span>{item.label}</span>{item.path === '/feed' && <span className="nav-count">4</span>}
          </NavLink>
        })}
      </div>)}
    </nav>
    <div className="sidebar-bottom">
      <div className="upgrade-card"><div className="upgrade-icon"><Zap size={17} /></div><strong>Расширь границы</strong><p>Открой новые возможности NEXUS.</p><button onClick={() => onToast('Раздел тарифов скоро появится')}>Исследовать PRO <Plus size={14} /></button></div>
      <button className="help-link" onClick={() => onToast('Поддержка: support@nexus.example')}><CircleHelp size={16} /> Центр помощи <span>↗</span></button>
      <div className="system-state"><Radio size={13} /><span>Все системы работают</span><span className="status-light" /></div>
    </div>
  </aside>
}
