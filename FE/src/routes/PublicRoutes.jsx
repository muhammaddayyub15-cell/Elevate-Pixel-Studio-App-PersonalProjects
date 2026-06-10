// ─────────────────────────────────────────────
// PUBLIC ROUTES
// Semua route yang bisa diakses visitor
// Wrapped dengan MainLayout
// ─────────────────────────────────────────────

import { Routes, Route }      from 'react-router-dom'
import MainLayout             from '../layouts/MainLayout'
import { ROUTES }             from '../constants/routes'

// ── Pages ──
import HomePage           from '../pages/home/HomePage'
import AboutPage          from '../pages/about/AboutPage'
import ServicesPage       from '../pages/services/ServicesPage'
import PortfolioPage      from '../pages/portfolio/PortfolioPage'
import PortfolioDetailPage from '../pages/portfolio/PortfolioDetailPage'
import BlogPage           from '../pages/blog/BlogPage'
import BlogDetailPage     from '../pages/blog/BlogDetailPage'
import ContactPage        from '../pages/contact/ContactPage'

export default function PublicRoutes() {
  return (
    <MainLayout>
      <Routes>
        <Route path={ROUTES.HOME}             element={<HomePage />}           />
        <Route path={ROUTES.ABOUT}            element={<AboutPage />}          />
        <Route path={ROUTES.SERVICES}         element={<ServicesPage />}       />
        <Route path={ROUTES.PORTFOLIO}        element={<PortfolioPage />}      />
        <Route path={ROUTES.PORTFOLIO_DETAIL} element={<PortfolioDetailPage />}/>
        <Route path={ROUTES.BLOG}             element={<BlogPage />}           />
        <Route path={ROUTES.BLOG_DETAIL}      element={<BlogDetailPage />}     />
        <Route path={ROUTES.CONTACT}          element={<ContactPage />}        />
      </Routes>
    </MainLayout>
  )
}