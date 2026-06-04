import { Book } from '../types/book'

const bookCatalog: Book[] = [
  {
    id: 'book-1',
    title: 'Arquitectura React moderna',
    author: 'Ana Librera',
    price: 24.95,
    description: 'Una guía completa para construir catálogos, carrito y checkout con React y TypeScript.',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    genre: 'Negocios',
  },
  {
    id: 'book-2',
    title: 'Ventas digitales para autores',
    author: 'Luis Editorial',
    price: 18.9,
    description: 'Aprende los pasos para lanzar tu libro y capturar clientes desde el primer día.',
    coverUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80',
    rating: 4.6,
    genre: 'Marketing',
  },
  {
    id: 'book-3',
    title: 'Diseño editorial con Tailwind',
    author: 'María Código',
    price: 29.95,
    description: 'Mejora la experiencia de lectura con una interfaz moderna, responsive y centrada en ventas.',
    coverUrl: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    genre: 'Diseño',
  },
]

function wait<T>(value: T) {
  return new Promise<T>((resolve) => setTimeout(() => resolve(value), 300))
}

export async function fetchBooks(): Promise<Book[]> {
  return wait(bookCatalog)
}

export async function fetchBookById(id: string): Promise<Book | undefined> {
  return wait(bookCatalog.find((book) => book.id === id))
}
