// ─────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────

import { Link } from 'react-router-dom'


// ─────────────────────────────────────────────
// HELPER — formatPrice
// Format angka ke format Rupiah
// ─────────────────────────────────────────────

const formatPrice = (price) => {
  if (!price && price !== 0) return 'Hubungi kami'
  if (price === 0) return 'Gratis'
  return new Intl.NumberFormat('id-ID', {
    style:    'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}


// ─────────────────────────────────────────────
// CHILD COMPONENT — ProductBadge
// Badge kategori atau label produk
// ─────────────────────────────────────────────

const ProductBadge = ({ label, variant = 'default' }) => {
  // varian warna badge
  const variantClass = {
    default: 'bg-white/5 border-white/10 text-gray-400',
    new:     'bg-purple-500/20 border-purple-500/30 text-purple-300',
    sale:    'bg-green-500/20 border-green-500/30 text-green-300',
  }[variant] ?? 'bg-white/5 border-white/10 text-gray-400'

  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${variantClass}`}>
      {label}
    </span>
  )
}


// ─────────────────────────────────────────────
// CHILD COMPONENT — ProductImage
// Gambar preview produk digital
// ─────────────────────────────────────────────

const ProductImage = ({ image, title }) => (
  <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-white/5">
    {image ? (
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    ) : (
      // placeholder jika tidak ada preview gambar
      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
        <span className="text-3xl opacity-30">📦</span>
        <span className="text-xs text-gray-600">Preview tidak tersedia</span>
      </div>
    )}
  </div>
)


// ─────────────────────────────────────────────
// MAIN COMPONENT — ProductCard
// Kartu produk digital untuk marketplace (Phase 2)
// Props:
//   product : object — data dari API
//             (id, title, slug, image, category, price, description, is_new)
// ─────────────────────────────────────────────

const ProductCard = ({ product }) => {
  const {
    title,
    slug,
    image,
    category,
    price,
    description,
    is_new = false,
  } = product

  return (
    <Link
      to={`/products/${slug}`} // route Phase 2 — belum aktif di MVP
      className="group block h-full"
    >
      {/* glass card container */}
      <div className="
        h-full flex flex-col
        bg-white/5 border border-white/10
        backdrop-blur-sm rounded-2xl
        overflow-hidden
        transition-all duration-300
        hover:bg-white/8 hover:border-purple-500/30
        hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-900/25
      ">

        {/* gambar preview */}
        <div className="p-4 flex-shrink-0">
          <ProductImage image={image} title={title} />
        </div>

        {/* info produk */}
        <div className="px-4 pb-5 flex flex-col flex-1">

          {/* kategori dan badge baru */}
          <div className="flex items-center gap-2 flex-wrap">
            {category && <ProductBadge label={category} />}
            {is_new && <ProductBadge label="Baru" variant="new" />}
          </div>

          {/* nama produk */}
          <h3 className="mt-2 text-base font-semibold text-white font-heading leading-snug group-hover:text-purple-300 transition-colors duration-200">
            {title}
          </h3>

          {/* deskripsi singkat */}
          {description && (
            <p className="mt-1.5 text-sm text-gray-400 line-clamp-2 leading-relaxed flex-1">
              {description}
            </p>
          )}

          {/* harga di bagian bawah */}
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-lg font-bold text-white font-heading">
              {formatPrice(price)}
            </span>

            {/* tombol beli — aktif di Phase 2 */}
            <span className="
              px-3 py-1.5 text-xs font-medium rounded-lg
              bg-purple-600/20 border border-purple-500/30 text-purple-300
              group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600
              transition-all duration-200
            ">
              Detail
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}


// ─────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────

export default ProductCard