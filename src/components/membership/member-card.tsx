import Image from 'next/image'
import { LiveClock } from './live-clock'

// The digital member card. /member/[id] shows it with live Stripe data;
// the membership page shows a sample so visitors see what they get.
export function MemberCard({ name, since, active }: { name: string; since: string; active: boolean }) {
  return (
    <div
      className={`w-full max-w-sm overflow-hidden rounded-3xl shadow-xl ${active ? 'bg-lync' : 'bg-neutral-500'}`}
    >
      <div className="p-7 text-white">
        <div className="mb-10 flex items-center justify-between">
          <Image src="/brand/LOGO_WHITETEXT_NOBG.png" alt="LYNC" width={88} height={24} />
          <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
            Member
          </span>
        </div>
        <p className="mb-1 text-xs uppercase tracking-widest text-white/60">Name</p>
        <p className="mb-6 font-display text-3xl font-semibold uppercase leading-tight tracking-normal break-words">
          {name}
        </p>
        <p className="mb-1 text-xs uppercase tracking-widest text-white/60">Member since</p>
        <p className="text-lg font-semibold">{since}</p>
      </div>
      <div className="flex items-center justify-between gap-3 bg-white px-7 py-5">
        <span
          className={`inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide ${active ? 'text-green-700' : 'text-red-700'}`}
        >
          <span
            className={`h-2.5 w-2.5 rounded-full ${active ? 'animate-pulse bg-green-600' : 'bg-red-600'}`}
          />
          {active ? 'Active' : 'Not active'}
        </span>
        <span className="text-xs text-muted">
          <LiveClock />
        </span>
      </div>
    </div>
  )
}
