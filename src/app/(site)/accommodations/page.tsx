import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, Star } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import SpotlightCard from '@/components/ui/spotlight-card'
import { CtaMotionLink } from '@/components/ui/cta-hover'
import { HighlightStroke } from '@/components/ui/highlight-stroke'
import {
  features,
  roomTypes,
  amenities,
  exclusiveOffer,
} from '@/data/accommodations'
import { CopyPromoCode } from './copy-promo-code'

export const metadata: Metadata = {
  title: { absolute: 'Collegiate Madrid — Premium Student Living | LYNC' },
  description:
    'Exclusive student accommodation in the heart of Madrid. Private studios, rooftop terrace, gym, cinema room, and an exclusive €200 LYNC discount.',
  openGraph: {
    images: [{ url: '/brand/COLLEGIATE/hero.avif', width: 1920, height: 800, alt: 'Collegiate Madrid' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Collegiate Madrid — Premium Student Living | LYNC',
    description: 'Exclusive student accommodation in the heart of Madrid. Private studios, world-class amenities, and an exclusive LYNC discount.',
    images: [{ url: '/brand/COLLEGIATE/hero.avif', alt: 'Collegiate Madrid' }],
  },
}

export default function AccommodationsPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative flex h-[70vh] min-h-[480px] items-end">
        <Image
          src="/brand/COLLEGIATE/hero.avif"
          alt="Collegiate Madrid — city skyline"
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
            <h1 className="mb-3 flex items-center gap-4 font-display text-5xl font-semibold uppercase tracking-normal text-white md:text-7xl">
              Collegiate Madrid
              <Image
                src="/brand/COLLEGIATE/icon.png"
                alt="Collegiate logo"
                width={64}
                height={64}
                className="inline-block drop-shadow-lg"
              />
            </h1>
            <p className="mb-5 max-w-xl text-lg text-white/80 md:text-xl">
              Premium Student Living in the Heart of Madrid
            </p>

            {/* Rating badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 backdrop-blur-sm">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-white">4.9</span>
              <span className="text-sm text-white/60">(5,307 reviews)</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Intro ─────────────────────────────────────── */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <ScrollReveal>
            <h2 className="mb-6 font-display text-4xl font-semibold uppercase tracking-normal md:text-5xl">
              Your Home in{' '}
              <span className="relative inline-block">
                Madrid
                <HighlightStroke
                  className="absolute -bottom-1 left-0 w-full"
                  strokeWidth={5}
                />
              </span>
            </h2>
            <p className="text-lg leading-relaxed text-muted md:text-xl">
              Collegiate Madrid offers fully furnished private studios with
              world-class amenities, a vibrant resident community, and an
              unbeatable central location. It&apos;s not just a place to stay
              — it&apos;s where your Madrid life begins.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Features Grid ─────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ScrollReveal>
            <h2 className="mb-14 text-center font-display text-4xl font-semibold uppercase tracking-normal md:text-5xl">
              What&apos;s Included
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.06}>
                <SpotlightCard className="h-full rounded-2xl border border-border bg-white p-6">
                  <span className="mb-3 block text-3xl">{f.emoji}</span>
                  <h3 className="mb-2 font-display text-lg font-semibold uppercase tracking-normal">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {f.description}
                  </p>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Exclusive Offer Banner ────────────────────── */}
      <section className="bg-lync py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <ScrollReveal>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-white/70">
              Exclusive Partner Discount
            </p>
            <h2 className="mb-4 font-display text-4xl font-semibold uppercase tracking-normal text-white md:text-5xl">
              {exclusiveOffer.discount}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">
              {exclusiveOffer.description}
            </p>

            <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <CopyPromoCode code={exclusiveOffer.promoCode} />
            </div>

            <CtaMotionLink
              href={exclusiveOffer.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-dark transition-colors hover:bg-cream"
            >
              {exclusiveOffer.cta} <ArrowRight size={20} />
            </CtaMotionLink>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Room Types ────────────────────────────────── */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ScrollReveal>
            <h2 className="mb-14 text-center font-display text-4xl font-semibold uppercase tracking-normal md:text-5xl">
              Room Types
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {roomTypes.map((room, i) => (
              <ScrollReveal key={room.title} delay={i * 0.1}>
                <div className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={room.image}
                      alt={room.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 font-display text-xl font-semibold uppercase tracking-normal">
                      {room.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-muted">
                      {room.description}
                    </p>
                    <ul className="space-y-2">
                      {room.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-center gap-2 text-sm text-muted"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lync" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Communal Spaces ───────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ScrollReveal>
            <h2 className="mb-14 text-center font-display text-4xl font-semibold uppercase tracking-normal md:text-5xl">
              Communal Spaces
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {amenities.map((a, i) => (
              <ScrollReveal key={a.title} delay={i * 0.08}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-5 font-display text-lg font-semibold uppercase tracking-normal text-white">
                    {a.title}
                  </h3>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lifestyle Banner ──────────────────────────── */}
      <section className="relative flex h-[40vh] min-h-[320px] items-center justify-center">
        <Image
          src="/brand/COLLEGIATE/lifestyle.jpg"
          alt="Collegiate Madrid community events"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-dark/50" />
        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-8">
          <ScrollReveal>
            <h2 className="mb-4 font-display text-4xl font-semibold uppercase tracking-normal text-white md:text-5xl">
              More Than a Residence
            </h2>
            <p className="text-lg text-white/80 md:text-xl">
              From rooftop socials to cultural outings, Collegiate Madrid
              keeps your calendar full and your social circle growing.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Student Housing Abroad panel ──────────────── */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ScrollReveal>
            <h2 className="mb-14 text-center font-display text-4xl font-semibold uppercase tracking-normal md:text-5xl">
              Find Student Housing Abroad
            </h2>
          </ScrollReveal>
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
