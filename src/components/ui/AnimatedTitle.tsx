'use client'

import { m } from 'motion/react'
import { cn } from '@/lib/utils'

const wordVariants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] as const },
  },
}

interface AnimatedTitleProps {
  children: string | string[]
  className?: string
  as?: 'h2' | 'h3'
  /** When true, plays the reveal animation. When omitted, uses whileInView. */
  triggered?: boolean
}

export function AnimatedTitle({ children, className, as = 'h2', triggered }: AnimatedTitleProps) {
  const Tag = as === 'h2' ? m.h2 : m.h3
  const lines = Array.isArray(children) ? children : [children]

  return (
    <Tag
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
      initial="hidden"
      {...(triggered !== undefined
        ? { animate: triggered ? 'visible' : 'hidden' }
        : { whileInView: 'visible', viewport: { once: true, amount: 0.5 } }
      )}
      className={cn(
        'text-balance text-[clamp(2.2rem,_5vw,_3.2rem)] font-semibold leading-[1.05] tracking-[-0.02em]',
        className
      )}
    >
      {lines.map((line, lineIdx) => {
        const words = line.split(' ')
        return (
          <span key={lineIdx} className={lineIdx > 0 ? 'block' : undefined}>
            {words.map((word, i) => (
              <m.span
                key={`${lineIdx}-${i}`}
                variants={wordVariants}
                className="inline-block"
                style={{ marginRight: '0.25em' }}
              >
                {word}
              </m.span>
            ))}
          </span>
        )
      })}
    </Tag>
  )
}
