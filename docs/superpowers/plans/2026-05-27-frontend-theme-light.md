# Frontend Light Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand M. M. Attarwala frontend from dark cinematic to light airy department-store feel across all 5 pages.

**Architecture:** CSS-first token swap in `globals.css` (body, utility classes, new tokens) plus targeted inline style fixes in ~10 components. No logic changes — pure visual rebrand. Footer stays dark. ContactHero scrim stays dark.

**Tech Stack:** React + Vite, Tailwind CSS v4 (config in `globals.css @theme {}` only), Framer Motion, GSAP

**No git commits** — user manages git manually.

---

## File Map

| File | Change type |
|---|---|
| `src/styles/globals.css` | Add tokens, rewrite body + utility classes, add `.teal-badge` |
| `src/components/layout/Navbar.jsx` | Scrolled/non-scrolled backdrop, nav link text, hamburger, mobile overlay + links |
| `src/components/layout/Footer.jsx` | Social hover teal only (background stays dark) |
| `src/components/home/HeroSection.jsx` | BG gradient, orb colors, bottom fade, headline + subtext colors |
| `src/components/home/MarqueeStrip.jsx` | Strip bg, fade mask color, text color |
| `src/components/home/BrandEthos.jsx` | Section overlay, text colors |
| `src/components/home/FeaturedSection.jsx` | Atmospheric glows, card bg gradients, card body bg, text colors, heading |
| `src/components/collections/CollectionCard.jsx` | Content area bg, name/desc/price text, Bestseller → teal badge, add Alcohol-Free teal badge, BottlePlaceholder bg |
| `src/components/contact/ContactForm.jsx` | Input bg/text, textarea bg/text, inactive subject chip bg |
| `src/components/about/AboutHero.jsx` | Section bg gradient, atmospheric glows, subtext + stat text colors, bottom fade |
| `src/components/about/HeritageBand.jsx` | Section bg, text color |

---

## Task 1: globals.css — Tokens, Body, Utility Classes, `.teal-badge`

**Files:**
- Modify: `src/styles/globals.css`

- [ ] **Step 1: Add new color tokens to `@theme {}`**

Open `src/styles/globals.css`. In the `@theme { }` block (after `--color-burgundy`), add:

```css
  --color-cream: #FAF7F2;
  --color-cream-dark: #F0EBE1;
  --color-teal: #3D6B5E;
  --color-teal-light: #4F8A7A;
```

The full `@theme` block becomes:
```css
@theme {
  --color-gold-300: #E2C27D;
  --color-gold-400: #C9A84C;
  --color-gold-500: #A8862E;
  --color-gold-600: #8A6D1E;
  --color-ivory: #F5F0E8;
  --color-ivory-dark: #E8E0D0;
  --color-black: #0B0807;
  --color-black-soft: #15100E;
  --color-brown: #3B1F0F;
  --color-brown-light: #5C3420;
  --color-espresso: #130B08;
  --color-plum: #201016;
  --color-burgundy: #321118;
  --color-cream: #FAF7F2;
  --color-cream-dark: #F0EBE1;
  --color-teal: #3D6B5E;
  --color-teal-light: #4F8A7A;

  --font-heading: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
}
```

- [ ] **Step 2: Rewrite the `body` rule**

Replace:
```css
body {
  background-color: #090605;
  background-image:
    radial-gradient(ellipse at 18% 4%, rgba(107,45,18,0.18) 0%, transparent 42%),
    radial-gradient(ellipse at 82% 16%, rgba(72,20,36,0.13) 0%, transparent 38%),
    radial-gradient(ellipse at 72% 92%, rgba(124,76,24,0.11) 0%, transparent 44%),
    linear-gradient(180deg, #0c0807 0%, #120b08 42%, #0b0706 100%);
  color: var(--color-ivory);
```

With:
```css
body {
  background-color: #FAF7F2;
  background-image:
    radial-gradient(ellipse at 20% 10%, rgba(201,168,76,0.06) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 90%, rgba(61,107,94,0.04) 0%, transparent 50%);
  color: #3B1F0F;
```

- [ ] **Step 3: Update `.page-grain` opacity**

Replace:
```css
  opacity: 0.055;
```
With:
```css
  opacity: 0.025;
```

- [ ] **Step 4: Update `.page-vignette` background**

Replace:
```css
.page-vignette {
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events: none;
  background:
    radial-gradient(ellipse at center, transparent 52%, rgba(0,0,0,0.34) 100%),
    radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.055) 0%, transparent 54%);
  mix-blend-mode: normal;
}
```
With:
```css
.page-vignette {
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events: none;
  background:
    radial-gradient(ellipse at center, transparent 60%, rgba(240,235,225,0.30) 100%);
  mix-blend-mode: normal;
}
```

- [ ] **Step 5: Update scrollbar track**

Replace:
```css
::-webkit-scrollbar-track {
  background: var(--color-black);
}
```
With:
```css
::-webkit-scrollbar-track {
  background: var(--color-cream-dark);
}
```

- [ ] **Step 6: Update `h1–h6` color**

