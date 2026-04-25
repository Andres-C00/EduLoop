export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function formatPercent(value) {
  return `${Math.round(value)}%`
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function calcProgress(completed, total) {
  if (!total) return 0
  return Math.round((completed / total) * 100)
}

export function getInitials(name = '') {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? '')
    .join('')
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
