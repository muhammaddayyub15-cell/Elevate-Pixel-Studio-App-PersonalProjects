// =============================================================
// utils/animations.js
// Centralized Framer Motion variants for Elevate Pixel Studio
// Import from here — jangan define variants inline di komponen
// =============================================================


// --- FADE IN UP (default scroll reveal) ---
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};


// --- FADE IN DOWN ---
export const fadeInDown = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};


// --- FADE IN LEFT ---
export const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};


// --- FADE IN RIGHT ---
export const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};


// --- SCALE IN (untuk cards, badges) ---
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};


// --- STAGGER CONTAINER (parent untuk staggered children) ---
// Wrap grid/list dengan ini, lalu child pakai fadeInUp / scaleIn
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};


// --- STAGGER CONTAINER SLOW (untuk hero content) ---
export const staggerContainerSlow = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};


// --- PAGE TRANSITION (untuk AnimatePresence page wrapper) ---
export const pageTransition = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};


// --- HERO TEXT (untuk banner headline) ---
export const heroText = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" },
  },
};


// --- GLASS CARD HOVER (dipakai di motion.div whileHover) ---
// Bukan variants, tapi object props langsung
export const cardHover = {
  whileHover: {
    y: -6,
    scale: 1.02,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  whileTap: { scale: 0.98 },
};


// --- SKELETON SHIMMER KEYFRAMES ---
// Dipakai di Skeleton loader komponen via CSS custom property
export const skeletonVariants = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 1.5,
      ease: "linear",
      repeat: Infinity,
    },
  },
};