const sizeMap = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-10 w-10' }

export default function Spinner({ size = 'md', className = '' }) {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-white/10 border-t-brand-500 ${sizeMap[size]} ${className}`}
      role="status"
      aria-label="Cargando"
    />
  )
}
