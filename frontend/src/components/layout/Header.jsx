import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useApp } from '../../context/AppContext'
import { getInitials } from '../../utils/helpers'

export default function Header() {
  const { user, logout } = useAuth()
  const { toggleSidebar } = useApp()

  return (
    <header className="sticky top-0 z-40 h-14 bg-navy-900/95 backdrop-blur border-b border-white/5 flex items-center px-4 gap-3">
      <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white lg:hidden">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>

      <Link to="/dashboard" className="flex items-center gap-2 mr-auto">
        <div className="bg-brand-700 rounded-lg p-1.5 font-mono text-xs font-bold text-white leading-none">&gt;_</div>
        <span className="font-bold text-white hidden sm:block">EDULOOP</span>
      </Link>

      <nav className="hidden md:flex items-center gap-1">
        <NavLink to="/modulos">Módulos</NavLink>
        <NavLink to="/actividades">Actividades</NavLink>
        <NavLink to="/clasificacion">Ranking</NavLink>
      </nav>

      <div className="flex items-center gap-2 ml-2">
        <Link to="/perfil" className="flex items-center gap-2 hover:bg-white/5 rounded-lg px-2 py-1 transition-colors">
          <div className="w-8 h-8 rounded-full bg-brand-700 flex items-center justify-center text-xs font-bold text-white">
            {user?.avatar ? <img src={user.avatar} alt="" className="w-full h-full rounded-full object-cover" /> : getInitials(user?.name ?? '')}
          </div>
          <span className="text-sm text-slate-300 hidden sm:block">{user?.name?.split(' ')[0]}</span>
        </Link>
        <button onClick={logout} title="Cerrar sesión" className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-rose-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
        </button>
      </div>
    </header>
  )
}

function NavLink({ to, children }) {
  return (
    <Link to={to} className="px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
      {children}
    </Link>
  )
}
