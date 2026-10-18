import type { LucideIcon } from 'lucide-react'

export function StatCard({ label, value, delta, icon: Icon, tone }: { label: string; value: string; delta: string; icon: LucideIcon; tone: string }) {
  return <article className="stat-card panel">
    <div className={`stat-icon ${tone}`}><Icon size={19} /></div>
    <div className="stat-label">{label}</div>
    <div className="stat-value">{value}</div>
    <div className="stat-foot"><span className="delta">↗ {delta}</span><span>за 7 дней</span></div>
  </article>
}
