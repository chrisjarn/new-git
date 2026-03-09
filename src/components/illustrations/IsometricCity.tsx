'use client'

import { useMemo, useRef, useState } from 'react'
import { m, useScroll, useTransform, useReducedMotion, useMotionValueEvent, animate, useMotionValue } from 'motion/react'
import { AnimatedTitle } from '../ui/AnimatedTitle'

const W = 1400
const H = 600
const S = 28
const CX = 700
const CY = 270

function toIso(x: number, y: number, z = 0) {
  return {
    x: (x - y) * S * 0.866 + CX,
    y: (x + y) * S * 0.5 - z * S + CY,
  }
}

function pp(pts: { x: number; y: number }[]) {
  return pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
}

interface BuildingData {
  gx: number
  gy: number
  gw?: number
  gd?: number
  h?: number
  hub?: boolean
  dim?: boolean
  ghost?: boolean
}

interface BuildingProps extends BuildingData {
  mode?: 'base' | 'green'
}

function Building({ gx, gy, gw = 1, gd = 1, h = 3, dim = false, ghost = false, mode = 'base' }: BuildingProps) {
  const tfl = toIso(gx, gy, h)
  const tfr = toIso(gx + gw, gy, h)
  const tbr = toIso(gx + gw, gy + gd, h)
  const tbl = toIso(gx, gy + gd, h)
  const bfl = toIso(gx, gy, 0)
  const bfr = toIso(gx + gw, gy, 0)
  const bbr = toIso(gx + gw, gy + gd, 0)
  const bbl = toIso(gx, gy + gd, 0)

  const a = ghost ? 0.22 : dim ? 0.48 : 1

  let s1: string
  let s2: string
  let sw: string

  if (mode === 'green') {
    s1 = `rgba(74,222,128,${a})`
    s2 = `rgba(74,222,128,${a * 0.55})`
    sw = '1.2'
  } else {
    s1 = `color-mix(in srgb, var(--radix-intermediate-sand-4) ${Math.min(Math.round(130 * a), 100)}%, transparent)`
    s2 = `color-mix(in srgb, var(--radix-intermediate-sand-4) ${Math.min(Math.round(90 * a), 100)}%, transparent)`
    sw = ghost ? '0.5' : '0.8'
  }

  const details = []
  for (let fl = 1; fl < h; fl++) {
    const l1 = toIso(gx, gy, fl)
    const l2 = toIso(gx, gy + gd, fl)
    details.push(<line key={`lf${fl}`} x1={l1.x} y1={l1.y} x2={l2.x} y2={l2.y} stroke={s2} strokeWidth="0.3" />)
    const r1 = toIso(gx + gw, gy, fl)
    const r2 = toIso(gx + gw, gy + gd, fl)
    details.push(<line key={`rf${fl}`} x1={r1.x} y1={r1.y} x2={r2.x} y2={r2.y} stroke={s2} strokeWidth="0.3" />)
  }
  const vDivL = Math.round(gd * 1.5)
  for (let v = 1; v < vDivL; v++) {
    const frac = v / vDivL
    const vb = toIso(gx, gy + gd * frac, 0)
    const vt = toIso(gx, gy + gd * frac, h)
    details.push(<line key={`vl${v}`} x1={vb.x} y1={vb.y} x2={vt.x} y2={vt.y} stroke={s2} strokeWidth="0.25" />)
    const rb = toIso(gx + gw, gy + gd * frac, 0)
    const rt = toIso(gx + gw, gy + gd * frac, h)
    details.push(<line key={`vr${v}`} x1={rb.x} y1={rb.y} x2={rt.x} y2={rt.y} stroke={s2} strokeWidth="0.25" />)
  }

  const fillLeft = '#0e0e0e'
  const fillRight = '#070707'
  const fillTop = '#111111'
  const fillFront = '#0a0a0a'
  const fillBack = '#060606'

  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <polygon points={pp([tbl, tbr, bbr, bbl])} fill={fillBack} stroke={s2} strokeWidth={sw} />
      <polygon points={pp([tfl, tfr, bfr, bfl])} fill={fillFront} stroke={s1} strokeWidth={sw} />
      {details}
      <polygon points={pp([tfl, tbl, bbl, bfl])} fill={fillLeft} stroke={s1} strokeWidth={sw} />
      <polygon points={pp([tfr, tbr, bbr, bfr])} fill={fillRight} stroke={s2} strokeWidth={sw} />
      <polygon points={pp([tfl, tfr, tbr, tbl])} fill={fillTop} stroke={s1} strokeWidth={sw} />
    </g>
  )
}

