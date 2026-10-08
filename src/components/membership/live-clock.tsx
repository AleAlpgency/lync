'use client'

import { useEffect, useState } from 'react'

// A ticking clock proves the card is live, not a screenshot.
export function LiveClock() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    const tick = () => setNow(new Date())
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  if (!now) return <span>&nbsp;</span>
  return (
    <span className="tabular-nums">
      {now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
      {' · '}
      {now.toLocaleTimeString('en-GB')}
    </span>
  )
}
