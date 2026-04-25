import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useApp } from '../context/AppContext'
import { userService } from '../services/userService'
import { getInitials } from '../utils/helpers'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Modal from '../components/common/Modal'

export default function ProfilePage() {
  const { user, updateUser, logout } = useAuth()
  const { addNotification } = useApp()
  const [form, setForm] = useState({ name: user?.name ?? '', email: user?.email ?? '' })
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [pwLoading, setPwLoading] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  async function handleSaveProfile(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await userService.updateProfile({ name: form.name })
      updateUser({ name: form.name })
      addNotification('Perfil actualizado', 'success')
    } catch {
      addNotification('Error al guardar', 'error')
    } finally {
      setLoading(false)
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault()
    if (pwForm.newPw !== pwForm.confirm) { addNotification('Las contraseñas no coinciden', 'error'); return }
    if (pwForm.newPw.length < 8) { addNotification('Mínimo 8 caracteres', 'error'); return }
    setPwLoading(true)
    try {
      await userService.changePassword({ currentPassword: pwForm.current, newPassword: pwForm.newPw })
      addNotification('Contraseña actualizada', 'success')
      setPwForm({ current: '', newPw: '', confirm: '' })
    } catch {
      addNotification('Contraseña actual incorrecta', 'error')
    } finally {
      setPwLoading(false)
    }
  }

  async function handleDelete() {
    setDeleteLoading(true)
    try {
      await userService.deleteAccount()
      logout()
    } catch {
      addNotification('Error al eliminar cuenta', 'error')
      setDeleteLoading(false)
      setDeleteModal(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Mi perfil</h1>
        <p className="text-slate-400 text-sm mt-1">Gestiona tu información personal</p>
      </div>

      {/* Avatar */}
      <div className="card flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-brand-700 flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
          {getInitials(user?.name ?? 'U')}
        </div>
        <div>
          <p className="font-semibold text-white">{user?.name}</p>
          <p className="text-sm text-slate-400">{user?.email}</p>
          <p className="text-xs text-brand-400 mt-0.5">Estudiante · Nivel Básico</p>
        </div>
      </div>

      {/* Edit profile */}
      <div className="card">
        <h2 className="text-base font-semibold text-white mb-4">Información personal</h2>
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <Input label="Nombre completo" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Correo electrónico" type="email" value={form.email} disabled className="opacity-60" />
          <Button type="submit" loading={loading} size="sm">Guardar cambios</Button>
        </form>
      </div>

      {/* Change password */}
      <div className="card">
        <h2 className="text-base font-semibold text-white mb-4">Cambiar contraseña</h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <Input label="Contraseña actual" type="password" value={pwForm.current} onChange={(e) => setPwForm({ ...pwForm, current: e.target.value })} placeholder="••••••••" />
          <Input label="Nueva contraseña" type="password" value={pwForm.newPw} onChange={(e) => setPwForm({ ...pwForm, newPw: e.target.value })} placeholder="Mínimo 8 caracteres" />
          <Input label="Confirmar nueva contraseña" type="password" value={pwForm.confirm} onChange={(e) => setPwForm({ ...pwForm, confirm: e.target.value })} placeholder="••••••••" />
          <Button type="submit" loading={pwLoading} size="sm" variant="secondary">Actualizar contraseña</Button>
        </form>
      </div>

      {/* Danger zone */}
      <div className="card border border-rose-500/20">
        <h2 className="text-base font-semibold text-rose-400 mb-2">Zona de peligro</h2>
        <p className="text-sm text-slate-400 mb-4">Eliminar tu cuenta es una acción irreversible. Todos tus datos y progreso serán borrados permanentemente.</p>
        <Button variant="danger" size="sm" onClick={() => setDeleteModal(true)}>Eliminar mi cuenta</Button>
      </div>

      <Modal open={deleteModal} onClose={() => setDeleteModal(false)} title="¿Eliminar cuenta?">
        <p className="text-slate-400 text-sm mb-5">Esta acción eliminará permanentemente tu cuenta, progreso, puntos y certificados. No se puede deshacer.</p>
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={() => setDeleteModal(false)}>Cancelar</Button>
          <Button variant="danger" loading={deleteLoading} onClick={handleDelete}>Sí, eliminar</Button>
        </div>
      </Modal>
    </div>
  )
}