Replace:
```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.005em;
  color: #F5F1EA;
}
```
With:
```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.005em;
  color: #3B1F0F;
}
```

- [ ] **Step 7: Update `.luxury-hero` color**

Replace:
```css
.luxury-hero {
  font-family: var(--font-heading);
  font-weight: 300;
  line-height: 0.9;
  letter-spacing: -0.025em;
  color: #F5F1EA;
  text-shadow: 0 2px 30px rgba(255,255,255,0.08), 0 0 58px rgba(201,168,76,0.14);
}
```
With:
```css
.luxury-hero {
  font-family: var(--font-heading);
  font-weight: 300;
  line-height: 0.9;
  letter-spacing: -0.025em;
  color: #3B1F0F;
  text-shadow: 0 2px 30px rgba(59,31,15,0.06), 0 0 58px rgba(201,168,76,0.10);
}
```

- [ ] **Step 8: Update `.luxury-heading` color**

Replace:
```css
.luxury-heading {
  font-family: var(--font-heading);
  font-weight: 300;
  line-height: 0.98;
  letter-spacing: -0.012em;
  color: #F5F1EA;
}
```
With:
```css
.luxury-heading {
  font-family: var(--font-heading);
  font-weight: 300;
  line-height: 0.98;
  letter-spacing: -0.012em;
  color: #3B1F0F;
}
```

- [ ] **Step 9: Update `.luxury-card-title` color**

Replace:
```css
.luxury-card-title {
  font-family: var(--font-heading);
  font-weight: 400;
  line-height: 1.04;
  letter-spacing: -0.006em;
  color: #F5F1EA;
}
```
With:
```css
.luxury-card-title {
  font-family: var(--font-heading);
  font-weight: 400;
  line-height: 1.04;
  letter-spacing: -0.006em;
  color: #3B1F0F;
}
```

- [ ] **Step 10: Update `.luxury-body` color**

Replace:
```css
  color: rgba(245,241,234,0.90);
}

.luxury-label {
```
With:
```css
  color: rgba(59,31,15,0.80);
}

.luxury-label {
```

- [ ] **Step 11: Update `.luxury-label` color**

Replace:
```css
  color: rgba(200,169,107,0.88);
}
```
(the one inside `.luxury-label`) With:
```css
  color: #C9A84C;
}
```

- [ ] **Step 12: Update `.editorial-copy` color**

Replace:
```css
.editorial-copy {
  font-family: var(--font-body);
  font-size: clamp(0.94rem, 0.9rem + 0.16vw, 1.06rem);
  line-height: 1.88;
  font-weight: 400;
  color: rgba(245,241,234,0.90);
}
```
With:
```css
.editorial-copy {
  font-family: var(--font-body);
  font-size: clamp(0.94rem, 0.9rem + 0.16vw, 1.06rem);
  line-height: 1.88;
  font-weight: 400;
  color: rgba(59,31,15,0.80);
}
```

- [ ] **Step 13: Update `.editorial-muted` color**

Replace:
```css
.editorial-muted {
  color: rgba(236,230,220,0.78);
}
```
With:
```css
.editorial-muted {
  color: rgba(92,52,32,0.70);
}
```

- [ ] **Step 14: Update `.glass` to light glassmorphism**

Replace:
```css
.glass {
  background: rgba(20, 12, 9, 0.66);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(226, 194, 125, 0.18);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.025), 0 24px 70px rgba(0,0,0,0.32);
}
```
With:
```css
.glass {
  background: rgba(255,255,255,0.68);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(201,168,76,0.22);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.60), 0 24px 70px rgba(59,31,15,0.08);
}
```

- [ ] **Step 15: Update `.luxury-page` to cream**

Replace:
```css
.luxury-page {
  background:
    radial-gradient(ellipse 72% 54% at 20% 8%, rgba(97,39,19,0.16) 0%, transparent 58%),
    radial-gradient(ellipse 62% 48% at 82% 22%, rgba(80,23,41,0.12) 0%, transparent 58%),
    radial-gradient(ellipse 68% 46% at 50% 100%, rgba(117,72,22,0.10) 0%, transparent 60%),
    linear-gradient(180deg, #0a0705 0%, #0c0806 100%);
}
```
With:
```css
.luxury-page {
  background:
    radial-gradient(ellipse 72% 54% at 20% 8%, rgba(201,168,76,0.06) 0%, transparent 58%),
    radial-gradient(ellipse 62% 48% at 82% 22%, rgba(61,107,94,0.04) 0%, transparent 58%),
    radial-gradient(ellipse 68% 46% at 50% 100%, rgba(201,168,76,0.04) 0%, transparent 60%),
    linear-gradient(180deg, #FAF7F2 0%, #F0EBE1 100%);
}
```

- [ ] **Step 16: Update `.luxury-section::before` overlay to cream**

