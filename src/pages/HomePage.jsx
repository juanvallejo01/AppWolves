import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@context/AuthContext'
import TopAppBar from '@components/layout/TopAppBar'
import { Card, Button, Badge, Rating } from '@components/common'
import newsData from '@/mocks/news.json'
import matchesData from '@/mocks/matches.json'
import businessesData from '@/mocks/businesses.json'
import { formatDate } from '@utils/formatters'

const HomePage = () => {
  const { user } = useAuth()

  // Obtener próximos 2 partidos
  const upcomingMatches = matchesData.filter(m => m.status === 'upcoming').slice(0, 2)
  
  // Obtener últimas 2 noticias
  const latestNews = newsData.slice(0, 2)
  
  // Obtener negocios destacados
  const featuredBusinesses = businessesData.filter(b => b.isFeatured).slice(0, 4)

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Top App Bar */}
      <header className="flex flex-col gap-2 bg-background-light dark:bg-background-dark p-4 pb-2 sticky top-0 z-10">
        <div className="flex items-center h-12 justify-between">
          <div className="flex size-12 shrink-0 items-center">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage: `url("${user?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCd-6XC9sYwFFz6KQDrcmO8tNj1_xeq6O3vr-rb9OcXtMcmyre2uNRNUiHIccUI6cEXR2pbW9zSlXYxnYec8m87aHAYR2mQep9OFfEugYNgLj9V6ShsprnEGLmWU27vyAXmERU3O5Enbtv1YL6JnVbsdIRip3-Be-n9vtnBaw-Hr2p4wYwgeX1j06p29cRzxOKBSnQmNi1JseKE1CkdaLAOBhvw6Yr55xJVz3sc0OPWFPaZPNnB47i99SSL-F2a65un4_DabKABetk'}")`,
              }}
            />
          </div>
          <div className="flex w-12 items-center justify-end">
            <button className="relative flex h-12 items-center justify-center overflow-hidden rounded-lg bg-transparent text-text-light dark:text-text-dark gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
              <span className="material-symbols-outlined text-2xl">notifications</span>
              <div className="absolute top-2 right-2 flex size-2.5 items-center justify-center rounded-full bg-red-500 ring-2 ring-background-light dark:ring-background-dark"></div>
            </button>
          </div>
        </div>
        <p className="text-text-light dark:text-text-dark tracking-light text-[28px] font-bold leading-tight">
          ¡Hola, {user?.name?.split(' ')[0] || 'Alex'}!
        </p>
      </header>

      {/* Main Content */}
      <main className="flex flex-col">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-3"
        >
          <div
            className="bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-[218px] relative"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDm8vqSLFl4TK5pEtTX3_B50hmr5gofcCghh_62szZirFjt-b-7aLSOdmfrlps9Pk4A4U1RBOD-VYuGaMToJoa948jOdZ_eARuvJx1ZQrqgdKURKUolyXiRjTyYE4nuOT3RtPMa6IDwDL-XZ25i9f954uDxTIyCCdQUgXp4C-4OrB_Ww8QVFQK5zvSqKutk9_lGMEy0ldCR9xzUaKjs87qvTiQlLcwWw8eeYgsVu-a-YmOiK-FlBxB8TxIcS4UUTLGORXi3Lp0zlJU")`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0"></div>
            <div className="relative p-4 flex flex-col items-start gap-4">
              <img
                alt="CDG LOBOS Club Logo"
                className="h-12 w-auto"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD83i7ZWosydWxMR-RxXswc2eDFYinkezjs39rRRV4wtYpdPpMw35sOMdUe19tdhtOnm4iyudcyapoTfZmbTF552WoZMFsqjkVzzQvtotztD3qjBOpoO_f1BOMrfDcEnt_y8CYb6ImFLjJOwUJfHklBXDkOzcbxBLDj4glYHQ3eMJp0PRn7OMkh4wmOAXvOCpV7oYTbQX5XirELbyQ1LwdivZIplF-GQQabpPbHKJBUy9stf5_lGxql9QCZWPPCl8IdZuEP9XXcEjk"
              />
              <Link to="/programacion">
                <Button variant="primary" size="md">
                  Ver programación
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Matches Section */}
        <section className="py-2">
          <div className="flex items-center justify-between px-4 pb-2 pt-4">
            <h3 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight tracking-[-0.015em]">
              Próximos Partidos
            </h3>
            <Link to="/programacion" className="text-primary text-sm font-medium">
              Ver todos
            </Link>
          </div>
          <div className="flex flex-col gap-3 px-4">
            {upcomingMatches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/programacion/${match.id}`}>
                  <Card hoverable className="flex items-stretch justify-between gap-4 p-4">
                    <div className="flex flex-1 flex-col justify-center gap-2">
                      <div className="flex items-center gap-3">
                        <img className="h-8 w-8 object-contain" src={match.homeTeam.logo} alt={match.homeTeam.name} />
                        <p className="text-text-light dark:text-text-dark text-base font-bold leading-tight">
                          {match.homeTeam.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <img className="h-8 w-8 object-contain" src={match.awayTeam.logo} alt={match.awayTeam.name} />
                        <p className="text-text-light dark:text-text-dark text-base font-bold leading-tight">
                          {match.awayTeam.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-px bg-gray-200 dark:bg-gray-700"></div>
                    <div className="flex flex-1 flex-col justify-center text-left items-start gap-1">
                      <p className="text-primary text-sm font-bold leading-normal">
                        {formatDate(match.date, 'EEEE dd')}
                      </p>
                      <p className="text-text-light dark:text-text-dark text-base font-bold leading-tight">
                        {match.time} hs
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-xs font-normal">{match.location}</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Latest News Section */}
        <section className="py-2">
          <div className="flex items-center justify-between px-4 pb-2 pt-4">
            <h3 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight tracking-[-0.015em]">
              Últimas Noticias
            </h3>
            <Link to="/noticias" className="text-primary text-sm font-medium">
              Ver todas
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-4">
            {latestNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/noticias/${news.id}`}>
                  <Card hoverable className="flex flex-col gap-2 p-3">
                    {news.image && (
                      <div
                        className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                        style={{ backgroundImage: `url("${news.image}")` }}
                      />
                    )}
                    <div className="flex flex-col gap-1 p-1">
                      <p className="text-text-light dark:text-text-dark text-base font-bold leading-tight">
                        {news.title}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm font-normal leading-normal">
                        {news.description}
                      </p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Businesses Section */}
        <section className="py-2 pb-8">
          <div className="flex items-center justify-between px-4 pb-3 pt-4">
            <h3 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight tracking-[-0.015em]">
              Negocios Destacados
            </h3>
          </div>
          <div className="flex gap-3 overflow-x-auto px-4 hide-scrollbar">
            {featuredBusinesses.map((business, index) => (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/emprendimientos/${business.category}/${business.id}`}>
                  <Card hoverable className="flex flex-col items-center justify-center gap-2 p-4 w-32 flex-shrink-0">
                    <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
                      <img className="h-10 w-10 object-contain" src={business.logo} alt={business.name} />
                    </div>
                    <div className="text-center">
                      <p className="text-text-light dark:text-text-dark text-sm font-bold leading-tight">
                        {business.name}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-xs">{business.category}</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage
