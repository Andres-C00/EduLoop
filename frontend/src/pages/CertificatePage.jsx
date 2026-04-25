import { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import CertificateCard from '../components/certificate/CertificateCard'
import Button from '../components/common/Button'

const MOCK_CERTIFICATES = [
  { id: 1, level: 'basico', date: '2026-04-30', score: 88 },
]

export default function CertificatePage() {
  const { user } = useAuth()
  const certRef = useRef(null)
  const [selected, setSelected] = useState(MOCK_CERTIFICATES[0] ?? null)
  const [downloading, setDownloading] = useState(false)

  async function handleDownload() {
    if (!certRef.current) return
    setDownloading(true)
    try {
      const { default: html2canvas } = await import('html2canvas')
      const { jsPDF } = await import('jspdf')
      const canvas = await html2canvas(certRef.current, { scale: 2, backgroundColor: '#080f1a' })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width / 2, canvas.height / 2] })
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2)
      pdf.save(`EduLoop-Certificado-${user?.name?.replace(/\s+/g, '-')}.pdf`)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Mis certificados</h1>
        <p className="text-slate-400 text-sm mt-1">Descarga tus certificados digitales</p>
      </div>

      {MOCK_CERTIFICATES.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-4xl mb-3">🎓</p>
          <p className="text-slate-400">Aún no tienes certificados. Completa un nivel para obtener el tuyo.</p>
        </div>
      ) : (
        <>
          {/* Selector */}
          <div className="flex gap-2 flex-wrap">
            {MOCK_CERTIFICATES.map((cert) => (
              <button
                key={cert.id}
                onClick={() => setSelected(cert)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors
                  ${selected?.id === cert.id ? 'bg-brand-700/30 border-brand-700/60 text-brand-300' : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'}`}
              >
                {cert.level === 'avanzado' ? '📘 Nivel Avanzado' : '📗 Nivel Básico'} · {new Date(cert.date).toLocaleDateString('es-CO')}
              </button>
            ))}
          </div>

          {selected && (
            <>
              <CertificateCard ref={certRef} user={user} level={selected.level} date={selected.date} score={selected.score} />
              <div className="flex justify-center">
                <Button onClick={handleDownload} loading={downloading} size="lg">
                  ⬇️ Descargar PDF
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
