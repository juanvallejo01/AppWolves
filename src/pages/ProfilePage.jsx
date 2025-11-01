import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import TopAppBar from '@components/layout/TopAppBar'
import { Card, Button, Badge } from '@components/common'
import { useAuth } from '@context/AuthContext'

const ProfilePage = () => {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const settingsOptions = [
    {
      id: 'notifications',
      icon: 'notifications',
      title: 'Notificaciones',
      description: 'Gestiona las notificaciones de la app',
      action: () => console.log('Abrir configuración de notificaciones')
    },
    {
      id: 'theme',
      icon: 'dark_mode',
      title: 'Tema',
      description: 'Modo claro/oscuro',
      action: () => console.log('Abrir selector de tema')
    },
    {
      id: 'language',
      icon: 'language',
      title: 'Idioma',
      description: 'Español',
      action: () => console.log('Abrir selector de idioma')
    },
    {
      id: 'privacy',
      icon: 'privacy_tip',
      title: 'Privacidad',
      description: 'Términos y condiciones',
      action: () => console.log('Abrir privacidad')
    },
  ]

  return (
    <div className="w-full max-w-md mx-auto bg-background-light dark:bg-background-dark min-h-screen pb-16">
      {/* Top App Bar */}
      <TopAppBar
        title="Mi Perfil"
        showNotifications
        className="bg-background-light/80 dark:bg-background-dark/80"
      />

      <main className="flex flex-col gap-4 p-4">
        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="flex flex-col items-center gap-4 p-6">
            <div className="relative">
              <div className="flex items-center justify-center w-24 h-24 text-4xl text-white rounded-full bg-gradient-to-br from-primary-500 to-primary-700">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              {isAdmin() && (
                <div className="absolute bottom-0 right-0">
                  <Badge variant="success" size="sm">Admin</Badge>
                </div>
              )}
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">
                {user?.name || 'Usuario'}
              </h2>
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                {user?.email || 'email@ejemplo.com'}
              </p>
            </div>
            {isAdmin() && (
              <Button
                variant="secondary"
                size="md"
                fullWidth
                icon="admin_panel_settings"
                onClick={() => navigate('/admin')}
              >
                Panel de Administración
              </Button>
            )}
          </Card>
        </motion.div>

        {/* Settings Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="mb-3 text-lg font-semibold text-text-light dark:text-text-dark">
            Configuración
          </h3>
          <Card className="flex flex-col p-0 overflow-hidden">
            {settingsOptions.map((option, index) => (
              <button
                key={option.id}
                onClick={option.action}
                className={`flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                  index < settingsOptions.length - 1 ? 'border-b border-border-light dark:border-border-dark' : ''
                }`}
              >
                <span className="flex items-center justify-center w-10 h-10 text-primary-500 rounded-full material-symbols-outlined bg-primary-50 dark:bg-primary-900/20">
                  {option.icon}
                </span>
                <div className="flex-1 text-left">
                  <p className="font-medium text-text-light dark:text-text-dark">
                    {option.title}
                  </p>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                    {option.description}
                  </p>
                </div>
                <span className="text-text-muted-light dark:text-text-muted-dark material-symbols-outlined">
                  chevron_right
                </span>
              </button>
            ))}
          </Card>
        </motion.div>

        {/* History Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="mb-3 text-lg font-semibold text-text-light dark:text-text-dark">
            Mi Actividad
          </h3>
          <Card className="flex flex-col gap-3">
            <button className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-primary-500 material-symbols-outlined">
                  favorite
                </span>
                <span className="font-medium text-text-light dark:text-text-dark">
                  Favoritos
                </span>
              </div>
              <Badge variant="info">0</Badge>
            </button>
            <button className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-primary-500 material-symbols-outlined">
                  shopping_bag
                </span>
                <span className="font-medium text-text-light dark:text-text-dark">
                  Pedidos
                </span>
              </div>
              <Badge variant="info">0</Badge>
            </button>
          </Card>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant="danger"
            size="lg"
            fullWidth
            icon="logout"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </Button>
        </motion.div>

        {/* App Version */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
            CDG LOBOS v1.0.0
          </p>
        </motion.div>
      </main>
    </div>
  )
}

export default ProfilePage
