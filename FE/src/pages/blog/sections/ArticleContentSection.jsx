// =============================================================
// pages/blog/sections/ArticleContentSection.jsx
// Konten utama artikel blog
// Layout: 2 kolom — konten (kiri lebar) + sidebar (kanan sempit)
// Render: HTML string dari BE (field: content / body)
//
// Props:
//   article  (object) — data artikel dari BlogDetailPage
//             ↳ content (HTML string), technologies (optional tags)
// =============================================================

import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "../../../utils/animations";
import SectionWrapper from "../../../components/common/SectionWrapper";


// =============================================================
// SECTION: SUB-COMPONENT — ArticleBody
// Render HTML dari BE menggunakan dangerouslySetInnerHTML
// Style: prose custom via Tailwind + inline CSS
// =============================================================

function ArticleBody({ content }) {
  if (!content) {
    return (
      <p style={{ color: "#A0A0A0", fontFamily: "'Inter', sans-serif" }}>
        Konten artikel tidak tersedia.
      </p>
    );
  }

  return (
    <motion.div
      variants={fadeInLeft}
      // Prose styling — karena tidak pakai @tailwindcss/typography plugin
      className="article-content"
      style={{
        color: "#D0D0D0",
        fontFamily: "'Inter', sans-serif",
        fontSize: "1rem",
        lineHeight: "1.85",
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}


// =============================================================
// SECTION: SUB-COMPONENT — TagList
// Daftar tag/teknologi di sidebar
// =============================================================

function TagList({ tags }) {
  if (!tags?.length) return null;

  return (
    <div>
      <h3
        className="text-xs font-semibold tracking-wider uppercase mb-3"
        style={{ color: "#9B30FF" }}
      >
        Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-xs font-medium rounded-lg"
            style={{
              background: "rgba(155,48,255,0.08)",
              border: "1px solid rgba(155,48,255,0.2)",
              color: "#C678FF",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}


// =============================================================
// SECTION: SUB-COMPONENT — ShareButtons
// Tombol share ke sosmed — URL otomatis dari window.location
// =============================================================

function ShareButtons() {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const encodedUrl = encodeURIComponent(shareUrl);

  const shares = [
    {
      label: "Twitter / X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}`,
      icon: "𝕏",
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedUrl}`,
      icon: "💬",
    },
    {
      label: "Copy Link",
      href: null, // Handled via clipboard API
      icon: "🔗",
    },
  ];

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareUrl).then(() => {
      // Feedback sederhana — bisa diganti toast notification
      alert("Link berhasil disalin!");
    });
  };

  return (
    <div>
      <h3
        className="text-xs font-semibold tracking-wider uppercase mb-3"
        style={{ color: "#9B30FF" }}
      >
        Bagikan
      </h3>
      <div className="flex flex-col gap-2">
        {shares.map((item) =>
          item.href ? (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#A0A0A0",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </a>
          ) : (
            <button
              key={item.label}
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors duration-200 text-left"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#A0A0A0",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          )
        )}
      </div>
    </div>
  );
}


// =============================================================
// SECTION: SUB-COMPONENT — ArticleSidebar
// Sidebar kanan: tags + share buttons
// =============================================================

function ArticleSidebar({ tags }) {
  return (
    <motion.aside
      variants={fadeInRight}
      className="space-y-8"
    >
      {/* Glass card sidebar */}
      <div
        className="rounded-2xl p-6 space-y-6 sticky top-24" // sticky saat scroll
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        <TagList tags={tags} />
        <ShareButtons />
      </div>
    </motion.aside>
  );
}


// =============================================================
// SECTION: MAIN COMPONENT — ArticleContentSection
// Layout 2 kolom: konten (2/3) + sidebar (1/3)
// =============================================================

export default function ArticleContentSection({ article }) {
  const { content, tags } = article;

  return (
    <>
      {/*
        Prose styles global — inject sekali di sini
        Karena tidak pakai @tailwindcss/typography,
        style heading/blockquote/code di-inject via <style> tag
      */}
      <style>{`
        .article-content h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #FFFFFF;
          font-family: 'Space Grotesk', sans-serif;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .article-content h3 {
          font-size: 1.35rem;
          font-weight: 600;
          color: #FFFFFF;
          font-family: 'Space Grotesk', sans-serif;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .article-content p {
          margin-bottom: 1.25rem;
        }
        .article-content a {
          color: #C678FF;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .article-content ul, .article-content ol {
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .article-content li {
          margin-bottom: 0.5rem;
        }
        .article-content blockquote {
          border-left: 3px solid #9B30FF;
          padding-left: 1.25rem;
          margin: 1.5rem 0;
          color: #A0A0A0;
          font-style: italic;
        }
        .article-content code {
          background: rgba(155,48,255,0.12);
          border: 1px solid rgba(155,48,255,0.2);
          color: #C678FF;
          padding: 0.15rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
        }
        .article-content pre {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.75rem;
          padding: 1.25rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .article-content pre code {
          background: none;
          border: none;
          padding: 0;
          color: #D0D0D0;
        }
        .article-content img {
          width: 100%;
          border-radius: 0.75rem;
          margin: 1.5rem 0;
        }
      `}</style>

      <SectionWrapper id="article-content">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16"
          >
            {/* Konten artikel (2/3 lebar) */}
            <div className="lg:col-span-2">
              <ArticleBody content={content} />
            </div>

            {/* Sidebar: tags + share (1/3 lebar) */}
            <div className="lg:col-span-1">
              <ArticleSidebar tags={tags} />
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </>
  );
}