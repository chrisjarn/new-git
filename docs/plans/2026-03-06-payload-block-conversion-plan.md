# ERA Safety — Payload Block Conversion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert the ERA Safety landing page sections into Payload CMS render blocks in the existing `era-safety-payload` project.

**Architecture:** Each block = `config.ts` (Payload schema) + `component.tsx` (React renderer). Blocks are registered in `src/collections/pages/index.ts` and mapped in `src/components/render-blocks.tsx`. Components receive `{ data: BlockType }` props. Shared UI lives in `src/components/era/`.

**Tech Stack:** Payload CMS 3.77, Next.js 16, Tailwind CSS v4, motion/react (Framer Motion), Radix UI, TypeScript strict, bun

**Skills to invoke before each task:** `/payload`, `/motion`, `/tailwind-css-patterns`, `/baseline-ui`

**Target project:** `/Users/chrisuttam/Downloads/era-safety-payload/`
**Source project:** `/Users/chrisuttam/Downloads/new-era-landing-claude-era-safety-landing-page-StwSI/`

---

## Task 1: Update Button.tsx to match landing page styles

**Files:**
- Modify: `era-safety-payload/src/components/era/ui/Button.tsx`

**Why:** The Payload project Button uses `gray-*` Tailwind classes and `rounded-lg` conditional. The landing page Button uses the project's custom `sand-*` design tokens, `rounded-full` always, and `active:scale-[0.97]` micro-interaction. Must be identical.

**Step 1: Replace Button variant and base classes**

Replace the `variantClasses` record and base `cn()` call to match:

```tsx
const variantClasses: Record<string, string> = {
  base: 'bg-white dark:bg-sand-2 border border-border-primary text-primary active:scale-[0.97] hover:bg-sand-l3 dark:hover:bg-sand-3 shadow-sm',
  primary: 'bg-sand-l12 dark:bg-sand-12 text-white dark:text-sand-1 hover:bg-sand-l11 active:scale-[0.97] dark:hover:bg-sand-11',
  flat: 'bg-sand-l3 dark:bg-sand-3 text-primary hover:bg-sand-l4 dark:hover:bg-sand-4 active:scale-[0.97]',
  plain: 'text-secondary hover:bg-sand-l3 dark:hover:bg-sand-3 hover:text-primary',
  brand: 'bg-[#f76b15] text-white hover:bg-[#ef5f00] shadow-sm active:scale-[0.97]',
  text: 'text-secondary hover:text-primary underline-offset-2 active:scale-[0.97]',
  none: '',
}
```

In the `cn()` call, change `round ? 'rounded-full' : 'rounded-lg'` to just `'rounded-full'` (always round). Change `transition-colors` to `transition-all`.

**Step 2: Verify build**

```bash
cd /Users/chrisuttam/Downloads/era-safety-payload && bun run build
```

**Step 3: Commit**

```bash
git add src/components/era/ui/Button.tsx
git commit -m "feat: update Button to match landing page design tokens and styles"
```

---

## Task 2: Copy shared UI components from landing page

**Files:**
- Create: `era-safety-payload/src/components/era/home/BentoCard.tsx`
- Create: `era-safety-payload/src/components/era/home/SectionBadge.tsx`
- Create: `era-safety-payload/src/components/era/home/FeatureTabs.tsx`
- Create: `era-safety-payload/src/components/era/home/CustomerLogos.tsx`
- Create: `era-safety-payload/src/components/era/home/NumberTicker.tsx`
- Create: `era-safety-payload/src/components/era/home/ChatBubbles.tsx`
- Create: `era-safety-payload/src/components/era/home/FooterLines.tsx`

**Step 1: Copy each file, adapting imports**

Source files are at `new-era-landing/src/components/Home/`. Copy each to `era-safety-payload/src/components/era/home/`. Adapt imports:
- `@/lib/utils` stays the same (both projects have it)
- `@/lib/motion` — check if era-safety-payload has this; if not, copy `new-era-landing/src/lib/motion.ts` to `era-safety-payload/src/lib/motion.ts`
- `@/components/ui/*` becomes `@/components/era/ui/*`
- `@/components/Home/*` becomes `@/components/era/home/*`

**Step 2: Copy illustration components**

