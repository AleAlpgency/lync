import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, Check } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { CtaMotionLink } from '@/components/ui/cta-hover'

// Stripe Payment Link for the €25/month subscription (Lync Events LLC account)
const CHECKOUT_URL = 'https://buy.stripe.com/fZu7sK87Yb8Y6dTeQa2Ry0j'

const perks = [
  { title: 'Bring a friend', body: 'Bring a friend to select events once a month. Email us to pick the event.' },
  { title: '1 free event a month', body: 'One select LYNC event on us, every month.' },
  { title: 'First access', body: 'Early access to new LYNC events, including ones that sell out.' },
  { title: '10–20% off partner stores', body: 'Member discounts at a list of select Madrid stores.' },
  { title: '€50 off housing', body: 'Money off your booking with our partner Student Housing Abroad.' },
  { title: 'Madrid Start Pack', body: 'Our guide to settling into Madrid, from neighbourhoods to your first week.' },
]

export const metadata: Metadata = {
  title: 'Membership',
  description:
    'LYNC Membership, €25/month: a free event every month, bring a friend, first access to sold-out events, partner discounts and the Madrid Start Pack guide.',
}

export default function MembershipPage() {
  return (
    <>
      <section className="relative flex h-[70vh] min-h-[480px] items-end">
        <Image
          src="/brand/COMMUNITY/social-bar-lounge-large-group.webp"
          alt="LYNC members at a social evening"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/92 via-dark/50 to-black/25" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-12 sm:px-8 md:pb-16">
          <ScrollReveal>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-white/70">
              Membership
            </p>
            <h1 className="mb-3 font-display text-5xl font-semibold uppercase tracking-normal text-white md:text-7xl">
              LYNC Membership
            </h1>
            <p className="max-w-xl text-lg text-white/80 md:text-xl">
              More events, more friends, more of Madrid. €25 a month.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ScrollReveal>
            <h2 className="mb-14 text-center font-display text-4xl font-semibold uppercase tracking-normal md:text-5xl">
              What Members Get
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-border bg-white p-6">
                  <Check size={22} className="mb-3 text-lync" />
                  <h3 className="mb-2 font-display text-lg font-semibold uppercase tracking-normal">
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-lync py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <ScrollReveal>
            <h2 className="mb-2 font-display text-5xl font-semibold uppercase tracking-normal text-white md:text-6xl">
              €25<span className="text-2xl text-white/70"> / month</span>
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-white/80">
              Billed monthly. Secure checkout by Stripe.
            </p>
            <CtaMotionLink
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-dark transition-colors hover:bg-cream"
            >
              Become a member <ArrowRight size={20} />
            </CtaMotionLink>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
