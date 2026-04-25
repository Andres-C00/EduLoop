import { useState, useEffect } from 'react'
import { CVDS_MODULES, LEVELS } from '../utils/constants'
import ModuleCard from '../components/modules/ModuleCard'
import Spinner from '../components/common/Spinner'

const MOCK_PROGRESS = [100, 100, 60, 0, 0, 0]

export default function ModulesPage() {
  const [level, setLevel] = useState(LEVELS.BASIC)
  const [search, setSearch] = useState('')
  const [progress] = useState(MOCK_PROGRESS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(t)
  }, [])

  const filtered = CVDS_MODULES.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Módulos de aprendizaje</h1>
        <p className="text-slate-400 text-sm mt-1">6 fases del Ciclo de Vida del Software</p>
      </div>

      {/* Level selector */}
      <div className="flex items-center gap-2">
        {[LEVELS.BASIC, LEVELS.ADVANCED].map((l) => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              level === l ? 'bg-brand-700 text-white' : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            {l === LEVELS.BASIC ? '📗 Nivel Básico' : '📘 Nivel Avanzado'}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔍</span>
        <input
          type="text"
          placeholder="Buscar módulo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-9"
        />
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((mod, i) => (
          <ModuleCard
            key={mod.id}
            module={mod}
            progress={progress[i] ?? 0}
            locked={level === LEVELS.ADVANCED && progress[i] < 100}
          />
        ))}
        {!filtered.length && (
          <div className="col-span-full text-center py-12 text-slate-500">
            No se encontraron módulos para "{search}"
          </div>
        )}
      </div>
    </div>
  )
}
