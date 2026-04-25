import { useApp } from '../../context/AppContext'

const typeMap = {
  info:    'bg-navy-800 border-brand-700 text-brand-300',
  success: 'bg-navy-800 border-green-600 text-green-300',
  error:   'bg-navy-800 border-rose-600 text-rose-300',
  warning: 'bg-navy-800 border-yellow-600 text-yellow-300',
}

export default function Notifications() {
  const { notifications } = useApp()
  if (!notifications.length) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`border-l-4 rounded-lg px-4 py-3 text-sm shadow-lg animate-slide-up ${typeMap[n.type] ?? typeMap.info}`}
        >
          {n.message}
        </div>
      ))}
    </div>
  )
}
