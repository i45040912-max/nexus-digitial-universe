import { useOutletContext, useNavigate } from 'react-router-dom'
import { Activity, ArrowRight, ArrowUpRight, Boxes, CircleDot, Compass, Cpu, Globe2, Layers, Plus, Sparkles, Zap } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { StatCard } from '../components/StatCard'
import { ToolCard } from '../components/ToolCard'
import { tools } from '../data/tools'
import { useSaved } from '../hooks/useSaved'

type Context = { onToast: (message: string) => void }

export function Dashboard() {
  const { onToast } = useOutletContext<Context>()
  const navigate = useNavigate()
  const [saved, toggleSaved] = useSaved()
  const featured = tools.slice(0, 3)
  return <div className="page dashboard-page">
    <PageHeader eyebrow="YOUR COMMAND CENTER" title={<>Твоя вселенная.<br /><span className="gradient-text">Твои правила.</span></>} description="Добро пожаловать в NEXUS — исследуй инструменты, соединяй идеи и создавай нечто новое." action={<button className="button-primary" onClick={() => navigate('/explore')}><Compass size={16} /> Исследовать <ArrowUpRight size={15} /></button>} />
    <section className="hero-banner">
      <div className="hero-grid" />
      <div className="hero-content"><div className="hero-chip"><Sparkles size={13} /> NEXUS INTELLIGENCE / 01</div><h2>Будущее не ждёт.<br /><span>Создавай его.</span></h2><p>Единая точка входа в инструменты, идеи и цифровые пространства нового поколения.</p><button className="button-light" onClick={() => navigate('/lab')}>Войти в лабораторию <ArrowRight size={16} /></button></div>
      <div className="hero-orb"><div className="orb-ring ring-one" /><div className="orb-ring ring-two" /><div className="orb-ring ring-three" /><div className="orb-core"><Atom size={52} /></div><span className="orb-label orb-label-a">CORE / 01</span><span className="orb-label orb-label-b">SYSTEM ONLINE</span></div>
      <div className="hero-index">NX-001 <span>•</span> 2088</div>
    </section>
    <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" />SYSTEM OVERVIEW</div><h2>Пульс вселенной</h2></div><span className="updated-label"><span className="online-dot" /> обновлено сейчас</span></div>
    <section className="stats-grid">
      <StatCard label="Активные инструменты" value="128" delta="+12.8%" icon={Boxes} tone="violet" />
      <StatCard label="События системы" value="8,492" delta="+8.2%" icon={Activity} tone="cyan" />
      <StatCard label="Участники сети" value="24.6K" delta="+18.4%" icon={Globe2} tone="pink" />
      <StatCard label="Уровень синхронизации" value="99.98%" delta="+0.04%" icon={Cpu} tone="green" />
    </section>
    <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" />CURATED FOR YOU</div><h2>Точки входа</h2></div><button className="text-link" onClick={() => navigate('/apps')}>Все приложения <ArrowRight size={15} /></button></div>
    <section className="tools-grid">{featured.map(tool => <ToolCard key={tool.id} tool={tool} saved={saved.includes(tool.id)} onToggle={toggleSaved} onOpen={name => onToast(`${name}: модуль выбран — интеграция скоро будет подключена`)} />)}</section>
    <section className="bottom-grid">
      <article className="activity-panel panel"><div className="panel-heading"><div><div className="eyebrow"><span className="eyebrow-line" />NETWORK FEED</div><h3>Последние сигналы</h3></div><button className="icon-button" onClick={() => navigate('/feed')}><ArrowUpRight size={17} /></button></div>
        <div className="activity-list"><div className="activity-item"><div className="activity-symbol violet"><Layers size={16} /></div><div><strong>Новый модуль добавлен</strong><p>Prism Gallery · каталог приложений</p><small>2 минуты назад</small></div><span className="activity-badge">NEW</span></div><div className="activity-item"><div className="activity-symbol cyan"><CircleDot size={16} /></div><div><strong>Синхронизация завершена</strong><p>Все узлы работают в штатном режиме</p><small>18 минут назад</small></div><span className="activity-status">OK</span></div><div className="activity-item"><div className="activity-symbol pink"><Zap size={16} /></div><div><strong>Сеть получила обновление</strong><p>NEXUS Core · версия 1.0.0</p><small>1 час назад</small></div><span className="activity-badge">SYS</span></div></div>
      </article>
      <article className="quick-panel panel"><div className="eyebrow"><span className="eyebrow-line" />QUICK ACCESS</div><h3>Быстрый переход</h3><p>Продолжай с того места, где остановился.</p><button className="quick-link" onClick={() => navigate('/projects')}><span className="quick-icon violet"><Layers size={17} /></span><span><strong>Мои проекты</strong><small>3 активных пространства</small></span><ArrowUpRight size={16} /></button><button className="quick-link" onClick={() => navigate('/tasks')}><span className="quick-icon cyan"><Activity size={17} /></span><span><strong>Мои задачи</strong><small>7 задач в работе</small></span><ArrowUpRight size={16} /></button><button className="quick-link" onClick={() => navigate('/bookmarks')}><span className="quick-icon pink"><Sparkles size={17} /></span><span><strong>Сохранённое</strong><small>{saved.length} избранных инструментов</small></span><ArrowUpRight size={16} /></button><button className="quick-create" onClick={() => onToast('Новый проект можно будет создать после подключения хранилища')}><Plus size={16} /> Создать новое</button></article>
    </section>
  </div>
}
