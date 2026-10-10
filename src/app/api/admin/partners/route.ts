import { randomBytes } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/admin-auth'
import { db } from '@/lib/db'

const text = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

/** Add a partner. Returns its generated PIN. */
export async function POST(req: Request) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>
  const name = text(body.name, 80)
  const deal = text(body.deal)
  if (!name || !deal) return NextResponse.json({ error: 'Name and deal are required' }, { status: 400 })
  const code = text(body.code, 40) || null
  const pin = randomBytes(3).toString('hex').toUpperCase()
  try {
    // New partners go to the end of the list.
    const [row] = await db()`
      insert into partners (name, pin, category, deal, code, sort)
      values (${name}, ${pin}, ${text(body.category, 60)}, ${deal}, ${code},
              (select coalesce(max(sort), 0) + 1 from partners))
      returning pin`
    revalidatePath('/membership')
    return NextResponse.json({ pin: row.pin })
  } catch (err) {
    if ((err as { code?: string }).code === '23505') {
      return NextResponse.json({ error: 'A partner with that name already exists' }, { status: 409 })
    }
    throw err
  }
}

/** Hide or show a partner. Hidden partners leave the page and can no longer log scans. */
export async function PATCH(req: Request) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = (await req.json().catch(() => ({}))) as { id?: unknown; active?: unknown }
  if (typeof body.id !== 'number' || typeof body.active !== 'boolean') {
    return NextResponse.json({ error: 'id and active are required' }, { status: 400 })
  }
  await db()`update partners set active = ${body.active} where id = ${body.id}`
  revalidatePath('/membership')
  return NextResponse.json({ ok: true })
}
