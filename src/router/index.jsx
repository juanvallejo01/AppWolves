import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider } from '@components/common'
import MainLayout from '@components/layout/MainLayout'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'

// Auth Pages
import LoginPage from '@pages/auth/LoginPage'
import RegisterPage from '@pages/auth/RegisterPage'

// Main Pages
import HomePage from '@pages/HomePage'
import NewsPage from '@pages/NewsPage'
import NewsDetailPage from '@pages/NewsDetailPage'
import SchedulePage from '@pages/SchedulePage'
import MatchDetailPage from '@pages/MatchDetailPage'
import BusinessesPage from '@pages/BusinessesPage'
import BusinessCategoryPage from '@pages/BusinessCategoryPage'
import BusinessDetailPage from '@pages/BusinessDetailPage'
import ProfilePage from '@pages/ProfilePage'

// Admin Pages
import AdminDashboard from '@pages/admin/AdminDashboard'
import AdminNews from '@pages/admin/AdminNews'
import AdminMatches from '@pages/admin/AdminMatches'
import AdminBusinesses from '@pages/admin/AdminBusinesses'
import AdminProducts from '@pages/admin/AdminProducts'
import AdminUsers from '@pages/admin/AdminUsers'

const AppRouter = () => {
  return (
    <ToastProvider>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/noticias" element={<NewsPage />} />
          <Route path="/noticias/:id" element={<NewsDetailPage />} />
          <Route path="/programacion" element={<SchedulePage />} />
          <Route path="/programacion/:id" element={<MatchDetailPage />} />
          <Route path="/emprendimientos" element={<BusinessesPage />} />
          <Route path="/emprendimientos/:categoria" element={<BusinessCategoryPage />} />
          <Route path="/emprendimientos/:categoria/:negocioId" element={<BusinessDetailPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <MainLayout showNavBar={false} />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="noticias" element={<AdminNews />} />
          <Route path="programacion" element={<AdminMatches />} />
          <Route path="negocios" element={<AdminBusinesses />} />
          <Route path="productos" element={<AdminProducts />} />
          <Route path="usuarios" element={<AdminUsers />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ToastProvider>
  )
}

export default AppRouter
