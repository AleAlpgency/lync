'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useLayoutEffect } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'

import { PAGE_SHELL } from '@/lib/page-shell'

const ROW_H = 'min-h-[2.25rem] md:min-h-[2.5rem]'

/** Keep 1px border always so scroll state doesn’t reflow layout */
const navShellTransition =
  'transition-[background-color,backdrop-filter,box-shadow,border-color] duration-200 ease-out'

/** Desktop nav links: same tap/hit padding in hero + scrolled so nothing "shrinks" on scroll */
const DESKTOP_LINK_PAD =
  'rounded-full px-2 py-1 transition-[color,text-decoration-color] duration-150'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  /* Check scroll position before paint to avoid hero flash */
  const useBrowserLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect
  useBrowserLayoutEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  /** Full-bleed hero behind nav — white logo/links until scroll */
  const isHeroNav =
    pathname === '/' ||
    pathname === '/accommodations' ||
    pathname === '/events'
  /** Use dark (black text, blue logo) on inner pages or when scrolled */
  const dark = scrolled || !isHeroNav
  /** Show white container only after scrolling — all pages start transparent */
  const showContainer = scrolled

  const links = [
    { href: '/about', label: 'About' },
    { href: '/events', label: 'Events' },
    { href: '/retreats', label: 'Retreats' },
    { href: '/blog', label: 'Blog' },
    { href: '/study-abroad', label: 'Study Abroad' },
    { href: '/guides', label: 'Guides' },
    { href: '/accommodations', label: 'Accommodations' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
      <nav style={{ fontFamily: 'var(--font-nav)' }} className="pointer-events-auto pt-3">
        <div className={PAGE_SHELL}>
          <div
            className={`w-full rounded-full px-3 py-1.5 md:px-4 md:py-1.5 ${navShellTransition} ${
              showContainer
                ? 'border border-white/40 bg-white/60 shadow-xl backdrop-blur-xl backdrop-saturate-150'
                : 'border border-transparent bg-transparent shadow-none [backdrop-filter:none]'
            }`}
          >
            <div className={`hidden md:grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-0 ${ROW_H}`}>
              <Link
                href="/"
                className="relative h-6 w-24 shrink-0 justify-self-start"
                aria-label="LYNC — Home"
              >
                <Image
                  src={dark ? '/brand/LOGO_BLUETEXT_NOBG.png' : '/brand/LOGO_WHITETEXT_NOBG.png'}
                  alt=""
                  fill
                  className="object-contain object-left"
                  sizes="120px"
                  priority
                />
              </Link>

              <div className="flex items-center justify-center gap-0.5 lg:gap-1">
                {links.map((link) => {
                  const isActive = pathname === link.href
                  let linkClass: string
                  let heroHover: string
                  if (dark) {
                    linkClass = isActive
                      ? 'text-black font-bold border border-black/15'
                      : 'text-black border border-transparent hover:border-black/15'
                    heroHover = 'bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lync focus-visible:ring-offset-2'
                  } else {
                    linkClass = isActive ? 'text-white font-bold' : 'text-white'
                    heroHover = 'border border-transparent bg-transparent hover:border-border hover:bg-white hover:text-black hover:shadow-sm focus-visible:border-border focus-visible:bg-white focus-visible:text-black focus-visible:outline-none'
                  }
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`inline-flex items-center justify-center text-[13px] font-semibold leading-none lg:text-sm ${DESKTOP_LINK_PAD} ${linkClass} ${heroHover}`}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>

              <div className="flex justify-self-end">
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-[#5a96f5] to-lync-dark px-3.5 py-1.5 text-[13px] font-semibold text-white shadow-sm transition-shadow duration-150 hover:shadow-md lg:px-4 lg:text-sm"
                >
                  Get Started <ArrowRight size={14} strokeWidth={2.25} />
                </Link>
              </div>
            </div>

            <div className={`flex items-center md:hidden ${ROW_H} pl-0 pr-0`}>
              <Link href="/" className="relative h-8 w-28 shrink-0" aria-label="LYNC — Home">
                <Image
                  src={dark ? '/brand/LOGO_BLUETEXT_NOBG.png' : '/brand/LOGO_WHITETEXT_NOBG.png'}
                  alt=""
                  fill
                  className="object-contain object-left"
                  sizes="128px"
                  priority
                />
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`ml-auto p-1.5 transition-colors duration-150 ${dark ? 'text-black' : 'text-white'}`}
                aria-label="Menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className={`${PAGE_SHELL} mt-2 md:hidden`}>
            <div className="animate-scale-in rounded-2xl border border-border bg-white p-5 shadow-2xl">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-xl py-3 px-4 text-base font-semibold ${
                    pathname === link.href ? 'bg-lync-light text-lync' : 'text-dark hover:bg-surface'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/quiz"
                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#5a96f5] to-lync-dark py-3 text-base font-semibold text-white shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                Get Started <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
