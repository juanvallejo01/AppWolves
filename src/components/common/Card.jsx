import { motion } from 'framer-motion'

const Card = ({
  children,
  className = '',
  padding = true,
  shadow = true,
  hoverable = false,
  onClick,
  ...props
}) => {
  const baseStyles = 'rounded-xl bg-white dark:bg-card-dark transition-all duration-200'
  const paddingStyles = padding ? 'p-4' : ''
  const shadowStyles = shadow ? 'shadow-card dark:shadow-none' : ''
  const hoverStyles = hoverable ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1' : ''

  const cardClasses = `${baseStyles} ${paddingStyles} ${shadowStyles} ${hoverStyles} ${className}`

  if (hoverable && onClick) {
    return (
      <motion.div
        className={cardClasses}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={cardClasses} onClick={onClick} {...props}>
      {children}
    </div>
  )
}

export default Card
