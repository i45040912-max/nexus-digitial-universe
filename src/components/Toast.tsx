import { CheckCircle2, X } from 'lucide-react'

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  if (!message) return null
  return <div className="toast"><CheckCircle2 size={18} /><span>{message}</span><button className="icon-button" onClick={onClose} aria-label="Закрыть уведомление"><X size={16} /></button></div>
}
