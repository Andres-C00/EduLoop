import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const MOCK_DATA = [
  { day: 'Lun', puntos: 30 }, { day: 'Mar', puntos: 65 }, { day: 'Mié', puntos: 45 },
  { day: 'Jue', puntos: 90 }, { day: 'Vie', puntos: 55 }, { day: 'Sáb', puntos: 120 }, { day: 'Dom', puntos: 80 },
]

const customTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-sm">
      <p className="text-slate-400">{label}</p>
      <p className="text-brand-300 font-semibold">{payload[0].value} XP</p>
    </div>
  )
}

export default function ProgressChart({ data = MOCK_DATA }) {
  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0e8290" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#0e8290" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={customTooltip} />
          <Area type="monotone" dataKey="puntos" stroke="#14a2ac" strokeWidth={2} fill="url(#grad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
