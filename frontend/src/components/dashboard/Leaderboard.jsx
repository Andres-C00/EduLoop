import { getInitials } from '../../utils/helpers'

const RANK_STYLE = [
  'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  'text-slate-300 bg-white/5 border-white/10',
  'text-orange-400 bg-orange-400/10 border-orange-400/30',
]
const MEDALS = ['🥇', '🥈', '🥉']

export default function Leaderboard({ entries = [], currentUserId }) {
  return (
    <div className="space-y-2">
      {entries.map((entry, i) => {
        const isUser = entry.id === currentUserId
        const top3 = i < 3
        return (
          <div
            key={entry.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all
              ${isUser ? 'border-brand-700/50 bg-brand-700/10' : 'border-white/5 bg-white/3 hover:bg-white/5'}
              ${top3 ? RANK_STYLE[i] : ''}`}
          >
            <div className={`w-8 text-center font-bold text-sm ${top3 ? '' : 'text-slate-500'}`}>
              {top3 ? MEDALS[i] : `${i + 1}`}
            </div>
            <div className="w-9 h-9 rounded-full bg-brand-700/60 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              {getInitials(entry.name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${isUser ? 'text-brand-300' : 'text-slate-200'}`}>
                {entry.name} {isUser && <span className="text-xs text-brand-500">(tú)</span>}
              </p>
              <p className="text-xs text-slate-500">🔥 {entry.streak} días · {entry.modules} módulos</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-bold text-yellow-300">{entry.points.toLocaleString('es-CO')}</p>
              <p className="text-xs text-slate-500">XP</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
