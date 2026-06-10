// ============================================================
// StatsSection.jsx
// Section: Komitmen layanan Elevate Pixel Studio
// Posisi: Setelah ProcessSection, sebelum MapsSection
// Decision 011: 4 komitmen — 3 Days Delivery, 100% Custom,
//               24/7 Support, Unlimited Revision
// Decision 008: Dark Glassmorphism theme
// Decision 009: Brand colors — Primary #9B30FF, BG #0A0A0A
// Decision 007: Space Grotesk (heading) + Inter (body)
// ============================================================

import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────
// DATA LAYER
// Static commitment data — no API needed (Decision 006)
// ─────────────────────────────────────────────

const STATS_DATA = [
  {
    id: 1,
    // Value ditampilkan besar dengan gradient text
    value: "3",
    unit: "Days",
    label: "Fast Delivery",
    description: "From kickoff to launch in 3 business days. Speed without sacrificing quality.",
    // Icon: SVG inline ringan, tidak perlu install library
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M14 4L14 14L20 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    id: 2,
    value: "100",
    unit: "%",
    label: "Fully Custom",
    description: "No templates, no shortcuts. Every pixel designed specifically for your brand.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M6 14L11 19L22 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 3,
    value: "24/7",
    unit: "",
    label: "Always On Support",
    description: "We're always reachable via WhatsApp. Your questions never wait until Monday.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M22 16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H10L6 22V8C6 7.46957 6.21071 6.96086 6.58579 6.58579C6.96086 6.21071 7.46957 6 8 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 4,
    value: "∞",
    unit: "",
    label: "Unlimited Revisions",
    description: "We iterate until you're fully satisfied. Your vision drives every revision round.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M20 7H8C6.89543 7 6 7.89543 6 9V19C6 20.1046 6.89543 21 8 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 12H18M10 16H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

// ─────────────────────────────────────────────
// CHILD COMPONENT: StatCard
// Props: stat (object), isVisible (bool)
// isVisible dikontrol dari parent via IntersectionObserver
// ─────────────────────────────────────────────

const StatCard = ({ stat, isVisible }) => {
  return (
    <div
      className={`
        relative group
        rounded-2xl border border-white/10
        p-6 md:p-8
        transition-all duration-700 ease-out
        ${isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
        }
      `}
      style={{
        // Glass card — Decision 008
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        // Delay animasi per card berdasarkan id
        transitionDelay: `${(stat.id - 1) * 120}ms`,
      }}
    >
      {/* ── Subtle glow on hover (purple accent) ── */}
      <div
        className="
          absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
          transition-opacity duration-500 pointer-events-none
        "
        style={{
          background: "radial-gradient(ellipse at top left, rgba(155,48,255,0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ── Icon wrapper ── */}
      <div
        className="
          inline-flex items-center justify-center
          w-12 h-12 rounded-xl mb-5
          text-purple-400
        "
        style={{ background: "rgba(155,48,255,0.12)" }}
      >
        {stat.icon}
      </div>

      {/* ── Value + Unit ── */}
      <div className="flex items-end gap-1 mb-1">
        <span
          className="font-display font-bold leading-none"
          style={{
            // Gradient text — brand accent Decision 009
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            background: "linear-gradient(135deg, #C678FF 0%, #9B30FF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {stat.value}
        </span>

        {/* Unit text (Days / % / dll) */}
        {stat.unit && (
          <span
            className="font-display font-semibold text-purple-300 pb-1 pl-1"
            style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}
          >
            {stat.unit}
          </span>
        )}
      </div>

      {/* ── Label ── */}
      <p className="font-display font-semibold text-white text-lg mb-2">
        {stat.label}
      </p>

      {/* ── Description ── */}
      <p
        className="font-body text-sm leading-relaxed"
        style={{ color: "#A0A0A0" }} // Muted — Decision 009
      >
        {stat.description}
      </p>

      {/* ── Bottom border accent (animates on hover) ── */}
      <div
        className="
          absolute bottom-0 left-6 right-6 h-px
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
        "
        style={{
          background: "linear-gradient(90deg, transparent, #9B30FF, transparent)",
        }}
        aria-hidden="true"
      />
    </div>
  );
};

// ─────────────────────────────────────────────
// CHILD COMPONENT: SectionHeader
// Label + Heading untuk stats section
// ─────────────────────────────────────────────

const SectionHeader = () => {
  return (
    <div className="text-center mb-14">
      {/* ── Eyebrow label ── */}
      <span
        className="
          inline-block font-body text-xs font-semibold tracking-widest uppercase
          px-4 py-1.5 rounded-full mb-5
          border border-purple-500/30
        "
        style={{ color: "#C678FF", background: "rgba(155,48,255,0.08)" }}
      >
        Our Commitment
      </span>

      {/* ── Heading ── */}
      <h2
        className="font-display font-bold text-white leading-tight"
        style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
      >
        Why Clients{" "}
        <span
          style={{
            background: "linear-gradient(135deg, #C678FF 0%, #9B30FF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Choose Us
        </span>
      </h2>

      {/* ── Subheading ── */}
      <p
        className="font-body text-base mt-4 max-w-xl mx-auto leading-relaxed"
        style={{ color: "#A0A0A0" }}
      >
        No fluff, no guesswork. These are the real commitments we make
        to every client — and the ones we keep.
      </p>
    </div>
  );
};

// ─────────────────────────────────────────────
// PARENT COMPONENT: StatsSection
// Orchestrates IntersectionObserver + layout
// ─────────────────────────────────────────────

const StatsSection = () => {
  // ── State: apakah section sudah masuk viewport ──
  const [isVisible, setIsVisible] = useState(false);

  // ── Ref untuk target elemen yang di-observe ──
  const sectionRef = useRef(null);

  // ── IntersectionObserver: trigger animasi saat scroll ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Setelah trigger, unobserve agar tidak re-run
          observer.unobserve(entry.target);
        }
      },
      {
        // Threshold 20% — animasi mulai saat 20% section terlihat
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup saat component unmount
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: "#0A0A0A" }} // BG — Decision 009
      aria-label="Our Commitment Stats"
    >
      {/* ────────────────────────────────────────
          BACKGROUND DECORATORS
          Subtle radial glow — tidak mengganggu readability
          ──────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Glow kiri atas */}
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #9B30FF 0%, transparent 70%)",
          }}
        />
        {/* Glow kanan bawah */}
        <div
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #6B21A8 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ────────────────────────────────────────
          MAIN CONTENT WRAPPER
          max-w-6xl — konsisten dengan section lain
          ──────────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <SectionHeader />

        {/* ── Stats Grid ──
            Mobile:  2 kolom (xs breakpoint)
            Tablet:  2 kolom
            Desktop: 4 kolom
        ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS_DATA.map((stat) => (
            <StatCard
              key={stat.id}
              stat={stat}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* ── Bottom tagline ──
            Subtle trust statement di bawah grid
        ── */}
        <p
          className={`
            text-center font-body text-sm mt-10
            transition-all duration-700 delay-700
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
          style={{ color: "#A0A0A0" }}
        >
          Commitments made to every client, every project — no exceptions.
        </p>
      </div>
    </section>
  );
};

export default StatsSection;