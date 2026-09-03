import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { HighlightStroke } from '@/components/ui/highlight-stroke'
import { CtaMotionA } from '@/components/ui/cta-hover'
import { EventsGrid } from '@/components/events/events-grid'
import { getUpcomingEvents } from '@/lib/acuity'

export const metadata: Metadata = {
  title: 'Upcoming Events',
  description:
    'Browse and book upcoming LYNC events in Madrid — from yoga sessions to rooftop cocktails. Meet amazing women and build real friendships.',
  openGraph: {
    images: [{ url: '/brand/COMMUNITY/social-bar-chic-wide-shot.webp', width: 1200, height: 630, alt: 'LYNC community event in Madrid' }],
  },
}

export default async function EventsPage() {
  const events = await getUpcomingEvents()

  return (
    <>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative flex h-[45vh] min-h-[340px] items-end">
        <Image
          src="/brand/COMMUNITY/social-bar-chic-wide-shot.webp"
          alt="LYNC community event"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/92 via-dark/50 to-black/25" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-12 sm:px-8 md:pb-16">
          <ScrollReveal>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-white/70">
              This Month at LYNC
            </p>
            <h1 className="mb-3 font-display text-5xl font-semibold uppercase tracking-normal text-white md:text-7xl">
              Upcoming{' '}
              <span className="relative inline-block">
                Events
                <HighlightStroke
                  className="absolute -bottom-1 left-0 w-full"
                  strokeWidth={5}
                />
              </span>
            </h1>
            <p className="max-w-xl text-lg text-white/80 md:text-xl">
              From yoga sessions to rooftop cocktails — find your next
              adventure and make friends along the way.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Events Grid ─────────────────────────────────── */}
      <section className="bg-cream pt-6 pb-10 md:pt-8 md:pb-14">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <EventsGrid events={events} />
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="bg-dark py-16 text-center text-white md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ScrollReveal>
            <h2 className="mb-6 font-display text-4xl font-semibold uppercase tracking-normal md:text-5xl">
              Don&apos;t See Your Vibe?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-white/70">
              New events drop every month. Sign up and we&apos;ll send them
              to you first.
            </p>
            <CtaMotionA
              href="/quiz"
              className="inline-flex items-center gap-2 rounded-full bg-lync px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-lync-dark"
            >
              Sign Up <ArrowRight size={20} />
            </CtaMotionA>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
