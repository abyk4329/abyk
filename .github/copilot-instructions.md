# GitHub Copilot Instructions - ABYK (Awakening by Ksenia)

## Project Overview

Next.js 15 + React 19 numerology calculator with Hebrew RTL support, neumorphic design system, and PDF/email infrastructure. **Primary language: Hebrew (עברית)** - all user-facing content, documentation, and commits are in Hebrew.

- **Apply changes directly.** After applying, write a very short summary in Hebrew (1–2 sentences) of what changed and where. Keep changes minimal and reversible. **Show a diff only if the change is risky** (renames, mass deletions, migrations).
- When the user writes "בצעי"/"תבצע", assume approval and use safe defaults. Avoid questions unless absolutely necessary to prevent data loss.
- **Hebrew-first**: respond and document in Hebrew by default (code in English). Use RTL and local terminology.
- **Do not rename** public components/APIs or routes without explicit approval. No cross-feature moves unless asked.
- Prefer **Server Components**; use `"use client"` only when interactivity is required.
- **No hard-coded colors/shadows**. Use design tokens and Tailwind utilities only.
- **Accessibility is mandatory** (contrast, focus rings, keyboard flow). Never remove focus outlines.
- If a token is missing, **add an alias** (do not inline hex/rgba). Propose the alias in the diff.
- Keep PRs small; conventional commits in Hebrew (`feat:`, `fix:`, `docs:`...).

## Critical Architecture Patterns

### Route Groups & Feature Modules

- **App Router Structure**: Route groups organize by purpose - `(funnels)` for conversion flow, `(labs)` for dev-only experiments, `(legal)` for policies
- **Feature-First Organization**: Business domains live in `features/` (e.g., `features/wealth-code/`) with their own `components/`, `data/`, `pdf/`, `email/`, `utils/`
- **Each feature is self-contained**: When creating new features, replicate the `wealth-code` structure - don't scatter components across `app/components/`

### Next.js 15 Server/Client Boundaries

- **Default to Server Components**: Only add `"use client"` when needed (event handlers, state, hooks, browser APIs)
- **Client wrappers for RSC**: See `app/(funnels)/result/ResultPageClient.tsx` - page.tsx exports metadata, client file handles interactivity
- **No `use server` needed**: Server Actions work without the directive in Server Components

### Data Flow (Calculator → Email → PDF)

```
User input → Calculator (client) → Result (client) → Sales → Payment webhook
                                                              ↓
                                        /api/webhooks/grow validates secret
                                                              ↓
                                        /api/generate-pdf (React PDF, RTL support)
                                                              ↓
                                        /api/send-email (Resend → Gmail SMTP fallback)
```

- **Webhook security**: Always validate `x-grow-secret` header in `/api/webhooks/grow`
- **PDF generation**: Uses `@react-pdf/renderer` with Assistant font from Google Fonts, configured in `features/wealth-code/pdf/`
- **Email delivery**: `lib/email/transport.ts` auto-selects Resend or Nodemailer based on env vars

## Development Workflow

### Environment & Tooling

- **Node.js 22 + pnpm 10.18+** (enforced via `preinstall` script)
- **Commands**: `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm test:e2e`
- **Environment variables**: Required in `.env.local` - see `docs/DEVELOPMENT.md` for full list. Key ones:
  - `RESEND_API_KEY` or `EMAIL_USER`/`EMAIL_PASSWORD` (Gmail App Password, NOT regular password)
  - `NEXT_PUBLIC_*` vars for branding (APP_NAME, APP_URL, social handles)
  - `SENTRY_DSN` for error tracking (auto-disabled if empty)

### Git Strategy (CRITICAL)

- **Protected `main` branch**: Production code, no direct pushes, requires PR approval
- **`develop` branch**: Integration/staging, all features merge here first
- **Feature branches**: `feature/user-auth`, never merge to `main` directly
- **Hotfixes**: Branch from `main`, merge back to both `main` and `develop`
- See `docs/BRANCHING.md` for complete workflow
  > עובד/ת לבד? דלגי על PRs ועברי ל— **Solo Mode (No PRs)** בהמשך המסמך.

## Solo Mode (No PRs)

- מיועד לעבודה אישית (ללא צוות).
- ענף עבודה: `main`. לפני שינוי גדול, צרי נקודת שחזור קלה: `git tag -a backup-YYYYMMDD -m "pre-change" && git push --tags`.
- בלי תצוגת diff: הסוכן מיישם מיד, ואז מסכם בשורה־שתיים בעברית מה השתנה.
- קומיטים אטומיים וקצרים עם כותרות בעברית בפורמט conventional commits (`feat:`, `fix:`, `docs:`...).
- שינויים מסוכנים (שינויי שמות גורפים/מחיקות רבות): בקשי אישור קצר פעם אחת והציגי _רשימת קבצים קצרה_ (לא diff מלא).

