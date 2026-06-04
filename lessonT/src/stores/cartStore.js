import create from 'zustand'

export const useCartStore = create((set, get) => ({
  items: [],
  addToCart: (book) => {
    const existing = get().items.find((i) => i.id === book.id)
    if (existing) {
      set({ items: get().items.map((i) => (i.id === book.id ? { ...i, quantity: i.quantity + 1 } : i)) })
      return
    }
    set({ items: [...get().items, { ...book, quantity: 1 }] })
  },
  removeFromCart: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
  clearCart: () => set({ items: [] }),
  total: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
}))
