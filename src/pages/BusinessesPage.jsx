import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import TopAppBar from '@components/layout/TopAppBar'
import { Card } from '@components/common'
import { BUSINESS_CATEGORIES } from '@utils/constants'

const BusinessesPage = () => {
  return (
    <div className="relative flex h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* TopAppBar */}
        <TopAppBar
          title="Emprendimientos"
          showBack
          showSearch
          onSearchClick={() => console.log('Search clicked')}
        />

        {/* HeadlineText */}
        <h2 className="px-4 pb-3 pt-5 text-left text-[28px] font-bold leading-tight tracking-tight text-text-light dark:text-text-dark">
          Apoya a los negocios de nuestra comunidad
        </h2>

        {/* Category Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 p-4">
          {BUSINESS_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/emprendimientos/${category.id}`}>
                <Card
                  hoverable
                  className="flex flex-1 flex-col gap-3 border border-border-light dark:border-border-dark p-4 transition-transform duration-200 ease-in-out hover:-translate-y-1"
                >
                  <span className="material-symbols-outlined text-primary text-3xl">{category.icon}</span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-bold leading-tight text-text-light dark:text-text-dark">
                      {category.name}
                    </h3>
                    <p className="text-sm font-normal leading-normal text-text-muted-light dark:text-text-muted-dark">
                      {category.id === 'restaurantes' && 'Encuentra dónde comer'}
                      {category.id === 'servicios' && 'Servicios profesionales'}
                      {category.id === 'domicilios' && 'Opciones de entrega'}
                      {category.id === 'tienda-deportiva' && 'Equípate para el juego'}
                      {category.id === 'salud' && 'Mantente saludable'}
                      {category.id === 'educacion' && 'Aprende y crece'}
                    </p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BusinessesPage
