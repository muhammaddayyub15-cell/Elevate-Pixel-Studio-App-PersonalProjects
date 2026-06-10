// =============================================================
// pages/blog/BlogDetailPage.jsx
// Parent page — Detail satu artikel blog
// Render: ArticleHeroSection + ArticleContentSection + ArticleRelatedSection
//
// Route: /blog/:slug  (PublicRoutes.jsx)
// Param: slug → fetch artikel dari API
// =============================================================

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition } from "../../utils/animations";
import MetaHead from "../../components/seo/MetaHead";
import Loading from "../../components/common/Loading";
import EmptyState from "../../components/common/EmptyState";

// --- API layer ---
import { getBlogBySlug } from "../../api/blogApi";

// --- Section imports ---
import ArticleHeroSection    from "./sections/ArticleHeroSection";
import ArticleContentSection from "./sections/ArticleContentSection";
import ArticleRelatedSection from "./sections/ArticleRelatedSection";


// =============================================================
// SECTION: MAIN COMPONENT — BlogDetailPage
// =============================================================

export default function BlogDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // --- State ---
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);


  // =============================================================
  // SECTION: DATA FETCHING
  // Fetch artikel berdasarkan slug dari URL param
  // =============================================================

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);

        const res  = await getBlogBySlug(slug);
        const data = res.data?.data || res.data;

        if (!data) {
          setError("Artikel tidak ditemukan.");
          return;
        }

        setArticle(data);
      } catch (err) {
        console.error("BlogDetailPage: Gagal fetch artikel:", err);

        // Bedakan 404 dengan error lain
        if (err.response?.status === 404) {
          setError("Artikel tidak ditemukan.");
        } else {
          setError("Gagal memuat artikel. Silakan coba lagi.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchArticle();
  }, [slug]); // Re-fetch jika slug berubah


  // =============================================================
  // SECTION: RENDER STATES
  // =============================================================

  if (loading) {
    return <Loading fullscreen />;
  }

  if (error) {
    return (
      <EmptyState
        title="Artikel Tidak Ditemukan"
        message={error}
        action={{
          label: "Kembali ke Blog",
          onClick: () => navigate("/blog"),
        }}
      />
    );
  }


  // =============================================================
  // SECTION: MAIN RENDER
  // =============================================================

  return (
    <>
      {/* SEO: title dan description dari data artikel */}
      <MetaHead
        title={`${article.title} — Elevate Pixel Studio`}
        description={article.excerpt || article.title}
      />

      {/* Page transition wrapper */}
      <motion.div
        variants={pageTransition}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Hero: thumbnail bg + judul + meta */}
        <ArticleHeroSection article={article} />

        {/* Konten: HTML artikel + sidebar tags + share */}
        <ArticleContentSection article={article} />

        {/* Artikel terkait: same category, exclude current */}
        <ArticleRelatedSection
          currentSlug={slug}
          category={article.category}
        />
      </motion.div>
    </>
  );
}