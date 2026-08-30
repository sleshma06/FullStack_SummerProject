import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { CATEGORIES } from '../utils/categories'
import { todayISO } from '../utils/format'

const EMPTY_FORM = { title: '', amount: '', category: '', date: todayISO(), note: '' }

export default function ExpenseForm({ open, mode = 'add', initialData, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!open) return
    if (mode === 'edit' && initialData) {
      setForm({
        title: initialData.title,
        amount: String(initialData.amount),
        category: initialData.category,
        date: initialData.date,
        note: initialData.note || '',
      })
    } else {
      setForm(EMPTY_FORM)
    }
    setErrors({})
  }, [open, mode, initialData])

  useEffect(() => {
    if (!open) return
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function validate() {
    const next = {}
    if (!form.title.trim()) next.title = 'Give this expense a name.'
    if (!form.amount || Number(form.amount) <= 0) next.amount = 'Enter an amount greater than 0.'
    if (!form.category) next.category = 'Pick a category.'
    if (!form.date) next.date = 'Pick a date.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      await onSubmit({ ...form, amount: Number(form.amount) })
      onClose()
    } catch {
      // context already surfaced an error toast; keep the modal open to retry
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="expense-form-title">
        <div className="modal-header">
          <h3 className="modal-title" id="expense-form-title">
            {mode === 'edit' ? 'Edit expense' : 'Add expense'}
          </h3>
          <button type="button" className="btn-icon" onClick={onClose} aria-label="Close">
            <X size={17} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="field">
              <label className="field-label" htmlFor="expense-title">
                Expense name
              </label>
              <input
                id="expense-title"
                className={`input${errors.title ? ' has-error' : ''}`}
                placeholder="e.g. Chicken Momo"
                value={form.title}
                onChange={(e) => update('title', e.target.value)}
                autoFocus
              />
              {errors.title && <span className="field-error">{errors.title}</span>}
            </div>

            <div className="field-row">
              <div className="field">
                <label className="field-label" htmlFor="expense-amount">
                  Amount
                </label>
                <div className="input-wrap">
                  <span className="amount-prefix">Rs.</span>
                  <input
                    id="expense-amount"
                    className={`input amount-input${errors.amount ? ' has-error' : ''}`}
                    type="number"
                    min="0"
                    step="1"
                    placeholder="0"
                    value={form.amount}
                    onChange={(e) => update('amount', e.target.value)}
                  />
                </div>
                {errors.amount && <span className="field-error">{errors.amount}</span>}
              </div>

              <div className="field">
                <label className="field-label" htmlFor="expense-date">
                  Date
                </label>
                <input
                  id="expense-date"
                  className={`input${errors.date ? ' has-error' : ''}`}
                  type="date"
                  value={form.date}
                  max={todayISO()}
                  onChange={(e) => update('date', e.target.value)}
                />
                {errors.date && <span className="field-error">{errors.date}</span>}
              </div>
            </div>

            <div className="field">
              <span className="field-label">Category</span>
              <div className="category-select-grid" role="radiogroup" aria-label="Category">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    role="radio"
                    aria-checked={form.category === cat.key}
                    className={`category-pick${form.category === cat.key ? ' active' : ''}`}
                    onClick={() => update('category', cat.key)}
                  >
                    <span aria-hidden="true">{cat.emoji}</span>
                    {cat.key}
                  </button>
                ))}
              </div>
              {errors.category && <span className="field-error">{errors.category}</span>}
            </div>

            <div className="field" style={{ marginBottom: 0 }}>
              <label className="field-label" htmlFor="expense-note">
                Note <span className="text-faint">(optional)</span>
              </label>
              <textarea
                id="expense-note"
                className="textarea"
                placeholder="Add a little context…"
                value={form.note}
                onChange={(e) => update('note', e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Saving…' : mode === 'edit' ? 'Update expense' : 'Add expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