Replace:
```css
  background:
    radial-gradient(ellipse 80% 58% at 18% 28%, rgba(102,42,22,0.12) 0%, transparent 66%),
    radial-gradient(ellipse 68% 50% at 86% 64%, rgba(64,20,35,0.10) 0%, transparent 68%),
    linear-gradient(180deg, rgba(9,6,5,0.80) 0%, rgba(9,6,5,0.82) 100%);
}

.luxury-section::after {
```
With:
```css
  background:
    radial-gradient(ellipse 80% 58% at 18% 28%, rgba(201,168,76,0.05) 0%, transparent 66%),
    radial-gradient(ellipse 68% 50% at 86% 64%, rgba(61,107,94,0.04) 0%, transparent 68%),
    linear-gradient(180deg, rgba(250,247,242,0.78) 0%, rgba(250,247,242,0.80) 100%);
}

.luxury-section::after {
```

- [ ] **Step 17: Update `.luxury-section-alt::before` overlay**

Replace:
```css
.luxury-section-alt::before {
  background:
    radial-gradient(ellipse 78% 55% at 78% 25%, rgba(104,35,49,0.14) 0%, transparent 66%),
    radial-gradient(ellipse 72% 54% at 8% 74%, rgba(128,75,22,0.10) 0%, transparent 68%),
    linear-gradient(180deg, rgba(9,6,5,0.82) 0%, rgba(9,6,5,0.80) 48%, rgba(9,6,5,0.82) 100%);
}
```
With:
```css
.luxury-section-alt::before {
  background:
    radial-gradient(ellipse 78% 55% at 78% 25%, rgba(201,168,76,0.05) 0%, transparent 66%),
    radial-gradient(ellipse 72% 54% at 8% 74%, rgba(61,107,94,0.04) 0%, transparent 68%),
    linear-gradient(180deg, rgba(240,235,225,0.80) 0%, rgba(240,235,225,0.78) 48%, rgba(240,235,225,0.80) 100%);
}
```

- [ ] **Step 18: Update `.luxury-panel` to light**

Replace:
```css
.luxury-panel {
  background:
    linear-gradient(160deg, rgba(31,17,13,0.88) 0%, rgba(14,10,9,0.92) 58%, rgba(34,13,19,0.78) 100%);
  border: 1px solid rgba(226,194,125,0.14);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.035),
    inset 0 -1px 0 rgba(201,168,76,0.035),
    0 28px 80px rgba(0,0,0,0.36),
    0 0 60px rgba(84,28,36,0.12);
}
```
With:
```css
.luxury-panel {
  background: rgba(255,255,255,0.82);
  border: 1px solid rgba(201,168,76,0.18);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.70),
    inset 0 -1px 0 rgba(201,168,76,0.06),
    0 28px 80px rgba(59,31,15,0.08),
    0 0 60px rgba(201,168,76,0.04);
}
```

- [ ] **Step 19: Add `.teal-badge` utility at the end of the file**

Append before the closing of the file (after `.animate-marquee`):
```css

/* ─── Teal badge — Bestseller, Alcohol-Free ───────────────────────────────── */
.teal-badge {
  background: #3D6B5E;
  color: #FAF7F2;
  font-family: var(--font-body);
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 2px;
}
```

---

## Task 2: Navbar.jsx — Light Backdrop, Brown Links, Cream Mobile Overlay

**Files:**
- Modify: `src/components/layout/Navbar.jsx`

- [ ] **Step 1: Update scrolled header backdrop to cream**

Find the `isScrolled` true branch (lines ~99–107). Replace:
```jsx
            background: 'linear-gradient(to bottom, rgba(5,3,2,0.98) 0%, rgba(8,5,3,0.96) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(176,141,87,0.14)',
            paddingTop: '12px',
            paddingBottom: '6px',
            boxShadow: '0 4px 40px rgba(0,0,0,0.6), 0 1px 0 rgba(176,141,87,0.08)',
```
With:
```jsx
            background: 'linear-gradient(to bottom, rgba(250,247,242,0.97) 0%, rgba(245,241,234,0.95) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(201,168,76,0.18)',
            paddingTop: '12px',
            paddingBottom: '6px',
            boxShadow: '0 4px 40px rgba(59,31,15,0.08), 0 1px 0 rgba(201,168,76,0.10)',
```

- [ ] **Step 2: Update non-scrolled header backdrop to cream**

Find the `isScrolled` false branch (lines ~109–115). Replace:
```jsx
            background: 'linear-gradient(to bottom, rgba(5,3,2,0.92) 0%, rgba(8,5,3,0.86) 80%, rgba(5,3,2,0.72) 100%)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(176,141,87,0.09)',
            paddingTop: '20px',
            paddingBottom: '12px',
```
With:
```jsx
            background: 'linear-gradient(to bottom, rgba(250,247,242,0.90) 0%, rgba(250,247,242,0.82) 80%, rgba(250,247,242,0.70) 100%)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(201,168,76,0.10)',
            paddingTop: '20px',
            paddingBottom: '12px',
```

- [ ] **Step 3: Update desktop nav link inactive color**

In `NavItem`, replace:
```jsx
                color: isActive ? 'rgba(226,194,125,1)' : 'rgba(245,241,234,0.92)',
                textShadow: isActive ? '0 0 20px rgba(201,168,76,0.42)' : '0 0 16px rgba(0,0,0,0.28)',
```
With:
```jsx
                color: isActive ? 'rgba(201,168,76,1)' : '#3B1F0F',
                textShadow: isActive ? '0 0 20px rgba(201,168,76,0.42)' : 'none',
```

