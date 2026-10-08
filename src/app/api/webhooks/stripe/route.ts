import { NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/constants'
import { MEMBERSHIP_PAYMENT_LINK_ID, verifyStripeSignature } from '@/lib/stripe'

const MAILERLITE_API = 'https://connect.mailerlite.com/api'

interface CheckoutSession {
  mode: string
  payment_link: string | null
  subscription: string | null
  customer_details: { email: string | null; name: string | null } | null
}

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim()
  const mlKey = process.env.MAILERLITE_API_KEY?.trim()
  const groupId = process.env.MAILERLITE_MEMBER_GROUP_ID?.trim()

  if (!secret || !mlKey || !groupId) {
    console.error('[stripe-webhook] missing env configuration')
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }

  const body = await req.text()
  if (!verifyStripeSignature(body, req.headers.get('stripe-signature') ?? '', secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const event = JSON.parse(body) as { type: string; data: { object: CheckoutSession } }
  const session = event.data.object

  // Only new membership checkouts. The account's other payment links (events,
  // Creator Club) must not land in the Members group.
  if (
    event.type !== 'checkout.session.completed' ||
    session.payment_link !== MEMBERSHIP_PAYMENT_LINK_ID ||
    !session.subscription
  ) {
    return NextResponse.json({ ok: true })
  }

  const email = session.customer_details?.email
  if (!email) return NextResponse.json({ ok: true })
  const [first, ...rest] = (session.customer_details?.name ?? '').trim().split(/\s+/)

  // Joining the Members group starts the welcome email, which links the card.
  const mlRes = await fetch(`${MAILERLITE_API}/subscribers`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${mlKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      email,
      fields: {
        ...(first ? { name: first } : {}),
        ...(rest.length ? { last_name: rest.join(' ') } : {}),
        member_card: `${SITE_URL}/member/${session.subscription}`,
        signup_source: 'membership',
      },
      groups: [groupId],
    }),
  })

  if (!mlRes.ok) {
    console.error('[stripe-webhook] MailerLite upsert failed', mlRes.status, await mlRes.text())
    // 500 makes Stripe retry with backoff.
    return NextResponse.json({ error: 'Subscribe failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
