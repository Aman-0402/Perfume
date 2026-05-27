# AGENT.md — M. M. Attarwala Project Reference

> Master reference for AI agents. Reflects current production state.

---

## 1. Project Overview

| Field | Value |
|---|---|
| Brand | M. M. Attarwala |
| Tagline | Custom-made fragrances, crafted just for you |
| Type | Luxury attar / perfume brand website |
| Goal | Cinematic, premium frontend — Arabic attar meets modern luxury |
| Status | **ALL PHASES COMPLETE** — in active polish/improvement |

---

## 2. Real Business Details

| Field | Value |
|---|---|
| WhatsApp (M. Roeesh) | `919724586101` |
| Phone (M. Munavvar) | `919016361538` |
| Email | `mmattarwala2008@rediff.com` |
| Store 1 | GF 154/155 Nazarbaug Palace, Vadodara |
| Store 2 | Shop No. 3 Fortune Point, Mandvi, Vadodara – 390 017 |
| Hours | 10 am – 8 pm · Mon closed · Fri closed 12:45–2:45 pm |
| Instagram | `@mm_attarwala` |
| Facebook | `mmattarwala` |

---

## 3. Tech Stack

| Layer | Library | Version |
|---|---|---|
| Framework | React + Vite | 18 + 5 |
| Styling | Tailwind CSS | v4 (`@tailwindcss/vite`, no config file) |
| Animation | Framer Motion | v11 |
| Scroll Animation | GSAP + ScrollTrigger | v3 |
| Routing | React Router | v6 |
| Icons | Lucide React | latest |

---

## 4. File Architecture

```
Zyrah/
├── public/
│   ├── logoakatar.png              # Brand logo (used in Navbar + Footer)
│   ├── contactbackground.png       # Contact hero full-bleed background
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── home/
│   │   │   ├── HeroSection.jsx         # Cinematic hero, GSAP orbs, FM stagger
│   │   │   ├── MarqueeStrip.jsx        # Infinite ticker, hover-pause
│   │   │   ├── FeaturedSection.jsx     # 3 cards, GSAP stagger, mobile tap, gold CTA
│   │   │   └── BrandEthos.jsx          # Philosophy, 2-col, rotating ornament
│   │   ├── collections/
│   │   │   ├── CollectionsHero.jsx     # Hero with arabesque SVG divider
│   │   │   ├── FilterTabs.jsx          # Sticky glass pills, layoutId slide, counts
│   │   │   ├── ProductGrid.jsx         # 1/2/3 col responsive, AnimatePresence
│   │   │   └── CollectionCard.jsx      # 3D tilt card, cursor parallax, shine sweep
│   │   ├── fragrance/
│   │   │   ├── FragranceBuilderHero.jsx
│   │   │   ├── StepIndicator.jsx       # 5-step fill track + completion marks
│   │   │   ├── BottlePreview.jsx       # CSS SVG bottle, animated fill
│   │   │   ├── Step1Family.jsx
│   │   │   ├── Step2Notes.jsx
│   │   │   ├── Step3Intensity.jsx
│   │   │   ├── Step4Name.jsx
│   │   │   └── Step5Enquiry.jsx        # WhatsApp deep-link submission
│   │   ├── about/
│   │   │   ├── AboutHero.jsx           # "Our Story." hero, stats, no breadcrumb
│   │   │   ├── HeritageBand.jsx        # Full-width clipPath GSAP reveal
│   │   │   ├── OurStory.jsx            # 3 alternating blocks, CSS ornaments
│   │   │   ├── ProcessTimeline.jsx     # 4 steps, horizontal/vertical responsive
│   │   │   ├── ValuesGrid.jsx          # 3 cards, GSAP stagger
│   │   │   └── FounderNote.jsx         # Word-by-word FM quote reveal
│   │   ├── contact/
│   │   │   ├── ContactHero.jsx         # BG image hero, 82vh, dark scrim → warm ivory fade
│   │   │   ├── ContactForm.jsx         # High-contrast ivory inputs, chips, shimmer CTA
│   │   │   └── ContactInfo.jsx         # Readable contact cards, WA/phone/email/address/hours/products
│   │   ├── layout/
│   │   │   ├── Navbar.jsx              # Dark espresso glass theme, ivory/gold links, mobile overlay
│   │   │   ├── Footer.jsx              # Warm espresso gradient, quote, 3-col (2-col nav on mobile), social
│   │   │   └── RouteScrollToTop.jsx    # useLocation → window.scrollTo(0,0)
│   │   └── ui/
│   │       └── Button.jsx              # primary / outline / ghost variants
│   ├── data/
│   │   ├── products.js                 # 12 products, 4 categories, CATEGORIES array
│   │   └── notes.js                    # FAMILIES, NOTE_OPTIONS, INTENSITY_LEVELS
│   ├── hooks/
│   │   ├── useGSAPReveal.js            # useGSAPReveal + useGSAPStaggerReveal
│   │   └── useScrollPosition.js        # scrollY + isScrolled (threshold 50px)
│   ├── pages/
│   │   ├── Home.jsx                    # 4 sections + atmospheric bridge divs
│   │   ├── Collections.jsx
│   │   ├── CustomFragrance.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx                 # 2-col layout + BottomCTA strip
│   │   └── NotFound.jsx
│   ├── styles/
│   │   └── globals.css                 # @theme tokens, base, .cx, .luxury-* utils
│   ├── App.jsx                         # Router + AnimatePresence + RouteScrollToTop
│   └── main.jsx
├── AGENT.md                            # THIS FILE
├── README.md
├── index.html                          # OG meta, Google Fonts preconnect
├── package.json
└── vite.config.js                      # manual chunks: react/motion/gsap
```

