// ─────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────

import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants'


// ─────────────────────────────────────────────
// HELPER — formatDate
// Format tanggal ke bahasa Indonesia
// ─────────────────────────────────────────────

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('id-ID', {
    day:   'numeric',
    month: 'long',
    year:  'numeric',
  })
}


// ─────────────────────────────────────────────
// CHILD COMPONENT — CardThumbnail
// Gambar thumbnail artikel blog
// ─────────────────────────────────────────────

const CardThumbnail = ({ image, title }) => (
  <div className="relative overflow-hidden rounded-xl aspect-video bg-white/5">
    {image ? (
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    ) : (
      // fallback thumbnail jika tidak ada gambar
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-4xl opacity-20">📝</span>
      </div>
    )}
  </div>
)


// ─────────────────────────────────────────────
// CHILD COMPONENT — CardMeta
// Info penulis, tanggal, dan estimasi baca
// ─────────────────────────────────────────────

const CardMeta = ({ author, publishedAt, readTime }) => (
  <div className="flex items-center gap-3 text-xs text-gray-500">

    {/* nama penulis */}
    {author && (
      <span className="text-gray-400">{author}</span>
    )}

    {/* pemisah titik */}
    {author && publishedAt && (
      <span className="w-1 h-1 rounded-full bg-gray-600 flex-shrink-0" />
    )}

    {/* tanggal publish */}
    {publishedAt && (
      <span>{formatDate(publishedAt)}</span>
    )}

    {/* estimasi waktu baca */}
    {readTime && (
      <>
        <span className="w-1 h-1 rounded-full bg-gray-600 flex-shrink-0" />
        <span>{readTime} menit baca</span>
      </>
    )}
  </div>
)


// ─────────────────────────────────────────────
// MAIN COMPONENT — BlogCard
// Kartu artikel blog untuk grid listing
// Props:
//   blog : object — data dari API
//          (title, slug, image, category, excerpt, author, published_at, read_time)
// ─────────────────────────────────────────────

const BlogCard = ({ blog }) => {
  const {
    title,
    slug,
    image,
    category,
    excerpt,
    author,
    published_at,
    read_time,
  } = blog

  return (
    <Link
      to={ROUTES.BLOG_DETAIL.replace(':slug', slug)}
      className="group block h-full"
    >
      {/* glass card container */}
      <article className="
        h-full flex flex-col
        bg-white/5 border border-white/10
        backdrop-blur-sm rounded-2xl
        overflow-hidden
        transition-all duration-300
        hover:bg-white/8 hover:border-white/20
        hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-900/20
      ">

        {/* thumbnail artikel */}
        <div className="p-4 flex-shrink-0">
          <CardThumbnail image={image} title={title} />
        </div>

        {/* konten teks */}
        <div className="px-4 pb-5 flex flex-col flex-1">

          {/* kategori artikel */}
          {category && (
            <span className="text-xs font-medium text-purple-400 uppercase tracking-wider">
              {category}
            </span>
          )}

          {/* judul artikel */}
          <h3 className="mt-1.5 text-base font-semibold text-white font-heading leading-snug group-hover:text-purple-300 transition-colors duration-200">
            {title}
          </h3>

          {/* ringkasan artikel */}
          {excerpt && (
            <p className="mt-2 text-sm text-gray-400 line-clamp-3 leading-relaxed flex-1">
              {excerpt}
            </p>
          )}

          {/* meta info di bagian bawah card */}
          <div className="mt-4 pt-4 border-t border-white/5">
            <CardMeta
              author={author}
              publishedAt={published_at}
              readTime={read_time}
            />
          </div>
        </div>
      </article>
    </Link>
  )
}


// ─────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────

export default BlogCard