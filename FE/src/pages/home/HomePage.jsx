// ============================================================
// HomePage.jsx
// Halaman utama (/) — pure assembly component
// Tidak ada business logic atau data fetching di sini
// Semua logic ada di masing-masing section component
//
// Section order:
//   1. HeroSection       — Above the fold, CTA utama
//   2. MarqueeSection    — Scrolling ticker services/tagline
//   3. ServicesSection   — Daftar layanan
//   4. PortfolioSection  — Preview portofolio terbaru
//   5. ProcessSection    — 4-step cara kerja
//   6. StatsSection      — Value proposition / komitmen
//   7. MapsSection       — Global service area visual
//   8. CTASection        — Call to action akhir halaman
//
// Digunakan di: routes/PublicRoutes.jsx
// Layout: MainLayout (Navbar + Footer sudah termasuk)
// ============================================================


// ============================================================
// IMPORTS — Layout
// ============================================================

import MainLayout from "../../layouts/MainLayout";


// ============================================================
// IMPORTS — SEO
// ============================================================

import MetaHead from "../../components/seo/MetaHead";


// ============================================================
// IMPORTS — Home Sections
// Setiap section adalah independent component
// ============================================================

import HeroSection      from "./sections/HeroSection";
import MarqueeSection   from "./sections/MarqueeSection";
import ServicesSection  from "./sections/ServicesSection";
import PortfolioSection from "./sections/PortfolioSection";
import ProcessSection   from "./sections/ProcessSection";
import StatsSection     from "./sections/StatsSection";
import MapsSection      from "./sections/MapsSection";
import CTASection       from "./sections/CTASection";


// ============================================================
// CONSTANTS — SEO Meta Data
// Data untuk MetaHead component di halaman ini
// ============================================================

const HOME_META = {
  title: "Elevate Pixel Studio — Creative Agency & Digital Product Studio",
  description:
    "Kami membangun website, branding, dan digital product yang mengubah visitor menjadi pelanggan. Delivery dalam 3 hari. Custom 100%. Support 24/7.",
  keywords:
    "creative agency, web design, web development, branding, digital marketing, landing page, UI design, Indonesia",
  // OG image untuk share preview di social media
  ogImage: "/og-image.jpg",
  // Canonical URL halaman ini
  canonical: "https://elevatepixelstudio.com",
};


// ============================================================
// MAIN COMPONENT: HomePage
// Pure assembly — hanya menyusun section-section ke dalam layout
// Jika ada section yang ingin dinonaktifkan sementara saat debug,
// cukup comment satu baris import + render-nya
// ============================================================

export default function HomePage() {
  return (
    <>
      {/* ── SEO Meta Tags ── */}
      {/* Inject title, description, og tags ke <head> */}
      <MetaHead
        title={HOME_META.title}
        description={HOME_META.description}
        keywords={HOME_META.keywords}
        ogImage={HOME_META.ogImage}
        canonical={HOME_META.canonical}
      />

      {/* ── Main Layout Wrapper ── */}
      {/* Navbar dan Footer sudah di-handle oleh MainLayout */}
      <MainLayout>

        {/* ── SECTION 1: Hero ── */}
        {/* Above the fold — headline utama + CTA + visual 3D card */}
        <HeroSection />

        {/* ── SECTION 2: Marquee ── */}
        {/* Scrolling ticker: daftar layanan / tagline brand */}
        <MarqueeSection />

        {/* ── SECTION 3: Services ── */}
        {/* Grid layanan: Web Design, Branding, Marketing, dll */}
        <ServicesSection />

        {/* ── SECTION 4: Portfolio ── */}
        {/* Preview 3-4 project terbaru, link ke /portfolio */}
        <PortfolioSection />

        {/* ── SECTION 5: Process ── */}
        {/* 4-step: Discovery → Design → Development → Launch */}
        <ProcessSection />

        {/* ── SECTION 6: Stats ── */}
        {/* Value proposition: 3 Days Delivery, 100% Custom, dll */}
        <StatsSection />

        {/* ── SECTION 7: Maps ── */}
        {/* Visual peta area service global */}
        <MapsSection />

        {/* ── SECTION 8: CTA ── */}
        {/* Final call to action: WhatsApp / Contact Form */}
        <CTASection />

      </MainLayout>
    </>
  );
}