- [ ] **Step 4: Update nav link hover color restore**

In the same `NavItem` span, replace the `onMouseEnter` and `onMouseLeave`:
```jsx
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = 'rgba(224,188,100,1)'; e.currentTarget.style.textShadow = '0 0 16px rgba(201,168,76,0.35)' } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = 'rgba(245,241,234,0.92)'; e.currentTarget.style.textShadow = '0 0 16px rgba(0,0,0,0.28)' } }}
```
With:
```jsx
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = 'rgba(201,168,76,1)'; e.currentTarget.style.textShadow = '0 0 16px rgba(201,168,76,0.35)' } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = '#3B1F0F'; e.currentTarget.style.textShadow = 'none' } }}
```

- [ ] **Step 5: Update mobile hamburger button color**

Replace:
```jsx
            style={{ color: 'rgba(245,240,232,0.7)' }}
```
With:
```jsx
            style={{ color: '#3B1F0F' }}
```

- [ ] **Step 6: Update mobile overlay background to cream**

Find the mobile menu `motion.div` with `key="mobile-menu"`. Replace:
```jsx
            style={{ background: 'rgba(3,2,1,1)', backdropFilter: 'blur(24px)' }}
```
With:
```jsx
            style={{ background: 'rgba(250,247,242,0.98)', backdropFilter: 'blur(24px)' }}
```

- [ ] **Step 7: Update mobile nav link colors to brown**

In the mobile `NavLink` span inside the map (lines ~275–280), replace:
```jsx
                          color: isActive ? 'rgba(176,141,87,0.95)' : 'rgba(255,252,245,0.88)',
                          textShadow: isActive ? '0 0 30px rgba(176,141,87,0.25)' : 'none',
```
With:
```jsx
                          color: isActive ? 'rgba(201,168,76,1)' : 'rgba(59,31,15,0.88)',
                          textShadow: isActive ? '0 0 30px rgba(201,168,76,0.25)' : 'none',
```

- [ ] **Step 8: Update mobile tagline text color**

Replace:
```jsx
                <p className="text-[9px] tracking-[0.4em] uppercase" style={{ color: 'rgba(255,252,245,0.55)' }}>
```
With:
```jsx
                <p className="text-[9px] tracking-[0.4em] uppercase" style={{ color: 'rgba(59,31,15,0.45)' }}>
```

---

## Task 3: Footer.jsx — Teal Social Icon Hover

**Files:**
- Modify: `src/components/layout/Footer.jsx`

- [ ] **Step 1: Read Footer.jsx to locate social icon hover handler**

Read `src/components/layout/Footer.jsx` and find the social icon anchor/button elements. They will have an `onMouseEnter` that sets color to a gold value. Change the hover color from gold to teal `#3D6B5E`. The `onMouseLeave` restore value should remain the existing base color (ivory/muted, since footer stays dark).

The pattern to find and update — wherever social icons have hover style like:
```jsx
onMouseEnter={e => e.currentTarget.style.color = 'rgba(201,168,76,...)'}
```
Change to:
```jsx
onMouseEnter={e => e.currentTarget.style.color = '#3D6B5E'}
```

Do NOT change the footer's background or text colors — footer stays dark intentionally.

---

## Task 4: HeroSection.jsx — Cream BG, Gold/Teal Orbs, Brown Text

**Files:**
- Modify: `src/components/home/HeroSection.jsx`

- [ ] **Step 1: Read the file first**

Read `src/components/home/HeroSection.jsx` fully to identify: the inline `style={{ background: ... }}` on the section or a wrapping div, the GSAP ambient orb `background` rgba values, the headline color, and the subtext color, and the bottom fade gradient.

- [ ] **Step 2: Update section background**

The `<section>` element has `className="... luxury-page ..."` — `luxury-page` is handled by globals.css. If there is also an inline `background` style on the section, change it:
```jsx
background: 'linear-gradient(180deg, #FAF7F2 0%, #F0EBE1 100%)',
```
If there is no inline background on the section, skip this step (globals.css handles it via `.luxury-page`).

- [ ] **Step 3: Update GSAP ambient orb colors**

Find the GSAP orb animation code. The dark warm rgba values like `rgba(80,23,41,0.34)` should become:
- First orb: `rgba(201,168,76,0.10)`
- Second orb: `rgba(61,107,94,0.07)`

Look for `gsap.to(` or `gsap.fromTo(` calls that animate background or any `style.background` assignments referencing dark rgba warm colors, and update accordingly.

- [ ] **Step 4: Update headline text color**

Find the main headline element. It likely uses `text-ivory` Tailwind class or `style={{ color: 'rgba(245,241,234,...)' }}`. Change to `#3B1F0F` or `text-brown`:
- If Tailwind class `text-ivory`: change to `style={{ color: '#3B1F0F' }}`
- If inline style: change to `'#3B1F0F'`

- [ ] **Step 5: Update subtext color**

