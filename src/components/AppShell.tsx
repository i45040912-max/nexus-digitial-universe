import { useEffect, useState, type KeyboardEvent } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { Toast } from './Toast'
import { allNavigation } from '../data/navigation'

export function AppShell() {
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState('')
  const location = useLocation()

  useEffect(() => {
    if (!search.trim()) return
    const match = allNavigation.find(item => item.label.toLowerCase().includes(search.toLowerCase()))
    if (match && search.trim().length > 2) {
      // Search remains global; pressing Enter in the search box is handled below via keyboard.
    }
  }, [search])

  useEffect(() => { setSearch('') }, [location.pathname])
  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 3200)
    return () => window.clearTimeout(timer)
  }, [toast])

  const onSearchKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const match = allNavigation.find(item => item.label.toLowerCase().includes(search.toLowerCase()))
      if (match) window.location.href = match.path
      else setToast(search ? `По запросу «${search}» ничего не найдено` : 'Введите название раздела')
    }
  }

  return <div className="app-shell">
    <Sidebar onToast={setToast} />
    <div className="main-column">
      <div className="topbar-wrap"><Topbar search={search} setSearch={setSearch} onToast={setToast} /></div>
      <main className="main-content" onKeyDown={e => { if (e.key === 'Escape') setSearch('') }}>
        {search.trim().length > 1 && <div className="search-results-hint">Поиск: <strong>{search}</strong> · нажми Enter, чтобы открыть подходящий раздел</div>}
        <div onKeyDown={e => { if (e.key === 'Enter' && (e.target as HTMLElement).tagName === 'INPUT') onSearchKey(e as KeyboardEvent<HTMLInputElement>) }}>
          <Outlet context={{ onToast }} />
        </div>
        <footer className="footer"><span>© 2026 NEXUS SYSTEMS</span><span>BUILT FOR THE NEXT DIMENSION <span className="footer-star">✳</span></span><span>v1.0.0 / BETA</span></footer>
      </main>
    </div>
    <Toast message={toast} onClose={() => setToast('')} />
  </div>
}
