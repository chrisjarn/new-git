import Link from 'next/link'
import { ERAIcon } from '@/components/SiteNavigationBar'
import { WidthContainer } from '@/components/Layouts/WidthContainer'
import { XIcon, LinkedInIcon } from '@/components/ui/Icons'

export function Footer() {
  return (
    <>
      <div className="relative hidden dark:block">
        <div className="absolute bottom-0 left-0 right-0 z-30 h-px bg-gradient-to-r from-white via-neutral-200 to-white dark:from-gray-950 dark:via-gray-750 dark:to-gray-950" />
      </div>

      <div className="flex w-full justify-center border-t py-12 md:py-16 lg:py-20 2xl:py-24 dark:border-transparent">
        <WidthContainer className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-primary select-none">
              <div className="flex items-center gap-1.5">
                <ERAIcon />
                <span className="text-primary text-lg font-semibold">ERA Safety</span>
              </div>
            </Link>
            <p className="text-tertiary max-w-[32ch] text-sm">
              One platform for building safety, compliance, and emergency readiness.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: <XIcon />, label: 'X/Twitter', href: '#' },
                { icon: <LinkedInIcon />, label: 'LinkedIn', href: '#' },
              ].map((social) => (
                <Link
                  key={social.label}
                  className="text-quaternary hover:text-primary text-sm"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{social.label}</span>
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/contact" className="text-tertiary hover:text-primary">
              Contact Us
            </Link>
            <Link href="/privacy" className="text-tertiary hover:text-primary">
              Privacy
            </Link>
            <Link href="/terms" className="text-tertiary hover:text-primary">
              Terms
            </Link>
          </div>
        </WidthContainer>
      </div>

      <div className="flex w-full justify-center border-t border-black/5 py-6 dark:border-white/5">
        <WidthContainer>
          <p className="text-quaternary text-xs">
            &copy; {new Date().getFullYear()} ERA Safety. All rights reserved.
          </p>
        </WidthContainer>
      </div>
    </>
  )
}
