// =============================================================
// pages/about/sections/StorySection.jsx
// Company story — text kiri, visual kanan (split layout)
// =============================================================

import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight, staggerContainer, fadeInUp } from "../../../utils/animations";
import SectionWrapper from "../../../components/common/SectionWrapper";


// --- DATA ---
// Milestones company — edit sesuai konten real
const milestones = [
  { year: "2022", label: "Studio Founded", desc: "Dimulai dari satu laptop dan tekad membangun digital presence yang bermakna." },
  { year: "2023", label: "First 20 Clients", desc: "Kepercayaan klien pertama menjadi fondasi reputasi studio." },
  { year: "2024", label: "Full Digital Suite", desc: "Ekspansi layanan ke branding, digital marketing, dan digital products." },
  { year: "2025", label: "Growing Strong", desc: "Tim berkembang, portofolio melebar, standar kerja semakin tinggi." },
];


// =============================================================
// COMPONENT
// =============================================================

const StorySection = () => {
  return (
    <SectionWrapper id="story">
      <div className="max-w-6xl mx-auto px-6">

        {/* --- GRID LAYOUT: text kiri, milestones kanan --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — Story text */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Eyebrow label */}
            <span
              className="text-xs font-semibold tracking-widest uppercase mb-4 block"
              style={{ color: "#9B30FF" }}
            >
              Our Story
            </span>

            <h2
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Dibangun untuk Era{" "}
              <span style={{ color: "#C678FF" }}>Digital-First</span>
            </h2>

            <div className="space-y-4" style={{ color: "#A0A0A0", fontFamily: "'Inter', sans-serif" }}>
              <p>
                Elevate Pixel Studio lahir dari keyakinan sederhana: setiap bisnis berhak
                tampil profesional di dunia digital, tanpa harus mengorbankan identitas
                atau anggaran.
              </p>
              <p>
                Kami menggabungkan desain yang tajam, teknologi yang solid, dan strategi
                yang terukur — menghasilkan website dan aset digital yang tidak hanya
                terlihat bagus, tapi benar-benar bekerja untuk bisnis kamu.
              </p>
              <p>
                Setiap proyek adalah kolaborasi nyata. Kami tidak jual template —
                kami bangun solusi.
              </p>
            </div>
          </motion.div>

          {/* RIGHT — Milestone timeline */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {milestones.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInRight}
                className="flex gap-5 p-5 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Year badge */}
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center text-sm font-bold"
                  style={{
                    background: "rgba(155, 48, 255, 0.15)",
                    border: "1px solid rgba(155, 48, 255, 0.3)",
                    color: "#C678FF",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {item.year}
                </div>

                {/* Text */}
                <div>
                  <p className="font-semibold text-white text-sm mb-1"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {item.label}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#A0A0A0" }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </SectionWrapper>
  );
};

export default StorySection;// =============================================================
// pages/about/sections/StorySection.jsx
// Company story — text kiri, visual kanan (split layout)
// =============================================================

import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight, staggerContainer, fadeInUp } from "../../../utils/animations";
import SectionWrapper from "../../../components/common/SectionWrapper";


// --- DATA ---
// Milestones company — edit sesuai konten real
const milestones = [
  { year: "2022", label: "Studio Founded", desc: "Dimulai dari satu laptop dan tekad membangun digital presence yang bermakna." },
  { year: "2023", label: "First 20 Clients", desc: "Kepercayaan klien pertama menjadi fondasi reputasi studio." },
  { year: "2024", label: "Full Digital Suite", desc: "Ekspansi layanan ke branding, digital marketing, dan digital products." },
  { year: "2025", label: "Growing Strong", desc: "Tim berkembang, portofolio melebar, standar kerja semakin tinggi." },
];


// =============================================================
// COMPONENT
// =============================================================

const StorySection = () => {
  return (
    <SectionWrapper id="story">
      <div className="max-w-6xl mx-auto px-6">

        {/* --- GRID LAYOUT: text kiri, milestones kanan --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — Story text */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Eyebrow label */}
            <span
              className="text-xs font-semibold tracking-widest uppercase mb-4 block"
              style={{ color: "#9B30FF" }}
            >
              Our Story
            </span>

            <h2
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Dibangun untuk Era{" "}
              <span style={{ color: "#C678FF" }}>Digital-First</span>
            </h2>

            <div className="space-y-4" style={{ color: "#A0A0A0", fontFamily: "'Inter', sans-serif" }}>
              <p>
                Elevate Pixel Studio lahir dari keyakinan sederhana: setiap bisnis berhak
                tampil profesional di dunia digital, tanpa harus mengorbankan identitas
                atau anggaran.
              </p>
              <p>
                Kami menggabungkan desain yang tajam, teknologi yang solid, dan strategi
                yang terukur — menghasilkan website dan aset digital yang tidak hanya
                terlihat bagus, tapi benar-benar bekerja untuk bisnis kamu.
              </p>
              <p>
                Setiap proyek adalah kolaborasi nyata. Kami tidak jual template —
                kami bangun solusi.
              </p>
            </div>
          </motion.div>

          {/* RIGHT — Milestone timeline */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {milestones.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInRight}
                className="flex gap-5 p-5 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Year badge */}
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center text-sm font-bold"
                  style={{
                    background: "rgba(155, 48, 255, 0.15)",
                    border: "1px solid rgba(155, 48, 255, 0.3)",
                    color: "#C678FF",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {item.year}
                </div>

                {/* Text */}
                <div>
                  <p className="font-semibold text-white text-sm mb-1"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {item.label}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#A0A0A0" }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </SectionWrapper>
  );
};

export default StorySection;