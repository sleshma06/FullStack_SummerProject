import Sidebar from './Sidebar'
import MobileNav from './MobileNav'

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-main">
        {children}
        <MobileNav />
      </main>
    </div>
  )
}
