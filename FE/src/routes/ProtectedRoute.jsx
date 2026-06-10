// ─────────────────────────────────────────────
// PROTECTED ROUTE
// Guard untuk semua halaman /admin/*
// Redirect ke login jika tidak authenticated
// ─────────────────────────────────────────────

import { Navigate } from 'react-router-dom'
import { useAuth }  from '../hooks/useAuth'
import { ROUTES }   from '../constants/routes'
import Loading      from '../components/common/Loading'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <Loading fullscreen />

  if (!isAuthenticated) return <Navigate to={ROUTES.ADMIN_LOGIN} replace />

  return children
}