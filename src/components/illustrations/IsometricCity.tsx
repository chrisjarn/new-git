'use client'

import { useMemo, useRef, useState } from 'react'
import { m, useScroll, useTransform, useReducedMotion, useMotionValueEvent, animate, useMotionValue } from 'motion/react'
import { AnimatedTitle } from '../ui/AnimatedTitle'

// --- Isometric projection factory ---
function createToIso(cx: number, cy: number, scale: number) {
  return function toIso(x: number, y: number, z = 0) {
    return {
      x: (x - y) * scale * 0.866 + cx,
      y: (x + y) * scale * 0.5 - z * scale + cy,
    }
  }
}

type ToIsoFn = ReturnType<typeof createToIso>

// --- Desktop constants ---
const W = 1400
const H = 600
const S = 28
const CX = 700
const CY = 270
const toIso = createToIso(CX, CY, S)

// --- Mobile constants ---
const M_W = 800
const M_H = 750
const M_S = 32
const M_CX = 32
const M_CY = 360
const toIsoMobile = createToIso(M_CX, M_CY, M_S)

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
  iso?: ToIsoFn
}

function Building({ gx, gy, gw = 1, gd = 1, h = 3, dim = false, ghost = false, mode = 'base', iso = toIso }: BuildingProps) {
  const tfl = iso(gx, gy, h)
  const tfr = iso(gx + gw, gy, h)
  const tbr = iso(gx + gw, gy + gd, h)
  const tbl = iso(gx, gy + gd, h)
  const bfl = iso(gx, gy, 0)
  const bfr = iso(gx + gw, gy, 0)
  const bbr = iso(gx + gw, gy + gd, 0)
  const bbl = iso(gx, gy + gd, 0)

  const a = ghost ? 0.22 : dim ? 0.48 : 1

  let s1: string
  let s2: string
  let sw: string

  if (mode === 'green') {
    s1 = `rgba(74,222,128,${a})`
    s2 = `rgba(74,222,128,${a * 0.55})`
    sw = '1.2'
  } else {
    s1 = `color-mix(in srgb, var(--radix-intermediate-sand-4) ${Math.min(Math.round(180 * a), 100)}%, transparent)`
    s2 = `color-mix(in srgb, var(--radix-intermediate-sand-4) ${Math.min(Math.round(130 * a), 100)}%, transparent)`
    sw = ghost ? '0.6' : '1'
  }

  const details = []
  for (let fl = 1; fl < h; fl++) {
    const l1 = iso(gx, gy, fl)
    const l2 = iso(gx, gy + gd, fl)
    details.push(<line key={`lf${fl}`} x1={l1.x} y1={l1.y} x2={l2.x} y2={l2.y} stroke={s2} strokeWidth="0.3" />)
    const r1 = iso(gx + gw, gy, fl)
    const r2 = iso(gx + gw, gy + gd, fl)
    details.push(<line key={`rf${fl}`} x1={r1.x} y1={r1.y} x2={r2.x} y2={r2.y} stroke={s2} strokeWidth="0.3" />)
  }
  const vDivL = Math.round(gd * 1.5)
  for (let v = 1; v < vDivL; v++) {
    const frac = v / vDivL
    const vb = iso(gx, gy + gd * frac, 0)
    const vt = iso(gx, gy + gd * frac, h)
    details.push(<line key={`vl${v}`} x1={vb.x} y1={vb.y} x2={vt.x} y2={vt.y} stroke={s2} strokeWidth="0.25" />)
    const rb = iso(gx + gw, gy + gd * frac, 0)
    const rt = iso(gx + gw, gy + gd * frac, h)
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

// --- Desktop buildings ---
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

// --- Mobile buildings: hub on left, buildings extend right ---
const HUB_MOBILE: BuildingData = { gx: 0, gy: 0, gw: 2, gd: 2, h: 10, hub: true }

const BUILDINGS_MOBILE: BuildingData[] = [
  HUB_MOBILE,
  // Close right cluster
  { gx: 3, gy: 0, gw: 2, gd: 1.5, h: 5 },
  { gx: 3, gy: 2, gw: 1.5, gd: 1.5, h: 6 },
  // Mid right cluster
  { gx: 5.5, gy: 0.5, gw: 2, gd: 2, h: 5.5 },
  { gx: 5.5, gy: 3, gw: 1.5, gd: 1.5, h: 4 },
  // Far right cluster
  { gx: 8, gy: 0, gw: 2, gd: 2, h: 4.5 },
  { gx: 8, gy: 2.5, gw: 1.5, gd: 1.5, h: 3.5 },
  // Below hub
  { gx: 3, gy: 3, gw: 2, gd: 2, h: 4 },
  { gx: 5, gy: 4.5, gw: 2, gd: 1.5, h: 3.5 },
  // Dim accents
  { gx: 4.5, gy: 1.5, gw: 0.5, gd: 0.5, h: 2, dim: true },
  { gx: 10, gy: 0.5, gw: 1.5, gd: 1.5, h: 3, dim: true },
  { gx: 7, gy: 4, gw: 1, gd: 1, h: 2.5, dim: true },
  // Ghost periphery
  { gx: 11, gy: -1, gw: 2, gd: 2, h: 2.5, ghost: true },
  { gx: 11, gy: 2, gw: 1.5, gd: 2, h: 2, ghost: true },
  { gx: 7, gy: 6, gw: 2, gd: 1.5, h: 2, ghost: true },
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
const hubTopMobile = toIsoMobile(1, 1, 10)
const hubBottomMobile = toIsoMobile(2, 2, 0)

// Pre-compute sorted buildings and connection lines for both layouts
function computeBuildingLayout(buildings: BuildingData[], hub: BuildingData, isoFn: ToIsoFn, hubTopPt: { x: number; y: number }) {
  const sorted = [...buildings].sort((a, b) => (a.gx + a.gy) - (b.gx + b.gy))
  const hubDepth = hub.gx + hub.gy
  const behindHub = sorted.filter((b) => !b.hub && (b.gx + b.gy) <= hubDepth)
  const inFrontOfHub = sorted.filter((b) => !b.hub && (b.gx + b.gy) > hubDepth)

  const major = buildings.filter((b) => !b.hub && !b.dim && !b.ghost && (b.h ?? 3) >= 3.5)
  const connectionLines: ConnectionLineData[] = major.map((b) => {
    const cx = b.gx + (b.gw ?? 1) / 2
    const cy = b.gy + (b.gd ?? 1) / 2
    const bTop = isoFn(cx, cy, b.h ?? 3)
    const dx = bTop.x - hubTopPt.x
    const dy = bTop.y - hubTopPt.y
    const length = Math.sqrt(dx * dx + dy * dy)
    return { x1: bTop.x, y1: bTop.y, x2: hubTopPt.x, y2: hubTopPt.y, length }
  })

  return { behindHub, inFrontOfHub, connectionLines }
}

// Pre-compute static layouts
const desktopLayout = computeBuildingLayout(BUILDINGS, HUB, toIso, hubTop)
const mobileLayout = computeBuildingLayout(BUILDINGS_MOBILE, HUB_MOBILE, toIsoMobile, hubTopMobile)


export default function IsometricCity() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.75', 'end start'],
  })

  // Green line grows from above viewport to hubTop.y on scroll
  const greenLineY2 = useTransform(scrollYProgress, [0, 0.35], [0, hubTop.y])
  const greenLineY2Mobile = useTransform(scrollYProgress, [0, 0.35], [0, hubTopMobile.y])

  // Trigger threshold
  const TRIGGER = 0.35

  // Motion values for the triggered animations (shared across both layouts)
  const sweepY = useMotionValue(0)
  const sweepYMobile = useMotionValue(0)
  const hubScale = useMotionValue(0)
  const hubOpacity = useMotionValue(0)
  const pulseRadius = useMotionValue(0)
  const pulseOpacity = useMotionValue(0)
  const connectionOpacity = useMotionValue(0)
  const ambientOpacity = useMotionValue(0)

  // Track whether forward animation has fired
  const triggeredRef = useRef(false)
  const [titleVisible, setTitleVisible] = useState(false)
  const reversingRef = useRef(false)

  const connectionLineRefs = useRef<ReturnType<typeof useMotionValue<number>>[]>([])
  const connectionLineRefsMobile = useRef<ReturnType<typeof useMotionValue<number>>[]>([])

  // Scroll handler: forward = one-shot animate, backward = scroll-driven reverse
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!triggeredRef.current && v >= TRIGGER) {
      triggeredRef.current = true
      reversingRef.current = false
      setTimeout(() => setTitleVisible(true), 300)

      animate(hubOpacity, 1, { duration: 0.15 })
      animate(hubScale, 1, {
        type: 'spring',
        stiffness: 400,
        damping: 12,
        mass: 0.8,
      })

      animate(pulseOpacity, [0, 0.6, 0], { duration: 0.9, ease: 'easeOut' })
      animate(pulseRadius, [0, 60], { duration: 0.9, ease: 'easeOut' })

      // Green sweep — both desktop and mobile hub buildings
      animate(sweepY, hubBottom.y, {
        duration: 1.0,
        ease: [0.32, 0.72, 0, 1],
        delay: 0.1,
      })
      animate(sweepYMobile, hubBottomMobile.y, {
        duration: 1.0,
        ease: [0.32, 0.72, 0, 1],
        delay: 0.1,
      })

      animate(ambientOpacity, 1, { duration: 1.2, ease: 'easeOut', delay: 0.2 })

      // Desktop connection lines
      desktopLayout.connectionLines.forEach((_line, i) => {
        if (!connectionLineRefs.current[i]) return
        animate(connectionLineRefs.current[i], 1, {
          duration: 0.5,
          ease: [0.32, 0.72, 0, 1],
          delay: 0.5 + i * 0.06,
        })
      })
      // Mobile connection lines
      mobileLayout.connectionLines.forEach((_line, i) => {
        if (!connectionLineRefsMobile.current[i]) return
        animate(connectionLineRefsMobile.current[i], 1, {
          duration: 0.5,
          ease: [0.32, 0.72, 0, 1],
          delay: 0.5 + i * 0.06,
        })
      })
      animate(connectionOpacity, 1, { duration: 0.3, delay: 0.5 })

    } else if (triggeredRef.current && v < TRIGGER + 0.15) {
      reversingRef.current = true

      const REVERSE_FLOOR = 0.20
      const REVERSE_CEIL = TRIGGER + 0.10
      const p = Math.max(0, Math.min(1, (v - REVERSE_FLOOR) / (REVERSE_CEIL - REVERSE_FLOOR)))

      sweepY.set(p * hubBottom.y)
      sweepYMobile.set(p * hubBottomMobile.y)
      hubOpacity.set(p)
      hubScale.set(p)
      ambientOpacity.set(p)
      connectionOpacity.set(p)
      pulseOpacity.set(0)
      pulseRadius.set(0)

      connectionLineRefs.current.forEach((mv) => {
        if (mv) mv.set(p)
      })
      connectionLineRefsMobile.current.forEach((mv) => {
        if (mv) mv.set(p)
      })

      if (p < 0.5) setTitleVisible(false)

      if (p <= 0) {
        triggeredRef.current = false
        reversingRef.current = false
      }
    }
  })

  const desktopGroundGrid = useMemo(() => {
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

  const mobileGroundGrid = useMemo(() => {
    const lines = []
    for (let i = -4; i <= 14; i++) {
      const a = toIsoMobile(i, -4, 0)
      const b = toIsoMobile(i, 14, 0)
      lines.push(
        <line key={`gx${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(255,255,255,0.035)" strokeWidth="0.4" />,
      )
      const c = toIsoMobile(-4, i, 0)
      const d = toIsoMobile(14, i, 0)
      lines.push(
        <line key={`gy${i}`} x1={c.x} y1={c.y} x2={d.x} y2={d.y} stroke="rgba(255,255,255,0.035)" strokeWidth="0.4" />,
      )
    }
    return lines
  }, [])

  const skipAnimation = prefersReducedMotion ?? false

  return (
    <div ref={containerRef} className="relative -z-0 -mt-16 w-full pb-24 md:-mt-12 md:pb-32">
      {/* Left/right edge fades — desktop only, CSS divs so var(--background) resolves correctly */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[15%] md:block" style={{ background: 'linear-gradient(to right, var(--background) 0%, var(--background) 10%, transparent 100%)' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[15%] md:block" style={{ background: 'linear-gradient(to left, var(--background) 0%, var(--background) 10%, transparent 100%)' }} />
      {/* Desktop layout */}
      <div className="hidden md:block">
        <svg viewBox={`0 0 ${W} ${H}`} className="block w-full overflow-visible" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="isoBottomFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="42%" stopColor="transparent" stopOpacity={0} />
              <stop offset="68%" stopColor="#090908" stopOpacity={0.75} />
              <stop offset="88%" stopColor="#090908" stopOpacity={0.97} />
              <stop offset="100%" stopColor="#090908" stopOpacity={1} />
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

          <m.rect x={0} y={0} width={W} height={H} fill="url(#isoHubAmbient)" style={{ opacity: skipAnimation ? 1 : ambientOpacity }} />
          <g>{desktopGroundGrid}</g>

          <m.g style={{ opacity: skipAnimation ? 1 : connectionOpacity }}>
            {desktopLayout.connectionLines.map((line, i) => (
              <ConnectionLine key={i} index={i} line={line} refs={connectionLineRefs} skip={skipAnimation} />
            ))}
          </m.g>

          <g>
            {desktopLayout.behindHub.map((b, i) => (
              <Building key={i} {...b} mode="base" />
            ))}
          </g>

          <Building {...HUB} mode="base" />

          <g clipPath="url(#hubGreenClip)">
            <Building {...HUB} mode="green" />
          </g>

          <g>
            {desktopLayout.inFrontOfHub.map((b, i) => (
              <Building key={i} {...b} mode="base" />
            ))}
          </g>

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

          <m.circle
            cx={hubTop.x}
            cy={hubTop.y}
            r={skipAnimation ? 0 : pulseRadius}
            fill="none"
            stroke="#4ade80"
            strokeWidth="1.5"
            style={{ opacity: skipAnimation ? 0 : pulseOpacity }}
          />

          <m.g
            style={{
              opacity: skipAnimation ? 1 : hubOpacity,
              transformOrigin: `${hubTop.x}px ${hubTop.y}px`,
              scale: skipAnimation ? 1 : hubScale,
            }}
          >
            <circle cx={hubTop.x} cy={hubTop.y} r="4" fill="#4ade80" />
          </m.g>

          <rect x={0} y={0} width={W} height={H} fill="url(#isoBottomFade)" />
        </svg>
      </div>

      {/* Mobile layout — hub on the left, scaled up */}
      <div className="block md:hidden">
        <svg viewBox={`-30 0 ${M_W * 0.6} ${M_H * 0.6}`} className="block w-full overflow-visible" preserveAspectRatio="xMinYMid meet">
          <defs>
            <linearGradient id="isoBottomFadeMobile" x1="0" y1="0" x2="0" y2="1">
              <stop offset="42%" stopColor="transparent" stopOpacity={0} />
              <stop offset="68%" stopColor="#090908" stopOpacity={0.75} />
              <stop offset="88%" stopColor="#090908" stopOpacity={0.97} />
              <stop offset="100%" stopColor="#090908" stopOpacity={1} />
            </linearGradient>
<radialGradient id="isoHubAmbientMobile" cx="15%" cy="30%" r="35%">
              <stop offset="0%" stopColor="rgba(74,222,128,0.07)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <filter id="greenGlowMobile" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id="hubGreenClipMobile">
              <m.rect
                x={0}
                y={0}
                width={M_W}
                height={skipAnimation ? hubBottomMobile.y : sweepYMobile}
              />
            </clipPath>
          </defs>

          <m.rect x={0} y={0} width={M_W} height={M_H} fill="url(#isoHubAmbientMobile)" style={{ opacity: skipAnimation ? 1 : ambientOpacity }} />
          <g>{mobileGroundGrid}</g>

          <m.g style={{ opacity: skipAnimation ? 1 : connectionOpacity }}>
            {mobileLayout.connectionLines.map((line, i) => (
              <ConnectionLine key={i} index={i} line={line} refs={connectionLineRefsMobile} skip={skipAnimation} />
            ))}
          </m.g>

          <g>
            {mobileLayout.behindHub.map((b, i) => (
              <Building key={i} {...b} mode="base" iso={toIsoMobile} />
            ))}
          </g>

          <Building {...HUB_MOBILE} mode="base" iso={toIsoMobile} />

          <g clipPath="url(#hubGreenClipMobile)">
            <Building {...HUB_MOBILE} mode="green" iso={toIsoMobile} />
          </g>

          <g>
            {mobileLayout.inFrontOfHub.map((b, i) => (
              <Building key={i} {...b} mode="base" iso={toIsoMobile} />
            ))}
          </g>

          <m.line
            x1={hubTopMobile.x}
            y1={-100}
            x2={hubTopMobile.x}
            y2={skipAnimation ? hubTopMobile.y : greenLineY2Mobile}
            stroke="#4ade80"
            strokeWidth="1.5"
            strokeLinecap="round"
            filter="url(#greenGlowMobile)"
          />

          <m.circle
            cx={hubTopMobile.x}
            cy={hubTopMobile.y}
            r={skipAnimation ? 0 : pulseRadius}
            fill="none"
            stroke="#4ade80"
            strokeWidth="1.5"
            style={{ opacity: skipAnimation ? 0 : pulseOpacity }}
          />

          <m.g
            style={{
              opacity: skipAnimation ? 1 : hubOpacity,
              transformOrigin: `${hubTopMobile.x}px ${hubTopMobile.y}px`,
              scale: skipAnimation ? 1 : hubScale,
            }}
          >
            <circle cx={hubTopMobile.x} cy={hubTopMobile.y} r="4" fill="#4ade80" filter="url(#greenGlowMobile)" />
          </m.g>

          <rect x={0} y={0} width={M_W} height={M_H} fill="url(#isoBottomFadeMobile)" />
        </svg>
      </div>

      {/* Title + description — mobile: right of building, desktop: centered bottom */}
      <div className="absolute right-0 top-1/3 w-[55%] pr-4 md:inset-x-0 md:top-auto md:bottom-35 md:w-auto md:pr-0">
        <AnimatedTitle className="text-left md:text-center" triggered={titleVisible}>
          From alarm to all-clear.
        </AnimatedTitle>
        <m.p
          className="font-jakarta text-secondary mt-3 max-w-md text-left text-pretty text-[clamp(0.95rem,_1.5vw,_1.1rem)] leading-snug md:mx-auto md:text-center"
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
