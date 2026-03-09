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
      className="relative"
    >
      {/* Phone — in flow, drives section height */}
      <m.div
        variants={fadeUp}
        className="relative z-10 -mb-1 pt-12 md:pt-0"
      >
        <div
          className="mx-auto -translate-x-4 flex h-96 w-96 -scale-x-100 flex-col justify-end bg-contain bg-bottom bg-no-repeat md:translate-x-0 md:mx-0 md:-ml-15 md:h-[280px] md:w-[280px] lg:h-[320px] lg:w-[320px]"
          style={{ backgroundImage: 'url(/images/home/phone-chrome.svg)' }}
        />
      </m.div>

      {/* Text + CTA — absolute, positioned over phone area */}
      <m.div
        variants={fadeUp}
        className="absolute inset-x-0 bottom-3 z-20 flex flex-col items-center gap-4 px-4 lg:bottom-8 lg:right-0 lg:left-auto lg:items-end lg:text-right lg:px-0"
      >
        <h3 className="text-balance text-center text-[clamp(1.7rem,_3.5vw,_3rem)] font-semibold leading-8 lg:leading-12 lg:text-right">
          Safety management,
          <br />
          wherever you are.
        </h3>

        <div className="flex flex-row gap-3">
          <Button size="large" variant="brand" href="/contact">
            Book Demo
          </Button>
          <Button size="large" variant="flat" href="/contact">
            Contact Us
          </Button>
        </div>
      </m.div>
    </m.section>
  )
}
