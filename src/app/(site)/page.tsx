import { HeroSection } from '@/components/home/hero'
import { TrustBento } from '@/components/home/trust-bento'
import { ThisMonth } from '@/components/home/this-month'
import { WhyLync } from '@/components/home/why-lync'
import { NewsletterSection } from '@/components/home/newsletter-section'
import { EventsShowcase } from '@/components/home/events-showcase'
import { Testimonials } from '@/components/home/testimonials'
import { FaqSection } from '@/components/home/faq-section'
import { BrandStripMarquee } from '@/components/home/brand-strip-marquee'
import { BlogSection } from '@/components/home/blog-section'
import { CtaSection } from '@/components/home/cta-section'
import { getAllBlogs } from '@/lib/sanity/fetchers'

export default async function Home() {
  const blogPosts = await getAllBlogs()

  return (
    <>
      <HeroSection />
      <BrandStripMarquee />
      <TrustBento />
      <ThisMonth />
      <WhyLync />
      <NewsletterSection />
      <EventsShowcase />
      <Testimonials />
      <FaqSection />
      <BrandStripMarquee />
      <BlogSection posts={blogPosts} />
      <CtaSection />
    </>
  )
}
