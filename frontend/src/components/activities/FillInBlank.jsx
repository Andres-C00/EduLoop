import { useState } from 'react'

const SENTENCES = [
  { before: 'El', blank: 'Scrum', after: 'es un marco de trabajo ágil que organiza el trabajo en sprints.' },
  { before: 'La fase de', blank: 'Pruebas', after: 'verifica que el sistema cumple con los requisitos definidos.' },
  { before: 'El patrón', blank: 'MVC', after: 'separa la lógica de negocio de la presentación.' },
]

export default function FillInBlank({ onComplete }) {
  const [answers, setAnswers] = useState(Array(SENTENCES.length).fill(''))
  const [checked, setChecked] = useState(false)

  function check() {
    setChecked(true)
    const allCorrect = answers.every((a, i) => a.trim().toLowerCase() === SENTENCES[i].blank.toLowerCase())
    if (allCorrect) onComplete?.()
  }

  function reset() { setAnswers(Array(SENTENCES.length).fill('')); setChecked(false) }

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-300 font-medium">Completa las oraciones con la palabra correcta:</p>
      {SENTENCES.map((s, i) => {
        const isCorrect = checked && answers[i].trim().toLowerCase() === s.blank.toLowerCase()
        const isWrong = checked && answers[i].trim().toLowerCase() !== s.blank.toLowerCase()
        return (
          <div key={i} className="flex flex-wrap items-center gap-2 text-sm text-slate-200 leading-loose">
            <span>{s.before}</span>
            <input
              type="text"
              value={answers[i]}
              onChange={(e) => { const a = [...answers]; a[i] = e.target.value; setAnswers(a) }}
              disabled={checked}
              placeholder="___"
              className={`px-3 py-1 rounded-lg border text-sm font-semibold w-36 focus:outline-none transition-colors
                ${isCorrect ? 'border-green-500 bg-green-500/10 text-green-300' : ''}
                ${isWrong ? 'border-rose-500 bg-rose-500/10 text-rose-300' : ''}
                ${!checked ? 'border-brand-700/60 bg-navy-900 text-white focus:border-brand-500' : ''}`}
            />
            {isWrong && <span className="text-xs text-slate-500">(→ {s.blank})</span>}
            <span>{s.after}</span>
          </div>
        )
      })}
      <div className="flex gap-2">
        {!checked ? (
          <button onClick={check} className="btn-primary px-4 py-2 text-sm">Verificar</button>
        ) : (
          <button onClick={reset} className="btn-secondary px-4 py-2 text-sm">Reintentar</button>
        )}
      </div>
    </div>
  )
}
