import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import TopAppBar from '@components/layout/TopAppBar'
import { Card, Button, Rating, EmptyState, Input } from '@components/common'
import businessesData from '@/mocks/businesses.json'
import { BUSINESS_CATEGORIES } from '@utils/constants'

const BusinessCategoryPage = () => {
  const { categoria } = useParams()
  const [searchQuery, setSearchQuery] = useState('')

  // Encontrar categoría
  const category = BUSINESS_CATEGORIES.find(c => c.id === categoria)
  
  // Filtrar negocios por categoría
  let filteredBusinesses = businessesData.filter(b => b.category === categoria)
  
  // Aplicar búsqueda
  if (searchQuery) {
    filteredBusinesses = filteredBusinesses.filter(b =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  return (
    <div className="w-full max-w-md mx-auto bg-background-light dark:bg-background-dark min-h-screen">
      {/* Top App Bar */}
      <TopAppBar
        title={category?.name || 'Negocios'}
        showBack
        className="bg-background-light/80 dark:bg-background-dark/80"
      />

      {/* Search Bar */}
      <div className="px-4 py-2 bg-background-light dark:bg-background-dark">
        <Input
          type="text"
          placeholder={`Buscar en ${category?.name}...`}
          icon="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Business List */}
      <main className="flex flex-col gap-4 p-4">
        {filteredBusinesses.length === 0 ? (
          <EmptyState
            icon="store"
            title="No hay negocios"
            description="No se encontraron negocios en esta categoría."
          />
        ) : (
          filteredBusinesses.map((business, index) => (
            <motion.div
              key={business.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="flex flex-col overflow-hidden">
                <div className="flex items-start gap-4 p-4">
                  <div
                    className="flex-shrink-0 w-20 h-20 bg-center bg-no-repeat bg-cover rounded-lg"
                    style={{ backgroundImage: `url("${business.logo}")` }}
                  />
                  <div className="flex flex-col flex-1 gap-1">
                    {business.isOpen ? (
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">
                        Abierto ahora: {business.hours.open} - {business.hours.close}
                      </p>
                    ) : (
                      <p className="text-sm font-medium text-red-600 dark:text-red-400">
                        Cerrado. Abre {business.hours.open}
                      </p>
                    )}
                    <p className="text-lg font-bold leading-tight text-text-light dark:text-text-dark">
                      {business.name}
                    </p>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                      {business.description}
                    </p>
                    {business.rating && (
                      <Rating value={business.rating} size="md" showValue />
                    )}
                  </div>
                </div>
                <div className="flex gap-3 px-4 pb-4">
                  <Button variant="primary" size="md" fullWidth>
                    Ver Menú
                  </Button>
                  <Button variant="outline" size="md" fullWidth>
                    Contactar
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </main>
    </div>
  )
}

export default BusinessCategoryPage
