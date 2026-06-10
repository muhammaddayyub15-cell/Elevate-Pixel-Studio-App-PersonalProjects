// ============================================================
// ProcessSection.jsx
// Section: How We Work
// Displays 4-step process: Discovery → Design → Development → Launch
// Used in: pages/home/HomePage.jsx
// Data: hardcoded (static content, no API needed — MVP)
// ============================================================


// ============================================================
// IMPORTS
// ============================================================

import { useEffect, useRef } from "react";


// ============================================================
// CONSTANTS — STATIC PROCESS DATA
// Each step has a sequential number, inline SVG icon, title, and description
// ============================================================

const PROCESS_STEPS = [
  {
    id: 1,
    number: "01",
    // Icon: magnifier / discovery
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
    title: "Discovery",
    description:
      "We deeply explore your business needs, target audience, and project goals before any design work begins.",
  },
  {
    id: 2,
    number: "02",
    // Icon: pen tool / design
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: "Design",
    description:
      "UI/UX crafted with precision: wireframes, prototypes, and a visual style that aligns with your brand identity.",
  },
  {
    id: 3,
    number: "03",
    // Icon: code brackets / development
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Development",
    description:
      "Clean, responsive code optimized for performance. Built with modern, scalable technologies that grow with your business.",
  },
  {
    id: 4,
    number: "04",
    // Icon: rocket / launch
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
    title: "Launch",
    description:
      "Production deployment, final QA, and full documentation handover. Ready to go live within 3 business days.",
  },
];


// ============================================================
// SUB-COMPONENT: StepConnector
// Connecting line between steps (only shown between steps, not after the last one)
// Props: visible (bool) — hide connector on the last step
// ============================================================

function StepConnector({ visible }) {
  // Do not render if this is the last step
  if (!visible) return null;

  return (
    // Horizontal connector (desktop only) — hidden on mobile
    <div
      className="hidden lg:flex items-center justify-center flex-1 px-2"
      aria-hidden="true"
    >
      {/* Dashed gradient line from purple to transparent */}
      <div
        className="w-full h-px"
        style={{
          background:
            "linear-gradient(to right, #9B30FF, rgba(155,48,255,0.2))",
          borderTop: "1px dashed rgba(155,48,255,0.5)",
          height: "1px",
        }}
      />
      {/* Arrow head at the right end */}
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="#9B30FF"
        className="flex-shrink-0 -ml-1 opacity-60"
      >
        <path d="M0 0 L10 5 L0 10 Z" />
      </svg>
    </div>
  );
}


// ============================================================
// SUB-COMPONENT: ProcessStep
// Single process step card with scroll-reveal animation
// Props:
//   step    — step data object (id, number, icon, title, description)
//   index   — sequential position used for staggered animation delay
//   isLast  — whether this is the last step (hides the connector)
// ============================================================

function ProcessStep({ step, index, isLast }) {
  // Ref for IntersectionObserver scroll-reveal
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Observer: add visible class when card enters the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            card.classList.add("process-step--visible");
            observer.unobserve(card); // Trigger only once
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(card);

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  return (
    // Step + connector wrapper (flex row on desktop)
    <div className="flex items-start lg:flex-1">

      {/* ── Step Card ── */}
      <div
        ref={cardRef}
        className="process-step flex-1 flex flex-col items-center text-center p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-purple-500/40 hover:bg-white/[0.07] group"
        style={{
          // Staggered animation delay based on index for sequential feel
          transitionDelay: `${index * 120}ms`,
          opacity: 0,
          transform: "translateY(24px)",
        }}
      >
        {/* Step number — displayed above the icon */}
        <span
          className="text-xs font-mono font-bold tracking-widest mb-3"
          style={{ color: "#9B30FF" }}
        >
          {step.number}
        </span>

        {/* Icon container with glow effect on hover */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
          style={{
            background: "rgba(155,48,255,0.12)",
            border: "1px solid rgba(155,48,255,0.25)",
            color: "#C678FF",
          }}
        >
          {step.icon}
        </div>

        {/* Step title */}
        <h3
          className="text-lg font-semibold mb-2"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#FFFFFF" }}
        >
          {step.title}
        </h3>

        {/* Short step description */}
        <p
          className="text-sm leading-relaxed"
          style={{ color: "#A0A0A0" }}
        >
          {step.description}
        </p>
      </div>

      {/* ── Connector (only shown between steps, not after the last one) ── */}
      <StepConnector visible={!isLast} />
    </div>
  );
}


// ============================================================
// SUB-COMPONENT: SectionHeader
// Section header with eyebrow label, main title, and subtitle
// ============================================================

function SectionHeader() {
  return (
    <div className="text-center mb-14">

      {/* Eyebrow label */}
      <span
        className="inline-block text-xs font-mono font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-4"
        style={{
          background: "rgba(155,48,255,0.12)",
          border: "1px solid rgba(155,48,255,0.25)",
          color: "#C678FF",
        }}
      >
        How We Work
      </span>

      {/* Main title */}
      <h2
        className="text-3xl md:text-4xl font-bold mb-4"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          color: "#FFFFFF",
        }}
      >
        A Structured{" "}
        <span style={{ color: "#9B30FF" }}>Process</span>
      </h2>

      {/* Subtitle */}
      <p
        className="text-base max-w-xl mx-auto"
        style={{ color: "#A0A0A0" }}
      >
        From brief to launch in 3 days. Every step is planned,
        transparent, and focused on delivering results.
      </p>
    </div>
  );
}


// ============================================================
// MAIN COMPONENT: ProcessSection
// Menggabungkan SectionHeader + daftar ProcessStep
// Exported sebagai default untuk digunakan di HomePage.jsx
// ============================================================

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: "#0A0A0A" }}
    >
      {/* ── Background glow dekoratif (non-interactive) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Glow kiri bawah */}
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "#9B30FF" }}
        />
        {/* Glow kanan atas */}
        <div
          className="absolute -top-20 right-1/3 w-80 h-80 rounded-full opacity-5 blur-3xl"
          style={{ background: "#C678FF" }}
        />
      </div>

      {/* ── Konten Utama ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <SectionHeader />

        {/* ── Grid Steps ── */}
        {/* Mobile: vertikal stack | Desktop: horizontal flex dengan connector */}
        <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-0">
          {PROCESS_STEPS.map((step, index) => (
            <ProcessStep
              key={step.id}
              step={step}
              index={index}
              isLast={index === PROCESS_STEPS.length - 1}
            />
          ))}
        </div>

        {/* ── Vertical connector untuk mobile (antara card) ── */}
        {/* Hanya terlihat di layar kecil, menggantikan horizontal connector */}
        <style>{`
          /* Animasi scroll-reveal untuk card step */
          .process-step--visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }

          /* Vertical connector di mobile */
          @media (max-width: 1023px) {
            .process-step-mobile-connector {
              display: block;
            }
          }
        `}</style>

      </div>
    </section>
  );
}