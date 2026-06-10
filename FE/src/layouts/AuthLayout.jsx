// ─────────────────────────────────────────────
// AUTH LAYOUT
// Wrapper untuk halaman login admin
// Centered content, dark background
// ─────────────────────────────────────────────

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}