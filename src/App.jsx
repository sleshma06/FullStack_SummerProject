import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import { ExpenseProvider } from './context/ExpenseContext'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import Budget from './pages/Budget'
import Profile from './pages/Profile'

// Route map:
//   /            Landing (public)
//   /login       Login (public)
//   /signup      Signup (public)
//   /dashboard   Dashboard   \
//   /expenses    Expenses     } wrapped in <Layout> (sidebar / bottom nav)
//   /budget      Budget      /
//   /profile     Profile    /
//
// There's no real auth yet (see AuthLayout / Login / Signup), so the "app"
// routes are reachable directly — that's intentional for a frontend-only
// prototype. Once the Express backend exists, this is the natural place to
// add a route guard around the four Layout-wrapped routes.
export default function App() {
  return (
    <ToastProvider>
      <ExpenseProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/expenses" element={<Layout><Expenses /></Layout>} />
          <Route path="/budget" element={<Layout><Budget /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ExpenseProvider>
    </ToastProvider>
  )
}
