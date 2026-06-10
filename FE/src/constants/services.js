// ─────────────────────────────────────────────
// SERVICES DATA — HARDCODED
// ServiceController di-skip untuk MVP
// Edit di sini untuk update tampilan services
// Ref: Decision 015 — AI Tracker
// ─────────────────────────────────────────────

export const SERVICES = [
  {
    id:          1,
    title:       'Website Design & Development',
    slug:        'website-design-development',
    description: 'Website profesional yang cepat, responsif, dan dioptimalkan untuk konversi.',
    icon:        '🌐',
  },
  {
    id:          2,
    title:       'Creative Design',
    slug:        'creative-design',
    description: 'Desain visual yang kuat dan berkesan untuk memperkuat identitas brand kamu.',
    icon:        '🎨',
  },
  {
    id:          3,
    title:       'Branding',
    slug:        'branding',
    description: 'Membangun brand identity yang konsisten dan memorable dari nol.',
    icon:        '✦',
  },
  {
    id:          4,
    title:       'Digital Marketing',
    slug:        'digital-marketing',
    description: 'Strategi digital marketing yang terukur untuk meningkatkan traffic dan leads.',
    icon:        '📈',
  },
  {
    id:          5,
    title:       'Landing Page',
    slug:        'landing-page',
    description: 'Landing page yang dioptimalkan untuk konversi dan campaign marketing.',
    icon:        '🚀',
  },
  {
    id:          6,
    title:       'UI/UX Design',
    slug:        'ui-ux-design',
    description: 'Desain antarmuka yang intuitif dan pengalaman pengguna yang menyenangkan.',
    icon:        '🖥️',
  },
]

export const WHATSAPP_NUMBER = '628996683031'

export const WHATSAPP_URL = (message = 'Halo, saya ingin konsultasi mengenai layanan Elevate Pixel Studio.') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export const MARQUEE_ITEMS = [
  'Website Design',
  'Branding',
  'Digital Marketing',
  'Landing Page',
  'UI/UX Design',
  'Creative Design',
  'Logo Design',
  'Social Media',
  'SEO Optimization',
  'Web Development',
]