// ============================================================
// MapsSection.jsx
// Section: Global service presence — SVG world map static
// Posisi: Antara StatsSection dan CTASection (Decision 016)
// Decision 008: Dark Glassmorphism
// Decision 009: Brand colors #9B30FF, BG #0A0A0A
// Decision 007: Space Grotesk + Inter
// ============================================================

import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────
// DATA LAYER
// Koordinat titik lokasi klien di world map (x/y dalam %)
// Berdasarkan posisi relatif SVG viewBox 1000x500
// ─────────────────────────────────────────────

const SERVICE_POINTS = [
  { id: 1, label: "Indonesia",      x: 76.5, y: 62 },
  { id: 2, label: "Singapore",      x: 75.2, y: 58 },
  { id: 3, label: "Malaysia",       x: 74.5, y: 56 },
  { id: 4, label: "Australia",      x: 80,   y: 74 },
  { id: 5, label: "United States",  x: 20,   y: 38 },
  { id: 6, label: "United Kingdom", x: 46,   y: 28 },
  { id: 7, label: "Germany",        x: 48.5, y: 27 },
  { id: 8, label: "UAE",            x: 58,   y: 42 },
  { id: 9, label: "India",          x: 66,   y: 44 },
  { id: 10, label: "Japan",         x: 82,   y: 33 },
];

// ─────────────────────────────────────────────
// CHILD COMPONENT: MapPoint
// Titik animasi di atas SVG world map
// Props: point (object), isVisible (bool)
// ─────────────────────────────────────────────

const MapPoint = ({ point, isVisible }) => {
  return (
    <div
      className="absolute group"
      style={{
        left: `${point.x}%`,
        top: `${point.y}%`,
        transform: "translate(-50%, -50%)",
        // Stagger delay per titik
        transitionDelay: `${point.id * 100}ms`,
      }}
    >
      {/* ── Ping ring animasi ── */}
      <span
        className={`
          absolute inline-flex w-4 h-4 rounded-full
          -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2
          transition-opacity duration-500
          ${isVisible ? "opacity-100" : "opacity-0"}
        `}
        style={{
          background: "rgba(155,48,255,0.3)",
          animation: isVisible ? "ping 2s cubic-bezier(0,0,0.2,1) infinite" : "none",
          animationDelay: `${point.id * 200}ms`,
        }}
        aria-hidden="true"
      />

      {/* ── Dot utama ── */}
      <span
        className={`
          relative block w-2 h-2 rounded-full
          transition-all duration-500
          ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"}
        `}
        style={{ background: "#9B30FF" }}
      />

      {/* ── Tooltip label (hover) ── */}
      <span
        className="
          absolute bottom-full left-1/2 -translate-x-1/2 mb-2
          px-2 py-1 rounded text-xs font-body whitespace-nowrap
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200 pointer-events-none
          border border-white/10
        "
        style={{
          background: "rgba(10,10,10,0.9)",
          color: "#FFFFFF",
          backdropFilter: "blur(8px)",
        }}
      >
        {point.label}
      </span>
    </div>
  );
};

// ─────────────────────────────────────────────
// CHILD COMPONENT: SectionHeader
// ─────────────────────────────────────────────

