import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react'

interface UserProfile {
  id: string
  name: string
  email: string
}

interface AuthContextValue {
  user: UserProfile | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

const AUTH_STORAGE_KEY = 'bookstore_user'

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY)
    if (saved) {
      setUser(JSON.parse(saved) as UserProfile)
    }
  }, [])

  const login = async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const signedInUser = {
      id: 'user-1',
      name: 'Booklover',
      email,
    }
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(signedInUser))
    setUser(signedInUser)
  }

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: Boolean(user),
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
