import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import TopAppBar from '@components/layout/TopAppBar'
import { Card, Button, Badge } from '@components/common'
import newsData from '@/mocks/news.json'
import { formatDate } from '@utils/formatters'

const NewsDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const news = newsData.find(n => n.id === id)

  if (!news) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
        <span className="text-6xl text-text-muted-light dark:text-text-muted-dark material-symbols-outlined">
          newspaper
        </span>
        <h2 className="mt-4 text-xl font-semibold text-text-light dark:text-text-dark">
          Noticia no encontrada
        </h2>
        <Button
          variant="primary"
          size="md"
          className="mt-4"
          onClick={() => navigate('/noticias')}
        >
          Volver a Noticias
        </Button>
      </div>
    )
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: news.title,
        text: news.description,
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
        title="Noticia"
        showBack
        showMenu={false}
        className="bg-background-light/80 dark:bg-background-dark/80"
      />

      <main className="flex flex-col">
        {/* Hero Image */}
        {news.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-64 overflow-hidden"
          >
            <img
              src={news.image}
              alt={news.title}
              className="object-cover w-full h-full"
            />
            {news.isPinned && (
              <div className="absolute top-4 right-4">
                <Badge variant="warning" size="md" icon="push_pin">
                  Fijado
                </Badge>
              </div>
            )}
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4"
        >
          <Card className="flex flex-col gap-4 p-6">
            {/* Category Badge */}
            <Badge variant="info" size="md" className="self-start">
              {news.category}
            </Badge>

            {/* Title */}
            <h1 className="text-2xl font-bold leading-tight text-text-light dark:text-text-dark">
              {news.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-text-muted-light dark:text-text-muted-dark">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  person
                </span>
                <span>{news.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  calendar_today
                </span>
                <span>{formatDate(news.createdAt)}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg font-medium text-text-light dark:text-text-dark">
              {news.description}
            </p>

            {/* Content */}
            <div className="pt-4 border-t border-border-light dark:border-border-dark">
              <p className="leading-relaxed whitespace-pre-line text-text-light dark:text-text-dark">
                {news.content}
              </p>
            </div>

            {/* Share Button */}
            <Button
              variant="outline"
              size="lg"
              fullWidth
              icon="share"
              onClick={handleShare}
              className="mt-4"
            >
              Compartir Noticia
            </Button>
          </Card>
        </motion.div>

        {/* Related News */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4"
        >
          <h3 className="mb-3 text-lg font-semibold text-text-light dark:text-text-dark">
            Otras Noticias
          </h3>
          <div className="flex flex-col gap-3">
            {newsData
              .filter(n => n.id !== news.id)
              .slice(0, 3)
              .map((relatedNews) => (
                <Card
                  key={relatedNews.id}
                  hoverable
                  onClick={() => navigate(`/noticias/${relatedNews.id}`)}
                  className="flex gap-3 p-3 cursor-pointer"
                >
                  {relatedNews.image && (
                    <div
                      className="flex-shrink-0 w-20 h-20 bg-center bg-no-repeat bg-cover rounded-lg"
                      style={{ backgroundImage: `url("${relatedNews.image}")` }}
                    />
                  )}
                  <div className="flex flex-col justify-center flex-1 gap-1">
                    <Badge variant="info" size="sm" className="self-start">
                      {relatedNews.category}
                    </Badge>
                    <p className="text-sm font-semibold leading-tight text-text-light dark:text-text-dark line-clamp-2">
                      {relatedNews.title}
                    </p>
                    <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
                      {formatDate(relatedNews.createdAt)}
                    </p>
                  </div>
                </Card>
              ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default NewsDetailPage
