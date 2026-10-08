import { notFound, redirect } from 'next/navigation'
import { stripeGet } from '@/lib/stripe'

// Stripe's after-payment redirect lands here with ?session_id=cs_...;
// swap it for the member's card URL so the card shows right after checkout.
export default async function MemberWelcome({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const id = (await searchParams).session_id
  if (!id || !/^cs_[A-Za-z0-9_]+$/.test(id)) notFound()
  const session = await stripeGet<{ subscription: string | null }>(`/checkout/sessions/${id}`)
  if (!session?.subscription) notFound()
  redirect(`/member/${session.subscription}`)
}
