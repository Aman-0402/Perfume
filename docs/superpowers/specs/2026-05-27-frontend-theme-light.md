# Frontend Theme — Light Rebrand Design Spec

**Date:** 2026-05-27  
**Scope:** Full site — all 5 pages  
**Approach:** CSS-first token swap (Approach A)  
**Status:** Approved

---

## 1. Summary

Rebranding M. M. Attarwala frontend from dark cinematic luxury to light, airy department-store feel. Ivory/cream backgrounds, deep golden brown text, gold borders, teal/olive green accent badges.

---

## 2. New Color System

### New tokens (add to `src/styles/globals.css @theme`)

| Token | Hex | Usage |
|---|---|---|
| `--color-cream` | `#FAF7F2` | Body + page background |
| `--color-cream-dark` | `#F0EBE1` | Section alternate background |
| `--color-teal` | `#3D6B5E` | Best Seller badge, Alcohol-Free tag, cart counter |
| `--color-teal-light` | `#4F8A7A` | Teal hover states |

### Existing tokens repurposed (hex unchanged, role flipped)

| Token | Hex | New role |
|---|---|---|
| `--color-ivory` | `#F5F0E8` | Card/panel backgrounds |
| `--color-brown` | `#3B1F0F` | Primary text, headings |
| `--color-brown-light` | `#5C3420` | Secondary text, descriptions |
| `--color-gold-400` | `#C9A84C` | CTAs, borders, labels (unchanged) |

### Kept dark (intentional exceptions)
- **Footer** — stays `#1A0D08` warm espresso (luxury anchor, high contrast)
- **ContactHero scrim** — kept dark (photograph requires dark overlay for legibility)

---

## 3. `globals.css` Changes

### Body
```css
body {
  background-color: #FAF7F2;
  background-image:
    radial-gradient(ellipse at 20% 10%, rgba(201,168,76,0.06) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 90%, rgba(61,107,94,0.04) 0%, transparent 50%);
  color: #3B1F0F;
}
```

### Utility class changes

| Class | Property | Before | After |
|---|---|---|---|
| `.luxury-page` | background | dark `#0a0705` gradient | `#FAF7F2` + subtle warm/teal glows |
| `.luxury-section::before` | background | `rgba(9,6,5,0.80)` | `rgba(250,247,242,0.78)` |
| `.luxury-section-alt::before` | background | `rgba(9,6,5,0.82)` | `rgba(240,235,225,0.80)` |
| `.luxury-panel` | background | dark `rgba(31,17,13,0.88)` | `rgba(255,255,255,0.82)` |
| `.glass` | background | dark `rgba(20,12,9,0.66)` | `rgba(255,255,255,0.68)` |
| `.luxury-hero` | color | `#F5F1EA` | `#3B1F0F` |
| `.luxury-heading` | color | `#F5F1EA` | `#3B1F0F` |
| `.luxury-card-title` | color | `#F5F1EA` | `#3B1F0F` |
| `.luxury-body` | color | `rgba(245,241,234,0.90)` | `rgba(59,31,15,0.80)` |
| `.editorial-copy` | color | `rgba(245,241,234,0.90)` | `rgba(59,31,15,0.80)` |
| `.editorial-muted` | color | `rgba(236,230,220,0.78)` | `rgba(92,52,32,0.70)` |
| `.luxury-label` | color | `rgba(200,169,107,0.88)` | `#C9A84C` (unchanged) |
| `.page-grain` | opacity | `0.055` | `0.025` |
| `.page-vignette` | background | dark vignette | remove or `rgba(240,235,225,0.3)` edges |
| scrollbar track | background | `--color-black` | `--color-cream-dark` |
| `h1-h6` | color | `#F5F1EA` | `#3B1F0F` |
| `.luxury-divider-glow::before` | background | gold gradient | unchanged (gold stays) |

### New utility

```css
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

## 4. Component Fixes (hardcoded inline styles)

### `src/components/layout/Navbar.jsx`
- Scrolled backdrop: `rgba(9,6,5,0.88)` → `rgba(250,247,242,0.95)`
- Nav link text: ivory → `#3B1F0F` brown
- Mobile overlay bg: dark → `rgba(250,247,242,0.98)`
- Gold micro-line and active states: unchanged

### `src/components/layout/Footer.jsx`
- Background: keep `#1A0D08` (dark anchor — intentional)
- Text: ivory stays (works on dark)
- Social icon hover: gold → teal `#3D6B5E`

