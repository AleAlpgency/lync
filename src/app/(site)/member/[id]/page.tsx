import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ACTIVE_STATUSES, isMembership, isSubscriptionId, stripeGet, type Subscription } from '@/lib/stripe'
import QRCode from 'qrcode'
import { MemberCard } from '@/components/membership/member-card'
import { SITE_URL } from '@/lib/constants'

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

  const active = ACTIVE_STATUSES.includes(sub.status)
  const name = sub.customer.name || sub.customer.email || 'LYNC Member'
  const since = new Date(sub.start_date * 1000).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  })

  const qr = await QRCode.toString(`${SITE_URL}/member/${id}/scan`, { type: 'svg', margin: 0 })

  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center gap-6 bg-cream px-5 pt-24 pb-12">
      <MemberCard name={name} since={since} active={active} />
      {active && (
        <div className="flex w-full max-w-sm items-center gap-5 rounded-3xl bg-white p-5 shadow-md">
          {/* Partners scan this to confirm the member and log the visit. */}
          <div className="h-28 w-28 shrink-0" dangerouslySetInnerHTML={{ __html: qr }} />
          <p className="text-sm text-muted">
            <span className="block font-semibold text-dark">At a partner spot?</span>
            Let staff scan this code to confirm your membership.
          </p>
        </div>
      )}
    </section>
  )
}
