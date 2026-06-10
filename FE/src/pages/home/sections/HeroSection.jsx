// ─────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────

import { Link } from 'react-router-dom'
import { ROUTES }         from '../../../constants'
import { WHATSAPP_URL }   from '../../../constants'


// ─────────────────────────────────────────────
// CONSTANTS — DATA KARTU 3D
// Preview layanan yang ditampilkan di hero visual
// ─────────────────────────────────────────────

const FLOATING_CARDS = [
  { icon: '🌐', label: 'Website Design',    color: 'from-purple-500/20 to-purple-900/10' },
  { icon: '🎨', label: 'Creative Design',   color: 'from-pink-500/20 to-purple-900/10'   },
  { icon: '✦',  label: 'Branding',          color: 'from-violet-500/20 to-purple-900/10' },
  { icon: '📈', label: 'Digital Marketing', color: 'from-indigo-500/20 to-purple-900/10' },
  { icon: '🚀', label: 'Landing Page',      color: 'from-blue-500/20 to-purple-900/10'   },
]


// ─────────────────────────────────────────────
// CHILD COMPONENT — HeroBadge
// Label kecil di atas heading utama
// ─────────────────────────────────────────────

const HeroBadge = () => (
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
    {/* titik hijau animasi — menandakan studio aktif */}
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
    </span>
    <span className="text-sm text-gray-300 font-medium">Available for new projects</span>
  </div>
)


// ─────────────────────────────────────────────
// CHILD COMPONENT — HeroHeading
// Judul utama dengan highlight warna brand
// ─────────────────────────────────────────────

const HeroHeading = () => (
  <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight">
    We{' '}
    {/* kata highlight dengan gradient */}
    <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
      Elevate
    </span>
    {' '}Your<br />
    Digital{' '}
    <span className="relative inline-block">
      Presence
      {/* garis bawah dekoratif */}
      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
    </span>
  </h1>
)


// ─────────────────────────────────────────────
// CHILD COMPONENT — HeroCTAButtons
// Dua tombol aksi utama
// ─────────────────────────────────────────────

const HeroCTAButtons = () => (
  <div className="flex flex-col sm:flex-row gap-4">

    {/* tombol utama — lihat portfolio */}
    <Link
      to={ROUTES.PORTFOLIO}
      className="
        inline-flex items-center justify-center gap-2
        px-6 py-3.5 rounded-xl
        bg-purple-600 hover:bg-purple-500
        text-white font-semibold text-sm
        transition-all duration-200
        hover:shadow-lg hover:shadow-purple-500/30
        hover:-translate-y-0.5
      "
    >
      Lihat Portfolio
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </Link>

    {/* tombol sekunder — konsultasi WhatsApp */}
    <a
      href={WHATSAPP_URL('Halo, saya ingin konsultasi project dengan Elevate Pixel Studio.')}
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-flex items-center justify-center gap-2
        px-6 py-3.5 rounded-xl
        bg-white/5 border border-white/10 hover:bg-white/10
        text-white font-semibold text-sm
        transition-all duration-200
        hover:-translate-y-0.5
      "
    >
      Konsultasi Gratis
    </a>
  </div>
)


// ─────────────────────────────────────────────
// CHILD COMPONENT — FloatingCard
// Satu kartu layanan dengan animasi float
// animDelay mengatur delay tiap kartu agar bergantian
// ─────────────────────────────────────────────

const FloatingCard = ({ card, animDelay, position }) => (
  <div
    className={`
      absolute ${position}
      flex items-center gap-3
      px-4 py-3
      bg-gradient-to-br ${card.color}
      border border-white/10
      backdrop-blur-md rounded-xl
      shadow-xl shadow-black/30
      animate-float
      hover:scale-105 transition-transform duration-300
      cursor-default
    `}
    style={{ animationDelay: animDelay }}
  >
    <span className="text-xl">{card.icon}</span>
    <span className="text-sm font-medium text-white whitespace-nowrap">{card.label}</span>
  </div>
)


// ─────────────────────────────────────────────
// CHILD COMPONENT — Hero3DVisual
// Kumpulan kartu floating membentuk komposisi 3D
// Posisi setiap kartu diatur secara manual
// ─────────────────────────────────────────────

const Hero3DVisual = () => {
  // posisi CSS absolute untuk setiap kartu
  const positions = [
    'top-[8%]  left-[5%]',
    'top-[30%] right-[2%]',
    'top-[55%] left-[10%]',
    'bottom-[15%] right-[8%]',
    'top-[10%] right-[25%]',
  ]

  // delay animasi berbeda tiap kartu — efek bergantian
  const delays = ['0s', '0.6s', '1.2s', '1.8s', '2.4s']

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px]">

      {/* lingkaran cahaya di tengah — ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 rounded-full bg-purple-600/15 blur-3xl" />
      </div>

      {/* panel utama tengah — glass card besar */}
      <div className="
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-56 h-64 lg:w-64 lg:h-72
        bg-white/5 border border-white/10
        backdrop-blur-xl rounded-2xl
        flex flex-col items-center justify-center gap-3
        shadow-2xl shadow-purple-900/30
      ">
        {/* logo placeholder */}
        <div className="w-16 h-16 rounded-2xl bg-purple-600/30 border border-purple-500/30 flex items-center justify-center">
          <span className="text-3xl">✦</span>
        </div>
        <span className="text-sm font-semibold text-white font-heading">Elevate Pixel</span>
        <span className="text-xs text-gray-500">Creative Studio</span>

        {/* garis dekorasi */}
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

        <span className="text-xs text-gray-400 px-4 text-center">
          Turning ideas into digital reality
        </span>
      </div>

      {/* kartu-kartu layanan mengambang */}
      {FLOATING_CARDS.map((card, index) => (
        <FloatingCard
          key={card.label}
          card={card}
          animDelay={delays[index]}
          position={positions[index]}
        />
      ))}
    </div>
  )
}


// ─────────────────────────────────────────────
// CHILD COMPONENT — HeroStats
// Angka komitmen studio — bukan data palsu
// Ref: Decision 011
// ─────────────────────────────────────────────

const HeroStats = () => {
  const stats = [
    { value: '3 Hari', label: 'Delivery Cepat' },
    { value: '100%',   label: 'Custom Design'  },
    { value: '24/7',   label: 'Support'         },
  ]

  return (
    <div className="flex gap-8 pt-2">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col">
          <span className="text-2xl font-bold text-white font-heading">{stat.value}</span>
          <span className="text-xs text-gray-500 mt-0.5">{stat.label}</span>
        </div>
      ))}
    </div>
  )
}


// ─────────────────────────────────────────────
// MAIN COMPONENT — HeroSection
// Section pertama homepage — above the fold
// Terdiri dari: teks kiri + visual kartu 3D kanan
// ─────────────────────────────────────────────

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden pt-20">

    {/* background gradient radial dari atas */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full" />
    </div>

    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

        {/* ── KOLOM KIRI: teks konten utama */}
        <div className="flex flex-col gap-8 relative z-10">
          <HeroBadge />
          <HeroHeading />

          <p className="text-base lg:text-lg text-gray-400 leading-relaxed max-w-md">
            Kami membantu bisnis kamu tumbuh dengan website profesional,
            branding yang kuat, dan strategi digital yang terukur.
          </p>

          <HeroCTAButtons />
          <HeroStats />
        </div>

        {/* ── KOLOM KANAN: visual kartu 3D floating */}
        <div className="relative z-10 hidden lg:block">
          <Hero3DVisual />
        </div>
      </div>
    </div>
  </section>
)


// ─────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────

export default HeroSection