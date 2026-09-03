import Image from 'next/image'
import { NewsletterSignup } from '@/components/newsletter/newsletter-signup'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Join the Community',
  description:
    'Sign up for the LYNC newsletter: Madrid tips, free guides and every upcoming event, straight to your inbox.',
  openGraph: {
    images: [
      {
        url: '/brand/COMMUNITY/pilates-group-laughing.webp',
        width: 1200,
        height: 630,
        alt: 'LYNC: Join the Community',
      },
    ],
  },
}

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col bg-cream pt-20">
      <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-5 sm:py-10">
        <div className="w-full max-w-xl">
          <div className="rounded-[1.75rem] border border-border bg-white p-6 shadow-lg sm:rounded-[2rem] sm:p-8 md:p-9">
            <div className="mb-5 flex justify-center">
              <Image
                src="/brand/ICON_BLUE.png"
                alt="LYNC"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
                priority
              />
            </div>

            <header className="mb-6 text-center">
              <h1 className="font-display text-2xl font-semibold uppercase tracking-normal text-dark sm:text-3xl">
                Find your <span className="text-lync">community</span>
              </h1>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                Drop your email and we&apos;ll send you Madrid tips, free guides
                and everything coming up.
              </p>
            </header>

            <NewsletterSignup />
          </div>
        </div>
      </div>
    </div>
  )
}
