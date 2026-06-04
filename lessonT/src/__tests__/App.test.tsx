import { render, screen } from '@testing-library/react'
import App from '../App'

describe('BookStore app', () => {
  it('renders el catálogo de libros', () => {
    render(<App />)
    expect(screen.getByText(/Catálogo de libros/i)).toBeInTheDocument()
  })
})
