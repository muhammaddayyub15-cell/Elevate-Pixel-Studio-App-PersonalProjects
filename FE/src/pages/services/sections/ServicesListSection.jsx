// =============================================================
// pages/services/sections/ServicesListSection.jsx
// Grid kartu layanan — data dari constants/services.js
// Stagger animation per card
// =============================================================

import { motion } from "framer-motion";
import { staggerContainer, scaleIn, cardHover, fadeInUp } from "../../../utils/animations";
import SectionWrapper from "../../../components/common/SectionWrapper";

// --- Import services data (hardcoded sesuai Decision 006 & 015) ---
// Pastikan path sesuai dengan struktur project kamu
import { SERVICES } from "../../../constants/services";


// =============================================================
// CHILD — Service Card
// =============================================================

const ServiceCard = ({ service }) => (
  <motion.div
    variants={scaleIn}
    {...cardHover}
    className="p-7 rounded-2xl flex flex-col gap-4"
    style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.09)",
      backdropFilter: "blur(12px)",
    }}
  >
    {/* Icon */}
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
      style={{
        background: "rgba(155, 48, 255, 0.12)",
        border: "1px solid rgba(155, 48, 255, 0.25)",
      }}
    >
      {service.icon}
    </div>

    {/* Title */}
    <h3
      className="text-lg font-bold text-white"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {service.title}
    </h3>

    {/* Description */}
    <p className="text-sm leading-relaxed flex-1" style={{ color: "#A0A0A0" }}>
      {service.description}
    </p>

    {/* Feature list — jika ada */}
    {service.features && (
      <ul className="space-y-1 mt-2">
        {service.features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-xs" style={{ color: "#A0A0A0" }}>
            <span style={{ color: "#9B30FF" }}>✓</span>
            {f}
          </li>
        ))}
      </ul>
    )}
  </motion.div>
);


// =============================================================
// PARENT — Services List
// =============================================================

const ServicesListSection = () => {
  return (
    <SectionWrapper id="services-list">
      <div className="max-w-6xl mx-auto px-6">

        {/* --- SECTION HEADER --- */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span
            className="text-xs font-semibold tracking-widest uppercase mb-3 block"
            style={{ color: "#9B30FF" }}
          >
            What We Do
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Layanan Kami
          </h2>
          <p className="max-w-xl mx-auto text-sm md:text-base" style={{ color: "#A0A0A0" }}>
            Dari desain hingga development, kami handle semua kebutuhan digital presence bisnis kamu.
          </p>
        </motion.div>

        {/* --- SERVICES GRID --- */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </motion.div>

      </div>
    </SectionWrapper>
  );
};

export default ServicesListSection;