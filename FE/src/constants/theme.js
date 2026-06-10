// ─────────────────────────────────────────────
// THEME CONSTANTS
// Single source of truth untuk semua design token
// Ubah warna di sini, otomatis berlaku di seluruh app
// ─────────────────────────────────────────────

export const colors = {
  // Brand
  primary:        '#9B30FF',
  primaryLight:   '#C678FF',
  primaryDark:    '#6B21A8',

  // Background
  bg:             '#0A0A0A',
  bgCard:         'rgba(255, 255, 255, 0.05)',
  bgCardHover:    'rgba(255, 255, 255, 0.08)',

  // Glass
  glassBorder:    'rgba(255, 255, 255, 0.10)',
  glassBlur:      'blur(12px)',

  // Text
  textPrimary:    '#FFFFFF',
  textSecondary:  '#A0A0A0',
  textMuted:      '#606060',

  // Status
  success:        '#22C55E',
  error:          '#EF4444',
  warning:        '#F59E0B',
}

export const fonts = {
  heading: "'Space Grotesk', sans-serif",
  body:    "'Inter', sans-serif",
}

export const breakpoints = {
  sm:  '640px',
  md:  '768px',
  lg:  '1024px',
  xl:  '1280px',
  xxl: '1536px',
}