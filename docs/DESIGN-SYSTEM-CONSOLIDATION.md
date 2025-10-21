# Design System Consolidation

**Date**: October 22, 2025  
**Branch**: `chore/cleanup-design-system`

## Summary

Successfully consolidated the design system from scattered CSS files across `app/` and `design/themes/` into a clean, hierarchical structure under `design/` with proper token-driven theming.

## What Changed

### File Structure (Before → After)

```
OLD STRUCTURE:
app/
  tokens.css ❌ DELETED (deprecated duplicate)
  page.module.css ❌ DELETED (unused)
  reset.css → design/base/reset.css
  components/
    layout/HeaderBar.module.css ❌ DELETED (unused)
    shared/ThemeToggle.module.css ❌ DELETED (unused)

design/
  themes/
    components/*.css → design/components/
    widgets/*.css → design/components/
    layout-*.css → design/components/
    auth/*.css → design/components/
    pages/*.css → design/components/
    sections/*.css → design/components/
    wealth-code/*.css → design/features/wealth-code/
    neumorphic.css → design/components/
  utils/
    transitions.css → MERGED into design/tokens/animations.css

NEW STRUCTURE:
design/
  index.css                    # Single entry point
  base/
    reset.css                  # CSS reset
  tokens/
    colors.css                 # Palette + semantic vars
    typography.css             # Font scales
    spacing.css                # Space scale
    radii.css                  # Border radii
    shadows.css                # Elevation
    z-index.css                # Stacking
    animations.css             # Motion + transitions
    tokens.css                 # Layout tokens
  themes/
    light.css                  # Light mode semantic mappings
    dark.css                   # Dark mode semantic mappings
  components/
    neumorphic.css             # Neumorphic utilities
    button.css                 # Button + icon-button (merged)
    theme-toggle.css           # Theme toggle
    cookie-consent.css         # Cookie banner
    home.css                   # Home page
    login-page.css             # Login page
    terms-privacy.css          # Legal pages
    layout-header.css          # Header layout
    layout-shell.css           # Shell layout
    layout-standard-page.css   # Page layout
    side-menu.css              # Side menu
  features/
    wealth-code/
      birthdate-picker.css
      calculator.css
      code-inset.css
      interpretations.css
      result.css
      sales.css
      thank-you.css
  utils/
    helpers.css                # Helper utilities
```

## Theming Contract

### Theme Application
- Light mode: `:root` and `[data-theme="light"]`
- Dark mode: `[data-theme="dark"]`
- Theme applied via `<html data-theme="light|dark">`

### Color Variables

**Palette (Raw)** → `design/tokens/colors.css`
```css
--palette-surface-light-0: #f5f5f5;
--palette-text-light-900: #5e4934;
--palette-accent-500: #b28e6c;
/* etc. */
```

**Semantic (Theme-specific)** → `design/themes/light.css` / `dark.css`
```css
--background: var(--palette-surface-light-0);
--foreground: var(--palette-text-light-900);
--primary: var(--palette-accent-500);
--text-primary: var(--color-text-900);
--neu-accent: var(--color-accent-500);
/* etc. */
```

**Components use only semantic variables:**
```css
/* ✅ CORRECT */
.btn-variant-primary {
  background-color: var(--neu-card);
  color: var(--neu-text-primary);
}

/* ❌ WRONG (hard-coded) */
.btn-variant-primary {
  background-color: #f5f5f5;
  color: #5e4934;
}
```

## Token Categories

### 1. Colors (`design/tokens/colors.css`)
- Palette definitions (light/dark surfaces, text, accents)
- No theme logic here - just raw values

### 2. Typography (`design/tokens/typography.css`)
- Font families, sizes, weights, line-heights
- Responsive clamp() scales

### 3. Spacing (`design/tokens/spacing.css`)
- Golden ratio scale: `--space-3xs` to `--space-3xl`
- Legacy aliases preserved

### 4. Radii (`design/tokens/radii.css`)
- Border radius scale
- Neumorphic aliases

### 5. Shadows (`design/tokens/shadows.css`)
- Elevation scale
- Light/dark shadow references

### 6. Z-Index (`design/tokens/z-index.css`)
- Stacking layers
- App-specific z-layers

### 7. Animations (`design/tokens/animations.css`)
- Motion constants
- Transition utilities
- Keyframes
- Reduced-motion support

### 8. Layout (`design/tokens/tokens.css`)
- Component dimensions
- Page shell spacing
- Card metrics

## Import Structure

All CSS imports through single entry point:

```css
/* app/globals.css */
@import 'tailwindcss/preflight' layer(tailwind);
@tailwind utilities;

@import '../design/index.css';  /* Single import */
```

```css
/* design/index.css */
@import './base/reset.css';
@import './tokens/colors.css';
@import './tokens/typography.css';
/* ... all tokens */
@import './themes/light.css';
@import './themes/dark.css';
@import './components/neumorphic.css';
@import './components/button.css';
/* ... all components */
@import './features/wealth-code/calculator.css';
/* ... all features */
@import './utils/helpers.css';
```

## Removed Files

1. `app/tokens.css` - Deprecated duplicate
2. `app/page.module.css` - Unused CSS Module
3. `app/components/layout/HeaderBar.module.css` - Unused
4. `app/components/shared/ThemeToggle.module.css` - Unused
5. `design/utils/transitions.css` - Merged into animations.css
6. `design/themes/components/icon-button.css` - Merged into button.css

## Verification Commands

```bash
# No CSS Modules
find . -name "*.module.css" -not -path "./node_modules/*" -not -path "./.next/*"
# Output: (empty)

# No hard-coded colors in components
grep -r "#[0-9a-fA-F]\{3,6\}" design/components/ design/features/
# Output: (none - all use variables)

# No stale imports
grep -r "tokens\.css" app design
grep -r "from.*ui/tabs" app
# Output: Only correct relative imports

# Build succeeds
pnpm lint && pnpm build
# Output: ✓ Success
```

## Benefits

1. **Single source of truth**: `design/index.css` imports everything
2. **Token-driven**: No hard-coded colors/shadows in components
3. **Theme-ready**: Light/dark modes via `[data-theme]` attribute
4. **Clean hierarchy**: tokens → themes → components → features
5. **No CSS Modules**: All moved to design system or removed
6. **Smaller bundle**: Removed duplicate/unused CSS
7. **Better DX**: Clear file organization, easier to find styles

## Migration Impact

- **Zero breaking changes**: All routes, components, and features work unchanged
- **Build clean**: No TypeScript errors, lint passes
- **Business logic untouched**: No changes to `lib/domain/**`
- **Tests preserved**: Dev-only directories intact

## Next Steps

- [ ] Consider extracting reusable card/input/form components from neumorphic.css
- [ ] Add tabs.css if tab component styles grow
- [ ] Document color token names for designers
- [ ] Create Storybook stories for component variants

## Commits

- `chore(design): inventory CSS and propose consolidation map`
- `chore(design): unify tokens, remove deprecated CSS, merge transitions`
- `chore(design): fix dark theme formatting and verify semantic vars`
- `refactor(design): consolidate components under design/components and features`
- `refactor(styles): remove unused CSS Module files`
- `chore(design): move neumorphic utilities to components`

## PR Checklist

- [x] Lint passes
- [x] Build succeeds
- [x] No CSS Modules remain
- [x] No hard-coded colors in components
- [x] Themes use semantic variables
- [x] Documentation updated
- [x] Verification commands run clean
