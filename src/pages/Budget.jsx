import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { useExpenses } from '../context/ExpenseContext'
import BudgetProgress from '../components/BudgetProgress'
import { PiggyBankDoodle } from '../components/doodles/Doodles'
import { formatCurrency } from '../utils/format'

export default function Budget() {
  const { budget, totalSpent, remaining, budgetUsedPercent, loading, updateBudget } = useExpenses()

  const [draft, setDraft] = useState(String(budget || ''))
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  // Once the mock "API" resolves with the real budget, sync the input to it.
  useEffect(() => {
    setDraft(String(budget || ''))
  }, [budget])

  async function handleSave(e) {
    e.preventDefault()
    const value = Number(draft)
    if (!draft || value <= 0) {
      setError('Enter a budget greater than 0.')
      return
    }
    setError('')
    setSaving(true)
    try {
      await updateBudget(value)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="page">
        <div className="card card-pad">
          <div className="skeleton" style={{ height: 16, width: '25%', marginBottom: 14 }} />
          <div className="skeleton" style={{ height: 38, width: '45%' }} />
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <span className="eyebrow page-eyebrow">Budget</span>
          <h1 className="page-title">Your monthly budget</h1>
          <p className="page-sub">Set it once, then watch it hold — day by day.</p>
        </div>
      </div>

      <div className="card budget-hero">
        <PiggyBankDoodle size={84} className="budget-hero-doodle" />

        <div className="budget-hero-main">
          <span className="eyebrow">Monthly budget</span>
          <h2 style={{ fontSize: 34, marginTop: 6 }}>{formatCurrency(budget)}</h2>

          <form className="budget-set-row" onSubmit={handleSave}>
            <div className="field">
              <label className="field-label" htmlFor="budget-input">
                Update budget
              </label>
              <div className="input-wrap">
                <span className="amount-prefix">Rs.</span>
                <input
                  id="budget-input"
                  className={`input amount-input${error ? ' has-error' : ''}`}
                  type="number"
                  min="0"
                  step="1"
                  placeholder="15000"
                  value={draft}
                  onChange={(e) => {
                    setDraft(e.target.value)
                    setError('')
                  }}
                />
              </div>
              {error && <span className="field-error">{error}</span>}
            </div>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save budget'}
            </button>
          </form>

          <div className="budget-mini-grid">
            <div className="card budget-mini-card">
              <div className="summary-label">Spent</div>
              <div className="summary-value" style={{ fontSize: 20, marginTop: 6 }}>
                {formatCurrency(totalSpent)}
              </div>
            </div>
            <div className="card budget-mini-card">
              <div className="summary-label">Remaining</div>
              <div
                className="summary-value"
                style={{ fontSize: 20, marginTop: 6, color: remaining < 0 ? 'var(--terracotta)' : undefined }}
              >
                {formatCurrency(Math.max(0, remaining))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card card-pad">
        <div className="section-title-row">
          <h2 className="section-title">Budget used</h2>
          <Sparkles size={18} color="var(--gold)" />
        </div>
        <BudgetProgress spent={totalSpent} budget={budget} percent={budgetUsedPercent} />
      </div>

      <p
        className="text-muted"
        style={{
          textAlign: 'center',
          marginTop: 'var(--space-8)',
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 16.5,
        }}
      >
        Your future self will thank you.
      </p>
    </div>
  )
}
