export default function StatsCard({ icon, label, value, subtext, colorClass = 'text-brand-400' }) {
  return (
    <div className="card flex items-center gap-4">
      <div className={`text-3xl ${colorClass}`}>{icon}</div>
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-wide">{label}</p>
        <p className={`text-2xl font-bold text-white`}>{value}</p>
        {subtext && <p className="text-xs text-slate-500 mt-0.5">{subtext}</p>}
      </div>
    </div>
  )
}
