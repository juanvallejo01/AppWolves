import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import TopAppBar from '@components/layout/TopAppBar'
import { Card, Button, Badge } from '@components/common'
import newsData from '@/mocks/news.json'
import { formatRelativeTime } from '@utils/formatters'

const NewsPage = () => {
  // Separar noticias fijadas y normales
  const pinnedNews = newsData.filter(n => n.isPinned)
  const regularNews = newsData.filter(n => !n.isPinned)

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      {/* Top App Bar */}
      <TopAppBar
        title="Noticias"
        showSearch
        onSearchClick={() => console.log('Search clicked')}
        className="bg-primary dark:bg-primary"
      />

      {/* Main Content Feed */}
      <main className="flex-grow pb-24">
        <div className="p-4 space-y-4">
          {/* Pinned News */}
          {pinnedNews.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/noticias/${news.id}`}>
                <Card hoverable className="flex flex-col items-stretch justify-start overflow-hidden">
                  <div className="flex w-full flex-col items-stretch justify-center gap-2 p-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary dark:text-purple-400 text-base">
                        push_pin
                      </span>
                      <p className="text-primary dark:text-purple-400 text-sm font-medium leading-normal">Fijado</p>
                    </div>
                    <p className="text-gray-800 dark:text-gray-100 text-lg font-bold leading-tight tracking-[-0.015em]">
                      {news.title}
                    </p>
                    <div className="flex items-end gap-3 justify-between">
                      <div className="flex flex-col gap-1 flex-grow">
                        <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal">
                          {news.description}
                        </p>
                        <p className="text-gray-500 dark:text-gray-500 text-sm font-normal leading-normal">
                          {formatRelativeTime(news.createdAt)} • {news.category}
                        </p>
                      </div>
                      <Button variant="primary" size="sm">
                        Leer más
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}

          {/* Regular News */}
          {regularNews.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (pinnedNews.length + index) * 0.1 }}
            >
              <Link to={`/noticias/${news.id}`}>
                <Card hoverable className="flex flex-col items-stretch justify-start overflow-hidden">
                  {news.image && (
                    <div
                      className="w-full bg-center bg-no-repeat aspect-video bg-cover"
                      style={{ backgroundImage: `url("${news.image}")` }}
                    />
                  )}
                  <div className="flex w-full flex-col items-stretch justify-center gap-2 p-4">
                    {news.isNew && (
                      <Badge variant="new" size="md">
                        NUEVO
                      </Badge>
                    )}
                    <p className="text-gray-800 dark:text-gray-100 text-lg font-bold leading-tight tracking-[-0.015em]">
                      {news.title}
                    </p>
                    <div className="flex items-end gap-3 justify-between">
                      <div className="flex flex-col gap-1 flex-grow">
                        <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal">
                          {news.description}
                        </p>
                        <p className="text-gray-500 dark:text-gray-500 text-sm font-normal leading-normal">
                          {formatRelativeTime(news.createdAt)} • {news.category}
                        </p>
                      </div>
                      <Button variant="primary" size="sm">
                        Leer más
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default NewsPage
