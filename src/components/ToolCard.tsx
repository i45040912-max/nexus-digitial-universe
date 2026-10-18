import { ArrowUpRight, Heart } from 'lucide-react'
import type { Tool } from '../data/tools'

export function ToolCard({ tool, saved, onToggle, onOpen }: { tool: Tool; saved: boolean; onToggle: (id: string) => void; onOpen: (name: string) => void }) {
  return <article className="tool-card panel">
    <div className="tool-top">
      <div className={`tool-glyph ${tool.color}`}>{tool.icon}</div>
      <span className="tool-tag">{tool.tag}</span>
      <button className={`save-button ${saved ? 'saved' : ''}`} onClick={() => onToggle(tool.id)} aria-label={saved ? 'Убрать из закладок' : 'Добавить в закладки'}><Heart size={17} fill={saved ? 'currentColor' : 'none'} /></button>
    </div>
    <div className="tool-category">{tool.category}</div>
    <h3>{tool.title}</h3>
    <p>{tool.description}</p>
    <div className="tool-bottom"><span><span className="online-dot" /> {tool.usage} запусков</span><button className="open-tool" onClick={() => onOpen(tool.title)}>Открыть <ArrowUpRight size={15} /></button></div>
  </article>
}