---

## 5. Design System

### Theme Direction

**Rich Cinematic Arabian Luxury Perfume Brand** — warm ivory luxury with controlled dark cinematic anchors. The site should feel like a premium Arabian fragrance house, not a pale perfume template: high-contrast dark brown typography, reserved metallic gold accents, warm amber lighting, restrained dividers, dark espresso navbar, warm espresso footer, and richer ivory surfaces for product/configurator/contact sections.

Target balance: **70% warm ivory luxury / 30% dark cinematic luxury**. Avoid excessive white bloom, fog bands, washed-out overlays, and gold used as default text.

### Color Tokens (`globals.css @theme`)

| Token | Hex | Usage |
|---|---|---|
| `gold-300` | `#D1A35E` | Refined metallic hover gold |
| `gold-400` | `#C8A96B` | Primary gold — CTAs, active, borders |
| `gold-500` | `#9A6127` | Deep gold, gradients |
| `gold-600` | `#8A6D1E` | Darkest gold, pressed states |
| `ivory` | `#F5F0E8` | Card/panel backgrounds |
| `cream` | `#F7F3EE` | Body + page background |
| `cream-dark` | `#EFE6D8` | Section alternate background |
| `brown` | `#2B160D` | Primary text, headings |
| `brown-light` | `#5C4638` | Secondary text, descriptions |
| `espresso` | `#1A120E` | Footer + dark section depth |
| `oud-amber` | `#A45A2A` | Signature accent — badges, highlights |
| `oud-amber-light` | `#C26D32` | Oud amber hover |
| `black` | `#0B0807` | Deepest dark |

### Background System (light — unified)

All sections use shared cream base so no visible seams:

```
body:                      #F7F3EE  (warm cream base, subtle amber/brown radial gradients)
.luxury-page:              cream gradient #F7F3EE→#EFE6D8 + restrained amber/brown glows
.luxury-section::before:   rgba(247,243,238, 0.72–0.74) cream overlay
.luxury-section-alt::before: rgba(239,230,216, 0.76–0.78) slightly warmer overlay
.product-catalog-section:  #F1E9DD / deeper warm ivory for product/catalog separation
custom/contact surfaces:   #F1E7DA → #EFE2D2 warm ivory, dark readable text
```

