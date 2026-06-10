// =============================================================
// components/common/VantaBanner.jsx
// Reusable page banner dengan Vanta.js NET effect
// Dipakai di semua inner page sebagai hero header
//
// Props:
//   title       (string)  — headline utama
//   subtitle    (string)  — optional subtext
//   badge       (string)  — optional label kecil di atas title
// =============================================================

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { heroText, staggerContainerSlow, fadeInUp } from "../../utils/animations";


// --- VANTA CONFIG ---
const VANTA_CONFIG = {
  color: 0x9B30FF,        // Brand primary #9B30FF
  backgroundColor: 0x0A0A0A,
  points: 8.0,
  maxDistance: 20.0,
  spacing: 18.0,
  showDots: true,
};


// =============================================================
// COMPONENT
// =============================================================

const VantaBanner = ({ title, subtitle, badge }) => {
  // --- REFS & STATE ---
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const [vantaLoaded, setVantaLoaded] = useState(false);


  // --- VANTA INIT ---
  // Load THREE + VANTA via CDN script tags secara dynamic
  // Hindari bundle size — load hanya saat komponen mount
  useEffect(() => {
    const loadVanta = async () => {
      // Cek apakah THREE sudah ada (bisa di-load dari CDN di index.html)
      if (!window.THREE) {
        const threeScript = document.createElement("script");
        threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
        threeScript.async = true;
        document.head.appendChild(threeScript);

        await new Promise((resolve) => {
          threeScript.onload = resolve;
        });
      }

      // Load Vanta NET setelah THREE siap
      if (!window.VANTA) {
        const vantaScript = document.createElement("script");
        vantaScript.src = "https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.net.min.js";
        vantaScript.async = true;
        document.head.appendChild(vantaScript);

        await new Promise((resolve) => {
          vantaScript.onload = resolve;
        });
      }

      // Init Vanta effect pada ref element
      if (window.VANTA && vantaRef.current && !vantaEffect.current) {
        vantaEffect.current = window.VANTA.NET({
          el: vantaRef.current,
          ...VANTA_CONFIG,
        });
        setVantaLoaded(true);
      }
    };

    loadVanta();

    // Cleanup saat unmount — penting agar tidak memory leak
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);


  // --- RENDER ---
  return (
    <section
      ref={vantaRef}
      className="relative min-h-[340px] md:min-h-[420px] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }} // Fallback sebelum Vanta load
    >
      {/* Overlay gradient — supaya teks tetap readable di atas NET effect */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.6) 100%)",
        }}
      />

      {/* Content — z-20 agar di atas overlay */}
      <motion.div
        className="relative z-20 text-center px-6 max-w-3xl mx-auto"
        variants={staggerContainerSlow}
        initial="hidden"
        animate="visible"
      >
        {/* Badge — optional label kecil */}
        {badge && (
          <motion.span
            variants={fadeInUp}
            className="inline-block mb-4 px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full"
            style={{
              background: "rgba(155, 48, 255, 0.15)",
              border: "1px solid rgba(155, 48, 255, 0.4)",
              color: "#C678FF",
            }}
          >
            {badge}
          </motion.span>
        )}

        {/* Title */}
        <motion.h1
          variants={heroText}
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-base md:text-lg max-w-xl mx-auto"
            style={{ color: "#A0A0A0", fontFamily: "'Inter', sans-serif" }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Decorative divider line */}
        <motion.div
          variants={fadeInUp}
          className="mt-6 mx-auto w-16 h-0.5 rounded-full"
          style={{ background: "linear-gradient(90deg, #9B30FF, #C678FF)" }}
        />
      </motion.div>
    </section>
  );
};

export default VantaBanner;