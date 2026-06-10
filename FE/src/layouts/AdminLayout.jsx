// ─────────────────────────────────────────────
// ADMIN LAYOUT
// Wrapper untuk semua halaman admin CMS
// Struktur: Sidebar + Header + {children}
// ─────────────────────────────────────────────

import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../hooks/useAuth'

// ── Sidebar Menu ──
const MENU = [
  { label: 'Dashboard', path: ROUTES.ADMIN_DASHBOARD, icon: '⊞' },
  { label: 'Portfolio',  path: ROUTES.ADMIN_PORTFOLIO, icon: '◈' },
  { label: 'Blog',       path: ROUTES.ADMIN_BLOG,      icon: '✎' },
  { label: 'Contacts',   path: ROUTES.ADMIN_CONTACTS,  icon: '✉' },
]

export default function AdminLayout({ children }) {

  const location           = useLocation()
  const navigate           = useNavigate()
  const { logout }         = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  // ── Logout handler ──
  const handleLogout = async () => {
    await logout()
    navigate(ROUTES.ADMIN_LOGIN)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">

      {/* ── Sidebar ── */}
      <aside className={`
        flex flex-col border-r border-white/5
        transition-all duration-300
        ${collapsed ? 'w-16' : 'w-56'}
      `}>

        {/* ── Logo ── */}
        <div className="p-4 border-b border-white/5 flex items-center gap-3">
          <img src="/logo-submark.png" alt="EPS" className="w-7 h-7 shrink-0" />
          {!collapsed && <span className="text-white font-bold text-sm">EPS Admin</span>}
        </div>

        {/* ── Menu ── */}
        <nav className="flex-1 p-2 flex flex-col gap-1">
          {MENU.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                transition-colors duration-200
                ${location.pathname === item.path
                  ? 'bg-[#9B30FF] text-white'
                  : 'text-[#A0A0A0] hover:text-white hover:bg-white/5'}
              `}
            >
              <span className="text-base shrink-0">{item.icon}</span>
              {!collapsed && item.label}
            </Link>
          ))}
        </nav>

        {/* ── Collapse + Logout ── */}
        <div className="p-2 border-t border-white/5 flex flex-col gap-1">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#A0A0A0] hover:text-white hover:bg-white/5 transition-colors w-full"
          >
            <span>{collapsed ? '→' : '←'}</span>
            {!collapsed && 'Collapse'}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#A0A0A0] hover:text-red-400 hover:bg-red-400/5 transition-colors w-full"
          >
            <span>⏏</span>
            {!collapsed && 'Logout'}
          </button>
        </div>

      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

    </div>
  )
}