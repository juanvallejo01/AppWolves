import { motion } from 'framer-motion'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  icon,
  iconPosition = 'left',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    secondary: 'bg-white dark:bg-card-dark text-primary border-2 border-primary hover:bg-primary/10 focus:ring-primary',
    outline: 'bg-transparent text-primary border border-primary hover:bg-primary/10 focus:ring-primary',
    ghost: 'bg-transparent text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-800',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  }

  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-6 text-lg',
  }

  const widthClass = fullWidth ? 'w-full' : ''

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`

  const renderIcon = () => {
    if (!icon) return null
    return <span className="material-symbols-outlined text-current">{icon}</span>
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Cargando...</span>
        </div>
      )
    }

    return (
      <div className="flex items-center gap-2">
        {icon && iconPosition === 'left' && renderIcon()}
        <span className="truncate">{children}</span>
        {icon && iconPosition === 'right' && renderIcon()}
      </div>
    )
  }

  return (
    <motion.button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      {...props}
    >
      {renderContent()}
    </motion.button>
  )
}

export default Button
