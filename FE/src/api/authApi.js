// ─────────────────────────────────────────────
// AUTH API
// Endpoint: POST /login, POST /logout
// ─────────────────────────────────────────────

import api from './axios'

// ── Login ──
export const login = (credentials) =>
  api.post('/login', credentials)

// ── Logout ──
export const logout = () =>
  api.post('/logout')