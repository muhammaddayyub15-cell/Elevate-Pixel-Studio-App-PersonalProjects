// ─────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { Link }                from 'react-router-dom'
import { getPortfolios }       from '../../../api/portfolioApi'


// ─────────────────────────────────────────────
// CHILD COMPONENT — SectionHeader
// Judul dan subtitle section portfolio
// ─────────────────────────────────────────────

const SectionHeader = () => (
  <div className="text-center mb-16">

    {/* eyebrow label */}
    <span className="inline-block text-xs font-medium tracking-widest uppercase text-brand-primary mb-4">
      Portfolio
    </span>

    {/* judul utama */}
    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
      Karya yang{' '}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-light">
        Bicara Sendiri
      </span>
    </h2>

    {/* subtitle */}
    <p className="text-content-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
      Setiap project adalah bukti komitmen kami terhadap
      kualitas, detail, dan hasil yang terukur.
    </p>

  </div>
)


// ─────────────────────────────────────────────
// CHILD COMPONENT — SkeletonCard
// Placeholder saat data portfolio sedang di-fetch
// Animated pulse agar tidak terasa blank
// ─────────────────────────────────────────────

const SkeletonCard = () => (
  <div className="
    rounded-card border border-white/[0.08]
    bg-white/[0.03] overflow-hidden
    animate-pulse
  ">

    {/* placeholder image */}
    <div className="w-full aspect-video bg-white/[0.06]" />

    {/* placeholder content */}
    <div className="p-5 flex flex-col gap-3">

      {/* placeholder badge */}
      <div className="w-20 h-5 rounded-full bg-white/[0.06]" />

      {/* placeholder title */}
      <div className="w-3/4 h-5 rounded bg-white/[0.06]" />

      {/* placeholder description */}
      <div className="flex flex-col gap-2">
        <div className="w-full h-3 rounded bg-white/[0.04]" />
        <div className="w-2/3 h-3 rounded bg-white/[0.04]" />
      </div>

    </div>
  </div>
)


// ─────────────────────────────────────────────
// CHILD COMPONENT — LoadingState
// Render 3 skeleton card saat fetching
// ─────────────────────────────────────────────

