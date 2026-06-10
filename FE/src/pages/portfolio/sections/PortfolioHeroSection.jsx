// =============================================================
// pages/portfolio/sections/PortfolioHeroSection.jsx
// Hero banner halaman Portfolio
// Background: Vanta NET — konsisten dengan halaman lain
// Lebih compact dari About/Services hero (tidak full viewport)
// =============================================================

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../../../utils/animations";

// =============================================================
// CONSTANTS
// =============================================================

const HERO_CONTENT = {
  eyebrow: "Our Work",
  title: "Projects That",
  titleAccent: "Speak Louder.",
  description:
    "Every project here is a story — a problem we solved, a brand we built, or a product we launched. Browse the work and see what's possible.",
};

// =============================================================
// VANTA CONFIG — sedikit lebih ringan untuk page interior
// =============================================================

const VANTA_CONFIG = {
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200,
  minWidth: 200,
  scale: 1.0,
  scaleMobile: 1.0,
  color: 0x9b30ff,
  backgroundColor: 0x0a0a0a,
  points: 8.0,           // Lebih sedikit titik — hero lebih compact
  maxDistance: 18.0,
  spacing: 22.0,
};

// =============================================================
// HOOK — Vanta NET init + cleanup
// =============================================================

function useVantaNet(containerRef) {
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (!window.VANTA || !window.THREE) {
      console.warn("PortfolioHeroSection: Vanta atau THREE.js belum dimuat.");
      return;
    }

    vantaEffect.current = window.VANTA.NET({
      el: containerRef.current,
      THREE: window.THREE,
      ...VANTA_CONFIG,
    });

    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, [containerRef]);
}

// =============================================================
// MAIN COMPONENT
// Height: 60vh — lebih compact, langsung turun ke grid
// =============================================================

export default function PortfolioHeroSection() {
  const vantaRef = useRef(null);
  useVantaNet(vantaRef);

  return (
    <section
      ref={vantaRef}
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: "60vh", backgroundColor: "#0A0A0A" }}
      aria-label="Portfolio Hero Section"
    >
      {/* --- Overlay --- */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.9) 100%)",
        }}
      />

      {/* --- Glow kiri --- */}
      <div
        className="absolute bottom-0 left-0 w-72 h-72 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(155,48,255,0.1) 0%, transparent 70%)",
        }}
      />

      {/* --- Konten: center alignment --- */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 py-24 md:py-32 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-2xl mx-auto"
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <span className="w-6 h-px" style={{ background: "#9B30FF" }} />
            <span
              className="text-sm font-medium tracking-widest uppercase"
              style={{ color: "#9B30FF" }}
            >
              {HERO_CONTENT.eyebrow}
            </span>
            <span className="w-6 h-px" style={{ background: "#9B30FF" }} />
          </motion.div>

          {/* Judul */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-6xl font-bold leading-tight mb-5"
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
            className="text-base md:text-lg leading-relaxed"
            style={{ color: "#A0A0A0", fontFamily: "'Inter', sans-serif" }}
          >
            {HERO_CONTENT.description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}