Find the subtitle/subtext paragraph. If it has ivory muted color like `rgba(245,241,234,0.70)` or similar, change to `rgba(59,31,15,0.70)`.

- [ ] **Step 6: Update bottom fade gradient**

Find `linear-gradient(to top, #100908` or similar dark-to-transparent gradient at the bottom of the section. Change the dark color to cream:
```jsx
background: 'linear-gradient(to top, #FAF7F2, transparent)',
```

---

## Task 5: MarqueeStrip.jsx — Cream Strip, Cream Fade, Brown Text

**Files:**
- Modify: `src/components/home/MarqueeStrip.jsx`

- [ ] **Step 1: Read the file**

Read `src/components/home/MarqueeStrip.jsx` fully.

- [ ] **Step 2: Update strip background**

Find the strip wrapper style with dark background like `rgba(9,6,5,0.75)`. Replace with:
```jsx
background: 'rgba(240,235,225,0.92)',
```

- [ ] **Step 3: Update fade mask colors**

The marquee strip uses CSS mask or pseudo-element fade gradients that reference `#090605` for fade edges. Change the dark `#090605` values to `#F0EBE1` so the fade blends into the cream strip:
- In gradient masks: `rgba(9,6,5,1)` or `#090605` → `#F0EBE1` or `rgba(240,235,225,1)`

- [ ] **Step 4: Update text color to brown**

Any text with ivory/white color in the marquee items. Change to `#3B1F0F` or `rgba(59,31,15,0.90)`.

---

## Task 6: BrandEthos.jsx — Cream Overlay, Brown Text

**Files:**
- Modify: `src/components/home/BrandEthos.jsx`

- [ ] **Step 1: Read the file**

Read `src/components/home/BrandEthos.jsx` fully.

- [ ] **Step 2: Update section overlay**

Find the overlay div with `rgba(9,6,5,0.22)`. Replace with:
```jsx
background: 'rgba(250,247,242,0.22)',
```

- [ ] **Step 3: Update text colors to brown**

Find any text with ivory/white colors like `rgba(255,252,245,0.88)` or `rgba(245,241,234,...)`. Replace with brown equivalents:
- Primary text: `rgba(59,31,15,0.90)` or `#3B1F0F`
- Muted text: `rgba(59,31,15,0.70)`

The rotating ornament color stays gold — do not change gold `rgba(201,168,76,...)` values.

---

## Task 7: FeaturedSection.jsx — Light Card BG, Brown Text, Cream Atm Glows

**Files:**
- Modify: `src/components/home/FeaturedSection.jsx`

- [ ] **Step 1: Update atmospheric glow colors**

Find the three atmospheric glow `div` elements with `style={{ background: 'radial-gradient(...)' }}`. Change the dark warm rgba values to light warm/gold:

Top glow (currently `rgba(170,96,31,0.14)`):
```jsx
background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 65%)',
```
Bottom-left glow (currently `rgba(110,46,23,0.11)`):
```jsx
background: 'radial-gradient(ellipse at 0% 100%, rgba(201,168,76,0.06) 0%, transparent 65%)',
```
Right glow (currently `rgba(78,22,42,0.16)`):
```jsx
background: 'radial-gradient(ellipse at 100% 50%, rgba(61,107,94,0.06) 0%, transparent 70%)',
```

- [ ] **Step 2: Update heading text color**

Find the `<h2>` with `text-ivory` class. Change `text-ivory` to a brown style:
```jsx
<h2 className="luxury-heading text-4xl sm:text-5xl md:text-7xl mb-8 text-center" style={{ color: '#3B1F0F' }}>
```
(Remove `text-ivory` class, add inline `style={{ color: '#3B1F0F' }}`.)

- [ ] **Step 3: Update subheading italic text**

Find the italic paragraph with `text-[#ECE6DC]`. Change to brown:
```jsx
<p className="font-heading italic text-xl md:text-2xl max-w-md mx-auto text-center leading-relaxed" style={{ color: 'rgba(59,31,15,0.75)' }}>
```
(Remove `text-[#ECE6DC]` class, add inline style.)

- [ ] **Step 4: Update `FragranceCard` card body background to cream**

In `FragranceCard`, find the `style` on `motion.article`. The featured and non-featured `background` linear-gradient values use dark rgba. Change to cream/white:

Featured card:
```jsx
        background: featured
          ? 'linear-gradient(155deg, rgba(255,255,255,0.88) 0%, rgba(250,247,242,0.92) 58%, rgba(255,255,255,0.80) 100%)'
          : 'linear-gradient(155deg, rgba(255,255,255,0.84) 0%, rgba(250,247,242,0.90) 58%, rgba(255,255,255,0.78) 100%)',
```

Also update `boxShadow` for featured card from dark to light:
```jsx
        boxShadow: featured
          ? '0 30px 90px rgba(59,31,15,0.12), 0 0 70px rgba(201,168,76,0.08), inset 0 1px 0 rgba(255,255,255,0.70)'
          : '0 24px 70px rgba(59,31,15,0.08), inset 0 1px 0 rgba(255,255,255,0.60)',
```

