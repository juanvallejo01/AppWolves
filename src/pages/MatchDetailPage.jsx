import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import TopAppBar from '@components/layout/TopAppBar'
import { Card, Button, Badge } from '@components/common'
import matchesData from '@/mocks/matches.json'
import { formatDate } from '@utils/formatters'
import { createMapsLink } from '@utils/helpers'

const MatchDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const match = matchesData.find(m => m.id === id)

  if (!match) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
        <span className="text-6xl text-text-muted-light dark:text-text-muted-dark material-symbols-outlined">
          sports_soccer
        </span>
        <h2 className="mt-4 text-xl font-semibold text-text-light dark:text-text-dark">
          Partido no encontrado
        </h2>
        <Button
          variant="primary"
          size="md"
          className="mt-4"
          onClick={() => navigate('/programacion')}
        >
          Volver a Programación
        </Button>
      </div>
    )
  }

  const handleOpenMaps = () => {
    window.open(createMapsLink(match.address), '_blank')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
        text: `${match.tournament} - ${formatDate(match.date)}`,
        url: window.location.href
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Enlace copiado al portapapeles')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-background-light dark:bg-background-dark min-h-screen pb-16">
      {/* Top App Bar */}
      <TopAppBar
        title="Detalle del Partido"
        showBack
        showMenu={false}
        className="bg-background-light/80 dark:bg-background-dark/80"
      />

      <main className="flex flex-col">
        {/* Stadium Image */}
        {match.stadiumImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-48 overflow-hidden"
          >
            <img
              src={match.stadiumImage}
              alt={match.location}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <h2 className="text-2xl font-bold text-white">
                {match.location}
              </h2>
              <p className="text-sm text-white/90">{match.address}</p>
            </div>
          </motion.div>
        )}

        {/* Match Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4"
        >
          <Card className="flex flex-col gap-6 p-6">
            {/* Tournament & Round */}
            <div className="flex items-center justify-between">
              <Badge variant="info" size="md">
                {match.tournament}
              </Badge>
              <span className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
                {match.round}
              </span>
            </div>

            {/* Teams */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col items-center flex-1 gap-2">
                <div
                  className="w-20 h-20 bg-center bg-no-repeat bg-contain"
                  style={{ backgroundImage: `url("${match.homeTeam.logo}")` }}
                />
                <p className="text-sm font-bold text-center text-text-light dark:text-text-dark">
                  {match.homeTeam.name}
                </p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <span className="text-4xl font-bold text-primary-500">VS</span>
              </div>

              <div className="flex flex-col items-center flex-1 gap-2">
                <div
                  className="w-20 h-20 bg-center bg-no-repeat bg-contain"
                  style={{ backgroundImage: `url("${match.awayTeam.logo}")` }}
                />
                <p className="text-sm font-bold text-center text-text-light dark:text-text-dark">
                  {match.awayTeam.name}
                </p>
              </div>
            </div>

            {/* Date, Time & Location */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-light dark:border-border-dark">
              <div className="flex items-start gap-2">
                <span className="text-primary-500 material-symbols-outlined">
                  calendar_today
                </span>
                <div>
                  <p className="text-xs font-medium text-text-muted-light dark:text-text-muted-dark">
                    Fecha
                  </p>
                  <p className="font-semibold text-text-light dark:text-text-dark">
                    {formatDate(match.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-primary-500 material-symbols-outlined">
                  schedule
                </span>
                <div>
                  <p className="text-xs font-medium text-text-muted-light dark:text-text-muted-dark">
                    Hora
                  </p>
                  <p className="font-semibold text-text-light dark:text-text-dark">
                    {match.time}
                  </p>
                </div>
              </div>

              <div className="flex items-start col-span-2 gap-2">
                <span className="text-primary-500 material-symbols-outlined">
                  location_on
                </span>
                <div className="flex-1">
                  <p className="text-xs font-medium text-text-muted-light dark:text-text-muted-dark">
                    Ubicación
                  </p>
                  <p className="font-semibold text-text-light dark:text-text-dark">
                    {match.location}
                  </p>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                    {match.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="primary"
                size="md"
                icon="map"
                onClick={handleOpenMaps}
              >
                Ver Mapa
              </Button>
              <Button
                variant="outline"
                size="md"
                icon="share"
                onClick={handleShare}
              >
                Compartir
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Callup Section */}
        {match.hasCallup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4"
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-primary-500 material-symbols-outlined">
                  group
                </span>
                <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">
                  Convocatoria
                </h3>
                <Badge variant="success" size="sm">Disponible</Badge>
              </div>
              <p className="mb-4 text-sm text-text-muted-light dark:text-text-muted-dark">
                La lista de convocados para este partido está disponible.
              </p>
              <Button variant="secondary" size="md" fullWidth icon="visibility">
                Ver Lista de Convocados
              </Button>
            </Card>
          </motion.div>
        )}

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-4"
        >
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold text-text-light dark:text-text-dark">
              Información Adicional
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-background-light dark:bg-background-dark">
                <span className="text-sm font-medium text-text-light dark:text-text-dark">
                  Categoría
                </span>
                <Badge variant="info" size="sm">
                  {match.category}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-background-light dark:bg-background-dark">
                <span className="text-sm font-medium text-text-light dark:text-text-dark">
                  Estado
                </span>
                <Badge 
                  variant={match.status === 'Próximo' ? 'success' : 'info'} 
                  size="sm"
                >
                  {match.status}
                </Badge>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}

export default MatchDetailPage
