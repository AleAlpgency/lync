'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { db, partnerByPin } from '@/lib/db'
import { ACTIVE_STATUSES, isMembership, isSubscriptionId, stripeGet, type Subscription } from '@/lib/stripe'
import { PARTNER_COOKIE } from './shared'

export async function savePin(id: string, form: FormData) {
  if (!isSubscriptionId(id)) redirect('/')
  const partner = await partnerByPin(String(form.get('pin') ?? '').trim())
  if (!partner) redirect(`/member/${id}/scan?error=pin`)
  // A year, so staff enter the PIN once per phone.
  ;(await cookies()).set(PARTNER_COOKIE, partner.pin, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/member',
    maxAge: 60 * 60 * 24 * 365,
  })
  redirect(`/member/${id}/scan`)
}

export async function forgetPin(id: string) {
  ;(await cookies()).delete({ name: PARTNER_COOKIE, path: '/member' })
  redirect(isSubscriptionId(id) ? `/member/${id}/scan` : '/')
}

export async function markUsed(id: string) {
  if (!isSubscriptionId(id)) redirect('/')
  const partner = await partnerByPin((await cookies()).get(PARTNER_COOKIE)?.value)
  if (!partner) redirect(`/member/${id}/scan`)
  // Re-check on submit: the page may have been open since before a cancellation.
  const sub = await stripeGet<Subscription>(`/subscriptions/${id}?expand[]=customer`)
  if (!sub || !isMembership(sub) || !ACTIVE_STATUSES.includes(sub.status)) {
    redirect(`/member/${id}/scan`)
  }
  const name = sub.customer.name || sub.customer.email || 'LYNC Member'
  await db()`insert into redemptions (subscription_id, member_name, partner_id) values (${id}, ${name}, ${partner.id})`
  redirect(`/member/${id}/scan?done=1`)
}
