import { NavLink } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

const NAV_ITEMS = [
  { to: '/dashboard',    label: 'Inicio',      icon: '🏠' },
  { to: '/modulos',      label: 'Módulos',     icon: '📚' },
  { to: '/actividades',  label: 'Actividades', icon: '🎮' },
  { to: '/clasificacion',label: 'Ranking',     icon: '🏆' },
  { to: '/perfil',       label: 'Mi Perfil',   icon: '👤' },
  { to: '/certificado',  label: 'Certificados',icon: '🎓' },
]

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useApp()

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={toggleSidebar} />
      )}
      <aside
        className={`fixed left-0 top-14 h-[calc(100vh-3.5rem)] z-40 w-60 bg-navy-900 border-r border-white/5 flex flex-col py-4 transition-transform duration-300
          lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <nav className="flex-1 px-3 space-y-0.5">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => { if (sidebarOpen) toggleSidebar() }}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-brand-700/30 text-brand-300 font-medium border border-brand-700/40'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <span className="text-base w-5 text-center">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 pb-2">
          <div className="text-xs text-slate-600 text-center">EduLoop v1.0 · Sprint 1</div>
        </div>
      </aside>
    </>
  )
}
