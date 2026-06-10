// ─────────────────────────────────────────────
// TAILWIND CONFIG — Elevate Pixel Studio
// Ref: Decision 007 (Font), 008 (Theme), 009 (Colors)
// ─────────────────────────────────────────────

/** @type {import('tailwindcss').Config} */
export default {

  // ─────────────────────────────────────────
  // CONTENT SCAN
  // Tailwind memindai semua file jsx/js untuk
  // menghapus class yang tidak digunakan (purge)
  // ─────────────────────────────────────────

  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],


  // ─────────────────────────────────────────
  // THEME EXTENSION
  // Semua custom token ditambahkan di sini
  // agar tidak menimpa default Tailwind
  // ─────────────────────────────────────────

  theme: {
    extend: {

      // ───────────────────────────────────
      // COLORS — Brand Token
      // Single source of truth untuk warna
      // Ref: Decision 009 — AI Tracker
      // ───────────────────────────────────

      colors: {
        brand: {
          primary : '#9B30FF',   // warna utama — tombol, aksen
          light   : '#C678FF',   // hover state, highlight
          dark    : '#6B21A8',   // pressed state, gradient end
        },
        surface: {
          bg      : '#0A0A0A',   // background utama halaman
          card    : 'rgba(255, 255, 255, 0.05)',   // glass card
          border  : 'rgba(255, 255, 255, 0.10)',   // border glass
        },
        content: {
          primary : '#FFFFFF',   // teks utama
          muted   : '#A0A0A0',   // teks sekunder, placeholder
        },
      },


      // ───────────────────────────────────
      // FONT FAMILY
      // Space Grotesk → heading (geometric, tech)
      // Inter         → body (readable, clean)
      // Ref: Decision 007 — AI Tracker
      // ───────────────────────────────────

      fontFamily: {
        heading : ['Space Grotesk', 'sans-serif'],
        body    : ['Inter', 'sans-serif'],
        sans    : ['Inter', 'sans-serif'],   // override default sans
      },


      // ───────────────────────────────────
      // KEYFRAMES
      // Definisi raw animation frames
      // Digunakan oleh utility di bawah
      // ───────────────────────────────────

      keyframes: {

        // Bergerak dari posisi awal ke kiri (-50%)
        // Items diduplikasi 2x → loop tampak seamless
        'marquee': {
          '0%'   : { transform: 'translateX(0%)' },
          '100%' : { transform: 'translateX(-50%)' },
        },

        // Kebalikan — bergerak dari -50% kembali ke 0%
        // Digunakan untuk baris kedua marquee (reverse)
        'marquee-reverse': {
          '0%'   : { transform: 'translateX(-50%)' },
          '100%' : { transform: 'translateX(0%)' },
        },

        // Fade in dari bawah — untuk section reveal
        'fade-up': {
          '0%'   : { opacity: '0', transform: 'translateY(20px)' },
          '100%' : { opacity: '1', transform: 'translateY(0)' },
        },

        // Pulse halus untuk elemen ambient (dot, badge)
        'pulse-soft': {
          '0%, 100%' : { opacity: '1' },
          '50%'      : { opacity: '0.4' },
        },

      },


      // ───────────────────────────────────
      // ANIMATION UTILITIES
      // Binding keyframe → class Tailwind
      // Format: animate-{nama}
      // ───────────────────────────────────

      animation: {

        // animate-marquee → baris 1 (kiri)
        'marquee'         : 'marquee 30s linear infinite',

        // animate-marquee-reverse → baris 2 (kanan)
        'marquee-reverse' : 'marquee-reverse 30s linear infinite',

        // animate-fade-up → reveal on scroll / mount
        'fade-up'         : 'fade-up 0.6s ease-out forwards',

        // animate-pulse-soft → ambient element
        'pulse-soft'      : 'pulse-soft 2.5s ease-in-out infinite',

      },


      // ───────────────────────────────────
      // BACKDROP BLUR
      // Nilai tambahan untuk glass morphism
      // Ref: Decision 008 — backdrop-filter blur(12px)
      // ───────────────────────────────────

      backdropBlur: {
        'glass' : '12px',
      },


      // ───────────────────────────────────
      // BORDER RADIUS
      // Token tambahan untuk konsistensi card
      // ───────────────────────────────────

      borderRadius: {
        'card' : '16px',
      },

    },
  },


  // ─────────────────────────────────────────
  // SAFELIST
  // Class yang di-generate secara dinamis
  // (dari constants/ atau conditional render)
  // tidak akan di-purge oleh Tailwind
  // ─────────────────────────────────────────

  safelist: [
    'animate-marquee',
    'animate-marquee-reverse',
    'animate-fade-up',
    'animate-pulse-soft',
    'backdrop-blur-glass',
    'rounded-card',
  ],


  // ─────────────────────────────────────────
  // PLUGINS
  // Kosong untuk MVP — tidak butuh plugin
  // tambahan seperti @tailwindcss/forms
  // ─────────────────────────────────────────

  plugins: [],

}
