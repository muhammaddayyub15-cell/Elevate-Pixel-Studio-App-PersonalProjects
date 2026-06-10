// ─────────────────────────────────────────────
// ROUTE CONSTANTS
// Semua path URL didefinisikan di sini
// Hindari hardcode string path di komponen
// ─────────────────────────────────────────────

export const ROUTES = {
  // Public
  HOME:               '/',
  ABOUT:              '/about',
  SERVICES:           '/services',
  PORTFOLIO:          '/portfolio',
  PORTFOLIO_DETAIL:   '/portfolio/:slug',
  BLOG:               '/blog',
  BLOG_DETAIL:        '/blog/:slug',
  CONTACT:            '/contact',

  // Admin
  ADMIN_LOGIN:        '/admin/login',
  ADMIN_DASHBOARD:    '/admin/dashboard',
  ADMIN_PORTFOLIO:    '/admin/portfolio',
  ADMIN_BLOG:         '/admin/blog',
  ADMIN_CONTACTS:     '/admin/contacts',
}