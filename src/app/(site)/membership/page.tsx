import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, Check } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { CtaMotionLink } from '@/components/ui/cta-hover'
import { MemberCard } from '@/components/membership/member-card'

// Stripe Payment Link for the €25/month subscription (Lync Events LLC account)
const CHECKOUT_URL = 'https://buy.stripe.com/fZu7sK87Yb8Y6dTeQa2Ry0j'

const perks = [
  { title: 'Bring a friend', body: 'Bring a friend to select events once a month. Email us to pick the event.' },
  { title: '1 free event a month', body: 'One select LYNC event on us, every month.' },
  { title: 'First access', body: 'Early access to new LYNC events, including ones that sell out.' },
  { title: '10–20% off partner stores', body: 'Member discounts at our partners, listed below.' },
  { title: '€50 off housing', body: 'Money off your booking with our partner Student Housing Abroad.' },
  { title: 'Madrid Start Pack', body: 'Our guide to settling into Madrid, from neighbourhoods to your first week.' },
]

// Member discounts as Rebecca listed them. Codes go to members privately, not here.
const partners = [
  { name: 'LYNC events', category: 'Events', deal: '15% off all LYNC events' },
  { name: 'Madrid Community Acupuncture', category: 'Acupuncture', deal: '2-for-1 (bring a friend) and no first-visit fee' },
  { name: 'Epico Café', category: 'Coffee', deal: '10% off' },
  { name: 'Masamune', category: 'Coffee', deal: '10% off' },
  { name: 'OBE', category: 'Café', deal: '10% off' },
  { name: 'Brod Bakery', category: 'Bakery', deal: '10% off' },
  { name: 'Ana Hache', category: 'Nails, lashes, brows', deal: '15% off' },
  { name: 'Amazonia Estética', category: 'Massages & beauty', deal: '15% off' },
  { name: 'Laser Natura', category: 'Laser hair removal', deal: '10% off' },
  { name: 'BFF Barre', category: 'Barre classes', deal: '10% off, or 2 classes for €33' },
  { name: 'Ventura', category: 'Events & parties', deal: '10% off' },
  { name: 'Student Housing Abroad', category: 'Housing', deal: '€50 off' },
  { name: 'Intellete', category: 'Visa & study abroad', deal: '10% off' },
  { name: 'IE Navigator Blueprint', category: 'Guide', deal: '€20 off' },
  { name: 'Guest Ready', category: 'Travel', deal: '10% off apartments in Portugal, France, Spain, the UK and Dubai' },
]

export const metadata: Metadata = {
  title: 'Membership',
  description:
    'LYNC Membership, €25/month: a free event every month, bring a friend, first access to sold-out events, partner discounts and the Madrid Start Pack guide.',
}

function JoinButton({ className }: { className: string }) {
  return (
    <CtaMotionLink
      href={CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold transition-colors ${className}`}
    >
      Become a member <ArrowRight size={20} />
    </CtaMotionLink>
  )
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
            <JoinButton className="mt-7 bg-lync text-white hover:bg-lync-dark" />
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <ScrollReveal>
            <div className="rounded-3xl border border-border bg-white p-7 shadow-xl sm:p-9">
              <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-lync">
                LYNC Membership
              </p>
              <p className="mb-6 font-display text-6xl font-semibold tracking-normal">
                €25<span className="text-xl font-normal text-muted"> / month</span>
              </p>
              <ul className="mb-8 space-y-4">
                {perks.map((p) => (
                  <li key={p.title} className="flex gap-3">
                    <Check size={20} className="mt-0.5 shrink-0 text-lync" />
                    <span>
                      <span className="block font-semibold">{p.title}</span>
                      <span className="block text-sm text-muted">{p.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <JoinButton className="w-full justify-center bg-lync text-white hover:bg-lync-dark" />
              <p className="mt-3 text-center text-sm text-muted">Billed monthly. Cancel anytime by email.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col items-center">
              <div className="relative flex aspect-[9/19] w-full max-w-[320px] items-center rounded-[3rem] border-[10px] border-dark bg-cream px-4 shadow-2xl">
                <span className="absolute top-3 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full bg-dark" />
                <MemberCard name="Your name" since="Today" active />
              </div>
              <p className="mt-6 max-w-xs text-center text-muted">
                Your digital member card. Show it on your phone at partner spots and LYNC events.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <ScrollReveal>
            <h2 className="mb-4 text-center font-display text-4xl font-semibold uppercase tracking-normal md:text-5xl">
              Partner Discounts
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-center text-lg text-muted">
              Living in Madrid? Stop guessing where to go. These are the spots LYNC has personally vetted, tested, and certified 📍
            </p>
          </ScrollReveal>
          <ul className="divide-y divide-border rounded-2xl border border-border bg-white">
            {partners.map((p) => (
              <li key={p.name} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <span>
                  <span className="block font-semibold">{p.name}</span>
                  <span className="block text-xs uppercase tracking-wider text-muted">{p.category}</span>
                </span>
                <span className="text-sm text-muted sm:text-right">{p.deal}</span>
              </li>
            ))}
          </ul>
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
            <JoinButton className="bg-white text-dark hover:bg-cream" />
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
