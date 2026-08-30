import { Plus } from 'lucide-react'
import { WalletDoodle } from './doodles/Doodles'

export default function EmptyState({ onAdd, title = 'Your wallet is waiting.', sub, buttonLabel = 'Add first expense' }) {
  return (
    <div className="card empty-state">
      <WalletDoodle size={72} />
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-sub">
        {sub || "Add your first expense and start understanding where your money actually goes."}
      </p>
      {onAdd && (
        <button type="button" className="btn btn-primary" onClick={onAdd}>
          <Plus size={16} />
          {buttonLabel}
        </button>
      )}
    </div>
  )
}
