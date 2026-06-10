// =============================================================
// pages/blog/sections/BlogHeroSection.jsx
// Hero banner halaman Blog listing
// Background: Vanta NET — konsisten dengan halaman lain
// Height: 60vh — compact, langsung turun ke grid artikel
// =============================================================

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../../../utils/animations";


// =============================================================
// SECTION: CONSTANTS
// =============================================================

const HERO_CONTENT = {
  eyebrow: "Our Blog",
  title: "Ideas, Stories &",
  titleAccent: "Insights.",
  description:
    "Kami menulis tentang desain, teknologi, dan pengalaman membangun produk digital. Bacaan singkat, insight nyata.",
};

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
  points: 7.0,       // Lebih ringan dari hero utama
  maxDistance: 18.0,
  spacing: 22.0,
};


// =============================================================
// SECTION: HOOK — Vanta NET init + cleanup
// Dipisah ke custom hook agar component tetap bersih
// =============================================================

function useVantaNet(containerRef) {
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (!window.VANTA || !window.THREE) {
      console.warn("BlogHeroSection: Vanta atau THREE.js belum dimuat.");
      return;
    }

    vantaEffect.current = window.VANTA.NET({
      el: containerRef.current,
      THREE: window.THREE,
      ...VANTA_CONFIG,
    });

    // Cleanup saat unmount — cegah memory leak
    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, [containerRef]);
}


// =============================================================
// SECTION: MAIN COMPONENT — BlogHeroSection
// =============================================================

export default function BlogHeroSection() {
  const vantaRef = useRef(null);
  useVantaNet(vantaRef);

  return (
    <section
      ref={vantaRef}
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: "60vh", backgroundColor: "#0A0A0A" }}
      aria-label="Blog Hero Section"
    >
      {/* Overlay gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.9) 100%)",
        }}
      />

      {/* Glow accent kanan */}
      <div
        className="absolute bottom-0 right-0 w-72 h-72 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(155,48,255,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Konten: center */}
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