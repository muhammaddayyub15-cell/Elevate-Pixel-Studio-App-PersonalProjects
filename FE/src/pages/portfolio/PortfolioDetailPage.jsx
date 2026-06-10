// =============================================================
// pages/portfolio/PortfolioDetailPage.jsx
// Parent page — Detail satu project portfolio
// Render: ProjectHeroSection + ProjectInfoSection + ProjectGallerySection
//
// Route: /portfolio/:slug  (PublicRoutes.jsx)
// Param: slug → dipakai untuk fetch data project
// =============================================================

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition } from "../../utils/animations";
import MetaHead from "../../components/seo/MetaHead";
import Loading from "../../components/common/Loading";
import EmptyState from "../../components/common/EmptyState";

// --- API layer — ganti mock saat BE siap ---
import { getPortfolioBySlug as getMockBySlug } from "../../constants/portfolioData";

// --- Section imports ---
import ProjectHeroSection from "./sections/ProjectHeroSection";
import ProjectInfoSection from "./sections/ProjectInfoSection";
import ProjectGallerySection from "./sections/ProjectGallerySection";


// =============================================================
// COMPONENT — PortfolioDetailPage
// =============================================================

export default function PortfolioDetailPage() {
  // --- Router ---
  const { slug } = useParams();
  const navigate = useNavigate();

  // --- State ---
  const [project, setProject] = useState(null);   // Data project
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // =============================================================
  // SECTION: DATA FETCHING
  // Saat ini pakai mock data — swap dengan API call saat BE siap:
  //   import { getPortfolioDetail } from "../../api/portfolioApi";
  //   const res = await getPortfolioDetail(slug);
  // =============================================================

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);

        // TODO: Ganti dengan API call — const res = await getPortfolioDetail(slug);
        // Simulasi async sementara mock data dipakai
        await new Promise((r) => setTimeout(r, 400));
        const data = getMockBySlug(slug);

        if (!data) {
          // Project tidak ditemukan → redirect ke listing
          setError("Project tidak ditemukan.");
          return;
        }

        setProject(data);
      } catch (err) {
        console.error("PortfolioDetailPage: Gagal fetch project:", err);
        setError("Gagal memuat project. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProject();
  }, [slug]); // Re-fetch jika slug berubah


  // =============================================================
  // SECTION: RENDER STATES
  // =============================================================

  if (loading) {
    return <Loading fullscreen message="Memuat project..." />;
  }

  if (error) {
    return (
      <EmptyState
        icon="🔍"
        title="Project Tidak Ditemukan"
        description={error}
        action={{
          label: "Kembali ke Portfolio",
          onClick: () => navigate("/portfolio"),
        }}
      />
    );
  }


  // =============================================================
  // SECTION: MAIN RENDER
  // =============================================================

  return (
    <>
      {/* --- SEO: title dinamis dari data project --- */}
      <MetaHead
        title={`${project.title} — Elevate Pixel Studio`}
        description={project.short_description}
      />

      {/* --- Page wrapper dengan page transition --- */}
      <motion.div
        variants={pageTransition}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Hero: judul project + thumbnail sebagai background */}
        <ProjectHeroSection project={project} />

        {/* Info: tech stack, client, year, estimated dev, link */}
        <ProjectInfoSection project={project} />

        {/* Gallery: grid foto project + lightbox modal */}
        <ProjectGallerySection project={project} />
      </motion.div>
    </>
  );
}