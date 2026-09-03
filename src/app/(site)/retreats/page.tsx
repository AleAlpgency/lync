import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { CtaMotionLink } from '@/components/ui/cta-hover'
import { EventCard } from '@/components/events/event-card'
import { RetreatCardExtended } from '@/components/retreats/retreat-card-extended'
import { getUpcomingRetreats } from '@/lib/acuity'
import { getAllRetreats } from '@/lib/sanity/fetchers'

const FALLBACK_HERO = '/brand/RETREATS/solstice-sunset-group.webp'

export async function generateMetadata(): Promise<Metadata> {
  const retreats = await getAllRetreats()
  const heroImage = retreats[0]?.images.hero || FALLBACK_HERO

  return {
    title: 'Retreats',
    description:
      'Transformative women\'s retreats by LYNC — from Costa Rica to beyond. Small groups, deep connection, and experiences you\'ll carry home forever.',
    openGraph: {
      images: [
        {
          url: heroImage,
          width: 1200,
          height: 630,
          alt: 'LYNC Retreats',
        },
      ],
    },
  }
}

export default async function RetreatsPage() {
  const [retreats, retreatEvents] = await Promise.all([
    getAllRetreats(),
    getUpcomingRetreats(),
  ])

  const heroImage = retreats[0]?.images.hero || FALLBACK_HERO

  return (
    <>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative flex h-[45vh] min-h-[300px] items-end sm:min-h-[340px]">
        <Image
          src={heroImage}
          alt="LYNC retreat group at sunset"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/92 via-dark/50 to-black/25" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-10 sm:px-8 sm:pb-12 md:pb-16">
          <ScrollReveal>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/70 sm:text-sm">
              Travel With Purpose
            </p>
            <h1 className="mb-2 font-display text-4xl font-semibold uppercase tracking-normal text-white sm:mb-3 sm:text-5xl md:text-7xl">
              Our Retreats
            </h1>
            <p className="max-w-xl text-base text-white/80 sm:text-lg md:text-xl">
              Small-group retreats designed for deep connection,
              transformation, and the kind of memories that change
              everything.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Retreat Cards Grid ─────────────────────────── */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col gap-8">
            {retreats.map((retreat, i) => (
              <ScrollReveal key={retreat.slug} delay={i * 0.08}>
                <RetreatCardExtended retreat={retreat} reversed={i % 2 !== 0} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── More Retreats (Acuity) ────────────────────── */}
      {retreatEvents.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <ScrollReveal>
              <h2 className="mb-10 text-center font-display text-3xl font-semibold uppercase tracking-normal md:text-4xl">
                More Retreats
              </h2>
            </ScrollReveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {retreatEvents.map((event, i) => (
                <ScrollReveal key={event.id} delay={i * 0.08} className="h-full">
                  <EventCard event={event} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ───────────────────────────────── */}
      <section className="bg-dark py-16 text-center text-white md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ScrollReveal>
            <h2 className="mb-6 font-display text-4xl font-semibold uppercase tracking-normal md:text-5xl">
              Ready for Your Next Adventure?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-pretty text-xl text-white/70">
              Spots are limited. Reserve your place and travel
              with an amazing group of&nbsp;women.
            </p>
            <CtaMotionLink
              href="/quiz"
              className="inline-flex items-center gap-2 rounded-full bg-lync px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-lync-dark"
            >
              Sign Up <ArrowRight size={20} />
            </CtaMotionLink>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
