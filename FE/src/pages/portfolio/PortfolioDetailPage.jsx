// =============================================================
// pages/portfolio/PortfolioDetailPage.jsx
// Parent page — Detail satu project portfolio
// Render: ProjectHeroSection + ProjectInfoSection + ProjectGallerySection
//
// Route: /portfolio/:slug  (PublicRoutes.jsx)
// Param: slug → dipakai untuk fetch data project
//
// FIX: props EmptyState (icon+description → message)
//      props Loading (message → tidak ada prop message, fullscreen saja)
// =============================================================

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition } from "../../utils/animations";
import MetaHead from "../../components/seo/MetaHead";
import Loading from "../../components/common/Loading";
import EmptyState from "../../components/common/EmptyState";

// --- Mock data — ganti dengan API call saat BE siap ---
import { getPortfolioBySlug as getMockBySlug } from "../../constants/portfolioData";

// --- Section imports ---
import ProjectHeroSection    from "./sections/ProjectHeroSection";
import ProjectInfoSection    from "./sections/ProjectInfoSection";
import ProjectGallerySection from "./sections/ProjectGallerySection";


// =============================================================
// COMPONENT — PortfolioDetailPage
// =============================================================

export default function PortfolioDetailPage() {
  const { slug }   = useParams();
  const navigate   = useNavigate();

  // --- State ---
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);


  // =============================================================
  // SECTION: DATA FETCHING
  // TODO: swap mock → API saat BE siap
  //   import { getPortfolioDetail } from "../../api/portfolioApi";
  //   const res = await getPortfolioDetail(slug);
  //   setProject(res.data?.data || res.data);
  // =============================================================

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulasi async — hapus setTimeout saat pakai API nyata
        await new Promise((r) => setTimeout(r, 400));
        const data = getMockBySlug(slug);

        if (!data) {
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
  }, [slug]);


  // =============================================================
  // SECTION: RENDER STATES
  // =============================================================

  if (loading) {
    // fullscreen spinner — tidak ada prop message di Loading
    return <Loading fullscreen />;
  }

  if (error) {
    return (
      <EmptyState
        title="Project Tidak Ditemukan"
        message={error}
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
      <MetaHead
        title={`${project.title} — Elevate Pixel Studio`}
        description={project.short_description}
      />

      <motion.div
        variants={pageTransition}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <ProjectHeroSection    project={project} />
        <ProjectInfoSection    project={project} />
        <ProjectGallerySection project={project} />
      </motion.div>
    </>
  );
}