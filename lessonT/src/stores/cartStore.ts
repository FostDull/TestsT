import { create } from 'zustand'
import { Book } from '../types/book'

export interface CartItem extends Book {
  quantity: number
}

interface CartState {
  items: CartItem[]
  addToCart: (book: Book) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  total: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: (book) => {
    const existing = get().items.find((item) => item.id === book.id)
    if (existing) {
      set({
        items: get().items.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      })
      return
    }

    set({ items: [...get().items, { ...book, quantity: 1 }] })
  },
  removeFromCart: (id) => {
    set({ items: get().items.filter((item) => item.id !== id) })
  },
  clearCart: () => set({ items: [] }),
  total: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}))
