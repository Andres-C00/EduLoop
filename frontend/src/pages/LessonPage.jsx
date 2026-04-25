import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { CVDS_MODULES } from '../utils/constants'
import Button from '../components/common/Button'
import Spinner from '../components/common/Spinner'

const MOCK_LESSON = {
  title: 'Introducción y conceptos clave',
  duration: '8 min',
  type: 'video',
  videoUrl: null,
  content: `El ciclo de vida del software (CVDS) describe las etapas que atraviesa un sistema desde su concepción hasta su retiro. Comprender estas fases es fundamental para cualquier ingeniero de software.

Las principales fases incluyen:

**1. Ingeniería de Requerimientos**
Se identifican y documentan las necesidades del cliente y los usuarios. El resultado principal es la Especificación de Requisitos de Software (SRS).

**2. Diseño**
Se transforma el SRS en una arquitectura técnica detallada. Incluye el diseño de base de datos, componentes, interfaces y comportamiento del sistema.

**3. Implementación**
Los desarrolladores escriben el código siguiendo los estándares definidos y los diseños previamente elaborados.

**4. Pruebas**
Se verifica que el sistema cumple los requisitos funcionales y no funcionales. Incluye pruebas unitarias, de integración y de aceptación.

**5. Despliegue**
El sistema se pone en producción y se realiza la transición al entorno de uso real.

**6. Mantenimiento**
Actividades correctivas, adaptativas y perfectivas que aseguran la vigencia del sistema.`,
}

export default function LessonPage() {
  const { id: moduleId, lessonId } = useParams()
  const navigate = useNavigate()
  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [completing, setCompleting] = useState(false)

  const module = CVDS_MODULES.find((m) => m.id === Number(moduleId))

  useEffect(() => {
    const t = setTimeout(() => { setLesson(MOCK_LESSON); setLoading(false) }, 400)
    return () => clearTimeout(t)
  }, [lessonId])

  async function handleComplete() {
    setCompleting(true)
    await new Promise((r) => setTimeout(r, 600))
    navigate(`/modulos/${moduleId}`)
  }

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>
  if (!lesson) return null

  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-fade-in">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/modulos" className="hover:text-white">Módulos</Link>
        <span>/</span>
        <Link to={`/modulos/${moduleId}`} className="hover:text-white">{module?.title}</Link>
        <span>/</span>
        <span className="text-slate-300">{lesson.title}</span>
      </div>

      <div className="card">
        <h1 className="text-xl font-bold text-white mb-1">{lesson.title}</h1>
        <p className="text-xs text-slate-500 mb-5">📄 Lectura · {lesson.duration}</p>

        {/* Video placeholder */}
        {lesson.type === 'video' && (
          <div className="aspect-video bg-navy-900 rounded-xl flex items-center justify-center mb-6 border border-white/5">
            <div className="text-center">
              <div className="text-5xl mb-2">▶️</div>
              <p className="text-slate-400 text-sm">Video próximamente disponible</p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="prose prose-invert prose-sm max-w-none">
          {lesson.content.split('\n\n').map((para, i) => (
            <p key={i} className="text-slate-300 leading-relaxed mb-4 whitespace-pre-line">{para}</p>
          ))}
        </div>

        <div className="flex justify-end pt-5 border-t border-white/5 mt-6">
          <Button onClick={handleComplete} loading={completing}>
            Marcar como completada ✓
          </Button>
        </div>
      </div>
    </div>
  )
}
