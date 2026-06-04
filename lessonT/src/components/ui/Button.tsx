import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const baseClasses =
    'rounded-md px-4 py-2 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variantClasses =
    variant === 'secondary'
      ? 'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
      : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'

  return <button className={`${baseClasses} ${variantClasses} ${className}`} {...props} />
}
