'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence, m } from 'motion/react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { useScrollSpy } from '@/hooks/useScrollSpy'

const SECTION_IDS = ['features', 'sectors', 'compliance'] as const

const NAV_ITEMS = [
  { label: 'Features', href: '#features' },
  { label: 'Sectors', href: '#sectors' },
  { label: 'Compliance', href: '#compliance' },
] as const

const drawerVariants = {
  hidden: {
    top: 0,
    height: '0%',
    opacity: 0,
  },
  visible: {
    top: 0,
    height: '100%',
    opacity: 1,
  },
}

export function SiteNavigationBar() {
  const { ref, inView } = useInView()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const activeSection = useScrollSpy([...SECTION_IDS])

  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setShowMobileMenu(false)
  }, [])

  const scrollToTop = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <>
      <div ref={ref} className="absolute left-0 top-0 h-px w-px bg-transparent" />
      <div className="h-14" />
      <div className="pointer-events-none fixed isolate z-50 flex h-full w-full flex-col flex-nowrap bg-transparent">
        <div
          className={cn(
            'bg-primary-surface pointer-events-auto w-full items-center border-b py-2',
            {
              'border-transparent': inView,
              'border-black/5 dark:border-white/5': !inView,
              'border-border': showMobileMenu,
            }
          )}
        >
          <div className="mx-auto flex w-full flex-row flex-nowrap justify-between px-4">
            <div className="flex items-center justify-start">
              <a
                href="#hero"
                onClick={scrollToTop}
                className="-ml-1 flex h-10 w-10 items-center justify-center rounded-lg"
              >
                <Image
                  src="/img/desktop-app-icon.png"
                  className="h-10 w-10"
                  width={80}
                  height={80}
                  alt="ERA Safety"
                />
              </a>
            </div>

            <div className="flex items-center justify-end gap-1">
              <nav className="hidden sm:contents">
                {NAV_ITEMS.map((item) => {
                  const sectionId = item.href.slice(1)
                  const isActive = activeSection === sectionId
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => scrollTo(e, sectionId)}
                      className={cn(
                        'inline-flex h-8 items-center justify-center rounded-full px-3 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-secondary-surface text-primary'
                          : 'text-tertiary hover:text-primary hover:bg-secondary-surface/50'
                      )}
                    >
                      {item.label}
                    </a>
                  )
                })}
              </nav>

              <Button round variant="flat" href="/contact">
                Contact Us
              </Button>

              <button
                className={cn(
                  'ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors sm:hidden',
                  showMobileMenu
                    ? 'bg-tertiary-surface'
                    : 'hover:bg-tertiary-surface'
                )}
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                aria-label="Toggle Site Navigation Menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    className={cn(
                      'origin-center transition',
                      showMobileMenu && '-translate-x-[2.4px] translate-y-[1.6px] rotate-45'
                    )}
                    d="M6 9H19"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    className={cn(
                      'origin-center transition',
                      showMobileMenu && '-translate-x-[2.4px] -translate-y-[1.6px] -rotate-45'
                    )}
                    d="M6 15H19"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showMobileMenu && (
            <div className="pointer-events-auto relative flex flex-grow flex-col flex-nowrap justify-between sm:hidden">
              <m.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={drawerVariants}
                className="bg-primary-surface absolute left-0 top-0 z-50 flex h-full w-full flex-col flex-nowrap justify-between p-4 pb-6"
              >
                <ul className="grid grid-cols-1 gap-2">
                  {NAV_ITEMS.map((item) => {
                    const sectionId = item.href.slice(1)
                    return (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          onClick={(e) => scrollTo(e, sectionId)}
                          className={cn(
                            'flex h-12 w-full items-center rounded-lg px-3 text-lg font-medium transition-colors',
                            activeSection === sectionId
                              ? 'text-primary bg-secondary-surface'
                              : 'text-secondary hover:text-primary'
                          )}
                        >
                          {item.label}
                        </a>
                      </li>
                    )
                  })}
                  <li className="mt-8">
                    <Button
                      size="large"
                      variant="brand"
                      href="/contact"
                      fullWidth
                      className="h-12 text-lg"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Contact Us
                    </Button>
                  </li>
                </ul>
              </m.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export function ERAIcon() {
  return (
    <svg width="28" height="20" viewBox="0 0 45 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="pl-0.5">
      <path
        d="M0.681372 22.1605L12.8866 1.48822C13.1191 1.09451 13.5424 0.852905 13.9997 0.852905H33.883C34.8834 0.852905 35.5046 1.94033 34.9961 2.80162L22.7908 23.4739C22.5583 23.8676 22.135 24.1092 21.6777 24.1092H1.79447C0.793992 24.1092 0.172854 23.0217 0.681372 22.1605Z"
        fill="currentColor"
      />
      <path
        d="M29.2624 24.109H43.1511C44.1257 24.109 44.7497 23.0718 44.2927 22.2112L37.7342 9.86141C37.2612 8.97088 35.9956 8.94086 35.481 9.80796L28.1508 22.1578C27.6397 23.019 28.2606 24.109 29.2624 24.109Z"
        fill="currentColor"
      />
    </svg>
  )
}
