// ─────────────────────────────────────────────
// AXIOS INSTANCE
// Base config untuk semua HTTP request ke Laravel API
// Semua api/*.js mengimport instance ini
// ─────────────────────────────────────────────

import axios from 'axios'

// ── Instance ──
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept':       'application/json',
  },
  timeout: 10000,
})

// ── Request Interceptor ──
// Otomatis attach Bearer token jika ada di localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('eps_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ── Response Interceptor ──
// Handle 401 → redirect ke login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('eps_token')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

export default api