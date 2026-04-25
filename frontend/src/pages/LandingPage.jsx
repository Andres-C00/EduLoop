import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const FEATURES = [
  { icon: '📚', title: 'Módulos estructurados', desc: 'Aprende cada fase del CVDS con contenido multimedia y objetivos claros.' },
  { icon: '🎮', title: 'Gamificación real', desc: 'Gana puntos, mantén tu racha diaria y compite en el ranking global.' },
  { icon: '🧪', title: 'Cuestionarios adaptativos', desc: 'Retroalimentación inmediata con explicaciones detalladas por respuesta.' },
  { icon: '🏆', title: 'Certificación digital', desc: 'Descarga tu certificado en PDF al completar cada nivel.' },
  { icon: '📊', title: 'Dashboard de progreso', desc: 'Visualiza tus fortalezas, tiempo de estudio y avance semanal.' },
  { icon: '🔄', title: 'Dos niveles de dificultad', desc: 'Avanza de Básico a Avanzado a tu propio ritmo.' },
]

export default function LandingPage() {
  const { isAuth } = useAuth()
  if (isAuth) return <Navigate to="/dashboard" replace />

  return (
    <div className="min-h-screen bg-navy-950 bg-terminal-pattern">
      {/* Nav */}
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-brand-700 rounded-lg p-1.5 font-mono text-sm font-bold text-white">&gt;_</div>
          <span className="font-bold text-xl text-white tracking-wider">EDULOOP</span>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/login" className="btn-ghost text-sm px-4 py-2">Iniciar sesión</Link>
          <Link to="/register" className="btn-primary text-sm px-4 py-2 rounded-lg">Empezar gratis</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-700/20 border border-brand-700/40 rounded-full px-4 py-1.5 text-brand-300 text-sm font-medium mb-6">
          <span>🎓</span> Plataforma educativa de Ingeniería de Software
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 leading-tight">
          Aprende el <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">Ciclo de Vida</span> del Software
        </h1>
        <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
          Domina cada fase del CVDS con módulos interactivos, cuestionarios gamificados y seguimiento de progreso en tiempo real. Diseñado para estudiantes de Ingeniería de Sistemas.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/register" className="btn-primary px-8 py-3 text-base rounded-xl">
            Comenzar ahora →
          </Link>
          <Link to="/login" className="btn-secondary px-8 py-3 text-base rounded-xl">
            Ya tengo cuenta
          </Link>
        </div>

        {/* Terminal mockup */}
        <div className="mt-16 max-w-2xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-brand-900/30">
          <div className="bg-navy-800 px-4 py-2.5 flex items-center gap-2 border-b border-white/5">
            <span className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-slate-500 text-xs ml-2 font-mono">eduloop ~ cvds</span>
          </div>
          <div className="bg-navy-900 p-5 font-mono text-sm text-left space-y-1">
            <p><span className="text-brand-400">›</span> <span className="text-green-400">módulos completados</span> <span className="text-white">4 / 6</span></p>
            <p><span className="text-brand-400">›</span> <span className="text-yellow-400">racha actual</span> <span className="text-white">🔥 7 días</span></p>
            <p><span className="text-brand-400">›</span> <span className="text-purple-400">puntos totales</span> <span className="text-white">1 240 XP</span></p>
            <p><span className="text-brand-400">›</span> <span className="text-brand-300">nivel</span> <span className="text-white">Básico → Avanzado ✅</span></p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Todo lo que necesitas para aprender</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="card hover:border-brand-700/40 transition-colors group">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-white mb-1 group-hover:text-brand-300 transition-colors">{f.title}</h3>
              <p className="text-sm text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 text-center text-slate-600 text-sm">
        EduLoop © 2026 — Universidad de los Llanos · Ingeniería de Software II
      </footer>
    </div>
  )
}
