// =============================================================
// pages/services/sections/ServicesCTASection.jsx
// Call-to-action penutup — WhatsApp + brief form link
// =============================================================

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../../../utils/animations";
import SectionWrapper from "../../../components/common/SectionWrapper";

// --- Config (sesuai Decision 014) ---
const WHATSAPP_NUMBER = "628996683031";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Halo Elevate Pixel Studio! Saya tertarik dengan layanan kalian dan ingin konsultasi lebih lanjut."
);


// =============================================================
// COMPONENT
// =============================================================

const ServicesCTASection = () => {
  // --- Handler: buka WhatsApp di tab baru ---
  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <SectionWrapper id="services-cta">
      <div className="max-w-4xl mx-auto px-6">

        {/* --- CTA CARD --- */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center p-12 md:p-16 rounded-3xl relative overflow-hidden"
          style={{
            background: "rgba(155, 48, 255, 0.08)",
            border: "1px solid rgba(155, 48, 255, 0.2)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Decorative glow di background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(155,48,255,0.15) 0%, transparent 70%)",
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            <motion.span
              variants={fadeInUp}
              className="text-xs font-semibold tracking-widest uppercase mb-4 block"
              style={{ color: "#9B30FF" }}
            >
              Siap Mulai?
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Mari Diskusikan{" "}
              <span style={{ color: "#C678FF" }}>Proyek Kamu</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="mb-8 max-w-lg mx-auto"
              style={{ color: "#A0A0A0", fontFamily: "'Inter', sans-serif" }}
            >
              Konsultasi gratis, tanpa commitment. Ceritakan kebutuhanmu dan kami
              siapkan solusi yang tepat.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {/* Primary — WhatsApp */}
              <motion.button
                onClick={handleWhatsApp}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg, #9B30FF, #6B21A8)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {/* WhatsApp icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat via WhatsApp
              </motion.button>

              {/* Secondary — Contact Page */}
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center px-8 py-4 rounded-xl font-semibold"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#FFFFFF",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Kirim Brief
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </SectionWrapper>
  );
};

export default ServicesCTASection;