**Navbar exception:** dark espresso glass at all scroll states. Use `rgba(27,18,13,0.88–0.94)` with low blur (`7–9px`), ivory links, gold active state.
**Footer exception:** warm espresso gradient (`#2B1A11 → #1E120D → #160D09`) — still dark, but not near-black.
**ContactHero exception:** dark scrim kept over photo for legibility, but bottom fade goes to warm ivory, not black.

**Rule:** avoid huge white/black glow bands. Section transitions should usually be a restrained 1px metallic divider:

```css
background: linear-gradient(90deg, transparent, rgba(200,169,107,0.22), transparent);
box-shadow: 0 0 30px rgba(183,106,47,0.08);
```

### Utility Class Colors

| Class | Color | Role |
|---|---|---|
| `.luxury-hero`, `.luxury-heading`, `.luxury-card-title` | `#2B160D` | Headings |
| `.luxury-body`, `.editorial-copy` | `#5C4638` | Body text |
| `.editorial-muted` | `rgba(92,70,56,0.78)` | Muted/caption text |
| `.luxury-label` | `#9A6127` | Labels |
| `.glass` | `rgba(255,255,255,0.68)` | Light glassmorphism |
| `.luxury-panel` | `rgba(255,255,255,0.82)` | Light panel/card bg |
| `.teal-badge` | bg `#A45A2A`, text `#F7F3EE` | Oud Amber badge (Bestseller, Alcohol Free) |
| `.luxury-divider-glow::before` | clean 1px gold line + tiny amber shadow | Section separators — sharp, not blurry |

### Text Hierarchy Rule

Use dark brown for most headings and copy. Reserve gold for:
- one highlighted word in a heading
- active navigation
- CTAs
- premium labels
- dividers / micro details

Example: `Craft Your` = `#2B160D`; `Signature` = `#C8A96B` italic. Do not make full headings pale gold or low-opacity ivory on light sections.

### Typography

| Role | Font | Weight |
|---|---|---|
| Display/Hero | Cormorant Garamond | 300 italic |
| Headings | Cormorant Garamond | 400 |
| Italic accent | Cormorant Garamond Italic | 300–400 |
| Body | Inter | 300–400 |
| UI / Labels | Inter | 500–600 |
| Micro tracking | Inter uppercase | 400, `tracking-[0.3em+]` |

### Easing

```js
const LUXURY   = [0.22, 1, 0.36, 1]       // smooth luxury reveals
const CINEMATIC = [0.76, 0, 0.24, 1]      // fast-in slow-out card/stagger
const SPRING   = { stiffness: 180, damping: 28, mass: 0.8 } // 3D card tilt
```

### Container

```css
.cx { max-width: 1440px; padding: 0 1.5rem; margin: auto; }
```

### Section Padding Pattern

Navbar clearance via section-level clamp (not inner padding):
```jsx
style={{ paddingTop: 'clamp(96px, 10vw, 130px)' }}  // hero sections
style={{ paddingTop: 'clamp(100px, 11vw, 140px)' }}  // contact/about heroes
```

---

## 6. Animation Patterns

### Libraries
- **Framer Motion** — component animations, hover, page transitions, variants
- **GSAP + ScrollTrigger** — scroll-triggered reveals, stagger on scroll

### GSAP Hooks (`src/hooks/useGSAPReveal.js`)

```js
// Single element reveal
const ref = useGSAPReveal({
  from: { opacity: 0, y: 30 },
  to: { opacity: 1, y: 0 },
  duration: 0.9,          // default
  start: 'top 82%',       // default
})

// Stagger children (attach to container, children need [data-reveal])
const ref = useGSAPStaggerReveal({
  selector: '[data-reveal]',
  from: { opacity: 0, y: 20, scale: 0.96 },
  to: { opacity: 1, y: 0, scale: 1 },
  stagger: 0.13,
  start: 'top 80%',
})
```

### Framer Motion Patterns

