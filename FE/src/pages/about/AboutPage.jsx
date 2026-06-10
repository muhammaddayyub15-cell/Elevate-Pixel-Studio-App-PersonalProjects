// =============================================================
// pages/about/AboutPage.jsx
// Parent assembler — hanya import & susun sections
// Logic ada di masing-masing section, bukan di sini
// =============================================================

import { motion } from "framer-motion";
import { pageTransition } from "../../utils/animations";

// --- Section imports ---
import VantaBanner from "../../components/common/VantaBanner";
import StorySection from "./sections/StorySection";
import MissionVisionSection from "./sections/MissionVisionSection";

// --- SEO ---
import MetaHead from "../../components/seo/MetaHead";


// =============================================================
// COMPONENT
// =============================================================

const AboutPage = () => {
  return (
    // Page transition wrapper
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* SEO Meta */}
      <MetaHead
        title="About — Elevate Pixel Studio"
        description="Kenali Elevate Pixel Studio — studio digital yang membantu bisnis tumbuh melalui desain, teknologi, dan strategi."
      />

      {/* --- HERO BANNER (Vanta NET) --- */}
      <VantaBanner
        badge="About Us"
        title="Kami Membangun Digital Presence"
        subtitle="Studio desain & teknologi yang fokus pada hasil nyata untuk bisnis kamu."
      />

      {/* --- STORY SECTION --- */}
      <StorySection />

      {/* --- MISSION & VISION SECTION --- */}
      <MissionVisionSection />

    </motion.div>
  );
};

export default AboutPage;