- [ ] **Step 5: Update `FragranceCard` text colors to brown**

Inside `FragranceCard`'s card body `<div className="p-7 ...">`:

Find the `<h3>` with `text-ivory` class:
```jsx
            <h3 className="luxury-card-title text-[1.75rem] md:text-[2rem] group-hover:text-gold-300 transition-colors duration-300" style={{ color: '#3B1F0F' }}>
```
(Remove `text-ivory`, keep `group-hover:text-gold-300`, add inline color.)

Find the `<p className="luxury-body">` with hardcoded `color: 'rgba(245,241,234,0.90)'`. Change to:
```jsx
        <p className="luxury-body" style={{ maxWidth: '92%', color: 'rgba(59,31,15,0.75)' }}>{desc}</p>
```

---

## Task 8: CollectionCard.jsx — Cream Content BG, Brown Text, Teal Badges

**Files:**
- Modify: `src/components/collections/CollectionCard.jsx`

- [ ] **Step 1: Update content area background to cream**

Find the `CONTENT AREA` div (the one after `END IMAGE AREA` comment). It has:
```jsx
          background: isActive
            ? 'rgba(22,15,6,0.99)'
            : 'linear-gradient(180deg, rgba(18,12,5,0.98) 0%, rgba(14,9,3,0.98) 100%)',
```
Replace with:
```jsx
          background: isActive
            ? 'rgba(255,255,255,0.96)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.90) 0%, rgba(250,247,242,0.92) 100%)',
```

- [ ] **Step 2: Update product name color to brown**

Find the `<h3>` in the content area name row:
```jsx
              style={{ color: isActive ? 'rgba(232,200,132,1)' : 'rgba(255,252,245,0.97)' }}>
```
Replace with:
```jsx
              style={{ color: isActive ? 'rgba(201,168,76,1)' : '#3B1F0F' }}>
```

- [ ] **Step 3: Update arrow icon color**

Find the `ArrowRight` motion.div:
```jsx
            style={{ color: isActive ? accentColor : 'rgba(255,252,245,0.55)' }}
```
Replace with:
```jsx
            style={{ color: isActive ? accentColor : 'rgba(59,31,15,0.40)' }}
```

- [ ] **Step 4: Update description text to brown**

Find the description `<p>`:
```jsx
          style={{ fontSize: '0.875rem', color: isActive ? 'rgba(245,241,234,0.94)' : 'rgba(236,230,220,0.84)', transition: 'color 0.4s' }}>
```
Replace with:
```jsx
          style={{ fontSize: '0.875rem', color: isActive ? 'rgba(59,31,15,0.90)' : 'rgba(59,31,15,0.72)', transition: 'color 0.4s' }}>
```

- [ ] **Step 5: Update "Enquire" text color**

Find the `Enquire` `motion.span`:
```jsx
                style={{ color: 'rgba(255,252,245,0.72)' }}
```
Replace with:
```jsx
                style={{ color: 'rgba(59,31,15,0.65)' }}
```

- [ ] **Step 6: Update `BottlePlaceholder` background**

In `BottlePlaceholder`, find the body div (the widest div with `width: '58%'`). Its background is already using `accentColor` — this is fine. However, the outer container has no explicit bg. Look for any dark bg on the outer placeholder container and remove it, or ensure the card's content area bg shows through naturally. If `BottlePlaceholder` has a dark background on its wrapper, change it to `#F5F0E8` (ivory token):
```jsx
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: '#F5F0E8' }}>
```
Only add the `style` if a dark background exists on that wrapper; otherwise leave as-is.

- [ ] **Step 7: Change `isBestseller` badge to teal**

Find the `isBestseller` badge span:
```jsx
          {isBestseller && (
            <span className="text-[8px] tracking-[0.3em] uppercase px-2.5 py-1 border border-gold-400/50 text-gold-400">
              Bestseller
            </span>
          )}
```
Replace with:
```jsx
          {isBestseller && (
            <span className="teal-badge">
              Bestseller
            </span>
          )}
```

- [ ] **Step 8: Add "Alcohol Free" teal badge**

After the `isBestseller` badge block, add a static "Alcohol Free" teal badge:
```jsx
          <span className="teal-badge">
            Alcohol Free
          </span>
```

