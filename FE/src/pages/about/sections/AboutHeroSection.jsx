// ============================================================
// AboutHeroSection.jsx
// Bagian hero untuk halaman About
// Menggunakan Vanta NET sebagai background animasi
// dan Framer Motion untuk animasi teks masuk
// ============================================================

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// --- Import animasi dari shared utils ---
import { fadeInUp, staggerContainer } from "@/utils/animations";

// ============================================================
// CONSTANTS — konten statis hero section
// ============================================================

const HERO_CONTENT = {
  eyebrow: "#LEVELUPHIGHER",                          // Label kecil di atas judul
  title: "Your Vision,",                               // Baris pertama judul
  titleAccent: "Our Creativity.",                      // Baris kedua dengan warna aksen
  tagline: "Let's Grow Together",                      // Sub-tagline di bawah judul
  description:
    "We are a creative studio dedicated to building digital experiences that are bold, purposeful, and built to last. Every project starts with your vision — we bring the craft.",
  badge: "Est. 2024 · Jakarta, Indonesia",             // Info badge bawah kiri
};

// ============================================================
// VANTA CONFIG — konfigurasi efek NET
// ============================================================

const VANTA_CONFIG = {
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200,
  minWidth: 200,
  scale: 1.0,
  scaleMobile: 1.0,
  color: 0x9b30ff,         // Primary purple (#9B30FF)
  backgroundColor: 0x0a0a0a, // Background hitam (#0A0A0A)
  points: 10.0,            // Jumlah titik jaringan
  maxDistance: 22.0,       // Jarak maksimal koneksi antar titik
  spacing: 18.0,           // Jarak antar titik
};

// ============================================================
// HOOK — inisialisasi dan cleanup Vanta NET
// Dipisahkan agar mudah di-debug dan di-reuse
// ============================================================

function useVantaNet(containerRef) {
  const vantaEffect = useRef(null);

  useEffect(() => {
    // Guard: pastikan library tersedia sebelum inisialisasi
    if (!window.VANTA || !window.THREE) {
      console.warn("AboutHeroSection: Vanta atau THREE.js belum dimuat.");
      return;
    }

    // Inisialisasi efek NET pada container
    vantaEffect.current = window.VANTA.NET({
      el: containerRef.current,
      THREE: window.THREE,
      ...VANTA_CONFIG,
    });

    // Cleanup saat component unmount — wajib untuk mencegah memory leak
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, [containerRef]);
}

// ============================================================
// SUB-COMPONENT: EyebrowLabel
// Label kecil beraksent di atas judul utama
// ============================================================

function EyebrowLabel({ text }) {
  return (
    <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-4">
      {/* Garis dekoratif kiri */}
      <span className="block w-8 h-px bg-primary" />
      <span className="text-primary text-sm font-medium tracking-widest uppercase">
        {text}
      </span>
    </motion.div>
  );
}

// ============================================================
// SUB-COMPONENT: HeroTitle
// Judul dua baris — baris kedua pakai warna aksen purple
// ============================================================

function HeroTitle({ title, titleAccent }) {
  return (
    <motion.h1
      variants={fadeInUp}
      className="text-5xl md:text-7xl font-bold leading-tight mb-4"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Baris pertama — warna putih */}
      <span className="text-white block">{title}</span>

      {/* Baris kedua — warna aksen primary */}
      <span className="text-primary block">{titleAccent}</span>
    </motion.h1>
  );
}

// ============================================================
// SUB-COMPONENT: HeroTagline
// Sub-tagline kecil di antara judul dan deskripsi
// ============================================================

function HeroTagline({ text }) {
  return (
    <motion.p
      variants={fadeInUp}
      className="text-lg text-muted tracking-wide mb-6"
    >
      — {text}
    </motion.p>
  );
}

// ============================================================
// SUB-COMPONENT: HeroDescription
// Paragraf deskripsi singkat studio
// ============================================================

function HeroDescription({ text }) {
  return (
    <motion.p
      variants={fadeInUp}
      className="text-base md:text-lg text-muted max-w-xl leading-relaxed"
    >
      {text}
    </motion.p>
  );
}

// ============================================================
// SUB-COMPONENT: HeroBadge
// Badge info kecil di pojok bawah kiri hero
// ============================================================

function HeroBadge({ text }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
    >
      {/* Dot indikator aktif */}
      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
      <span className="text-sm text-muted">{text}</span>
    </motion.div>
  );
}

// ============================================================
// SUB-COMPONENT: ScrollIndicator
// Indikator scroll di tengah bawah hero
// ============================================================

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-xs text-muted tracking-widest uppercase">Scroll</span>
      {/* Animasi bouncing arrow */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="w-px h-8 bg-gradient-to-b from-primary to-transparent"
      />
    </motion.div>
  );
}

// ============================================================
// MAIN COMPONENT — AboutHeroSection
// Parent yang menyatukan semua sub-component di atas
// ============================================================

export default function AboutHeroSection() {
  // Ref untuk container Vanta NET
  const vantaRef = useRef(null);

  // Inisialisasi Vanta melalui custom hook
  useVantaNet(vantaRef);

  return (
    // --- Container utama: full viewport height, posisi relative untuk overlay ---
    <section
      ref={vantaRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-bg"
      aria-label="About Hero Section"
    >
      {/* --- Overlay gelap agar teks tetap terbaca di atas Vanta NET --- */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/40 to-bg/80 z-0" />

      {/* --- Konten hero: z-10 agar tampil di atas overlay --- */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 py-32">

        {/* Stagger container — children muncul berurutan */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          {/* Eyebrow label: #LEVELUPHIGHER */}
          <EyebrowLabel text={HERO_CONTENT.eyebrow} />

          {/* Judul dua baris */}
          <HeroTitle
            title={HERO_CONTENT.title}
            titleAccent={HERO_CONTENT.titleAccent}
          />

          {/* Sub-tagline */}
          <HeroTagline text={HERO_CONTENT.tagline} />

          {/* Deskripsi studio */}
          <HeroDescription text={HERO_CONTENT.description} />

          {/* Badge info */}
          <HeroBadge text={HERO_CONTENT.badge} />
        </motion.div>
      </div>

      {/* --- Scroll indicator di tengah bawah --- */}
      <ScrollIndicator />

      {/* --- Dekorasi: glow effect di sudut kiri atas --- */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(155,48,255,0.15) 0%, transparent 70%)",
        }}
      />
    </section>
  );
}

// ============================================================
// DEPENDENCY CHECKLIST (pastikan sudah tersedia):
// ✅ framer-motion                — npm install framer-motion
// ✅ utils/animations.js          — fadeInUp, staggerContainer
// ✅ Vanta NET + THREE.js         — via CDN di index.html
//    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
//    <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"></script>
// ✅ CSS vars: --color-primary, --color-bg, --color-muted
//    Atau Tailwind custom token: primary, bg, muted di tailwind.config.js
// ============================================================