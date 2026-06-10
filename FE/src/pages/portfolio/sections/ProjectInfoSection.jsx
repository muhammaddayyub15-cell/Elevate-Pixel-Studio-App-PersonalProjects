// =============================================================
// pages/portfolio/sections/ProjectInfoSection.jsx
// Info detail project: deskripsi lengkap + tech stack + sidebar meta
// Layout: 2 kolom — kiri deskripsi, kanan sidebar info
//
// Props:
//   project  (object) — data project dari PortfolioDetailPage
//             ↳ short_description, description, technologies,
//               client_name, year, estimated_dev, project_url
// =============================================================

import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "../../../utils/animations";
import SectionWrapper from "../../../components/common/SectionWrapper";


// =============================================================
// SECTION: SUB-COMPONENT — TechBadge
// Badge individual untuk satu teknologi
// =============================================================

function TechBadge({ tech }) {
  return (
    <span
      className="px-3 py-1.5 text-sm font-medium rounded-lg"
      style={{
        background: "rgba(155,48,255,0.1)",
        border: "1px solid rgba(155,48,255,0.25)",
        color: "#C678FF",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {tech}
    </span>
  );
}


// =============================================================
// SECTION: SUB-COMPONENT — MetaItem
// Satu baris info di sidebar: label + value
// =============================================================

function MetaItem({ label, value }) {
  if (!value) return null; // Skip jika value kosong

  return (
    <div className="py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <p
        className="text-xs font-semibold tracking-wider uppercase mb-1"
        style={{ color: "#9B30FF" }}
      >
        {label}
      </p>
      <p
        className="text-sm"
        style={{ color: "#FFFFFF", fontFamily: "'Inter', sans-serif" }}
      >
        {value}
      </p>
    </div>
  );
}


// =============================================================
// SECTION: SUB-COMPONENT — DescriptionBlock
// Kolom kiri: deskripsi project + tech stack
// =============================================================

function DescriptionBlock({ short_description, description, technologies }) {
  return (
    <motion.div variants={fadeInLeft} className="space-y-8">

      {/* Ringkasan singkat */}
      {short_description && (
        <p
          className="text-lg leading-relaxed font-medium"
          style={{ color: "#C678FF", fontFamily: "'Inter', sans-serif" }}
        >
          {short_description}
        </p>
      )}

      {/* Deskripsi panjang */}
      {description && (
        <p
          className="text-base leading-relaxed"
          style={{ color: "#A0A0A0", fontFamily: "'Inter', sans-serif" }}
        >
          {description}
        </p>
      )}

      {/* Tech Stack */}
      {technologies?.length > 0 && (
        <div>
          <h3
            className="text-sm font-semibold tracking-wider uppercase mb-4"
            style={{ color: "#FFFFFF", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Tech Stack
          </h3>
          {/* Flex wrap — badge meluber ke baris berikut jika banyak */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            {technologies.map((tech) => (
              <motion.div key={tech} variants={fadeInUp}>
                <TechBadge tech={tech} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}


// =============================================================
// SECTION: SUB-COMPONENT — SidebarInfo
// Kolom kanan: metadata project + CTA link
// =============================================================

function SidebarInfo({ client_name, year, estimated_dev, project_url }) {
  return (
    <motion.aside variants={fadeInRight}>

      {/* Glass card sidebar */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        <h3
          className="text-sm font-semibold tracking-wider uppercase mb-2"
          style={{ color: "#9B30FF", fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Project Info
        </h3>

        {/* Divider */}
        <div
          className="mb-4"
          style={{ height: "1px", background: "rgba(255,255,255,0.07)" }}
        />

        {/* Meta items */}
        <MetaItem label="Client" value={client_name} />
        <MetaItem label="Tahun" value={year} />
        <MetaItem label="Estimasi Pengerjaan" value={estimated_dev} />

        {/* CTA: Visit Site — hanya tampil jika ada project_url */}
        {project_url && (
          <a
            href={project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #9B30FF, #6B21A8)",
              color: "#FFFFFF",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Visit Live Site
            <span>↗</span>
          </a>
        )}
      </div>
    </motion.aside>
  );
}


// =============================================================
// SECTION: MAIN COMPONENT — ProjectInfoSection
// Layout 2 kolom: deskripsi (kiri, lebar) + sidebar (kanan, sempit)
// =============================================================

export default function ProjectInfoSection({ project }) {
  const {
    short_description,
    description,
    technologies,
    client_name,
    year,
    estimated_dev,
    project_url,
  } = project;

  return (
    <SectionWrapper id="project-info">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16"
        >
          {/* Kiri: deskripsi + tech stack (2/3 lebar) */}
          <div className="lg:col-span-2">
            <DescriptionBlock
              short_description={short_description}
              description={description}
              technologies={technologies}
            />
          </div>

          {/* Kanan: sidebar info (1/3 lebar) */}
          <div className="lg:col-span-1">
            <SidebarInfo
              client_name={client_name}
              year={year}
              estimated_dev={estimated_dev}
              project_url={project_url}
            />
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}