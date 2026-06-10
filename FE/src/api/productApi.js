// ─────────────────────────────────────────────
// PRODUCT API
// Public: GET /products, GET /products/:slug
// Phase 2 — ecommerce belum aktif
// ─────────────────────────────────────────────

import api from './axios'

// ── Public ──
export const getProducts = (params) =>
  api.get('/products', { params })

export const getProductBySlug = (slug) =>
  api.get(`/products/${slug}`)