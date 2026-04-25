import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { CVDS_MODULES, PASS_SCORE } from '../utils/constants'
import { shuffleArray } from '../utils/helpers'
import Button from '../components/common/Button'
import ProgressBar from '../components/common/ProgressBar'
import Spinner from '../components/common/Spinner'

const EXAM_TIME = 30 * 60 // 30 minutes in seconds

const MOCK_QUESTIONS = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  text: `Pregunta de examen ${i + 1}: ¿Cuál de las siguientes afirmaciones es correcta sobre el CVDS?`,
  options: ['Opción A — primera alternativa', 'Opción B — segunda alternativa', 'Opción C — tercera alternativa', 'Opción D — cuarta alternativa'],
  correct: Math.floor(Math.random() * 4),
}))

function formatTime(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, '0')
  const s = String(secs % 60).padStart(2, '0')
  return `${m}:${s}`
}

export default function ExamPage() {
  const { moduleId } = useParams()
  const navigate = useNavigate()
  const [questions] = useState(() => shuffleArray(MOCK_QUESTIONS))
  const [answers, setAnswers] = useState({})
  const [current, setCurrent] = useState(0)
  const [timeLeft, setTimeLeft] = useState(EXAM_TIME)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)
  const intervalRef = useRef(null)

  const module = CVDS_MODULES.find((m) => m.id === Number(moduleId))

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!loading && !submitted) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) { clearInterval(intervalRef.current); handleSubmit(); return 0 }
          return t - 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [loading, submitted])

  function handleAnswer(questionId, optIdx) {
    setAnswers((a) => ({ ...a, [questionId]: optIdx }))
  }

  function handleSubmit() {
    clearInterval(intervalRef.current)
    setSubmitted(true)
  }

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>

  if (submitted) {
    const score = Math.round(
      (questions.filter((q) => answers[q.id] === q.correct).length / questions.length) * 100
    )
    const passed = score >= PASS_SCORE
    return (
      <div className="max-w-lg mx-auto text-center space-y-5 animate-fade-in py-10">
        <div className="text-6xl">{passed ? '🎓' : '📚'}</div>
        <h1 className="text-2xl font-bold text-white">{passed ? '¡Nivel superado!' : 'Necesitas repasar'}</h1>
        <div className="card">
          <p className="text-5xl font-extrabold text-white mb-1">{score}%</p>
          <p className={`font-medium ${passed ? 'text-green-400' : 'text-rose-400'}`}>
            {passed ? 'Aprobado ✅' : `Reprobado ❌ (mínimo ${PASS_SCORE}%)`}
          </p>
          <p className="text-slate-400 text-sm mt-2">
            {questions.filter((q) => answers[q.id] === q.correct).length}/{questions.length} respuestas correctas
          </p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button onClick={() => navigate(`/modulos/${moduleId}`)} variant="secondary">← Volver al módulo</Button>
          {passed && <Button onClick={() => navigate('/certificado')}>🎓 Ver certificado</Button>}
        </div>
      </div>
    )
  }

  const q = questions[current]
  const answeredCount = Object.keys(answers).length
  const urgent = timeLeft < 300

  return (
    <div className="max-w-2xl mx-auto space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-white">Examen Final</h1>
          <p className="text-sm text-slate-400">{module?.title}</p>
        </div>
        <div className={`font-mono text-lg font-bold px-4 py-2 rounded-xl border ${urgent ? 'text-rose-400 border-rose-500/40 bg-rose-500/10 animate-pulse' : 'text-brand-300 border-brand-700/40 bg-brand-700/10'}`}>
          ⏱ {formatTime(timeLeft)}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ProgressBar value={(answeredCount / questions.length) * 100} label={`${answeredCount}/${questions.length} respondidas`} showLabel />
      </div>

      {/* Question navigation */}
      <div className="flex flex-wrap gap-1.5">
        {questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors
              ${i === current ? 'bg-brand-700 text-white' : answers[questions[i].id] !== undefined ? 'bg-green-700/30 text-green-300 border border-green-600/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="card">
        <p className="text-xs text-slate-500 mb-2">Pregunta {current + 1} de {questions.length}</p>
        <p className="text-base font-semibold text-white mb-5">{q.text}</p>
        <div className="space-y-2.5">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(q.id, i)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all text-sm font-medium border
                ${answers[q.id] === i ? 'border-brand-600 bg-brand-700/20 text-brand-300' : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:border-white/20'}`}
            >
              <span className="text-brand-400 font-mono mr-2">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}>← Anterior</Button>
          <Button variant="ghost" onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))} disabled={current === questions.length - 1}>Siguiente →</Button>
        </div>
        <Button onClick={handleSubmit} variant="danger">
          Entregar examen ({answeredCount}/{questions.length})
        </Button>
      </div>
    </div>
  )
}