### `src/components/home/HeroSection.jsx`
- Inline bg gradient → cream: `linear-gradient(180deg, #FAF7F2 0%, #F0EBE1 100%)`
- GSAP ambient orb colors: dark warm rgba → `rgba(201,168,76,0.10)` and `rgba(61,107,94,0.07)`
- Headline text: ivory → brown `#3B1F0F`
- Subtext: ivory muted → `rgba(59,31,15,0.70)`

### `src/components/home/MarqueeStrip.jsx`
- Strip bg: `rgba(9,6,5,0.75)` → `rgba(240,235,225,0.92)`
- Fade mask color: `#090605` → `#F0EBE1`
- Text: ivory → `#3B1F0F`
- Gold diamond separators: unchanged

### `src/components/home/BrandEthos.jsx`
- Section overlay: `rgba(9,6,5,0.22)` → `rgba(250,247,242,0.22)`
- Text: ivory → brown
- Rotating ornament color: gold (unchanged)

### `src/components/home/FeaturedSection.jsx`
- Card bg gradients (dark): → `rgba(255,255,255,0.80)`
- Card border: gold (unchanged)
- Notes pills text: ivory → brown
- CTA button: gold filled (unchanged)

### `src/components/collections/CollectionCard.jsx`
- Card bg gradient: dark → `rgba(255,255,255,0.85)` on cream base
- Product name, description, notes: ivory → brown
- `isBestseller` badge: gold pill → `.teal-badge`
- `isNew` badge: keep gold (distinct from teal)
- "Handcrafted · Pure Essence" label: stays gold
- Price text: ivory → `#3B1F0F`
- `BottlePlaceholder` bg: dark → `#F5F0E8`
- Shine sweep: keep gold
- Box shadow: dark → `0 8px 40px rgba(59,31,15,0.10)`

### `src/components/contact/ContactForm.jsx`
- Glass panel: dark → `rgba(255,255,255,0.72)` with `backdrop-filter: blur(12px)`
- Border: `rgba(226,194,125,0.18)` → `rgba(201,168,76,0.25)`
- Input text: ivory → brown
- Subject chips: dark → `rgba(255,255,255,0.80)` + gold border
- Send button: gold filled (unchanged)

### `src/components/about/AboutHero.jsx`
- Inline bg: dark → `linear-gradient(180deg, #FAF7F2 0%, #F0EBE1 100%)`
- Headline, stats: ivory → brown

### `src/components/about/HeritageBand.jsx`
- Text sections overlay: ivory text on dark overlay → brown text on cream overlay
- ClipPath fill/reveal stays gold

---

## 5. Teal Badge Usage

`.teal-badge` applied to:

| Component | Element | Condition |
|---|---|---|
| `CollectionCard` | "BESTSELLER" label | `isBestseller === true` |
| `CollectionCard` | "ALCOHOL FREE" / "PURE ESSENCE" tag | Static — all attars qualify |

`isNew` badge keeps gold — visually distinct from teal bestseller badge.

---

## 6. Files Modified

| File | Type of change |
|---|---|
| `src/styles/globals.css` | Add tokens, rewrite body + utility classes, add `.teal-badge` |
| `src/components/layout/Navbar.jsx` | Backdrop, text colors |
| `src/components/layout/Footer.jsx` | Social hover teal only |
| `src/components/home/HeroSection.jsx` | BG, orb colors, text |
| `src/components/home/MarqueeStrip.jsx` | Strip bg, fade color, text |
| `src/components/home/BrandEthos.jsx` | Overlay, text |
| `src/components/home/FeaturedSection.jsx` | Card bg, text |
| `src/components/collections/CollectionCard.jsx` | Card bg, text, badges |
| `src/components/contact/ContactForm.jsx` | Glass panel, inputs |
| `src/components/about/AboutHero.jsx` | BG, text |
| `src/components/about/HeritageBand.jsx` | Overlay, text |

---

## 7. Files NOT modified

- `src/components/contact/ContactHero.jsx` — photo background, dark scrims intentional
- `src/components/contact/ContactInfo.jsx` — review at runtime, likely auto-adapts
- `src/components/about/OurStory.jsx` — review at runtime
- `src/components/about/ProcessTimeline.jsx` — review at runtime
- `src/components/about/ValuesGrid.jsx` — review at runtime
- `src/components/about/FounderNote.jsx` — review at runtime
- `src/components/fragrance/` — all builder steps, review at runtime
- `src/components/ui/Button.jsx` — gold/outline variants unchanged
