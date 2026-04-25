import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { userService } from '../services/userService'
import { CVDS_MODULES } from '../utils/constants'
import { calcProgress } from '../utils/helpers'
import StatsCard from '../components/dashboard/StatsCard'
import ProgressChart from '../components/dashboard/ProgressChart'
import ProgressBar from '../components/common/ProgressBar'
import LivesCounter from '../components/gamification/LivesCounter'
import StreakBadge from '../components/gamification/StreakBadge'
import PointsDisplay from '../components/gamification/PointsDisplay'
import Spinner from '../components/common/Spinner'

const MOCK_STATS = {
  points: 840, streak: 7, lives: 4,
  modulesCompleted: 3, totalModules: 6,
  quizzesCompleted: 12, avgScore: 82,
  weeklyData: [
    { day: 'Lun', puntos: 30 }, { day: 'Mar', puntos: 65 }, { day: 'Mié', puntos: 45 },
    { day: 'Jue', puntos: 90 }, { day: 'Vie', puntos: 55 }, { day: 'Sáb', puntos: 120 }, { day: 'Dom', puntos: 80 },
  ],
  moduleProgress: [
    { id: 1, progress: 100 }, { id: 2, progress: 100 }, { id: 3, progress: 100 },
    { id: 4, progress: 60 }, { id: 5, progress: 0 }, { id: 6, progress: 0 },
  ],
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    userService.getStats()
      .then((res) => setStats(res.data))
      .catch(() => setStats(MOCK_STATS))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>

  const s = stats ?? MOCK_STATS
  const overallProgress = calcProgress(s.modulesCompleted, s.totalModules)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Hola, {user?.name?.split(' ')[0]} 👋</h1>
          <p className="text-slate-400 text-sm mt-0.5">Continúa donde lo dejaste</p>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <StreakBadge streak={s.streak} />
          <PointsDisplay points={s.points} />
          <LivesCounter lives={s.lives} />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon="📚" label="Módulos" value={`${s.modulesCompleted}/${s.totalModules}`} subtext="completados" />
        <StatsCard icon="🧪" label="Cuestionarios" value={s.quizzesCompleted} subtext="resueltos" colorClass="text-purple-400" />
        <StatsCard icon="🎯" label="Promedio" value={`${s.avgScore}%`} subtext="en cuestionarios" colorClass="text-green-400" />
        <StatsCard icon="⭐" label="Puntos XP" value={s.points.toLocaleString('es-CO')} subtext="acumulados" colorClass="text-yellow-400" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Weekly chart */}
        <div className="lg:col-span-2 card">
          <h2 className="text-sm font-semibold text-slate-300 mb-4">Puntos esta semana</h2>
          <ProgressChart data={s.weeklyData} />
        </div>

        {/* Overall progress */}
        <div className="card flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-300 mb-1">Progreso general</h2>
            <p className="text-4xl font-bold text-white mb-1">{overallProgress}%</p>
            <p className="text-xs text-slate-500">Nivel Básico</p>
          </div>
          <div className="mt-4">
            <ProgressBar value={overallProgress} showLabel={false} />
            <p className="text-xs text-slate-500 mt-2">{s.modulesCompleted} de {s.totalModules} módulos completados</p>
          </div>
        </div>
      </div>

      {/* Modules progress */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Tus módulos</h2>
          <Link to="/modulos" className="text-sm text-brand-400 hover:text-brand-300">Ver todos →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CVDS_MODULES.map((mod) => {
            const prog = s.moduleProgress?.find((p) => p.id === mod.id)?.progress ?? 0
            const locked = prog === 0 && mod.id > 1
            return (
              <Link
                key={mod.id}
                to={locked ? '#' : `/modulos/${mod.id}`}
                className={`card group transition-all hover:border-white/10 ${locked ? 'opacity-50 cursor-not-allowed' : 'hover:border-brand-700/50'}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`text-2xl bg-gradient-to-br ${mod.color} p-2 rounded-xl`}>{mod.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{mod.title}</p>
                    <div className="mt-2">
                      <ProgressBar value={prog} showLabel={false} />
                      <p className="text-xs text-slate-500 mt-1">{prog}% completado</p>
                    </div>
                  </div>
                  {prog === 100 && <span className="text-green-400 text-lg">✅</span>}
                  {locked && <span className="text-slate-500 text-lg">🔒</span>}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
