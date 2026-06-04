import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchBooks } from '../../api/books'
import { useCartStore } from '../../stores/cartStore'
import { Button } from '../../components/ui/Button'
import { Book } from '../../types/book'

export function BookCatalogPage() {
  const [search, setSearch] = useState('')
  const { data = [], isLoading } = useQuery({ queryKey: ['books'], queryFn: fetchBooks })
  const addToCart = useCartStore((state) => state.addToCart)

  const filteredBooks = useMemo(
    () =>
      data.filter((book) =>
        `${book.title} ${book.author} ${book.genre}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [data, search],
  )

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-3xl font-semibold">Catálogo de libros</h1>
        <p className="text-slate-600 dark:text-slate-400">Busca por autor, título o categoría y añade tus favoritos al carrito.</p>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar libros..."
          className="w-full rounded-md border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
        />
      </div>

      {isLoading ? (
        <div className="rounded-xl bg-white p-8 text-center shadow-sm dark:bg-slate-900">Cargando libros...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredBooks.map((book) => (
            <article key={book.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900">
              <img src={book.coverUrl} alt={book.title} className="h-52 w-full rounded-2xl object-cover" />
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{book.genre}</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">${book.price.toFixed(2)}</span>
                </div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{book.title}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">{book.author}</p>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">{book.description}</p>
                <div className="flex flex-wrap gap-3">
                  <Link to={`/book/${book.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-400">
                    Ver detalle
                  </Link>
                  <Button type="button" onClick={() => addToCart(book)}>
                    Añadir al carrito
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
