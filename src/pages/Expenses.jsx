import { useMemo, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { useExpenses } from '../context/ExpenseContext'
import { CATEGORIES } from '../utils/categories'
import ExpenseList from '../components/ExpenseCard'
import ExpenseForm from '../components/ExpenseForm'
import ConfirmDialog from '../components/ConfirmDialog'
import EmptyState from '../components/EmptyState'

const SORT_OPTIONS = [
  { value: 'date-desc', label: 'Newest first' },
  { value: 'date-asc', label: 'Oldest first' },
  { value: 'amount-desc', label: 'Amount: high to low' },
  { value: 'amount-asc', label: 'Amount: low to high' },
]

export default function Expenses() {
  const { expenses, loading, addExpense, editExpense, removeExpense } = useExpenses()

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState('date-desc')
  const [modal, setModal] = useState({ open: false, mode: 'add', expense: null })
  const [deleteTarget, setDeleteTarget] = useState(null)

  const openAdd = () => setModal({ open: true, mode: 'add', expense: null })
  const openEdit = (expense) => setModal({ open: true, mode: 'edit', expense })
  const closeModal = () => setModal((m) => ({ ...m, open: false }))

  const filtered = useMemo(() => {
    let list = expenses
    if (category !== 'All') list = list.filter((e) => e.category === category)
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter((e) => e.title.toLowerCase().includes(q) || (e.note || '').toLowerCase().includes(q))
    }
    const sorted = [...list]
    switch (sortBy) {
      case 'date-asc':
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date))
        break
      case 'amount-desc':
        sorted.sort((a, b) => b.amount - a.amount)
        break
      case 'amount-asc':
        sorted.sort((a, b) => a.amount - b.amount)
        break
      default:
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date))
    }
    return sorted
  }, [expenses, query, category, sortBy])

  async function handleSubmit(data) {
    if (modal.mode === 'edit') {
      await editExpense(modal.expense.id, data)
    } else {
      await addExpense(data)
    }
  }

  async function confirmDelete() {
    if (deleteTarget) await removeExpense(deleteTarget.id)
    setDeleteTarget(null)
  }

  const hasFilters = query.trim() !== '' || category !== 'All'

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <span className="eyebrow page-eyebrow">Expenses</span>
          <h1 className="page-title">All expenses</h1>
          <p className="page-sub">
            {expenses.length} expense{expenses.length === 1 ? '' : 's'} logged so far
          </p>
        </div>
        <button type="button" className="btn btn-primary" onClick={openAdd}>
          <Plus size={16} />
          Add expense
        </button>
      </div>

      {!loading && expenses.length > 0 && (
        <div className="filter-bar">
          <div className="search-field">
            <Search />
            <input
              className="input"
              placeholder="Search expenses or notes…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search expenses"
            />
          </div>
          <select
            className="select filter-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="All">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.key} value={c.key}>
                {c.key}
              </option>
            ))}
          </select>
          <select
            className="select filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort expenses"
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {loading && (
        <div className="card">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ padding: '18px 20px', borderTop: i ? '1px solid var(--border)' : 'none' }}>
              <div className="skeleton" style={{ height: 40, width: '100%' }} />
            </div>
          ))}
        </div>
      )}

      {!loading && expenses.length === 0 && <EmptyState onAdd={openAdd} buttonLabel="Add first expense" />}

      {!loading && expenses.length > 0 && filtered.length === 0 && (
        <div className="card card-pad empty-state">
          <h3 className="empty-state-title">No expenses match that.</h3>
          <p className="empty-state-sub">Try a different search term or clear your filters.</p>
          {hasFilters && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setQuery('')
                setCategory('All')
              }}
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="card">
          <ExpenseList expenses={filtered} onEdit={openEdit} onDelete={setDeleteTarget} />
        </div>
      )}

      <ExpenseForm
        open={modal.open}
        mode={modal.mode}
        initialData={modal.expense}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this expense?"
        message={deleteTarget ? `This will permanently remove "${deleteTarget.title}".` : ''}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
