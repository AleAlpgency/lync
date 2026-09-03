import { NextResponse } from 'next/server'

const MAILERLITE_API = 'https://connect.mailerlite.com/api'

type Body = {
  email?: unknown
  name?: unknown
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: Request) {
  const key = process.env.MAILERLITE_API_KEY
  const groupId = process.env.MAILERLITE_GROUP_ID

  if (!isNonEmptyString(key)) {
    return NextResponse.json(
      { error: 'Newsletter is not configured' },
      { status: 500 }
    )
  }

  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const email = isNonEmptyString(body.email) ? body.email.trim() : ''
  const name = isNonEmptyString(body.name) ? body.name.trim() : ''

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 }
    )
  }

  // MailerLite upserts on email, so a repeat signup is a no-op rather than an
  // error, and the response never reveals who is already on the list.
  const res = await fetch(`${MAILERLITE_API}/subscribers`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      email,
      ...(name ? { fields: { name } } : {}),
      ...(isNonEmptyString(groupId) ? { groups: [groupId] } : {}),
    }),
  })

  if (!res.ok) {
    console.error('MailerLite subscribe failed', res.status, await res.text())
    return NextResponse.json(
      { error: 'We could not sign you up just now. Please try again.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