const LoadingState = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
    {Array.from({ length: 3 }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>
)


// ─────────────────────────────────────────────
// CHILD COMPONENT — ErrorState
// Tampil jika fetch gagal
// ─────────────────────────────────────────────

const ErrorState = () => (
  <div className="
    flex flex-col items-center justify-center
    py-20 text-center
  ">

    {/* icon error */}
    <span className="text-4xl mb-4">⚠️</span>

    {/* pesan error */}
    <p className="text-content-muted text-sm">
      Gagal memuat portfolio. Silakan refresh halaman.
    </p>

  </div>
)


// ─────────────────────────────────────────────
// CHILD COMPONENT — PortfolioCard
// Satu card untuk satu item portfolio
// Props: item { id, title, slug, category, thumbnail, excerpt }
// ─────────────────────────────────────────────

const PortfolioCard = ({ item }) => (
  <Link
    to={`/portfolio/${item.slug}`}
    className="group block rounded-card border border-white/[0.08] bg-white/[0.03] overflow-hidden hover:border-brand-primary/60 transition-all duration-300 hover:-translate-y-1"
    aria-label={`Lihat detail project ${item.title}`}
  >

    {/* ── IMAGE WRAPPER ── */}
    <div className="relative w-full aspect-video overflow-hidden bg-white/[0.05]">

      {/* thumbnail project */}
      {item.thumbnail ? (
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      ) : (
        // fallback jika tidak ada thumbnail
        <div className="w-full h-full flex items-center justify-center text-content-muted text-sm">
          No Preview
        </div>
      )}

      {/* overlay gradient saat hover */}
      <div className="
        absolute inset-0
        bg-gradient-to-t from-black/60 to-transparent
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
      " />

    </div>

    {/* ── CONTENT ── */}
    <div className="p-5 flex flex-col gap-3">

      {/* badge kategori */}
      {item.category && (
        <span className="
          inline-block w-fit
          text-xs font-medium px-3 py-1
          rounded-full
          bg-brand-primary/10 text-brand-light
          border border-brand-primary/20
        ">
          {item.category}
        </span>
      )}

      {/* judul project */}
      <h3 className="
        font-heading text-base md:text-lg font-semibold
        text-white leading-snug
        group-hover:text-brand-light
        transition-colors duration-200
      ">
        {item.title}
      </h3>

      {/* excerpt / deskripsi singkat */}
      {item.excerpt && (
        <p className="text-sm text-content-muted leading-relaxed line-clamp-2">
          {item.excerpt}
        </p>
      )}

      {/* link lihat detail */}
      <span className="
        inline-flex items-center gap-2
        text-sm font-medium text-brand-light
        group-hover:text-white
        transition-colors duration-200
        w-fit mt-1
      ">
        Lihat Project
        <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
          →
        </span>
      </span>

    </div>

  </Link>
)


// ─────────────────────────────────────────────
// CHILD COMPONENT — PortfolioGrid
// Grid 3 kolom yang render semua PortfolioCard
// Props: items — array portfolio dari API
// ─────────────────────────────────────────────

const PortfolioGrid = ({ items }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
    {items.map((item) => (
      <PortfolioCard
        key={item.id}
        item={item}
      />
    ))}
  </div>
)


// ─────────────────────────────────────────────
// CHILD COMPONENT — ViewAllButton
// CTA ke halaman portfolio lengkap
// ─────────────────────────────────────────────

const ViewAllButton = () => (
  <div className="flex justify-center mt-12">
    <Link
      to="/portfolio"
      className="
        inline-flex items-center gap-3
        px-8 py-3 rounded-full
        border border-brand-primary/60
        text-sm font-medium text-brand-light
        hover:bg-brand-primary/10
        hover:border-brand-primary
        transition-all duration-300
      "
    >
      Lihat Semua Project
      <span>→</span>
    </Link>
  </div>
)


// ─────────────────────────────────────────────
// MAIN COMPONENT — PortfolioSection
// Fetch 3 portfolio terbaru dari API
// Handle loading / error / success state
// Ref: Decision 001 — React + Laravel API
// ─────────────────────────────────────────────

const PortfolioSection = () => {

  // ── STATE ──
  const [portfolios, setPortfolios] = useState([])
  const [isLoading,  setIsLoading]  = useState(true)
  const [isError,    setIsError]    = useState(false)


  // ── FETCH DATA ──
  // Ambil 3 portfolio terbaru saat component mount
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        setIsLoading(true)
        setIsError(false)

        // request ke API dengan limit 3
        const response = await getPortfolios({ limit: 3 })
        setPortfolios(response.data?.data ?? [])

      } catch (error) {
        console.error('[PortfolioSection] Fetch error:', error)
        setIsError(true)

      } finally {
        setIsLoading(false)
      }
    }

    fetchPortfolios()
  }, [])


  // ── RENDER ──
  return (
    <section
      id="portfolio"
      className="py-20 md:py-28 px-4 relative overflow-hidden"
    >

      {/* ambient glow kanan atas — dekoratif */}
      <div className="
        absolute -top-40 -right-40 w-96 h-96
        bg-brand-primary/10 rounded-full blur-3xl
        pointer-events-none
      " />

      {/* konten utama */}
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* judul section */}
        <SectionHeader />

        {/* conditional render berdasarkan state */}
        {isLoading && <LoadingState />}

        {isError && !isLoading && <ErrorState />}

        {!isLoading && !isError && portfolios.length > 0 && (
          <>
            <PortfolioGrid items={portfolios} />
            <ViewAllButton />
          </>
        )}

        {/* empty state — jika portfolio belum ada */}
        {!isLoading && !isError && portfolios.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-4xl mb-4">🎨</span>
            <p className="text-content-muted text-sm">
              Portfolio sedang disiapkan. Pantau terus!
            </p>
          </div>
        )}

      </div>

    </section>
  )
}


// ─────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────

export default PortfolioSection