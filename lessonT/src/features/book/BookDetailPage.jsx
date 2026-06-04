import React, { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchBookById } from '../../api/books'
import { useCartStore } from '../../stores/cartStore'
import Button from '@mui/material/Button'

export function BookDetailPage() {
  const { id } = useParams()
  const coverRef = useRef(null)
  const { data: book, isLoading } = useQuery({ queryKey: ['book', id], queryFn: () => fetchBookById(id ?? ''), enabled: Boolean(id) })
  const addToCart = useCartStore((s) => s.addToCart)

  useEffect(() => {
    coverRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [book])

  if (isLoading || !book) return <div className="rounded-xl bg-white p-10 text-center shadow-sm dark:bg-slate-900">Cargando detalle de libro...</div>

  return (
    <section className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <img ref={coverRef} src={book.coverUrl} alt={book.title} className="h-96 w-full rounded-3xl object-cover" />
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">{book.title}</h1>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{book.genre}</p>
          <p className="text-lg text-slate-700 dark:text-slate-300">Por {book.author}</p>
          <p className="leading-7 text-slate-600 dark:text-slate-400">{book.description}</p>
        </div>
      </div>
      <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Resumen</p>
          <p className="text-3xl font-semibold text-slate-900 dark:text-white">${book.price.toFixed(2)}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Rating: {book.rating} / 5</p>
        </div>
        <Button variant="contained" onClick={() => addToCart(book)}>Agregar al carrito</Button>
        <Link to="/cart" className="block text-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-300">Ver carrito</Link>
      </aside>
    </section>
  )
}

export default BookDetailPage
