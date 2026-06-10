// ─────────────────────────────────────────────
// SLUGIFY UTILITY
// Mengubah string ke format URL-friendly slug
// ─────────────────────────────────────────────

// ── "Hello World" → "hello-world" ──
export const slugify = (text) => {
  if (!text) return ''
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

// ── "hello-world" → "Hello World" ──
export const unslugify = (slug) => {
  if (!slug) return ''
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}