- Create: `era-safety-payload/src/components/era/home/InvoiceIllustration.tsx`
- Create: `era-safety-payload/src/components/era/home/SearchIllustration.tsx`
- Create: `era-safety-payload/src/components/era/home/KanbanIllustration.tsx`
- Create: `era-safety-payload/src/components/era/home/MySiteIllustration.tsx`

Same import adaptation rules.

**Step 3: Copy motion utilities if missing**

Check if `era-safety-payload/src/lib/motion.ts` exists. If not, copy from `new-era-landing/src/lib/motion.ts`.

**Step 4: Verify build**

```bash
cd /Users/chrisuttam/Downloads/era-safety-payload && bun run build
```

**Step 5: Commit**

```bash
git add src/components/era/home/ src/lib/motion.ts
git commit -m "feat: add shared home UI components from landing page"
```

---

## Task 3: Update heroBlock to match new landing page hero

**Files:**
- Modify: `era-safety-payload/src/blocks/hero-block/config.ts`
- Modify: `era-safety-payload/src/blocks/hero-block/component.tsx`

**Step 1: Update config fields**

The landing page hero has: bold headline with line breaks, subtext, primary CTA (brand), secondary CTA (flat). Current config is close but headline default should change.

```ts
// config.ts — update defaultValue for headline
headline: {
  defaultValue: 'One platform. One workflow.\nComplete Readiness.',
}
// subtext default:
subtext: {
  defaultValue: 'ERA replaces fragmented safety systems with a single platform that connects buildings, tenants, and compliance obligations into one coordinated workflow.',
}
```

**Step 2: Update component to match landing page layout**

Key changes:
- `max-w-3xl` instead of `max-w-2xl`
- `font-bold` on PageTitle
- CTA buttons in a row (`flex-row gap-3`) with secondary first, brand second with ArrowRightCircleIcon
- Remove microcopy field/render (not in new design)
- Responsive: on mobile, CTAs should be `flex-col` to stack

```tsx
<WidthContainer className="max-w-3xl gap-4 pt-12 md:pt-16 lg:pt-20 lg:text-start xl:pt-24 2xl:pt-28">
  <PageTitle className="leading-[1] font-bold">
    {headlineParts.map((part, i) => (
      <span key={i}>
        {part}
        {i < headlineParts.length - 1 && <br />}
      </span>
    ))}
  </PageTitle>

  {subtext && (
    <p className="text-secondary text-pretty text-[clamp(0.95rem,_1.5vw,_1.1rem)] font-normal leading-snug">
      {subtext}
    </p>
  )}

  <div className="mt-2">
    <div className="flex flex-col gap-3 sm:flex-row sm:w-2/3">
      {ctaSecondary?.label && (
        <Button size="large" variant="flat" href={ctaSecondary.href ?? '/how-it-works'} fullWidth>
          {ctaSecondary.label}
        </Button>
      )}
      {ctaPrimary?.label && (
        <Button variant="brand" size="large" href={ctaPrimary.href ?? '/demo'} rightSlot={<ArrowRightCircleIcon size={28} />} fullWidth>
          {ctaPrimary.label}
        </Button>
      )}
    </div>
  </div>

  <CustomerLogos />
</WidthContainer>
```

**Step 3: Verify build**

```bash
cd /Users/chrisuttam/Downloads/era-safety-payload && bun run build
```

**Step 4: Commit**

```bash
git add src/blocks/hero-block/
git commit -m "feat: update heroBlock to match new landing page design"
```

---

## Task 4: Update featureCardsBlock (HeroPreview bento grid)

**Files:**
- Modify: `era-safety-payload/src/blocks/feature-cards-block/config.ts`
- Modify: `era-safety-payload/src/blocks/feature-cards-block/component.tsx`

**Step 1: Update config — add iconType select**

```ts
fields: [
  {
    name: 'cards',
    type: 'array',
    minRows: 1,
    maxRows: 8,
    fields: [
      { name: 'label', type: 'text', required: true },
      { name: 'description', type: 'text', required: true },
      {
        name: 'iconType',
        type: 'select',
        required: true,
        options: [
          { label: 'Critical (exclamation)', value: 'critical' },
          { label: 'Capture (camera)', value: 'capture' },
          { label: 'Improve (graduation)', value: 'improve' },
          { label: 'My Site (house)', value: 'mySite' },
        ],
      },
    ],
    defaultValue: [
      { label: 'Critical', description: 'Incident coordination', iconType: 'critical' },
      { label: 'Capture', description: 'Hazard & inspection logging', iconType: 'capture' },
      { label: 'Improve', description: 'Training & competency', iconType: 'improve' },
      { label: 'My Site', description: 'Site structure & docs', iconType: 'mySite' },
    ],
  },
],
```

