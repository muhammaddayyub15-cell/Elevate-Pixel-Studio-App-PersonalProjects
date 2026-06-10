// =============================================================
// pages/services/sections/ServicesHeroSection.jsx
// Hero banner untuk halaman Services
// Background: Vanta NET (sama dengan AboutHeroSection)
// Animasi: Framer Motion stagger
// =============================================================

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../../../utils/animations";

// =============================================================
// CONSTANTS — semua konten statis di satu tempat
// =============================================================

const HERO_CONTENT = {
  eyebrow: "What We Offer",                           // Label kecil atas
  title: "Services Built",                             // Baris 1 judul
  titleAccent: "For Growth.",                          // Baris 2 — warna aksen
  description:
    "From brand identity to full-scale web development — every service we offer is crafted to move your business forward. No templates, no shortcuts.",
  stats: [
    { value: "5+", label: "Core Services" },
    { value: "3 Days", label: "Avg. Delivery" },
    { value: "100%", label: "Custom Made" },
  ],
};

// =============================================================
// VANTA CONFIG — NET effect (konsisten dengan AboutHeroSection)
// =============================================================

const VANTA_CONFIG = {
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200,
  minWidth: 200,
  scale: 1.0,
  scaleMobile: 1.0,
  color: 0x9b30ff,            // Primary purple
  backgroundColor: 0x0a0a0a,  // Background hitam
  points: 9.0,                // Sedikit lebih ringan dari About
  maxDistance: 20.0,
  spacing: 20.0,
};

// =============================================================
// HOOK — inisialisasi Vanta NET, cleanup saat unmount
// =============================================================

function useVantaNet(containerRef) {
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (!window.VANTA || !window.THREE) {
      console.warn("ServicesHeroSection: Vanta atau THREE.js belum dimuat.");
      return;
    }

    vantaEffect.current = window.VANTA.NET({
      el: containerRef.current,
      THREE: window.THREE,
      ...VANTA_CONFIG,
    });

    // Cleanup wajib — mencegah memory leak saat navigasi antar page
    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, [containerRef]);
}

// =============================================================
// SUB-COMPONENT: StatsBadge
// Tiga angka highlight (Services / Delivery / Custom)
// Ditampilkan dalam satu baris horizontal
// =============================================================

function StatsBadge({ stats }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-wrap gap-6 mt-10"
    >
      {stats.map((stat, i) => (
        <div key={i} className="flex flex-col">
          {/* Nilai angka — warna primary */}
          <span
            className="text-2xl font-bold"
            style={{ color: "#9B30FF", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {stat.value}
          </span>
          {/* Label di bawah angka */}
          <span className="text-xs" style={{ color: "#A0A0A0" }}>
            {stat.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

// =============================================================
// SUB-COMPONENT: ScrollHint
// Teks dan garis animasi scroll di tengah bawah
// =============================================================

function ScrollHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-xs tracking-widest uppercase" style={{ color: "#A0A0A0" }}>
        Explore
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="w-px h-8"
        style={{ background: "linear-gradient(to bottom, #9B30FF, transparent)" }}
      />
    </motion.div>
  );
}

// =============================================================
// MAIN COMPONENT — ServicesHeroSection
// Layout: 60% teks kiri + 40% dekorasi kanan (desktop)
// Mobile: full width, stack vertikal
// =============================================================

export default function ServicesHeroSection() {
  const vantaRef = useRef(null);
  useVantaNet(vantaRef);

  return (
    <section
      ref={vantaRef}
      className="relative min-h-[85vh] flex items-center overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }}
      aria-label="Services Hero Section"
    >
      {/* --- Overlay gradient atas ke bawah --- */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.35) 50%, rgba(10,10,10,0.85) 100%)",
        }}
      />

      {/* --- Glow dekoratif kanan atas --- */}
      <div
        className="absolute top-0 right-0 w-80 h-80 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(155,48,255,0.12) 0%, transparent 70%)",
        }}
      />

      {/* --- Konten utama --- */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 py-28 md:py-36">
        <div className="max-w-2xl">

          {/* Stagger wrapper — semua child muncul berurutan */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px" style={{ background: "#9B30FF" }} />
              <span
                className="text-sm font-medium tracking-widest uppercase"
                style={{ color: "#9B30FF" }}
              >
                {HERO_CONTENT.eyebrow}
              </span>
            </motion.div>

            {/* Judul dua baris */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-5"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="text-white block">{HERO_CONTENT.title}</span>
              <span style={{ color: "#9B30FF" }} className="block">
                {HERO_CONTENT.titleAccent}
              </span>
            </motion.h1>

            {/* Deskripsi */}
            <motion.p
              variants={fadeInUp}
              className="text-base md:text-lg leading-relaxed max-w-xl"
              style={{ color: "#A0A0A0", fontFamily: "'Inter', sans-serif" }}
            >
              {HERO_CONTENT.description}
            </motion.p>

            {/* Stats badges */}
            <StatsBadge stats={HERO_CONTENT.stats} />
          </motion.div>

        </div>
      </div>

      {/* --- Scroll hint bawah tengah --- */}
      <ScrollHint />
    </section>
  );
}

// =============================================================
// DEPENDENCY CHECKLIST:
// ✅ framer-motion
// ✅ utils/animations.js — fadeInUp, staggerContainer
// ✅ Vanta NET + THREE.js via CDN di index.html
// =============================================================