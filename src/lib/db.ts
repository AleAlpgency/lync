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
}

export async function partnerByPin(pin: string | undefined): Promise<Partner | null> {
  if (!pin) return null
  const rows = await db()<Partner[]>`select id, name, pin from partners where pin = ${pin.toUpperCase()}`
  return rows[0] ?? null
}