Remove the old `heading` and `graphicType` fields.

**Step 2: Rewrite component**

Render as 2x2 / 4-col bento grid matching `HeroPreview.tsx`. Map `iconType` to `@gravity-ui/icons` icons (CircleExclamation, Camera, GraduationCap, House). Include the dashed SVG connector line on desktop.

**Step 3: Verify build, commit**

```bash
git add src/blocks/feature-cards-block/
git commit -m "feat: update featureCardsBlock to bento preview grid layout"
```

---

## Task 5: Create featureSectionBlock (Critical/Capture/Improve/MySite)

**Files:**
- Create: `era-safety-payload/src/blocks/feature-section-block/config.ts`
- Create: `era-safety-payload/src/blocks/feature-section-block/component.tsx`
- Modify: `era-safety-payload/src/collections/pages/index.ts` (register block)
- Modify: `era-safety-payload/src/components/render-blocks.tsx` (add case)

**Step 1: Write config.ts**

```ts
import type { Block } from 'payload';

export const FeatureSectionBlock: Block = {
  slug: 'featureSectionBlock',
  interfaceName: 'FeatureSectionBlock',
  labels: { singular: 'Feature Section', plural: 'Feature Sections' },
  fields: [
    {
      name: 'illustrationType',
      type: 'select',
      required: true,
      options: [
        { label: 'Critical (Invoice)', value: 'critical' },
        { label: 'Capture (Search)', value: 'capture' },
        { label: 'Improve (Kanban)', value: 'improve' },
        { label: 'My Site (Site Map)', value: 'mySite' },
      ],
    },
    {
      name: 'badge',
      type: 'group',
      fields: [
        { name: 'letter', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        { name: 'color', type: 'text', defaultValue: '#f76b15', admin: { description: 'Hex color for badge accent' } },
      ],
    },
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'bullets',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
      minRows: 1,
      maxRows: 6,
    },
    {
      name: 'reversed',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Flip illustration to right side' },
    },
  ],
};
```

**Step 2: Write component.tsx**

Port `FeatureSection.tsx` from landing page. Map `illustrationType` to illustration component:

```tsx
const illustrationMap: Record<string, React.ComponentType> = {
  critical: InvoiceIllustration,
  capture: SearchIllustration,
  improve: KanbanIllustration,
  mySite: MySiteIllustration,
};
```

**Mobile fix (critical):**
- Illustration card: `max-h-[280px] overflow-hidden` on mobile, remove on `md:`
- Grid: `gap-6` on mobile (not `gap-8`)
- FeatureTabs: already horizontal-scroll with fade edges — works on mobile

```tsx
<div className={cn(
  'grid items-center gap-6 md:grid-cols-2 md:gap-12',
  reversed && 'md:[&>*:first-child]:order-2'
)}>
  <div className="flex flex-col">
    <BentoCard className="relative flex max-h-[280px] items-center justify-center overflow-hidden p-6 md:max-h-none md:min-h-[340px] md:p-8">
      <SectionBadge ... />
      <Illustration />
    </BentoCard>
    {bullets && <FeatureTabs items={bullets.map(b => b.text)} ... />}
  </div>
  <div className="flex flex-col gap-4">
    <h3 className="text-balance text-[clamp(1.5rem,_3.5vw,_3rem)] font-semibold leading-tight">
      {title}
    </h3>
    <p className="font-jakarta text-secondary text-pretty text-base font-medium leading-snug">
      {description}
    </p>
  </div>
</div>
```

**Step 3: Register block**

In `src/collections/pages/index.ts`, add import and add to blocks array.
In `src/components/render-blocks.tsx`, add switch case with `max-w-5xl` container.

**Step 4: Verify build, commit**

```bash
git add src/blocks/feature-section-block/ src/collections/pages/index.ts src/components/render-blocks.tsx
git commit -m "feat: add featureSectionBlock with mobile-responsive illustration cards"
```

---

## Task 6: Create phoneMockupBlock

