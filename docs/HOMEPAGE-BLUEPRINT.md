# Homepage Blueprint

This document captures the current structure and styling system of the Awakening by Ksenia homepage so designers and engineers can maintain parity across future iterations.

## 1. Structural Overview

- **Shell hierarchy**: `html > body > #__next > app-shell[data-route="/"] > main.app-main > hero-shell > contentWrapper`.
- **Safe areas**: padding respects `env(safe-area-inset-*)`. The hero shell uses calculated custom properties (`--page-shell-padding-top`, `--page-shell-content-gap-*`) so all spacing adjusts automatically across devices.
- **Viewport coverage**: `body` and `.app-shell` set `background-color` and `background-image` to ensure the radial/linear gradient fills 100dvh.
- **Flex layout**: The homepage stacks the hero card, an action stack, and social buttons inside a centered column with responsive `clamp()` padding values.

## 2. Color & Token System

All colors come from `app/globals.css` and inherit from the neumorphic palette tokens.

| Token                | Light value                     | Dark value                      | Usage                      |
| -------------------- | ------------------------------- | ------------------------------- | -------------------------- |
| `--background`       | `#f5f5f5`                       | `#2d3436`                       | Body & shell background    |
| `--card`             | `#f5f5f5`                       | `#2d3436`                       | Hero card, buttons, menu   |
| `--neu-accent`       | `#a87f58`                       | `#c9a882`                       | CTA fills, icon highlights |
| `--neu-shadow-light` | `rgba(255,255,255,1)`           | `rgba(58,63,65,1)`              | Elevated shadow highlight  |
| `--neu-shadow-dark`  | `rgba(160,160,160,0.5)`         | `rgba(20,22,23,0.8)`            | Elevated shadow depth      |
| `--neu-cta-press`    | `#8a6b4f`                       | `#8a6b4f`                       | CTA inset shadow on press  |
| `--neu-icon`         | `var(--neu-accent)` (`#a87f58`) | `var(--neu-accent)` (`#c9a882`) | Icon buttons               |
| `--text-primary`     | `#5e4934`                       | `#e8dfd5`                       | Headlines & body copy      |
| `--text-tertiary`    | `#9f8572`                       | `#b8a89a`                       | Descriptive captions       |

Gradients:

- `--page-gradient`: layered radial + linear gradient used as the default page wash.
- `--page-surface` / `--page-surface-gradient`: override when the route is one of the funnel pages (dark radial-blue blend).

## 3. Spacing & Sizing

- Global spacing tokens (`--space-*`) range from `0.5rem` to `3rem` for vertical rhythm.
- The homepage wrapper uses `padding-top: clamp(6.5rem, 16vw, 8.5rem)` and `padding-bottom: clamp(3rem, 8vw, 5rem)`.
- Buttons rely on consistent border radii (`20px` CTA/primary, `28px` menu CTA) and `gap: 0.75rem` for icon-text alignment.
- Social buttons maintain a square `56px` frame with `border-radius: 20px`.

## 4. Typography

- Font family: `var(--font-assistant)`; weights 400, 500, 600.
- Hero headline: `clamp(2rem, 6vw, 3rem)` with `letter-spacing: -0.03em`.
- CTA button: `clamp(1.0625rem, 2.5vw, 1.1875rem)` and uppercase tracking via `letter-spacing: 0.13em`.
- Supporting copy uses tertiary color with `line-height: 1.6`.

## 5. Component Breakdown

### 5.1 Floating Header Controls

- **Menu button**: `.header-floating-button--right` positions a neumorphic icon button (Lucide `Menu`, stroke 1.5). Clicking opens the side menu overlay.
- **Theme toggle**: `.header-floating-button--left` hosts a neumorphic icon button toggling between `Sun` and `Moon`; toggles the `dark` class on `<html>`.

### 5.2 Hero Card

- `.heroCard` wraps the central content with dual shadows (`14px 14px 30px` / `-12px -12px 28px`).
- **Icon inset**: `.heroIcon` container uses inset shadows and holds a Lucide `Calculator` at stroke `1` (matches the "large card" rule).
- **Heading & description**: Centralized text explaining the wealth-code calculation.
- **CTA button**: `.ctaButton` uses accent background, dual drop shadows, and new pressed state inset referencing `--neu-cta-press` for both light and dark modes.

### 5.3 Action Stack

- Primary action: `.primaryButton` (outlined) encourages sharing via `Share2` icon.
- Secondary link: `.secondaryLink` provides legal navigation with animated underline.

### 5.4 Social Buttons

- Row of four neumorphic square buttons triggering WhatsApp, Instagram, TikTok, and Email (icons at stroke 1.5). Each uses `hover:scale-[1.08]` and `active:scale-95`.

### 5.5 Share Feedback Toast

- Conditionally rendered fixed pill to confirm share/copy actions; inherits card shadows, uses tertiary text tokens.

### 5.6 Side Menu Overlay

- Triggered from floating menu; overlay dims background with `bg-black/35` and `backdrop-blur-sm`.
- **Card**: `.menuCard` slides from the left (`slideInFromRight` animation). Maintains neumorphic elevation and full-height scroll.
- **Highlight CTA**: Top link labeled "ההתחברות" uses the CTA styling to drive calculator entry.
- **Menu list**: `menuLinks` array defines items.
  - בית → `routes.home`
  - מחשבון קוד העושר → `routes.calculator`
  - יצירת קשר → Contact channel (see section 6)
  - תנאים משפטיים → `routes.terms`
- **Footer**: `.menuRights` inset card shows copyright message in LTR.

## 6. Navigation & Contact Links

- The highlighted CTA moves users to the calculator flow.
- The "יצירת קשר" entry should route to the dedicated contact page (or interim mailto) across every page. When a standalone contact route is introduced, update both `app/page.tsx` and `StandardPageLayout.tsx` to reference `routes.contact` instead of the temporary `mailto:${BRAND.email}`.
- Social icons remain consistent across all screens and should only be modified via the shared `socialLinks` array.

## 7. Accessibility Notes

- All icon buttons include `aria-label` text.
- Theme toggle updates the DOM class synchronously to avoid hydration issues.
- Share toast uses `role="status"` with `aria-live="polite"`.
- Menu overlay trap: background button closes the menu; ensure focus returns to the menu trigger after close.

---

Maintain this blueprint when extending the design system. Any homepage change should be reflected here to avoid drift between documentation and implementation.
