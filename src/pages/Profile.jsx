import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, Moon, Sun } from 'lucide-react'
import { useExpenses } from '../context/ExpenseContext'
import { useToast } from '../context/ToastContext'
import { formatCurrency } from '../utils/format'

const CURRENCIES = [
  { code: 'NPR', label: 'Rs. — Nepali Rupee' },
  { code: 'INR', label: '₹ — Indian Rupee' },
  { code: 'USD', label: '$ — US Dollar' },
  { code: 'EUR', label: '€ — Euro' },
]

export default function Profile() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { budget } = useExpenses()

  const [name, setName] = useState('Alex Sharma')
  const [email, setEmail] = useState('alex@university.edu')
  const [currency, setCurrency] = useState('NPR')
  const [saving, setSaving] = useState(false)
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark')

  function toggleTheme() {
    const next = !dark
    setDark(next)
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
  }

  function handleCurrencyChange(e) {
    setCurrency(e.target.value)
    showToast('Currency preference saved.', 'success')
  }

  function handleSaveProfile(e) {
    e.preventDefault()
    setSaving(true)
    // Frontend prototype — no backend call yet, just a friendly delay so the
    // "Saving…" state actually reads as real. Swap for a PUT /api/profile
    // once the account system exists.
    setTimeout(() => {
      setSaving(false)
      showToast('Profile updated.', 'success')
    }, 450)
  }

  function handleLogout() {
    showToast('Logged out. See you soon! 👋', 'info')
    navigate('/')
  }

  const initial = name.trim().charAt(0).toUpperCase() || 'A'

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <span className="eyebrow page-eyebrow">Profile</span>
          <h1 className="page-title">Profile &amp; settings</h1>
          <p className="page-sub">Keep your details current and tune StudentSpend to fit you.</p>
        </div>
      </div>

      <div className="card profile-head">
        <span className="profile-avatar">{initial}</span>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 19 }}>{name}</div>
          <div className="text-muted" style={{ fontSize: 13.5 }}>
            {email}
          </div>
        </div>
      </div>

      <form className="card card-pad" onSubmit={handleSaveProfile} style={{ marginBottom: 'var(--space-6)' }}>
        <h2 className="section-title" style={{ marginBottom: 'var(--space-5)' }}>
          Your details
        </h2>
        <div className="field-row">
          <div className="field">
            <label className="field-label" htmlFor="profile-name">
              Name
            </label>
            <input id="profile-name" className="input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="profile-email">
              Email
            </label>
            <input
              id="profile-email"
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </form>

      <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">Monthly budget</div>
            <div className="settings-row-hint">Currently {formatCurrency(budget)}</div>
          </div>
          <Link to="/budget" className="link-btn">
            Manage →
          </Link>
        </div>

        <div className="settings-row">
          <div>
            <div className="settings-row-label">Preferred currency</div>
            <div className="settings-row-hint">Used across your dashboard and expenses</div>
          </div>
          <select
            className="select"
            style={{ width: 'auto', minWidth: 190 }}
            value={currency}
            onChange={handleCurrencyChange}
            aria-label="Preferred currency"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="settings-row">
          <div>
            <div className="settings-row-label">Dark theme</div>
            <div className="settings-row-hint">Easier on the eyes for late-night budgeting</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {dark ? <Moon size={16} color="var(--text-faint)" /> : <Sun size={16} color="var(--text-faint)" />}
            <button
              type="button"
              className={`toggle-switch${dark ? ' on' : ''}`}
              onClick={toggleTheme}
              aria-pressed={dark}
              aria-label="Toggle dark theme"
            >
              <span className="toggle-switch-knob" />
            </button>
          </div>
        </div>
      </div>

      <button type="button" className="btn btn-danger-ghost" onClick={handleLogout}>
        <LogOut size={16} />
        Log out
      </button>
    </div>
  )
}
