// ─────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────

import { MARQUEE_ITEMS } from '../../../constants/services'


// ─────────────────────────────────────────────
// CHILD COMPONENT — MarqueeTrack
// Satu baris marquee yang bergerak ke kiri
// Diduplikasi agar pergerakan tampak seamless
// ─────────────────────────────────────────────

const MarqueeTrack = ({ items, reverse = false }) => (
  <div className={`flex gap-8 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
    {/* duplikasi item dua kali untuk seamless loop */}
    {[...items, ...items].map((item, index) => (
      <div
        key={index}
        className="flex items-center gap-3 flex-shrink-0"
      >
        {/* teks item */}
        <span className="text-sm font-medium text-gray-400 whitespace-nowrap hover:text-purple-400 transition-colors duration-200 cursor-default">
          {item}
        </span>

        {/* pemisah diamond antar item */}
        <span className="text-purple-600/60 text-xs flex-shrink-0">◆</span>
      </div>
    ))}
  </div>
)


// ─────────────────────────────────────────────
// MAIN COMPONENT — MarqueeSection
// Dua baris ticker berlawanan arah
// Baris 1: kiri → kanan | Baris 2: kanan → kiri
// Ref: Decision 011
// ─────────────────────────────────────────────

const MarqueeSection = () => (
  <section className="py-8 overflow-hidden border-y border-white/5 relative">

    {/* efek fade kiri dan kanan agar edge tampak mulus */}
    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

    {/* baris 1 — bergerak ke kiri */}
    <div className="flex overflow-hidden mb-4">
      <MarqueeTrack items={MARQUEE_ITEMS} />
    </div>

    {/* baris 2 — bergerak ke kanan (reverse) */}
    <div className="flex overflow-hidden">
      <MarqueeTrack items={[...MARQUEE_ITEMS].reverse()} reverse />
    </div>
  </section>
)


// ─────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────

export default MarqueeSection