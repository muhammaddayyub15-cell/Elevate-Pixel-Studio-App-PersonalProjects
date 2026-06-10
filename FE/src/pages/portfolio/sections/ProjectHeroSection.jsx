// =============================================================
// pages/portfolio/sections/ProjectHeroSection.jsx
// Hero section halaman detail project
// Background: thumbnail project sebagai parallax image
// Tidak pakai Vanta — lebih fokus ke visual project itu sendiri
//
// Props:
//   project  (object) — data project dari PortfolioDetailPage
//             ↳ title, client_name, category, year, thumbnail
// =============================================================

import { useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fadeInUp, staggerContainerSlow, heroText } from "../../../utils/animations";


// =============================================================
// SECTION: SUB-COMPONENT — BackButton
// Tombol kembali ke halaman portfolio listing
// =============================================================

function BackButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      variants={fadeInUp}
      onClick={() => navigate("/portfolio")}
      className="inline-flex items-center gap-2 mb-8 text-sm font-medium transition-colors duration-200"
      style={{ color: "#A0A0A0", fontFamily: "'Inter', sans-serif" }}
      whileHover={{ x: -4, color: "#C678FF" }}
    >
      {/* Arrow kiri */}
      <span style={{ color: "#9B30FF" }}>←</span>
      Kembali ke Portfolio
    </motion.button>
  );
}


// =============================================================
// SECTION: SUB-COMPONENT — ProjectMeta
// Badge kategori + tahun project di bawah judul
// =============================================================

function ProjectMeta({ category, year, client_name }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-wrap items-center gap-3 mt-5"
    >
      {/* Kategori badge */}
      {category && (
        <span
          className="px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full"
          style={{
            background: "rgba(155,48,255,0.15)",
            border: "1px solid rgba(155,48,255,0.4)",
            color: "#C678FF",
          }}
        >
          {category}
        </span>
      )}

      {/* Divider dot */}
      {year && (
        <>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>
          <span
            className="text-sm"
            style={{ color: "#A0A0A0", fontFamily: "'Inter', sans-serif" }}
          >
            {year}
          </span>
        </>
      )}

      {/* Client name */}
      {client_name && (
        <>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>
          <span
            className="text-sm"
            style={{ color: "#A0A0A0", fontFamily: "'Inter', sans-serif" }}
          >
            {client_name}
          </span>
        </>
      )}
    </motion.div>
  );
}


// =============================================================
// SECTION: MAIN COMPONENT — ProjectHeroSection
// Layout: full-width dengan thumbnail sebagai bg + gradient overlay
// Height: 70vh minimum — cukup dramatis untuk opening project
// =============================================================

export default function ProjectHeroSection({ project }) {
  const { title, client_name, category, year, thumbnail } = project;

  return (
    <section
      className="relative flex items-end overflow-hidden"
      style={{ minHeight: "70vh", backgroundColor: "#0A0A0A" }}
      aria-label={`Hero section project ${title}`}
    >
      {/* --- Background: thumbnail project --- */}
      {thumbnail ? (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ) : (
        // Fallback jika tidak ada thumbnail — gradient purple
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(155,48,255,0.2) 0%, rgba(10,10,10,1) 70%)",
          }}
        />
      )}

      {/* --- Overlay gradient: bawah lebih gelap untuk readability teks --- */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.6) 50%, rgba(10,10,10,0.3) 100%)",
        }}
      />

      {/* --- Glow accent kiri bawah --- */}
      <div
        className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(155,48,255,0.12) 0%, transparent 70%)",
        }}
      />

      {/* --- Konten: align bottom-left untuk feel editorial --- */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 pb-16 md:pb-24 pt-32">
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Tombol kembali */}
          <BackButton />

          {/* Judul project — large headline */}
          <motion.h1
            variants={heroText}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {title}
          </motion.h1>

          {/* Meta: kategori + tahun + client */}
          <ProjectMeta
            category={category}
            year={year}
            client_name={client_name}
          />
        </motion.div>
      </div>
    </section>
  );
}