import { useState } from 'react'

const ITEMS = ['Ingeniería de Requerimientos', 'Diseño', 'Implementación', 'Pruebas', 'Despliegue', 'Mantenimiento']
const CORRECT_ORDER = [...ITEMS]

export default function DragDrop({ onComplete }) {
  const [order, setOrder] = useState(() => [...ITEMS].sort(() => Math.random() - 0.5))
  const [dragging, setDragging] = useState(null)
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(false)

  function onDragStart(idx) { setDragging(idx) }
  function onDragOver(e, idx) {
    e.preventDefault()
    if (dragging === null || dragging === idx) return
    const next = [...order]
    const item = next.splice(dragging, 1)[0]
    next.splice(idx, 0, item)
    setOrder(next)
    setDragging(idx)
  }
  function onDrop() { setDragging(null) }

  function check() {
    const isCorrect = order.every((item, i) => item === CORRECT_ORDER[i])
    setCorrect(isCorrect)
    setChecked(true)
    if (isCorrect) onComplete?.()
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-300 font-medium">Ordena las fases del CVDS de la primera a la última:</p>
      <div className="space-y-2">
        {order.map((item, i) => (
          <div
            key={item}
            draggable
            onDragStart={() => onDragStart(i)}
            onDragOver={(e) => onDragOver(e, i)}
            onDrop={onDrop}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-grab active:cursor-grabbing transition-all select-none
              ${dragging === i ? 'opacity-50 scale-95' : ''}
              ${checked ? (order[i] === CORRECT_ORDER[i] ? 'border-green-500/50 bg-green-500/10' : 'border-rose-500/50 bg-rose-500/10') : 'border-white/10 bg-navy-800 hover:border-brand-700/40'}`}
          >
            <span className="text-slate-600 text-sm font-mono w-4">{i + 1}.</span>
            <span className="text-sm font-medium text-slate-200 flex-1">{item}</span>
            <span className="text-slate-600">⠿</span>
          </div>
        ))}
      </div>

      {checked && (
        <div className={`p-3 rounded-lg text-sm ${correct ? 'bg-green-500/10 text-green-300 border border-green-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'}`}>
          {correct ? '✅ ¡Correcto! El orden es exacto.' : '❌ Algunos elementos están fuera de lugar. ¡Inténtalo de nuevo!'}
        </div>
      )}

      <div className="flex gap-2">
        <button onClick={check} className="btn-primary px-4 py-2 text-sm">Verificar</button>
        {checked && !correct && (
          <button onClick={() => { setChecked(false); setOrder([...ITEMS].sort(() => Math.random() - 0.5)) }} className="btn-secondary px-4 py-2 text-sm">Reintentar</button>
        )}
      </div>
    </div>
  )
}
