import postgres from 'postgres'

let client: ReturnType<typeof postgres> | null = null

/** Postgres client, created on first use so builds work without DATABASE_URL. */
export function db() {
  if (!client) {
    const url = process.env.DATABASE_URL?.trim()
    if (!url) throw new Error('DATABASE_URL missing')
    // max 1: each serverless instance keeps a single connection.
    client = postgres(url, { max: 1, ssl: /localhost|127\.0\.0\.1/.test(url) ? false : 'require' })
  }
  return client
}

export interface Partner {
  id: number
  name: string
  pin: string
  category: string
  deal: string
  /** Online discount code, shown only on members' own card pages. */
  code: string | null
  active: boolean
}

export async function partnerByPin(pin: string | undefined): Promise<Partner | null> {
  if (!pin) return null
  // Hidden partners can no longer log scans.
  const rows = await db()<Partner[]>`select * from partners where pin = ${pin.toUpperCase()} and active`
  return rows[0] ?? null
}

/** Visible partners in display order. Returns [] if the database is unreachable so pages still render. */
export async function activePartners(): Promise<Partner[]> {
  try {
    return await db()<Partner[]>`select * from partners where active order by sort, id`
  } catch (err) {
    console.error('[db] partners read failed', err)
    return []
  }
}
