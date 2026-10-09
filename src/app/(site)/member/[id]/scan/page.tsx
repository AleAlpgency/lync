import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { CheckCircle2, XCircle } from 'lucide-react'
import { partnerByPin } from '@/lib/db'
import { ACTIVE_STATUSES, isMembership, isSubscriptionId, stripeGet, type Subscription } from '@/lib/stripe'
import { forgetPin, markUsed, savePin } from './actions'
import { PARTNER_COOKIE } from './shared'

export const metadata: Metadata = {
  title: 'Member Check',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

// Staff land here by scanning the QR on a member's card.
export default async function ScanPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ done?: string; error?: string }>
}) {
  const { id } = await params
  const { done, error } = await searchParams
  if (!isSubscriptionId(id)) notFound()
  const sub = await stripeGet<Subscription>(`/subscriptions/${id}?expand[]=customer`)
  if (!sub || !isMembership(sub)) notFound()

  const active = ACTIVE_STATUSES.includes(sub.status)
  const name = sub.customer.name || sub.customer.email || 'LYNC Member'
  const partner = await partnerByPin((await cookies()).get(PARTNER_COOKIE)?.value)

  return (
    <section className="flex min-h-[100svh] items-center justify-center bg-cream px-5 pt-24 pb-12">
      <div className="w-full max-w-sm rounded-3xl bg-white p-7 shadow-xl">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted">LYNC member</p>
        <p className="mb-4 font-display text-3xl font-semibold uppercase leading-tight tracking-normal break-words">
          {name}
        </p>
        <p className={`mb-6 inline-flex items-center gap-2 font-bold uppercase ${active ? 'text-green-700' : 'text-red-700'}`}>
          {active ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
          {active ? 'Active member' : 'Not active'}
        </p>

        {!active ? (
          <p className="text-sm text-muted">This membership is not active, so the discount does not apply.</p>
        ) : !partner ? (
          <form action={savePin.bind(null, id)} className="space-y-3">
            <label className="block text-sm font-semibold" htmlFor="pin">
              Staff: enter your partner PIN (once per phone)
            </label>
            <input
              id="pin"
              name="pin"
              required
              autoComplete="off"
              autoCapitalize="characters"
              className="w-full rounded-xl border border-border px-4 py-3 text-lg uppercase tracking-widest"
            />
            {error === 'pin' && <p className="text-sm text-red-700">That PIN is not recognised.</p>}
            <button className="w-full rounded-full bg-lync py-3 font-semibold text-white">Continue</button>
          </form>
        ) : done ? (
          <div className="rounded-2xl bg-green-50 p-5 text-center">
            <CheckCircle2 size={36} className="mx-auto mb-2 text-green-700" />
            <p className="font-semibold">Marked as used at {partner.name}</p>
            <p className="mt-1 text-sm text-muted">
              {new Date().toLocaleString('en-GB', { timeZone: 'Europe/Madrid', dateStyle: 'medium', timeStyle: 'short' })}
            </p>
          </div>
        ) : (
          <form action={markUsed.bind(null, id)}>
            <button className="w-full rounded-full bg-lync py-4 text-lg font-semibold text-white">
              Mark as used at {partner.name}
            </button>
          </form>
        )}

        {partner && (
          <form action={forgetPin.bind(null, id)} className="mt-5 text-center">
            <button className="text-xs text-muted underline">Not {partner.name}? Change partner</button>
          </form>
        )}
      </div>
    </section>
  )
}
