// ─────────────────────────────────────────────
// WHATSAPP BUTTON
// CTA button yang membuka WhatsApp
// Bisa dipakai di Navbar, Hero, CTASection
// ─────────────────────────────────────────────
// Props:
//   message  : string pesan custom (opsional)
//   label    : string label button (opsional)
//   variant  : 'solid' | 'outline' | 'ghost'
//   size     : 'sm' | 'md' | 'lg'
// ─────────────────────────────────────────────

import { WHATSAPP_URL } from '../../constants/services'

export default function WhatsAppButton({
  message,
  label   = 'Konsultasi Gratis',
  variant = 'solid',
  size    = 'md',
}) {

  // ── Style map ──
  const variants = {
    solid:   'bg-[#9B30FF] text-white hover:bg-[#6B21A8]',
    outline: 'border border-[#9B30FF] text-[#9B30FF] hover:bg-[#9B30FF] hover:text-white',
    ghost:   'text-[#9B30FF] hover:underline',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  return (
    
      href={WHATSAPP_URL(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center gap-2
        rounded-full font-medium
        transition-all duration-300
        ${variants[variant]}
        ${sizes[size]}
      `}
    >
      {/* WhatsApp icon */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.847L.057 23.927l6.235-1.635A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.887 9.887 0 01-5.031-1.378l-.361-.214-3.741.981 1-3.648-.235-.374A9.861 9.861 0 012.106 12C2.106 6.58 6.58 2.106 12 2.106c5.419 0 9.894 4.474 9.894 9.894 0 5.419-4.475 9.894-9.894 9.894z"/>
      </svg>
      {label}
    </a>
  )
}