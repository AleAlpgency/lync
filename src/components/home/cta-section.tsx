'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight, CalendarDays } from 'lucide-react'

/** CTA over hero imagery, clipped to a wide oval — sits on solid lync blue */
export function CtaSection() {
  return (
    <section className="relative bg-lync pb-4 pt-16 md:pb-6 md:pt-20">
      <div className="mx-auto w-full max-w-screen-2xl px-6 sm:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-auto max-w-[56rem]"
        >
          <div className="relative w-full">
            {/* Soft rounded-rect — generous radius, not a pill */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)] ring-1 ring-white/25 sm:aspect-[1.8/1] sm:rounded-[4rem] md:rounded-[5.5rem]">
              <Image
                src="/brand/HERO-BG/hero-bg.webp"
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 56rem"
              />
              <div
                className="absolute inset-0 bg-black/50"
                aria-hidden
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center sm:px-10">
                <h2 className="max-w-2xl text-balance font-display text-xl font-semibold uppercase leading-tight tracking-normal text-white sm:text-2xl md:text-3xl md:leading-snug lg:text-4xl">
                  Ready to find your people in&nbsp;Madrid?
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-pretty text-sm leading-relaxed text-white/90 md:mt-4 md:text-base">
                  Drop your email and we&apos;ll point you toward events
                  and energy that fit you. No pressure, just a warmer
                  way&nbsp;in.
                </p>

                <div className="mt-6 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:mt-8 sm:max-w-none sm:w-auto sm:flex-row sm:gap-4">
                  <Link
                    href="/quiz"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-dark transition-all hover:bg-white/95 hover:shadow-lg sm:px-8 sm:py-4 sm:text-base"
                  >
                    Get Started
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                  <Link
                    href="/events"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/70 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-[2px] transition-all hover:border-white hover:bg-white/15 sm:px-8 sm:py-4 sm:text-base"
                  >
                    <CalendarDays size={18} />
                    Browse events
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
