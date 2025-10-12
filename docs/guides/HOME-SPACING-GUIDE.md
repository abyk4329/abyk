# Home Page Spacing Guide

This note summarizes the adjustments made to the home experience and what to check when modifying layouts in the future.

## Key changes implemented

- **Hero shell padding** – The `.hero-shell` class now applies safe-area-aware padding on all sides and clamps the available width for hero cards. This keeps the hero card centered and prevents white gutters on notch devices.
- **Full-bleed app shell** – Routes that use the hero layout add the `app-shell--full-bleed` modifier so the background gradient stretches edge-to-edge while still respecting `env(safe-area-inset-*)` values.
- **Hero card width clamps** – All hero cards use `clamp()` to stay between 320‒860px depending on the viewport. This avoids overly wide cards on desktops and cramped layouts on phones.
- **Header spacing** – The header container now uses reduced horizontal padding (`px-1` / `px-2`) and a wider max width (`min(1440px, 100%)`) so taglines can run longer without clipping.
- **Navigation overrides** – The `NavigationProvider` is used to manage scroll locking and visibility. Full-screen views lock scroll and optionally hide the footer to make room for floating navigation.

## Checklist for future edits

1. **Safe areas first** – When introducing new full-screen sections, reuse `.hero-shell` or mirror its padding logic. Verify on devices with notches (iPhone 14, etc.).
2. **Width clamping** – Use `clamp(min, preferred, max)` for card widths instead of fixed pixel values.
3. **Header copy length** – If the header tagline changes, ensure the reduced padding still keeps the text on a single line under 375px wide viewports.
4. **Scroll locking** – Any new full-screen step should enable `lockScroll` through the `NavigationProvider` to prevent background scrolling during transitions.
5. **Navigation flow** – When adding new steps, update `routes` and the `NavigationButtons` ordered route list so forward/back buttons stay accurate.

Keep this checklist nearby whenever you adjust the hero, calculator, or result sections to maintain consistent spacing across the experience.
