import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, Button, Badge, Input, Modal } from '@components/common'
import newsData from '@/mocks/news.json'
import { formatDate } from '@utils/formatters'

const AdminNews = () => {
  const [news, setNews] = useState(newsData)
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingNews, setEditingNews] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    image: '',
    category: 'Deportes',
    isPinned: false,
    isNew: true
  })

  // Filtrar noticias por búsqueda
  const filteredNews = news.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreate = () => {
    setEditingNews(null)
    setFormData({
      title: '',
      description: '',
      content: '',
      image: '',
      category: 'Deportes',
      isPinned: false,
      isNew: true
    })
    setShowModal(true)
  }

  const handleEdit = (newsItem) => {
    setEditingNews(newsItem)
    setFormData({
      title: newsItem.title,
      description: newsItem.description,
      content: newsItem.content,
      image: newsItem.image,
      category: newsItem.category,
      isPinned: newsItem.isPinned,
      isNew: newsItem.isNew
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro de eliminar esta noticia?')) {
      setNews(news.filter(n => n.id !== id))
    }
  }

  const handleTogglePin = (id) => {
    setNews(news.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingNews) {
      // Editar noticia existente
      setNews(news.map(n => 
        n.id === editingNews.id 
          ? { ...n, ...formData, author: 'Admin', createdAt: n.createdAt }
          : n
      ))
    } else {
      // Crear nueva noticia
      const newNews = {
        id: `news-${Date.now()}`,
        ...formData,
        author: 'Admin',
        createdAt: new Date().toISOString()
      }
      setNews([newNews, ...news])
    }
    
    setShowModal(false)
  }

  const categories = ['Deportes', 'Eventos', 'Información', 'Convocatoria', 'Resultados']

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
              Gestión de Noticias
            </h1>
            <p className="text-text-muted-light dark:text-text-muted-dark">
              Crear, editar y gestionar noticias del club
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            icon="add"
            onClick={handleCreate}
          >
            Nueva Noticia
          </Button>
        </div>

        {/* Search */}
        <Input
          type="text"
          placeholder="Buscar noticias..."
          icon="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </motion.div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                  Total Noticias
                </p>
                <p className="text-2xl font-bold text-text-light dark:text-text-dark">
                  {news.length}
                </p>
              </div>
              <span className="material-symbols-outlined text-3xl text-blue-500">
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
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                  Fijadas
                </p>
                <p className="text-2xl font-bold text-text-light dark:text-text-dark">
                  {news.filter(n => n.isPinned).length}
                </p>
              </div>
              <span className="material-symbols-outlined text-3xl text-orange-500">
                push_pin
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
                  Nuevas
                </p>
                <p className="text-2xl font-bold text-text-light dark:text-text-dark">
                  {news.filter(n => n.isNew).length}
                </p>
              </div>
              <span className="material-symbols-outlined text-3xl text-green-500">
                fiber_new
              </span>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* News List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {filteredNews.map((newsItem, index) => (
              <motion.div
                key={newsItem.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-6">
                  <div className="flex gap-4">
                    {/* Image */}
                    {newsItem.image && (
                      <div
                        className="flex-shrink-0 w-32 h-32 bg-center bg-cover rounded-lg"
                        style={{ backgroundImage: `url("${newsItem.image}")` }}
                      />
                    )}

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="info" size="sm">
                            {newsItem.category}
                          </Badge>
                          {newsItem.isPinned && (
                            <Badge variant="warning" size="sm" icon="push_pin">
                              Fijado
                            </Badge>
                          )}
                          {newsItem.isNew && (
                            <Badge variant="success" size="sm">
                              NUEVO
                            </Badge>
                          )}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">
                        {newsItem.title}
                      </h3>
                      <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-3 line-clamp-2">
                        {newsItem.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-text-muted-light dark:text-text-muted-dark mb-4">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                            person
                          </span>
                          {newsItem.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                            calendar_today
                          </span>
                          {formatDate(newsItem.createdAt)}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          icon={newsItem.isPinned ? 'push_pin' : 'push_pin'}
                          onClick={() => handleTogglePin(newsItem.id)}
                        >
                          {newsItem.isPinned ? 'Desfijar' : 'Fijar'}
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          icon="edit"
                          onClick={() => handleEdit(newsItem)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          icon="delete"
                          onClick={() => handleDelete(newsItem.id)}
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
        title={editingNews ? 'Editar Noticia' : 'Nueva Noticia'}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Título"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <Input
            label="Descripción corta"
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
              Contenido
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={6}
              className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-text-light dark:text-text-dark resize-none"
              required
            />
          </div>

          <Input
            label="URL de imagen"
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPinned}
                onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                className="w-5 h-5 text-primary-500 rounded"
              />
              <span className="text-sm font-medium text-text-light dark:text-text-dark">
                Fijar noticia
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                className="w-5 h-5 text-primary-500 rounded"
              />
              <span className="text-sm font-medium text-text-light dark:text-text-dark">
                Marcar como nueva
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
              {editingNews ? 'Guardar Cambios' : 'Crear Noticia'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AdminNews