### Testing Requirements

Before any PR to `develop`:

- Run `pnpm lint` (ESLint 9 + TypeScript)
- Build succeeds (`pnpm build`)
- E2E smoke tests pass (`pnpm test:e2e`)
- Manual checks: calculator flow, email delivery, PDF generation, mobile responsive

## Design System (Neumorphic)

### Tailwind + Tokens (Required)

- Use the built-in container + breakpoints: `container` (centered) and screens including `xs: 380px`.
- Animations available: `animate-fadein`, `animate-scale-in`, `animate-accordion-down`, `animate-accordion-up`.
- Shadows are variable-backed: `shadow`, `shadow-md`, `shadow-lg`, `shadow-inner` (mapped to CSS vars). Do not handcraft box-shadows inline.
- Semantic color aliases exist for shared parts: `mutedforeground`, `ringforeground`. Prefer these over raw values.
- When creating new UI, wire variables first (colors, radius, shadow) then Tailwind utilities. Keep RTL-safe spacing (logical properties where possible).

### Color Palette (Light Mode Default)

```css
--neu-base: #f5f5f5          /* Page background */
--neu-card: #f5f5f5          /* Card background */
--neu-text-primary: #5e4934  /* Headings (brown-dark) */
--neu-text-secondary: #75614c /* Body text */
--neu-text-tertiary: #9f8572  /* Muted text */
--neu-accent: #a87f58         /* Primary buttons */
--neu-accent-bright: #b9a695  /* Gold highlights */
```

Dark mode: Use `[data-theme="dark"]` selector, variables auto-switch (see `app/globals.css`)

### Component Standards

**Three button types ONLY**:

1. `.btn-primary` - Gold gradient, white text, primary actions
2. `.btn-secondary` - Neumorphic card style, brown text, secondary actions
3. `.btn-link` - Text link with gold accent color

**Card Pattern** (`.card` in `globals.css`):

- Neumorphic shadows: `8px 8px 16px var(--neu-shadow-dark), -8px -8px 16px var(--neu-shadow-light)`
- Border radius: `1.75rem` mobile, `2rem` tablet+
- Width: `min(90vw, 480px)` mobile, `min(85vw, 600px)` tablet, `720px` desktop
- Height: Always `auto` based on content (never hardcode heights)

**Side Menu** (`.sideMenu`):

- Identical across ALL pages (see `app/components/layout/SideMenu.tsx`)
- Max width: `min(85vw, 420px)`, full height with scroll
- Menu buttons: `.menuButton` (default), `.menuButtonActive` (selected state)

### Typography

- Font: Assistant (Google Fonts, weights 300-700)
- Headings: `clamp()` for responsive sizing (e.g., `clamp(1.75rem, 5vw, 2.5rem)` for h1)
- Body: `clamp(0.875rem, 2vw, 1rem)`, line-height 1.6
- RTL support: Use `text-align: right` and `direction: rtl` for Hebrew text

### Animations

- Fast (0.2s): Immediate interactions (button press)
- Standard (0.3s): Most hover effects
- Slow (0.5s): State changes (menu open/close)
- Hover scale: `scale(1.02)`, active press: `scale(0.98)`

## RTL (Hebrew) Specifics

- **All user-facing text is in Hebrew**: UI labels, error messages, emails, PDFs
- **CSS**: Use logical properties where possible (`padding-inline`, `margin-block`)
- **Flex/Grid**: Use `start`/`end` instead of `left`/`right`
- **PDF**: `@react-pdf/renderer` configured with RTL support in `features/wealth-code/pdf/`
- **Email**: HTML templates use `dir="rtl"` and inline styles (for email client compatibility)

## Accessibility & RTL Checklist

- **Contrast** meets WCAG AA in light and dark modes.
- **Focus visible** on all interactive elements; do not hide outlines.
- **Keyboard navigation**: Tab order logical; Escape closes modals/menus.
- **RTL mirroring**: icons/arrows, alignment, and start/end utilities behave correctly.
- **Screen readers**: meaningful labels for inputs/buttons; headings in semantic order.

## Common Patterns

### Adding a New Feature

1. Create `features/<feature-name>/` directory
2. Add subdirectories: `components/`, `data/`, `utils/`, `pdf/`, `email/`, `constants.ts`
3. Define routes in `constants.ts` (e.g., `FEATURE_ROUTES = { ... }`)
4. Create route group in `app/(<group-name>)/` if needed
5. Update `docs/PROJECT_STRUCTURE.md` with new structure
6. Add tests in `tests/e2e/<feature>.spec.ts`

### API Route Pattern

```typescript
// app/api/<endpoint>/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Validate input
    // Process logic
    return NextResponse.json({ ok: true, data: result });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json(
      { ok: false, error: "Error message in Hebrew" },
      { status: 500 }
    );
  }
}
```

