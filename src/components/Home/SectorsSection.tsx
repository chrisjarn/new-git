'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { m, useInView, useReducedMotion } from 'motion/react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from '@gravity-ui/icons'
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion'
import { Button } from '@/components/ui/Button'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'

const sectors = [
  {
    name: 'Healthcare',
    description:
      'Patient movement protocols, triage procedures, and staff competency, managed in one place.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" /></svg>
    ),
  },
  {
    name: 'Aged Care',
    description:
      'Vulnerable occupant plans, regulatory compliance, and staff training. No more paper trails.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
    ),
  },
  {
    name: 'Government',
    description:
      'High foot traffic, public safety obligations, and multi-agency coordination, simplified.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" /></svg>
    ),
  },
  {
    name: 'Commercial Property',
    description:
      'Multi-tenant compliance, warden management, and portfolio-wide visibility from one dashboard.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" /></svg>
    ),
  },
  {
    name: 'Retail',
    description:
      'Dynamic occupancy, public access points, and evacuation complexity, handled automatically.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
    ),
  },
  {
    name: 'Education',
    description:
      'Multi-building campuses, staff and student safety, and complex drill logistics in one system.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
    ),
  },
]

export function SectorsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, viewportOnce)
  const prefersReducedMotion = useReducedMotion()
  const animate = prefersReducedMotion || isInView ? 'visible' : 'hidden'

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
  })

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('init', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('init', onSelect)
    }
  }, [emblaApi])

  return (
    <m.section
      ref={ref}
      variants={staggerContainer(0.1)}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      animate={animate}
      className="flex w-full flex-col gap-10 py-8 md:gap-12 md:py-16 lg:py-20 xl:py-24"
    >
      {/* Header — constrained to max-w-5xl like other sections */}
      <div className="mx-auto flex w-full max-w-5xl items-end justify-between gap-4 px-4 md:px-6 lg:px-8">
        <m.div variants={fadeUp} className="flex flex-col items-start gap-3">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
            Sectors
          </span>
          <AnimatedTitle>Built for the realities of your industry</AnimatedTitle>
        </m.div>

        <m.div variants={fadeUp} className="hidden shrink-0 gap-2 md:flex">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous sector"
            className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border-primary bg-elevated-surface text-primary transition-colors hover:bg-tertiary-surface disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft width={18} height={18} />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next sector"
            className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border-primary bg-elevated-surface text-primary transition-colors hover:bg-tertiary-surface disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight width={18} height={18} />
          </button>
        </m.div>
      </div>

      {/* Carousel — full-width, left edge aligned with max-w-5xl content */}
      <m.div variants={fadeUp} className="w-full overflow-hidden">
        <div
          ref={emblaRef}
          className="mx-auto w-full max-w-5xl px-4 md:px-6 lg:px-8"
        >
          <div className="-ml-4 flex">
            {sectors.map((sector) => (
              <div
                key={sector.name}
                className="min-w-0 shrink-0 basis-[80%] sm:basis-[45%] md:basis-[calc(100%/3.5)] pl-4"
              >
                <div className="flex h-full flex-col gap-4 rounded-2xl bg-secondary-surface p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="text-brand-primary">{sector.icon}</div>
                  <h3 className="text-base font-semibold">{sector.name}</h3>
                  <p className="text-pretty text-sm leading-relaxed text-secondary">
                    {sector.description}
                  </p>
                  <Button variant="none" className="mt-auto self-start px-0 text-sm font-medium">
                    See how
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </m.div>

      {/* Mobile arrows — below carousel */}
      <m.div variants={fadeUp} className="mx-auto flex w-full max-w-5xl gap-2 px-4 md:hidden">
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label="Previous sector"
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border-primary bg-elevated-surface text-primary transition-colors hover:bg-tertiary-surface disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft width={18} height={18} />
        </button>
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Next sector"
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border-primary bg-elevated-surface text-primary transition-colors hover:bg-tertiary-surface disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronRight width={18} height={18} />
        </button>
      </m.div>
    </m.section>
  )
}
