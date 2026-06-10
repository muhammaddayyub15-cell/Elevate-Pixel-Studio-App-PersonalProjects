// =============================================================
// pages/portfolio/PortfolioPage.jsx
// Parent page — Portfolio listing
// Render: PortfolioHeroSection + PortfolioGridSection
//
// Route: /portfolio  (PublicRoutes.jsx)
// Layout: MainLayout (Navbar + Footer sudah di-handle parent)
// =============================================================

import { motion } from "framer-motion";
import { pageTransition } from "../../utils/animations";
import MetaHead from "../../components/seo/MetaHead";

// --- Section imports ---
import PortfolioHeroSection from "./sections/PortfolioHeroSection";
import PortfolioGridSection from "./sections/PortfolioGridSection";


// =============================================================
// CONSTANTS — SEO meta
// =============================================================

const META = {
  title: "Portfolio — Elevate Pixel Studio",
  description:
    "Lihat karya terbaik kami: website, branding, landing page, dan UI kit yang telah kami bangun untuk klien.",
};


// =============================================================
// COMPONENT — PortfolioPage
// =============================================================

export default function PortfolioPage() {
  return (
    <>
      {/* --- SEO --- */}
      <MetaHead title={META.title} description={META.description} />

      {/* --- Page wrapper dengan page transition --- */}
      <motion.div
        variants={pageTransition}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Hero: Vanta NET background + judul halaman */}
        <PortfolioHeroSection />

        {/* Grid: filter kategori + masonry card list */}
        <PortfolioGridSection />
      </motion.div>
    </>
  );
}