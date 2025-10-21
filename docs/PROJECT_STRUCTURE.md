# מבנה הפרויקט המפורט - ABYK (Awakening by Ksenia)

**עודכן:** אוקטובר 2025  
**מטרה:** מקור אמת יחיד המתאר את כל הקבצים והתיקיות בפרויקט בצורה מדויקת

---

## 🗂 מבנה כללי של הפרויקט

```text
ABYK/
├── 📁 .env*                           # משתני סביבה (לא בקוד)
├── 📁 .github/                        # GitHub Actions ותבניות
├── 📁 .joyride/                       # קונפיגורציות ומסכים של Joyride
├── 📁 .next/                          # קבצי Next.js שנוצרים אוטומטית
├── 📁 .npmrc                          # הגדרות npm
├── 📁 .vercel/                        # קבצי Vercel
├── 📁 .vscode/                        # הגדרות VS Code (launch.json, settings)
├── 📁 node_modules/                   # תלויות מותקנות
├── 📁 playwright-report/              # דוחות בדיקות E2E
├── 📁 test-results/                   # תוצאות בדיקות
├── 📁 app/                            # Next.js App Router - ליבה
├── 📁 assets/                         # נכסים לפיתוח (Flare panels, כלים)
├── 📁 design/                         # מערכת עיצוב מרכזית (טוקנים, themes)
├── 📁 docs/                           # תיעוד מלא
├── 📁 lib/                            # קוד משותף וכלים
├── 📁 prisma/                         # סכמת בסיס נתונים
├── 📁 public/                         # נכסים סטטיים
├── 📁 scripts/                        # סקריפטים עזר (pnpm-tasks)
├── 📁 tests/                          # בדיקות אוטומטיות
├── 📄 .env.example                    # דוגמה למשתני סביבה
├── 📄 .env.local                      # משתני סביבה מקומיים
├── 📄 .gitignore                      # קבצים להתעלמות ב-git
├── 📄 CHANGELOG.md                    # יומן שינויים
├── 📄 CONTRIBUTING.md                 # הנחיות תרומה
├── 📄 eslint.config.mjs               # הגדרות ESLint
├── 📄 instrumentation-client.ts       # אינסטרומנטציה לקליינט
├── 📄 instrumentation.ts              # אינסטרומנטציה לשרת
├── 📄 next-env.d.ts                   # הגדרות TypeScript ל-Next.js
├── 📄 next.config.js                  # קונפיגורציית Next.js
├── 📄 OWNER-GUIDE.md                  # מדריך לבעלים
├── 📄 package.json                    # הגדרות הפרויקט ותלויות
├── 📄 playwright.config.ts            # קונפיגורציית Playwright
├── 📄 pnpm-lock.yaml                  # נעילת גרסאות תלויות
├── 📄 postcss.config.mjs              # קונפיגורציית PostCSS
├── 📄 README.md                       # קובץ README ראשי
├── 📄 sentry.edge.config.ts           # קונפיגורציית Sentry ל-Edge
├── 📄 sentry.server.config.ts         # קונפיגורציית Sentry לשרת
├── 📄 tailwind.config.ts              # קונפיגורציית Tailwind CSS
├── 📄 tsconfig.json                   # קונפיגורציית TypeScript
├── 📄 tsconfig.tsbuildinfo            # מידע בנייה של TypeScript
├── 📄 types.d.ts                      # הגדרות טיפוסים גלובליות
└── 📄 vercel.json                     # קונפיגורציית Vercel
```

---

## 📁 app/ - Next.js App Router (ליבה)

תיקיית ה-app מכילה את כל ממשק המשתמש ואת ה-API routes של Next.js 15.

**מטרה**: UI ראשי, API routes, layouts וקומפוננטות  
**טכנולוגיה**: Next.js 15 App Router, React 19, TypeScript  
**חלוקה**: Route Groups לפי תחומים (funnels, legal)

