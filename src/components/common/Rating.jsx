const Rating = ({ 
  value = 0, 
  maxStars = 5, 
  size = 'md',
  showValue = false,
  className = '' 
}) => {
  const sizes = {
    sm: '!text-[16px]',
    md: '!text-[20px]',
    lg: '!text-[24px]',
  }

  const sizeClass = sizes[size]

  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(value)
    const hasHalfStar = value % 1 >= 0.5

    // Estrellas completas
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span
          key={`full-${i}`}
          className={`material-symbols-outlined text-amber-500 ${sizeClass}`}
        >
          star
        </span>
      )
    }

    // Media estrella
    if (hasHalfStar && stars.length < maxStars) {
      stars.push(
        <span
          key="half"
          className={`material-symbols-outlined text-amber-500 ${sizeClass}`}
        >
          star_half
        </span>
      )
    }

    // Estrellas vacías
    const emptyStars = maxStars - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span
          key={`empty-${i}`}
          className={`material-symbols-outlined text-gray-300 dark:text-gray-600 ${sizeClass}`}
        >
          star_border
        </span>
      )
    }

    return stars
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {renderStars()}
      {showValue && (
        <span className="ml-1 text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
          ({value.toFixed(1)})
        </span>
      )}
    </div>
  )
}

export default Rating
