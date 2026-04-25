const colorMap = {
  teal:   'bg-brand-700/30 text-brand-300 border border-brand-700/50',
  green:  'bg-green-700/30 text-green-300 border border-green-700/50',
  yellow: 'bg-yellow-700/30 text-yellow-300 border border-yellow-700/50',
  red:    'bg-rose-700/30 text-rose-300 border border-rose-700/50',
  purple: 'bg-purple-700/30 text-purple-300 border border-purple-700/50',
  gray:   'bg-white/10 text-slate-300 border border-white/10',
}

export default function Badge({ children, color = 'teal', className = '' }) {
  return (
    <span className={`badge ${colorMap[color]} ${className}`}>
      {children}
    </span>
  )
}
