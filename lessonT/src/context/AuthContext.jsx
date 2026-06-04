import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const AUTH_STORAGE_KEY = 'bookstore_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY)
    if (saved) setUser(JSON.parse(saved))
  }, [])

  const login = async (email, password) => {
    await new Promise((r) => setTimeout(r, 300))
    const signedInUser = { id: 'user-1', name: 'Booklover', email }
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(signedInUser))
    setUser(signedInUser)
  }

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setUser(null)
  }

  const value = useMemo(() => ({ user, login, logout, isAuthenticated: Boolean(user) }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
