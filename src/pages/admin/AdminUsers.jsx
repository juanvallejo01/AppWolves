import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, Button, Badge, Input, Modal } from '@components/common'

const AdminUsers = () => {
  // Mock users data
  const [users, setUsers] = useState([
    {
      id: 'user-1',
      name: 'Juan Pérez',
      email: 'juan@ejemplo.com',
      role: 'user',
      isActive: true,
      createdAt: '2024-01-15T10:00:00Z',
      lastLogin: '2024-10-30T14:30:00Z'
    },
    {
      id: 'user-2',
      name: 'María García',
      email: 'maria@ejemplo.com',
      role: 'user',
      isActive: true,
      createdAt: '2024-02-20T08:00:00Z',
      lastLogin: '2024-10-31T09:15:00Z'
    },
    {
      id: 'user-3',
      name: 'Carlos Admin',
      email: 'admin@cdglobos.com',
      role: 'admin',
      isActive: true,
      createdAt: '2023-12-01T00:00:00Z',
      lastLogin: '2024-10-31T10:00:00Z'
    },
    {
      id: 'user-4',
      name: 'Ana Martínez',
      email: 'ana@ejemplo.com',
      role: 'user',
      isActive: false,
      createdAt: '2024-03-10T12:00:00Z',
      lastLogin: '2024-09-15T18:20:00Z'
    }
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    isActive: true
  })

  // Filtrar usuarios
  let filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (roleFilter !== 'all') {
    filteredUsers = filteredUsers.filter(u => u.role === roleFilter)
  }

  const handleCreate = () => {
    setEditingUser(null)
    setFormData({
      name: '',
      email: '',
      role: 'user',
      isActive: true
    })
    setShowModal(true)
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      setUsers(users.filter(u => u.id !== id))
    }
  }

  const handleToggleActive = (id) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, isActive: !u.isActive } : u
    ))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingUser) {
      setUsers(users.map(u => 
        u.id === editingUser.id 
          ? { ...u, ...formData }
          : u
      ))
    } else {
      const newUser = {
        id: `user-${Date.now()}`,
        ...formData,
        createdAt: new Date().toISOString(),
        lastLogin: null
      }
      setUsers([...users, newUser])
    }
    
    setShowModal(false)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Nunca'
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="w-full max-w-7xl mx-auto bg-background-light dark:bg-background-dark min-h-screen p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">
              Gestión de Usuarios
            </h1>
            <p className="text-text-muted-light dark:text-text-muted-dark">
              Administrar usuarios y permisos del sistema
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            icon="person_add"
            onClick={handleCreate}
          >
            Nuevo Usuario
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="Buscar usuarios..."
            icon="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
            >
              <option value="all">Todos los roles</option>
              <option value="admin">Administradores</option>
              <option value="user">Usuarios</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                  Total Usuarios
                </p>
                <p className="text-2xl font-bold text-text-light dark:text-text-dark">
                  {users.length}
                </p>
              </div>
              <span className="material-symbols-outlined text-3xl text-purple-500">
                group
              </span>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                  Activos
                </p>
                <p className="text-2xl font-bold text-text-light dark:text-text-dark">
                  {users.filter(u => u.isActive).length}
                </p>
              </div>
              <span className="material-symbols-outlined text-3xl text-green-500">
                check_circle
              </span>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                  Administradores
                </p>
                <p className="text-2xl font-bold text-text-light dark:text-text-dark">
                  {users.filter(u => u.role === 'admin').length}
                </p>
              </div>
              <span className="material-symbols-outlined text-3xl text-orange-500">
                admin_panel_settings
              </span>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                  Inactivos
                </p>
                <p className="text-2xl font-bold text-text-light dark:text-text-dark">
                  {users.filter(u => !u.isActive).length}
                </p>
              </div>
              <span className="material-symbols-outlined text-3xl text-red-500">
                block
              </span>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Users List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 rounded-full text-white text-2xl font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-text-light dark:text-text-dark">
                            {user.name}
                          </h3>
                          <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                            {user.email}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={user.role === 'admin' ? 'warning' : 'info'} 
                            size="sm"
                            icon={user.role === 'admin' ? 'admin_panel_settings' : 'person'}
                          >
                            {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                          </Badge>
                          <Badge 
                            variant={user.isActive ? 'success' : 'danger'} 
                            size="sm"
                          >
                            {user.isActive ? 'Activo' : 'Inactivo'}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-text-muted-light dark:text-text-muted-dark">
                            Registrado:
                          </span>
                          <p className="font-medium text-text-light dark:text-text-dark">
                            {formatDate(user.createdAt)}
                          </p>
                        </div>
                        <div>
                          <span className="text-text-muted-light dark:text-text-muted-dark">
                            Último acceso:
                          </span>
                          <p className="font-medium text-text-light dark:text-text-dark">
                            {formatDate(user.lastLogin)}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          icon={user.isActive ? 'block' : 'check_circle'}
                          onClick={() => handleToggleActive(user.id)}
                        >
                          {user.isActive ? 'Desactivar' : 'Activar'}
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          icon="edit"
                          onClick={() => handleEdit(user)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          icon="delete"
                          onClick={() => handleDelete(user.id)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Nombre completo"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
              Rol
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
              required
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-5 h-5 text-primary-500 rounded"
            />
            <span className="text-sm font-medium text-text-light dark:text-text-dark">
              Usuario activo
            </span>
          </label>

          <div className="flex gap-3 mt-4">
            <Button
              type="button"
              variant="outline"
              size="lg"
              fullWidth
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
            >
              {editingUser ? 'Guardar Cambios' : 'Crear Usuario'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AdminUsers
