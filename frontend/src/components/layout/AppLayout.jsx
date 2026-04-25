import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import Notifications from './Notifications'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-navy-950">
      <Header />
      <Sidebar />
      <main className="lg:pl-60 pt-0">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
      <Notifications />
    </div>
  )
}