(The badge renders below New/Bestseller badges since it's inside the same `flex flex-col gap-1.5` container at `top-3 left-3`.)

- [ ] **Step 9: Update card box shadow to light**

The card's `boxShadow` comes from the `cardShadow` motion value (computed from tilt). Find:
```jsx
  const cardShadow = useTransform(
    [rawX, rawY],
    ([x, y]) =>
      `${-x * 30}px ${-y * 22}px 55px rgba(0,0,0,0.6), 0 0 45px ${accentColor}12, 0 6px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(201,168,76,0.08)`
  )
```
Replace with:
```jsx
  const cardShadow = useTransform(
    [rawX, rawY],
    ([x, y]) =>
      `${-x * 18}px ${-y * 14}px 40px rgba(59,31,15,0.10), 0 0 45px ${accentColor}12, 0 8px 40px rgba(59,31,15,0.08), 0 1px 0 rgba(201,168,76,0.08)`
  )
```

---

## Task 9: ContactForm.jsx — Light Glass Inputs, Brown Text

**Files:**
- Modify: `src/components/contact/ContactForm.jsx`

- [ ] **Step 1: Update `GlassInput` background and text color**

In the `GlassInput` component's `<input>` element, find:
```jsx
            background: focused
              ? 'rgba(201,168,76,0.06)'
              : 'rgba(255,255,255,0.03)',
```
And the `color`:
```jsx
            color: 'rgba(255,248,240,0.90)',
```

Replace the background with:
```jsx
            background: focused
              ? 'rgba(201,168,76,0.06)'
              : 'rgba(255,255,255,0.80)',
```
Replace the color with:
```jsx
            color: '#3B1F0F',
```

- [ ] **Step 2: Update textarea background and text**

Find the `<textarea>` element's default style:
```jsx
                    background: 'rgba(255,255,255,0.03)',
```
and the `color`:
```jsx
                    color: 'rgba(255,248,240,0.90)',
```
And the `onFocus`/`onBlur` handlers' background values:
- `onFocus`: `'rgba(201,168,76,0.06)'` stays (focused gold tint is fine)
- `onBlur` restore: `'rgba(255,255,255,0.03)'` → `'rgba(255,255,255,0.80)'`

Replace textarea default background `'rgba(255,255,255,0.03)'` with `'rgba(255,255,255,0.80)'`.
Replace `color: 'rgba(255,248,240,0.90)'` with `color: '#3B1F0F'`.
Replace `onBlur` background restore `'rgba(255,255,255,0.03)'` with `'rgba(255,255,255,0.80)'`.
Also replace `onBlur` color restore with `'#3B1F0F'`:
```jsx
                    e.target.style.color = '#3B1F0F'
```

- [ ] **Step 3: Update inactive subject chip background**

Find the inactive subject chip style:
```jsx
                        background: active
                          ? 'linear-gradient(135deg, rgba(201,168,76,1) 0%, rgba(176,141,87,0.90) 100%)'
                          : 'rgba(255,255,255,0.025)',
                        color: active ? '#080503' : 'rgba(236,230,220,0.75)',
```
Replace the inactive values:
```jsx
                        background: active
                          ? 'linear-gradient(135deg, rgba(201,168,76,1) 0%, rgba(176,141,87,0.90) 100%)'
                          : 'rgba(255,255,255,0.80)',
                        color: active ? '#080503' : 'rgba(59,31,15,0.75)',
```

Also find the chip `onMouseEnter`/`onMouseLeave` for inactive state:
```jsx
                        e.currentTarget.style.background = 'rgba(201,168,76,0.08)'
                        e.currentTarget.style.color = 'rgba(255,248,240,0.90)'
```
and:
```jsx
                        e.currentTarget.style.background = 'rgba(255,255,255,0.025)'
                        e.currentTarget.style.color = 'rgba(236,230,220,0.75)'
```
Change the `onMouseLeave` restore values to match new inactive state:
```jsx
                        e.currentTarget.style.background = 'rgba(255,255,255,0.80)'
                        e.currentTarget.style.color = 'rgba(59,31,15,0.75)'
```

- [ ] **Step 4: Update heading and description text colors**

Find the form heading section (above `AnimatePresence`):
```jsx
      <h2 className="font-heading text-3xl md:text-[2.6rem] mb-2 leading-tight" style={{ color: 'rgba(255,248,240,0.94)' }}>
```
Change to:
```jsx
      <h2 className="font-heading text-3xl md:text-[2.6rem] mb-2 leading-tight" style={{ color: '#3B1F0F' }}>
```

Find the description paragraph:
```jsx
      <p className="text-[13px] leading-relaxed mb-10" style={{ color: 'rgba(236,230,220,0.70)' }}>
```
Change to:
```jsx
      <p className="text-[13px] leading-relaxed mb-10" style={{ color: 'rgba(59,31,15,0.65)' }}>
```

Find the success state heading:
```jsx
              <h3 className="font-heading text-2xl text-ivory mb-2">Message Sent ✦</h3>
```
Change to:
```jsx
              <h3 className="font-heading text-2xl mb-2" style={{ color: '#3B1F0F' }}>Message Sent ✦</h3>
```

Find the success description:
```jsx
              <p className="text-sm font-light max-w-xs" style={{ color: 'rgba(255,252,245,0.75)' }}>
```
Change to:
```jsx
              <p className="text-sm font-light max-w-xs" style={{ color: 'rgba(59,31,15,0.65)' }}>
```

---

## Task 10: AboutHero.jsx — Cream BG, Brown Text

**Files:**
- Modify: `src/components/about/AboutHero.jsx`

- [ ] **Step 1: Update section background gradient**

Find the section's inline `background`:
```jsx
        background: 'linear-gradient(160deg, #0a0705 0%, #0d0807 40%, #0a0705 70%, #090605 100%)',
```
Replace with:
```jsx
        background: 'linear-gradient(160deg, #FAF7F2 0%, #F0EBE1 40%, #FAF7F2 70%, #F5F2EC 100%)',
```

- [ ] **Step 2: Update atmospheric glow colors**

Find the three atmospheric glow divs. Change the dark warm rgba values to light warm/teal equivalents:

First glow (currently `rgba(156,88,28,0.18)`):
```jsx
        background: 'radial-gradient(ellipse 60% 55% at 75% 40%, rgba(201,168,76,0.08) 0%, transparent 65%)',
```
Second glow (currently `rgba(84,25,42,0.14)`):
```jsx
        background: 'radial-gradient(ellipse 50% 45% at 15% 70%, rgba(61,107,94,0.06) 0%, transparent 65%)',
```
Third glow (currently `rgba(201,168,76,0.07)`): stays gold, just slightly adjust:
```jsx
        background: 'radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.07) 0%, transparent 60%)',
```
(Third one unchanged — gold is fine on light.)

- [ ] **Step 3: Update eyebrow text color**

Find the eyebrow `<motion.p>` with `color: 'rgba(176,141,87,0.60)'`. This is already gold — leave it unchanged.

- [ ] **Step 4: Update headline text colors**

Find the headline `<motion.h1>` inner spans:
```jsx
            <span style={{ color: 'rgba(245,241,234,0.97)', fontStyle: 'italic' }}>Our&nbsp;</span>
```
Replace with:
```jsx
            <span style={{ color: '#3B1F0F', fontStyle: 'italic' }}>Our&nbsp;</span>
```
The `Story.` span uses gold gradient — leave it unchanged.

- [ ] **Step 5: Update subtext and stat colors**

Find the italic subtext `<motion.p>`:
```jsx
              color: 'rgba(236,230,220,0.82)',
```
Replace with:
```jsx
              color: 'rgba(59,31,15,0.72)',
```

Find the stat label spans with `color: 'rgba(176,141,87,0.55)'` — these are gold/muted, leave them unchanged.

- [ ] **Step 6: Update bottom fade gradient**

Find `background: 'linear-gradient(to top, #0c0806, transparent)'`. Replace with:
```jsx
background: 'linear-gradient(to top, #FAF7F2, transparent)',
```

---

## Task 11: HeritageBand.jsx — Cream BG, Brown Text

**Files:**
- Modify: `src/components/about/HeritageBand.jsx`

- [ ] **Step 1: Update section background**

Find the section's inline `background`:
```jsx
        background: 'linear-gradient(180deg, rgba(59,31,15,0.18) 0%, rgba(59,31,15,0.35) 50%, rgba(59,31,15,0.18) 100%)',
```
Replace with:
```jsx
        background: 'linear-gradient(180deg, rgba(240,235,225,0.60) 0%, rgba(240,235,225,0.85) 50%, rgba(240,235,225,0.60) 100%)',
```

- [ ] **Step 2: Update headline text color**

Find the `<p ref={textRef}>` with className `font-heading text-ivory/88`:
```jsx
          className="font-heading text-ivory/88 leading-tight select-none"
```
Replace with:
```jsx
          className="font-heading leading-tight select-none"
          style={{ color: '#3B1F0F' }}
```
(Remove `text-ivory/88` Tailwind class, add inline brown style. Keep `clipPath` in existing `style` if there is one — but the current code has `clipPath` inside `style` prop, so the `style` prop already exists — merge the color into it.)

Actually looking at the code, the `<p>` has:
```jsx
          style={{
            fontSize: 'clamp(2rem, 6vw, 6.5rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            clipPath: 'inset(0 100% 0 0)',
          }}
```
So add `color: '#3B1F0F'` to this existing style object:
```jsx
          style={{
            fontSize: 'clamp(2rem, 6vw, 6.5rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            clipPath: 'inset(0 100% 0 0)',
            color: '#3B1F0F',
          }}
```
And remove `text-ivory/88` from `className`.

---

## Spec Self-Review

**Coverage check:**
- [x] globals.css: all 19 changes listed
- [x] Navbar.jsx: backdrop, links, mobile overlay, mobile links
- [x] Footer.jsx: social hover teal
- [x] HeroSection.jsx: bg, orbs, headline, subtext, bottom fade
- [x] MarqueeStrip.jsx: strip bg, fade, text
- [x] BrandEthos.jsx: overlay, text
- [x] FeaturedSection.jsx: atm glows, heading, subheading, card bg, card text
- [x] CollectionCard.jsx: content bg, name, desc, arrow, enquire, bottle placeholder, badges, shadow
- [x] ContactForm.jsx: inputs, textarea, chips, headings, success state
- [x] AboutHero.jsx: bg, glows, headline, subtext, bottom fade
- [x] HeritageBand.jsx: bg, text
- [x] No commits (user manages git manually)
- [x] Footer background stays dark (spec section 7)
- [x] ContactHero not in file list (spec section 7 — intentional)
- [x] Gold CTA buttons, gold borders, gold accents all left unchanged
- [x] `isNew` badge stays gold (spec section 5)
- [x] `.luxury-divider-glow::before` gold gradient unchanged (spec table row)