### Email/PDF Generation

- **PDF**: Use components from `features/wealth-code/pdf/` as template
- **Email**: HTML + plain text variants in `features/wealth-code/email/templates/`
- **Sending**: Call `/api/send-email` with `{ to, name, attachments: [{ filename, content: base64 }] }`
- **Testing**: Set `MAIL_TEST_MODE=1` to force test email destination

## File Naming Conventions

- **Components**: PascalCase (`WealthCalculator.tsx`)
- **Utils**: camelCase (`calculateWealthCode.ts`)
- **CSS Modules**: `Component.module.css` (co-located with component)
- **Types**: `types.ts` or inline in components (avoid separate `types/` directory unless shared across features)

## Performance & Bundle Hygiene

- Favor **RSC** and **dynamic imports** for heavy client-only widgets; avoid large libs in client components.
- Images: use Next/Image with proper sizes; avoid unbounded SVG filters.
- Fonts: load Assistant via CSS + `display=swap`; subset if needed.
- Keep dependencies tree-shakable; avoid side-effectful imports.
- Measure: run `pnpm build` and check bundle analyzer if added; avoid regressions.

## Documentation Maintenance

- **Source of Truth**: `docs/PROJECT_STRUCTURE.md` for file organization
- **Update on changes**: Any architectural change MUST update relevant docs in `docs/`
- **Commit messages**: Hebrew preferred, conventional commits format (`feat:`, `fix:`, `docs:`)
- **Doc files**: Hebrew documentation with English code snippets

## Prompt Writing Policy (for Ksenia)

- When the user requests a **Copilot prompt**, output **instructions-only** by default: no file paths, no explicit filenames, no long code blocks, and no hardwired routes. The agent should translate intent into safe actions.
- Keep prompts tool-guiding and reversible. If file edits are required, propose a plan and show a minimal diff.

## Release & Deployments (Vercel)

- Flow: feature → `develop` → preview deploy → QA checklist (contrast, RTL, calculator flow, email/PDF) → merge to `main` for production.
- Env vars managed in Vercel (Preview vs Production). Never hardcode secrets.
- Tag releases when merging to `main` (`vX.Y.Z`) with a concise Hebrew changelog.

## Do / Don't Quicklist

**Do**: use tokens, preserve RTL & a11y, propose plan+diff, keep PRs small, Hebrew commits, add tests where relevant.
**Don't**: inline colors/shadows, remove focus styles, break server/client boundaries, introduce glassmorphism without explicit approval, rename public APIs.

## Security Checklist

- ⚠️ Never commit `.env.local` or expose API keys
- ⚠️ Use Gmail App Password (not account password) for SMTP
- ⚠️ Validate webhook secrets in `/api/webhooks/*` routes
- ⚠️ Sanitize user input before PDF/email generation
- ⚠️ Store secrets in Vercel Environment Variables for production

## Key Files Reference

- **Architecture**: `docs/ARCHITECTURE.md`
- **Development**: `docs/DEVELOPMENT.md`
- **Git workflow**: `docs/BRANCHING.md`
- **Design system**: `docs/DESIGN-SYSTEM.md`
- **Email/PDF**: `docs/guides/EMAIL-PDF-README.md`
- **Project structure**: `docs/PROJECT_STRUCTURE.md` (master reference)

## When Creating PRs

_אם את עובדת לבד — סעיף זה אופציונלי. ראו "Solo Mode (No PRs)"._

1. Branch from `develop` (never from `main`)
2. Name: `feature/descriptive-name` or `bugfix/issue-description`
3. Checklist: lint passes, build succeeds, tests pass, mobile tested
4. Description: Hebrew summary of changes, link to related issues
5. Request review before merging to `develop`

## Monitoring & Observability

- **Sentry**: Configured in `sentry.{client,server,edge}.config.ts` + `instrumentation.ts`
- **Global error boundary**: `app/global-error.tsx` (client component)
- **Sample rates**: 1.0 in dev, 0.1 in production (configurable via env vars)
- **Source maps**: Auto-uploaded in production builds (requires `SENTRY_AUTH_TOKEN` in Vercel)

---

**Last Updated**: October 16, 2025
**Maintained by**: Awakening by Ksenia Team

# GitHub Copilot Instructions – ABYK (Awakening by Ksenia)

**Last Updated**: October 16, 2025  
**Owner**: Ksenia (Solo mode)

## Project Overview

Next.js 15 + React 19 app with TypeScript, TailwindCSS, and a design‑tokens layer (CSS variables). Hebrew‑first (RTL). Class‑based theming (`dark`). Accessibility and RTL are mandatory across all features (Calculator, PDF, Email).

## Agent Operating Rules (CRITICAL)

