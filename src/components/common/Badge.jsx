const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full'

  const variants = {
    default: 'bg-primary/20 text-primary dark:bg-primary/30 dark:text-purple-300',
    success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    new: 'bg-primary/20 text-primary dark:bg-purple-400/20 dark:text-purple-300',
    pinned: 'bg-primary/20 text-primary dark:bg-purple-400/20 dark:text-purple-300',
  }

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  }

  const badgeClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  return (
    <span className={badgeClasses}>
      {children}
    </span>
  )
}

export default Badge
