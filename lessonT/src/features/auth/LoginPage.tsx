import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { loginSchema } from './loginSchema'
import { useAuth } from '../../context/AuthContext'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

type LoginFormValues = {
  email: string
  password: string
}

export function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const onSubmit = async (values: LoginFormValues) => {
    await login(values.email, values.password)
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Ingreso</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">Accede para finalizar tu compra y guardar tus libros favoritos.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
        <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <span>Email</span>
          <Input type="email" autoComplete="email" {...register('email')} />
          {errors.email && <p className="text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>}
        </label>

        <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <span>Contraseña</span>
          <Input type="password" autoComplete="current-password" {...register('password')} />
          {errors.password && <p className="text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>}
        </label>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Ingresando...' : 'Ingresar'}
        </Button>
      </form>
    </div>
  )
}
