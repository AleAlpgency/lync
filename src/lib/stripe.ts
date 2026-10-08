import crypto from 'node:crypto'

const STRIPE_API = 'https://api.stripe.com/v1'

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
}

/** Card URLs use the subscription id: random, unguessable, and live-checkable. */
export function isSubscriptionId(id: string): boolean {
  return /^sub_[A-Za-z0-9]{8,}$/.test(id)
}
