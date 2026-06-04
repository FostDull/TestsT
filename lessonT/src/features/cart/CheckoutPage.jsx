import React, { useMemo } from 'react'
import { useCartStore } from '../../stores/cartStore'
import Button from '@mui/material/Button'

export function CheckoutPage() {
  const items = useCartStore((s) => s.items)
  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items])

  return (
    <section className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Revisar pedido</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Confirma tu dirección y completa el pago para recibir tus libros digitales.</p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-3xl border border-slate-200 p-4 dark:border-slate-800">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Cantidad: {item.quantity}</p>
            </div>
            <p className="font-semibold text-slate-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Total</p>
        <p className="mt-3 text-4xl font-semibold text-slate-900 dark:text-white">${total.toFixed(2)}</p>
      </div>

      <Button variant="contained">Pagar ahora</Button>
    </section>
  )
}

export default CheckoutPage
