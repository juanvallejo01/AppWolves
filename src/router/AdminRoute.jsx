import { Navigate } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import { Loading } from '@components/common'

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isLoading, isAdmin } = useAuth()

  if (isLoading) {
    return <Loading fullScreen text="Verificando permisos..." />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return isAdmin() ? children : <Navigate to="/" replace />
}

export default AdminRoute