// Hub building data
const HUB: BuildingData = { gx: 4.5, gy: 4.5, gw: 2, gd: 2, h: 10, hub: true }

const BUILDINGS: BuildingData[] = [
  HUB,
  { gx: 0.5, gy: 0.5, gw: 2.5, gd: 1.5, h: 5 },
  { gx: 0.5, gy: 2.5, gw: 1.5, gd: 2, h: 6 },
  { gx: 2.5, gy: 2, gw: 1.5, gd: 2, h: 3.5 },
  { gx: 3, gy: 0.5, gw: 1, gd: 1.2, h: 3 },
  { gx: 7.5, gy: 0.5, gw: 2.5, gd: 2, h: 5.5 },
  { gx: 7.5, gy: 3, gw: 1.5, gd: 1.5, h: 4 },
  { gx: 9.5, gy: 0.5, gw: 1.5, gd: 2.5, h: 3.5 },
  { gx: 0.5, gy: 5.5, gw: 2, gd: 2.5, h: 4.5 },
  { gx: 2.5, gy: 6, gw: 1.5, gd: 1.5, h: 3 },
  { gx: 7.5, gy: 5.5, gw: 3, gd: 2, h: 4 },
  { gx: 7.5, gy: 8, gw: 2, gd: 1.5, h: 3 },
  { gx: 1, gy: 8.5, gw: 2.5, gd: 1.5, h: 3.5 },
  { gx: 4.5, gy: 8, gw: 2, gd: 2, h: 4 },
  { gx: 7.5, gy: 10, gw: 2.5, gd: 1.5, h: 3 },
  { gx: 3.2, gy: 2.5, gw: 0.5, gd: 0.5, h: 2, dim: true },
  { gx: 6.8, gy: 1.5, gw: 0.5, gd: 0.8, h: 2, dim: true },
  { gx: 3.2, gy: 6, gw: 0.5, gd: 0.8, h: 2, dim: true },
  { gx: 6.8, gy: 6, gw: 0.5, gd: 0.8, h: 2, dim: true },
  { gx: 11, gy: 3, gw: 1, gd: 1.5, h: 2.5, dim: true },
  { gx: -2, gy: 4, gw: 1.5, gd: 1.5, h: 4, dim: true },
  { gx: -4, gy: 3.5, gw: 1.5, gd: 2, h: 5, dim: true },
  { gx: -4, gy: 6, gw: 2.5, gd: 2, h: 4, dim: true },
  { gx: -4, gy: 8.5, gw: 2, gd: 2, h: 3, dim: true },
  { gx: -2, gy: 8.5, gw: 2, gd: 1.5, h: 2.5, dim: true },
  { gx: -6, gy: 4, gw: 1.5, gd: 2, h: 3.5, ghost: true },
  { gx: -6, gy: 7, gw: 2, gd: 2.5, h: 3, ghost: true },
  { gx: -7.5, gy: 6, gw: 2, gd: 2, h: 2.5, ghost: true },
  { gx: -8.5, gy: 5, gw: 2, gd: 2.5, h: 3, ghost: true },
  { gx: -8.5, gy: 8, gw: 2.5, gd: 2, h: 2, ghost: true },
  { gx: -10, gy: 6, gw: 2, gd: 2, h: 2, ghost: true },
  { gx: -10, gy: 8.5, gw: 2, gd: 1.5, h: 1.5, ghost: true },
  { gx: -2, gy: 10, gw: 2, gd: 1.5, h: 2, ghost: true },
  { gx: -5, gy: 10.5, gw: 2, gd: 1.5, h: 2, ghost: true },
  { gx: 8, gy: -1.5, gw: 1.5, gd: 1.5, h: 3.5, dim: true },
  { gx: 8, gy: -4, gw: 2.5, gd: 2, h: 4, dim: true },
  { gx: 10.5, gy: -4, gw: 2, gd: 2, h: 3.5, dim: true },
  { gx: 5.5, gy: -3.5, gw: 1.5, gd: 2, h: 3, dim: true },
  { gx: 10.5, gy: -1.5, gw: 2, gd: 1.5, h: 4, dim: true },
  { gx: 12, gy: -4, gw: 2, gd: 2.5, h: 3, ghost: true },
  { gx: 12, gy: -1.5, gw: 1.5, gd: 2, h: 2.5, ghost: true },
  { gx: 13.5, gy: -5, gw: 2, gd: 2, h: 2.5, ghost: true },
  { gx: 13.5, gy: -2.5, gw: 2, gd: 2, h: 2, ghost: true },
  { gx: 15, gy: -5, gw: 2, gd: 2.5, h: 2, ghost: true },
  { gx: 15, gy: -2.5, gw: 1.5, gd: 2, h: 1.5, ghost: true },
  { gx: 10, gy: 1.5, gw: 1.5, gd: 1.5, h: 2.5, dim: true },
  { gx: 12, gy: 1.5, gw: 2, gd: 1.5, h: 2, ghost: true },
  { gx: 4, gy: -2, gw: 1, gd: 1.2, h: 2.5, dim: true },
  { gx: 6, gy: -2.5, gw: 1.5, gd: 1.5, h: 3, dim: true },
]

