export default function StreakBadge({ streak = 0, size = 'md' }) {
  const sizes = { sm: 'text-sm px-2 py-0.5', md: 'text-base px-3 py-1', lg: 'text-xl px-4 py-1.5' }
  return (
    <div className={`inline-flex items-center gap-1.5 bg-orange-500/20 border border-orange-500/40 rounded-full font-semibold text-orange-300 ${sizes[size]}`}>
      <span>🔥</span>
      <span>{streak}</span>
      <span className="text-xs font-normal text-orange-400/70">días</span>
    </div>
  )
}
