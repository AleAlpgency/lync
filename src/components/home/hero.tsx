'use client'

import Link from 'next/link'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { motion } from 'motion/react'
import ShinyText from '@/components/ui/shiny-text'
import SpotlightCard from '@/components/ui/spotlight-card'

import { PAGE_SHELL } from '@/lib/page-shell'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as const },
})


export function HeroSection() {
  return (
    <section className="relative min-h-dvh overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/brand/HERO-BG/hero-bg.webp"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/brand/HERO-BG/hero-bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/30" />

        <div
          className={`relative z-10 grid min-h-dvh place-content-center gap-10 pb-24 pt-24 text-center sm:pt-28 md:gap-12 md:text-left lg:grid-cols-2 lg:items-center lg:gap-16 lg:pb-28 ${PAGE_SHELL}`}
        >
          <div className="flex flex-col items-center md:items-start">
            {/* Social proof badge — desktop only */}
            <motion.div
              className="mb-6 hidden items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-md md:inline-flex"
              {...fadeUp(0)}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
              </span>
              <span className="text-sm font-semibold text-white sm:text-base">
                <span className="font-bold">2,300+</span> women connected worldwide
              </span>
            </motion.div>

            <h1 className="font-display text-[2.25rem] font-bold leading-[1.12] tracking-tight text-white min-[400px]:text-[2.5rem] sm:text-4xl md:text-5xl lg:text-[2.5rem] xl:text-[3.35rem] 2xl:text-6xl">
              <motion.span className="block" {...fadeUp(0.1)}>
                Make Friends
              </motion.span>
              <motion.span className="block" {...fadeUp(0.25)}>
                in Madrid <span className="italic">in Minutes.</span>
              </motion.span>
            </h1>

            {/* Video — mobile: below heading */}
            <motion.div className="mt-6 w-full lg:hidden" {...fadeUp(0.3)}>
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
                <video
                  autoPlay
                  muted
                  controls
                  playsInline
                  poster="/brand/HERO-BG/lync-intro-poster.webp"
                  className="h-full w-full object-cover"
                >
                  <source src="/brand/HERO-BG/lync-intro.mp4" type="video/mp4" />
                </video>
              </div>
            </motion.div>

            <motion.p
              className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-white sm:text-xl md:mt-6"
              {...fadeUp(0.45)}
            >
              Join the fastest-growing community of international women building real friendships through curated events. No awkward apps, just real connection.
            </motion.p>

            <motion.div
              className="mt-8 flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center"
              {...fadeUp(0.6)}
            >
              <Link
                href="/quiz"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-[#5a96f5] to-lync-dark px-8 py-4 text-lg font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-lg hover:shadow-lync/30"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                <ShinyText text="Sign Up" color="#ffffff" shineColor="#a8d4ff" speed={4} />
                <ArrowRight size={20} className="relative transition-transform group-hover:translate-x-0.5" />
              </Link>
              <SpotlightCard
                className="rounded-full"
                spotlightColor="rgba(255,255,255,0.15)"
              >
                <Link
                  href="/events"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-dark transition-colors duration-150 hover:bg-white/90"
                >
                  <CalendarDays size={18} className="text-dark" />
                  Upcoming Events
                </Link>
              </SpotlightCard>
            </motion.div>
          </div>

          {/* Video — desktop: shown on the right */}
          <motion.div className="hidden w-full lg:block" {...fadeUp(0.5)}>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
              <video
                autoPlay
                muted
                controls
                playsInline
                poster="/brand/HERO-BG/lync-intro-poster.webp"
                className="h-full w-full object-cover"
              >
                <source src="/brand/HERO-BG/lync-intro.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>
        </div>
    </section>
  )
}
