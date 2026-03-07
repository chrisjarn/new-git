'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { m, AnimatePresence, useInView, useReducedMotion } from 'motion/react'
import { viewportOnce } from '@/lib/motion'

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

const ease = [0.32, 0.72, 0, 1] as const

// Timeline: msg0, typing0, msg1, msg2, typing1, msg3, tagline
const stepDelays = [0, 600, 1200, 800, 600, 800, 1500]

export function ChatBubbles() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, viewportOnce)
  const prefersReducedMotion = useReducedMotion()
  const [step, setStep] = useState(-1)

  useEffect(() => {
    if (!isInView) return
    if (prefersReducedMotion) {
      setStep(6)
      return
    }

    let currentStep = 0
    setStep(0)

    const timeouts: ReturnType<typeof setTimeout>[] = []

    function scheduleNext() {
      if (currentStep >= 6) return
      const nextStep = currentStep + 1
      const timeout = setTimeout(() => {
        currentStep = nextStep
        setStep(nextStep)
        scheduleNext()
      }, stepDelays[nextStep])
      timeouts.push(timeout)
    }

    scheduleNext()
    return () => timeouts.forEach(clearTimeout)
  }, [isInView, prefersReducedMotion])

  // Map steps to what's visible:
  // step 0: msg0
  // step 1: msg0, typing (right)
  // step 2: msg0, msg1
  // step 3: msg0, msg1, msg2
  // step 4: msg0, msg1, msg2, typing (right)
  // step 5: msg0, msg1, msg2, msg3
  // step 6: msg0, msg1, msg2, msg3, tagline

  const showMsg = (index: number) => {
    if (step < 0) return false
    if (index === 0) return step >= 0
    if (index === 1) return step >= 2
    if (index === 2) return step >= 3
    if (index === 3) return step >= 5
    return false
  }

  const showTagline = step >= 6

  const instant = !!prefersReducedMotion

  return (
    <div ref={ref} className="flex w-full max-w-[440px] flex-col gap-4">
      <AnimatePresence mode="popLayout">
        {showMsg(0) && (
          <Bubble key="msg-0" message={messages[0]} instant={instant} />
        )}
        {step === 1 && (
          <TypingIndicator key="typing-0" side="right" instant={instant} />
        )}
        {showMsg(1) && (
          <Bubble key="msg-1" message={messages[1]} instant={instant} />
        )}
        {showMsg(2) && (
          <Bubble key="msg-2" message={messages[2]} instant={instant} />
        )}
        {step === 4 && (
          <TypingIndicator key="typing-1" side="right" instant={instant} />
        )}
        {showMsg(3) && (
          <Bubble key="msg-3" message={messages[3]} instant={instant} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showTagline && (
          <m.p
            key="tagline"
            initial={instant ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: instant ? 0 : 0.4, ease }}
            className="mt-2 text-center text-sm text-secondary"
          >
            Safety shouldn&apos;t rely on guesswork.
          </m.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function Bubble({
  message,
  instant,
}: {
  message: Message
  instant: boolean
}) {
  const isLeft = message.side === 'left'
  const isRight = message.side === 'right'
  return (
    <m.div
      initial={instant ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: instant ? 0 : 0.35, ease }}
      layout
      className={cn('relative w-fit', isLeft ? 'self-start' : 'self-end')}
      style={{ rotate: rotations[message.side] }}
    >
      <div
        className={cn(
          'w-fit rounded-2xl px-5 py-3 text-base leading-snug tracking-[-0.01em]',
          isRight
            ? 'bg-[#3e63dd] text-white'
            : 'bg-[#f0f0f3] text-[#1c2024] dark:bg-[#2a2a2f] dark:text-[#edeef0]'
        )}
      >
        {message.text}
      </div>
      <span
        className={cn(
          'absolute -bottom-2.5 text-[10px] leading-none',
          isRight
            ? 'right-3 text-[#3e63dd]'
            : 'left-3 text-[#f0f0f3] dark:text-[#2a2a2f]'
        )}
        aria-hidden
      >
        {isLeft ? '\u25E4' : '\u25E5'}
      </span>
    </m.div>
  )
}

function TypingIndicator({
  side,
  instant,
}: {
  side: 'left' | 'right'
  instant: boolean
}) {
  const isRight = side === 'right'
  return (
    <m.div
      initial={instant ? false : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: instant ? 0 : 0.25, ease }}
      layout
      className={cn(
        'relative w-fit',
        isRight ? 'self-end' : 'self-start'
      )}
      style={{ rotate: rotations[side] }}
    >
      <div
        className={cn(
          'flex w-fit items-center gap-1.5 rounded-2xl px-5 py-3',
          isRight
            ? 'bg-[#3e63dd]'
            : 'bg-[#f0f0f3] dark:bg-[#2a2a2f]'
        )}
      >
        {[0, 0.15, 0.3].map((delay) => (
          <m.span
            key={delay}
            className={cn(
              'block size-2 rounded-full',
              isRight ? 'bg-white/70' : 'bg-[#1c2024]/40 dark:bg-[#edeef0]/40'
            )}
            animate={
              instant
                ? {}
                : {
                    y: [0, -4, 0],
                  }
            }
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <span
        className={cn(
          'absolute -bottom-2.5 text-[10px] leading-none',
          isRight
            ? 'right-3 text-[#3e63dd]'
            : 'left-3 text-[#f0f0f3] dark:text-[#2a2a2f]'
        )}
        aria-hidden
      >
        {side === 'left' ? '\u25E4' : '\u25E5'}
      </span>
    </m.div>
  )
}
