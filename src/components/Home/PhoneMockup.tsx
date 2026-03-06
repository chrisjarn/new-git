'use client'

import { m, useReducedMotion } from 'motion/react'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { Button } from '@/components/ui/Button'

export function PhoneMockup() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <m.section
      variants={staggerContainer(0.15)}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="relative flex flex-col items-center gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
    >
      {/* Phone on left */}
      <m.div
        variants={fadeUp}
        className="relative z-10 -mb-1 shrink-0"
      >
        <div
          className="mx-auto flex h-62.5 w-62.5 -scale-x-100 -ml-6 translate-y-1 flex-col justify-end bg-contain bg-bottom bg-no-repeat md:-ml-15 md:h-[280px] md:w-[280px] lg:h-[320px] lg:w-[320px]"
          style={{ backgroundImage: 'url(/images/home/phone-chrome.svg)' }}
        />
      </m.div>

      {/* Right side content */}
      <m.div
        variants={fadeUp}
        className="flex flex-col items-center gap-6 pb-4 lg:items-end lg:pb-8 lg:text-right"
      >
        <div className="flex flex-col items-center gap-2 lg:items-end">
          <h3 className="text-balance text-center text-[clamp(1.7rem,_3.5vw,_3rem)] font-semibold leading-12 lg:text-right">
            Safety management,
            <br />
            wherever you are.
          </h3>
       
        </div>

        <div className="flex flex-row gap-3">
                    <Button size='large'    variant="brand" href="/how-it-works">
            Book Demo
          </Button>
          <Button size='large'    variant="flat" href="/how-it-works">
            Contact Us
          </Button>
        </div>
      </m.div>
    </m.section>
  )
}
