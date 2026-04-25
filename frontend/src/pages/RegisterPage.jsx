import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useApp } from '../context/AppContext'
import Button from '../components/common/Button'
import Input from '../components/common/Input'

export default function RegisterPage() {
  const { register } = useAuth()
  const { addNotification } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'El nombre es requerido'
    if (!form.email) e.email = 'El correo es requerido'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Correo inválido'
    if (!form.password) e.password = 'La contraseña es requerida'
    else if (form.password.length < 8) e.password = 'Mínimo 8 caracteres'
    if (form.password !== form.confirm) e.confirm = 'Las contraseñas no coinciden'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      await register({ name: form.name, email: form.email, password: form.password })
      addNotification('¡Cuenta creada exitosamente!', 'success')
      navigate('/dashboard')
    } catch (err) {
      addNotification(err.response?.data?.message ?? 'Error al registrarse', 'error')
    } finally {
      setLoading(false)
    }
  }

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  return (
    <div className="min-h-screen bg-navy-950 bg-terminal-pattern flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="bg-brand-700 rounded-lg p-2 font-mono text-base font-bold text-white">&gt;_</div>
            <span className="font-bold text-2xl text-white tracking-wider">EDULOOP</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Crea tu cuenta</h1>
          <p className="text-slate-400 text-sm mt-1">Empieza a aprender el CVDS hoy</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Input label="Nombre completo" type="text" placeholder="Carlos Córdoba" value={form.name} onChange={set('name')} error={errors.name} autoComplete="name" />
            <Input label="Correo electrónico" type="email" placeholder="tu@correo.com" value={form.email} onChange={set('email')} error={errors.email} autoComplete="email" />
            <Input label="Contraseña" type="password" placeholder="Mínimo 8 caracteres" value={form.password} onChange={set('password')} error={errors.password} autoComplete="new-password" />
            <Input label="Confirmar contraseña" type="password" placeholder="••••••••" value={form.confirm} onChange={set('confirm')} error={errors.confirm} autoComplete="new-password" />

            <div className="flex items-start gap-2 pt-1">
              <input type="checkbox" id="terms" required className="mt-0.5 accent-brand-600" />
              <label htmlFor="terms" className="text-xs text-slate-400">
                Acepto los <span className="text-brand-400">términos de uso</span> y la política de privacidad
              </label>
            </div>

            <Button type="submit" loading={loading} className="w-full">
              Crear cuenta
            </Button>
          </form>
        </div>

        <p className="text-center text-slate-400 text-sm mt-5">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-brand-400 hover:text-brand-300 font-medium">Inicia sesión</Link>
        </p>
      </div>
    </div>
  )
}
