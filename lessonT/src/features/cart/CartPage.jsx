import React from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../../stores/cartStore'
import Button from '@mui/material/Button'

export function CartPage() {
  const items = useCartStore((s) => s.items)
  const total = useCartStore((s) => s.total())
  const removeFromCart = useCartStore((s) => s.removeFromCart)

  if (!items.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Tu carrito está vacío</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">Explora el catálogo y agrega libros para comenzar.</p>
        <Link to="/" className="mt-6 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-300">Volver al catálogo</Link>
      </div>
    )
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
      <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Carrito</h1>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col gap-4 rounded-3xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="flex items-start gap-4">
                <img src={item.coverUrl} alt={item.title} className="h-24 w-20 rounded-xl object-cover" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.author}</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Cantidad: {item.quantity}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-700 dark:text-slate-300">${(item.price * item.quantity).toFixed(2)}</span>
                <Button variant="outlined" onClick={() => removeFromCart(item.id)}>Eliminar</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Total de la compra</p>
        <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">${total.toFixed(2)}</p>
        <Link to="/checkout"><Button className="mt-6 w-full">Finalizar compra</Button></Link>
      </aside>
    </section>
  )
}

export default CartPage
