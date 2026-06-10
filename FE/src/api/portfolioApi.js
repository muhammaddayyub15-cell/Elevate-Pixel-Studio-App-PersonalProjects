// ─────────────────────────────────────────────
// PORTFOLIO API
// Public  : GET /portfolios, GET /portfolios/:slug
// Admin   : GET|POST|PUT|DELETE /admin/portfolios
// ─────────────────────────────────────────────

import api from './axios'

// ── Public ──
export const getPortfolios = (params) =>
  api.get('/portfolios', { params })

export const getPortfolioBySlug = (slug) =>
  api.get(`/portfolios/${slug}`)

// ── Admin ──
export const adminGetPortfolios = () =>
  api.get('/admin/portfolios')

export const adminCreatePortfolio = (data) =>
  api.post('/admin/portfolios', data)

export const adminUpdatePortfolio = (id, data) =>
  api.put(`/admin/portfolios/${id}`, data)

export const adminDeletePortfolio = (id) =>
  api.delete(`/admin/portfolios/${id}`)