// ─────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────

import { SERVICES, WHATSAPP_URL } from '../../../constants/services'


// ─────────────────────────────────────────────
// CHILD COMPONENT — SectionHeader
// Judul dan subtitle section
// Digunakan ulang di section lain jika perlu
// ─────────────────────────────────────────────

const SectionHeader = () => (
  <div className="text-center mb-16">

    {/* eyebrow label — penanda section */}
    <span className="inline-block text-xs font-medium tracking-widest uppercase text-brand-primary mb-4">
      Layanan Kami
    </span>

    {/* judul utama */}
    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
      Solusi Digital{' '}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-light">
        untuk Bisnis Kamu
      </span>
    </h2>

    {/* subtitle */}
    <p className="text-content-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
      Dari desain hingga pengembangan — kami hadir untuk mengubah
      ide kamu menjadi produk digital yang berdampak.
    </p>

  </div>
)


// ─────────────────────────────────────────────
// CHILD COMPONENT — ServiceCard
// Satu card untuk satu layanan
// Props: service { id, title, slug, description, icon }
// ─────────────────────────────────────────────

const ServiceCard = ({ service }) => {

  // pesan WhatsApp spesifik per layanan
  const waMessage = `Halo, saya tertarik dengan layanan ${service.title} dari Elevate Pixel Studio.`

  return (
    <article
      className="
        group relative flex flex-col gap-5 p-6
        rounded-card border border-white/[0.08]
        bg-white/[0.03] backdrop-blur-glass
        hover:border-brand-primary/60
        hover:-translate-y-1
        transition-all duration-300 ease-out
        cursor-pointer
      "
    >

      {/* efek glow di belakang card saat hover */}
      <div className="
        absolute inset-0 rounded-card opacity-0
        group-hover:opacity-100
        bg-gradient-to-br from-brand-primary/5 to-transparent
        transition-opacity duration-300 pointer-events-none
      " />

      {/* ── ICON WRAPPER ── */}
      <div className="
        w-12 h-12 flex items-center justify-center
        rounded-xl text-2xl
        bg-brand-primary/10 border border-brand-primary/20
        group-hover:bg-brand-primary/20
        group-hover:border-brand-primary/40
        transition-all duration-300
      ">
        {service.icon}
      </div>

      {/* ── CONTENT ── */}
      <div className="flex flex-col gap-2 flex-1">

        {/* judul layanan */}
        <h3 className="font-heading text-base md:text-lg font-semibold text-white leading-snug">
          {service.title}
        </h3>

        {/* deskripsi layanan */}
        <p className="text-sm text-content-muted leading-relaxed flex-1">
          {service.description}
        </p>

      </div>

      {/* ── CTA LINK ── */}
      <a
        href={WHATSAPP_URL(waMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex items-center gap-2
          text-sm font-medium text-brand-light
          hover:text-white
          transition-colors duration-200
          w-fit
        "
        aria-label={`Mulai project ${service.title} via WhatsApp`}
      >
        Mulai Project
        {/* arrow icon — bergerak ke kanan saat hover */}
        <span className="
          inline-block
          group-hover:translate-x-1
          transition-transform duration-200
        ">
          →
        </span>
      </a>

    </article>
  )
}


// ─────────────────────────────────────────────
// CHILD COMPONENT — ServicesGrid
// Grid 3 kolom (desktop) / 1 kolom (mobile)
// Render semua ServiceCard dari SERVICES constant
// ─────────────────────────────────────────────

const ServicesGrid = () => (
  <div className="
    grid grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    gap-4 md:gap-6
  ">
    {SERVICES.map((service) => (
      <ServiceCard
        key={service.id}
        service={service}
      />
    ))}
  </div>
)


// ─────────────────────────────────────────────
// MAIN COMPONENT — ServicesSection
// Section layanan di homepage
// Ref: Decision 015 — data dari constants/services.js
// Ref: Decision 008 — dark glassmorphism theme
// ─────────────────────────────────────────────

const ServicesSection = () => (
  <section
    id="services"
    className="py-20 md:py-28 px-4 relative overflow-hidden"
  >

    {/* ambient glow kiri atas — dekoratif */}
    <div className="
      absolute -top-40 -left-40 w-96 h-96
      bg-brand-primary/10 rounded-full blur-3xl
      pointer-events-none
    " />

    {/* ambient glow kanan bawah — dekoratif */}
    <div className="
      absolute -bottom-40 -right-40 w-96 h-96
      bg-brand-dark/20 rounded-full blur-3xl
      pointer-events-none
    " />

    {/* konten utama — di atas ambient glow */}
    <div className="relative z-10 max-w-6xl mx-auto">

      {/* judul section */}
      <SectionHeader />

      {/* grid cards layanan */}
      <ServicesGrid />

    </div>

  </section>
)


// ─────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────

export default ServicesSection