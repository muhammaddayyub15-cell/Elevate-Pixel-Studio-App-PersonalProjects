// ─────────────────────────────────────────────
// NAVBAR COMPONENT
// Fixed top, dark glass background
// Mobile: hamburger menu
// Desktop: pill nav + CTA button
// ─────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { Link, useLocation }   from 'react-router-dom'
import { ROUTES }              from '../../constants/routes'
import WhatsAppButton          from '../buttons/WhatsAppButton'

// ── Nav Links ──
const NAV_LINKS = [
  { label: 'Home',      path: ROUTES.HOME      },
  { label: 'Services',  path: ROUTES.SERVICES  },
  { label: 'Portfolio', path: ROUTES.PORTFOLIO },
  { label: 'Blog',      path: ROUTES.BLOG      },
  { label: 'About',     path: ROUTES.ABOUT     },
  { label: 'Contact',   path: ROUTES.CONTACT   },
]

export default function Navbar() {

  const location            = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // ── Scroll handler — tambah blur saat scroll ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Tutup menu saat navigasi ──
  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50
      transition-all duration-300
      ${scrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}
    `}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2">
          <img src="/logo-submark.png" alt="EPS" className="w-8 h-8" />
          <span className="font-heading font-bold text-white hidden sm:block">
            Elevate<span className="text-[#9B30FF]">Pixel</span>
          </span>
        </Link>

        {/* ── Desktop Nav — pill container ── */}
        <div className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${location.pathname === link.path
                  ? 'bg-[#9B30FF] text-white'
                  : 'text-[#A0A0A0] hover:text-white'}
              `}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ── CTA + Mobile Toggle ── */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <WhatsAppButton label="Get Started" size="sm" />
          </div>

          {/* ── Hamburger ── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <div className={`w-5 h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-5 h-0.5 bg-white my-1 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>

      </div>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div className="md:hidden glass mx-4 mb-4 rounded-2xl p-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`
                block px-4 py-3 rounded-xl text-sm font-medium transition-colors
                ${location.pathname === link.path
                  ? 'bg-[#9B30FF] text-white'
                  : 'text-[#A0A0A0] hover:text-white'}
              `}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 pt-3 border-t border-white/10">
            <WhatsAppButton label="Konsultasi Gratis" size="sm" className="w-full justify-center" />
          </div>
        </div>
      )}
    </nav>
  )
}