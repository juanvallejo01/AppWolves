# CDG LOBOS - Aplicativo Web

Sistema integral para el club deportivo CDG LOBOS que combina noticias, programación de partidos, emprendimientos aliados y gestión administrativa.

## 🚀 Características

- **Inicio**: Dashboard con resumen de noticias, próximos partidos y negocios destacados
- **Noticias**: Feed informativo con detalle de publicaciones
- **Programación**: Visualización de partidos por categorías
- **Emprendimientos**: Marketplace con catálogo de negocios locales y pedidos vía WhatsApp
- **Perfil**: Información del usuario y configuración
- **Panel Admin**: CRUD completo para gestión de contenido

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + Vite
- **Estilos**: Tailwind CSS
- **Routing**: React Router DOM v6
- **Estado**: Context API
- **Animaciones**: Framer Motion
- **Formularios**: React Hook Form
- **HTTP Client**: Axios
- **Fechas**: date-fns

## 📦 Instalación

1. **Instalar dependencias**
```bash
npm install
```

2. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

El aplicativo estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
src/
├── assets/              # Imágenes e iconos
├── components/          # Componentes reutilizables
│   ├── common/         # Componentes UI base
│   ├── layout/         # Layouts y navegación
│   └── ...             # Componentes por módulo
├── context/            # Context API providers
├── hooks/              # Custom React hooks
├── pages/              # Páginas de la aplicación
├── router/             # Configuración de rutas
├── services/           # Servicios y API calls
├── styles/             # Estilos globales
└── utils/              # Utilidades y helpers
```

## 🔐 Autenticación

### Usuario Regular
- **Email**: `user@example.com`
- **Password**: cualquier contraseña (8+ caracteres)

### Administrador
- **Email**: `admin@example.com`
- **Password**: cualquier contraseña (8+ caracteres)

> **Nota**: El sistema actualmente usa autenticación mock.

## 🎨 Temas

El aplicativo soporta tema claro y oscuro automáticamente.

## 📱 Responsive Design

Mobile-first y totalmente responsive para todos los dispositivos.

## 🔧 Scripts Disponibles

```bash
npm run dev      # Desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
npm run lint     # Linting
```

---

**CDG LOBOS** - Club Deportivo © 2025
