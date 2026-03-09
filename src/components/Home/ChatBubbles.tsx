import { cn } from '@/lib/utils'
import { m, AnimatePresence, useInView } from 'motion/react'
import { useState, useEffect, useRef } from 'react'

type Message = {
  text: string
  side: 'left' | 'right'
}

const messages: Message[] = [
  { text: 'Do we have the latest evacuation plan?', side: 'left' },
  { text: 'Check the shared drive.', side: 'right' },
  { text: 'Which folder?', side: 'left' },
  { text: 'Not sure...', side: 'right' },
]

const rotations = {
  left: '-0.9deg',
  right: '1.25deg',
}

export function ChatBubbles() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    if (visibleCount >= messages.length) return

    const delay = visibleCount === 0 ? 600 : 600
    const timer = setTimeout(() => {
      setVisibleCount((c) => c + 1)
    }, delay)

    return () => clearTimeout(timer)
  }, [isInView, visibleCount])

  return (
    <div ref={ref} className="flex w-full max-w-110 flex-col justify-end">
      <div className="flex min-h-[220px] flex-col justify-end gap-4">
        <AnimatePresence>
          {messages.slice(0, visibleCount).map((message) => (
            <Bubble key={message.text} message={message} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

function Bubble({ message }: { message: Message }) {
  const isLeft = message.side === 'left'
  return (
    <m.div
      className={cn('relative w-fit', isLeft ? 'self-start' : 'self-end')}
      style={{ rotate: rotations[message.side] }}
      initial={{
        opacity: 0,
        scale: 0.6,
        x: isLeft ? -8 : 8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        x: 0,
      }}
      transition={{
        opacity: { duration: 0.25, ease: 'easeOut' },
        scale: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
          mass: 0.8,
        },
        x: { duration: 0.3, ease: 'easeOut' },
        layout: {
          type: 'spring',
          stiffness: 400,
          damping: 30,
          mass: 0.8,
        },
      }}
      layout
    >
      <div className="w-fit rounded-2xl bg-white/5 px-5 py-3 text-base leading-snug tracking-[-0.01em] text-muted-foreground">
        {message.text}
      </div>
      <span
        className={cn(
          'absolute -bottom-2.5 text-[10px] leading-none text-white/5',
          isLeft ? 'left-3' : 'right-3'
        )}
        aria-hidden
      >
        {isLeft ? '\u25E4' : '\u25E5'}
      </span>
    </m.div>
  )
}
