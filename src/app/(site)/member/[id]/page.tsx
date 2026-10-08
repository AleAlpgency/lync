import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { isMembership, isSubscriptionId, stripeGet, type Subscription } from '@/lib/stripe'
import { LiveClock } from './live-clock'

export const metadata: Metadata = {
  title: 'Member Card',
  robots: { index: false, follow: false },
}

// Status is read from Stripe on every view, so a cancelled member's card
// flips to "Not active" without anyone touching it.
export const dynamic = 'force-dynamic'

export default async function MemberCard({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!isSubscriptionId(id)) notFound()
  const sub = await stripeGet<Subscription>(`/subscriptions/${id}?expand[]=customer`)
  if (!sub || !isMembership(sub)) notFound()

  // past_due keeps perks during Stripe's retry window; anything else is lapsed.
  const active = ['active', 'trialing', 'past_due'].includes(sub.status)
  const name = sub.customer.name || sub.customer.email || 'LYNC Member'
  const since = new Date(sub.start_date * 1000).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <section className="flex min-h-[100svh] items-center justify-center bg-cream px-5 pt-24 pb-12">
      <div
        className={`w-full max-w-sm overflow-hidden rounded-3xl shadow-xl ${active ? 'bg-lync' : 'bg-neutral-500'}`}
      >
        <div className="p-7 text-white">
          <div className="mb-10 flex items-center justify-between">
            <Image src="/brand/LOGO_WHITETEXT_NOBG.png" alt="LYNC" width={88} height={24} />
            <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
              Member
            </span>
          </div>
          <p className="mb-1 text-xs uppercase tracking-widest text-white/60">Name</p>
          <p className="mb-6 font-display text-3xl font-semibold uppercase leading-tight tracking-normal break-words">
            {name}
          </p>
          <p className="mb-1 text-xs uppercase tracking-widest text-white/60">Member since</p>
          <p className="text-lg font-semibold">{since}</p>
        </div>
        <div className="flex items-center justify-between gap-3 bg-white px-7 py-5">
          <span
            className={`inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide ${active ? 'text-green-700' : 'text-red-700'}`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${active ? 'animate-pulse bg-green-600' : 'bg-red-600'}`}
            />
            {active ? 'Active' : 'Not active'}
          </span>
          <span className="text-xs text-muted">
            <LiveClock />
          </span>
        </div>
      </div>
    </section>
  )
}
