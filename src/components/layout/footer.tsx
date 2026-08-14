'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CtaMotionA } from '@/components/ui/cta-hover'
import { MessageCircle } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/constants'

function WhatsAppFab() {
  const [lifted, setLifted] = useState(false)

  useEffect(() => {
    const el = document.documentElement
    const observer = new MutationObserver(() => {
      setLifted(el.getAttribute('data-sticky-cta') === '1')
    })
    observer.observe(el, { attributes: true, attributeFilter: ['data-sticky-cta'] })
    // check initial state
    setLifted(el.getAttribute('data-sticky-cta') === '1')
    return () => observer.disconnect()
  }, [])

  return (
    <CtaMotionA
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-6 z-40 rounded-full bg-[#25D366] p-3.5 text-white shadow-lg transition-all duration-300 hover:shadow-xl"
      style={{ bottom: lifted ? 76 : 24 }}
      aria-label="WhatsApp"
    >
      <MessageCircle size={22} />
    </CtaMotionA>
  )
}

export function Footer() {
  return (
    <>
      <WhatsAppFab />

      <footer className="bg-lync text-white">
        <div className="mx-auto max-w-6xl px-5 py-10 md:py-12">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
            {/* Logo + tagline */}
            <div className="text-center md:text-left">
              <Link href="/" className="relative mb-3 inline-block h-8 md:h-9" aria-label="LYNC — Home">
                <Image
                  src="/brand/LOGO_WHITETEXT_NOBG.png"
                  alt=""
                  width={640}
                  height={200}
                  className="block h-8 w-auto max-w-[9rem] object-contain md:h-9 md:max-w-[10rem]"
                  sizes="160px"
                />
              </Link>
              <p className="max-w-xs text-sm leading-relaxed text-white/55">
                Making meaningful friendships in Madrid, one event at a time.
              </p>
            </div>

            {/* Links */}
            <nav className="flex gap-10 text-center md:gap-14 md:text-left">
              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/45">
                  Explore
                </h4>
                <ul className="space-y-2">
                  {[
                    { href: '/events', label: 'Events' },
                    { href: '/retreats', label: 'Retreats' },
                    { href: '/blog', label: 'Blog' },
                    { href: '/about', label: 'About' },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/45">
                  Connect
                </h4>
                <ul className="space-y-2">
                  {[
                    { href: '/quiz', label: 'Take the Quiz' },
                    { href: 'https://www.instagram.com/lyncevents/', label: 'Instagram', external: true },
                    { href: 'https://www.tiktok.com/@lyncevents', label: 'TikTok', external: true },
                  ].map((link) => (
                    <li key={link.label}>
                      {'external' in link ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 transition-colors hover:text-white">
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 text-xs text-white/35 md:flex-row">
            <p>&copy; 2026 LYNC Events. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <a href="#" className="transition-colors hover:text-white/55">Privacy</a>
              <a href="#" className="transition-colors hover:text-white/55">Cookies</a>
              <span className="mx-1 hidden h-3 w-px bg-white/15 md:block" />
              <div className="flex items-center gap-3">
                <a href="https://www.instagram.com/lyncevents/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white/55" aria-label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                </a>
                <a href="https://www.tiktok.com/@lyncevents" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white/55" aria-label="TikTok">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
