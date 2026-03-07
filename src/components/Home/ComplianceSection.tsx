'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { m, useInView, useReducedMotion } from 'motion/react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from '@gravity-ui/icons'
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion'
import { CheckCircleFilledIcon } from '@/components/ui/Icons'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'

const standards = [
  {
    code: 'AS 3745-2010',
    title: 'Planning for Emergencies in Facilities',
    items: [
      'Emergency planning committee formation',
      'Emergency plan development and maintenance',
      'Warden training and appointment',
      'Evacuation exercises and drills',
    ],
  },
  {
    code: 'AS 4083-2010',
    title: 'Planning for Emergencies: Health Care Facilities',
    items: [
      'Healthcare-specific evacuation procedures',
      'Patient movement and triage protocols',
      'Staff competency requirements',
      'Facility-specific emergency plans',
    ],
  },
  {
    code: 'WHS Regulations',
    title: 'Work Health & Safety Regulations',
    items: [
      'Emergency plan obligations under WHS Act',
      'First aid and evacuation requirements',
      'Worker consultation and representation',
      'Incident notification and record-keeping',
    ],
  },
  {
    code: 'ISO 45001',
    title: 'Occupational Health & Safety Management',
    items: [
      'Emergency preparedness and response (8.2)',
      'Risk assessment and hazard identification',
      'Competence, training, and awareness',
      'Performance evaluation and continual improvement',
    ],
  },
]

export function ComplianceSection() {
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
      {/* Header */}
      <div className="mx-auto flex w-full max-w-5xl items-end justify-between gap-4 px-4 md:px-6 lg:px-8">
        <m.div variants={fadeUp} className="flex flex-col items-start gap-3">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
            Compliance
          </span>
          <AnimatedTitle className="max-w-xl">Your obligations, covered.</AnimatedTitle>
        </m.div>

        <m.div variants={fadeUp} className="hidden shrink-0 gap-2 md:flex">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous standard"
            className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border-primary bg-elevated-surface text-primary transition-colors hover:bg-tertiary-surface disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft width={18} height={18} />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next standard"
            className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border-primary bg-elevated-surface text-primary transition-colors hover:bg-tertiary-surface disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight width={18} height={18} />
          </button>
        </m.div>
      </div>

      {/* Carousel */}
      <m.div variants={fadeUp} className="w-full overflow-hidden">
        <div
          ref={emblaRef}
          className="mx-auto w-full max-w-5xl px-4 md:px-6 lg:px-8"
        >
          <div className="-ml-4 flex">
            {standards.map((standard) => (
              <div
                key={standard.code}
                className="min-w-0 shrink-0 basis-[85%] pl-4 sm:basis-[60%] md:basis-[45%]"
              >
                <div className="flex h-full flex-col gap-4 rounded-2xl bg-secondary-surface p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold uppercase tracking-wider text-brand-primary">
                      {standard.code}
                    </span>
                    <h3 className="text-base font-semibold">{standard.title}</h3>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {standard.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-secondary">
                        <CheckCircleFilledIcon size={16} className="mt-0.5 flex-none text-accent-green" />
                        {item}
                      </li>
                    ))}
                  </ul>
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
          aria-label="Previous standard"
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border-primary bg-elevated-surface text-primary transition-colors hover:bg-tertiary-surface disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft width={18} height={18} />
        </button>
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Next standard"
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border-primary bg-elevated-surface text-primary transition-colors hover:bg-tertiary-surface disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronRight width={18} height={18} />
        </button>
      </m.div>
    </m.section>
  )
}
