import { AlertTriangle, Sparkles, TrendingUp } from 'lucide-react'
import { formatCurrency } from '../utils/format'

export default function BudgetProgress({ spent, budget, percent, showNote = true }) {
  const isWarn = percent >= 85
  const isGood = percent < 50

  let note = null
  if (showNote) {
    if (isWarn) {
      note = { icon: AlertTriangle, text: "You're approaching your monthly budget.", warn: true }
    } else if (isGood) {
      note = { icon: Sparkles, text: "You're doing great this month.", warn: false }
    } else {
      note = { icon: TrendingUp, text: 'Steady spending — right on track.', warn: false }
    }
  }

  return (
    <div>
      <div className="progress-track">
        <div className={`progress-fill${isWarn ? ' warn' : ''}`} style={{ width: `${Math.min(100, percent)}%` }} />
      </div>
      <div className="progress-meta">
        <span>
          <strong>{formatCurrency(spent)}</strong> of {formatCurrency(budget)}
        </span>
        <span>{percent}%</span>
      </div>
      {note && (
        <div className={`budget-note${note.warn ? ' warn' : ''}`}>
          <note.icon size={16} />
          {note.text}
        </div>
      )}
    </div>
  )
}
