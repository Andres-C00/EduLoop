import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { CVDS_MODULES, POINTS_PER_CORRECT, PASS_SCORE } from '../utils/constants'
import { shuffleArray } from '../utils/helpers'
import Button from '../components/common/Button'
import ProgressBar from '../components/common/ProgressBar'
import LivesCounter from '../components/gamification/LivesCounter'
import Spinner from '../components/common/Spinner'

const MOCK_QUESTIONS = [
  { id: 1, text: '¿Cuál es el primer artefacto que se genera en la Ingeniería de Requerimientos?', options: ['Diagrama de clases', 'Especificación de Requisitos (SRS)', 'Código fuente', 'Plan de pruebas'], correct: 1 },
  { id: 2, text: '¿Qué metodología ágil divide el trabajo en iteraciones llamadas "sprints"?', options: ['Waterfall', 'XP', 'Scrum', 'CMMI'], correct: 2 },
  { id: 3, text: '¿Cuál fase valida que el sistema cumple los requisitos?', options: ['Diseño', 'Implementación', 'Pruebas', 'Mantenimiento'], correct: 2 },
  { id: 4, text: 'El patrón MVC separa la aplicación en:', options: ['Módulos, Vistas, Controladores', 'Modelo, Vista, Controlador', 'Microservices, Views, Classes', 'Módulos, Variables, Comandos'], correct: 1 },
  { id: 5, text: '¿Qué tipo de prueba verifica el sistema completo de extremo a extremo?', options: ['Unitaria', 'De integración', 'De sistema', 'De regresión'], correct: 2 },
]

export default function QuizPage() {
  const { moduleId } = useParams()
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [results, setResults] = useState([])
  const [lives, setLives] = useState(5)
  const [finished, setFinished] = useState(false)
  const [loading, setLoading] = useState(true)

  const module = CVDS_MODULES.find((m) => m.id === Number(moduleId))

  useEffect(() => {
    const t = setTimeout(() => { setQuestions(shuffleArray(MOCK_QUESTIONS)); setLoading(false) }, 400)
    return () => clearTimeout(t)
  }, [])

  function handleSelect(optIdx) {
    if (answered) return
    setSelected(optIdx)
    setAnswered(true)
    const correct = questions[current].correct === optIdx
    if (!correct) setLives((l) => Math.max(0, l - 1))
    setResults((r) => [...r, { id: questions[current].id, correct, selected: optIdx }])
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>

  if (finished) {
    const score = Math.round((results.filter((r) => r.correct).length / questions.length) * 100)
    const passed = score >= PASS_SCORE
    return (
      <div className="max-w-lg mx-auto text-center space-y-5 animate-fade-in py-10">
        <div className="text-6xl">{passed ? '🎉' : '😅'}</div>
        <h1 className="text-2xl font-bold text-white">{passed ? '¡Excelente trabajo!' : 'Sigue practicando'}</h1>
        <div className="card">
          <p className="text-5xl font-extrabold text-white mb-1">{score}%</p>
          <p className="text-slate-400">{results.filter((r) => r.correct).length}/{questions.length} respuestas correctas</p>
          <p className="text-xs text-slate-500 mt-1">+{results.filter((r) => r.correct).length * POINTS_PER_CORRECT} XP ganados</p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button onClick={() => navigate(`/modulos/${moduleId}`)} variant="secondary">← Volver al módulo</Button>
          <Button onClick={() => { setFinished(false); setCurrent(0); setSelected(null); setAnswered(false); setResults([]); setLives(5); setQuestions(shuffleArray(MOCK_QUESTIONS)) }}>
            🔄 Repetir
          </Button>
        </div>
      </div>
    )
  }

  const q = questions[current]
  if (!q) return null
  const isCorrect = answered && selected === q.correct

  return (
    <div className="max-w-2xl mx-auto space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <Link to={`/modulos/${moduleId}`} className="text-sm text-slate-400 hover:text-white">← {module?.title}</Link>
        <LivesCounter lives={lives} />
      </div>

      <ProgressBar value={((current) / questions.length) * 100} label={`Pregunta ${current + 1} de ${questions.length}`} />

      <div className="card">
        <p className="text-lg font-semibold text-white mb-6">{q.text}</p>

        <div className="space-y-2.5">
          {q.options.map((opt, i) => {
            let style = 'border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
            if (answered) {
              if (i === q.correct) style = 'border border-green-500/60 bg-green-500/10 text-green-300'
              else if (i === selected) style = 'border border-rose-500/60 bg-rose-500/10 text-rose-300'
              else style = 'border border-white/5 bg-white/2 text-slate-500'
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all text-sm font-medium ${style} ${!answered ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <span className="text-brand-400 font-mono mr-2">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            )
          })}
        </div>

        {answered && (
          <div className={`mt-4 p-3 rounded-lg text-sm ${isCorrect ? 'bg-green-500/10 text-green-300 border border-green-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'}`}>
            {isCorrect ? '✅ ¡Correcto! +' + POINTS_PER_CORRECT + ' XP' : `❌ Incorrecto. La respuesta correcta es: ${q.options[q.correct]}`}
          </div>
        )}
      </div>

      {answered && (
        <div className="flex justify-end">
          <Button onClick={handleNext}>
            {current + 1 >= questions.length ? 'Ver resultados →' : 'Siguiente →'}
          </Button>
        </div>
      )}
    </div>
  )
}
