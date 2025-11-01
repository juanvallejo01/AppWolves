import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import TopAppBar from '@components/layout/TopAppBar'
import { Card, EmptyState } from '@components/common'
import matchesData from '@/mocks/matches.json'
import { CATEGORIES } from '@utils/constants'
import { formatDate } from '@utils/formatters'

const SchedulePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('2011-2012')

  // Filtrar partidos por categoría seleccionada
  const filteredMatches = matchesData.filter(m => m.category === selectedCategory)

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      {/* Top App Bar */}
      <TopAppBar
        title="Programación"
        showMenu
        showSearch
        onMenuClick={() => console.log('Menu clicked')}
        onSearchClick={() => console.log('Search clicked')}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Category Filter Chips */}
        <div className="sticky top-16 z-10 overflow-hidden bg-background-light dark:bg-background-dark pb-2 pt-4">
          <div className="flex gap-3 overflow-x-auto px-4 pb-2 hide-scrollbar">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-primary/20 text-text-light dark:bg-primary/30 dark:text-text-dark'
                }`}
              >
                <p className="text-sm font-medium leading-normal">{category.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Match Cards List */}
        <div className="flex flex-col gap-4 p-4">
          {filteredMatches.length === 0 ? (
            <EmptyState
              icon="event_busy"
              title="No hay partidos"
              description="No hay partidos programados para esta categoría."
            />
          ) : (
            filteredMatches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/programacion/${match.id}`}>
                  <Card hoverable className="flex flex-col gap-4 p-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {match.tournament} - {match.round}
                    </p>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-1 flex-col items-center gap-2 text-center">
                        <div
                          className="h-14 w-14 rounded-full bg-gray-200 bg-cover bg-center"
                          style={{ backgroundImage: `url("${match.homeTeam.logo}")` }}
                        />
                        <p className="text-base font-bold leading-tight text-text-light dark:text-text-dark">
                          {match.homeTeam.name}
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-2xl font-bold text-text-light dark:text-text-dark">vs</p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{match.time} hs</p>
                      </div>
                      <div className="flex flex-1 flex-col items-center gap-2 text-center">
                        <div
                          className="h-14 w-14 rounded-full bg-gray-200 bg-cover bg-center"
                          style={{ backgroundImage: `url("${match.awayTeam.logo}")` }}
                        />
                        <p className="text-base font-bold leading-tight text-text-light dark:text-text-dark">
                          {match.awayTeam.name}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 border-t border-gray-200 pt-3 text-center dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {formatDate(match.date, "EEEE, dd 'de' MMMM")}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{match.location}</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}

export default SchedulePage
