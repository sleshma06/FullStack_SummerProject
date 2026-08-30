import { Pencil, Trash2 } from 'lucide-react'
import { getCategory, tint } from '../utils/categories'
import { formatCurrency, formatRelativeDate } from '../utils/format'

function RowActions({ expense, onEdit, onDelete, size = 'sm' }) {
  return (
    <div className="expense-actions">
      <button
        type="button"
        className={`btn-icon${size === 'sm' ? ' btn-sm' : ''}`}
        style={size === 'sm' ? { width: 34, height: 34 } : undefined}
        onClick={() => onEdit(expense)}
        aria-label={`Edit ${expense.title}`}
      >
        <Pencil size={15} />
      </button>
      <button
        type="button"
        className={`btn-icon danger${size === 'sm' ? ' btn-sm' : ''}`}
        style={size === 'sm' ? { width: 34, height: 34 } : undefined}
        onClick={() => onDelete(expense)}
        aria-label={`Delete ${expense.title}`}
      >
        <Trash2 size={15} />
      </button>
    </div>
  )
}

function ExpenseRow({ expense, onEdit, onDelete }) {
  const cat = getCategory(expense.category)
  const Icon = cat.icon
  return (
    <div className="expense-row" role="listitem">
      <div className="expense-identity">
        <span className="expense-icon" style={{ background: tint(cat.color), color: cat.color }}>
          <Icon />
        </span>
        <div style={{ minWidth: 0 }}>
          <div className="expense-name">{expense.title}</div>
          {expense.note && <div className="expense-note">{expense.note}</div>}
        </div>
      </div>
      <span className="badge" style={{ background: tint(cat.color), color: cat.color }}>
        {cat.key}
      </span>
      <span className="expense-date">{formatRelativeDate(expense.date)}</span>
      <span className="expense-amount">{formatCurrency(expense.amount)}</span>
      <RowActions expense={expense} onEdit={onEdit} onDelete={onDelete} />
    </div>
  )
}

function ExpenseCardRow({ expense, onEdit, onDelete }) {
  const cat = getCategory(expense.category)
  const Icon = cat.icon
  return (
    <div className="card expense-card-row" role="listitem">
      <span className="expense-icon" style={{ background: tint(cat.color), color: cat.color }}>
        <Icon />
      </span>
      <div className="expense-card-info">
        <div className="expense-name">{expense.title}</div>
        <div className="expense-meta">
          <span className="badge" style={{ background: tint(cat.color), color: cat.color }}>
            {cat.key}
          </span>
          <span>· {formatRelativeDate(expense.date)}</span>
        </div>
      </div>
      <div className="expense-card-right">
        <span className="expense-amount">{formatCurrency(expense.amount)}</span>
        <RowActions expense={expense} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  )
}

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  return (
    <>
      <div className="expense-table" role="list" aria-label="Expenses">
        <div className="expense-table-head" aria-hidden="true">
          <span>Expense</span>
          <span>Category</span>
          <span>Date</span>
          <span>Amount</span>
          <span />
        </div>
        {expenses.map((expense) => (
          <ExpenseRow key={expense.id} expense={expense} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
      <div className="expense-card-list" role="list" aria-label="Expenses">
        {expenses.map((expense) => (
          <ExpenseCardRow key={expense.id} expense={expense} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </>
  )
}
