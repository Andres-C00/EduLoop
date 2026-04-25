import { useState } from 'react'
import DragDrop from '../components/activities/DragDrop'
import Matching from '../components/activities/Matching'
import FillInBlank from '../components/activities/FillInBlank'

const TABS = [
  { id: 'dragdrop',   label: '🔀 Ordenar', desc: 'Arrastra y ordena las fases del CVDS.' },
  { id: 'matching',  label: '🔗 Emparejar', desc: 'Conecta términos con sus definiciones.' },
  { id: 'fillin',    label: '✏️ Completar', desc: 'Rellena los espacios en blanco.' },
]

export default function ActivitiesPage() {
  const [activeTab, setActiveTab] = useState('dragdrop')
  const [completed, setCompleted] = useState({})

  function handleComplete(id) {
    setCompleted((c) => ({ ...c, [id]: true }))
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Actividades interactivas</h1>
        <p className="text-slate-400 text-sm mt-1">Practica con ejercicios dinámicos sobre el CVDS</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border
              ${activeTab === tab.id
                ? 'bg-brand-700/30 border-brand-700/60 text-brand-300'
                : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
          >
            {tab.label}
            {completed[tab.id] && <span className="text-green-400 text-xs">✓</span>}
          </button>
        ))}
      </div>

      <div className="card max-w-3xl">
        <p className="text-xs text-slate-500 mb-5">{TABS.find((t) => t.id === activeTab)?.desc}</p>
        {activeTab === 'dragdrop' && <DragDrop onComplete={() => handleComplete('dragdrop')} />}
        {activeTab === 'matching' && <Matching onComplete={() => handleComplete('matching')} />}
        {activeTab === 'fillin' && <FillInBlank onComplete={() => handleComplete('fillin')} />}
      </div>

      {/* Progress */}
      <div className="card max-w-3xl">
        <p className="text-sm font-semibold text-slate-300 mb-3">Tu progreso en actividades</p>
        <div className="flex gap-4 flex-wrap">
          {TABS.map((tab) => (
            <div key={tab.id} className="flex items-center gap-2 text-sm">
              <div className={`w-3 h-3 rounded-full ${completed[tab.id] ? 'bg-green-500' : 'bg-white/10'}`} />
              <span className={completed[tab.id] ? 'text-green-300' : 'text-slate-400'}>{tab.label}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3">
          {Object.keys(completed).length}/{TABS.length} actividades completadas
        </p>
      </div>
    </div>
  )
}
