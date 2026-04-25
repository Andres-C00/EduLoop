import Spinner from './Spinner'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-brand-700 hover:bg-brand-600 text-white focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-navy-900',
    secondary: 'border border-brand-700 hover:bg-brand-700/20 text-brand-400',
    ghost: 'hover:bg-white/5 text-slate-300 hover:text-white',
    danger: 'bg-rose-700 hover:bg-rose-600 text-white',
  }
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-5 py-2.5 text-sm', lg: 'px-6 py-3 text-base' }

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={loading || props.disabled} {...props}>
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  )
}
