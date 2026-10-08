import crypto from 'node:crypto'

const STRIPE_API = 'https://api.stripe.com/v1'

// The account also sells other subscriptions (Creator Club), so cards and the
// welcome flow only count the LYNC Membership price and its payment link.
export const MEMBERSHIP_PRICE_ID = 'price_1UL6w4B9S4BqNdLtASquxH5I'
export const MEMBERSHIP_PAYMENT_LINK_ID = 'plink_1UL6wCB9S4BqNdLtcq2iGMDc'

/** GET a Stripe API path with the server-only secret key. Returns null on any failure. */
export async function stripeGet<T>(path: string): Promise<T | null> {
  const key = process.env.STRIPE_SECRET_KEY?.trim()
  if (!key) {
    console.error('[stripe] STRIPE_SECRET_KEY missing')
    return null
  }
  const res = await fetch(`${STRIPE_API}${path}`, {
    headers: { Authorization: `Bearer ${key}` },
    cache: 'no-store',
  })
  if (!res.ok) {
    if (res.status !== 404) console.error('[stripe] GET failed', path, res.status)
    return null
  }
  return res.json() as Promise<T>
}

/**
 * Verify a Stripe-Signature header (t=...,v1=...) against the raw body.
 * Rejects events older than 5 minutes to block replays.
 */
export function verifyStripeSignature(body: string, header: string, secret: string): boolean {
  const parts = Object.fromEntries(
    header.split(',').map((p) => p.split('=') as [string, string])
  )
  const t = Number(parts.t)
  if (!t || Math.abs(Date.now() / 1000 - t) > 300) return false
  const expected = crypto.createHmac('sha256', secret).update(`${t}.${body}`).digest('hex')
  // A header can carry several v1 signatures during secret rotation.
  return header
    .split(',')
    .filter((p) => p.startsWith('v1='))
    .some((p) => {
      const sig = Buffer.from(p.slice(3))
      const exp = Buffer.from(expected)
      return sig.length === exp.length && crypto.timingSafeEqual(sig, exp)
    })
}

export interface Subscription {
  id: string
  status: string
  start_date: number
  customer: { name: string | null; email: string | null }
  items: { data: { price: { id: string } }[] }
}

export function isMembership(sub: Subscription): boolean {
  return sub.items.data.some((i) => i.price.id === MEMBERSHIP_PRICE_ID)
}

/** Card URLs use the subscription id: random, unguessable, and live-checkable. */
export function isSubscriptionId(id: string): boolean {
  return /^sub_[A-Za-z0-9]{8,}$/.test(id)
}
