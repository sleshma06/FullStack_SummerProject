import { Wallet } from 'lucide-react'
import { MoneyDoodle } from './doodles/Doodles'

export default function AuthLayout({ quote, children }) {
  return (
    <div className="auth-shell">
      <div className="auth-brand-panel">
        <div className="auth-brand-top">
          <span className="sidebar-brand-mark">
            <Wallet size={17} />
          </span>
          StudentSpend
        </div>
        <p className="auth-brand-quote">{quote}</p>
        <MoneyDoodle size={120} className="auth-brand-doodle" />
      </div>
      <div className="auth-form-panel">
        <div className="auth-card">
          <div className="auth-mobile-brand">
            <span className="sidebar-brand-mark">
              <Wallet size={15} />
            </span>
            StudentSpend
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
