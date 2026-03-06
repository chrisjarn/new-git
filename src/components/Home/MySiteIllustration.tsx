'use client'

import { useMemo, useRef } from 'react'
import { m, useInView, useReducedMotion } from 'motion/react'
import useMeasure from 'react-use-measure'
import { DocumentIllustration } from '@/components/illustrations/document'
import { DocumentPdfIllustration } from '@/components/illustrations/document-pdf'
import { DocumentDocxIllustration } from '@/components/illustrations/document-docx'
import { DocumentXlxIllustration } from '@/components/illustrations/document-xlx'
import { EraLogo } from '@/components/illustrations/era-logo'

const easeSwift = [0.19, 1, 0.22, 1] as const

const docCards = [
  { label: 'Evacuation Plan.pdf', Illustration: DocumentPdfIllustration, scattered: { x: '-12%', y: '-18%', rotate: -8 } },
  { label: 'Emergency Procedures.docx', Illustration: DocumentDocxIllustration, scattered: { x: '22%', y: '-22%', rotate: 5 } },
  { label: 'Warden Register.xlsx', Illustration: DocumentXlxIllustration, scattered: { x: '78%', y: '-16%', rotate: 7 } },
  { label: 'Floor Diagram.png', Illustration: DocumentIllustration, scattered: { x: '52%', y: '-4%', rotate: -4 } },
  { label: 'Fire Safety Statement.pdf', Illustration: DocumentPdfIllustration, scattered: { x: '82%', y: '10%', rotate: -6 } },
  { label: 'Drill Log.csv', Illustration: DocumentXlxIllustration, scattered: { x: '-16%', y: '18%', rotate: -5 } },
  { label: 'Risk Assessment.pdf', Illustration: DocumentPdfIllustration, scattered: { x: '84%', y: '30%', rotate: 6 } },
  { label: 'Training Record.docx', Illustration: DocumentDocxIllustration, scattered: { x: '-10%', y: '34%', rotate: 7 } },
  { label: 'ERA Logo', Illustration: null, scattered: { x: '90%', y: '40%', rotate: 3 } },
] as const

// Svg5Years-derived normalized cx positions, interpolated from 5 circles to 8 cards
// Original 5: [0.263, 0.320, 0.390, 0.490, 0.638]
const CX_FRACS = [0.20, 0.26, 0.32, 0.39, 0.46, 0.53, 0.60, 0.68, 0.75]

// Scale: map Svg5Years r range (14.578→59.51) to card scale, doubled for impact
const SCALE_MIN = 1
const SCALE_MAX = 2.5
const SCALES = CX_FRACS.map((_, i) => {
  const t = i / (CX_FRACS.length - 1)
  return SCALE_MIN + (SCALE_MAX - SCALE_MIN) * Math.pow(t, 1.5)
})

function computeLayout(w: number, h: number) {
  if (w === 0 || h === 0) return null

  const cy = h * 0.45

  const cards = CX_FRACS.map((frac, i) => {
    const isLast = i === CX_FRACS.length - 1
    return {
      x: w * frac,
      y: cy - i * h * 0.008 + (isLast ? h * 0.02 : 0),
      scale: SCALES[i],
      rotate: -2 + (i * 4) / (CX_FRACS.length - 1),
    }
  })

  return { cards }
}

// Matches Svg5Years: all elements drift x:25→0 in unison, staggered by delay
const cardFloatVariants = {
  hidden: { x: 12 },
  float: (i: number) => ({
    x: 0,
    transition: {
      duration: 1.2,
      ease: 'easeOut' as const,
      delay: i * 0.15,
    },
  }),
}

export function MySiteIllustration() {
  const [measureRef, bounds] = useMeasure()
  const inViewRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(inViewRef, { once: true, amount: 0.4 })
  const prefersReducedMotion = useReducedMotion()
  const layout = useMemo(
    () => computeLayout(bounds.width, bounds.height),
    [bounds.width, bounds.height],
  )

  return (
    <div
      ref={(node) => {
        measureRef(node)
        inViewRef.current = node
      }}
      className="relative h-full min-h-40 w-full md:min-h-75"
    >
      {layout && docCards.map((card, i) => {
        const pos = layout.cards[i]
        const isLogo = card.Illustration === null
        return (
          <m.div
            key={card.label}
            className="absolute"
            style={{ zIndex: isLogo ? 10 : i }}
            initial={{
              left: card.scattered.x,
              top: card.scattered.y,
              rotate: card.scattered.rotate,
              scale: 1,
              opacity: 1,
              translateX: '-50%',
            }}
            animate={isInView ? {
              left: pos.x,
              top: pos.y,
              rotate: pos.rotate,
              scale: pos.scale,
              opacity: 1,
              translateX: '-50%',
              transition: { duration: 1, ease: easeSwift, delay: 0.3 },
            } : undefined}
          >
            <m.div
              variants={cardFloatVariants}
              custom={i}
              initial="hidden"
              animate={isInView && !prefersReducedMotion ? 'float' : 'hidden'}
            >
              {isLogo ? (
                <div className="flex h-20 w-16 items-center justify-center rounded-sm border border-border bg-black p-3 shadow-md shadow-black/5">
            
                </div>
              ) : <card.Illustration />}
            </m.div>
          </m.div>
        )
      })}
    </div>
  )
}
