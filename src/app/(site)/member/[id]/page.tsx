import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isMembership, isSubscriptionId, stripeGet, type Subscription } from '@/lib/stripe'
import { MemberCard } from '@/components/membership/member-card'

export const metadata: Metadata = {
  title: 'Member Card',
  robots: { index: false, follow: false },
}

// Status is read from Stripe on every view, so a cancelled member's card
// flips to "Not active" without anyone touching it.
export const dynamic = 'force-dynamic'

export default async function MemberCardPage({ params }: { params: Promise<{ id: string }> }) {
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
      <MemberCard name={name} since={since} active={active} />
    </section>
  )
}
