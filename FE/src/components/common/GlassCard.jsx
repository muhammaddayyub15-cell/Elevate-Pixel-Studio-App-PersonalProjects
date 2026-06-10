// ─────────────────────────────────────────────
// GLASS CARD — Reusable Component
// Wrapper dengan efek glassmorphism
// Dipakai di: ServicesSection, PortfolioSection,
//             ProcessSection, StatsSection
// ─────────────────────────────────────────────
// Props:
//   children   : ReactNode
//   className  : string (tambahan class Tailwind)
//   onClick    : function (opsional)
//   hover      : boolean (aktifkan hover effect)
// ─────────────────────────────────────────────

export default function GlassCard({ children, className = '', onClick, hover = true }) {
  return (
    <div
      onClick={onClick}
      className={`
        glass
        rounded-2xl
        p-6
        transition-all
        duration-300
        ${hover ? 'hover:scale-[1.02] cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}