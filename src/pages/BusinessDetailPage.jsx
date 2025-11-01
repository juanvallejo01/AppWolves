import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import TopAppBar from '@components/layout/TopAppBar'
import { Card, Button, Badge, Rating } from '@components/common'
import businessesData from '@/mocks/businesses.json'
import { createWhatsAppLink, createMapsLink } from '@utils/helpers'

const BusinessDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const business = businessesData.find(b => b.id === id)

  if (!business) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
        <span className="text-6xl text-text-muted-light dark:text-text-muted-dark material-symbols-outlined">
          store
        </span>
        <h2 className="mt-4 text-xl font-semibold text-text-light dark:text-text-dark">
          Negocio no encontrado
        </h2>
        <Button
          variant="primary"
          size="md"
          className="mt-4"
          onClick={() => navigate('/emprendimientos')}
        >
          Volver a Emprendimientos
        </Button>
      </div>
    )
  }

  const handleWhatsAppContact = () => {
    const message = `Hola ${business.name}, quisiera más información sobre sus productos/servicios.`
    window.open(createWhatsAppLink(business.phone, message), '_blank')
  }

  const handleOpenMaps = () => {
    window.open(createMapsLink(business.address), '_blank')
  }

  const handleCallPhone = () => {
    window.location.href = `tel:${business.phone}`
  }

  return (
    <div className="w-full max-w-md mx-auto bg-background-light dark:bg-background-dark min-h-screen pb-16">
      {/* Top App Bar */}
      <TopAppBar
        title="Detalle del Negocio"
        showBack
        showMenu={false}
        className="bg-background-light/80 dark:bg-background-dark/80"
      />

      <main className="flex flex-col">
        {/* Business Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4"
        >
          <Card className="flex flex-col items-center gap-4 p-6">
            <div
              className="w-32 h-32 bg-center bg-no-repeat bg-cover rounded-xl"
              style={{ backgroundImage: `url("${business.logo}")` }}
            />
            <div className="text-center">
              <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">
                {business.name}
              </h1>
              {business.rating && (
                <div className="flex justify-center mt-2">
                  <Rating value={business.rating} size="lg" showValue />
                </div>
              )}
              <div className="mt-2">
                {business.isOpen ? (
                  <Badge variant="success" size="md" icon="schedule">
                    Abierto: {business.hours.open} - {business.hours.close}
                  </Badge>
                ) : (
                  <Badge variant="danger" size="md" icon="schedule">
                    Cerrado. Abre {business.hours.open}
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4"
        >
          <Card className="p-6">
            <h2 className="mb-3 text-lg font-semibold text-text-light dark:text-text-dark">
              Descripción
            </h2>
            <p className="leading-relaxed text-text-light dark:text-text-dark">
              {business.description}
            </p>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4"
        >
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-text-light dark:text-text-dark">
              Información de Contacto
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <span className="text-primary-500 material-symbols-outlined">
                  phone
                </span>
                <div className="flex-1">
                  <p className="text-xs font-medium text-text-muted-light dark:text-text-muted-dark">
                    Teléfono
                  </p>
                  <p className="font-medium text-text-light dark:text-text-dark">
                    {business.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary-500 material-symbols-outlined">
                  location_on
                </span>
                <div className="flex-1">
                  <p className="text-xs font-medium text-text-muted-light dark:text-text-muted-dark">
                    Dirección
                  </p>
                  <p className="font-medium text-text-light dark:text-text-dark">
                    {business.address}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary-500 material-symbols-outlined">
                  schedule
                </span>
                <div className="flex-1">
                  <p className="text-xs font-medium text-text-muted-light dark:text-text-muted-dark">
                    Horario
                  </p>
                  <p className="font-medium text-text-light dark:text-text-dark">
                    {business.hours.open} - {business.hours.close}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-4"
        >
          <div className="flex flex-col gap-3">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              icon="chat"
              onClick={handleWhatsAppContact}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Contactar por WhatsApp
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="md"
                icon="call"
                onClick={handleCallPhone}
              >
                Llamar
              </Button>
              <Button
                variant="outline"
                size="md"
                icon="map"
                onClick={handleOpenMaps}
              >
                Ver Mapa
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Products/Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-4"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-text-light dark:text-text-dark">
                Productos y Servicios
              </h2>
              <Badge variant="info" size="sm">Próximamente</Badge>
            </div>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
              El catálogo de productos y servicios estará disponible próximamente.
            </p>
          </Card>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-4"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-text-light dark:text-text-dark">
                Reseñas
              </h2>
              <Badge variant="info" size="sm">Próximamente</Badge>
            </div>
            {business.rating ? (
              <div className="flex flex-col items-center gap-2 py-6">
                <div className="text-5xl font-bold text-primary-500">
                  {business.rating}
                </div>
                <Rating value={business.rating} size="lg" />
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                  Basado en reseñas de usuarios
                </p>
              </div>
            ) : (
              <p className="text-sm text-center text-text-muted-light dark:text-text-muted-dark">
                Aún no hay reseñas para este negocio. ¡Sé el primero en dejar una!
              </p>
            )}
          </Card>
        </motion.div>
      </main>
    </div>
  )
}

export default BusinessDetailPage
