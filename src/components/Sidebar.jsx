import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Receipt, PiggyBank, User, LogOut, Wallet } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/expenses', label: 'Expenses', icon: Receipt },
  { to: '/budget', label: 'Budget', icon: PiggyBank },
  { to: '/profile', label: 'Profile', icon: User },
]

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-brand-mark">
          <Wallet size={17} />
        </span>
        StudentSpend
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
            <Icon />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button type="button" className="sidebar-link" onClick={() => navigate('/')}>
          <LogOut />
          Log out
        </button>
      </div>
    </aside>
  )
}
