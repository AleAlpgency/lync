'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ADMIN_HEADER, ADMIN_STORAGE_KEY } from '@/lib/admin-auth'

interface Scan {
  id: number
  member_name: string
  partner: string
  created_at: string
}

interface PartnerRow {
  id: number
  name: string
  pin: string
  category: string
  deal: string
  code: string | null
  active: boolean
  uses: number
  last_used: string | null
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleString('en-GB', { timeZone: 'Europe/Madrid', dateStyle: 'medium', timeStyle: 'short' })

const EMPTY_FORM = { name: '', category: '', deal: '', code: '' }

export function ScansDashboard() {
  const router = useRouter()
  const [data, setData] = useState<{ scans: Scan[]; partners: PartnerRow[] } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [notice, setNotice] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  /** Admin API call; on a bad password, back to the login screen. */
  const api = useCallback(
    async (path: string, init: RequestInit = {}) => {
      const pwd = sessionStorage.getItem(ADMIN_STORAGE_KEY)
      if (!pwd) {
        router.replace('/admin?next=/admin/scans')
        return null
      }
      const res = await fetch(path, {
        ...init,
        headers: { [ADMIN_HEADER]: pwd, 'Content-Type': 'application/json' },
      })
      if (res.status === 401) {
        sessionStorage.removeItem(ADMIN_STORAGE_KEY)
        router.replace('/admin?next=/admin/scans')
        return null
      }
      return res
    },
    [router]
  )

  const load = useCallback(async () => {
    const res = await api('/api/admin/scans')
    if (!res) return
    if (!res.ok) return setError('Could not load scans')
    setData(await res.json())
  }, [api])

  useEffect(() => {
    load().catch(() => setError('Could not load scans'))
  }, [load])

  async function addPartner(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setNotice(null)
    const res = await api('/api/admin/partners', { method: 'POST', body: JSON.stringify(form) })
    setSaving(false)
    if (!res) return
    const body = await res.json().catch(() => ({}))
    if (!res.ok) return setNotice(body.error || 'Could not add partner')
    setNotice(`${form.name} added. Their PIN is ${body.pin}.`)
    setForm(EMPTY_FORM)
    await load()
  }

  async function toggle(p: PartnerRow) {
    await api('/api/admin/partners', { method: 'PATCH', body: JSON.stringify({ id: p.id, active: !p.active }) })
    await load()
  }

  const input = 'w-full rounded-lg border border-border px-3 py-2 text-sm'

  return (
    <main className="min-h-screen bg-cream px-5 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 font-display text-3xl font-semibold uppercase tracking-normal">
          Member card <span className="text-lync">scans</span>
        </h1>
        {error && <p className="text-red-700">{error}</p>}
        {!data && !error && <p className="text-muted">Loading…</p>}
        {data && (
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_400px]">
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

            <div className="space-y-8">
              <section className="rounded-2xl border border-border bg-white p-5">
                <h2 className="mb-1 font-semibold">Add a partner</h2>
                <p className="mb-4 text-xs text-muted">
                  It shows on the membership page straight away and gets its own PIN.
                </p>
                <form onSubmit={addPartner} className="space-y-3">
                  <input className={input} placeholder="Name, e.g. Café Pepe" required maxLength={80}
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <input className={input} placeholder="Category, e.g. Coffee" maxLength={60}
                    value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                  <input className={input} placeholder="Deal, e.g. 10% off" required maxLength={200}
                    value={form.deal} onChange={(e) => setForm({ ...form, deal: e.target.value })} />
                  <input className={input} placeholder="Online code (only if they book online)" maxLength={40}
                    value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
                  <button disabled={saving} className="w-full rounded-full bg-lync py-2.5 text-sm font-semibold text-white disabled:opacity-60">
                    {saving ? 'Adding…' : 'Add partner'}
                  </button>
                  {notice && <p className="text-sm font-semibold text-dark">{notice}</p>}
                </form>
              </section>

              <section className="rounded-2xl border border-border bg-white">
                <h2 className="border-b border-border px-5 py-4 font-semibold">Partners</h2>
                <ul className="divide-y divide-border text-sm">
                  {data.partners.map((p) => (
                    <li key={p.id} className={`flex items-start justify-between gap-3 px-5 py-3 ${p.active ? '' : 'opacity-50'}`}>
                      <span>
                        <span className="block font-semibold">{p.name}</span>
                        <span className="block text-xs text-muted">{p.deal}</span>
                        <span className="block text-xs text-muted">
                          PIN <span className="font-mono tracking-widest text-dark">{p.pin}</span>
                          {p.code && <> · code <span className="font-mono text-dark">{p.code}</span></>}
                        </span>
                      </span>
                      <span className="shrink-0 text-right">
                        <span className="block text-lg font-semibold">{p.uses}</span>
                        <span className="block text-xs text-muted">{p.last_used ? fmt(p.last_used) : 'never'}</span>
                        <button onClick={() => toggle(p)} className="mt-1 text-xs text-lync underline">
                          {p.active ? 'Hide' : 'Show'}
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
