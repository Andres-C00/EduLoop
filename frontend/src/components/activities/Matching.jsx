import { useState } from 'react'

const PAIRS = [
  { left: 'SRS', right: 'Especificación de Requisitos de Software' },
  { left: 'CI/CD', right: 'Integración y Entrega Continua' },
  { left: 'ORM', right: 'Mapeo Objeto-Relacional' },
  { left: 'JWT', right: 'JSON Web Token' },
]

export default function Matching({ onComplete }) {
  const [selected, setSelected] = useState({ left: null, right: null })
  const [matched, setMatched] = useState([])
  const [wrong, setWrong] = useState(null)
  const rights = PAIRS.map((p) => p.right).sort(() => Math.random() - 0.5)
  const [shuffledRights] = useState(rights)

  function selectLeft(idx) {
    setWrong(null)
    setSelected((s) => ({ ...s, left: idx }))
  }

  function selectRight(val) {
    if (selected.left === null) return
    const leftTerm = PAIRS[selected.left].left
    const correct = PAIRS.find((p) => p.left === leftTerm)?.right === val
    if (correct) {
      setMatched((m) => [...m, selected.left])
      if (matched.length + 1 === PAIRS.length) onComplete?.()
    } else {
      setWrong(selected.left)
    }
    setSelected({ left: null, right: null })
  }

  const done = matched.length === PAIRS.length

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-300 font-medium">Empareja cada término con su definición:</p>
      {done && <div className="p-3 rounded-lg text-sm bg-green-500/10 text-green-300 border border-green-500/20">✅ ¡Todos los pares correctos!</div>}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {PAIRS.map((pair, i) => (
            <button
              key={pair.left}
              onClick={() => !matched.includes(i) && selectLeft(i)}
              disabled={matched.includes(i)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium border transition-all
                ${matched.includes(i) ? 'border-green-500/40 bg-green-500/10 text-green-300 cursor-default' : ''}
                ${selected.left === i && !matched.includes(i) ? 'border-brand-500 bg-brand-700/20 text-brand-300' : ''}
                ${wrong === i ? 'border-rose-500/60 bg-rose-500/10 text-rose-300' : ''}
                ${selected.left !== i && !matched.includes(i) && wrong !== i ? 'border-white/10 bg-white/5 text-slate-300 hover:border-brand-700/40' : ''}`}
            >
              {matched.includes(i) ? '✓ ' : ''}{pair.left}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {shuffledRights.map((right) => {
            const isMatched = PAIRS.some((p, i) => p.right === right && matched.includes(i))
            return (
              <button
                key={right}
                onClick={() => !isMatched && selectRight(right)}
                disabled={isMatched}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm border transition-all
                  ${isMatched ? 'border-green-500/40 bg-green-500/10 text-green-300 cursor-default' : 'border-white/10 bg-white/5 text-slate-300 hover:border-brand-700/40 hover:bg-brand-700/10'}`}
              >
                {isMatched ? '✓ ' : ''}{right}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
