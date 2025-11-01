/**
 * Valida un email
 * @param {string} email - Email a validar
 * @returns {boolean} True si es válido
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valida una contraseña (mínimo 8 caracteres)
 * @param {string} password - Contraseña a validar
 * @returns {boolean} True si es válida
 */
export const isValidPassword = (password) => {
  return password.length >= 8
}

/**
 * Valida un teléfono argentino
 * @param {string} phone - Teléfono a validar
 * @returns {boolean} True si es válido
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^\+?54?[\s-]?\d{10}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

/**
 * Valida que un campo no esté vacío
 * @param {string} value - Valor a validar
 * @returns {boolean} True si no está vacío
 */
export const isNotEmpty = (value) => {
  return value && value.trim().length > 0
}

/**
 * Valida una URL
 * @param {string} url - URL a validar
 * @returns {boolean} True si es válida
 */
export const isValidUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}
