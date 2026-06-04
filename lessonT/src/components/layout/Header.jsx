import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCartStore } from '../../stores/cartStore'
import Button from '@mui/material/Button'

export function Header() {
  const { user, logout, isAuthenticated } = useAuth()
  const itemCount = useCartStore((s) => s.items.reduce((t, i) => t + i.quantity, 0))

  return (
    <header className="flex flex-col gap-4 border-b border-slate-200 px-6 py-4 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Link to="/" className="text-2xl font-bold text-slate-900 dark:text-white">
          BookStore
        </Link>
        <p className="text-sm text-slate-500 dark:text-slate-400">Tu tienda online de libros técnicos y de negocio.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link to="/cart" className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-200">
          Carrito ({itemCount})
        </Link>
        {isAuthenticated ? (
          <Button variant="outlined" onClick={logout}>
            Cerrar sesión
          </Button>
        ) : (
          <Link to="/login" className="text-sm font-medium text-blue-700 hover:text-blue-900 dark:text-blue-300">
            Iniciar sesión
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
