import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { userService } from '../services/userService'
import Leaderboard from '../components/dashboard/Leaderboard'
import Spinner from '../components/common/Spinner'

const MOCK_ENTRIES = [
  { id: 'u1', name: 'María García',      points: 2100, streak: 15, modules: 6 },
  { id: 'u2', name: 'Andrés Martínez',   points: 1940, streak: 12, modules: 5 },
  { id: 'u3', name: 'Valentina López',   points: 1780, streak: 10, modules: 5 },
  { id: 'u4', name: 'Carlos Córdoba',    points: 840,  streak: 7,  modules: 3 },
  { id: 'u5', name: 'Sofía Hernández',   points: 720,  streak: 5,  modules: 3 },
  { id: 'u6', name: 'Diego Ramírez',     points: 610,  streak: 4,  modules: 2 },
  { id: 'u7', name: 'Catalina Torres',   points: 440,  streak: 3,  modules: 2 },
  { id: 'u8', name: 'Felipe Rodríguez',  points: 320,  streak: 1,  modules: 1 },
]

export default function LeaderboardPage() {
  const { user } = useAuth()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    userService.getLeaderboard()
      .then((res) => setEntries(res.data))
      .catch(() => setEntries(MOCK_ENTRIES))
      .finally(() => setLoading(false))
  }, [])

  const userRank = entries.findIndex((e) => e.id === user?.id) + 1

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">🏆 Tabla de clasificación</h1>
        <p className="text-slate-400 text-sm mt-1">Los estudiantes con más XP acumulados</p>
      </div>

      {userRank > 0 && (
        <div className="card text-center border-brand-700/30">
          <p className="text-slate-400 text-sm">Tu posición actual</p>
          <p className="text-4xl font-extrabold text-white">#{userRank}</p>
          <p className="text-brand-400 text-sm">{entries.find((e) => e.id === user?.id)?.points?.toLocaleString('es-CO')} XP</p>
        </div>
      )}

      <Leaderboard entries={entries} currentUserId={user?.id} />
    </div>
  )
}
