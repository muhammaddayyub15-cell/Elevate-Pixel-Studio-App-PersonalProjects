// =============================================================
// pages/blog/sections/ArticleHeroSection.jsx
// Hero section halaman detail artikel
// Layout: thumbnail fullwidth + overlay + judul + meta
// Tidak pakai Vanta — visual artikel lebih dominan dari thumbnail
//
// Props:
//   article  (object) — data artikel dari BlogDetailPage
//             ↳ title, category, excerpt, image,
//               author, published_at, read_time
// =============================================================

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainerSlow, heroText } from "../../../utils/animations";


// =============================================================
// SECTION: HELPER — format tanggal Indonesia
// =============================================================

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  });
};


// =============================================================
// SECTION: SUB-COMPONENT — BackButton
// =============================================================

function BackButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      variants={fadeInUp}
      onClick={() => navigate("/blog")}
      className="inline-flex items-center gap-2 mb-8 text-sm font-medium transition-colors duration-200"
      style={{ color: "#A0A0A0", fontFamily: "'Inter', sans-serif" }}
      whileHover={{ x: -4 }}
    >
      <span style={{ color: "#9B30FF" }}>←</span>
      Kembali ke Blog
    </motion.button>
  );
}


// =============================================================
// SECTION: SUB-COMPONENT — ArticleMeta
// Info penulis + tanggal + estimasi baca
// =============================================================

function ArticleMeta({ author, published_at, read_time }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-wrap items-center gap-3 mt-5"
      style={{ color: "#A0A0A0", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem" }}
    >
      {author && <span style={{ color: "#FFFFFF" }}>{author}</span>}

      {author && published_at && (
        <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>
      )}

      {published_at && <span>{formatDate(published_at)}</span>}

      {read_time && (
        <>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>
          <span>{read_time} menit baca</span>
        </>
      )}
    </motion.div>
  );
}


// =============================================================
// SECTION: MAIN COMPONENT — ArticleHeroSection
// Height: 65vh — cukup dramatis tanpa mendominasi konten artikel
// =============================================================

export default function ArticleHeroSection({ article }) {
  const { title, category, excerpt, image, author, published_at, read_time } = article;

  return (
    <section
      className="relative flex items-end overflow-hidden"
      style={{ minHeight: "65vh", backgroundColor: "#0A0A0A" }}
      aria-label={`Hero artikel: ${title}`}
    >
      {/* Background: thumbnail artikel */}
      {image ? (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ) : (
        // Fallback gradient jika tidak ada thumbnail
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(155,48,255,0.15) 0%, rgba(10,10,10,1) 70%)",
          }}
        />
      )}

      {/* Overlay: bawah gelap untuk readability teks */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.65) 50%, rgba(10,10,10,0.2) 100%)",
        }}
      />

      {/* Glow purple kiri bawah */}
      <div
        className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(155,48,255,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Konten: align bottom-left, feel editorial */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 pb-16 md:pb-24 pt-32">
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Tombol kembali */}
          <BackButton />

          {/* Badge kategori */}
          {category && (
            <motion.span
              variants={fadeInUp}
              className="inline-block mb-4 px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full"
              style={{
                background: "rgba(155,48,255,0.15)",
                border: "1px solid rgba(155,48,255,0.4)",
                color: "#C678FF",
              }}
            >
              {category}
            </motion.span>
          )}

          {/* Judul artikel */}
          <motion.h1
            variants={heroText}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {title}
          </motion.h1>

          {/* Excerpt */}
          {excerpt && (
            <motion.p
              variants={fadeInUp}
              className="mt-4 text-base md:text-lg leading-relaxed max-w-2xl"
              style={{ color: "#A0A0A0", fontFamily: "'Inter', sans-serif" }}
            >
              {excerpt}
            </motion.p>
          )}

          {/* Meta: author + tanggal + read time */}
          <ArticleMeta
            author={author}
            published_at={published_at}
            read_time={read_time}
          />
        </motion.div>
      </div>
    </section>
  );
}