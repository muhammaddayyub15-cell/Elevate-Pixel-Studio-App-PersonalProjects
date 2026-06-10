// =============================================================
// components/common/SectionWrapper.jsx
// Wrapper untuk semua section — konsisten padding & scroll trigger
//
// Props:
//   children    (node)    — content section
//   className   (string)  — tambahan class jika perlu override
//   id          (string)  — optional anchor id untuk navigasi
//   noPadding   (bool)    — skip padding default (untuk full-bleed section)
// =============================================================

import { motion } from "framer-motion";
import { fadeInUp } from "../../utils/animations";


// =============================================================
// COMPONENT
// =============================================================

const SectionWrapper = ({ children, className = "", id, noPadding = false }) => {
  return (
    <motion.section
      id={id}
      // Scroll-triggered reveal — animasi saat section masuk viewport
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }} // Trigger 80px sebelum masuk viewport
      className={`
        ${noPadding ? "" : "py-16 md:py-24"}
        ${className}
      `}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;