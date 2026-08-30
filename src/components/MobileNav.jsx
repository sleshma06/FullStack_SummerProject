import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Receipt, PiggyBank, User } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/expenses', label: 'Expenses', icon: Receipt },
  { to: '/budget', label: 'Budget', icon: PiggyBank },
  { to: '/profile', label: 'Profile', icon: User },
]

export default function MobileNav() {
  return (
    <nav className="mobile-nav" aria-label="Main navigation">
      {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
        <NavLink key={to} to={to} className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}>
          <Icon />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
