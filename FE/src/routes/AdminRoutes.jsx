// ─────────────────────────────────────────────
// ADMIN ROUTES
// Semua route /admin/* dengan ProtectedRoute guard
// Wrapped dengan AdminLayout
// ─────────────────────────────────────────────

import { Routes, Route }  from 'react-router-dom'
import AdminLayout        from '../layouts/AdminLayout'
import ProtectedRoute     from './ProtectedRoute'
import { ROUTES }         from '../constants/routes'

// ── Pages ──
import DashboardPage      from '../pages/admin/DashboardPage'
import AdminPortfolioPage from '../pages/admin/portfolio/AdminPortfolioPage'
import AdminBlogPage      from '../pages/admin/blog/AdminBlogPage'
import AdminContactPage   from '../pages/admin/contacts/AdminContactPage'

export default function AdminRoutes() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <Routes>
          <Route path={ROUTES.ADMIN_DASHBOARD} element={<DashboardPage />}      />
          <Route path={ROUTES.ADMIN_PORTFOLIO} element={<AdminPortfolioPage />} />
          <Route path={ROUTES.ADMIN_BLOG}      element={<AdminBlogPage />}      />
          <Route path={ROUTES.ADMIN_CONTACTS}  element={<AdminContactPage />}   />
        </Routes>
      </AdminLayout>
    </ProtectedRoute>
  )
}