**Files:**
- Create: `era-safety-payload/src/blocks/phone-mockup-block/config.ts`
- Create: `era-safety-payload/src/blocks/phone-mockup-block/component.tsx`
- Modify: `era-safety-payload/src/collections/pages/index.ts`
- Modify: `era-safety-payload/src/components/render-blocks.tsx`

**Step 1: Write config.ts**

```ts
import type { Block } from 'payload';

export const PhoneMockupBlock: Block = {
  slug: 'phoneMockupBlock',
  interfaceName: 'PhoneMockupBlock',
  labels: { singular: 'Phone Mockup', plural: 'Phone Mockups' },
  fields: [
    { name: 'headline', type: 'text', defaultValue: 'Safety management,\nwherever you are.' },
    { name: 'ctaLabel', type: 'text', defaultValue: 'See More' },
    { name: 'ctaHref', type: 'text', defaultValue: '/how-it-works' },
  ],
};
```

**Step 2: Write component**

Port `PhoneMockup.tsx` + `FooterLines.tsx`. Phone image via CSS background. FooterLines rendered inline below.

**Step 3: Register, verify build, commit**

```bash
git add src/blocks/phone-mockup-block/ src/collections/pages/index.ts src/components/render-blocks.tsx
git commit -m "feat: add phoneMockupBlock with phone illustration and footer lines"
```

---

## Task 7: Create complianceGapsBlock

**Files:**
- Create: `era-safety-payload/src/blocks/compliance-gaps-block/config.ts`
- Create: `era-safety-payload/src/blocks/compliance-gaps-block/component.tsx`
- Modify: `era-safety-payload/src/collections/pages/index.ts`
- Modify: `era-safety-payload/src/components/render-blocks.tsx`

**Step 1: Write config.ts**

```ts
fields: [
  { name: 'sectionLabel', type: 'text', defaultValue: 'The Problem' },
  { name: 'heading', type: 'text', required: true, defaultValue: 'Compliance Gaps Hide in Plain Sight' },
  {
    name: 'gaps',
    type: 'array',
    minRows: 1,
    maxRows: 6,
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea', required: true },
      {
        name: 'iconType',
        type: 'select',
        options: [
          { label: 'Warning triangle', value: 'warning' },
          { label: 'Clock', value: 'clock' },
          { label: 'User minus', value: 'userMinus' },
        ],
      },
    ],
  },
  {
    name: 'solution',
    type: 'group',
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea', required: true },
      { name: 'ctaLabel', type: 'text', defaultValue: 'See How ERA Works' },
      { name: 'ctaHref', type: 'text', defaultValue: '/how-it-works' },
    ],
  },
]
```

**Step 2: Write component** — port ComplianceGapsSection.tsx. ChatBubbles hardcoded. 3 gap cards + solution card.

**Step 3: Register, verify build, commit**

```bash
git add src/blocks/compliance-gaps-block/ src/collections/pages/index.ts src/components/render-blocks.tsx
git commit -m "feat: add complianceGapsBlock with problem cards and solution CTA"
```

---

## Task 8: Create complianceStandardsBlock

**Files:**
- Create: `era-safety-payload/src/blocks/compliance-standards-block/config.ts`
- Create: `era-safety-payload/src/blocks/compliance-standards-block/component.tsx`
- Modify: `era-safety-payload/src/collections/pages/index.ts`
- Modify: `era-safety-payload/src/components/render-blocks.tsx`

**Step 1: Write config.ts**

```ts
fields: [
  { name: 'sectionLabel', type: 'text', defaultValue: 'Compliance' },
  { name: 'heading', type: 'text', required: true, defaultValue: 'Your obligations, covered.' },
  {
    name: 'standards',
    type: 'array',
    minRows: 1,
    maxRows: 8,
    fields: [
      { name: 'code', type: 'text', required: true },
      { name: 'title', type: 'text', required: true },
      {
        name: 'items',
        type: 'array',
        fields: [{ name: 'text', type: 'text', required: true }],
      },
    ],
  },
]
```

**Step 2: Write component** — port ComplianceSection.tsx. 2x2 grid of BentoCards.

**Step 3: Register, verify build, commit**

```bash
git add src/blocks/compliance-standards-block/ src/collections/pages/index.ts src/components/render-blocks.tsx
git commit -m "feat: add complianceStandardsBlock with standards grid"
```

---

## Task 9: Update ctaBlock to DemoSection layout

