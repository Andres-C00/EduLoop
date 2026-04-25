import { MAX_LIVES } from '../../utils/constants'

export default function LivesCounter({ lives = MAX_LIVES }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: MAX_LIVES }).map((_, i) => (
        <span key={i} className={`text-lg transition-all ${i < lives ? 'opacity-100' : 'opacity-20 grayscale'}`}>❤️</span>
      ))}
    </div>
  )
}
