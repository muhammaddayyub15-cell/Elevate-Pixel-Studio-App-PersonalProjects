// =============================================================
// pages/about/sections/MissionVisionSection.jsx
// Mission & Vision dalam 2 glass cards + values grid
// =============================================================

import { motion } from "framer-motion";
import { staggerContainer, scaleIn, fadeInUp } from "../../../utils/animations";
import SectionWrapper from "../../../components/common/SectionWrapper";


// --- DATA ---
const cards = [
  {
    icon: "🎯",
    label: "Mission",
    title: "Misi Kami",
    desc: "Membantu bisnis dan brand tumbuh di dunia digital melalui desain yang bermakna, teknologi yang solid, dan strategi yang terukur.",
  },
  {
    icon: "🔭",
    label: "Vision",
    title: "Visi Kami",
    desc: "Menjadi studio digital terpercaya yang dikenal karena kualitas kerja, integritas, dan dampak nyata bagi klien dari berbagai skala bisnis.",
  },
];

// Core values
const values = [
  { icon: "⚡", label: "Speed", desc: "3-day delivery commitment" },
  { icon: "🎨", label: "Quality", desc: "100% custom, no templates" },
  { icon: "🤝", label: "Transparency", desc: "Clear process, no surprises" },
  { icon: "🔄", label: "Iteration", desc: "Unlimited revision rounds" },
  { icon: "📱", label: "Mobile-First", desc: "Every pixel responsive" },
  { icon: "🚀", label: "Growth", desc: "Built to scale with you" },
];


// =============================================================
// COMPONENT
// =============================================================

const MissionVisionSection = () => {
  return (
    <SectionWrapper id="mission-vision">
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
            What Drives Us
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Nilai yang Kami Pegang
          </h2>
        </motion.div>

        {/* --- MISSION & VISION CARDS --- */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              className="p-8 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Icon */}
              <div className="text-4xl mb-4">{card.icon}</div>

              {/* Label badge */}
              <span
                className="text-xs font-semibold tracking-widest uppercase mb-3 block"
                style={{ color: "#9B30FF" }}
              >
                {card.label}
              </span>

              <h3
                className="text-xl font-bold text-white mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {card.title}
              </h3>

              <p className="leading-relaxed" style={{ color: "#A0A0A0", fontFamily: "'Inter', sans-serif" }}>
                {card.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* --- VALUES GRID --- */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {values.map((val, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-5 rounded-xl text-center cursor-default"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="text-2xl mb-2">{val.icon}</div>
              <p className="font-semibold text-white text-sm mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {val.label}
              </p>
              <p className="text-xs" style={{ color: "#A0A0A0" }}>{val.desc}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </SectionWrapper>
  );
};

export default MissionVisionSection;