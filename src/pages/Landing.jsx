import { Link } from 'react-router-dom'
import { Wallet, PiggyBank } from 'lucide-react'
import { ReceiptDoodle, PiggyBankDoodle, CoinDoodle, SparkleDoodle } from '../components/doodles/Doodles'

const PREVIEW_ROWS = [
  { emoji: '🍜', label: 'Food', amount: 'Rs. 1,050', color: '#4B5A3E' },
  { emoji: '🚌', label: 'Transport', amount: 'Rs. 1,140', color: '#B6913F' },
  { emoji: '🎮', label: 'Entertainment', amount: 'Rs. 1,250', color: '#7C8F63' },
]

const FEATURES = [
  {
    doodle: ReceiptDoodle,
    title: 'Log expenses in seconds',
    text: 'Add what you spent, pick a category, done. No spreadsheets, no friction, no “I’ll do it later.”',
  },
  {
    doodle: PiggyBankDoodle,
    title: 'See your budget, always',
    text: 'Watch your monthly budget update as you spend, so nothing quietly sneaks up on you before month-end.',
  },
  {
    doodle: CoinDoodle,
    title: 'Insights that actually help',
    text: 'Understand where your money really goes — from daily momo runs to that one impulsive shopping sale.',
  },
]

export default function Landing() {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <div className="landing-nav-brand">
          <span className="sidebar-brand-mark">
            <Wallet size={17} />
          </span>
          StudentSpend
        </div>
        <div className="landing-nav-actions">
          <Link to="/login" className="btn btn-outline-light btn-sm">
            Login
          </Link>
          <Link to="/signup" className="btn btn-gold btn-sm">
            Get started
          </Link>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="hero-grid">
          <div>
            <span className="hero-eyebrow">
              <SparkleDoodle size={16} /> Built for university life
            </span>
            <h1 className="hero-title">
              Know where your <em>money</em> goes.
            </h1>
            <p className="hero-sub">
              StudentSpend helps you log daily expenses, hold a monthly budget, and actually see where the money
              went — without opening a banking app that wasn't built for student life.
            </p>
            <div className="hero-actions">
              <Link to="/signup" className="btn btn-gold btn-lg">
                Get started
              </Link>
              <Link to="/login" className="btn btn-outline-light btn-lg">
                Login
              </Link>
            </div>
            <div className="hero-proof">
              <CoinDoodle size={26} />
              Free to use · No bank connection needed · Built by students, for students
            </div>
          </div>

          <div className="hero-preview-wrap">
            <div className="hero-preview">
              <div className="hero-preview-head">
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>Hi, Alex 👋</div>
                  <div className="text-faint" style={{ fontSize: 12.5 }}>
                    This month's snapshot
                  </div>
                </div>
                <PiggyBank size={22} color="var(--olive)" />
              </div>
              <div className="hero-preview-mini-cards">
                <div className="mini-card">
                  <div className="mini-card-label">Total spent</div>
                  <div className="mini-card-value">Rs. 8,420</div>
                </div>
                <div className="mini-card">
                  <div className="mini-card-label">Remaining</div>
                  <div className="mini-card-value">Rs. 6,580</div>
                </div>
              </div>
              <div className="progress-track" style={{ marginBottom: 18 }}>
                <div className="progress-fill" style={{ width: '56%' }} />
              </div>
              <div className="hero-preview-list">
                {PREVIEW_ROWS.map((row) => (
                  <div className="hero-preview-row" key={row.label}>
                    <span className="dot" style={{ background: `${row.color}22`, color: row.color }}>
                      {row.emoji}
                    </span>
                    <span className="grow">{row.label}</span>
                    <span className="amt">{row.amount}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="badge-float badge-float-1">
              <SparkleDoodle size={16} /> 18% saved
            </div>
            <div className="badge-float badge-float-2">
              <PiggyBank size={16} color="var(--olive)" /> On budget
            </div>
          </div>
        </div>
      </section>

      <section className="landing-features">
        <div className="features-head">
          <span className="eyebrow">Why StudentSpend</span>
          <h2>A finance app that actually fits student life.</h2>
        </div>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div className="card card-hover feature-card" key={f.title}>
              <span className="feature-doodle">
                <f.doodle size={30} />
              </span>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-text">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="landing-cta">
        <div>
          <h2>Spend smarter. Live better.</h2>
          <p>Set up your first budget in under a minute — mock data included, so you can try it right away.</p>
        </div>
        <Link to="/signup" className="btn btn-primary btn-lg" style={{ background: 'var(--ink)' }}>
          Create free account
        </Link>
      </div>

      <footer className="landing-footer">
        <span>© {new Date().getFullYear()} StudentSpend — a student summer project.</span>
        <span>Made for students who'd rather not guess where it all went.</span>
      </footer>
    </div>
  )
}
