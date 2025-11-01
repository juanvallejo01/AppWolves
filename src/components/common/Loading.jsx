const Loading = ({ size = 'md', fullScreen = false, text = 'Cargando...' }) => {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  }

  const sizeClass = sizes[size]

  const spinner = (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`${sizeClass} border-primary border-t-transparent rounded-full animate-spin`}
      />
      {text && (
        <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
          {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
        {spinner}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-8">
      {spinner}
    </div>
  )
}

export default Loading
