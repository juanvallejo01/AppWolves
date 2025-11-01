import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import { useToast } from '@components/common'
import { Input, Button } from '@components/common'
import { motion } from 'framer-motion'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const toast = useToast()
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await login(formData.email, formData.password)
      
      if (result.success) {
        toast.success('¡Bienvenido a CDG LOBOS!')
        navigate('/')
      } else {
        toast.error(result.error || 'Error al iniciar sesión')
      }
    } catch (error) {
      toast.error('Error al iniciar sesión')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-white dark:bg-[#101010] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex w-full max-w-sm flex-col items-center"
      >
        {/* Logo */}
        <div className="mb-10 w-32 h-32">
          <img
            alt="Stylized wolf logo for CDG LOBOS"
            className="h-full w-full object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGYgRDLs7krq_vygd7hVpDbCe_RTSoG_rH-OiTsIGb-nXiNpyYhFHrrciElEd5RxbDM7oJeCB8hdRC3GDEnKkVca4EiazuBls8EqOcOzIZzZSiutPy9wCy1cQq_i6trvixJOLKKVqS4u39AhEagTtjzntTUyry4pKMQncIQ6l3EDYyG0tN0g1oimTn_3esXKRZt2wF45u8pHnUO9shTncqJ23ROvbzBJYsaYeWKBcGSkjfJ3f82vvoKQjFRjuZDLb5rsiOjsLtBbQ"
          />
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* Email Field */}
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="tu@email.com"
            icon="mail"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Password Field */}
          <Input
            label="Contraseña"
            type="password"
            name="password"
            placeholder="Introduce tu contraseña"
            icon="lock"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Forgot Password Link */}
          <a
            href="#"
            className="text-primary dark:text-purple-400 text-sm font-medium leading-normal self-end pt-3 underline block text-right"
          >
            Olvidé mi contraseña
          </a>

          {/* Login Button */}
          <div className="pt-6 pb-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
            >
              Iniciar Sesión
            </Button>
          </div>

          {/* Create Account Link */}
          <div className="pt-6 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm font-normal">
              ¿Aún no tienes cuenta?{' '}
              <a
                href="/register"
                className="font-bold text-primary dark:text-purple-400 hover:underline"
              >
                Crear cuenta
              </a>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default LoginPage
