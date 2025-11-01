import { format, formatDistanceToNow, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

/**
 * Formatea una fecha a formato legible en español
 * @param {string|Date} date - Fecha a formatear
 * @param {string} formatString - Formato deseado
 * @returns {string} Fecha formateada
 */
export const formatDate = (date, formatString = 'dd/MM/yyyy') => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, formatString, { locale: es })
}

/**
 * Formatea una fecha a formato relativo (hace X tiempo)
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} Fecha relativa
 */
export const formatRelativeTime = (date) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: es })
}

/**
 * Formatea un número como precio en pesos
 * @param {number} amount - Cantidad a formatear
 * @returns {string} Precio formateado
 */
export const formatPrice = (amount) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(amount)
}

/**
 * Formatea un número de teléfono
 * @param {string} phone - Número de teléfono
 * @returns {string} Teléfono formateado
 */
export const formatPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/)
  if (match) {
    return `+${match[1]} ${match[2]}-${match[3]}`
  }
  return phone
}

/**
 * Trunca un texto a un número máximo de caracteres
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}
