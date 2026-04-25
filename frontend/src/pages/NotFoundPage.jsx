import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4 text-center">
      <div className="space-y-5">
        <div className="font-mono text-8xl font-extrabold text-brand-700/40">404</div>
        <h1 className="text-2xl font-bold text-white">Página no encontrada</h1>
        <p className="text-slate-400 max-w-sm mx-auto">La ruta que buscas no existe. Puede que haya sido movida o eliminada.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/dashboard" className="btn-primary px-6 py-2.5 rounded-xl text-sm">Ir al Dashboard</Link>
          <Link to="/" className="btn-secondary px-6 py-2.5 rounded-xl text-sm">Ir al inicio</Link>
        </div>
      </div>
    </div>
  )
}