| Pattern | Implementation |
|---|---|
| Page entrance | `initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}` |
| Hero text reveal | `initial={{ y:'110%', opacity:0 }} animate={{ y:0, opacity:1 }}` |
| Shine sweep | `shineKey` state increments on hover → AnimatePresence remount → `left: -38%→138%` |
| Layout filter | `AnimatePresence mode="popLayout"` in ProductGrid |
| Active pill slide | `layoutId="filterActive"` on FilterTabs active indicator |

---

## 7. CollectionCard — 3D Hover Architecture

**File:** `src/components/collections/CollectionCard.jsx`

### Motion Value Layer Stack (image area, z-order)

| Z | Layer | Motion |
|---|---|---|
| 0 | BG gradient (inset -8%) | `bgX/bgY` spring — moves opposite cursor |
| 1 | Arabic watermark | Same `bgX/bgY`, fades on hover |
| 2 | Bottle/image | Cursor `bottleX/Y` amplified |
| 3 | Dynamic cursor glow | `glowLeft/glowTop` string motion values |
| 20 | Glass shine sweep | AnimatePresence keyed on `shineKey` |

### Key Motion Values
```js
rawX, rawY       // onMouseMove → normalized -0.5 to +0.5
rotateX, rotateY // card tilt (disabled on mobile)
bgX, bgY         // parallax × 7, opposite cursor
bottleX, bottleY // parallax × 13/9, same as cursor
glowLeft, glowTop // '15%'→'85%' follows cursor
cardShadow       // [rawX, rawY] combined transform → box-shadow string
```

### Mobile Behavior
- `isMobile` detected via `window.matchMedia('(max-width: 639px)')`
- Mobile: no 3D tilt, no mouse parallax
- Mobile: tap card → toggle `touchActive` → triggers hover visual state
- Image area: `aspectRatio: featured ? '16/9' : '4/3'` (not fixed height)
- Desktop: fixed heights (`featured: 360px`, `bestseller: 310px`, default: `268px`)

---

## 8. Routing & Navigation

```
/                   → Home.jsx
/collections        → Collections.jsx
/custom-fragrance   → CustomFragrance.jsx
/about              → About.jsx
/contact            → Contact.jsx
*                   → NotFound.jsx
```

- `BrowserRouter` in `main.jsx`
- `AnimatePresence mode="wait"` + `key={location.pathname}` in `App.jsx`
- `RouteScrollToTop` fires `window.scrollTo(0,0)` on every pathname change
- `NavLink` with `end` prop on `/` for exact active matching
- Navbar closes mobile menu on route change

---

## 9. Component Rules

- All components: functional, hooks-based
- Props: destructured with defaults in function signature
- No class components
- Import order: React → third-party → local hooks → local components
- No `index.js` barrel files — import directly by filename
- Inline styles: only for dynamic values. Prefer Tailwind for static

---

## 10. Responsive Rules

| Breakpoint | Prefix | Key behaviors |
|---|---|---|
| Default | (none) | 1-col, hamburger menu, stacked layout |
| `sm` (640px) | `sm:` | 2-col product grid, show some desktop patterns |
| `md` (768px) | `md:` | Desktop nav, 3-col footer, 2-col contact layout |
| `lg` (1024px) | `lg:` | 3-col product grid, wider paddings |

Mobile-first always. Use `clamp()` for fluid font/spacing. Never desktop-first media queries.

---

## 11. Completed Improvements Log

### Navigation & UX
- [x] `RouteScrollToTop` — scroll reset on every route change
- [x] Navbar — dark espresso glass surface at all scroll states, ivory links, gold active state
- [x] Navbar — reduced haze/blur (`7–9px`), stronger dark transparency (`rgba(27,18,13,0.88+)`)
- [x] Navbar — CTA button gold-outline/fill hover with `fontWeight: 600`
- [x] Navbar — mobile overlay dark espresso gradient with ivory/gold links

