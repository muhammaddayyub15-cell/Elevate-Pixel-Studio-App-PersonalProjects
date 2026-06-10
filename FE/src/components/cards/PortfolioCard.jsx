// ─────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────

import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants'


// ─────────────────────────────────────────────
// CHILD COMPONENT — CardImage
// Thumbnail gambar portfolio dengan overlay hover
// ─────────────────────────────────────────────

const CardImage = ({ image, title }) => (
  <div className="relative overflow-hidden rounded-xl aspect-video bg-white/5">

    {/* gambar utama */}
    {image ? (
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    ) : (
      // fallback jika gambar tidak tersedia
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-4xl opacity-30">🖼️</span>
      </div>
    )}

    {/* overlay gelap saat hover */}
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    {/* tombol lihat detail muncul saat hover */}
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <span className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg">
        Lihat Detail
      </span>
    </div>
  </div>
)


// ─────────────────────────────────────────────
// CHILD COMPONENT — CardTags
// Daftar teknologi atau kategori yang dipakai
// ─────────────────────────────────────────────

const CardTags = ({ tags = [] }) => {
  if (!tags.length) return null

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {tags.slice(0, 3).map((tag, index) => ( // maksimal 3 tag tampil
        <span
          key={index}
          className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-gray-400"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}


// ─────────────────────────────────────────────
// MAIN COMPONENT — PortfolioCard
// Kartu portfolio untuk grid listing
// Props:
//   portfolio : object — data dari API (title, slug, image, category, tags, excerpt)
// ─────────────────────────────────────────────

const PortfolioCard = ({ portfolio }) => {
  const { title, slug, image, category, tags = [], excerpt } = portfolio

  return (
    <Link
      to={ROUTES.PORTFOLIO_DETAIL.replace(':slug', slug)}
      className="group block"
    >
      {/* glass card container */}
      <div className="
        h-full
        bg-white/5 border border-white/10
        backdrop-blur-sm rounded-2xl
        overflow-hidden
        transition-all duration-300
        hover:bg-white/8 hover:border-white/20 hover:shadow-lg hover:shadow-purple-900/20
        hover:-translate-y-1
      ">

        {/* gambar thumbnail */}
        <div className="p-4">
          <CardImage image={image} title={title} />
        </div>

        {/* info konten */}
        <div className="px-4 pb-5">

          {/* kategori project */}
          {category && (
            <span className="text-xs font-medium text-purple-400 uppercase tracking-wider">
              {category}
            </span>
          )}

          {/* judul project */}
          <h3 className="mt-1.5 text-base font-semibold text-white font-heading leading-snug group-hover:text-purple-300 transition-colors duration-200">
            {title}
          </h3>

          {/* deskripsi singkat */}
          {excerpt && (
            <p className="mt-2 text-sm text-gray-400 line-clamp-2 leading-relaxed">
              {excerpt}
            </p>
          )}

          {/* tag teknologi */}
          <CardTags tags={tags} />
        </div>
      </div>
    </Link>
  )
}


// ─────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────

export default PortfolioCard