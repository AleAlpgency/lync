import type { Metadata } from 'next'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

export const metadata: Metadata = {
  title: { absolute: 'Student Housing Abroad | LYNC' },
  description:
    'Verified student housing across Europe through our partner Student Housing Abroad, with $50 off your booking fee for the LYNC community.',
  openGraph: {
    images: [{ url: '/brand/SHA/florence.webp', alt: 'Florence at sunset' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Housing Abroad | LYNC',
    description: 'Verified student housing across Europe, with $50 off your booking fee for the LYNC community.',
    images: [{ url: '/brand/SHA/florence.webp', alt: 'Florence at sunset' }],
  },
}

export default function AccommodationsPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative flex h-[70vh] min-h-[480px] items-end">
        <Image
          src="/brand/SHA/florence.webp"
          alt="Florence at sunset"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/92 via-dark/50 to-black/25" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-12 sm:px-8 md:pb-16">
          <ScrollReveal>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-white/70">
              Accommodations
            </p>
            <h1 className="mb-3 font-display text-5xl font-semibold uppercase tracking-normal text-white md:text-7xl">
              Student Housing Abroad
            </h1>
            <p className="mb-5 max-w-xl text-lg text-white/80 md:text-xl">
              Verified student housing across Europe, $50 off for LYNC
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Student Housing Abroad panel ──────────────── */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ScrollReveal>
            <h2 className="mb-4 text-center font-display text-4xl font-semibold uppercase tracking-normal md:text-5xl">
              Where Are You Headed?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-lg text-muted">
              Studying abroad? Our partner Student Housing Abroad has
              verified housing across Europe, with $50 off your booking fee
              for the LYNC community.
            </p>
          </ScrollReveal>
          <div className="mb-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
            {[
              { src: 'madrid', city: 'Madrid', span: 'col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto' },
              { src: 'rome', city: 'Rome', span: 'aspect-[4/3]' },
              { src: 'florence', city: 'Florence', span: 'aspect-[4/3]' },
              { src: 'milan', city: 'Milan', span: 'aspect-[4/3]' },
              { src: 'cinque-terre', city: 'Cinque Terre', span: 'aspect-[4/3]' },
            ].map((c, i) => (
              <ScrollReveal key={c.src} delay={i * 0.06} className={`group relative overflow-hidden rounded-2xl ${c.span}`}>
                <Image
                  src={`/brand/SHA/${c.src}.webp`}
                  alt={c.city}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                <h3 className="absolute bottom-4 left-5 font-display text-lg font-semibold uppercase tracking-normal text-white">
                  {c.city}
                </h3>
              </ScrollReveal>
            ))}
          </div>
          {/* Partner embed: its CSP only allows lyncevents.com, so it stays blank on previews and localhost. No sandbox attribute, the buttons need popups. */}
          <iframe
            title="Find student housing abroad"
            src="https://www.studenthousingabroad.com/embed/affiliate/LyncEvents"
            className="h-[1320px] w-full border-0 max-[640px]:h-[1400px] max-[360px]:h-[1580px]"
          />
        </div>
      </section>
    </>
  )
}
