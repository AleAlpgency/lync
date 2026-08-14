import { NextResponse } from 'next/server'
import { buildAirtableLeadFields } from '@/lib/map-quiz-for-airtable'

const AIRTABLE_API = 'https://api.airtable.com/v0'
const MAILERLITE_API = 'https://connect.mailerlite.com/api'

type Lead = {
  name: string
  email: string
  phone?: string
  nationality: string
}

type Body = {
  lead: Lead
  answers: Record<string, string | string[]>
  source: 'homepage' | 'quiz-page'
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function saveToAirtable(
  pat: string,
  baseId: string,
  table: string,
  lead: Lead,
  answers: Body['answers'],
  source: Body['source']
): Promise<void> {
  const fields = buildAirtableLeadFields(lead, answers, source)
  const res = await fetch(`${AIRTABLE_API}/${baseId}/${encodeURIComponent(table)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${pat}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ records: [{ fields }] }),
  })
  if (!res.ok) throw new Error(`Airtable ${res.status}: ${await res.text()}`)
}

async function saveToMailerLite(
  key: string,
  groupId: string | undefined,
  lead: Lead,
  source: Body['source']
): Promise<void> {
  const res = await fetch(`${MAILERLITE_API}/subscribers`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      email: lead.email,
      fields: {
        name: lead.name,
        phone: lead.phone ?? '',
        nationality: lead.nationality,
        signup_source: source,
      },
      ...(groupId ? { groups: [groupId] } : {}),
    }),
  })
  if (!res.ok) throw new Error(`MailerLite ${res.status}: ${await res.text()}`)
}

export async function POST(req: Request) {
  const pat = process.env.AIRTABLE_PAT
  const baseId = process.env.AIRTABLE_BASE_ID
  const table = process.env.AIRTABLE_TABLE_NAME ?? 'Leads'
  const mlKey = process.env.MAILERLITE_API_KEY
  const mlGroup = process.env.MAILERLITE_GROUP_ID

  const airtableReady = isNonEmptyString(pat) && isNonEmptyString(baseId)
  const mailerliteReady = isNonEmptyString(mlKey)

  // Each destination is independent, so one missing credential no longer
  // throws the lead away. Only a total absence of destinations is an error.
  if (!airtableReady && !mailerliteReady) {
    return NextResponse.json(
      { error: 'No lead destination configured' },
      { status: 500 }
    )
  }

  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { lead, answers, source } = body

  if (
    !lead ||
    !isNonEmptyString(lead.name) ||
    !isNonEmptyString(lead.email) ||
    !isNonEmptyString(lead.nationality)
  ) {
    return NextResponse.json(
      { error: 'name, email, and nationality are required' },
      { status: 400 }
    )
  }

  if (!isValidEmail(lead.email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  if (source !== 'homepage' && source !== 'quiz-page') {
    return NextResponse.json({ error: 'Invalid source' }, { status: 400 })
  }

  if (!answers || typeof answers !== 'object') {
    return NextResponse.json({ error: 'answers object required' }, { status: 400 })
  }

  const targets: Array<{ name: string; run: Promise<void> }> = []
  if (airtableReady) {
    targets.push({
      name: 'airtable',
      run: saveToAirtable(pat as string, baseId as string, table, lead, answers, source),
    })
  }
  if (mailerliteReady) {
    targets.push({
      name: 'mailerlite',
      run: saveToMailerLite(mlKey as string, mlGroup, lead, source),
    })
  }

  const settled = await Promise.allSettled(targets.map((t) => t.run))
  const saved: string[] = []
  const failed: string[] = []

  settled.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      saved.push(targets[i].name)
    } else {
      failed.push(targets[i].name)
      console.error(`Lead destination ${targets[i].name} failed`, result.reason)
    }
  })

  if (saved.length === 0) {
    return NextResponse.json({ error: 'Could not save lead', failed }, { status: 502 })
  }

  return NextResponse.json({ ok: true, saved, failed })
}