**Files:**
- Modify: `era-safety-payload/src/blocks/cta-block/config.ts`
- Modify: `era-safety-payload/src/blocks/cta-block/component.tsx`

**Step 1: Extend config fields**

Add: `heading` (text), `description` (textarea), `image` (upload to payload-uploads), `talkingPoints` (array of text), `teamMembers` (array of {name, avatar upload}).

Keep existing `primaryLabel`, `primaryHref` for the CTA button.
Remove `secondaryLabel`, `secondaryHref`, `microcopy` (not in new design).

**Step 2: Rewrite component**

Port DemoSection.tsx — two-column grid: left image, right info card with talking points and team avatars.

**Step 3: Verify build, commit**

```bash
git add src/blocks/cta-block/
git commit -m "feat: update ctaBlock to demo section with image and talking points"
```

---

## Task 10: Verify faqBlock (already matching)

**Files:**
- Review: `era-safety-payload/src/blocks/faq-block/config.ts`
- Review: `era-safety-payload/src/blocks/faq-block/component.tsx`

**Step 1: Compare with landing page FAQ**

The existing faqBlock already has `heading`, `items[]{question, answer}`, accordion with Radix, and the "I didn't see my question" catch-all. This matches the landing page.

**Step 2: Minor tweaks if needed**

Verify SectionHeading and accordion animation classes match. The component already uses the same Radix accordion pattern and CSS animation classes.

**Step 3: Commit if changed**

```bash
git add src/blocks/faq-block/
git commit -m "fix: align faqBlock styles with landing page"
```

---

## Task 11: Update render-blocks.tsx container widths

**Files:**
- Modify: `era-safety-payload/src/components/render-blocks.tsx`

**Step 1: Ensure correct max-widths per block**

| Block | Container |
|---|---|
| heroBlock | Self-contained (max-w-3xl) |
| featureCardsBlock | max-w-4xl py-8 md:py-12 |
| featureSectionBlock | max-w-5xl py-12 md:py-16 |
| phoneMockupBlock | max-w-5xl (self-contained) |
| complianceGapsBlock | max-w-5xl py-12 md:py-16 |
| complianceStandardsBlock | max-w-5xl py-12 md:py-16 |
| ctaBlock | max-w-5xl py-12 md:py-16 |
| faqBlock | max-w-2xl py-12 md:py-16 |

**Step 2: Add SectionConnector between feature sections**

Import `SectionConnector` from the home components. Between consecutive `featureSectionBlock` blocks, render the connector SVG line.

**Step 3: Verify build, commit**

```bash
git add src/components/render-blocks.tsx
git commit -m "feat: update render-blocks container widths and section connectors"
```

---

## Task 12: Copy static assets

**Files:**
- Copy: `new-era-landing/public/images/home/phone-chrome.svg` to `era-safety-payload/public/images/home/phone-chrome.svg`
- Copy: `new-era-landing/public/img/desktop-app-icon.png` to `era-safety-payload/public/img/desktop-app-icon.png` (if not already there)
- Copy any other referenced static images from the landing page public dir

**Step 1: Check what static assets exist**

```bash
ls new-era-landing/public/images/ new-era-landing/public/img/
```

**Step 2: Copy missing assets**

**Step 3: Commit**

```bash
git add public/images/ public/img/
git commit -m "feat: add static assets from landing page"
```

---

## Task 13: Ensure CSS design tokens match

**Files:**
- Review: `era-safety-payload/src/app/globals.css` (or equivalent)

**Step 1: Compare CSS custom properties**

Ensure the Payload project has the same Radix Sand dark/light scale, brand colors, font-jakarta variable, accordion keyframes, and semantic tokens as the landing page `globals.css`.

**Step 2: Add missing tokens if needed**

**Step 3: Verify build, commit if changed**

---

## Task 14: Final integration test

**Step 1: Run full build**

```bash
cd /Users/chrisuttam/Downloads/era-safety-payload && bun run build
```

**Step 2: Run dev server and verify homepage**

```bash
bun run dev
```

Open http://localhost:3000 — verify all blocks render correctly.

**Step 3: Test mobile viewport**

Use browser DevTools to check 375px and 768px viewports. Verify:
- FeatureSectionBlock cards don't overflow
- Hero CTAs stack on mobile
- All text scales properly
- No horizontal scroll

**Step 4: Create handoff**

Use `/create-handoff` skill to save session state for Phase 2 work.
