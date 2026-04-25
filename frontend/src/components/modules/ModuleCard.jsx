import { Link } from 'react-router-dom'
import ProgressBar from '../common/ProgressBar'
import Badge from '../common/Badge'

export default function ModuleCard({ module, progress = 0, locked = false }) {
  return (
    <Link
      to={locked ? '#' : `/modulos/${module.id}`}
      className={`card group block transition-all ${locked ? 'opacity-50 cursor-not-allowed' : 'hover:border-white/10 hover:shadow-lg hover:shadow-brand-900/20'}`}
    >
      <div className={`h-2 w-full rounded-full bg-gradient-to-r ${module.color} mb-4 opacity-60`} />
      <div className="flex items-start gap-3">
        <div className={`text-3xl bg-gradient-to-br ${module.color} p-2.5 rounded-xl`}>{module.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-white text-sm group-hover:text-brand-300 transition-colors">{module.title}</h3>
            {locked && <Badge color="gray">🔒 Bloqueado</Badge>}
            {progress === 100 && <Badge color="green">✅ Completado</Badge>}
          </div>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2">{module.description}</p>
          <div className="mt-3">
            <ProgressBar value={progress} showLabel={false} />
            <p className="text-xs text-slate-500 mt-1">{progress}% completado</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
