import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { CtaMotionLink, CtaMotionA } from '@/components/ui/cta-hover'
import { HighlightStroke } from '@/components/ui/highlight-stroke'
import { guides } from '@/data/guides'

export const metadata: Metadata = {
  title: 'Guides',
  description:
    'Practical, community-curated ebooks to help you move to, live in, and thrive in Madrid. From relocation checklists to restaurant guides.',
  openGraph: {
    images: [{ url: '/brand/GUIDES/madrid-guide.png', width: 1200, height: 630, alt: 'LYNC Madrid Guides' }],
  },
}

export default function GuidesPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="bg-cream pb-10 pt-28 md:pb-14 md:pt-32">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <ScrollReveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-lync">
              Ebooks &amp; Guides
            </p>
            <h1 className="mb-5 font-display text-5xl font-semibold uppercase tracking-normal md:text-6xl">
              Your Madrid{' '}
              <span className="relative inline-block">
                Playbook
                <HighlightStroke
                  className="absolute -bottom-1 left-0 w-full"
                  strokeWidth={5}
                />
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted md:text-xl">
              Practical, community-curated ebooks packed with insider
              knowledge to help you move to, live in, and thrive in Madrid.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Guide Cards ───────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col gap-16 md:gap-20">
            {guides.map((guide, i) => {
              const reversed = i % 2 !== 0
              return (
                <ScrollReveal key={guide.title} delay={0.05}>
                  <div
                    className={`flex flex-col items-center gap-8 md:gap-12 lg:gap-16 ${
                      reversed ? 'md:flex-row-reverse' : 'md:flex-row'
                    }`}
                  >
                    {/* Image */}
                    <div className="w-full md:w-1/2">
                      <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface shadow-sm">
                        <Image
                          src={guide.image}
                          alt={guide.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-1/2">
                      <h2 className="mb-3 font-display text-3xl font-semibold uppercase tracking-normal md:text-4xl">
                        {guide.title}
                      </h2>
                      <p className="mb-5 leading-relaxed text-muted">
                        {guide.description}
                      </p>

                      <ul className="mb-6 space-y-2.5">
                        {guide.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-center gap-2.5 text-sm text-dark"
                          >
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lync" />
                            {h}
                          </li>
                        ))}
                      </ul>

                      {/* Pricing */}
                      <div className="mb-6 flex items-baseline gap-3">
                        <span className="text-2xl font-bold text-dark">
                          {guide.price}
                        </span>
                        {guide.compareAt ? (
                          <span className="text-base text-muted line-through">
                            {guide.compareAt}
                          </span>
                        ) : null}
                      </div>

                      <CtaMotionA
                        href={guide.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#5a96f5] to-lync-dark px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-shadow hover:shadow-md"
                      >
                        <ShoppingBag size={18} />
                        Get the Guide
                      </CtaMotionA>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="bg-dark py-16 text-center text-white md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ScrollReveal>
            <h2 className="mb-6 font-display text-4xl font-semibold uppercase tracking-normal md:text-5xl">
              Want More Than a Guide?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-white/70">
              From curated events to retreat getaways, we&apos;ll match you
              with the perfect Madrid experience.
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
