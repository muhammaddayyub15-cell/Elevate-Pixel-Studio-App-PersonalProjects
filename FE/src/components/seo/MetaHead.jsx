// ─────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────

import { useEffect } from 'react'


// ─────────────────────────────────────────────
// CONSTANTS — DEFAULT META
// Nilai default jika prop tidak dikirim
// ─────────────────────────────────────────────

const DEFAULT_META = {
  title:       'Elevate Pixel Studio — Creative Agency & Digital Products',
  description: 'Elevate Pixel Studio adalah creative agency yang membantu bisnis kamu tumbuh melalui website, branding, dan digital marketing profesional.',
  keywords:    'creative agency, website design, branding, digital marketing, landing page, UI/UX design, Elevate Pixel Studio',
  ogImage:     '/og-image.jpg', // letakkan file di folder public/
  siteUrl:     'https://elevatepixelstudio.com',
  twitterHandle: '@elevatepixel',
}


// ─────────────────────────────────────────────
// HELPER — setMeta
// Set atau update tag meta di document head
// ─────────────────────────────────────────────

const setMeta = (name, content, isProperty = false) => {
  if (!content) return

  // cari tag yang sudah ada
  const attr     = isProperty ? 'property' : 'name'
  let   existing = document.querySelector(`meta[${attr}="${name}"]`)

  if (!existing) {
    // buat baru jika belum ada
    existing = document.createElement('meta')
    existing.setAttribute(attr, name)
    document.head.appendChild(existing)
  }

  existing.setAttribute('content', content)
}


// ─────────────────────────────────────────────
// MAIN COMPONENT — MetaHead
// Mengatur meta tags untuk SEO dan social sharing
// Gunakan di setiap halaman untuk meta yang berbeda
// Props:
//   title       : string — judul halaman (otomatis append nama brand)
//   description : string — deskripsi halaman
//   keywords    : string — kata kunci (pisahkan dengan koma)
//   ogImage     : string — URL gambar untuk Open Graph
//   canonicalUrl: string — URL canonical halaman ini
//   noIndex     : boolean — true untuk halaman admin/private
// ─────────────────────────────────────────────

const MetaHead = ({
  title,
  description,
  keywords,
  ogImage,
  canonicalUrl,
  noIndex = false,
}) => {

  useEffect(() => {

    // ── Susun judul halaman dengan nama brand
    const fullTitle = title
      ? `${title} — Elevate Pixel Studio`
      : DEFAULT_META.title

    // ── Set judul tab browser
    document.title = fullTitle

    // ── Meta dasar
    setMeta('description',       description || DEFAULT_META.description)
    setMeta('keywords',          keywords    || DEFAULT_META.keywords)

    // ── Robots — sembunyikan dari index jika noIndex
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow')

    // ── Open Graph (untuk preview link di sosmed)
    setMeta('og:title',          fullTitle,                          true)
    setMeta('og:description',    description || DEFAULT_META.description, true)
    setMeta('og:image',          ogImage     || DEFAULT_META.ogImage,     true)
    setMeta('og:type',           'website',                          true)
    setMeta('og:url',            canonicalUrl || window.location.href, true)
    setMeta('og:site_name',      'Elevate Pixel Studio',             true)

    // ── Twitter Card
    setMeta('twitter:card',      'summary_large_image')
    setMeta('twitter:title',     fullTitle)
    setMeta('twitter:description', description || DEFAULT_META.description)
    setMeta('twitter:image',     ogImage     || DEFAULT_META.ogImage)
    setMeta('twitter:site',      DEFAULT_META.twitterHandle)

    // ── Canonical URL — hindari konten duplikat
    if (canonicalUrl) {
      let canonicalTag = document.querySelector('link[rel="canonical"]')
      if (!canonicalTag) {
        canonicalTag = document.createElement('link')
        canonicalTag.setAttribute('rel', 'canonical')
        document.head.appendChild(canonicalTag)
      }
      canonicalTag.setAttribute('href', canonicalUrl)
    }

  }, [title, description, keywords, ogImage, canonicalUrl, noIndex])

  // komponen ini tidak render elemen HTML apapun
  return null
}


// ─────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────

export default MetaHead