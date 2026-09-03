import Image from 'next/image'
import { CtaMotionLink } from '@/components/ui/cta-hover'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet the founders of LYNC and learn about our mission to help international women build meaningful friendships in Madrid.',
  openGraph: {
    images: [{ url: '/brand/about-founders.webp', width: 1200, height: 630, alt: 'LYNC founders Rebecca and Cordelia' }],
  },
}

export default function AboutPage() {
  return (
    <div className="bg-cream">
      {/* Founders */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/brand/about-founders.webp"
                  alt="Rebecca and Cordelia, LYNC founders"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
            <div>
              <ScrollReveal delay={0.15}>
                <h1 className="mb-6 font-display text-3xl font-semibold uppercase tracking-normal md:text-4xl">
                  👋 Hey! We&apos;re<br />Rebecca and Cordelia
                </h1>
              </ScrollReveal>
              <div className="space-y-4 text-muted">
                <ScrollReveal delay={0.25}>
                  <p>
                    We&apos;re the founders of LYNC, and we know exactly what it&apos;s like to be new in Madrid.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.35}>
                  <p>
                    When we first moved here, we were searching for the same thing you probably are. Genuine friendships with amazing women who get it. Women who understand what it&apos;s like to navigate a new city, build a life from scratch, and crave real connection.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.45}>
                  <p>
                    We tried everything. Dating apps for friends (awkward). Random meetups (hit or miss). Hoping to click with coworkers (rarely happens). Nothing felt quite right.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.55}>
                  <p>
                    So we decided to create the community we wished existed. A safe, welcoming space where making friends doesn&apos;t have to be so hard. Where you can show up solo and leave with a group. Where everyone is here for the same reason: to build real, lasting friendships.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.65}>
                  <p className="font-semibold text-dark">
                    That&apos;s LYNC. And we&apos;re so glad you&apos;re here.
                  </p>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <ScrollReveal>
            <div className="bg-white rounded-3xl p-10 md:p-14 text-center shadow-sm">
              <Image
                src="/brand/ICON_BLUE.png"
                alt=""
                width={40}
                height={40}
                className="mx-auto mb-5 h-10 w-10 object-contain"
              />
              <h2 className="mb-6 font-display text-4xl font-semibold uppercase tracking-normal md:text-5xl">
                Ready to Join Us?
              </h2>
              <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
                Your Madrid friend group is waiting. Sign up and we&apos;ll send you what&apos;s coming up.
              </p>
              <CtaMotionLink
                href="/quiz"
                className="inline-flex items-center gap-2 bg-gradient-to-b from-[#5a96f5] to-lync-dark text-white font-semibold px-8 py-4 rounded-full text-lg shadow-sm transition-shadow hover:shadow-md"
              >
                Get Started <ArrowRight size={20} />
              </CtaMotionLink>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
