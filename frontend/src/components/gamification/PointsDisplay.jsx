export default function PointsDisplay({ points = 0, size = 'md' }) {
  const sizes = { sm: 'text-sm', md: 'text-lg', lg: 'text-2xl' }
  return (
    <div className={`inline-flex items-center gap-1.5 font-bold text-yellow-300 ${sizes[size]}`}>
      <span>⭐</span>
      <span>{points.toLocaleString('es-CO')}</span>
      <span className="text-xs font-normal text-yellow-400/70 uppercase tracking-wide">XP</span>
    </div>
  )
}
