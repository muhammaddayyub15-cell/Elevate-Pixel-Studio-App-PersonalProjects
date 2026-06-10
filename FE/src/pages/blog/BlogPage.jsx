// =============================================================
// pages/blog/BlogPage.jsx
// Parent page — Blog listing
// Render: BlogHeroSection + BlogGridSection
//
// Route: /blog  (PublicRoutes.jsx)
// Layout: MainLayout (Navbar + Footer di-handle parent)
// =============================================================

import { motion } from "framer-motion";
import { pageTransition } from "../../utils/animations";
import MetaHead from "../../components/seo/MetaHead";

// --- Section imports ---
import BlogHeroSection from "./sections/BlogHeroSection";
import BlogGridSection from "./sections/BlogGridSection";


// =============================================================
// SECTION: CONSTANTS — SEO meta
// =============================================================

const META = {
  title: "Blog — Elevate Pixel Studio",
  description:
    "Artikel seputar desain, teknologi, dan pengalaman membangun produk digital dari tim Elevate Pixel Studio.",
};


// =============================================================
// SECTION: MAIN COMPONENT — BlogPage
// =============================================================

export default function BlogPage() {
  return (
    <>
      {/* SEO */}
      <MetaHead title={META.title} description={META.description} />

      {/* Page wrapper dengan page transition */}
      <motion.div
        variants={pageTransition}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Hero: Vanta NET + judul halaman */}
        <BlogHeroSection />

        {/* Grid: filter kategori + listing artikel */}
        <BlogGridSection />
      </motion.div>
    </>
  );
}