### Home Page
- [x] HeroSection — `paddingTop: clamp(96px,10vw,130px)` navbar clearance fix
- [x] HeroSection — left-warm / right-dark cinematic vignette overlay
- [x] HeroSection — amber bottle glow `drop-shadow(0 0 40px rgba(200,140,60,0.35))`
- [x] HeroSection — cream bottom fade `#F7F3EE`
- [x] FeaturedSection — mobile tap-to-hover (activeId state, touchActive toggle)
- [x] FeaturedSection CTA — gold-filled button with shimmer sweep, `mt-16 md:mt-20`, GSAP reveal
- [x] FeaturedSection cards — warm cream bg `rgba(248,244,238)`, richer shadow
- [x] MarqueeStrip — cream bg `rgba(240,235,225,0.92)`, cream fade `#F0EBE1`
- [x] BrandEthos — warm amber radial depth, stronger brown text, clearer ornamental contrast

### Collections
- [x] ProductGrid — `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, removed mobile stagger offset
- [x] CollectionCard mobile — image uses `aspectRatio: '4/3'` (featured: `16/9`), not fixed height
- [x] CollectionCard — desc, notes, "Handcrafted · Pure Essence" label always visible (no `hidden sm:*`)
- [x] CollectionCard price — split format: `₹799 · 30ml` (was `₹799 for 30ml`)
- [x] CollectionCard — warm cream content area `rgba(248,244,238)`, stronger gold border/shadow
- [x] CollectionCard — Bestseller badge → `.teal-badge` (Oud Amber `#A45A2A`)
- [x] CollectionCard — Alcohol Free static badge added (`.teal-badge`)

### About Page
- [x] AboutHero — oversized one-line headline `clamp(56px,11vw,180px)`, no breadcrumb
- [x] AboutHero — `75vh justify-center` (was `92vh justify-end` causing huge empty space)
- [x] AboutHero — cream bg `linear-gradient(160deg, #FAF7F2 ...)`, brown text
- [x] HeritageBand — warm cream bg overlay, brown "Rooted in India." text (gold "Inspired by Arabia." unchanged)

### Contact Page
- [x] ContactHero — full rewrite: `contactbackground.png` BG, `82vh`, scrim layers, animated eyebrow
- [x] ContactHero — scrim lightened so background image shows: base `rgba(5,3,2,0.10)`
- [x] ContactHero — dark scrim intentionally kept, bottom fade now blends into warm ivory instead of black
- [x] Contact page surface — warm ivory `#F1E7DA → #EFE2D2`, bordered from hero/footer
- [x] ContactForm — high-contrast ivory inputs `rgba(255,255,255,0.86)`, dark brown text, 6px radius
- [x] ContactForm — inactive subject chips readable cream + dark text; active chips gold-filled
- [x] ContactForm — reduced glass blur; focus uses gold border + subtle brown/amber shadow
- [x] ContactForm — subject chips (pill shape), shimmer CTA with Send icon
- [x] ContactInfo — readable cream cards, dark text, gold icons, `borderRadius: 6px`, product pill tags
- [x] Contact BottomCTA — dark warm espresso panel with rounded corners, gold-filled primary CTA

### Footer
- [x] Footer background lifted from near-black to warm espresso gradient `#2B1A11 → #1E120D → #160D09`
- [x] Footer social icon hover → teal `#3D6B5E` (was gold)
- [x] Footer quote — wrapped in `py-16 md:py-24`, gold `◆` separator with `mb-16 md:mb-20`
- [x] Footer mobile — nav links `grid grid-cols-2` (was single column text wall), `gap-10`

### Light Theme Rebrand (2026-05-27)
- [x] Full site switched from dark cinematic → light airy luxury (all 5 pages, 11 components)
- [x] `globals.css` — cream tokens, light body, all utility class colors to brown
- [x] `globals.css` — `.luxury-divider-glow::before` → clean 1px gold line (was blurry glow)
- [x] `globals.css` — `.teal-badge` added (now Oud Amber `#A45A2A`)

### Palette Refinement (2026-05-27)
- [x] Gold richer: `#C8A96B` primary, `#D1A35E` hover (metallic, not neon), `#9A6127` dark
- [x] Text higher-contrast: `#2B160D` main, `#5C4638` soft
- [x] Signature accent: **Oud Amber** `#A45A2A` / `#C26D32` added as tokens
- [x] Body bg: `#F7F3EE` (warmer than initial cream)
- [x] Card contrast: `rgba(248,244,238)` warm cream, stronger borders + shadows
- [x] Hero: left-warm/right-dark vignette, amber bottle glow

