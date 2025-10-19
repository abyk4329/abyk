# Calculator Page Design Kickoff

This brief outlines the initial structure for the dedicated calculator page while keeping shared navigation aligned with the homepage.

## 1. Goals

- Provide an approachable flow for entering birthdate data and triggering the wealth-code calculation.
- Maintain neumorphic aesthetics and gradient background continuity from the homepage.
- Keep the side menu identical to other pages (same trigger, animation, and link order).
- Route the "יצירת קשר" menu entry to the contact channel (temporary `mailto` until a `/contact` route is introduced).

## 2. Layout Structure

- **Wrapper**: Use `StandardPageLayout` (already in place) to inherit floating controls, safe-area padding, and menu overlay.
- **Max width**: Target `maxWidth="md"` for comfortable desktop reading while staying mobile first.
- **Stacking**:
  1. Intro hero card describing the calculator purpose.
  2. Input form card with three numeric fields (day, month, year).
  3. Supporting tips / validation hints.
  4. Action buttons (calculate, reset) and a link to interpretations once a code is generated.

## 3. Visual Language

- **Background**: Inherit `--page-gradient` in light mode and the dark radial blend when the calculator route is active (already configured inside `app/globals.css`).
- **Primary card**: Continue using `.neuro-card-main.hero-card` with inset highlight and soft edges.
- **Large decorative icon**: Place a Lucide `Calculator` with `strokeWidth={0.5}` inside an inset square/rounded container, matching the homepage hero icon rule for large cards.
- **Typography**: Reuse headline clamps and caption styles documented in `HOMEPAGE-BLUEPRINT.md`.

## 4. Form Components

- **Inputs**: `input[type="number"]` instances wrapped in neumorphic containers (`styles.inputField`) with inset shadows for depth.
- **Labels**: Uppercase captions centered above each input to reinforce RTL clarity even within the LTR numeric grid.
- **Validation**: Keep existing JS checks (range & date validity). Surface errors via alerts now; plan toast or inline messages in later iteration.

## 5. Actions & States

- **Primary call-to-action**: `GlassButton` variant `primary` for "חשב את הקוד"; pressed state mirrors global inset rules.
- **Secondary**: `GlassButton` variant `secondary` resets fields.
- **After calculation**: persist the last code in state to allow quick navigation to interpretations/sales pages.

## 6. Navigation Requirements

- Floating menu & theme toggle remain untouched, ensuring a consistent experience across pages.
- Side menu links mirror the homepage order; when the dedicated contact page ships, update both definitions to use `routes.contact`.
- Any authority/organization links embedded in contextual copy should point to the contact page rather than external, per product guidance.

## 7. Next Steps

1. Polish the intro hero card copy to match the homepage tone of voice.
2. Add brief usage tips below the form (e.g., formatting example, privacy reassurance).
3. Provide empty-state messaging after reset to guide users back to the CTA.
4. Explore inline validation states (border glow + caption) in a subsequent iteration.

This foundation keeps the calculator page consistent with the refreshed homepage while leaving room for future enhancements.