- **Apply changes directly.** לאחר היישום – כתבי _סיכום קצר בעברית_ (1–2 משפטים) מה השתנה ואיפה. השאירי שינויים מינימליים ורוורסיביליים. **הציגי diff רק אם השינוי מסוכן** (שינויי שמות גורפים/מחיקות רבות/מיגרציות).
- כאשר המשתמשת כותבת "בצעי"/"תבצע" – **הניחי אישור** והשתמשי בברירות מחדל בטוחות. הימנעי משאלות מיותרות.
- **Hebrew-first**: תגובות ותיעוד בעברית (קוד באנגלית). לשמור על RTL.
- **אין hard-coded colors/shadows.** להשתמש רק בטוקנים וב־Tailwind Utilities.
- **נגישות חובה**: קונטרסט AA, פוקוס נראה, ניווט מקלדת. לא להסתיר פוקוס.
- אם חסר טוקן, **להציע alias** במקום hex/rgba.
- קומיטים קטנים וברורים בפורמט Conventional Commits (בעברית): `feat:`, `fix:`, `docs:`, `style:`, `refactor:`.

## Solo Mode (No PRs)

- עבודה אישית ללא צוות. ענף: `main`.
- לפני שינוי גדול: נקודת שחזור קלה: `git tag -a backup-YYYYMMDD -m "pre-change" && git push --tags`.
- בלי diff: מיישמים מיד, ואז סיכום קצר בעברית. אם שינוי מסוכן – בקשת אישור קצרה + _רשימת קבצים_ (לא diff מפורט).

## Critical Architecture Patterns

- **App Router** עם קבוצות מסלולים (route groups) לפי תחום.
- **ברירת מחדל RSC** (Server Components); `"use client"` רק כשצריך אינטראקטיביות.
- **Feature-first**: לכל פיצ׳ר מבנה עצמי (components, utils, pdf, email).
- **זרימת נתונים (מחשבון → אימייל → PDF)** מאובטחת; Webhooks מאומתים.

## Development Workflow

- התקנה/פיתוח: `pnpm install` → `pnpm dev`
- בדיקות מהירות: `pnpm lint`, `pnpm build`, (אופציונלי) `pnpm run test:e2e:smoke`
- משתני סביבה ב־`.env*` (לעולם לא בקוד). הפניות באמצעות helpers.

## Design System (Neumorphic‑friendly)

### Tailwind + Tokens (Required)

- להשתמש ב־`container` מרכזי וב־breakpoints כולל `xs: 380px`.
- אנימציות זמינות: `animate-fadein`, `animate-scale-in`, `animate-accordion-down`, `animate-accordion-up`.
- צללים מגובי משתנים: `shadow`, `shadow-md`, `shadow-lg`, `shadow-inner` (ללא box-shadow ידני).
- אליאסים סמאנטיים קיימים: `mutedforeground`, `ringforeground`.
- לפני כתיבת utilities – לחווט טוקנים (צבעים/רדיוס/צל).

## RTL (Hebrew) Specifics

- כל טקסט פונה בעברית; `dir="rtl"` ברירת מחדל.
- להשתמש במונחי `start/end` במקום left/right, והעדפה לפרופרטיז לוגיים (`padding-inline`).
- PDF/Email: RTL מופעל בתבניות.

## Accessibility & RTL Checklist

- קונטרסט AA בשני המצבים (בהיר/כהה).
- טבעות פוקוס נראות (לא להעלים outline).
- ניווט מקלדת תקין; ESC סוגר מודלים/תפריטים.
- RTL mirroring לאייקונים/חצים.
- סדר כותרות סמנטי; תוויות נגישות לטפסים.

## Performance & Bundle Hygiene

- להעדיף RSC + `dynamic import()` לרכיבי לקוח כבדים.
- תמונות: Next/Image עם מידות מדויקות.
- פונטים: Assistant עם `display=swap`, לשקול subset.
- תלותים ניתנים ל־tree‑shaking; להימנע מ־side effects.

## Release & Deployments (Vercel)

- זרימה: feature → preview → QA (קונטרסט/RTL/מחשבון/מייל+PDF) → `main` production.
- Secrets כמשתני סביבה בלבד (Preview/Prod). לתייג גרסאות `vX.Y.Z` עם changelog קצר בעברית.

## Do / Don't Quicklist

**Do**: טוקנים, RTL & a11y, יישום מידי + סיכום בעברית, קומיטים קטנים.  
**Don't**: צבעים/צללים קשיחים, הסתרת פוקוס, שבירת גבולות Server/Client, שינוי שמות ציבוריים בלי אישור.

## Security Checklist

- לא לחשוף `.env*`/מפתחות.
- אימות סודות ב־webhooks.
- סניטציה לנתונים לפני PDF/Email.

## Key Docs

- `docs/ARCHITECTURE.md`, `docs/PROJECT_STRUCTURE.md`, `docs/DESIGN-SYSTEM.md`