### Contrast & Glow Pass (2026-05-27)
- [x] Reduced white fog/bloom bands globally; dividers now restrained 1px metallic lines
- [x] Product/catalog sections use deeper warm ivory via `.product-catalog-section`
- [x] Home hero: darker text hierarchy, amber bottle spotlight, reduced diffuse glow
- [x] BrandEthos: warmer amber radial depth, stronger dark typography, clearer ornaments
- [x] Collection cards: product names stay dark brown; gold reserved for accents and price

### Custom Fragrance Builder (2026-05-27)
- [x] Page background moved to warm ivory `#F1E7DA → #EFE2D2`
- [x] Removed massive glow bands above/below configurator; replaced with restrained metallic dividers
- [x] Hero headline: `Craft Your` dark brown, `Signature` gold italic
- [x] Family cards: Floral rebalanced to deep wine brown (`#4A1822/#5A1F2A`), Fresh to deep emerald oud green (`#0F2E25/#1A4337`)
- [x] Bottle preview panel: rounded `12px`, warmer edge light, amber glow, stronger presence
- [x] Continue button: visible filled gold CTA with `mt-16 md:mt-20` breathing room

---

## 12. Key Patterns for Future Agents

### Adding a new page
1. Create `src/pages/NewPage.jsx` with `motion.main` wrapper (opacity 0→1 entrance)
2. Add route in `App.jsx`
3. Add link to `Navbar.jsx` NAV_LINKS array and `Footer.jsx` NAV_LINKS array
4. Use `paddingTop: 'clamp(100px, 11vw, 140px)'` on hero section for navbar clearance

### Adding a product image
1. Put PNG/WebP in `public/images/`
2. Reference in `products.js`: `image: `${import.meta.env.BASE_URL}images/filename.jpg``
3. `CollectionCard` checks `image` prop — renders `<img>` or `<BottlePlaceholder>`

### Using GSAP reveal
```jsx
import { useGSAPReveal, useGSAPStaggerReveal } from '../../hooks/useGSAPReveal'

const ref = useGSAPReveal({ from: { opacity: 0, y: 30 }, to: { opacity: 1, y: 0 } })
// attach: <div ref={ref}>

const containerRef = useGSAPStaggerReveal({ selector: '[data-reveal]', stagger: 0.13 })
// children need data-reveal attribute
```

### Tailwind v4 notes
- Config entirely in `src/styles/globals.css` via `@theme {}`. No `tailwind.config.js`.
- Color tokens: `--color-gold-400` → generates `bg-gold-400`, `text-gold-400`, `border-gold-400`
- Opacity modifier: `text-gold-400/60`, `border-gold-400/15`
- `font-heading` → Cormorant Garamond. `font-body` → Inter (default on `body`).

### Background / Glow Rule
Avoid large white/black bloom bands, fog strips, and overexposed separators. They flatten the site and make it feel less premium.

Use restrained section transitions:
```css
height: 1px;
background: linear-gradient(90deg, transparent, rgba(200,169,107,0.22), transparent);
box-shadow: 0 0 30px rgba(183,106,47,0.08);
```

Use warmer section surfaces for work/catalog areas:
- Product/catalog: `#F1E9DD`
- Custom fragrance and contact content: `#F1E7DA → #EFE2D2`
- Body/page base remains `#F7F3EE`
- Footer remains warm espresso gradient
- ContactHero keeps dark scrim over the photo, but fades into warm ivory

### BASE_URL
Always use `import.meta.env.BASE_URL` prefix for public assets:
```js
const BASE = import.meta.env.BASE_URL
// usage: `${BASE}logoakatar.png`
```

---

## 13. Commands

```bash
npm run dev      # localhost:5173
npm run build    # production build
npm run preview  # preview production build
```

Build verified clean. No size warnings (manual chunks configured in `vite.config.js`).