const SectionHeader = () => (
  <div className="text-center mb-12">
    <span
      className="
        inline-block font-body text-xs font-semibold tracking-widest uppercase
        px-4 py-1.5 rounded-full mb-5 border border-purple-500/30
      "
      style={{ color: "#C678FF", background: "rgba(155,48,255,0.08)" }}
    >
      Global Reach
    </span>

    <h2
      className="font-display font-bold text-white leading-tight"
      style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
    >
      Serving Clients{" "}
      <span
        style={{
          background: "linear-gradient(135deg, #C678FF 0%, #9B30FF 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Worldwide
      </span>
    </h2>

    <p
      className="font-body text-base mt-4 max-w-lg mx-auto leading-relaxed"
      style={{ color: "#A0A0A0" }}
    >
      Remote-first studio. We collaborate with clients across Asia,
      Europe, and beyond — no borders, just results.
    </p>
  </div>
);

// ─────────────────────────────────────────────
// CHILD COMPONENT: WorldMapSVG
// SVG world map — simplified continent shapes
// Lightweight, tidak perlu library peta eksternal
// ─────────────────────────────────────────────

const WorldMapSVG = () => (
  <svg
    viewBox="0 0 1000 500"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    aria-hidden="true"
    preserveAspectRatio="xMidYMid meet"
  >
    {/* ── Grid lines (latitude/longitude subtle) ── */}
    <g stroke="rgba(255,255,255,0.04)" strokeWidth="0.5">
      {/* Horizontal grid */}
      {[100, 150, 200, 250, 300, 350, 400].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="1000" y2={y} />
      ))}
      {/* Vertical grid */}
      {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="500" />
      ))}
    </g>

    {/* ── Continent shapes — simplified polygons ── */}
    <g fill="rgba(155,48,255,0.12)" stroke="rgba(155,48,255,0.25)" strokeWidth="0.8">

      {/* North America */}
      <path d="M80,80 L200,75 L220,120 L210,160 L170,200 L140,220 L100,200 L70,160 L60,120 Z" />

      {/* South America */}
      <path d="M150,230 L210,225 L230,270 L220,330 L190,370 L160,360 L140,310 L130,265 Z" />

      {/* Europe */}
      <path d="M420,60 L510,55 L530,90 L520,130 L490,140 L460,135 L430,110 L415,85 Z" />

      {/* Africa */}
      <path d="M440,140 L530,135 L555,200 L550,300 L510,360 L470,365 L440,310 L425,240 L430,180 Z" />

      {/* Asia */}
      <path d="M530,50 L820,45 L860,100 L870,180 L840,220 L780,240 L700,230 L640,210 L580,200 L540,160 L520,110 Z" />

      {/* Southeast Asia - blob */}
      <path d="M700,240 L780,245 L800,290 L770,310 L730,305 L700,275 Z" />

      {/* Australia */}
      <path d="M740,340 L850,335 L875,380 L860,420 L810,435 L760,425 L730,390 Z" />

      {/* Greenland */}
      <path d="M280,40 L340,35 L355,70 L340,95 L300,100 L275,75 Z" />
    </g>
  </svg>
);

// ─────────────────────────────────────────────
// CHILD COMPONENT: MapContainer
// Wrapper peta + overlay titik lokasi
// ─────────────────────────────────────────────

const MapContainer = ({ isVisible }) => (
  <div
    className="relative w-full rounded-2xl overflow-hidden border border-white/10"
    style={{
      background: "rgba(255,255,255,0.03)",
      backdropFilter: "blur(12px)",
      // Aspect ratio 2:1 agar proporsional
      aspectRatio: "2 / 1",
    }}
  >
    {/* ── SVG Map layer ── */}
    <div className="absolute inset-0">
      <WorldMapSVG />
    </div>

    {/* ── Points overlay layer ── */}
    <div className="absolute inset-0">
      {SERVICE_POINTS.map((point) => (
        <MapPoint key={point.id} point={point} isVisible={isVisible} />
      ))}
    </div>

    {/* ── Vignette edge fade ── */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse at center, transparent 50%, rgba(10,10,10,0.6) 100%)",
      }}
      aria-hidden="true"
    />
  </div>
);

// ─────────────────────────────────────────────
// CHILD COMPONENT: CounterStrip
// Row angka ringkas di bawah peta
// ─────────────────────────────────────────────

const COUNTER_DATA = [
  { value: "10+", label: "Countries Served" },
  { value: "3",   label: "Continents" },
  { value: "100%", label: "Remote Collaboration" },
];

const CounterStrip = ({ isVisible }) => (
  <div className="grid grid-cols-3 gap-4 mt-6">
    {COUNTER_DATA.map((item, i) => (
      <div
        key={item.label}
        className={`
          text-center rounded-xl py-4 border border-white/8
          transition-all duration-700
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
        style={{
          background: "rgba(255,255,255,0.03)",
          transitionDelay: `${600 + i * 100}ms`,
        }}
      >
        <p
          className="font-display font-bold"
          style={{
            fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
            background: "linear-gradient(135deg, #C678FF 0%, #9B30FF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {item.value}
        </p>
        <p className="font-body text-xs mt-1" style={{ color: "#A0A0A0" }}>
          {item.label}
        </p>
      </div>
    ))}
  </div>
);

// ─────────────────────────────────────────────
// PARENT COMPONENT: MapsSection
// ─────────────────────────────────────────────

const MapsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // ── IntersectionObserver untuk trigger animasi ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: "#0A0A0A" }}
      aria-label="Global service reach map"
    >
      {/* ── Background glow decorator ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-5"
        style={{ background: "radial-gradient(circle, #9B30FF 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* ── Ping keyframe style injection ── */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
      `}</style>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <SectionHeader />

        {/* ── Map ── */}
        <MapContainer isVisible={isVisible} />

        {/* ── Counter strip ── */}
        <CounterStrip isVisible={isVisible} />

      </div>
    </section>
  );
};

export default MapsSection;