interface ConnectionLineData {
  x1: number
  y1: number
  x2: number
  y2: number
  length: number
}

// Pre-compute hub geometry
const hubTop = toIso(5.5, 5.5, 10)
const hubBottom = toIso(6.5, 6.5, 0)


export default function IsometricCity() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.75', 'end start'],
  })

  // Green line grows from above viewport to hubTop.y on scroll (always scroll-driven)
  const greenLineY2 = useTransform(scrollYProgress, [0, 0.35], [0, hubTop.y])

  // Trigger threshold
  const TRIGGER = 0.35

  // Motion values for the triggered animations
  const sweepY = useMotionValue(0)
  const hubScale = useMotionValue(0)
  const hubOpacity = useMotionValue(0)
  const pulseRadius = useMotionValue(0)
  const pulseOpacity = useMotionValue(0)
  const connectionOpacity = useMotionValue(0)
  const ambientOpacity = useMotionValue(0)

  // Track whether forward animation has fired
  const triggeredRef = useRef(false)
  const [titleVisible, setTitleVisible] = useState(false)
  // Track whether we're in "reverse" mode (scroll-driven unwinding)
  const reversingRef = useRef(false)

  const connectionLineRefs = useRef<ReturnType<typeof useMotionValue<number>>[]>([])

  const connectionLineData = useMemo<ConnectionLineData[]>(() => {
    const major = BUILDINGS.filter((b) => !b.hub && !b.dim && !b.ghost && (b.h ?? 3) >= 3.5)
    return major.map((b) => {
      const cx = b.gx + (b.gw ?? 1) / 2
      const cy = b.gy + (b.gd ?? 1) / 2
      const bTop = toIso(cx, cy, b.h ?? 3)
      const dx = bTop.x - hubTop.x
      const dy = bTop.y - hubTop.y
      const length = Math.sqrt(dx * dx + dy * dy)
      return { x1: bTop.x, y1: bTop.y, x2: hubTop.x, y2: hubTop.y, length }
    })
  }, [])

  // Scroll handler: forward = one-shot animate, backward = scroll-driven reverse
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!triggeredRef.current && v >= TRIGGER) {
      // === FORWARD: fire one-shot animations ===
      triggeredRef.current = true
      reversingRef.current = false
      // Delay title until pulse ring is fading (~0.7s)
      setTimeout(() => setTitleVisible(true), 700)

      // Hub dot — spring scale with overshoot bounce
      animate(hubOpacity, 1, { duration: 0.15 })
      animate(hubScale, 1, {
        type: 'spring',
        stiffness: 400,
        damping: 12,
        mass: 0.8,
      })

      // Pulse ring — expands and fades out
      animate(pulseOpacity, [0, 0.6, 0], { duration: 0.9, ease: 'easeOut' })
      animate(pulseRadius, [0, 60], { duration: 0.9, ease: 'easeOut' })

      // Green sweep down the hub building
      animate(sweepY, hubBottom.y, {
        duration: 1.0,
        ease: [0.32, 0.72, 0, 1],
        delay: 0.1,
      })

      // Ambient glow
      animate(ambientOpacity, 1, { duration: 1.2, ease: 'easeOut', delay: 0.2 })

      // Connection lines — staggered shoot-out
      connectionLineData.forEach((_line, i) => {
        if (!connectionLineRefs.current[i]) return
        animate(connectionLineRefs.current[i], 1, {
          duration: 0.5,
          ease: [0.32, 0.72, 0, 1],
          delay: 0.5 + i * 0.06,
        })
      })
      animate(connectionOpacity, 1, { duration: 0.3, delay: 0.5 })

    } else if (triggeredRef.current && v < TRIGGER + 0.15) {
      // === REVERSE: scroll-driven unwinding ===
      // Starts reversing as soon as scroll drops below 0.50
      // Fully reversed by the time green line is ~halfway gone (0.15)
      reversingRef.current = true

      // Map v from [0.20, TRIGGER+0.10] → [0, 1]
      const REVERSE_FLOOR = 0.20
      const REVERSE_CEIL = TRIGGER + 0.10
      const p = Math.max(0, Math.min(1, (v - REVERSE_FLOOR) / (REVERSE_CEIL - REVERSE_FLOOR)))

      sweepY.set(p * hubBottom.y)
      hubOpacity.set(p)
      hubScale.set(p)
      ambientOpacity.set(p)
      connectionOpacity.set(p)
      // No pulse ring on the way back
      pulseOpacity.set(0)
      pulseRadius.set(0)

      // Reverse connection lines proportionally
      connectionLineRefs.current.forEach((mv) => {
        if (mv) mv.set(p)
      })

      // Hide title as it reverses past halfway
      if (p < 0.5) setTitleVisible(false)

      // Fully reset when reversed
      if (p <= 0) {
        triggeredRef.current = false
        reversingRef.current = false
      }
    }
  })

  const sorted = useMemo(
    () => [...BUILDINGS].sort((a, b) => (a.gx + a.gy) - (b.gx + b.gy)),
    [],
  )

  const hubDepth = HUB.gx + HUB.gy
  const behindHub = useMemo(() => sorted.filter((b) => !b.hub && (b.gx + b.gy) <= hubDepth), [sorted])
  const inFrontOfHub = useMemo(() => sorted.filter((b) => !b.hub && (b.gx + b.gy) > hubDepth), [sorted])

  const groundGrid = useMemo(() => {
    const lines = []
    for (let i = -12; i <= 18; i++) {
      const a = toIso(i, -12, 0)
      const b = toIso(i, 18, 0)
      lines.push(
        <line key={`gx${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(255,255,255,0.035)" strokeWidth="0.4" />,
      )
      const c = toIso(-12, i, 0)
      const d = toIso(18, i, 0)
      lines.push(
        <line key={`gy${i}`} x1={c.x} y1={c.y} x2={d.x} y2={d.y} stroke="rgba(255,255,255,0.035)" strokeWidth="0.4" />,
      )
    }
    return lines
  }, [])

  const skipAnimation = prefersReducedMotion ?? false

  return (
    <div ref={containerRef} className="relative -mt-16 w-full pb-24 md:-mt-24 md:pb-32">
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full overflow-visible" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="isoBottomFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="42%" stopColor="transparent" stopOpacity={0} />
            <stop offset="68%" stopColor="#0a0a0a" stopOpacity={0.75} />
            <stop offset="88%" stopColor="#0a0a0a" stopOpacity={0.97} />
            <stop offset="100%" stopColor="#0a0a0a" stopOpacity={1} />
          </linearGradient>
          <linearGradient id="isoLeftFade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0a0a0a" stopOpacity={1} />
            <stop offset="12%" stopColor="#0a0a0a" stopOpacity={0.9} />
            <stop offset="28%" stopColor="transparent" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="isoRightFade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="72%" stopColor="transparent" stopOpacity={0} />
            <stop offset="88%" stopColor="#0a0a0a" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#0a0a0a" stopOpacity={1} />
          </linearGradient>
          <radialGradient id="isoHubAmbient" cx="50%" cy="45%" r="18%">
            <stop offset="0%" stopColor="rgba(74,222,128,0.07)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="greenGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="hubGreenClip">
            <m.rect
              x={0}
              y={0}
              width={W}
              height={skipAnimation ? hubBottom.y : sweepY}
            />
          </clipPath>

        </defs>

        {/* Hub ambient glow */}
        <m.rect
          x={0}
          y={0}
          width={W}
          height={H}
          fill="url(#isoHubAmbient)"
          style={{ opacity: skipAnimation ? 1 : ambientOpacity }}
        />

        {/* Ground grid */}
        <g>{groundGrid}</g>

        {/* Connection lines — staggered draw from hub outward */}
        <m.g style={{ opacity: skipAnimation ? 1 : connectionOpacity }}>
          {connectionLineData.map((line, i) => (
            <ConnectionLine key={i} index={i} line={line} refs={connectionLineRefs} skip={skipAnimation} />
          ))}
        </m.g>

        {/* Buildings behind the hub */}
        <g>
          {behindHub.map((b, i) => (
            <Building key={i} {...b} mode="base" />
          ))}
        </g>

        {/* Hub building base */}
        <Building {...HUB} mode="base" />

        {/* Green overlay — clipped by sweep */}
        <g clipPath="url(#hubGreenClip)">
          <Building {...HUB} mode="green" />
        </g>

        {/* Buildings in front of the hub */}
        <g>
          {inFrontOfHub.map((b, i) => (
            <Building key={i} {...b} mode="base" />
          ))}
        </g>

        {/* Green line — scroll-driven */}
        <m.line
          x1={hubTop.x}
          y1={-100}
          x2={hubTop.x}
          y2={skipAnimation ? hubTop.y : greenLineY2}
          stroke="#4ade80"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#greenGlow)"
        />

        {/* Pulse ring — expands and fades on trigger */}
        <m.circle
          cx={hubTop.x}
          cy={hubTop.y}
          r={skipAnimation ? 0 : pulseRadius}
          fill="none"
          stroke="#4ade80"
          strokeWidth="1.5"
          style={{ opacity: skipAnimation ? 0 : pulseOpacity }}
        />

        {/* Hub dot — spring scale bounce */}
        <m.g
          style={{
            opacity: skipAnimation ? 1 : hubOpacity,
            transformOrigin: `${hubTop.x}px ${hubTop.y}px`,
            scale: skipAnimation ? 1 : hubScale,
          }}
        >
          <circle cx={hubTop.x} cy={hubTop.y} r="4" fill="#4ade80" filter="url(#greenGlow)" />
        </m.g>

        {/* Edge fades */}
        <rect x={0} y={0} width={W} height={H} fill="url(#isoBottomFade)" />
        <rect x={0} y={0} width={W} height={H} fill="url(#isoLeftFade)" />
        <rect x={0} y={0} width={W} height={H} fill="url(#isoRightFade)" />
      </svg>
      <div className="absolute inset-x-0 bottom-35">
        <AnimatedTitle className='text-center' triggered={titleVisible}>
          From alarm to all-clear.
        </AnimatedTitle>
        <m.p
          className="font-jakarta text-secondary mx-auto mt-3 max-w-md text-center text-pretty text-[clamp(0.95rem,_1.5vw,_1.1rem)] leading-snug"
          initial={{ opacity: 0, y: 8 }}
          animate={titleVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1], delay: 0.3 }}
        >
          Turn the most stressful moment into the most documented one.
        </m.p>
      </div>
    </div>
  )
}

/**
 * Individual connection line that draws from hub outward using strokeDashoffset.
 * Each line gets its own motion value for staggered animation.
 */
function ConnectionLine({
  index,
  line,
  refs,
  skip,
}: {
  index: number
  line: ConnectionLineData
  refs: React.RefObject<ReturnType<typeof useMotionValue<number>>[]>
  skip: boolean
}) {
  const progress = useMotionValue(0)

  if (refs.current && !refs.current[index]) {
    refs.current[index] = progress
  }

  const dashOffset = useTransform(progress, (p) => line.length * (1 - p))

  return (
    <m.line
      x1={line.x2}
      y1={line.y2}
      x2={line.x1}
      y2={line.y1}
      stroke="rgba(74,222,128,0.15)"
      strokeWidth="0.6"
      strokeDasharray={`${line.length}`}
      style={{
        strokeDashoffset: skip ? 0 : dashOffset,
      }}
      strokeLinecap="round"
    />
  )
}
