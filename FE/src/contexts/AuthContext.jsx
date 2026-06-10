// ─────────────────────────────────────────────
// AUTH CONTEXT
// Global state untuk autentikasi admin
// Wrap di App.jsx — tersedia di seluruh tree
// ─────────────────────────────────────────────

import { createContext, useContext, useState, useEffect } from 'react'
import { login as loginApi, logout as logoutApi } from '../api/authApi'

// ── Context ──
const AuthContext = createContext(null)

// ── Provider ──
export function AuthProvider({ children }) {

  const [user,    setUser]    = useState(null)
  const [token,   setToken]   = useState(localStorage.getItem('eps_token'))
  const [loading, setLoading] = useState(false)

  // Cek token saat pertama load
  useEffect(() => {
    const savedToken = localStorage.getItem('eps_token')
    if (savedToken) setToken(savedToken)
  }, [])

  // ── Login ──
  const login = async (credentials) => {
    setLoading(true)
    try {
      const res = await loginApi(credentials)
      const { token: newToken } = res.data
      localStorage.setItem('eps_token', newToken)
      setToken(newToken)
      return { success: true }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Login gagal' }
    } finally {
      setLoading(false)
    }
  }

  // ── Logout ──
  const logout = async () => {
    try {
      await logoutApi()
    } finally {
      localStorage.removeItem('eps_token')
      setToken(null)
      setUser(null)
    }
  }

  const isAuthenticated = !!token

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// ── Hook ──
export const useAuthContext = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext harus digunakan di dalam AuthProvider')
  return ctx
}