import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, Button, Badge, Input, Modal, Rating } from '@components/common'
import businessesData from '@/mocks/businesses.json'

const AdminBusinesses = () => {
  const [businesses, setBusinesses] = useState(businessesData)
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingBusiness, setEditingBusiness] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'restaurantes',
    logo: '',
    rating: null,
    phone: '',
    address: '',
    isOpen: true,
    hours: { open: '09:00', close: '18:00' },
    isFeatured: false
  })

  const filteredBusinesses = businesses.filter(b =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreate = () => {
    setEditingBusiness(null)
    setFormData({
      name: '',
      description: '',
      category: 'restaurantes',
      logo: '',
      rating: null,
      phone: '',
      address: '',
      isOpen: true,
      hours: { open: '09:00', close: '18:00' },
      isFeatured: false
    })
    setShowModal(true)
  }

  const handleEdit = (business) => {
    setEditingBusiness(business)
    setFormData(business)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro de eliminar este emprendimiento?')) {
      setBusinesses(businesses.filter(b => b.id !== id))
    }
  }

  const handleToggleFeatured = (id) => {
    setBusinesses(businesses.map(b => 
      b.id === id ? { ...b, isFeatured: !b.isFeatured } : b
    ))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingBusiness) {
      setBusinesses(businesses.map(b => 
        b.id === editingBusiness.id ? { ...b, ...formData } : b
      ))
    } else {
      const newBusiness = {
        id: `business-${Date.now()}`,
        ...formData
      }
      setBusinesses([...businesses, newBusiness])
    }
    
    setShowModal(false)
  }

  const categories = [
    { value: 'restaurantes', label: 'Restaurantes', icon: 'restaurant' },
    { value: 'servicios', label: 'Servicios', icon: 'build' },
    { value: 'domicilios', label: 'Domicilios', icon: 'delivery_dining' },
    { value: 'deportiva', label: 'Tienda Deportiva', icon: 'sports_soccer' },
    { value: 'salud', label: 'Salud', icon: 'health_and_safety' },
    { value: 'educacion', label: 'Educación', icon: 'school' }
  ]

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
              Gestión de Emprendimientos
            </h1>
            <p className="text-text-muted-light dark:text-text-muted-dark">
              Administrar negocios aliados del club
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            icon="add"
            onClick={handleCreate}
          >
            Nuevo Emprendimiento
          </Button>
        </div>

        <Input
          type="text"
          placeholder="Buscar emprendimientos..."
          icon="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
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
                  Total Negocios
                </p>
                <p className="text-2xl font-bold text-text-light dark:text-text-dark">
                  {businesses.length}
                </p>
              </div>
              <span className="material-symbols-outlined text-3xl text-orange-500">
                store
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
                  Abiertos
                </p>
                <p className="text-2xl font-bold text-text-light dark:text-text-dark">
                  {businesses.filter(b => b.isOpen).length}
                </p>
              </div>
              <span className="material-symbols-outlined text-3xl text-green-500">
                schedule
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
                  Destacados
                </p>
                <p className="text-2xl font-bold text-text-light dark:text-text-dark">
                  {businesses.filter(b => b.isFeatured).length}
                </p>
              </div>
              <span className="material-symbols-outlined text-3xl text-yellow-500">
                star
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
                  Rating Promedio
                </p>
                <p className="text-2xl font-bold text-text-light dark:text-text-dark">
                  {(businesses.reduce((acc, b) => acc + (b.rating || 0), 0) / businesses.filter(b => b.rating).length).toFixed(1)}
                </p>
              </div>
              <span className="material-symbols-outlined text-3xl text-purple-500">
                grade
              </span>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Businesses List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {filteredBusinesses.map((business, index) => (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-6">
                  <div className="flex gap-4">
                    {/* Logo */}
                    <div
                      className="flex-shrink-0 w-24 h-24 bg-center bg-cover rounded-lg"
                      style={{ backgroundImage: `url("${business.logo}")` }}
                    />

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="info" size="sm">
                            {categories.find(c => c.value === business.category)?.label}
                          </Badge>
                          {business.isOpen ? (
                            <Badge variant="success" size="sm" icon="schedule">
                              Abierto
                            </Badge>
                          ) : (
                            <Badge variant="danger" size="sm" icon="schedule">
                              Cerrado
                            </Badge>
                          )}
                          {business.isFeatured && (
                            <Badge variant="warning" size="sm" icon="star">
                              Destacado
                            </Badge>
                          )}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">
                        {business.name}
                      </h3>

                      {business.rating && (
                        <div className="mb-2">
                          <Rating value={business.rating} size="md" showValue />
                        </div>
                      )}

                      <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-3 line-clamp-2">
                        {business.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted-light dark:text-text-muted-dark mb-4">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                            phone
                          </span>
                          {business.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                            schedule
                          </span>
                          {business.hours.open} - {business.hours.close}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          icon={business.isFeatured ? 'star' : 'star_border'}
                          onClick={() => handleToggleFeatured(business.id)}
                        >
                          {business.isFeatured ? 'Quitar Destacado' : 'Destacar'}
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          icon="edit"
                          onClick={() => handleEdit(business)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          icon="delete"
                          onClick={() => handleDelete(business.id)}
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
        title={editingBusiness ? 'Editar Emprendimiento' : 'Nuevo Emprendimiento'}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Nombre del negocio"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
              Categoría
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
              required
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-text-light dark:text-text-dark resize-none"
              required
            />
          </div>

          <Input
            label="URL del logo"
            type="text"
            value={formData.logo}
            onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
            required
          />

          <Input
            label="Teléfono"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />

          <Input
            label="Dirección"
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Hora apertura"
              type="time"
              value={formData.hours.open}
              onChange={(e) => setFormData({ 
                ...formData, 
                hours: { ...formData.hours, open: e.target.value }
              })}
              required
            />
            <Input
              label="Hora cierre"
              type="time"
              value={formData.hours.close}
              onChange={(e) => setFormData({ 
                ...formData, 
                hours: { ...formData.hours, close: e.target.value }
              })}
              required
            />
          </div>

          <Input
            label="Rating (1-5)"
            type="number"
            min="1"
            max="5"
            step="0.1"
            value={formData.rating || ''}
            onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || null })}
          />

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isOpen}
                onChange={(e) => setFormData({ ...formData, isOpen: e.target.checked })}
                className="w-5 h-5 text-primary-500 rounded"
              />
              <span className="text-sm font-medium text-text-light dark:text-text-dark">
                Está abierto actualmente
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-5 h-5 text-primary-500 rounded"
              />
              <span className="text-sm font-medium text-text-light dark:text-text-dark">
                Negocio destacado
              </span>
            </label>
          </div>

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
              {editingBusiness ? 'Guardar Cambios' : 'Crear Emprendimiento'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AdminBusinesses
