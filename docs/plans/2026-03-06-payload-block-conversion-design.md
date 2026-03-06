# ERA Safety Landing Page — Payload CMS Block Conversion

## Overview

Convert the ERA Safety landing page sections into Payload CMS render blocks in the existing `era-safety-payload` project at `/Users/chrisuttam/Downloads/era-safety-payload/`.

## Architecture

- Each block: `config.ts` (Payload schema) + `component.tsx` (React render)
- Block directory: `src/blocks/<block-name>/`
- Shared UI components: `src/components/era/`
- Pattern: block components receive `{ data: BlockType }` props

## Skills to invoke per session

Always invoke before implementation:
- `/payload` — Payload CMS patterns, block schemas, field types
- `/motion` — Framer Motion animation patterns
- `/tailwind-css-patterns` — Tailwind responsive patterns
- `/baseline-ui` — UI quality constraints

Use for specific phases:
- `/accessibility-compliance` or `/fixing-accessibility` — Phase 3 accessibility audit
- `/site-architecture` — Phase 3 SEO (robots, sitemap, meta tags)
- `/landing-page-copywriter` — if copy needs rework
- `/create-handoff` — when complete or near context limit (AUTO)

External skills found (install if needed):
- `wshobson/agents@wcag-audit-patterns` (2.7K installs) — WCAG audit
- `addyosmani/web-quality-skills@accessibility` (2.6K installs) — accessibility
- `aiagentskills/skills@landing-page-optimizer` (52 installs) — landing page SEO
- `younesbenallal/seo-skills@seo-roast` (15 installs) — SEO audit

## Phase 1 — Core Blocks (now)

### 1.0 Copy shared UI components
Source: `new-era-landing/src/components/` and `src/lib/`
Target: `era-safety-payload/src/components/era/`

Files to copy & adapt imports:
- `ui/Button.tsx`, `ui/Badge.tsx`, `ui/Icons.tsx`, `ui/Avatar.tsx`, `ui/UIText.tsx`
- `home/BentoCard.tsx`, `home/SectionBadge.tsx`, `home/FeatureTabs.tsx`
- `home/NumberTicker.tsx`, `home/CustomerLogos.tsx`, `home/FooterLines.tsx`
- `home/ChatBubbles.tsx`
- `home/InvoiceIllustration.tsx`, `home/SearchIllustration.tsx`
- `home/KanbanIllustration.tsx`, `home/MySiteIllustration.tsx`
- `layouts/WidthContainer.tsx`, `layouts/PageHead.tsx`
- `lib/motion.ts`, `lib/utils.ts`

### 1.1 heroBlock (update existing)
Fields: headline, subtext, ctaPrimary{label,href}, ctaSecondary{label,href}
Mobile fix: stack CTAs vertically, clamp font sizes

### 1.2 featureCardsBlock / HeroPreview (update existing)
Fields: cards[]{label, description, iconType}
4 bento preview cards with dashed connector

### 1.3 featureSectionBlock (NEW)
Fields: illustrationType (select: critical|capture|improve|mySite), title, description, bullets[], reversed (checkbox), badge{letter, label, color}
Mobile fix: cap card height, tighter stacking, wrap bullet tabs

### 1.4 phoneMockupBlock (NEW)
Fields: headline, ctaLabel, ctaHref
Hardcoded phone SVG + FooterLines

### 1.5 complianceGapsBlock (NEW)
Fields: sectionLabel, heading, gaps[]{title, description, iconType}, solution{title, description, ctaLabel, ctaHref}
3 problem cards + 1 solution card with ChatBubbles decoration

### 1.6 complianceStandardsBlock (NEW)
Fields: sectionLabel, heading, standards[]{code, title, items[]}
2x2 grid of standards cards

### 1.7 ctaBlock / DemoSection (update existing)
Fields: heading, description, image(upload), talkingPoints[], ctaLabel, ctaHref, teamMembers[]{name, avatar(upload)}

### 1.8 faqBlock (update existing)
Fields: heading, items[]{question, answer}
Radix accordion, same pattern

## Phase 2 — Deferred Blocks (after user edits)

### 2.1 testimonialBlock (update existing)
Globe background + centered title. Wait for user's design changes.

### 2.2 statsBlock (NEW)
Number tickers. Wait for user's design changes.

### 2.3 sectorsBlock (NEW)
Industry cards grid. Wait for user's design changes.

## Phase 3 — Post-Conversion Checklists

### Accessibility Audit
- [ ] All images have meaningful alt text
- [ ] Color contrast meets WCAG AA (4.5:1 text, 3:1 large text)
- [ ] Keyboard navigation works for all interactive elements
- [ ] Focus indicators visible on all focusable elements
- [ ] ARIA labels on icon-only buttons
- [ ] Accordion meets WAI-ARIA accordion pattern
- [ ] Skip navigation link present
- [ ] Heading hierarchy is correct (h1 > h2 > h3)
- [ ] Motion respects prefers-reduced-motion
- [ ] Touch targets minimum 44x44px on mobile

### SEO Optimization
- [ ] Unique meta title and description per page
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Twitter Card meta tags
- [ ] Structured data (JSON-LD: Organization, FAQ, BreadcrumbList)
- [ ] Canonical URL set
- [ ] robots.txt configured
- [ ] XML sitemap generated
- [ ] All heading tags semantic and hierarchical
- [ ] Image optimization (next/image, WebP, lazy loading)
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] Internal linking strategy
- [ ] 404 page exists

### Final QA
- [ ] All blocks render correctly in Payload admin preview
- [ ] Live preview works at mobile/tablet/desktop breakpoints
- [ ] Dark mode renders correctly
- [ ] No console errors
- [ ] Build passes with no TypeScript errors
- [ ] Lighthouse score > 90 on all categories
- [ ] Cross-browser: Chrome, Safari, Firefox
- [ ] Font loading: Inter + Plus Jakarta Sans load correctly
