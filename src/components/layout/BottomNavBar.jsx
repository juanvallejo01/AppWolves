import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '@utils/constants'

const BottomNavBar = () => {
  const location = useLocation()

  const navItems = [
    { path: ROUTES.HOME, icon: 'home', label: 'Inicio' },
    { path: ROUTES.SCHEDULE, icon: 'event', label: 'Partidos' },
    { path: ROUTES.BUSINESSES, icon: 'storefront', label: 'Negocios' },
    { path: ROUTES.PROFILE, icon: 'person', label: 'Perfil' },
  ]

  const isActive = (path) => {
    if (path === ROUTES.HOME) {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 flex gap-2 border-t border-gray-200 dark:border-gray-700 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm px-4 pb-3 pt-2">
      {navItems.map((item) => {
        const active = isActive(item.path)
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-1 flex-col items-center justify-end gap-1 py-1 ${
              active
                ? 'text-primary dark:text-purple-300'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {active && item.path === ROUTES.BUSINESSES ? (
              <div className="flex h-8 w-16 items-center justify-center rounded-full bg-primary/20 dark:bg-white/20">
                <span className="material-symbols-outlined fill">{item.icon}</span>
              </div>
            ) : (
              <span className={`material-symbols-outlined h-8 flex items-center justify-center ${active ? 'fill' : ''}`}>
                {item.icon}
              </span>
            )}
            <p className={`text-xs font-medium leading-normal tracking-[0.015em] ${active ? 'font-bold' : ''}`}>
              {item.label}
            </p>
          </Link>
        )
      })}
    </nav>
  )
}

export default BottomNavBar
