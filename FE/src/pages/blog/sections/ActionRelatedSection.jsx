// =============================================================
// pages/blog/sections/ArticleRelatedSection.jsx
// Artikel terkait — ditampilkan di bawah konten artikel
// Data: fetch /blogs?category=X&exclude=current_id
// Pakai: BlogCard yang sudah ada
//
// Props:
//   currentSlug  (string) — slug artikel aktif, untuk exclude
//   category     (string) — kategori artikel aktif, untuk filter
// =============================================================

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn } from "../../../utils/animations";
import SectionWrapper from "../../../components/common/SectionWrapper";
import BlogCard from "../../../components/cards/BlogCard";
import { getBlogs } from "../../../api/blogApi";


// =============================================================
// SECTION: CONSTANTS
// =============================================================

const RELATED_LIMIT = 3; // Maksimal 3 artikel terkait


// =============================================================
// SECTION: MAIN COMPONENT — ArticleRelatedSection
// Skip render jika tidak ada artikel terkait
// =============================================================

export default function ArticleRelatedSection({ currentSlug, category }) {
  // --- State ---
  const [related, setRelated]   = useState([]);
  const [loading, setLoading]   = useState(true);


  // =============================================================
  // SECTION: FETCH — artikel terkait berdasarkan kategori
  // Exclude artikel yang sedang dibaca
  // =============================================================

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        setLoading(true);

        const params = {
          per_page: RELATED_LIMIT + 1, // Ambil 1 extra sebagai buffer exclude
          ...(category && { category }),
        };

        const res  = await getBlogs(params);
        const data = res.data?.data || res.data || [];

        // Exclude artikel yang sedang dibaca berdasarkan slug
        const filtered = data
          .filter((b) => b.slug !== currentSlug)
          .slice(0, RELATED_LIMIT);

        setRelated(filtered);
      } catch (err) {
        // Gagal fetch related — tidak perlu error state, section cukup disembunyikan
        console.warn("ArticleRelatedSection: Gagal fetch related articles:", err);
        setRelated([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [currentSlug, category]);


  // Tidak render jika loading atau tidak ada artikel terkait
  if (loading || related.length === 0) return null;


  // =============================================================
  // SECTION: RENDER
  // =============================================================

  return (
    <SectionWrapper id="article-related">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Divider atas */}
        <div
          className="mb-12"
          style={{ height: "1px", background: "rgba(255,255,255,0.07)" }}
        />

        {/* Section header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-px" style={{ background: "#9B30FF" }} />
            <span
              className="text-sm font-medium tracking-widest uppercase"
              style={{ color: "#9B30FF" }}
            >
              Baca Juga
            </span>
          </div>

          <h2
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Artikel Terkait
          </h2>
        </motion.div>

        {/* Grid artikel terkait — 3 kolom */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {related.map((blog) => (
            <motion.div key={blog.id} variants={scaleIn}>
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </SectionWrapper>
  );
}