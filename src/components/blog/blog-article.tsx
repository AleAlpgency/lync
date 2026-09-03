'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { type BlogPost, formatBlogDate, CATEGORY_COLORS } from '@/data/blog-posts'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] as const },
})

export function BlogArticle({ post, otherPosts }: { post: BlogPost; otherPosts: BlogPost[] }) {
  const catColor = CATEGORY_COLORS[post.category]

  return (
    <main className="bg-cream pt-22 pb-12 md:pt-26 md:pb-16">
      <article className="mx-auto max-w-3xl px-5 sm:px-8">
        {/* Back + meta row */}
        <motion.div className="mb-4 flex items-center justify-between" {...fadeUp(0)}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-dark"
          >
            <ArrowLeft size={14} /> All posts
          </Link>
          <div className="flex items-center gap-2.5">
            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${catColor?.bg ?? 'bg-lync-light'} ${catColor?.text ?? 'text-lync'}`}>
              {post.category}
            </span>
            <time className="text-xs font-medium text-muted" dateTime={post.date}>
              {formatBlogDate(post.date)}
            </time>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-display text-2xl font-semibold leading-tight tracking-normal text-dark sm:text-3xl md:text-4xl"
          {...fadeUp(0.1)}
        >
          {post.title}
        </motion.h1>

        {/* Hero image */}
        <motion.div
          className="relative mt-5 aspect-[2/1] w-full overflow-hidden rounded-2xl md:mt-6"
          {...fadeUp(0.2)}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 48rem"
            priority
          />
        </motion.div>

        {/* Body */}
        <div className="mt-6 space-y-6 md:mt-8">
          {post.content.map((section, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              {section.heading && (
                <h2 className="mb-2 font-display text-lg font-semibold text-dark sm:text-xl">
                  {section.heading}
                </h2>
              )}
              {section.body.map((paragraph, j) => (
                <p
                  key={j}
                  className="mt-2.5 text-[0.9375rem] leading-[1.75] text-dark/90 first:mt-0 md:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal>
          <div className="mt-8 rounded-2xl border border-border bg-white p-5 text-center shadow-sm sm:p-6 md:mt-10">
            <h3 className="font-display text-lg font-semibold uppercase text-dark sm:text-xl">
              Ready to join?
            </h3>
            <p className="mx-auto mt-1.5 max-w-md text-sm leading-relaxed text-muted">
              Drop your email and we&apos;ll send you events that fit your vibe.
            </p>
            <Link
              href="/quiz"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#5a96f5] to-lync-dark px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md"
            >
              Get Started <ArrowRight size={15} />
            </Link>
          </div>
        </ScrollReveal>
      </article>

      {/* Related posts */}
      {otherPosts.length > 0 && (
        <section className="mx-auto mt-10 max-w-5xl px-5 sm:px-8 md:mt-12">
          <ScrollReveal>
            <h2 className="mb-5 font-display text-lg font-semibold uppercase tracking-normal text-dark sm:text-xl">
              Keep reading
            </h2>
          </ScrollReveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {otherPosts.map((related, i) => {
              const relColor = CATEGORY_COLORS[related.category]
              return (
                <ScrollReveal key={related.slug} delay={i * 0.1}>
                  <Link
                    href={`/blog/${related.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                      <span className={`mb-1.5 inline-block w-fit rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${relColor?.bg ?? 'bg-lync-light'} ${relColor?.text ?? 'text-lync'}`}>
                        {related.category}
                      </span>
                      <h3 className="font-display text-base font-semibold leading-snug text-dark group-hover:text-lync">
                        {related.title}
                      </h3>
                      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">
                        {related.excerpt}
                      </p>
                    </div>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
        </section>
      )}
    </main>
  )
}
