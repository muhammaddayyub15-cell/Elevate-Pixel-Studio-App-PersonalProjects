// ─────────────────────────────────────────────
// LOADING COMPONENT
// Spinner dengan brand color purple
// ─────────────────────────────────────────────

export default function Loading({ fullscreen = false, size = 'md' }) {

  // ── Size map ──
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }

  const spinner = (
    <div className={`${sizes[size]} border-2 border-white/10 border-t-[#9B30FF] rounded-full animate-spin`} />
  )

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-[#0A0A0A] flex items-center justify-center z-50">
        {spinner}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-12">
      {spinner}
    </div>
  )
}