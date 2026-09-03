'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { NewsletterSignup } from '@/components/newsletter/newsletter-signup'
import { PAGE_SHELL } from '@/lib/page-shell'

export function NewsletterSection() {
  return (
    <section className="bg-cream pb-12 pt-10 md:pb-16 md:pt-14">
      <div className={PAGE_SHELL}>
        <motion.div
          className="mx-auto w-full max-w-xl rounded-[1.75rem] border border-lync/15 bg-white p-6 shadow-[0_12px_40px_-8px_rgba(54,121,241,0.18)] sm:rounded-3xl sm:p-8 md:p-9"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="mb-5 flex justify-center">
            <Image
              src="/brand/ICON_BLUE.png"
              alt="LYNC"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
          </div>

          <header className="mb-6 text-center">
            <h2 className="font-display text-xl font-semibold uppercase tracking-normal text-dark sm:text-2xl md:text-[1.65rem]">
              Find your <span className="text-lync">community</span>
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
              Drop your email and we&apos;ll send you Madrid tips, free guides
              and everything coming up.
            </p>
          </header>

          <NewsletterSignup />
        </motion.div>
      </div>
    </section>
  )
}
