import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import BookCatalogPage from '../features/book/BookCatalogPage'
import BookDetailPage from '../features/book/BookDetailPage'
import CartPage from '../features/cart/CartPage'
import CheckoutPage from '../features/cart/CheckoutPage'
import LoginPage from '../features/auth/LoginPage'
import ProtectedRoute from '../routes/ProtectedRoute'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<BookCatalogPage />} />
        <Route path="book/:id" element={<BookDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
