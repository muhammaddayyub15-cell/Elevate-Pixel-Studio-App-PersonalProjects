// =============================================================
// pages/blog/sections/BlogGridSection.jsx
// Grid listing artikel blog
// Fitur: filter kategori (dari API), pagination, loading, empty state
// Pakai: BlogCard, getBlogs, getBlogCategories dari blogApi.js
// =============================================================

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn } from "../../../utils/animations";
import SectionWrapper from "../../../components/common/SectionWrapper";
import Loading from "../../../components/common/Loading";
import EmptyState from "../../../components/common/EmptyState";
import BlogCard from "../../../components/cards/BlogCard";
import { getBlogs, getBlogCategories } from "../../../api/blogApi";


// =============================================================
// SECTION: CONSTANTS
// =============================================================

const ALL_FILTER    = { label: "Semua", value: "all" };
const POSTS_PER_PAGE = 6; // Jumlah artikel per halaman


// =============================================================
// SECTION: SUB-COMPONENT — CategoryFilter
// Filter bar kategori — horizontal scroll di mobile
// =============================================================

function CategoryFilter({ categories, active, onSelect }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-10"
    >
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onSelect(cat.value)}
          className="flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
          style={{
            background:
              active === cat.value
                ? "linear-gradient(135deg, #9B30FF, #6B21A8)"
                : "rgba(255,255,255,0.05)",
            border:
              active === cat.value
                ? "1px solid transparent"
                : "1px solid rgba(255,255,255,0.1)",
            color:  active === cat.value ? "#FFFFFF" : "#A0A0A0",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {cat.label}
        </button>
      ))}
    </motion.div>
  );
}


// =============================================================
// SECTION: SUB-COMPONENT — LoadMoreButton
// Tombol load more — muncul jika masih ada halaman berikutnya
// =============================================================

function LoadMoreButton({ onClick, loading }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex justify-center mt-12"
    >
      <button
        onClick={onClick}
        disabled={loading}
        className="px-8 py-3 rounded-full text-sm font-semibold transition-all duration-200 disabled:opacity-50"
        style={{
          background: "rgba(155,48,255,0.12)",
          border: "1px solid rgba(155,48,255,0.35)",
          color: "#C678FF",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {loading ? "Memuat..." : "Lihat Artikel Lainnya"}
      </button>
    </motion.div>
  );
}


// =============================================================
// SECTION: MAIN COMPONENT — BlogGridSection
// State: blogs, categories, activeFilter, page, hasMore
// =============================================================

export default function BlogGridSection() {
  // --- State ---
  const [blogs, setBlogs]               = useState([]);
  const [categories, setCategories]     = useState([ALL_FILTER]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [page, setPage]                 = useState(1);
  const [hasMore, setHasMore]           = useState(false);   // Ada halaman berikutnya?
  const [loading, setLoading]           = useState(true);
  const [loadingMore, setLoadingMore]   = useState(false);   // Loading saat load more
  const [error, setError]               = useState(null);


  // =============================================================
  // SECTION: FETCH — Kategori (sekali saat mount)
  // =============================================================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res  = await getBlogCategories();
        const data = res.data?.data || res.data || [];

        // Build filter dari data API — tambah "Semua" di depan
        const built = [
          ALL_FILTER,
          ...data.map((cat) => ({ label: cat.name, value: cat.slug })),
        ];
        setCategories(built);
      } catch (err) {
        // Kategori gagal → tetap tampil "Semua" saja, tidak block grid
        console.warn("BlogGridSection: Gagal fetch kategori:", err);
      }
    };

    fetchCategories();
  }, []);


  // =============================================================
  // SECTION: FETCH — Blogs (refetch saat filter atau page berubah)
  // =============================================================

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Page 1 = loading utama, page > 1 = load more
        page === 1 ? setLoading(true) : setLoadingMore(true);
        setError(null);

        // Kirim params filter + pagination ke API
        const params = {
          page,
          per_page: POSTS_PER_PAGE,
          ...(activeFilter !== "all" && { category: activeFilter }),
        };

        const res  = await getBlogs(params);
        const data = res.data?.data || [];

        // Deteksi apakah masih ada halaman berikutnya
        const meta  = res.data?.meta || res.data;
        const total = meta?.total || 0;
        const currentCount = (page - 1) * POSTS_PER_PAGE + data.length;
        setHasMore(currentCount < total);

        // Append atau replace tergantung page
        setBlogs((prev) => (page === 1 ? data : [...prev, ...data]));
      } catch (err) {
        console.error("BlogGridSection: Gagal fetch blogs:", err);
        setError("Gagal memuat artikel. Silakan coba lagi.");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchBlogs();
  }, [activeFilter, page]);


  // --- Filter handler: reset ke page 1 saat ganti filter ---
  const handleFilter = (value) => {
    setActiveFilter(value);
    setPage(1);
    setBlogs([]); // Clear dulu agar tidak flash konten lama
  };

  // --- Load more: increment page ---
  const handleLoadMore = () => setPage((prev) => prev + 1);


  // =============================================================
  // SECTION: RENDER STATES
  // =============================================================

  if (loading) {
    return (
      <SectionWrapper id="blog-grid">
        <Loading />
      </SectionWrapper>
    );
  }

  if (error) {
    return (
      <SectionWrapper id="blog-grid">
        <EmptyState title="Terjadi Kesalahan" message={error} />
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="blog-grid">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Filter kategori */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <CategoryFilter
            categories={categories}
            active={activeFilter}
            onSelect={handleFilter}
          />
        </motion.div>

        {/* Grid artikel atau empty state */}
        <AnimatePresence mode="wait">
          {blogs.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EmptyState
                title="Belum ada artikel"
                message="Belum ada artikel untuk kategori ini."
              />
            </motion.div>
          ) : (
            <motion.div
              key={activeFilter}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {blogs.map((blog) => (
                <motion.div key={blog.id} variants={scaleIn}>
                  <BlogCard blog={blog} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load more — hanya tampil jika ada halaman berikutnya */}
        {hasMore && !loading && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <LoadMoreButton onClick={handleLoadMore} loading={loadingMore} />
          </motion.div>
        )}

      </div>
    </SectionWrapper>
  );
}