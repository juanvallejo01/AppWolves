import { Navigate } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import { Loading } from '@components/common'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <Loading fullScreen text="Verificando autenticación..." />
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default PrivateRoute
