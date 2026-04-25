import { forwardRef } from 'react'
import { formatDate } from '../../utils/helpers'

const CertificateCard = forwardRef(function CertificateCard({ user, level, date, score }, ref) {
  return (
    <div
      ref={ref}
      className="bg-navy-900 border-2 border-brand-700/60 rounded-3xl p-10 max-w-2xl mx-auto text-center relative overflow-hidden"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-brand-600/60 rounded-tl-3xl" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-brand-600/60 rounded-br-3xl" />

      {/* Logo */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="bg-brand-700 rounded-xl p-2.5 font-mono text-xl font-bold text-white">&gt;_</div>
        <span className="font-extrabold text-2xl text-white tracking-widest">EDULOOP</span>
      </div>

      <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-2">Certificado de Finalización</p>
      <p className="text-slate-400 text-sm mb-6">Este certificado acredita que</p>

      <h2 className="text-3xl font-extrabold text-white mb-2">{user?.name ?? 'Estudiante'}</h2>
      <p className="text-slate-400 text-sm mb-6">ha completado satisfactoriamente el</p>

      <div className="bg-brand-700/20 border border-brand-700/40 rounded-2xl px-6 py-4 mb-6 inline-block">
        <p className="text-xl font-bold text-brand-300">Ciclo de Vida del Software</p>
        <p className="text-brand-400/80 text-sm">{level === 'avanzado' ? 'Nivel Avanzado' : 'Nivel Básico'}</p>
      </div>

      <div className="flex justify-center gap-8 text-sm text-slate-400 mb-6">
        <div><p className="text-white font-semibold text-lg">{score}%</p><p>Calificación final</p></div>
        <div><p className="text-white font-semibold text-lg">{formatDate(date)}</p><p>Fecha de emisión</p></div>
      </div>

      <p className="text-xs text-slate-600">Universidad de los Llanos · Ingeniería de Software II · 2026</p>
    </div>
  )
})

export default CertificateCard
