export const COLORS = {
  PRIMARY: '#43008a',
  PRIMARY_DARK: '#320066',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
}

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  NEWS: '/noticias',
  NEWS_DETAIL: '/noticias/:id',
  SCHEDULE: '/programacion',
  MATCH_DETAIL: '/programacion/:id',
  BUSINESSES: '/emprendimientos',
  BUSINESS_CATEGORY: '/emprendimientos/:categoria',
  BUSINESS_DETAIL: '/emprendimientos/:categoria/:negocioId',
  PROFILE: '/perfil',
  ADMIN: '/admin',
  ADMIN_NEWS: '/admin/noticias',
  ADMIN_MATCHES: '/admin/programacion',
  ADMIN_BUSINESSES: '/admin/negocios',
  ADMIN_PRODUCTS: '/admin/productos',
  ADMIN_USERS: '/admin/usuarios',
}

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'cdg_lobos_token',
  USER_DATA: 'cdg_lobos_user',
  CART: 'cdg_lobos_cart',
  THEME: 'cdg_lobos_theme',
}

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  NEWS: '/news',
  MATCHES: '/matches',
  BUSINESSES: '/businesses',
  CATEGORIES: '/categories',
  PRODUCTS: '/products',
  USERS: '/users',
}

export const CATEGORIES = [
  { id: '2011-2012', name: '2011-2012' },
  { id: '2013', name: '2013' },
  { id: '2014-2015', name: '2014-2015' },
  { id: 'primera', name: 'Primera División' },
  { id: 'reserva', name: 'Reserva' },
  { id: 'sub21', name: 'Sub-21' },
  { id: 'juveniles', name: 'Juveniles' },
  { id: 'femenino', name: 'Femenino' },
]

export const BUSINESS_CATEGORIES = [
  { id: 'restaurantes', name: 'Restaurantes', icon: 'restaurant' },
  { id: 'servicios', name: 'Servicios', icon: 'business_center' },
  { id: 'domicilios', name: 'Domicilios', icon: 'delivery_dining' },
  { id: 'tienda-deportiva', name: 'Tienda Deportiva', icon: 'sports_soccer' },
  { id: 'salud', name: 'Salud y Bienestar', icon: 'health_and_safety' },
  { id: 'educacion', name: 'Educación', icon: 'school' },
]

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
}
