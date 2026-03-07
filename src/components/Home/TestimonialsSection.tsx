'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { m, useInView, useReducedMotion } from 'motion/react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from '@gravity-ui/icons'
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { MapIllustration } from './MapIllustration'

const testimonials = [
  {
    quote:
      'ERA gives me complete oversight across 70+ sites. Tenants meet their WHS obligations easily\u00A0\u2014 reducing our collective liability as a PCBU.',
    name: 'Toby Bridges',
    role: 'Senior Asset Manager',
    company: 'MLV / McGees',
  },
  {
    quote:
      'Every drill, training certificate and incident report is centralised. Audit prep time dropped significantly across our 20 locations and 300+ workforce.',
    name: 'Ryan Kinners',
    role: 'HSE Manager',
    company: 'CSE Global',
  },
  {
    quote:
      'I don\u2019t have time to keep up with growing WHS requirements. ERA makes it manageable\u00A0\u2014 one mobile-first system that keeps everything in one place.',
    name: 'Steven Middleton',
    role: 'Business Owner',
    company: 'Easy Scaffolding',
  },
]

export function TestimonialsSection() {
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
      className="relative flex w-full flex-col gap-6 py-6 md:gap-12 md:pt-0 md:pb-16 lg:pb-20 xl:pb-24"
    >
      {/* Map as full-section background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-40">
        <div className="absolute bottom-[-10%] left-0 right-0 top-[50%]">
          <MapIllustration />
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl items-end justify-between gap-4 px-4 md:px-6 lg:px-8">
        <m.div variants={fadeUp} className="flex flex-col items-start gap-3">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
            What our customers say
          </span>
          <AnimatedTitle className="max-w-3xl">{['Trusted across', 'Australia and New Zealand']}</AnimatedTitle>
        </m.div>

        <m.div variants={fadeUp} className="hidden shrink-0 gap-2 md:flex">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous testimonial"
            className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border-primary bg-elevated-surface text-primary transition-colors hover:bg-tertiary-surface disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft width={18} height={18} />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next testimonial"
            className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border-primary bg-elevated-surface text-primary transition-colors hover:bg-tertiary-surface disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight width={18} height={18} />
          </button>
        </m.div>
      </div>

      {/* Carousel */}
      <m.div variants={fadeUp} className="relative z-10 w-full overflow-hidden">
        <div ref={emblaRef} className="mx-auto w-full max-w-5xl px-4 md:px-6 lg:px-8">
          <div className="-ml-4 flex">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="min-w-0 shrink-0 basis-[85%] pl-4 sm:basis-[60%] md:basis-[45%]"
              >
                <blockquote className="flex h-full flex-col gap-5 rounded-2xl bg-card/80 p-6 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md">
                  <p className="text-pretty text-base leading-relaxed text-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-auto flex items-center gap-3">
                    <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-linear-to-b from-[#ABBDD5] to-[#7680BA] text-sm font-semibold text-white outline outline-black/5 -outline-offset-1">
                      {t.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-foreground">{t.name}</span>
                      <span className="text-sm text-secondary">{t.role}, {t.company}</span>
                    </div>
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </m.div>

      {/* Mobile arrows */}
      <m.div variants={fadeUp} className="relative z-10 mx-auto flex w-full max-w-5xl gap-2 px-4 md:hidden">
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label="Previous testimonial"
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border-primary bg-elevated-surface text-primary transition-colors hover:bg-tertiary-surface disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft width={18} height={18} />
        </button>
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Next testimonial"
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border-primary bg-elevated-surface text-primary transition-colors hover:bg-tertiary-surface disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronRight width={18} height={18} />
        </button>
      </m.div>
    </m.section>
  )
}
