import { forwardRef, useState } from 'react'

const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  icon,
  error,
  helperText,
  fullWidth = true,
  disabled = false,
  className = '',
  onIconClick,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  const inputType = type === 'password' && showPassword ? 'text' : type

  const baseInputStyles = 'form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-primary border text-base font-normal transition-all duration-200'
  
  const inputStyles = error
    ? 'border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500'
    : 'border-border-light dark:border-border-dark focus:border-primary dark:focus:border-primary'

  const bgStyles = disabled
    ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
    : 'bg-white dark:bg-gray-800'

  const paddingStyles = icon ? 'pl-10 pr-4' : 'px-4'

  const widthClass = fullWidth ? 'w-full' : ''

  const inputClasses = `${baseInputStyles} ${inputStyles} ${bgStyles} ${paddingStyles} h-12 text-text-light dark:text-text-dark placeholder:text-gray-400 dark:placeholder:text-gray-500 ${className}`

  const renderIcon = () => {
    if (!icon) return null

    return (
      <span
        className={`material-symbols-outlined absolute left-3 text-gray-500 dark:text-gray-400 ${
          onIconClick ? 'cursor-pointer' : ''
        }`}
        onClick={onIconClick}
      >
        {icon}
      </span>
    )
  }

  const renderPasswordToggle = () => {
    if (type !== 'password') return null

    return (
      <button
        type="button"
        className="absolute right-3 text-gray-500 dark:text-gray-400 focus:outline-none"
        onClick={() => setShowPassword(!showPassword)}
      >
        <span className="material-symbols-outlined">
          {showPassword ? 'visibility_off' : 'visibility'}
        </span>
      </button>
    )
  }

  return (
    <label className={`flex flex-col ${widthClass}`}>
      {label && (
        <p className="text-text-light dark:text-text-dark text-sm font-medium pb-2">
          {label}
        </p>
      )}
      <div className="relative flex w-full items-center">
        {renderIcon()}
        <input
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
          {...props}
        />
        {renderPasswordToggle()}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{helperText}</p>
      )}
    </label>
  )
})

Input.displayName = 'Input'

export default Input
