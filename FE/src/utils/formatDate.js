// ─────────────────────────────────────────────
// FORMAT DATE UTILITY
// Mengubah ISO date string ke format lokal
// ─────────────────────────────────────────────

// ── Format: 10 Juni 2026 ──
export const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('id-ID', {
    day:   'numeric',
    month: 'long',
    year:  'numeric',
  })
}

// ── Format: 10 Jun 2026 ──
export const formatDateShort = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('id-ID', {
    day:   'numeric',
    month: 'short',
    year:  'numeric',
  })
}

// ── Format: 3 hari yang lalu ──
export const formatRelativeDate = (dateString) => {
  if (!dateString) return ''
  const diff = Date.now() - new Date(dateString).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return 'Hari ini'
  if (days === 1) return 'Kemarin'
  if (days < 30)  return `${days} hari yang lalu`
  if (days < 365) return `${Math.floor(days / 30)} bulan yang lalu`
  return `${Math.floor(days / 365)} tahun yang lalu`
}