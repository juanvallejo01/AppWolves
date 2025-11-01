const EmptyState = ({
  icon = 'inbox',
  title = 'No hay datos',
  description,
  action,
  actionLabel,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center gap-6 px-4 py-12 ${className}`}>
      <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-purple-300">
        <span className="material-symbols-outlined !text-6xl">
          {icon}
        </span>
      </div>
      <div className="flex max-w-sm flex-col items-center gap-2 text-center">
        <p className="text-lg font-bold leading-tight tracking-[-0.015em] text-text-light dark:text-text-dark">
          {title}
        </p>
        {description && (
          <p className="text-sm font-normal leading-normal text-text-muted-light dark:text-text-muted-dark">
            {description}
          </p>
        )}
      </div>
      {action && actionLabel && (
        <button
          onClick={action}
          className="flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary/20 px-4 text-sm font-bold leading-normal tracking-[0.015em] text-primary dark:bg-primary/30 dark:text-purple-300 hover:bg-primary/30"
        >
          <span className="truncate">{actionLabel}</span>
        </button>
      )}
    </div>
  )
}

export default EmptyState
