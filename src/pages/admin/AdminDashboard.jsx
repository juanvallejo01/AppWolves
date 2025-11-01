import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Card, Badge, Button } from '@components/common'
import newsData from '@/mocks/news.json'
import matchesData from '@/mocks/matches.json'
import businessesData from '@/mocks/businesses.json'

const AdminDashboard = () => {
  // Calcular estadísticas
  const stats = {
    totalNews: newsData.length,
    pinnedNews: newsData.filter(n => n.isPinned).length,
    totalMatches: matchesData.length,
    upcomingMatches: matchesData.filter(m => m.status === 'Próximo').length,
    totalBusinesses: businessesData.length,
    openBusinesses: businessesData.filter(b => b.isOpen).length,
    totalUsers: 24, // Mock data
    activeUsers: 18 // Mock data
  }

  const quickActions = [
    {
      id: 'news',
      title: 'Gestionar Noticias',
      description: 'Crear, editar y eliminar noticias',
      icon: 'newspaper',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      link: '/admin/noticias'
    },
    {
      id: 'matches',
      title: 'Gestionar Partidos',
      description: 'Programar y actualizar partidos',
      icon: 'sports_soccer',
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      link: '/admin/partidos'
    },
    {
      id: 'businesses',
      title: 'Gestionar Emprendimientos',
      description: 'Administrar negocios aliados',
      icon: 'store',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      link: '/admin/emprendimientos'
    },
    {
      id: 'users',
      title: 'Gestionar Usuarios',
      description: 'Administrar usuarios y permisos',
      icon: 'group',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      link: '/admin/usuarios'
    }
  ]

  const recentActivity = [
    { id: 1, type: 'news', action: 'Nueva noticia publicada', title: '¡Gran victoria del equipo!', time: 'Hace 2 horas' },
    { id: 2, type: 'match', action: 'Partido programado', title: 'CDG LOBOS vs Rival FC', time: 'Hace 4 horas' },
    { id: 3, type: 'business', action: 'Negocio actualizado', title: 'La Pizzería de Don Pepe', time: 'Hace 1 día' },
    { id: 4, type: 'user', action: 'Nuevo usuario registrado', title: 'Juan Pérez', time: 'Hace 2 días' }
  ]

  const getActivityIcon = (type) => {
    switch (type) {
      case 'news': return 'newspaper'
      case 'match': return 'sports_soccer'
      case 'business': return 'store'
      case 'user': return 'person_add'
      default: return 'info'
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto bg-background-light dark:bg-background-dark min-h-screen p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">
            Panel de Administración
          </h1>
          <Badge variant="success" size="lg" icon="admin_panel_settings">
            Administrador
          </Badge>
        </div>
        <p className="text-text-muted-light dark:text-text-muted-dark">
          Bienvenido al panel de control de CDG LOBOS
        </p>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
                  Noticias
                </p>
                <p className="text-3xl font-bold text-text-light dark:text-text-dark mt-2">
                  {stats.totalNews}
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                  {stats.pinnedNews} fijadas
                </p>
              </div>
              <span className="material-symbols-outlined text-4xl text-blue-500">
                newspaper
              </span>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
                  Partidos
                </p>
                <p className="text-3xl font-bold text-text-light dark:text-text-dark mt-2">
                  {stats.totalMatches}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  {stats.upcomingMatches} próximos
                </p>
              </div>
              <span className="material-symbols-outlined text-4xl text-green-500">
                sports_soccer
              </span>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
                  Emprendimientos
                </p>
                <p className="text-3xl font-bold text-text-light dark:text-text-dark mt-2">
                  {stats.totalBusinesses}
                </p>
                <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                  {stats.openBusinesses} abiertos
                </p>
              </div>
              <span className="material-symbols-outlined text-4xl text-orange-500">
                store
              </span>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
                  Usuarios
                </p>
                <p className="text-3xl font-bold text-text-light dark:text-text-dark mt-2">
                  {stats.totalUsers}
                </p>
                <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                  {stats.activeUsers} activos
                </p>
              </div>
              <span className="material-symbols-outlined text-4xl text-purple-500">
                group
              </span>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold text-text-light dark:text-text-dark mb-4">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <Link to={action.link}>
                <Card hoverable className="p-6 h-full hover:-translate-y-1 transition-transform">
                  <div className={`w-12 h-12 rounded-lg ${action.bgColor} flex items-center justify-center mb-4`}>
                    <span className={`material-symbols-outlined text-2xl ${action.color}`}>
                      {action.icon}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-2">
                    {action.title}
                  </h3>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                    {action.description}
                  </p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <h2 className="text-xl font-semibold text-text-light dark:text-text-dark mb-4">
          Actividad Reciente
        </h2>
        <Card className="p-0 overflow-hidden">
          {recentActivity.map((activity, index) => (
            <div
              key={activity.id}
              className={`flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                index < recentActivity.length - 1 ? 'border-b border-border-light dark:border-border-dark' : ''
              }`}
            >
              <span className="material-symbols-outlined text-primary-500 mt-1">
                {getActivityIcon(activity.type)}
              </span>
              <div className="flex-1">
                <p className="font-medium text-text-light dark:text-text-dark">
                  {activity.action}
                </p>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                  {activity.title}
                </p>
              </div>
              <span className="text-xs text-text-muted-light dark:text-text-muted-dark whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          ))}
        </Card>
      </motion.div>
    </div>
  )
}

export default AdminDashboard
