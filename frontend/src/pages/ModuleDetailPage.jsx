import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { CVDS_MODULES } from '../utils/constants'
import ProgressBar from '../components/common/ProgressBar'
import Badge from '../components/common/Badge'
import Button from '../components/common/Button'
import Spinner from '../components/common/Spinner'

const MOCK_LESSONS = [
  { id: 1, title: 'Introducción y conceptos clave', duration: '8 min', completed: true,  type: 'video' },
  { id: 2, title: 'Procesos y metodologías',        duration: '12 min', completed: true,  type: 'lectura' },
  { id: 3, title: 'Artefactos y entregables',       duration: '10 min', completed: false, type: 'video' },
  { id: 4, title: 'Herramientas del sector',        duration: '7 min',  completed: false, type: 'lectura' },
  { id: 5, title: 'Casos de estudio reales',        duration: '15 min', completed: false, type: 'video' },
]

const typeIcon = { video: '▶️', lectura: '📄', interactivo: '🎮' }

export default function ModuleDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)

  const module = CVDS_MODULES.find((m) => m.id === Number(id))

  useEffect(() => {
    const t = setTimeout(() => { setLessons(MOCK_LESSONS); setLoading(false) }, 400)
    return () => clearTimeout(t)
  }, [id])

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>
  if (!module) return <div className="text-center py-20 text-slate-400">Módulo no encontrado</div>

  const completed = lessons.filter((l) => l.completed).length
  const progress = Math.round((completed / lessons.length) * 100)

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/modulos" className="hover:text-white">Módulos</Link>
        <span>/</span>
        <span className="text-slate-300">{module.title}</span>
      </div>

      {/* Module header */}
      <div className="card">
        <div className={`h-1 w-full rounded-full bg-gradient-to-r ${module.color} mb-5`} />
        <div className="flex items-start gap-4">
          <div className={`text-4xl bg-gradient-to-br ${module.color} p-3 rounded-2xl`}>{module.icon}</div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">{module.title}</h1>
            <p className="text-slate-400 text-sm mt-1">{module.description}</p>
            <div className="mt-3">
              <ProgressBar value={progress} label="Progreso" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
          <Badge color="teal">📚 {lessons.length} lecciones</Badge>
          <Badge color="green">✅ {completed} completadas</Badge>
          {progress === 100 && <Badge color="yellow">🏆 Examen disponible</Badge>}
        </div>
      </div>

      {/* Lessons list */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Lecciones</h2>
        <div className="space-y-2">
          {lessons.map((lesson, i) => {
            const locked = i > 0 && !lessons[i - 1].completed
            return (
              <Link
                key={lesson.id}
                to={locked ? '#' : `/modulos/${id}/leccion/${lesson.id}`}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all
                  ${lesson.completed ? 'bg-green-500/5 border-green-500/20' : 'bg-navy-800 border-white/5'}
                  ${locked ? 'opacity-50 cursor-not-allowed' : 'hover:border-brand-700/40 hover:bg-brand-700/10'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0
                  ${lesson.completed ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-slate-400'}`}>
                  {lesson.completed ? '✓' : locked ? '🔒' : `${i + 1}`}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${lesson.completed ? 'text-green-300' : 'text-white'}`}>{lesson.title}</p>
                  <p className="text-xs text-slate-500">{typeIcon[lesson.type]} {lesson.type} · {lesson.duration}</p>
                </div>
                {!locked && !lesson.completed && (
                  <span className="text-brand-400 text-sm">→</span>
                )}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => navigate(`/modulos/${id}/cuestionario`)} variant="secondary">
          📝 Cuestionario
        </Button>
        {progress === 100 && (
          <Button onClick={() => navigate(`/modulos/${id}/examen`)}>
            🎓 Examen final
          </Button>
        )}
      </div>
    </div>
  )
}
