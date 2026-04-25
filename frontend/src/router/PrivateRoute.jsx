import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Spinner from '../components/common/Spinner'

export default function PrivateRoute() {
  const { isAuth, loading } = useAuth()
  if (loading) return <div className="flex h-screen items-center justify-center"><Spinner size="lg" /></div>
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />
}
