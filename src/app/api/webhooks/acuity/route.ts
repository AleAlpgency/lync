import crypto from 'node:crypto'
import { NextResponse } from 'next/server'

const ACUITY_API = 'https://acuityscheduling.com/api/v1'
const MAILERLITE_API = 'https://connect.mailerlite.com/api'

interface AcuityAppointment {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
}

export async function POST(req: Request) {
  const userId = process.env.ACUITY_USER_ID
  const apiKey = process.env.ACUITY_API_KEY
  const mlKey = process.env.MAILERLITE_API_KEY
  const groupId = process.env.MAILERLITE_EVENT_GROUP_ID

  if (!userId || !apiKey || !mlKey || !groupId) {
    console.error('[acuity-webhook] missing env configuration')
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }

  // Acuity signs the raw form-encoded body with the account API key.
  const body = await req.text()
  const expected = crypto
    .createHmac('sha256', apiKey)
    .update(body)
    .digest('base64')
  const signature = req.headers.get('x-acuity-signature') ?? ''
  const sigBuf = Buffer.from(signature)
  const expBuf = Buffer.from(expected)
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const params = new URLSearchParams(body)
  const action = params.get('action')
  const id = params.get('id')

  // Only fresh bookings feed the email flow; reschedules, cancels and edits
  // are not signups. Acuity's docs show both action spellings, accept both.
  if (!id || (action !== 'scheduled' && action !== 'appointment.scheduled')) {
    return NextResponse.json({ ok: true })
  }

  // The webhook only carries the appointment id; client details need a fetch.
  const apptRes = await fetch(`${ACUITY_API}/appointments/${id}`, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${userId}:${apiKey}`).toString('base64')}`,
      Accept: 'application/json',
    },
  })

  if (!apptRes.ok) {
    console.error('[acuity-webhook] appointment fetch failed', apptRes.status)
    // A 500 makes Acuity retry with backoff, which suits a transient failure.
    return NextResponse.json({ error: 'Appointment fetch failed' }, { status: 500 })
  }

  const appt = (await apptRes.json()) as AcuityAppointment

  if (!appt.email) {
    return NextResponse.json({ ok: true })
  }

  // Joining the group is what starts the welcome sequence. MailerLite upserts
  // on email, so a repeat booking by an existing subscriber is a no-op and the
  // sequence does not restart for people already past it.
  const mlRes = await fetch(`${MAILERLITE_API}/subscribers`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${mlKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      email: appt.email,
      fields: {
        ...(appt.firstName ? { name: appt.firstName } : {}),
        ...(appt.lastName ? { last_name: appt.lastName } : {}),
        ...(appt.phone ? { phone: appt.phone } : {}),
        signup_source: 'acuity-event',
      },
      groups: [groupId],
    }),
  })

  if (!mlRes.ok) {
    console.error(
      '[acuity-webhook] MailerLite upsert failed',
      mlRes.status,
      await mlRes.text()
    )
    return NextResponse.json({ error: 'Subscribe failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
