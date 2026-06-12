import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import {
  ArrowRight,
  CalendarDays,
  Download,
  MapPin,
  Users,
  Mail,
} from 'lucide-react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import SpotlightCard from '@/components/ui/spotlight-card'
import { CtaMotionA, CtaMotionLink } from '@/components/ui/cta-hover'
import { EventCard } from '@/components/events/event-card'
import { getUpcomingRetreats } from '@/lib/acuity'
import { StickyCTABar } from '@/components/retreats/sticky-cta-bar'
import { getRetreatBySlug, getRetreatSlugs } from '@/lib/sanity/fetchers'
import { ImageSlideshow } from '@/components/retreats/image-slideshow'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getRetreatSlugs()
  return slugs.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const retreat = await getRetreatBySlug(slug)
  if (!retreat) return { title: 'Retreat Not Found' }

  return {
    title: `${retreat.title} — ${retreat.location}`,
    description: retreat.shortDescription,
    openGraph: {
      title: `${retreat.title} — ${retreat.location}`,
      description: retreat.shortDescription,
      images: [
        {
          url: retreat.images.hero,
          width: 1200,
          height: 630,
          alt: `${retreat.title} — ${retreat.location}`,
        },
      ],
    },
  }
}

export default async function RetreatDetailPage({ params }: Props) {
  const { slug } = await params
  const retreat = await getRetreatBySlug(slug)
  if (!retreat) notFound()

  const retreatEvents = await getUpcomingRetreats()

  // Adaptive helpers
  const introParagraphs = retreat.introText
    ? retreat.introText.split('\n\n')
    : null
  const programmeTitle =
    retreat.programmeTitle || `${retreat.duration} of Becoming`
  const founderStoryTitle =
    retreat.founderStoryTitle || `The Story Behind ${retreat.title}`
  const dailyScheduleSubtitle =
    retreat.dailyScheduleSubtitle ||
    'Every day is designed to be yours.'
  const bentoCount = retreat.images.bento.length
  const pricingCols =
    retreat.pricing.length === 1
      ? 'max-w-md mx-auto'
      : retreat.pricing.length >= 3
        ? 'md:grid-cols-3'
        : 'md:grid-cols-2'

  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────── */}
      <section className="relative flex h-[50vh] min-h-[360px] items-end sm:h-[60vh] sm:min-h-[420px]">
        <Image
          src={retreat.images.hero}
          alt={`${retreat.title} retreat`}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-black/20" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-10 sm:px-8 md:pb-16">
          <ScrollReveal>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/70 sm:mb-3 sm:text-sm">
              A Women&apos;s Retreat &middot; {retreat.location}
            </p>
            <h1 className="mb-2 font-display text-5xl font-semibold uppercase tracking-normal text-white sm:mb-3 sm:text-6xl md:text-8xl">
              {retreat.title}
            </h1>
            <p className="mb-4 max-w-lg text-base text-white/85 sm:mb-5 sm:text-lg md:text-xl">
              {retreat.subtitle}
            </p>
            {retreat.dates && (
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
                <CalendarDays size={14} />
                {retreat.dates}
              </span>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* ── 2. Intro ──────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
            <div className="flex-1">
              <ScrollReveal>
                <h2 className="mb-6 font-display text-3xl font-semibold uppercase tracking-normal md:text-4xl">
                  What is {retreat.title}?
                </h2>
                {introParagraphs ? (
                  introParagraphs.map((paragraph, i) => (
                    <p
                      key={i}
                      className={`${i === 0 ? 'text-lg' : ''} mb-4 leading-relaxed text-muted`}
                    >
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="mb-8 text-lg leading-relaxed text-muted">
                    {retreat.shortDescription}
                  </p>
                )}

                <div className="mt-8 flex flex-wrap gap-3">
                  {retreat.duration && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-dark">
                      <CalendarDays size={15} className="text-lync" />
                      {retreat.duration}
                    </span>
                  )}
                  {retreat.groupSize && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-dark">
                      <Users size={15} className="text-lync" />
                      {retreat.groupSize}
                    </span>
                  )}
                  {retreat.venue && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-dark">
                      <MapPin size={15} className="text-lync" />
                      {retreat.venue}
                    </span>
                  )}
                </div>
              </ScrollReveal>
            </div>

            {retreat.images.intro && (
              <div className="w-full lg:w-[45%]">
                <ScrollReveal delay={0.15}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[3/4]">
                    <Image
                      src={retreat.images.intro}
                      alt={`${retreat.title} retreat group`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                </ScrollReveal>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 3. Photo Bento Grid (adaptive) ─────────────────── */}
      {bentoCount > 0 && (
        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <ScrollReveal>
              {bentoCount === 1 && (
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                  <Image
                    src={retreat.images.bento[0]}
                    alt={`${retreat.title} photo`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1152px"
                    className="object-cover"
                  />
                </div>
              )}

              {bentoCount === 2 && (
                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  {retreat.images.bento.map((src, i) => (
                    <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-xl sm:rounded-2xl">
                      <Image
                        src={src}
                        alt={`${retreat.title} photo ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 50vw"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              )}

              {bentoCount === 3 && (
                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 md:gap-4">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl sm:rounded-2xl md:row-span-2">
                    <Image
                      src={retreat.images.bento[0]}
                      alt={`${retreat.title} photo 1`}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  {retreat.images.bento.slice(1).map((src, i) => (
                    <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl sm:rounded-2xl">
                      <Image
                        src={src}
                        alt={`${retreat.title} photo ${i + 2}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              )}

              {bentoCount >= 4 && (
                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-4">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl sm:rounded-2xl md:row-span-2 md:aspect-auto">
                    <Image
                      src={retreat.images.bento[0]}
                      alt={`${retreat.title} photo 1`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl sm:rounded-2xl md:col-span-2 md:aspect-auto">
                    <div className="relative h-full w-full md:aspect-[16/9]">
                      <Image
                        src={retreat.images.bento[1]}
                        alt={`${retreat.title} photo 2`}
                        fill
                        sizes="(max-width: 768px) 50vw, 50vw"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>

                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl sm:rounded-2xl md:row-span-2 md:aspect-auto">
                    <Image
                      src={retreat.images.bento[2]}
                      alt={`${retreat.title} photo 3`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl sm:rounded-2xl md:col-span-2 md:aspect-auto">
                    <div className="relative h-full w-full md:aspect-[16/9]">
                      <Image
                        src={retreat.images.bento[3]}
                        alt={`${retreat.title} photo 4`}
                        fill
                        sizes="(max-width: 768px) 50vw, 50vw"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              )}
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── Slideshow ────────────────────────────────────── */}
      {retreat.images.slideshow.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <ImageSlideshow images={retreat.images.slideshow} />
          </div>
        </section>
      )}

      {/* ── 4. A Day at the Retreat ─────────────────────── */}
      {retreat.dailySchedule.length > 0 && (
        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <ScrollReveal>
              <h2 className="mb-3 text-center font-display text-3xl font-semibold uppercase tracking-normal md:text-4xl">
                A Day at {retreat.title}
              </h2>
              <p className="mb-12 text-center text-sm text-muted">
                {dailyScheduleSubtitle}
              </p>
            </ScrollReveal>

            <div className="flex flex-col gap-4">
              {retreat.dailySchedule.map((entry, i) => (
                <ScrollReveal key={entry.time} delay={i * 0.06}>
                  <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-stretch">
                      {/* Time strip */}
                      <div className="flex w-20 shrink-0 flex-col items-center justify-center gap-1.5 bg-gradient-to-b from-lync/8 to-lync/4 px-1.5 py-4 sm:w-28 sm:px-2 sm:py-5">
                        {entry.emoji && <span className="text-lg sm:text-xl">{entry.emoji}</span>}
                        <span className="text-center text-[10px] font-bold uppercase leading-tight tracking-wider text-lync sm:text-sm">
                          {entry.time}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-4 sm:p-6">
                        <h3 className="mb-1.5 font-display text-base font-semibold uppercase tracking-normal">
                          {entry.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted">
                          {entry.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. The Programme (adaptive) ──────────────────── */}
      {retreat.itinerary.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <ScrollReveal>
              <h2 className="mb-3 text-center font-display text-3xl font-semibold uppercase tracking-normal md:text-4xl">
                {programmeTitle}
              </h2>
              {retreat.programmeSubtitle && (
                <p className="mx-auto mb-12 max-w-2xl text-center text-sm leading-relaxed text-muted">
                  {retreat.programmeSubtitle}
                </p>
              )}
              {!retreat.programmeSubtitle && <div className="mb-12" />}
            </ScrollReveal>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {retreat.itinerary.map((day, i) => (
                <ScrollReveal key={day.day} delay={i * 0.06}>
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:border-lync/20 hover:shadow-md">
                    <div className="mb-3 flex items-center gap-2.5">
                      <span className="text-2xl">{day.emoji}</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-lync">
                        Day {day.day}
                      </span>
                    </div>
                    <h3 className="mb-3 font-display text-lg font-semibold uppercase tracking-normal">
                      {day.title}
                    </h3>
                    <ul className="space-y-2">
                      {day.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-muted">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lync/40" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. Founder Story (conditional) ──────────────── */}
      {retreat.founderStory && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <ScrollReveal>
              <h2 className="mb-10 text-center font-display text-3xl font-semibold uppercase tracking-normal md:text-4xl">
                {founderStoryTitle}
              </h2>
              <blockquote className="space-y-4">
                {retreat.founderStory.split('\n\n').map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-center text-lg leading-relaxed text-dark/80 italic md:text-xl"
                  >
                    &ldquo;{paragraph}&rdquo;
                  </p>
                ))}
              </blockquote>
              {retreat.founderAttribution && (
                <p className="mt-8 text-center text-sm font-semibold text-muted">
                  — {retreat.founderAttribution}
                </p>
              )}
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── 7. What's Included (conditional) ────────────── */}
      {retreat.inclusions.length > 0 && (
        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <ScrollReveal>
              <h2 className="mb-14 text-center font-display text-3xl font-semibold uppercase tracking-normal md:text-4xl">
                What&apos;s Included
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {retreat.inclusions.map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 0.05}>
                  <SpotlightCard className="h-full rounded-2xl border border-border bg-white p-6">
                    <span className="mb-3 block text-3xl">{item.emoji}</span>
                    <h3 className="mb-2 font-display text-base font-semibold uppercase tracking-normal">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </SpotlightCard>
                </ScrollReveal>
              ))}
            </div>

            {retreat.notIncluded.length > 0 && (
              <ScrollReveal delay={0.1}>
                <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-white/60 p-6">
                  <h3 className="mb-3 text-center text-sm font-semibold uppercase tracking-wider text-muted">
                    Not Included
                  </h3>
                  <ul className="flex flex-col items-center gap-1.5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-y-2">
                    {retreat.notIncluded.map((item, i) => (
                      <li key={item} className="flex items-center text-sm text-muted">
                        {i > 0 && <span className="mx-3 hidden h-1 w-1 shrink-0 rounded-full bg-muted/40 sm:block" />}
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            )}
          </div>
        </section>
      )}

      {/* ── 8. Pricing + CTA (conditional) ──────────────── */}
      {retreat.pricing.length > 0 && (
        <section id="pricing" className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <ScrollReveal>
              <h2 className="mb-12 text-center font-display text-3xl font-semibold uppercase tracking-normal md:text-4xl">
                Reserve Your Spot
              </h2>
            </ScrollReveal>

            <div className={`mb-8 grid gap-6 ${pricingCols}`}>
              {retreat.pricing.map((room, i) => (
                <ScrollReveal key={room.type} delay={i * 0.1}>
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-8">
                    <h3 className="mb-1 font-display text-xl font-semibold uppercase tracking-normal">
                      {room.type}
                    </h3>
                    <p className="mb-6 text-3xl font-bold text-lync">
                      {room.price}
                      <span className="ml-1 text-base font-normal text-muted">
                        / person
                      </span>
                    </p>

                    <ul className="mb-8 flex-1 space-y-2.5">
                      {room.perks.map((perk) => (
                        <li
                          key={perk}
                          className="flex items-start gap-2 text-sm text-dark"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lync" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal>
              {retreat.depositNote && (
                <p className="mb-8 text-center text-sm font-medium text-muted">
                  {retreat.depositNote}
                </p>
              )}

              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                {retreat.bookingUrl && (
                  <CtaMotionA
                    href={retreat.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#5a96f5] to-lync-dark px-8 py-4 text-lg font-semibold text-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    Reserve Your Spot <ArrowRight size={20} />
                  </CtaMotionA>
                )}

                {retreat.brochurePath && (
                  <CtaMotionA
                    href={retreat.brochurePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-8 py-4 text-lg font-semibold text-dark transition-all hover:border-lync/30 hover:shadow-sm"
                  >
                    Download Brochure <Download size={18} />
                  </CtaMotionA>
                )}
              </div>

              {retreat.contactEmail && (
                <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted">
                  <Mail size={14} />
                  Questions? Reach us at{' '}
                  <a
                    href={`mailto:${retreat.contactEmail}`}
                    className="font-medium text-lync underline-offset-2 hover:underline"
                  >
                    {retreat.contactEmail}
                  </a>
                </p>
              )}
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── 9. More Retreats (Acuity) ────────────────────── */}
      {retreatEvents.length > 0 && (
        <section className="bg-cream py-16 md:py-24">
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

      {/* ── 10. Bottom CTA ───────────────────────────────── */}
      <section id="bottom-cta" className="bg-dark py-16 text-center text-white md:py-24">
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
              Find Your Experience <ArrowRight size={20} />
            </CtaMotionLink>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Sticky CTA Bar (conditional) ─────────────────── */}
      {retreat.bookingUrl && (
        <StickyCTABar
          bookingUrl={retreat.bookingUrl}
          brochurePath={retreat.brochurePath}
          startingPrice={retreat.pricing[0]?.price ?? ''}
        />
      )}
    </>
  )
}
