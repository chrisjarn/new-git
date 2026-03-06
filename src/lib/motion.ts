import type { Variants, Transition } from 'motion/react'

const transition: Transition = {
  duration: 0.25,
  ease: [0.32, 0.72, 0, 1],
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition },
}

export const fadeUpLeft: Variants = {
  hidden: { opacity: 0, y: 20, x: -10 },
  visible: { opacity: 1, y: 0, x: 0, transition },
}

export const fadeUpRight: Variants = {
  hidden: { opacity: 0, y: 20, x: 10 },
  visible: { opacity: 1, y: 0, x: 0, transition },
}

export function staggerContainer(stagger = 0.08): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
      },
    },
  }
}

export const viewportOnce = { once: true, amount: 0.3 }

