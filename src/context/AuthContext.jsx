import { createContext, useContext, useState, useEffect } from 'react'
import { STORAGE_KEYS, USER_ROLES } from '@utils/constants'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Cargar usuario desde localStorage al iniciar
    const loadUser = () => {
      try {
        const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
        const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA)
        
        if (token && userData) {
          setUser(JSON.parse(userData))
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Error loading user:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (email, password) => {
    try {
      // TODO: Reemplazar con llamada real a API
      // Simulación de login
      const mockUser = {
        id: '1',
        email,
        name: 'Alex Rodriguez',
        role: email.includes('admin') ? USER_ROLES.ADMIN : USER_ROLES.USER,
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCd-6XC9sYwFFz6KQDrcmO8tNj1_xeq6O3vr-rb9OcXtMcmyre2uNRNUiHIccUI6cEXR2pbW9zSlXYxnYec8m87aHAYR2mQep9OFfEugYNgLj9V6ShsprnEGLmWU27vyAXmERU3O5Enbtv1YL6JnVbsdIRip3-Be-n9vtnBaw-Hr2p4wYwgeX1j06p29cRzxOKBSnQmNi1JseKE1CkdaLAOBhvw6Yr55xJVz3sc0OPWFPaZPNnB47i99SSL-F2a65un4_DabKABetk',
      }

      const mockToken = 'mock-jwt-token-' + Date.now()

      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, mockToken)
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(mockUser))

      setUser(mockUser)
      setIsAuthenticated(true)

      return { success: true, user: mockUser }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Error al iniciar sesión' }
    }
  }

  const register = async (userData) => {
    try {
      // TODO: Reemplazar con llamada real a API
      const mockUser = {
        id: Date.now().toString(),
        ...userData,
        role: USER_ROLES.USER,
        avatar: null,
      }

      const mockToken = 'mock-jwt-token-' + Date.now()

      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, mockToken)
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(mockUser))

      setUser(mockUser)
      setIsAuthenticated(true)

      return { success: true, user: mockUser }
    } catch (error) {
      console.error('Register error:', error)
      return { success: false, error: 'Error al registrar usuario' }
    }
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER_DATA)
    setUser(null)
    setIsAuthenticated(false)
  }

  const isAdmin = () => {
    return user?.role === USER_ROLES.ADMIN
  }

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    isAdmin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
