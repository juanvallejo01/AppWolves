import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, Button, Badge, Input, Modal } from '@components/common'
import matchesData from '@/mocks/matches.json'
import { formatDate } from '@utils/formatters'

const AdminMatches = () => {
  const [matches, setMatches] = useState(matchesData)
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingMatch, setEditingMatch] = useState(null)
  const [formData, setFormData] = useState({
    homeTeam: { name: '', logo: '' },
    awayTeam: { name: '', logo: '' },
    date: '',
    time: '',
    location: '',
    address: '',
    tournament: '',
    round: '',
    category: 'primera',
    status: 'Próximo',
    hasCallup: false,
    stadiumImage: ''
  })

  const filteredMatches = matches.filter(m =>
    m.homeTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.awayTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.tournament.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreate = () => {
    setEditingMatch(null)
    setFormData({
      homeTeam: { name: '', logo: '' },
      awayTeam: { name: '', logo: '' },
      date: '',
      time: '',
      location: '',
      address: '',
      tournament: '',
      round: '',
      category: 'primera',
      status: 'Próximo',
      hasCallup: false,
      stadiumImage: ''
    })
    setShowModal(true)
  }

  const handleEdit = (match) => {
    setEditingMatch(match)
    setFormData(match)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro de eliminar este partido?')) {
      setMatches(matches.filter(m => m.id !== id))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingMatch) {
      setMatches(matches.map(m => 
        m.id === editingMatch.id ? { ...m, ...formData } : m
      ))
    } else {
      const newMatch = {
        id: `match-${Date.now()}`,
        ...formData,
        homeTeam: { id: `team-${Date.now()}-home`, ...formData.homeTeam },
        awayTeam: { id: `team-${Date.now()}-away`, ...formData.awayTeam }
      }
      setMatches([...matches, newMatch])
    }
    
    setShowModal(false)
  }

  const categories = [
    { value: 'primera', label: 'Primera División' },
    { value: 'reserva', label: 'Reserva' },
    { value: 'sub-21', label: 'Sub-21' },
    { value: '2011-2012', label: '2011-2012' },
    { value: '2013', label: '2013' },
    { value: '2014-2015', label: '2014-2015' },
    { value: 'juveniles', label: 'Juveniles' },
    { value: 'femenino', label: 'Femenino' }
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
              Gestión de Partidos
            </h1>
            <p className="text-text-muted-light dark:text-text-muted-dark">
              Programar y administrar partidos del club
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            icon="add"
            onClick={handleCreate}
          >
            Nuevo Partido
          </Button>
        </div>

        <Input
          type="text"
          placeholder="Buscar partidos..."
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
                  Total Partidos
                </p>
                <p className="text-2xl font-bold text-text-light dark:text-text-dark">
                  {matches.length}
                </p>
              </div>
              <span className="material-symbols-outlined text-3xl text-green-500">
                sports_soccer
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
                  Próximos
                </p>
                <p className="text-2xl font-bold text-text-light dark:text-text-dark">
                  {matches.filter(m => m.status === 'Próximo').length}
                </p>
              </div>
              <span className="material-symbols-outlined text-3xl text-blue-500">
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
                  Con Convocatoria
                </p>
                <p className="text-2xl font-bold text-text-light dark:text-text-dark">
                  {matches.filter(m => m.hasCallup).length}
                </p>
              </div>
              <span className="material-symbols-outlined text-3xl text-purple-500">
                group
              </span>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Matches List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {filteredMatches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-6">
                  <div className="flex flex-col gap-4">
                    {/* Match Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="info" size="sm">
                          {match.tournament}
                        </Badge>
                        <Badge variant="success" size="sm">
                          {match.category}
                        </Badge>
                        {match.hasCallup && (
                          <Badge variant="warning" size="sm" icon="group">
                            Convocatoria
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-text-muted-light dark:text-text-muted-dark">
                        {match.round}
                      </span>
                    </div>

                    {/* Teams */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className="w-12 h-12 bg-center bg-no-repeat bg-contain flex-shrink-0"
                          style={{ backgroundImage: `url("${match.homeTeam.logo}")` }}
                        />
                        <span className="font-semibold text-text-light dark:text-text-dark">
                          {match.homeTeam.name}
                        </span>
                      </div>

                      <span className="text-xl font-bold text-primary-500">VS</span>

                      <div className="flex items-center gap-3 flex-1 justify-end">
                        <span className="font-semibold text-text-light dark:text-text-dark text-right">
                          {match.awayTeam.name}
                        </span>
                        <div
                          className="w-12 h-12 bg-center bg-no-repeat bg-contain flex-shrink-0"
                          style={{ backgroundImage: `url("${match.awayTeam.logo}")` }}
                        />
                      </div>
                    </div>

                    {/* Match Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border-light dark:border-border-dark">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary-500" style={{ fontSize: '20px' }}>
                          calendar_today
                        </span>
                        <div>
                          <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
                            Fecha
                          </p>
                          <p className="text-sm font-medium text-text-light dark:text-text-dark">
                            {formatDate(match.date)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary-500" style={{ fontSize: '20px' }}>
                          schedule
                        </span>
                        <div>
                          <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
                            Hora
                          </p>
                          <p className="text-sm font-medium text-text-light dark:text-text-dark">
                            {match.time}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 col-span-2">
                        <span className="material-symbols-outlined text-primary-500" style={{ fontSize: '20px' }}>
                          location_on
                        </span>
                        <div>
                          <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
                            Ubicación
                          </p>
                          <p className="text-sm font-medium text-text-light dark:text-text-dark">
                            {match.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        icon="edit"
                        onClick={() => handleEdit(match)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        icon="delete"
                        onClick={() => handleDelete(match.id)}
                      >
                        Eliminar
                      </Button>
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
        title={editingMatch ? 'Editar Partido' : 'Nuevo Partido'}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Home Team */}
          <div className="p-4 border border-border-light dark:border-border-dark rounded-lg">
            <h3 className="font-semibold text-text-light dark:text-text-dark mb-3">
              Equipo Local
            </h3>
            <div className="flex flex-col gap-3">
              <Input
                label="Nombre del equipo"
                type="text"
                value={formData.homeTeam.name}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  homeTeam: { ...formData.homeTeam, name: e.target.value }
                })}
                required
              />
              <Input
                label="URL del logo"
                type="text"
                value={formData.homeTeam.logo}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  homeTeam: { ...formData.homeTeam, logo: e.target.value }
                })}
                required
              />
            </div>
          </div>

          {/* Away Team */}
          <div className="p-4 border border-border-light dark:border-border-dark rounded-lg">
            <h3 className="font-semibold text-text-light dark:text-text-dark mb-3">
              Equipo Visitante
            </h3>
            <div className="flex flex-col gap-3">
              <Input
                label="Nombre del equipo"
                type="text"
                value={formData.awayTeam.name}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  awayTeam: { ...formData.awayTeam, name: e.target.value }
                })}
                required
              />
              <Input
                label="URL del logo"
                type="text"
                value={formData.awayTeam.logo}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  awayTeam: { ...formData.awayTeam, logo: e.target.value }
                })}
                required
              />
            </div>
          </div>

          {/* Match Details */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Fecha"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
            <Input
              label="Hora"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>

          <Input
            label="Torneo"
            type="text"
            value={formData.tournament}
            onChange={(e) => setFormData({ ...formData, tournament: e.target.value })}
            required
          />

          <Input
            label="Jornada/Fase"
            type="text"
            value={formData.round}
            onChange={(e) => setFormData({ ...formData, round: e.target.value })}
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

          <Input
            label="Ubicación"
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />

          <Input
            label="Dirección completa"
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />

          <Input
            label="Imagen del estadio (URL)"
            type="text"
            value={formData.stadiumImage}
            onChange={(e) => setFormData({ ...formData, stadiumImage: e.target.value })}
          />

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.hasCallup}
              onChange={(e) => setFormData({ ...formData, hasCallup: e.target.checked })}
              className="w-5 h-5 text-primary-500 rounded"
            />
            <span className="text-sm font-medium text-text-light dark:text-text-dark">
              Tiene convocatoria disponible
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
              {editingMatch ? 'Guardar Cambios' : 'Crear Partido'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AdminMatches
