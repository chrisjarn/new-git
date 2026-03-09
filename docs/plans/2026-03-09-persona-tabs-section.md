# Persona Tabs Section Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a persona tab section between Hero and HeroPreview that lets visitors self-identify as Property Manager, HSE Manager, or Owner/Operator and see targeted messaging.

**Architecture:** Single new component `PersonaSection.tsx` that reuses the existing `FeatureTabs` component with controlled state. Tab content swaps use `AnimatePresence mode="wait"` with `fadeUp` variant for no-layout-shift transitions.

**Tech Stack:** React 19, motion/react (AnimatePresence, m), existing FeatureTabs, Tailwind CSS 4

---

### Task 1: Add controlled state support to FeatureTabs

**Files:**
- Modify: `src/components/Home/FeatureTabs.tsx`

**Step 1: Add activeIndex and onTabChange props**

```tsx
interface FeatureTabsProps {
  items: string[]
  accentColor: string
  sectionId: string
  surfaceColor?: string
  activeIndex?: number
  onTabChange?: (index: number) => void
}
```

**Step 2: Update component to support controlled mode**

```tsx
export function FeatureTabs({ items, accentColor, sectionId, surfaceColor, activeIndex: controlledIndex, onTabChange }: FeatureTabsProps) {
  const [internalIndex, setInternalIndex] = useState(0)
  const activeIndex = controlledIndex ?? internalIndex
  // ...

  function handleClick(index: number, el: HTMLButtonElement) {
    if (onTabChange) {
      onTabChange(index)
    } else {
      setInternalIndex(index)
    }
    // scroll logic unchanged
  }
```

**Step 3: Verify existing FeatureTabs consumers still work**

Run: `bunx --bun next build`
Expected: Build succeeds (new props are optional, no breaking change)

**Step 4: Commit**

```bash
git add src/components/Home/FeatureTabs.tsx
git commit -m "feat: add controlled state support to FeatureTabs"
```

---

### Task 2: Create PersonaSection component

**Files:**
- Create: `src/components/Home/PersonaSection.tsx`

**Step 1: Create the component**

```tsx
'use client'

import { useState } from 'react'
import { m, AnimatePresence, useReducedMotion } from 'motion/react'
import { FeatureTabs } from './FeatureTabs'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

const TABS = ['Property Manager', 'HSE Manager', 'Owner / Operator']

const PERSONAS = [
  {
    tag: 'PORTFOLIO OVERSIGHT',
    headline: "You\u2019re accountable for buildings you can\u2019t be in every day.",
    body: "ERA gives you live visibility across every tenancy \u2014 training status, drill participation, and compliance gaps \u2014 without chasing anyone for a report. No separate systems. No blind spots. Per-building pricing that scales with your portfolio.",
    closer: 'Structured readiness. Shared protection. Proven accountability.',
  },
  {
    tag: 'COMPLIANCE CONTROL',
    headline: 'You carry the compliance burden. Multiple sites. Multiple audits.',
    body: "ERA centralises every drill, certificate, and incident report \u2014 clause-level aligned to AS 3745 and ISO 45001 \u2014 so you\u2019re defensible at any moment, not just audit season. Remote simulation cuts delivery costs. The integrated LMS tracks competency across your entire workforce.",
    closer: 'Less administration. Stronger oversight. Audit-ready by design.',
  },
  {
    tag: 'BUILT FOR BUSY',
    headline: "You\u2019re running the business. Compliance can\u2019t slow you down.",
    body: "ERA puts hazard logging, incident workflows, warden training, and compliance evidence on your phone. Built-in LMS means no external training providers or extra invoices. Track who\u2019s onsite, verify hours, keep everything in one place.",
    closer: 'Simple. Practical. Covered.',
  },
]

export function PersonaSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const persona = PERSONAS[activeIndex]

  return (
    <m.section
      variants={staggerContainer(0.1)}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={viewportOnce}
      className="flex flex-col items-center gap-6"
    >
      <m.span
        variants={fadeUp}
        className="text-xs font-semibold uppercase tracking-wider text-brand-primary"
      >
        Who ERA is built for
      </m.span>

      <m.div variants={fadeUp} className="w-full">
        <FeatureTabs
          items={TABS}
          accentColor="var(--color-brand-primary)"
          sectionId="persona"
          activeIndex={activeIndex}
          onTabChange={setActiveIndex}
        />
      </m.div>

      <m.div variants={fadeUp} className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          <m.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-col gap-3 py-4 text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
              {persona.tag}
            </span>
            <h3 className="text-[clamp(1.4rem,_3vw,_2rem)] font-semibold leading-tight">
              {persona.headline}
            </h3>
            <p className="font-jakarta text-base leading-relaxed text-secondary">
              {persona.body}
            </p>
            <p className="font-jakarta text-sm italic text-tertiary">
              {persona.closer}
            </p>
          </m.div>
        </AnimatePresence>
      </m.div>
    </m.section>
  )
}
```

**Step 2: Verify build**

Run: `bunx --bun next build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/components/Home/PersonaSection.tsx
git commit -m "feat: add PersonaSection component with tab-switched persona content"
```

---

### Task 3: Add PersonaSection to Manifesto

**Files:**
- Modify: `src/components/Home/Manifesto.tsx`

**Step 1: Import PersonaSection**

Add to imports:
```tsx
import { PersonaSection } from './PersonaSection'
```

**Step 2: Place between Hero and HeroPreview**

After the Hero `WidthContainer` (line 67) and before the HeroPreview `WidthContainer` (line 70):

```tsx
      {/* Persona Tabs — Who ERA is built for */}
      <WidthContainer className="py-16 md:py-16 lg:py-20 xl:py-24">
        <PersonaSection />
      </WidthContainer>
```

**Step 3: Verify build**

Run: `bunx --bun next build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/components/Home/Manifesto.tsx
git commit -m "feat: add persona tabs section to landing page between hero and preview"
```
