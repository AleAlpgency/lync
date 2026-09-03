'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/constants'

const INPUT_CLASS =
  'w-full rounded-xl border border-border bg-white px-3 py-2.5 text-dark shadow-sm outline-none transition-all placeholder:text-muted/60 focus:border-lync focus:ring-2 focus:ring-lync/10 sm:py-3'

const LABEL_CLASS =
  'mb-1 block text-xs font-semibold uppercase tracking-normal text-muted'

type Status = 'idle' | 'submitting' | 'done' | 'error'

export function NewsletterSignup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setError('')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })

      if (!res.ok) {
        const body: { error?: string } = await res.json().catch(() => ({}))
        throw new Error(body.error ?? 'Something went wrong. Please try again.')
      }

      setStatus('done')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      )
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="text-center">
        <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-lync-light">
          <Check size={22} className="text-lync-dark" strokeWidth={2.5} />
        </span>
        <h3 className="font-display text-lg font-semibold uppercase tracking-normal text-dark sm:text-xl">
          You&apos;re in
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
          Check your inbox, your first email is on its way. While you wait, come
          say hi in the community group.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#5a96f5] to-lync-dark px-6 py-3 text-sm font-semibold text-white shadow-sm transition-shadow hover:shadow-md"
        >
          Join the WhatsApp group <ArrowRight size={18} />
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="text-left">
      <div className="space-y-3">
        <div>
          <label htmlFor="newsletter-name" className={LABEL_CLASS}>
            First Name
          </label>
          <input
            id="newsletter-name"
            name="name"
            type="text"
            autoComplete="given-name"
            placeholder="Your first name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={INPUT_CLASS}
          />
        </div>

        <div>
          <label htmlFor="newsletter-email" className={LABEL_CLASS}>
            Email <span className="text-lync">*</span>
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={INPUT_CLASS}
          />
        </div>
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#5a96f5] to-lync-dark px-6 py-3 text-sm font-semibold text-white shadow-sm transition-shadow hover:shadow-md disabled:opacity-60 sm:text-base"
      >
        {status === 'submitting' ? 'Signing you up…' : 'Sign up'}
        {status !== 'submitting' && <ArrowRight size={18} />}
      </button>

      <p className="mt-3 text-center text-xs text-muted">
        Madrid tips, free guides and upcoming events. Unsubscribe anytime.
      </p>
    </form>
  )
}
