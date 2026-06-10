// ─────────────────────────────────────────────
// BLOG API
// Public  : GET /blogs, GET /blogs/:slug, GET /blog-categories
// Admin   : GET|POST|PUT|DELETE /admin/blogs
// ─────────────────────────────────────────────

import api from './axios'

// ── Public ──
export const getBlogs = (params) =>
  api.get('/blogs', { params })

export const getBlogBySlug = (slug) =>
  api.get(`/blogs/${slug}`)

export const getBlogCategories = () =>
  api.get('/blog-categories')

// ── Admin ──
export const adminGetBlogs = () =>
  api.get('/admin/blogs')

export const adminCreateBlog = (data) =>
  api.post('/admin/blogs', data)

export const adminUpdateBlog = (id, data) =>
  api.put(`/admin/blogs/${id}`, data)

export const adminDeleteBlog = (id) =>
  api.delete(`/admin/blogs/${id}`)