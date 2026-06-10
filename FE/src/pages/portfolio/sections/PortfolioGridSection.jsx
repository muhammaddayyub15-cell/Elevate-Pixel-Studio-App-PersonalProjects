// =============================================================
// pages/portfolio/sections/PortfolioGridSection.jsx
// Masonry grid — data dari portfolioApi.js (real API)
// Fitur: filter kategori, loading state, empty state
// Navigasi: klik card → /portfolio/:slug
// =============================================================

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn } from "../../../utils/animations";
import SectionWrapper from "../../../components/common/SectionWrapper";
import Loading from "../../../components/common/Loading";
import EmptyState from "../../../components/common/EmptyState";

// --- API layer (Decision 004: Controller → Service → Model) ---
import { getPortfolios } from "../../../api/portfolioApi";

// =============================================================
// CONSTANTS — filter kategori (sesuaikan dengan data BE)
// =============================================================

const FILTER_CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Web Design", value: "web-design" },
  { label: "Branding", value: "branding" },
  { label: "Landing Page", value: "landing-page" },
  { label: "UI Kit", value: "ui-kit" },
];

// =============================================================
// SUB-COMPONENT: FilterBar
// Tombol filter kategori — horizontal scroll di mobile
// =============================================================

function FilterBar({ active, onSelect }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-10"
    >
      {FILTER_CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onSelect(cat.value)}
          className="flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
          style={{
            // Aktif: solid purple — Inactive: glass border
            background:
              active === cat.value
                ? "linear-gradient(135deg, #9B30FF, #6B21A8)"
                : "rgba(255,255,255,0.05)",
            border:
              active === cat.value
                ? "1px solid transparent"
                : "1px solid rgba(255,255,255,0.1)",
            color: active === cat.value ? "#FFFFFF" : "#A0A0A0",
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
// SUB-COMPONENT: PortfolioCard
// Card individual — 3 ukuran tinggi acak untuk efek masonry
// Klik → navigate ke /portfolio/:slug
// =============================================================

// Array tinggi untuk variasi masonry — diassign berdasarkan index % 3
const CARD_HEIGHTS = ["280px", "360px", "320px"];

function PortfolioCard({ project, index }) {
  const navigate = useNavigate();
  const cardHeight = CARD_HEIGHTS[index % 3]; // Rotasi tinggi: 280 → 360 → 320 → repeat

  const handleClick = () => {
    navigate(`/portfolio/${project.slug}`);
  };

  return (
    <motion.div
      variants={scaleIn}
      onClick={handleClick}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        height: cardHeight,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* --- Thumbnail image --- */}
      {project.thumbnail ? (
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        // Placeholder jika tidak ada thumbnail
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(155,48,255,0.15), rgba(107,33,168,0.08))",
          }}
        >
          <span className="text-4xl opacity-30">🎨</span>
        </div>
      )}

      {/* --- Overlay hover: muncul saat hover --- */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.6) 50%, transparent 100%)",
        }}
      >
        {/* Kategori badge */}
        {project.category && (
          <span
            className="text-xs font-medium tracking-wider uppercase mb-2 px-2 py-1 rounded-full self-start"
            style={{
              color: "#9B30FF",
              background: "rgba(155,48,255,0.15)",
              border: "1px solid rgba(155,48,255,0.3)",
            }}
          >
            {project.category}
          </span>
        )}

        {/* Judul project */}
        <h3
          className="text-white font-bold text-lg leading-tight mb-1"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {project.title}
        </h3>

        {/* Deskripsi singkat */}
        {project.short_description && (
          <p className="text-sm line-clamp-2" style={{ color: "#A0A0A0" }}>
            {project.short_description}
          </p>
        )}

        {/* CTA teks */}
        <div className="flex items-center gap-1 mt-3">
          <span className="text-xs font-semibold" style={{ color: "#C678FF" }}>
            View Project
          </span>
          <span style={{ color: "#C678FF" }}>→</span>
        </div>
      </div>
    </motion.div>
  );
}

// =============================================================
// MAIN COMPONENT — PortfolioGridSection
// State: portfolios (data API), activeFilter, loading, error
// =============================================================

export default function PortfolioGridSection() {
  // --- State ---
  const [portfolios, setPortfolios] = useState([]);    // Data dari API
  const [filtered, setFiltered] = useState([]);         // Data setelah filter
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Fetch data saat mount ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getPortfolios();
        // Asumsi response: { data: [...] } sesuai API documentation
        const data = res.data?.data || res.data || [];
        setPortfolios(data);
        setFiltered(data);
      } catch (err) {
        console.error("PortfolioGridSection: Gagal fetch portfolio:", err);
        setError("Gagal memuat portfolio. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Filter handler: update filtered list saat category berubah ---
  const handleFilter = (category) => {
    setActiveFilter(category);

    if (category === "all") {
      setFiltered(portfolios);
      return;
    }

    // Filter berdasarkan field category dari API
    const result = portfolios.filter(
      (p) => p.category?.toLowerCase().replace(/\s+/g, "-") === category
    );
    setFiltered(result);
  };

  // =============================================================
  // RENDER STATES
  // =============================================================

  if (loading) {
    return (
      <SectionWrapper id="portfolio-grid">
        <Loading message="Memuat portfolio..." />
      </SectionWrapper>
    );
  }

  if (error) {
    return (
      <SectionWrapper id="portfolio-grid">
        <EmptyState
          icon="⚠️"
          title="Terjadi Kesalahan"
          description={error}
        />
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="portfolio-grid">
      <div className="max-w-6xl mx-auto px-6">

        {/* --- Filter bar --- */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <FilterBar active={activeFilter} onSelect={handleFilter} />
        </motion.div>

        {/* --- Grid atau Empty State --- */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            // Empty state saat filter tidak ada hasil
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EmptyState
                icon="🎨"
                title="Belum ada project"
                description="Belum ada portfolio untuk kategori ini."
              />
            </motion.div>
          ) : (
            // Masonry grid — CSS columns untuk variasi tinggi alami
            <motion.div
              key={activeFilter}                        // Re-animate saat filter berubah
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5"
            >
              {filtered.map((project, index) => (
                <div key={project.id} className="break-inside-avoid">
                  <PortfolioCard project={project} index={index} />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </SectionWrapper>
  );
}

// =============================================================
// API RESPONSE SHAPE YANG DIHARAPKAN (dari portfolioApi.js):
// {
//   data: {
//     data: [
//       {
//         id: 1,
//         title: "Project Name",
//         slug: "project-name",
//         category: "Web Design",
//         thumbnail: "https://...",
//         short_description: "...",
//       }
//     ]
//   }
// }
// =============================================================