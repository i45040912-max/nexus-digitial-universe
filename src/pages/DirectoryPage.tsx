import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { ToolCard } from '../components/ToolCard'
import { categories, tools } from '../data/tools'
import { useSaved } from '../hooks/useSaved'

type Context = { onToast: (message: string) => void }

export function DirectoryPage({ mode = 'apps' }: { mode?: 'apps' | 'explore' | 'bookmarks' }) {
  const { onToast } = useOutletContext<Context>()
  const [saved, toggleSaved] = useSaved()
  const [category, setCategory] = useState('Все')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('featured')
  const base = mode === 'bookmarks' ? tools.filter(tool => saved.includes(tool.id)) : tools
  const filtered = useMemo(() => base.filter(tool => (category === 'Все' || tool.category === category) && `${tool.title} ${tool.description} ${tool.category}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => sort === 'name' ? a.title.localeCompare(b.title) : sort === 'usage' ? Number(b.usage.replace(/[^\d]/g, '')) - Number(a.usage.replace(/[^\d]/g, '')) : 0), [base, category, query, sort])
  const title = mode === 'explore' ? 'Исследуй неизведанное' : mode === 'bookmarks' ? 'Твоё избранное' : 'Каталог приложений'
  const description = mode === 'explore' ? 'Открывай новые инструменты и находи неожиданные способы работать.' : mode === 'bookmarks' ? 'Все инструменты, которые ты сохранил для быстрого доступа.' : 'Инструменты, которые расширяют возможности твоего цифрового пространства.'
  return <div className="page directory-page">
    <PageHeader eyebrow={mode === 'bookmarks' ? 'PERSONAL COLLECTION' : 'NEXUS DIRECTORY'} title={title} description={description} action={<span className="directory-count"><Sparkles size={14} /> {filtered.length} модулей</span>} />
    <div className="directory-toolbar panel">
      <label className="directory-search"><Search size={17} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Найти инструмент..." /></label>
      <div className="sort-control"><SlidersHorizontal size={15} /><select value={sort} onChange={e => setSort(e.target.value)} aria-label="Сортировка"><option value="featured">Рекомендуемые</option><option value="name">По названию</option><option value="usage">По популярности</option></select></div>
    </div>
    <div className="category-chips">{categories.map(item => <button key={item} className={`category-chip ${category === item ? 'selected' : ''}`} onClick={() => setCategory(item)}>{item}</button>)}</div>
    {filtered.length ? <div className="tools-grid directory-grid">{filtered.map(tool => <ToolCard key={tool.id} tool={tool} saved={saved.includes(tool.id)} onToggle={toggleSaved} onOpen={name => onToast(`${name}: модуль выбран — интеграция скоро будет подключена`)} />)}</div> : <div className="empty-state panel"><div className="empty-orb"><Search size={25} /></div><h3>Ничего не найдено</h3><p>{mode === 'bookmarks' ? 'Сохраняй инструменты сердечком, и они появятся здесь.' : 'Попробуй другой запрос или выбери другую категорию.'}</p><button className="button-primary" onClick={() => { setQuery(''); setCategory('Все') }}>Сбросить фильтры</button></div>}
  </div>
}
