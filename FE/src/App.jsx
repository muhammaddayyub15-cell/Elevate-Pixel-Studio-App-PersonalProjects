// ─────────────────────────────────────────────
// APP — Root Component
// Menyusun semua provider dan router
// Tidak ada UI logic di sini
// ─────────────────────────────────────────────

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider }   from './contexts/AuthContext'
import { ThemeProvider }  from './contexts/ThemeContext'
import PublicRoutes       from './routes/PublicRoutes'
import AdminRoutes        from './routes/AdminRoutes'
import LoginPage          from './pages/admin/LoginPage'
import { ROUTES }         from './constants/routes'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* ── Admin Login — AuthLayout terpisah ── */}
            <Route path={ROUTES.ADMIN_LOGIN} element={<LoginPage />} />

            {/* ── Admin Protected Routes ── */}
            <Route path="/admin/*" element={<AdminRoutes />} />

            {/* ── Public Routes ── */}
            <Route path="/*" element={<PublicRoutes />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}