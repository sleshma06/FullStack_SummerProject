import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Receipt, PiggyBank, Banknote, CalendarDays, AlertCircle } from 'lucide-react'
import { useExpenses } from '../context/ExpenseContext'
import SummaryCard from '../components/SummaryCard'
import BudgetProgress from '../components/BudgetProgress'
import CategoryBreakdown from '../components/CategoryBreakdown'
import SpendingInsight from '../components/SpendingInsight'
import ExpenseList from '../components/ExpenseCard'
import ExpenseForm from '../components/ExpenseForm'
import ConfirmDialog from '../components/ConfirmDialog'
import EmptyState from '../components/EmptyState'
import { CoinDoodle } from '../components/doodles/Doodles'

function greetingWord() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 18) return 'afternoon'
  return 'evening'
}

function SummarySkeleton() {
  return (
    <div className="summary-grid">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="card summary-card">
          <div className="skeleton" style={{ height: 14, width: '50%' }} />
          <div className="skeleton" style={{ height: 26, width: '70%' }} />
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const {
    expenses,
    loading,
    error,
    budget,
    totalSpent,
    remaining,
    budgetUsedPercent,
    dailyAverage,
    categoryTotals,
    topCategory,
    addExpense,
    editExpense,
    removeExpense,
  } = useExpenses()

  const [modal, setModal] = useState({ open: false, mode: 'add', expense: null })
  const [deleteTarget, setDeleteTarget] = useState(null)

  const openAdd = () => setModal({ open: true, mode: 'add', expense: null })
  const openEdit = (expense) => setModal({ open: true, mode: 'edit', expense })
  const closeModal = () => setModal((m) => ({ ...m, open: false }))

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

  const isOverBudget = remaining < 0

  return (
    <div className="page">
      <div className="page-header">
        <div className="greeting-row">
          <div>
            <span className="eyebrow page-eyebrow">Dashboard</span>
            <h1 className="greeting-title">Good {greetingWord()}, Alex 👋</h1>
            <p className="greeting-sub">Here's your spending snapshot.</p>
          </div>
        </div>
        <button type="button" className="btn btn-primary" onClick={openAdd}>
          <Plus size={16} />
          Add expense
        </button>
      </div>

      {loading && <SummarySkeleton />}

      {!loading && error && (
        <div className="card card-pad empty-state">
          <AlertCircle size={40} color="var(--rust)" />
          <h3 className="empty-state-title">Something went wrong</h3>
          <p className="empty-state-sub">{error}</p>
          <button type="button" className="btn btn-outline" onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      )}

      {!loading && !error && expenses.length === 0 && (
        <EmptyState onAdd={openAdd} buttonLabel="Add first expense" />
      )}

      {!loading && !error && expenses.length > 0 && (
        <>
          <div className="summary-grid">
            <SummaryCard label="Total spent" value={totalSpent} icon={Receipt} accent="ink" />
            <SummaryCard label="Monthly budget" value={budget} icon={PiggyBank} accent="olive" />
            <SummaryCard
              label="Remaining"
              value={Math.max(0, remaining)}
              icon={Banknote}
              accent={isOverBudget ? 'terracotta' : 'gold'}
              delta={isOverBudget ? "You're over budget this month" : `${budgetUsedPercent}% of budget used`}
              warn={isOverBudget}
            />
            <SummaryCard label="Daily average" value={dailyAverage} icon={CalendarDays} accent="terracotta" />
          </div>

          <div className="card card-pad" style={{ marginBottom: 'var(--space-6)' }}>
            <div className="section-title-row">
              <h2 className="section-title">Monthly budget progress</h2>
              <CoinDoodle size={34} />
            </div>
            <BudgetProgress spent={totalSpent} budget={budget} percent={budgetUsedPercent} />
          </div>

          <div className="card card-pad" style={{ marginBottom: 'var(--space-6)' }}>
            <div className="section-title-row">
              <h2 className="section-title">Spending breakdown</h2>
            </div>
            <CategoryBreakdown categories={categoryTotals} totalSpent={totalSpent} />
          </div>

          <div style={{ marginBottom: 'var(--space-6)' }}>
            <SpendingInsight topCategory={topCategory} budgetUsedPercent={budgetUsedPercent} />
          </div>

          <div className="section-title-row">
            <h2 className="section-title">Recent expenses</h2>
            <Link to="/expenses" className="link-btn">
              View all
            </Link>
          </div>
          <div className="card">
            <ExpenseList expenses={expenses.slice(0, 5)} onEdit={openEdit} onDelete={setDeleteTarget} />
          </div>
        </>
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
