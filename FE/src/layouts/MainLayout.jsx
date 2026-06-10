// ─────────────────────────────────────────────
// MAIN LAYOUT
// Wrapper untuk semua public pages
// Struktur: Navbar → {children} → Footer
// ─────────────────────────────────────────────

import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}