```text
app/
├── 📁 (funnels)/                      # Route group לזרימת המרה
│   ├── 📁 _components/                # קומפוננטות פרטיות
│   │   ├── 📁 wealth-code/            # קומפוננטות מחשבון עושר
│   │   │   ├── 📁 sections/           # סקשנים עיקריים
│   │   │   │   ├── 📁 ui/
│   │   │   │   │   └── 📄 tabs.tsx    # Tabs לפרשנויות
│   │   │   │   │       └── תפקיד: ניווט בין פרשנויות שונות
│   │   │   │   ├── 📄 BirthdatePicker.tsx  # בחירת תאריך לידה
│   │   │   │   │   └── תפקיד: אינטרפייס לבחירת יום/חודש/שנה
│   │   │   │   │   └── תלויות: React state, design/themes/wealth-code/birthdate-picker.css
│   │   │   │   ├── 📄 Calculator.tsx  # מחשבון ראשי
│   │   │   │   │   └── תפקיד: לוגיקת חישוב ותצוגת UI
│   │   │   │   │   └── תלויות: lib/domain/wealth-code/utils/algorithm
│   │   │   │   ├── 📄 index.ts        # ייצוא מרכזי
│   │   │   │   ├── 📄 Interpretations.tsx  # פרשנויות
│   │   │   │   │   └── תפקיד: תצוגת פרשנויות מפורטות
│   │   │   │   │   └── תלויות: lib/domain/wealth-code/data
│   │   │   │   ├── 📄 Result.tsx      # דף תוצאות
│   │   │   │   │   └── תפקיד: הצגת תוצאת חישוב מלאה
│   │   │   │   ├── 📄 SalesPage.tsx   # דף מכירה
│   │   │   │   │   └── תפקיד: CTA ורכישת דוח מלא
│   │   │   │   └── 📄 ThankYou.tsx    # דף תודה
│   │   │   │       └── תפקיד: אישור רכישה והנחיות המשך
│   │   │   ├── 📁 shared/             # קומפוננטות משותפות
│   │   │   │   ├── 📄 CodeInset.tsx   # כרטיס תצוגת קוד
│   │   │   │   │   └── תפקיד: הצגה מרכזית של קוד העושר
│   │   │   │   ├── 📄 index.ts
│   │   │   │   └── 📄 NeuroCard.tsx   # כרטיס נאומורפי
│   │   │   │       └── תפקיד: wrapper עם אפקט נאומורפי
│   │   │   ├── 📁 ui/
│   │   │   │   └── 📄 tabs.tsx        # (כפול, ראה sections/ui)
│   │   │   └── 📄 index.ts
│   │   └── 📄 FunnelPage.tsx          # template לדפי funnel
│   │       └── תפקיד: layout משותף לכל דפי ההמרה
│   ├── 📁 calculator/                 # מסלול /calculator
│   │   ├── 📄 CalculatorPageClient.tsx  # Client Component
│   │   │   └── תפקיד: state management וinteractivity
│   │   └── 📄 page.tsx                # Server Component
│   │       └── תפקיד: metadata וטעינת CalculatorPageClient
│   ├── 📁 interpretations/            # מסלול /interpretations
│   │   ├── 📄 InterpretationsPageClient.tsx
│   │   │   └── תפקיד: תצוגה אינטראקטיבית של פרשנויות
│   │   └── 📄 page.tsx
│   │       └── תפקיד: metadata, SSR של פרשנויות
│   ├── 📁 login/                      # מסלול /login
│   │   ├── 📄 LoginForm.module.css    # סגנונות טופס (legacy)
│   │   ├── 📄 LoginForm.tsx           # טופס התחברות
│   │   │   └── תפקיד: form עם validation
│   │   │   └── תלויות: NextAuth, lib/domain/auth
│   │   ├── 📄 LoginPage.module.css    # סגנונות דף (legacy)
│   │   └── 📄 page.tsx
│   │       └── תפקיד: דף התחברות עם metadata
│   ├── 📁 result/                     # מסלול /result
│   │   ├── 📄 page.tsx
│   │   │   └── תפקיד: metadata, SSR של תוצאות
│   │   └── 📄 ResultPageClient.tsx
│   │       └── תפקיד: תצוגה דינמית של תוצאות + שיתוף
│   ├── 📁 sales/                      # מסלול /sales
│   │   ├── 📄 page.tsx
│   │   │   └── תפקיד: metadata לדף מכירה
│   │   └── 📄 SalesPageClient.tsx
│   │       └── תפקיד: CTA, פרטי מוצר, כפתור תשלום
│   ├── 📁 thank-you/                  # מסלול /thank-you
│   │   ├── 📄 page.tsx
│   │   │   └── תפקיד: metadata לדף תודה
│   │   └── 📄 ThankYouPageClient.tsx
│   │       └── תפקיד: הודעת הצלחה, קישור להורדה
│   ├── 📄 layout.tsx                  # Layout משותף לfunnels
│   │   └── תפקיד: מבנה משותף עם Header, SideMenu
│   └── 📄 README.md                   # תיעוד funnels
├── 📁 (legal)/                        # Route group לדפים משפטיים
│   ├── 📁 privacy/                    # מסלול /privacy
│   │   └── 📄 page.tsx                # מדיניות פרטיות
│   │       └── תפקיד: טקסט משפטי, metadata
│   ├── 📁 terms/                      # מסלול /terms
│   │   └── 📄 page.tsx                # תנאי שימוש
│   │       └── תפקיד: טקסט משפטי, metadata
│   └── 📄 README.md                   # תיעוד legal
├── 📁 api/                            # API Routes
│   ├── 📁 auth/                       # אימות (NextAuth)
│   │   ├── 📁 [...nextauth]/
│   │   │   └── 📄 route.ts            # NextAuth handler
│   │   │       └── תפקיד: login/logout/session
│   │   │       └── תלויות: lib/domain/auth/options
│   │   └── 📁 register/
│   │       └── 📄 route.ts            # הרשמת משתמש
│   │           └── תפקיד: POST /api/auth/register
│   │           └── תלויות: Prisma (עתידי)
│   ├── 📁 generate-pdf/
│   │   └── 📄 route.ts                # יצירת PDF
│   │       └── תפקיד: POST - מייצר PDF מתוצאות
│   │       └── תלויות: @react-pdf/renderer, lib/domain/wealth-code/pdf
│   ├── 📁 send-email/
│   │   └── 📄 route.ts                # שליחת מייל
│   │       └── תפקיד: POST - שולח PDF במייל
│   │       └── תלויות: Resend/Nodemailer, lib/services/email
│   └── 📁 webhooks/
│       └── 📁 grow/
│           └── 📄 route.ts            # Webhook תשלומים
│               └── תפקיד: מקבל אישור תשלום מGrow
│               └── תלויות: lib/security.config (סוד webhook)
├── 📁 components/                     # קומפוננטות גלובליות
│   ├── 📁 analytics/
│   │   └── 📄 TikTokPixel.tsx         # TikTok Pixel tracking
│   │       └── תפקיד: Script tag לTikTok analytics
│   ├── 📁 layout/                     # קומפוננטות layout
│   │   ├── 📄 AppShell.tsx            # מעטפת אפליקציה
│   │   │   └── תפקיד: root wrapper עם providers
│   │   ├── 📄 CookieConsent.tsx       # באנר Cookies
│   │   │   └── תפקיד: הסכמה לcookies, שמירה בlocalStorage
│   │   ├── 📄 drawerConstants.ts      # קבועים למגירה
│   │   ├── 📄 DrawerProvider.tsx      # ניהול מצב מגירה
│   │   │   └── תפקיד: Context למצב SideMenu
│   │   ├── 📄 Footer.module.css       # סגנונות Footer (legacy)
│   │   ├── 📄 Footer.tsx              # כותרת תחתונה
│   │   │   └── תפקיד: קישורים, זכויות יוצרים
│   │   ├── 📄 Header.module.css       # סגנונות Header (legacy)
│   │   ├── 📄 Header.tsx              # כותרת עליונה
│   │   │   └── תפקיד: לוגו, כפתור תפריט, ThemeToggle
│   │   ├── ~~📄 HeaderBar.module.css~~ # נמחק; הסגנונות ב-`design/themes/layout-header.css`
│   │   ├── 📄 HeaderBar.tsx           # פס עליון
│   │   │   └── תפקיד: wrapper לHeader
│   │   ├── 📄 index.ts                # ייצוא מרכזי
│   │   ├── 📄 PageLayout.tsx          # Layout דף כללי
│   │   │   └── תפקיד: Header + children + Footer
│   │   ├── 📄 PageShell.tsx           # מעטפת דף
│   │   │   └── תפקיד: container עם padding ו-max-width
│   │   ├── 📄 SideMenu.tsx            # תפריט צד
│   │   │   └── תפקיד: ניווט ראשי, זהה בכל הדפים
│   │   │   └── תלויות: design/themes/side-menu.css
│   │   ├── 📄 SocialIcons.tsx         # אייקוני רשתות חברתיות
│   │   ├── 📄 SocialLinks.tsx         # קישורים לרשתות
│   │   ├── 📄 StandardPageLayout.tsx  # Layout דפי תוכן
│   │   │   └── תפקיד: Layout לדפים משפטיים
│   │   └── 📄 useThemePreference.ts   # Hook לעיצוב
│   │       └── תפקיד: ניהול בהיר/כהה, localStorage
│   ├── 📁 lib/
│   │   └── 📄 neomorphism-styles.ts   # Utility לסגנונות
│   │       └── תפקיד: helper functions לנאומורפיזם
│   ├── 📁 neu/                        # קומפוננטות נאומורפיות
│   │   ├── 📄 Button.tsx              # כפתור נאומורפי
│   │   │   └── תפקיד: כפתור עם variants (primary/secondary)
│   │   ├── 📄 Card.tsx                # כרטיס נאומורפי
│   │   │   └── תפקיד: wrapper עם צללים
│   │   ├── 📄 IconButton.tsx          # כפתור אייקון
│   │   │   └── תפקיד: כפתור עגול עם אייקון
│   │   ├── 📄 index.ts
│   │   └── 📄 README.md               # תיעוד neu components
│   ├── 📁 providers/                  # React Providers
│   │   ├── 📄 AuthProvider.tsx        # Provider לאימות
│   │   │   └── תפקיד: SessionProvider מNextAuth
│   │   ├── 📄 index.ts
│   │   └── 📄 NavigationProvider.tsx  # Provider לניווט
│   │       └── תפקיד: Context למצב ניווט
│   ├── 📁 sections/                   # סקשנים משותפים
│   │   ├── 📄 DesignShowcase.tsx      # תצוגת עיצוב
│   │   │   └── תפקיד: דוגמאות לעיצוב (dev only)
│   │   ├── 📄 index.ts
│   │   └── 📄 TermsPrivacy.tsx        # סקשן תנאים ופרטיות
│   │       └── תפקיד: קישורים לדפים משפטיים
│   └── 📁 shared/                     # קומפוננטות משותפות
│       ├── 📁 ui/                     # קומפוננטות UI בסיסיות
│       │   ├── 📄 Card.tsx            # כרטיס בסיסי
│       │   ├── 📄 Field.tsx           # שדה טופס
│       │   ├── 📄 index.ts
│       │   ├── 📄 Input.tsx           # Input בסיסי
│       │   └── 📄 Stack.tsx           # Layout container
│       ├── 📄 icons.tsx               # אייקונים SVG
│       ├── 📄 index.ts
│       ├── 📄 MenuTrigger.tsx         # כפתור פתיחת תפריט
│       ├── 📄 NeuButton.tsx           # כפתור נאומורפי (alt)
│       ├── 📄 README.md
│       └── 📄 ThemeToggle.tsx         # מתג בהיר/כהה
│           └── תפקיד: כפתור החלפת theme
├── 📄 fonts.ts                        # הגדרת פונטים
│   └── תפקיד: טעינת Assistant מGoogle Fonts
├── 📄 global-error.tsx                # Error boundary גלובלי
│   └── תפקיד: תפיסת שגיאות ב-production
│   └── תלויות: Sentry (אופציונלי)
├── 📄 globals.css                     # CSS גלובלי
│   └── תפקיד: Tailwind directives + design/index.css
│   └── תלויות: design/, Tailwind CSS
├── 📄 HomePageClient.tsx              # דף הבית Client
│   └── תפקיד: אינטראקטיביות דף הבית
├── 📄 layout.tsx                      # Root Layout
│   └── תפקיד: HTML wrapper, metadata, providers
│   └── תלויות: fonts, AuthProvider, ThemeProvider
├── 📄 not-found.tsx                   # דף 404
│   └── תפקיד: תצוגה מותאמת לדפים לא נמצאו
├── ~~📄 page.module.css~~             # נמחק (2025-10-21) – הסגנונות ב-`design/themes/pages/home.css`
├── 📄 page.tsx                        # דף הבית ראשי
│   └── תפקיד: נקודת כניסה (/), metadata
│   └── תלויות: HomePageClient
├── 📄 reset.css                       # CSS reset
│   └── תפקיד: איפוס סגנונות ברירת מחדל
└── ~~📄 tokens.css~~                  # נמחק; טוקנים מנוהלים ב-`design/tokens/*`
    └── סטטוס: deprecated, הוחלף ב-design/tokens/
```

---

## 📁 .joyride/ - Joyride Development Tools

תיקיית .joyride מכילה קונפיגורציות וסקריפטים לפיתוח עם Joyride Extension.

**מטרה**: כלי פיתוח ודיבוג בתוך VS Code
**טכנולוגיה**: ClojureScript, Joyride Extension
**שימוש**: סקריפטים להפעלת פאנלים, תצוגות חיות, אוטומציה

```text
.joyride/
├── 📄 keybindings.json                # קיצורי מקלדת לסקריפטים
│   └── תפקיד: מפה קיצורי מקלדת (cmd+option+j) לסקריפטים ספציפיים
│   └── תלויות: Joyride Extension
└── 📁 scripts/
    ├── 📄 flare.cljs                  # פאנל Flare Dev בסיסי
    │   └── תפקיד: פותח webview פאנל לדיבוג ולוגים
    │   └── קיצור: cmd+option+j f
    │   └── תלויות: joyride.core, joyride.flare
    ├── 📄 git_changes_flare.cljs      # פאנל שינויי Git
    │   └── תפקיד: מציג שינויים בגרסה הנוכחית
    │   └── קיצור: cmd+option+j g
    ├── 📄 live_preview_flare.cljs     # תצוגה חיה של האפליקציה
    │   └── תפקיד: פותח localhost:3000 בתוך VS Code
    │   └── קיצור: cmd+option+j l
    │   └── תלויות: vscode API
    ├── 📄 pnpm_tasks.cljs             # רשימת משימות pnpm
    │   └── תפקיד: מאפשר בחירה והרצה של סקריפטים מ-package.json
    │   └── קיצור: cmd+option+j p
    └── 📄 sidebar_status_flare.cljs   # סטטוס פרויקט
        └── תפקיד: מציג מידע על הפרויקט (git, npm, errors)
        └── קיצור: cmd+option+j s
```

---

## 📁 assets/ - Development Assets

תיקיית assets מכילה נכסים לפיתוח שאינם חלק מה-build הסופי.

**מטרה**: כלי עזר ופאנלים לפיתוח
**שימוש**: נטען רק בסביבת פיתוח

```text
assets/
└── 📁 flare-dev/
    └── 📄 panel.html                  # HTML panel לדיבוג
        └── תפקיד: webview עם לוג להודעות ואירועים
        └── תלויות: VS Code Webview API (acquireVsCodeApi)
        └── משתמש: flare.cljs
```

---

## 📁 scripts/ - Build & Automation Scripts

תיקיית scripts מכילה סקריפטים עזר לבנייה ואוטומציה.

```text
scripts/
└── 📄 pnpm-tasks.sh                   # סקריפט Shell לניהול משימות
    └── תפקיד: אוטומציה של פקודות pnpm נפוצות
    └── שימוש: ./scripts/pnpm-tasks.sh <task-name>
```

---

## 📁 .vscode/ - VS Code Configuration

תיקיית .vscode מכילה הגדרות ספציפיות ל-VS Code.

```text
.vscode/
├── 📄 launch.json                     # קונפיגורציית דיבוג
│   └── תפקיד: הגדרות להפעלת Edge DevTools
│   └── תצורות:
│       - "Attach to Microsoft Edge": חיבור לדפדפן קיים
│       - "Launch Edge Headless": הפעלה ללא UI
│       - "Launch Edge and attach DevTools": הפעלה מלאה
│   └── פורט: localhost:3000 (Next.js dev server)
│   └── תלויות: Microsoft Edge DevTools Extension
└── 📄 settings.json                   # הגדרות workspace (אם קיים)
```

---

## 📁 design/ - מערכת עיצוב מרכזית

תיקיית design מכילה את כל מערכת העיצוב המאוחדת עם טוקנים, עיצובים וכלי עזר.

**מטרה**: מקור אמת יחיד למערכת העיצוב כולה
**ארגון**: לפי סוג (tokens, themes, utils) עם נקודת כניסה מאוחדת
**שימוש**: מיובא ל-globals.css כמערכת עיצוב מלאה
**תלויות**: CSS Variables, Tailwind CSS

```text
design/
├── � index.css                       # נקודת כניסה מרכזית
│   └── תפקיד: מייבא את כל המערכת (tokens + themes + utils)
│   └── משתמש: app/globals.css
│   └── תלויות: tokens/*, themes/*, utils/*
├── �📁 tokens/                         # טוקני עיצוב בסיסיים
│   ├── 📄 tokens.css                  # צבעים, מרחקים, רדיוסים
│   │   └── תפקיד: CSS Variables לכל הטוקנים הבסיסיים
│   │   └── דוגמה: --neu-base, --neu-card, --spacing-unit
│   ├── 📄 animations.css              # אנימציות מוגדרות מראש
│   │   └── תפקיד: @keyframes ו-animation classes
│   │   └── דוגמה: fadein, scale-in, accordion-down
│   ├── 📄 shadows.css                 # צללים נאומורפיים
│   │   └── תפקיד: משתני צל לכל המצבים
│   │   └── דוגמה: --neu-shadow-light, --neu-shadow-dark
│   └── 📄 typography.css              # פונטים וגדלים
│       └── תפקיד: משפחות פונט, משקלים, גדלים
│       └── דוגמה: --font-assistant, clamp() לגדלים רספונסיביים
├── 📁 themes/                         # עיצובים ספציפיים
│   ├── 📄 light.css                   # מצב בהיר
│   │   └── תפקיד: CSS Variables למצב בהיר
│   ├── 📄 dark.css                    # מצב כהה
│   │   └── תפקיד: CSS Variables למצב כהה (data-theme="dark")
│   ├── 📄 neumorphic.css              # עיצוב נאומורפי בסיסי
│   │   └── תפקיד: סגנונות נאומורפיים גלובליים
│   ├── 📄 cookie-consent.css          # באנר Cookies
│   │   └── תפקיד: סגנונות לקומפוננטת CookieConsent
│   ├── 📄 side-menu.css               # תפריט צד
│   │   └── תפקיד: סגנונות SideMenu (זהה בכל הדפים)
│   ├── 📄 layout-header.css           # כותרת עליונה
│   │   └── תפקיד: Header ו-HeaderBar styles
│   ├── 📄 layout-shell.css            # מעטפת דף
│   │   └── תפקיד: PageShell container styles
│   ├── 📄 layout-standard-page.css    # דף תוכן סטנדרטי
│   │   └── תפקיד: StandardPageLayout (legal, docs)
│   ├── 📁 auth/                       # עיצובי אימות
│   │   └── 📄 login-page.css          # דף התחברות
│   │       └── תפקיד: סגנונות ספציפיים לטופס התחברות
│   │       └── משתמש: app/(funnels)/login/
│   ├── 📁 components/                 # קומפוננטות UI
│   │   ├── 📄 button.css              # כפתורים
│   │   │   └── תפקיד: .btn-primary, .btn-secondary, .btn-link
│   │   │   └── משתמש: כל הכפתורים באפליקציה
│   │   └── 📄 icon-button.css         # כפתורי אייקון
│   │       └── תפקיד: כפתורים עגולים עם אייקון בלבד
│   │       └── משתמש: ThemeToggle, MenuTrigger
│   ├── 📁 pages/                      # דפים ספציפיים
│   │   └── 📄 home.css                # דף הבית
│   │       └── תפקיד: סגנונות ייחודיים לדף הבית
│   │       └── משתמש: app/page.tsx, HomePageClient
│   ├── 📁 sections/                   # סקשנים משותפים
│   │   └── 📄 terms-privacy.css       # תנאי שימוש ופרטיות
│   │       └── תפקיד: עיצוב לדפים משפטיים
│   │       └── משתמש: TermsPrivacy component
│   └── 📁 wealth-code/                # פיצ'ר Wealth Code
│       ├── 📄 birthdate-picker.css    # בחירת תאריך לידה
│       │   └── תפקיד: עיצוב אינטראקטיבי לבחירת תאריך
│       │   └── משתמש: BirthdatePicker component
│       ├── 📄 calculator.css          # מחשבון ראשי
│       │   └── תפקיד: עיצוב דף המחשבון וכפתורי פעולה
│       │   └── משתמש: Calculator component
│       ├── 📄 code-inset.css          # תצוגת קוד עושר
│       │   └── תפקיד: כרטיס מרכזי להצגת הקוד
│       │   └── משתמש: CodeInset component
│       ├── 📄 interpretations.css     # פרשנויות
│       │   └── תפקיד: עיצוב tabs ופרשנויות
│       │   └── משתמש: Interpretations component
│       ├── 📄 result.css              # דף תוצאות
│       │   └── תפקיד: עיצוב דף התוצאות המלא
│       │   └── משתמש: Result component
│       ├── 📄 sales.css               # דף מכירה
│       │   └── תפקיד: עיצוב CTA ודף המכירה
│       │   └── משתמש: SalesPage component
│       └── 📄 thank-you.css           # דף תודה
│           └── תפקיד: עיצוב דף אישור רכישה
│           └── משתמש: ThankYou component
└── 📁 utils/                          # כלי עזר CSS
    ├── 📄 helpers.css                 # utility classes
    │   └── תפקיד: מחלקות עזר (.sr-only, .truncate)
    └── 📄 transitions.css             # מעברים חלקים
        └── תפקיד: transition presets לאינטראקציות
```

---

## 📁 lib/ - קוד משותף וכלים

תיקיית lib מרכזת דומיינים עסקיים, שירותים, קונפיגורציות ורכיבי עזר משותפים.

**מטרה**: קוד עסקי משותף, שירותים, הגדרות  
**ארגון**: לפי שכבות (domain, services, utils)  
**תלויות**: TypeScript, Zod, Prisma Client

```text
lib/
├── 📁 domain/                         # לוגיקה עסקית לפי תחום
│   ├── 📁 auth/                       # אימות
│   │   ├── 📄 index.ts                # ייצוא מרכזי
│   │   └── 📄 options.ts              # NextAuth options
│   │       └── תפקיד: קונפיגורציית NextAuth, providers
│   │       └── תלויות: next-auth, Prisma (עתידי)
│   └── 📁 wealth-code/                # תחום מחשבון עושר
│       ├── 📁 data/                   # נתונים סטטיים
│       │   ├── 📄 codeStructures.ts   # מבני קודים
│       │   │   └── תפקיד: מיפוי קודים למשמעויות
│       │   ├── 📄 dailyApplication.ts # יישום יומי
│       │   │   └── תפקיד: המלצות לשימוש יומי
│       │   ├── 📄 digitInterpretations.ts  # פרשנויות ספרות
│       │   │   └── תפקיד: משמעות כל ספרה (0-9)
│       │   └── 📄 index.ts            # ייצוא data
│       ├── 📁 email/                  # תבניות מייל
│       │   ├── 📄 index.ts            # ייצוא email
│       │   ├── 📄 template.ts         # תבנית HTML
│       │   │   └── תפקיד: HTML template למייל עם RTL
│       │   └── 📄 WealthEmail.ts      # מייל דוח עושר
│       │       └── תפקיד: יצירת מייל עם PDF מצורף
│       │       └── תלויות: template, lib/services/email
│       ├── 📁 pdf/                    # יצירת PDF
│       │   ├── 📄 generate.ts         # פונקציית יצירה
│       │   │   └── תפקיד: מייצר PDF מתוצאות
│       │   │   └── תלויות: @react-pdf/renderer, WealthReport
│       │   ├── 📄 index.ts            # ייצוא pdf
│       │   └── 📄 WealthReport.tsx    # קומפוננט PDF
│       │       └── תפקיד: React component ל-PDF (RTL)
│       │       └── תלויות: @react-pdf/renderer, Assistant font
│       ├── 📁 utils/                  # כלי עזר נומרולוגיה
│       │   ├── 📄 algorithm.ts        # אלגוריתם חישוב
│       │   │   └── תפקיד: חישוב קוד עושר מתאריך לידה
│       │   │   └── תלויות: numerology
│       │   ├── 📄 email.ts            # כלי email
│       │   │   └── תפקיד: validation וformatting
│       │   ├── 📄 index.ts            # ייצוא utils
│       │   ├── 📄 numerology.ts       # פונקציות נומרולוגיה
│       │   │   └── תפקיד: חישובי נומרולוגיה בסיסיים
│       │   └── 📄 share.ts            # שיתוף חברתי
│       │       └── תפקיד: URLs לשיתוף (WhatsApp, Facebook, etc)
│       ├── 📄 constants.ts            # קבועים
│       │   └── תפקיד: FEATURE_ROUTES, מחרוזות קבועות
│       └── 📄 index.ts                # ייצוא wealth-code
├── 📁 generated/                      # קוד שנוצר אוטומטית
│   └── 📁 prisma/                     # Prisma Client
│       ├── 📁 runtime/                # Prisma runtime
│       │   ├── 📄 edge-esm.js         # Edge runtime ESM
│       │   ├── 📄 edge.js             # Edge runtime
│       │   ├── 📄 index-browser.d.ts  # טיפוסים לדפדפן
│       │   ├── 📄 index-browser.js    # Browser bundle
│       │   ├── 📄 library.d.ts        # טיפוסים ל-library
│       │   ├── 📄 library.js          # Core library
│       │   ├── 📄 react-native.js     # React Native runtime
│       │   ├── 📄 wasm-compiler-edge.js  # WASM compiler לEdge
│       │   └── 📄 wasm-engine-edge.js # WASM engine לEdge
│       ├── 📄 client.d.ts             # טיפוסים ל-Prisma Client
│       ├── 📄 client.js               # Prisma Client
│       ├── 📄 default.d.ts            # טיפוסים default
│       ├── 📄 default.js              # Default exports
│       ├── 📄 edge.d.ts               # טיפוסים לEdge
│       ├── 📄 edge.js                 # Edge runtime client
│       ├── 📄 index-browser.js        # Browser entry
│       ├── 📄 index.d.ts              # טיפוסים ראשיים
│       ├── 📄 index.js                # Main entry point
│       ├── 📄 libquery_engine-darwin-arm64.dylib.node  # Native query engine (macOS ARM)
│       ├── 📄 package.json            # Prisma Client package
│       ├── 📄 query_engine_bg.js      # Query engine background
│       ├── 📄 query_engine_bg.wasm    # WASM query engine
│       ├── 📄 schema.prisma           # העתק של schema
│       ├── 📄 wasm-edge-light-loader.mjs  # WASM loader לEdge
│       ├── 📄 wasm-worker-loader.mjs  # WASM worker loader
│       ├── 📄 wasm.d.ts               # טיפוסים WASM
│       └── 📄 wasm.js                 # WASM exports
│           └── תפקיד: כל הקבצים נוצרים אוטומטית ע"י prisma generate
│           └── סטטוס: לא לערוך ידנית
├── 📁 services/                       # שירותים חיצוניים
│   ├── 📁 core/                       # שירותי ליבה
│   │   ├── 📁 email/                  # שירות מייל בסיסי
│   │   │   ├── 📄 BaseEmailTemplate.ts  # תבנית בסיס
│   │   │   │   └── תפקיד: HTML base template עם RTL
│   │   │   ├── 📄 index.ts            # ייצוא email
│   │   │   └── 📄 styles.ts           # Inline styles למייל
│   │   │       └── תפקיד: CSS inline לתמיכה בclient מייל
│   │   ├── 📄 branding.ts             # מיתוג
│   │   │   └── תפקיד: לוגו, צבעים, כתובות
│   │   │   └── תלויות: lib/env (NEXT_PUBLIC_*)
│   │   ├── 📄 index.ts                # ייצוא core
│   │   └── 📄 pdfConfig.ts            # קונפיג PDF
│   │       └── תפקיד: הגדרות @react-pdf/renderer
│   └── 📁 email/                      # שירותי מייל
│       ├── 📄 transport.ts            # Email transport
│       │   └── תפקיד: בחירה בין Resend ו-Nodemailer
│       │   └── תלויות: resend, nodemailer, lib/env
│       └── 📄 wealth.ts               # שליחת מייל wealth
│           └── תפקיד: שולח דוח PDF במייל
│           └── תלויות: transport, lib/domain/wealth-code/email
├── 📁 utils/                          # כלי עזר כלליים
│   ├── 📄 base64.ts                   # Base64 encoding/decoding
│   │   └── תפקיד: המרה ל/מ-base64
│   ├── 📄 cn.ts                       # Class names utility
│   │   └── תפקיד: מיזוג class names (clsx + tailwind-merge)
│   ├── 📄 fetcher.ts                  # HTTP fetcher
│   │   └── תפקיד: wrapper ל-fetch עם error handling
│   ├── 📄 file.ts                     # File utilities
│   │   └── תפקיד: קריאה/כתיבה של קבצים
│   ├── 📄 format.ts                   # Formatting utilities
│   │   └── תפקיד: פורמט תאריכים, מספרים, מחרוזות
│   ├── 📄 index.ts                    # ייצוא utils
│   └── 📄 theme.ts                    # Theme utilities
│       └── תפקיד: ניהול בהיר/כהה, localStorage
├── 📄 constants.ts                    # קבועים גלובליים
│   └── תפקיד: קבועים משותפים לכל האפליקציה
├── 📄 db.ts                           # Prisma Client instance
│   └── תפקיד: singleton של PrismaClient
│   └── תלויות: @prisma/client
├── 📄 env.ts                          # משתני סביבה
│   └── תפקיד: validation ו-typing של env vars
│   └── תלויות: zod
├── 📄 index.ts                        # ייצוא ראשי
│   └── תפקיד: re-export של כל lib/
├── 📄 routes.ts                       # הגדרות נתיבים
│   └── תפקיד: מיפוי routes והפניות
│   └── תלויות: constants
└── 📄 security.config.ts              # קונפיג אבטחה
    └── תפקיד: CSP, headers, CORS, webhook secrets
    └── תלויות: env
```

---

## 📁 docs/ - תיעוד מלא

תיקיית docs מכילה את כל התיעוד של הפרויקט.

**מטרה**: מקור אמת לכל התיעוד  
**ארגון**: לפי נושא עם מדריכים מקצועיים בתת-תיקייה  
**שפה**: עברית עם קטעי קוד באנגלית

```text
docs/
├── 📁 guides/                         # מדריכים ספציפיים
│   ├── 📄 EMAIL-PDF-README.md         # מדריך Email + PDF
│   │   └── תפקיד: הסבר על מערכת Email/PDF, טרבלשוטינג
│   ├── 📄 HOME-SPACING-GUIDE.md       # מדריך spacing דף הבית
│   │   └── תפקיד: כללי מרווחים ודגשים
│   └── 📄 TIKTOK-PIXEL-GUIDE.md       # מדריך TikTok Pixel
│       └── תפקיד: התקנה והגדרה של TikTok analytics
├── 📄 APP_DIRECTORY_GUIDE.md          # מדריך App Directory
│   └── תפקיד: הסבר על מבנה app/ ו-Next.js 15
├── 📄 ARCHITECTURE.md                 # ארכיטקטורה טכנית
│   └── תפקיד: תיאור שכבות, דפוסים, תלויות
├── 📄 BRANCHING.md                    # אסטרטגיית Git
│   └── תפקיד: הסבר על main/develop/feature branches
├── 📄 CALCULATOR-DESIGN-COMPARISON.md # השוואת עיצובים
│   └── תפקיד: לפני/אחרי של עיצוב המחשבון
├── 📄 CALCULATOR-PAGE-DESIGN.md       # עיצוב דף מחשבון
│   └── תפקיד: ספק עיצוב מפורט למחשבון
├── 📄 color-palette-reference.csv     # פלטת צבעים
│   └── תפקיד: טבלה של כל הצבעים בשימוש
├── 📄 component-inventory.csv         # מלאי קומפוננטות
│   └── תפקיד: רשימת כל הקומפוננטות ומיקומן
├── 📄 COOKIE-BANNER-UPDATE.md         # עדכון באנר Cookies
│   └── תפקיד: תיעוד שינויים בCookieConsent
├── 📄 DESIGN-FIX-PROMPTS.md           # Prompts לתיקוני עיצוב
│   └── תפקיד: הנחיות לסוכנים לתיקון עיצוב
├── 📄 DESIGN-SYSTEM-MIGRATION.md      # מיגרציה למערכת עיצוב
│   └── תפקיד: תהליך המעבר ל-design/ tokens
├── 📄 DESIGN-SYSTEM-QUICK-START.md    # התחלה מהירה
│   └── תפקיד: מדריך מהיר למערכת העיצוב
├── 📄 DESIGN-SYSTEM.md                # מערכת עיצוב מלאה
│   └── תפקיד: תיעוד מפורט של design/, טוקנים, themes
├── 📄 DEVELOPMENT.md                  # מדריך פיתוח
│   └── תפקיד: התקנה, הרצה, בדיקות, deployment
├── 📄 HOMEPAGE-BLUEPRINT.md           # תכנית דף הבית
│   └── תפקיד: מפרט עיצוב ותוכן לדף הבית
├── 📄 HOMEPAGE-LAYERS.md              # שכבות דף הבית
│   └── תפקיד: הסבר על מבנה שכבות UI
├── 📄 ISSUE-PLAYBOOK.md               # Playbook לבעיות
│   └── תפקיד: פתרונות לבעיות נפוצות
├── 📄 MIGRATION-PROGRESS.md           # התקדמות מיגרציה
│   └── תפקיד: מעקב אחרי מיגרציית עיצוב
├── 📄 NAVIGATION-REMOVAL.md           # הסרת ניווט legacy
│   └── תפקיד: תיעוד הסרת NavigationButtons
├── 📄 NEUMORPHIC-DESIGN.md            # עיצוב נאומורפי
│   └── תפקיד: עקרונות ודגשים בעיצוב נאומורפי
├── 📄 PROJECT_STRUCTURE.md            # מסמך זה
│   └── תפקיד: מקור אמת למבנה הפרויקט
├── 📄 PROJECT_STRUCTURE_AUTO.md       # מבנה אוטומטי
│   └── תפקיד: מבנה שנוצר אוטומטית (backup)
├── 📄 README.md                       # README תיעוד
│   └── תפקיד: סקירה כללית על docs/
└── 📄 STANDARD-PAGE-LAYOUT-MIGRATION.md  # מיגרציית layout סטנדרטי
    └── תפקיד: תיעוד מעבר ל-StandardPageLayout
```

---

## 📁 public/ - נכסים סטטיים

תיקיית public מכילה קבצים סטטיים הנגישים בדפדפן.

**מטרה**: קבצים הנגישים ב-URL ישיר  
**ארגון**: לפי שימוש (brand, email, fonts, og)  
**גישה**: /public/path → /path בדפדפן

```text
public/
├── 📁 brand/                          # מיתוג ולוגואים
│   ├── 📄 logob-backup.png            # גיבוי לוגו
│   └── 📄 logob.png                   # לוגו ראשי
│       └── תפקיד: לוגו המותג (שקוף/בהיר)
├── 📁 email/                          # נכסים למיילים
│   └── 📄 logob.png                   # לוגו למייל
│       └── תפקיד: לוגו inline במיילים (גודל אופטימלי)
├── 📁 fonts/                          # פונטים
│   └── 📁 Assistant/                  # פונט Assistant
│       ├── 📁 static/                 # משקלים סטטיים
│       │   ├── 📄 Assistant-Bold.ttf        # Bold (700)
│       │   ├── 📄 Assistant-ExtraBold.ttf   # ExtraBold (800)
│       │   ├── 📄 Assistant-ExtraLight.ttf  # ExtraLight (200)
│       │   ├── 📄 Assistant-Light.ttf       # Light (300)
│       │   ├── 📄 Assistant-Medium.ttf      # Medium (500)
│       │   ├── 📄 Assistant-Regular.ttf     # Regular (400)
│       │   └── 📄 Assistant-SemiBold.ttf    # SemiBold (600)
│       │       └── תפקיד: קבצי TTF לכל המשקלים
│       ├── 📄 Assistant-VariableFont_wght.ttf  # Variable font
│       │   └── תפקיד: פונט משתנה (200-800)
│       ├── 📄 OFL.txt                 # רישיון Open Font License
│       └── 📄 README.txt              # מידע על הפונט
├── 📁 og/                             # תמונות Open Graph
│   ├── 📄 share-square.png            # תמונה מרובעת לשיתוף
│   │   └── תפקיד: OG image 1:1 ratio
│   └── 📄 share.png                   # תמונה רחבה לשיתוף
│       └── תפקיד: OG image 1.91:1 ratio (Facebook, LinkedIn)
├── 📄 abyk-icon-1024.png              # אייקון 1024x1024
│   └── תפקיד: High-res icon לPWA
├── 📄 abyk-icon-192.png               # אייקון 192x192
│   └── תפקיד: PWA icon (Android)
├── 📄 abyk-icon-512.png               # אייקון 512x512
│   └── תפקיד: PWA icon (iOS, splash)
├── 📄 ABYKICON.png                    # אייקון כללי
├── 📄 manifest.webmanifest            # PWA manifest
│   └── תפקיד: הגדרות Progressive Web App
│   └── תלויות: abyk-icon-*.png
└── 📄 אייקון.png                      # אייקון בעברית (backup)
```

---

## 📁 tests/ - בדיקות אוטומטיות

תיקיית tests מכילה את כל הבדיקות האוטומטיות.

**מטרה**: בדיקות איכות ותקינות  
**טכנולוגיה**: Playwright לE2E  
**הרצה**: `pnpm test:e2e` או `pnpm test:e2e:smoke`

```text
tests/
└── 📁 e2e/                            # End-to-End tests
    └── 📄 smoke.spec.ts               # בדיקות עשן
        └── תפקיד: בדיקות בסיסיות (דף הבית, ניווט, מחשבון)
        └── תלויות: @playwright/test
        └── קונפיג: playwright.config.ts
```

---

## 📁 prisma/ - בסיס נתונים

תיקיית prisma מכילה הגדרות בסיס הנתונים.

**מטרה**: הגדרת מבנה הנתונים  
**טכנולוגיה**: Prisma ORM  
**סטטוס**: תכנון עתידי, לא מחובר לפרודקשן

```text
prisma/
└── 📄 schema.prisma                   # Prisma schema
    └── תפקיד: הגדרת models, relations, datasource
    └── סטטוס: מוכן לשימוש עתידי
    └── generate: prisma generate → lib/generated/prisma/
```

---

## 📄 קבצי קונפיגורציה (שורש)

### קבצי סביבה

- **`.env.local`** - משתני סביבה מקומיים (לא בקוד)
- **`.env.example`** - דוגמה למשתני סביבה נדרשים

### קבצי בנייה וכלים

- **`package.json`** - הגדרות הפרויקט, תלויות וסקריפטים
- **`pnpm-lock.yaml`** - נעילת גרסאות תלויות
- **`tsconfig.json`** - קונפיגורציית TypeScript
- **`tailwind.config.ts`** - קונפיגורציית Tailwind CSS
- **`eslint.config.mjs`** - הגדרות ESLint
- **`next.config.js`** - קונפיגורציית Next.js
- **`postcss.config.mjs`** - קונפיגורציית PostCSS
- **`playwright.config.ts`** - קונפיגורציית Playwright לבדיקות E2E

### קבצי פריסה ומעקב

- **`vercel.json`** - קונפיגורציית Vercel לפריסה
- **`sentry.*.config.ts`** - קונפיגורציית Sentry למעקב שגיאות
- **`instrumentation*.ts`** - אינסטרומנטציה למעקב

### קבצי תיעוד

- **`README.md`** - קובץ README ראשי
- **`CHANGELOG.md`** - יומן שינויים
- **`CONTRIBUTING.md`** - הנחיות לתרומה
- **`OWNER-GUIDE.md`** - מדריך לבעלים

---

## 🔍 פירוט תפקידים לפי תיקיות מרכזיות

### 🎯 app/ - ממשק המשתמש וה-API

- **מטרה**: ממשק המשתמש הראשי וה-API routes
- **טכנולוגיה**: Next.js 15 App Router, React 19, TypeScript
- **חלוקה**: Route Groups לפי תחומים (funnels, legal)
- **קומפוננטות**: נאומורפיות עם Tailwind CSS וטוקנים

### 🎨 design/ - מערכת עיצוב מרכזית

- **מטרה**: מקור אמת יחיד למערכת העיצוב כולה
- **תוכן**: טוקנים, עיצובים, אנימציות, כלי עזר
- **ארגון**: לפי סוג (tokens, themes, utils) עם נקודת כניסה מאוחדת
- **שימוש**: מיובא ל-globals.css כמערכת עיצוב מלאה

### 🛠 lib/ - קוד משותף

- **מטרה**: קוד עסקי משותף וכלי עזר
- **תוכן**: שירותי מייל, PDF, נומרולוגיה, אימות, אבטחה
- **ארגון**: לפי שכבות (domain, services, utils) ופונקציונליות
- **אבטחה**: קונפיגורציית headers, CSP, CORS מרוכזת

### 📚 docs/ - תיעוד

- **מטרה**: מקור אמת לכל התיעוד
- **תוכן**: מדריכי פיתוח, ארכיטקטורה, עיצוב
- **ארגון**: לפי נושא עם מדריכים מקצועיים בתת-תיקייה

### 🎨 public/ - נכסים סטטיים

- **מטרה**: קבצים הנגישים בדפדפן
- **תוכן**: תמונות, פונטים, אייקונים, manifest
- **ארגון**: לפי שימוש (brand, email, fonts, og)

### 🧪 tests/ - בדיקות

- **מטרה**: בדיקות אוטומטיות לאיכות הקוד
- **טכנולוגיה**: Playwright ל-E2E
- **תוכן**: בדיקות עשן ותרחישים מרכזיים

### 💾 prisma/ - בסיס נתונים

- **מטרה**: הגדרת מבנה הנתונים
- **טכנולוגיה**: Prisma ORM
- **סטטוס**: תכנון עתידי, לא מחובר לפרודקשן

---

## 📋 רשימת קבצים מרכזיים ותפקידיהם

| קובץ/תיקייה                   | תפקיד                               | מיקום          | תלויות                   |
| ----------------------------- | ----------------------------------- | -------------- | ------------------------ |
| `app/layout.tsx`              | Layout ראשי עם Providers            | UI             | React, Next.js           |
| `app/page.tsx`                | דף בית ראשי                         | UI             | HomePageClient           |
| `app/globals.css`             | CSS גלובלי + Tailwind               | Styling        | design/index.css         |
| `design/index.css`            | מערכת עיצוב מאוחדת                  | Styling        | tokens/_, themes/_       |
| `design/tokens/`              | טוקני עיצוב בסיסיים                 | Styling        | CSS Variables            |
| `design/themes/`              | עיצובים לפי מצב (בהיר/כהה/נאומורפי) | Styling        | tokens                   |
| `lib/domain/`                 | לוגיקה עסקית לפי דומיין             | Business Logic | TypeScript               |
| `lib/services/`               | שירותים חיצוניים                    | Business Logic | Nodemailer, Resend       |
| `lib/security.config.ts`      | קונפיגורציית אבטחה                  | Config         | Next.js headers          |
| `lib/constants.ts`            | קבועים גלובליים                     | Config         | -                        |
| `lib/env.ts`                  | משתני סביבה                         | Config         | zod                      |
| `lib/routes.ts`               | הגדרות נתיבים                       | Config         | constants                |
| `app/api/send-email/`         | API לשליחת מיילים                   | API            | lib/services/email       |
| `app/api/generate-pdf/`       | API ליצירת PDF                      | API            | @react-pdf/renderer      |
| `app/api/webhooks/grow/`      | Webhook לתשלומים                    | API            | security.config          |
| `.joyride/scripts/flare.cljs` | פאנל Flare Dev                      | Dev Tools      | joyride.flare            |
| `.joyride/keybindings.json`   | קיצורי Joyride                      | Dev Tools      | Joyride Extension        |
| `.vscode/launch.json`         | קונפיגורציית דיבוג                  | Dev Tools      | Edge DevTools Extension  |
| `assets/flare-dev/panel.html` | HTML panel לדיבוג                   | Dev Tools      | VS Code Webview API      |
| `scripts/pnpm-tasks.sh`       | אוטומציה של משימות                  | Dev Tools      | Shell, pnpm              |
| `docs/PROJECT_STRUCTURE.md`   | מבנה הפרויקט (זה)                   | Docs           | -                        |
| `docs/ARCHITECTURE.md`        | ארכיטקטורה טכנית                    | Docs           | -                        |
| `public/manifest.webmanifest` | PWA configuration                   | Static         | -                        |
| `package.json`                | תלויות וסקריפטים                    | Config         | Node.js, pnpm            |
| `tailwind.config.ts`          | Tailwind configuration              | Config         | design/tokens (imported) |

---

## 🔧 איך לעדכן את המסמך

1. בצע שינוי במבנה התיקיות או בקבצים
2. עדכן את התיאורים הרלוונטיים במסמך זה
3. הוסף קבצים/תיקיות חדשות עם תיאור תפקידם
4. הרץ `pnpm lint` לוודא תקינות Markdown
5. בצע commit עם הודעה: `docs: update project structure`

> המסמך הזה הוא מקור האמת היחיד למבנה הפרויקט

---

## ♻️ דה-פרקציה ועדכוני עיצוב

- `app/components/neu/neumorphic-shadows.css` – מושבת; הוחלף ע"י `design/themes/neumorphic.css` + טוקנים מ-`design/tokens/shadows.css`.
- ~~`app/tokens.css` – מושבת; הטוקנים מרוכזים תחת `design/tokens/*` ומיובאים דרך `design/index.css` ב־`app/globals.css`~~ (נמחק).

אין להשתמש בקבצים המושבתים בקוד חדש. הם יוסרו לאחר השלמת המיגרציה.


---

## 📁 design/ - מערכת עיצוב מאוחדת

**עודכן אחרונה**: אוקטובר 22, 2025  
**מטרה**: מקור אמת יחיד לסטיילינג, טוקנים ותימות

```text
design/
├── 📄 index.css                       # כניסה אחת לכל המערכת
├── 📁 base/
│   └── 📄 reset.css                   # CSS reset
├── 📁 tokens/
│   ├── 📄 colors.css                  # פלטת צבעים ומשתנים סמנטיים
│   ├── 📄 typography.css              # גופנים, גדלים, משקלים
│   ├── 📄 spacing.css                 # סולם מרווחים (יחס זהב)
│   ├── �� radii.css                   # רדיוסי פינות
│   ├── 📄 shadows.css                 # סולם elevation
│   ├── 📄 z-index.css                 # סדרי stacking
│   ├── 📄 animations.css              # מעברים ואנימציות
│   └── 📄 tokens.css                  # מדדי layout
├── 📁 themes/
│   ├── 📄 light.css                   # מיפוי צבעים למצב בהיר
│   └── 📄 dark.css                    # מיפוי צבעים למצב כהה
├── 📁 components/
│   ├── 📄 neumorphic.css              # כלי עזר נאומורפיים
│   ├── 📄 button.css                  # כפתורים (+ icon-button)
│   ├── 📄 theme-toggle.css            # מעבר תימות
│   ├── 📄 cookie-consent.css          # באנר עוגיות
│   ├── 📄 home.css                    # דף בית
│   ├── 📄 login-page.css              # דף התחברות
│   ├── 📄 terms-privacy.css           # דפים משפטיים
│   ├── 📄 layout-header.css           # כותרת עליונה
│   ├── 📄 layout-shell.css            # shell עמוד
│   ├── 📄 layout-standard-page.css    # פריסת עמוד
│   └── 📄 side-menu.css               # תפריט צד
├── 📁 features/
│   └── 📁 wealth-code/
│       ├── 📄 birthdate-picker.css    # בוחר תאריך
│       ├── 📄 calculator.css          # מחשבון
│       ├── 📄 code-inset.css          # תצוגת קוד
│       ├── 📄 interpretations.css     # פרשנויות
│       ├── 📄 result.css              # עמוד תוצאות
│       ├── 📄 sales.css               # עמוד מכירה
│       └── 📄 thank-you.css           # עמוד תודה
└── 📁 utils/
    └── 📄 helpers.css                 # כלי עזר גלובליים
```

### חוזה תימות (Theming Contract)

- **מצב בהיר**: `:root` ו-`[data-theme="light"]`
- **מצב כהה**: `[data-theme="dark"]`
- **יישום**: ב-`<html data-theme="light|dark">`

### היררכיית משתנים

1. **Palette (raw)** - צבעים גולמיים ב-`tokens/colors.css`
2. **Semantic** - משתנים סמנטיים ב-`themes/light.css` / `dark.css`
3. **Components** - קומפוננטות משתמשות רק במשתנים סמנטיים

**דוגמה:**
```css
/* ✅ נכון */
.btn { background: var(--neu-card); color: var(--neu-text-primary); }

/* ❌ לא נכון (קשיח) */
.btn { background: #f5f5f5; color: #5e4934; }
```

### ייבוא

כל ה-CSS נכנס דרך נקודה אחת:

```css
/* app/globals.css */
@import '../design/index.css';  /* ייבוא יחיד */
```

**תיעוד מלא**: ראה `docs/DESIGN-SYSTEM-CONSOLIDATION.md`


