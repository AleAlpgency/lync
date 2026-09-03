'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, CalendarPlus, ChevronDown } from 'lucide-react'
import { Event } from '@/lib/types'
import { cn } from '@/lib/utils'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { EventCard } from './event-card'

const CATEGORIES = ['All', 'Wellness', 'Social', 'Adventure', 'Creative', 'Nightlife'] as const
type Filter = (typeof CATEGORIES)[number]

const PAGE_SIZE = 6

const filterColors: Record<string, { active: string; inactive: string }> = {
  All: { active: 'bg-dark text-white', inactive: 'bg-white text-dark hover:bg-dark/5' },
  Wellness: { active: 'bg-emerald-600 text-white', inactive: 'bg-white text-emerald-700 hover:bg-emerald-50' },
  Social: { active: 'bg-amber-500 text-white', inactive: 'bg-white text-amber-700 hover:bg-amber-50' },
  Adventure: { active: 'bg-sky-600 text-white', inactive: 'bg-white text-sky-700 hover:bg-sky-50' },
  Creative: { active: 'bg-violet-600 text-white', inactive: 'bg-white text-violet-700 hover:bg-violet-50' },
  Nightlife: { active: 'bg-rose-500 text-white', inactive: 'bg-white text-rose-600 hover:bg-rose-50' },
}

interface EventsGridProps {
  events: Event[]
}

export function EventsGrid({ events }: EventsGridProps) {
  const [filter, setFilter] = useState<Filter>('All')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    if (filter === 'All') return events
    return events.filter((e) => e.category === filter)
  }, [events, filter])

  const shown = filtered.slice(0, visible)
  const hasMore = visible < filtered.length

  // Available categories (only show filters for categories that have events)
  const availableCategories = useMemo(() => {
    const cats = new Set(events.map((e) => e.category))
    return CATEGORIES.filter((c) => c === 'All' || cats.has(c as Event['category']))
  }, [events])

  function handleFilter(cat: Filter) {
    setFilter(cat)
    setVisible(PAGE_SIZE)
  }

  if (events.length === 0) {
    return (
      <ScrollReveal>
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-white px-8 py-12 text-center shadow-sm">
          <CalendarPlus size={40} className="mx-auto mb-4 text-lync" />
          <h3 className="mb-2 font-display text-xl font-semibold uppercase tracking-normal">
            New Events Coming Soon!
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-muted">
            We&apos;re cooking up the next round of events. Sign up so we
            can send them to you first, or join our WhatsApp group to be
            the first to know.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 rounded-full bg-lync px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lync-dark"
            >
              Sign Up <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    )
  }

  return (
    <>
      {/* ── Category filters ──────────────────────── */}
      {availableCategories.length > 2 && (
        <div className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
          {availableCategories.map((cat) => {
            const isActive = filter === cat
            const colors = filterColors[cat] || filterColors.All
            return (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={cn(
                  'shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200',
                  isActive
                    ? `${colors.active} border-transparent shadow-sm`
                    : `${colors.inactive} border-border`
                )}
              >
                {cat}
              </button>
            )
          })}
        </div>
      )}

      {/* ── Grid ──────────────────────────────────── */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((event) => (
          <ScrollReveal key={event.id} className="h-full">
            <EventCard event={event} />
          </ScrollReveal>
        ))}
      </div>

      {/* ── Show more ─────────────────────────────── */}
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-dark transition-all hover:border-lync/30 hover:shadow-sm"
          >
            Show More Events <ChevronDown size={16} />
          </button>
        </div>
      )}

      {/* ── No results for filter ─────────────────── */}
      {filtered.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted">No {filter.toLowerCase()} events right now — check back soon!</p>
        </div>
      )}
    </>
  )
}
