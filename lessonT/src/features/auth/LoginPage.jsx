import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'
import { useAuth } from '../../context/AuthContext'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) })

export function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(loginSchema), defaultValues: { email: '', password: '' } })

  useEffect(() => { if (isAuthenticated) navigate('/') }, [isAuthenticated, navigate])

  const onSubmit = async (v) => { await login(v.email, v.password); navigate('/') }

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Ingreso</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">Accede para finalizar tu compra y guardar tus libros favoritos.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
        <div>
          <TextField label="Email" fullWidth {...register('email')} error={!!errors.email} helperText={errors.email?.message} />
        </div>
        <div>
          <TextField label="Contraseña" type="password" fullWidth {...register('password')} error={!!errors.password} helperText={errors.password?.message} />
        </div>
        <Button type="submit" variant="contained" disabled={isSubmitting}>{isSubmitting ? 'Ingresando...' : 'Ingresar'}</Button>
      </form>
    </div>
  )
}

export default LoginPage
