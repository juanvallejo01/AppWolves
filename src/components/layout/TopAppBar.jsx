import { useNavigate } from 'react-router-dom'

const TopAppBar = ({
  title,
  showBack = false,
  showMenu = false,
  showSearch = false,
  showNotifications = false,
  showProfile = false,
  notificationCount = 0,
  onMenuClick,
  onSearchClick,
  onNotificationClick,
  onProfileClick,
  rightActions,
  className = '',
}) => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <header
      className={`sticky top-0 z-10 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-800/50 p-4 pb-3 ${className}`}
    >
      {/* Left Section */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-start">
        {showBack && (
          <button
            onClick={handleBack}
            className="flex h-10 w-10 items-center justify-center rounded-full text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        )}
        {showMenu && (
          <button
            onClick={onMenuClick}
            className="flex h-10 w-10 items-center justify-center rounded-full text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        )}
        {showProfile && (
          <button
            onClick={onProfileClick}
            className="flex h-10 w-10 shrink-0 items-center"
          >
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-10 w-10"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCd-6XC9sYwFFz6KQDrcmO8tNj1_xeq6O3vr-rb9OcXtMcmyre2uNRNUiHIccUI6cEXR2pbW9zSlXYxnYec8m87aHAYR2mQep9OFfEugYNgLj9V6ShsprnEGLmWU27vyAXmERU3O5Enbtv1YL6JnVbsdIRip3-Be-n9vtnBaw-Hr2p4wYwgeX1j06p29cRzxOKBSnQmNi1JseKE1CkdaLAOBhvw6Yr55xJVz3sc0OPWFPaZPNnB47i99SSL-F2a65un4_DabKABetk")`,
              }}
            />
          </button>
        )}
      </div>

      {/* Title */}
      {title && (
        <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-tight text-text-light dark:text-text-dark">
          {title}
        </h1>
      )}

      {/* Right Section */}
      <div className="flex items-center justify-end gap-2 w-12">
        {showSearch && (
          <button
            onClick={onSearchClick}
            className="flex h-10 w-10 items-center justify-center rounded-full text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span className="material-symbols-outlined text-2xl">search</span>
          </button>
        )}
        {showNotifications && (
          <button
            onClick={onNotificationClick}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span className="material-symbols-outlined text-2xl">notifications</span>
            {notificationCount > 0 && (
              <div className="absolute top-2 right-2 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-red-500 ring-2 ring-background-light dark:ring-background-dark" />
            )}
          </button>
        )}
        {rightActions}
      </div>
    </header>
  )
}

export default TopAppBar
