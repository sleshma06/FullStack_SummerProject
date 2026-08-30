import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react'

const ICONS = {
  success: CheckCircle2,
  error: AlertTriangle,
  info: Info,
}

export default function Toast({ message, type = 'success', onClose }) {
  const Icon = ICONS[type] || ICONS.success

  return (
    <div className={`toast ${type === 'error' ? 'error' : ''}`} role="status">
      <Icon size={18} className="toast-icon" />
      <p className="toast-msg">{message}</p>
      <button type="button" className="toast-close" onClick={onClose} aria-label="Dismiss notification">
        <X size={15} />
      </button>
    </div>
  )
}
