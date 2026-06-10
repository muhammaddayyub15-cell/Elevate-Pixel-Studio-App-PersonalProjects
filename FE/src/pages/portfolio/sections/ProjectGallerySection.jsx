// =============================================================
// pages/portfolio/sections/ProjectGallerySection.jsx
// Gallery foto project dengan lightbox modal
// Lightbox: pure Framer Motion — tidak butuh library tambahan
// Layout: masonry grid 3 kolom → klik gambar → modal fullscreen
//
// Props:
//   project  (object) — data project dari PortfolioDetailPage
//             ↳ gallery (array of image URLs), title
// =============================================================

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn } from "../../../utils/animations";
import SectionWrapper from "../../../components/common/SectionWrapper";


// =============================================================
// SECTION: ANIMATION VARIANTS — Lightbox
// =============================================================

// Overlay backdrop
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// Gambar di dalam modal
const lightboxImageVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: -10,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};


// =============================================================
// SECTION: SUB-COMPONENT — LightboxModal
// Modal fullscreen saat gambar diklik
// Tutup: klik overlay, klik tombol X, atau tekan Escape
// Navigasi: tombol ← → untuk ganti gambar
// =============================================================

function LightboxModal({ images, activeIndex, onClose, onPrev, onNext }) {
  const currentImage = images[activeIndex];

  // Handler keyboard — Escape tutup, Arrow navigasi
  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") onPrev();
    if (e.key === "ArrowRight") onNext();
  };

  return (
    <motion.div
      key="lightbox-overlay"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: "rgba(10,10,10,0.95)" }}
      onClick={onClose}         // Klik di luar gambar → tutup
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery lightbox"
    >
      {/* --- Tombol tutup (X) --- */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full text-white text-xl z-10 transition-colors"
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
        aria-label="Tutup lightbox"
      >
        ✕
      </button>

      {/* --- Counter: 1 / N --- */}
      <div
        className="absolute top-5 left-5 text-sm z-10"
        style={{ color: "#A0A0A0", fontFamily: "'Inter', sans-serif" }}
      >
        {activeIndex + 1} / {images.length}
      </div>

      {/* --- Tombol navigasi kiri --- */}
      {activeIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 md:left-8 w-11 h-11 flex items-center justify-center rounded-full transition-all z-10"
          style={{
            background: "rgba(155,48,255,0.2)",
            border: "1px solid rgba(155,48,255,0.4)",
            color: "#C678FF",
          }}
          aria-label="Gambar sebelumnya"
        >
          ←
        </button>
      )}

      {/* --- Tombol navigasi kanan --- */}
      {activeIndex < images.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 md:right-8 w-11 h-11 flex items-center justify-center rounded-full transition-all z-10"
          style={{
            background: "rgba(155,48,255,0.2)",
            border: "1px solid rgba(155,48,255,0.4)",
            color: "#C678FF",
          }}
          aria-label="Gambar berikutnya"
        >
          →
        </button>
      )}

      {/* --- Gambar utama — stopPropagation agar klik gambar tidak tutup modal --- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}           // Re-animate saat index berubah
          variants={lightboxImageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative max-w-5xl w-full max-h-[80vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {currentImage ? (
            <img
              src={currentImage}
              alt={`Gallery item ${activeIndex + 1}`}
              className="w-full h-full object-contain rounded-xl"
              style={{ maxHeight: "80vh" }}
            />
          ) : (
            // Placeholder jika gambar null (mock data)
            <div
              className="w-full flex items-center justify-center rounded-xl"
              style={{
                height: "60vh",
                background: "linear-gradient(135deg, rgba(155,48,255,0.15), rgba(107,33,168,0.08))",
                border: "1px solid rgba(155,48,255,0.2)",
              }}
            >
              <div className="text-center">
                <span className="text-5xl opacity-30 block mb-3">🖼️</span>
                <p style={{ color: "#A0A0A0", fontSize: "0.875rem" }}>
                  Gambar tidak tersedia
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}


// =============================================================
// SECTION: SUB-COMPONENT — GalleryThumbnail
// Card thumbnail individual di grid
// Hover: scale + overlay — Klik: buka lightbox
// =============================================================

function GalleryThumbnail({ image, index, onOpen }) {
  return (
    <motion.div
      variants={scaleIn}
      onClick={() => onOpen(index)}
      whileHover={{ scale: 1.03 }}
      className="relative rounded-xl overflow-hidden cursor-pointer group"
      style={{
        aspectRatio: "16/10",         // Konsisten semua thumbnail
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {image ? (
        <img
          src={image}
          alt={`Gallery ${index + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        // Placeholder untuk mock data tanpa gambar
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(155,48,255,0.1), rgba(107,33,168,0.06))",
          }}
        >
          <span className="text-3xl opacity-20">🖼️</span>
        </div>
      )}

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-250"
        style={{ background: "rgba(10,10,10,0.5)" }}
      >
        <span className="text-white text-2xl">⊕</span>
      </div>
    </motion.div>
  );
}


// =============================================================
// SECTION: MAIN COMPONENT — ProjectGallerySection
// State: lightboxOpen (bool) + activeIndex (number)
// Skip render jika gallery kosong
// =============================================================

export default function ProjectGallerySection({ project }) {
  const { gallery, title } = project;

  // --- State lightbox ---
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Filter null/undefined dari gallery — tetap tampil meski partial
  const images = Array.isArray(gallery) ? gallery : [];

  // Tidak render section jika gallery benar-benar kosong
  if (images.length === 0) return null;


  // --- Lightbox handlers ---
  const openLightbox = (index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goToPrev = () =>
    setActiveIndex((prev) => Math.max(0, prev - 1));

  const goToNext = () =>
    setActiveIndex((prev) => Math.min(images.length - 1, prev + 1));


  // =============================================================
  // RENDER
  // =============================================================

  return (
    <>
      <SectionWrapper id="project-gallery">
        <div className="max-w-6xl mx-auto px-6 md:px-12">

          {/* --- Section header --- */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-10"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-px" style={{ background: "#9B30FF" }} />
              <span
                className="text-sm font-medium tracking-widest uppercase"
                style={{ color: "#9B30FF" }}
              >
                Gallery
              </span>
            </div>

            <h2
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Project Screenshots
            </h2>
            <p
              className="mt-2 text-sm"
              style={{ color: "#A0A0A0", fontFamily: "'Inter', sans-serif" }}
            >
              Klik gambar untuk melihat lebih detail
            </p>
          </motion.div>

          {/* --- Grid thumbnail: 2 kolom mobile, 3 kolom desktop --- */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {images.map((image, index) => (
              <GalleryThumbnail
                key={index}
                image={image}
                index={index}
                onOpen={openLightbox}
              />
            ))}
          </motion.div>

        </div>
      </SectionWrapper>

      {/* --- Lightbox Modal: render di luar SectionWrapper (fixed positioning) --- */}
      <AnimatePresence>
        {lightboxOpen && (
          <LightboxModal
            images={images}
            activeIndex={activeIndex}
            onClose={closeLightbox}
            onPrev={goToPrev}
            onNext={goToNext}
          />
        )}
      </AnimatePresence>
    </>
  );
}