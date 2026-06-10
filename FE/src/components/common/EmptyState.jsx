// ─────────────────────────────────────────────
// EMPTY STATE COMPONENT
// Ditampilkan saat data kosong dari API
// ─────────────────────────────────────────────
// Props:
//   title   : string
//   message : string
//   action  : { label, onClick } opsional
// ─────────────────────────────────────────────

export default function EmptyState({ title = 'Belum ada data', message = '', action = null }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-5xl mb-4 opacity-30">✦</div>
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      {message && <p className="text-[#A0A0A0] text-sm mb-6 max-w-xs">{message}</p>}
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2 bg-[#9B30FF] text-white rounded-full text-sm hover:bg-[#6B21A8] transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}