// =============================================================
// constants/portfolioData.js
// Mock data portfolio — dipakai sementara sebelum API tersambung
// Shape mengikuti response portfolioApi.js agar mudah di-swap
//
// CATATAN: Hapus file ini dan ganti dengan API call saat BE siap
// Field: id, slug, title, client_name, category, technologies,
//        thumbnail, gallery, short_description, description,
//        featured, status, project_url, year, estimated_dev
// =============================================================


// =============================================================
// SECTION: MOCK PORTFOLIO DATA
// =============================================================

export const MOCK_PORTFOLIOS = [
  {
    id: 1,
    slug: "website-pt-maju-jaya",
    title: "Website PT. Maju Jaya",
    client_name: "PT. Maju Jaya",
    category: "Web Design",
    year: "2024",
    estimated_dev: "3 minggu",
    status: "published",
    featured: true,
    project_url: "https://ptmajujaya.com",
    short_description:
      "Redesign website korporat modern dengan sistem CMS internal dan integrasi WhatsApp CTA.",
    description:
      "PT. Maju Jaya membutuhkan website baru yang mencerminkan identitas brand mereka yang profesional. Kami membangun ulang dari nol menggunakan React + Laravel, dengan fokus pada performa, SEO, dan kemudahan pengelolaan konten melalui admin panel custom.",
    technologies: ["React", "Laravel", "Tailwind CSS", "MySQL"],
    thumbnail: null, // Ganti dengan URL gambar nyata
    gallery: [null, null, null],
  },
  {
    id: 2,
    slug: "branding-kopi-nusantara",
    title: "Brand Identity Kopi Nusantara",
    client_name: "Kopi Nusantara",
    category: "Branding",
    year: "2024",
    estimated_dev: "2 minggu",
    status: "published",
    featured: true,
    project_url: null,
    short_description:
      "Identitas visual lengkap untuk brand kopi lokal — logo, color palette, packaging, dan brand guideline.",
    description:
      "Kopi Nusantara ingin tampil premium di pasar specialty coffee. Kami merancang identitas visual yang menggabungkan estetika modern dengan sentuhan budaya lokal Indonesia.",
    technologies: ["Figma", "Adobe Illustrator", "Adobe Photoshop"],
    thumbnail: null,
    gallery: [null, null, null],
  },
  {
    id: 3,
    slug: "landing-page-seminar-digital",
    title: "Landing Page Seminar Digital",
    client_name: "Komunitas Digital ID",
    category: "Landing Page",
    year: "2024",
    estimated_dev: "1 minggu",
    status: "published",
    featured: false,
    project_url: null,
    short_description:
      "High-converting landing page untuk event seminar digital marketing dengan countdown timer dan form registrasi.",
    description:
      "Landing page single-page optimized untuk konversi. Dilengkapi countdown timer, social proof section, speaker profiles, dan form registrasi yang terintegrasi dengan email marketing.",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    thumbnail: null,
    gallery: [null, null],
  },
  {
    id: 4,
    slug: "ui-kit-dashboard-admin",
    title: "UI Kit Dashboard Admin",
    client_name: "Internal Product",
    category: "UI Kit",
    year: "2024",
    estimated_dev: "4 minggu",
    status: "published",
    featured: false,
    project_url: null,
    short_description:
      "Komponen UI lengkap untuk dashboard admin — 80+ komponen siap pakai dengan dark mode support.",
    description:
      "UI Kit internal yang dibangun untuk mempercepat development admin panel. Mencakup komponen form, tabel, chart, modal, navigasi, dan halaman lengkap dengan sistem dark/light mode.",
    technologies: ["Figma", "React", "Tailwind CSS"],
    thumbnail: null,
    gallery: [null, null, null],
  },
  {
    id: 5,
    slug: "website-toko-online-fashion",
    title: "Toko Online Fashion Lokal",
    client_name: "Ragam Cloth",
    category: "Web Design",
    year: "2023",
    estimated_dev: "5 minggu",
    status: "published",
    featured: false,
    project_url: null,
    short_description:
      "E-commerce fashion lokal dengan fitur katalog produk, keranjang belanja, dan integrasi payment gateway.",
    description:
      "Platform belanja online untuk brand fashion lokal dengan inventory management, order tracking, dan integrasi Midtrans untuk pembayaran.",
    technologies: ["React", "Laravel", "MySQL", "Midtrans"],
    thumbnail: null,
    gallery: [null, null, null],
  },
  {
    id: 6,
    slug: "company-profile-startup-tech",
    title: "Company Profile Startup Tech",
    client_name: "Nexus Labs",
    category: "Web Design",
    year: "2023",
    estimated_dev: "2 minggu",
    status: "published",
    featured: false,
    project_url: null,
    short_description:
      "Website company profile modern untuk startup teknologi dengan animasi premium dan dark theme.",
    description:
      "Nexus Labs butuh presence online yang kuat untuk menarik investor dan talent. Dibangun dengan Framer Motion animations, Vanta.js background, dan optimasi SEO.",
    technologies: ["React", "Framer Motion", "Vanta.js", "Tailwind CSS"],
    thumbnail: null,
    gallery: [null, null],
  },
];


// =============================================================
// SECTION: HELPER — ambil single project by slug
// Dipakai di PortfolioDetailPage sebelum API tersambung
// =============================================================

export const getPortfolioBySlug = (slug) =>
  MOCK_PORTFOLIOS.find((p) => p.slug === slug) || null;


// =============================================================
// SECTION: HELPER — ambil featured projects saja
// Dipakai di HomPage PortfolioSection
// =============================================================

export const getFeaturedPortfolios = () =>
  MOCK_PORTFOLIOS.filter((p) => p.featured);