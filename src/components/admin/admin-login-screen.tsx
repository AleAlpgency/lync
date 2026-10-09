'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Lock } from 'lucide-react'
import { ADMIN_STORAGE_KEY } from '@/lib/admin-auth'

// Where to go after login: ?next=/admin/... if given, else the post editor.
function nextPath() {
  const next = new URLSearchParams(window.location.search).get('next')
  return next?.startsWith('/admin/') ? next : '/admin/new-post'
}

export function AdminLoginScreen() {
  const router = useRouter()
  const [checked, setChecked] = useState(false)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // If the tab already has a password stored, skip straight into the app.
  useEffect(() => {
    const stored = sessionStorage.getItem(ADMIN_STORAGE_KEY)
    if (stored) {
      router.replace(nextPath())
      return
    }
    setChecked(true)
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Invalid password')
        setLoading(false)
        return
      }

      sessionStorage.setItem(ADMIN_STORAGE_KEY, password)
      router.replace(nextPath())
    } catch {
      setError('Network error')
      setLoading(false)
    }
  }

  if (!checked) {
    return <main className="min-h-screen bg-cream" />
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-5 py-16">
      <div className="w-full max-w-md">
        <div className="rounded-[1.75rem] border border-border bg-white p-7 shadow-lg sm:rounded-[2rem] sm:p-9">
          <header className="mb-6 text-center">
            <h1 className="font-display text-2xl font-semibold uppercase tracking-normal text-dark sm:text-3xl">
              LYNC <span className="text-lync">Admin</span>
            </h1>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
              Enter the password to publish new posts.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-normal text-muted">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted/60"
                />
                <input
                  type="password"
                  required
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-border bg-white px-3 py-3 pl-9 text-dark shadow-sm outline-none transition-all placeholder:text-muted/60 focus:border-lync focus:ring-2 focus:ring-lync/10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#5a96f5] to-lync-dark py-3.5 text-sm font-semibold text-white shadow-sm transition-shadow hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 md:text-base"
            >
              {loading ? 'Signing in…' : (
                <>
                  Sign in <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
