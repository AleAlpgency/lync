'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ADMIN_HEADER, ADMIN_STORAGE_KEY } from '@/lib/admin-auth'

interface Scan {
  id: number
  member_name: string
  partner: string
  created_at: string
}

interface PartnerRow {
  name: string
  pin: string
  uses: number
  last_used: string | null
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleString('en-GB', { timeZone: 'Europe/Madrid', dateStyle: 'medium', timeStyle: 'short' })

export function ScansDashboard() {
  const router = useRouter()
  const [data, setData] = useState<{ scans: Scan[]; partners: PartnerRow[] } | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const pwd = sessionStorage.getItem(ADMIN_STORAGE_KEY)
    if (!pwd) {
      router.replace('/admin?next=/admin/scans')
      return
    }
    fetch('/api/admin/scans', { headers: { [ADMIN_HEADER]: pwd } })
      .then(async (res) => {
        if (res.status === 401) {
          sessionStorage.removeItem(ADMIN_STORAGE_KEY)
          router.replace('/admin?next=/admin/scans')
          return
        }
        if (!res.ok) throw new Error()
        setData(await res.json())
      })
      .catch(() => setError('Could not load scans'))
  }, [router])

  return (
    <main className="min-h-screen bg-cream px-5 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 font-display text-3xl font-semibold uppercase tracking-normal">
          Member card <span className="text-lync">scans</span>
        </h1>
        {error && <p className="text-red-700">{error}</p>}
        {!data && !error && <p className="text-muted">Loading…</p>}
        {data && (
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <section className="rounded-2xl border border-border bg-white">
              <h2 className="border-b border-border px-5 py-4 font-semibold">
                Latest scans <span className="text-muted">({data.scans.length})</span>
              </h2>
              {data.scans.length === 0 ? (
                <p className="px-5 py-6 text-muted">No scans yet.</p>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead className="text-xs uppercase tracking-wider text-muted">
                    <tr>
                      <th className="px-5 py-3">Member</th>
                      <th className="px-5 py-3">Where</th>
                      <th className="px-5 py-3">When</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {data.scans.map((s) => (
                      <tr key={s.id}>
                        <td className="px-5 py-3 font-semibold">{s.member_name}</td>
                        <td className="px-5 py-3">{s.partner}</td>
                        <td className="px-5 py-3 text-muted">{fmt(s.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
            <section className="rounded-2xl border border-border bg-white">
              <h2 className="border-b border-border px-5 py-4 font-semibold">Partners</h2>
              <ul className="divide-y divide-border text-sm">
                {data.partners.map((p) => (
                  <li key={p.name} className="flex items-center justify-between gap-3 px-5 py-3">
                    <span>
                      <span className="block font-semibold">{p.name}</span>
                      <span className="block text-xs text-muted">
                        PIN <span className="font-mono tracking-widest text-dark">{p.pin}</span>
                      </span>
                    </span>
                    <span className="text-right">
                      <span className="block text-lg font-semibold">{p.uses}</span>
                      <span className="block text-xs text-muted">{p.last_used ? fmt(p.last_used) : 'never'}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </div>
    </main>
  )
}
