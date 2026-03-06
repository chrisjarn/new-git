'use client'

import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'
import { useInView, useReducedMotion } from 'motion/react'

const MARKERS: [number, number][] = [
  [-33.8688, 151.2093], // Sydney
  [-37.8136, 144.9631], // Melbourne
  [-27.4705, 153.026], // Brisbane
  [-31.9505, 115.8605], // Perth
  [-34.9285, 138.6007], // Adelaide
  [-36.8485, 174.7633], // Auckland
  [-41.2924, 174.7787], // Wellington
]

// Target phi that centers NZ/AUS
const TARGET_PHI = 2.53
const SPIN_DURATION_MS = 2500
const SPIN_DELAY_MS = 800

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const phiRef = useRef(TARGET_PHI)
  const widthRef = useRef(0)
  const spinStateRef = useRef<{ startTime: number; startPhi: number } | null>(null)
  const spinDoneRef = useRef(false)

  const prefersReducedMotion = useReducedMotion()
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  // Trigger spin after delay once in view
  useEffect(() => {
    if (!isInView || prefersReducedMotion || spinDoneRef.current) return

    const timeout = setTimeout(() => {
      spinStateRef.current = { startTime: performance.now(), startPhi: phiRef.current }
    }, SPIN_DELAY_MS)

    return () => clearTimeout(timeout)
  }, [isInView, prefersReducedMotion])

  useEffect(() => {
    if (!canvasRef.current || !isInView) return

    const canvas = canvasRef.current

    const onResize = () => {
      widthRef.current = canvas.offsetWidth
    }
    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(canvas)
    onResize()

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio, 2),
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      phi: phiRef.current,
      theta: -0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 12000,
      mapBrightness: 6,
      baseColor: [0.15, 0.15, 0.15],
      markerColor: [0.969, 0.42, 0.082],
      glowColor: [0.05, 0.05, 0.05],
      markers: MARKERS.map((m) => ({ location: m, size: 0.05 })),
      onRender: (state) => {
        // One-time 360° spin
        const spin = spinStateRef.current
        if (spin && !spinDoneRef.current) {
          const elapsed = performance.now() - spin.startTime
          const progress = Math.min(elapsed / SPIN_DURATION_MS, 1)
          // Ease out cubic for smooth deceleration
          const eased = 1 - Math.pow(1 - progress, 3)
          phiRef.current = spin.startPhi + Math.PI * 2 * eased

          if (progress >= 1) {
            phiRef.current = TARGET_PHI
            spinDoneRef.current = true
          }
        }

        state.phi = phiRef.current
        state.width = widthRef.current * 2
        state.height = widthRef.current * 2
      },
    })

    return () => {
      globe.destroy()
      resizeObserver.disconnect()
    }
  }, [isInView, prefersReducedMotion])

  return (
    <div
      ref={containerRef}
      className="flex aspect-square w-full max-w-[600px] items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{ contain: 'layout paint size', opacity: isInView ? 1 : 0, transition: 'opacity 0.5s' }}
      />
    </div>
  )
}
