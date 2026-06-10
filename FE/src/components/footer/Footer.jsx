// ─────────────────────────────────────────────
// FOOTER COMPONENT
// Logo + info kiri, social media kanan
// ─────────────────────────────────────────────

import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { WHATSAPP_URL } from '../../constants/services'

// ── Social Links ──
const SOCIALS = [
  { label: 'Instagram', url: 'https://instagram.com/elevatepixelstudio', icon: 'IG' },
  { label: 'LinkedIn',  url: 'https://linkedin.com/company/elevatepixelstudio', icon: 'LI' },
  { label: 'WhatsApp',  url: WHATSAPP_URL(), icon: 'WA' },
]

// ── Footer Links ──
const FOOTER_LINKS = [
  { label: 'Services',  path: ROUTES.SERVICES  },
  { label: 'Portfolio', path: ROUTES.PORTFOLIO },
  { label: 'Blog',      path: ROUTES.BLOG      },
  { label: 'Contact',   path: ROUTES.CONTACT   },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* ── Main Row ── */}
        <div className="flex flex-col md:flex-row justify-between gap-8">

          {/* ── Brand + Info ── */}
          <div className="flex flex-col gap-4">
            <Link to={ROUTES.HOME}>
              <img src="/logo-full.png" alt="Elevate Pixel Studio" className="h-8" />
            </Link>
            <p className="text-[#A0A0A0] text-sm max-w-xs">
              Creative agency yang membantu bisnis tumbuh melalui desain dan strategi digital.
            </p>
            {/* ── Contact Info ── */}
            <div className="flex flex-col gap-1 text-sm text-[#A0A0A0]">
              <span>📍 Jakarta, Indonesia</span>
              <span>✉️ hello@elevatepixelstudio.com</span>
              <span>📱 +62 899-668-3031</span>
            </div>
          </div>

          {/* ── Links ── */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold text-sm">Navigation</h4>
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-[#A0A0A0] text-sm hover:text-[#9B30FF] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Social Media ── */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold text-sm">Follow Us</h4>
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 glass rounded-full flex items-center justify-center text-xs text-[#A0A0A0] hover:text-[#9B30FF] hover:border-[#9B30FF] transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[#606060]">
          <span>© {new Date().getFullYear()} Elevate Pixel Studio. All rights reserved.</span>
          <span>Made with ✦ in Jakarta</span>
        </div>

      </div>
    </footer>
  )
}