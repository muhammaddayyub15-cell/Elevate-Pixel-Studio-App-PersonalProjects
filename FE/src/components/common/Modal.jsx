// ─────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────

import { useEffect } from 'react'


// ─────────────────────────────────────────────
// CHILD COMPONENT — ModalOverlay
// Background gelap yang menutup konten di belakang
// ─────────────────────────────────────────────

const ModalOverlay = ({ onClose }) => (
  <div
    className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
    onClick={onClose} // klik di luar modal untuk tutup
  />
)


// ─────────────────────────────────────────────
// CHILD COMPONENT — ModalHeader
// Judul dan tombol close
// ─────────────────────────────────────────────

const ModalHeader = ({ title, onClose }) => (
  <div className="flex items-center justify-between mb-6">
    {title && (
      <h2 className="text-xl font-semibold text-white font-heading">
        {title}
      </h2>
    )}
    <button
      onClick={onClose}
      className="ml-auto p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
      aria-label="Tutup modal"
    >
      {/* ikon X */}
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
)


// ─────────────────────────────────────────────
// MAIN COMPONENT — Modal
// Reusable modal dengan glass morphism style
// Props:
//   isOpen   : boolean — tampilkan atau sembunyikan modal
//   onClose  : function — dipanggil saat modal ditutup
//   title    : string (opsional) — judul modal
//   size     : 'sm' | 'md' | 'lg' (default: 'md')
//   children : konten di dalam modal
// ─────────────────────────────────────────────

const Modal = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  children,
}) => {

  // ── Kunci scroll body saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = '' // cleanup saat unmount
    }
  }, [isOpen])

  // ── Tutup modal dengan tombol Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // ── Jangan render apapun jika modal tertutup
  if (!isOpen) return null

  // ── Ukuran modal berdasarkan prop size
  const sizeClass = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  }[size] ?? 'max-w-lg'

  return (
    <>
      {/* overlay penutup */}
      <ModalOverlay onClose={onClose} />

      {/* container posisi modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

        {/* panel modal — glass card style */}
        <div
          className={`
            relative w-full ${sizeClass}
            bg-white/5 border border-white/10
            backdrop-blur-xl rounded-2xl
            p-6 shadow-2xl shadow-black/50
            animate-modal-enter
          `}
          role="dialog"
          aria-modal="true"
        >
          {/* header dengan judul dan tombol close */}
          <ModalHeader title={title} onClose={onClose} />

          {/* konten utama modal */}
          <div className="text-gray-300">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}


// ─────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────

export default Modal