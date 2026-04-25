export default function ProgressBar({ value = 0, label, showLabel = true, colorClass = '' }) {
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          {label && <span>{label}</span>}
          <span className="font-semibold text-brand-400">{Math.round(value)}%</span>
        </div>
      )}
      <div className="progress-bar">
        <div
          className={`progress-fill ${colorClass}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  )
}
