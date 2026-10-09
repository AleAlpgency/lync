import { NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/admin-auth'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const sql = db()
  // ponytail: last 500 scans only; add paging when the list outgrows that.
  const [scans, partners] = await Promise.all([
    sql`select r.id, r.member_name, r.created_at, p.name as partner
        from redemptions r join partners p on p.id = r.partner_id
        order by r.created_at desc limit 500`,
    sql`select p.name, p.pin, count(r.id)::int as uses, max(r.created_at) as last_used
        from partners p left join redemptions r on r.partner_id = p.id
        group by p.id order by uses desc, p.name`,
  ])
  return NextResponse.json({ scans, partners })
}
