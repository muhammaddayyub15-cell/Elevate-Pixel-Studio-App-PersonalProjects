// =============================================================
// pages/services/ServicesPage.jsx
// Parent page — merakit semua section Services
// Urutan render: Hero → List → CTA
// =============================================================

import MetaHead from "../../components/seo/MetaHead";

// --- Import sections (child) ---
import ServicesHeroSection from "./sections/ServicesHeroSection";
import ServicesListSection from "./sections/ServicesListSection";
import ServicesCTASection from "./sections/ServicesCTASection";

// =============================================================
// META CONFIG — SEO untuk halaman Services
// =============================================================

const PAGE_META = {
  title: "Services — Elevate Pixel Studio",
  description:
    "Website design, branding, digital marketing, and more. All services crafted custom — built to grow your business.",
};

// =============================================================
// MAIN COMPONENT — ServicesPage
// Tidak ada state/logic di sini — murni layout orchestrator
// =============================================================

export default function ServicesPage() {
  return (
    <>
      {/* SEO meta tags */}
      <MetaHead
        title={PAGE_META.title}
        description={PAGE_META.description}
      />

      {/* --- Section 1: Hero --- */}
      <ServicesHeroSection />

      {/* --- Section 2: Daftar Layanan --- */}
      <ServicesListSection />

      {/* --- Section 3: CTA Penutup --- */}
      <ServicesCTASection />
    </>
  );
}

// =============================================================
// STRUKTUR HALAMAN:
//
// ServicesPage (parent)
//   ├── MetaHead          — SEO title & description
//   ├── ServicesHeroSection   — Vanta NET + judul + stats
//   ├── ServicesListSection   — Grid kartu layanan
//   └── ServicesCTASection    — WhatsApp + kirim brief CTA
//
// ROUTE: /services (sudah terdaftar di constants/routes.js)
// LAYOUT: dibungkus MainLayout di App.jsx / PublicRoutes.jsx
// =============================================================