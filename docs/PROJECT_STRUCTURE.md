# מבנה הפרויקט המפורט - ABYK (Awakening by Ksenia)

**עודכן:** אוקטובר 2025  
**מטרה:** מקור אמת יחיד המתאר את כל הקבצים והתיקיות בפרויקט בצורה מדויקת

---

## 🗂 מבנה כללי של הפרויקט

```text
ABYK/
├── 📁 .env*                           # משתני סביבה (לא בקוד)
├── 📁 .github/                        # GitHub Actions ותבניות
├── 📁 .next/                          # קבצי Next.js שנוצרים אוטומטית
├── 📁 .npmrc                          # הגדרות npm
├── 📁 .vercel/                        # קבצי Vercel
├── 📁 .vscode/                        # הגדרות VS Code
├── 📁 node_modules/                   # תלויות מותקנות
├── 📁 playwright-report/              # דוחות בדיקות E2E
├── 📁 test-results/                   # תוצאות בדיקות
├── 📁 app/                            # Next.js App Router - ליבה
├── 📁 docs/                           # תיעוד מלא
├── 📁 lib/                            # קוד משותף וכלים
├── 📁 prisma/                         # סכמת בסיס נתונים
├── 📁 public/                         # נכסים סטטיים
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

````text
app/
├── 📁 (funnels)
│   ├── 📁 _components
│   │   ├── 📁 wealth-code
│   │   │   ├── 📁 sections
│   │   │   │   ├── 📁 ui
│   │   │   │   │   └── 📄 tabs.tsx
│   │   │   │   ├── � BirthdatePicker.module.css
│   │   │   │   ├── 📄 BirthdatePicker.tsx
│   │   │   │   ├── � Calculator.module.css
│   │   │   │   ├── 📄 Calculator.tsx
│   │   │   │   ├── 📄 index.ts
│   │   │   │   ├── � Interpretations.module.css
│   │   │   │   ├── 📄 Interpretations.tsx
│   │   │   │   ├── � Result.module.css
│   │   │   │   ├── 📄 Result.tsx
│   │   │   │   ├── � SalesPage.module.css
│   │   │   │   ├── 📄 SalesPage.tsx
│   │   │   │   ├── 📄 ThankYou.module.css
│   │   │   │   └── 📄 ThankYou.tsx
│   │   │   ├── 📁 shared
│   │   │   │   ├── 📄 CodeInset.module.css
│   │   │   │   ├── 📄 CodeInset.tsx
│   │   │   │   ├── 📄 index.ts
│   │   │   │   └── 📄 NeuroCard.tsx
│   │   │   ├── 📁 ui
│   │   │   │   └── � tabs.tsx
│   │   │   └── 📄 index.ts
│   │   └── 📄 FunnelPage.tsx
│   ├── 📁 calculator
│   │   ├── 📄 CalculatorPageClient.tsx
│   │   └── 📄 page.tsx
│   ├── 📁 interpretations
│   │   ├── 📄 InterpretationsPageClient.tsx
│   │   └── 📄 page.tsx
│   ├── 📁 login
│   │   ├── 📄 LoginForm.module.css
│   │   ├── 📄 LoginForm.tsx
│   │   ├── 📄 LoginPage.module.css
│   │   └── 📄 page.tsx
│   ├── 📁 result
│   │   ├── 📄 page.tsx
│   │   └── 📄 ResultPageClient.tsx
│   ├── 📁 sales
│   │   ├── 📄 page.tsx
│   │   └── 📄 SalesPageClient.tsx
│   ├── 📁 thank-you
│   │   ├── 📄 page.tsx
│   │   └── 📄 ThankYouPageClient.tsx
│   ├── 📄 layout.tsx
│   └── 📄 README.md
├── 📁 (legal)
│   ├── 📁 privacy
│   │   └── 📄 page.tsx
│   ├── 📁 terms
│   │   └── 📄 page.tsx
│   └── 📄 README.md
├── 📁 api
│   ├── 📁 auth
│   │   ├── 📁 [...nextauth]
│   │   │   └── 📄 route.ts
│   │   └── � register
│   │       └── 📄 route.ts
│   ├── 📁 generate-pdf
│   │   └── 📄 route.ts
│   ├── 📁 send-email
│   │   └── 📄 route.ts
│   └── 📁 webhooks
│       └── 📁 grow
│           └── 📄 route.ts
├── 📁 components
│   ├── 📁 analytics
│   │   └── 📄 TikTokPixel.tsx
│   ├── 📁 layout
│   │   ├── � AppShell.tsx
│   │   ├── 📄 CookieConsent.module.css
│   │   ├── 📄 CookieConsent.tsx
│   │   ├── � drawerConstants.ts
│   │   ├── 📄 DrawerProvider.tsx
│   │   ├── 📄 Footer.module.css
│   │   ├── 📄 Footer.tsx
│   │   ├── 📄 Header.module.css
│   │   ├── 📄 Header.tsx
│   │   ├── 📄 HeaderBar.module.css
│   │   ├── 📄 HeaderBar.tsx
│   │   ├── 📄 index.ts
│   │   ├── 📄 NavigationButtons.module.css
│   │   ├── 📄 NavigationButtons.tsx
│   │   ├── 📄 PageLayout.tsx
│   │   ├── 📄 PageShell.module.css
│   │   ├── 📄 PageShell.tsx
│   │   ├── 📄 SideMenu.module.css
│   │   ├── 📄 SideMenu.tsx
│   │   ├── 📄 SocialIcons.tsx
│   │   ├── 📄 SocialLinks.tsx
│   │   ├── � SplashScreen.module.css
│   │   ├── 📄 SplashScreen.tsx
│   │   ├── 📄 StandardPageLayout.module.css
│   │   ├── 📄 StandardPageLayout.tsx
│   │   └── � useThemePreference.ts
│   ├── 📁 lib
│   │   └── 📄 neomorphism-styles.ts
│   ├── 📁 neu
│   │   ├── 📄 Button.module.css
│   │   ├── 📄 Button.tsx
│   │   ├── 📄 Card.tsx
│   │   ├── 📄 IconButton.module.css
│   │   ├── 📄 IconButton.tsx
│   │   ├── 📄 index.ts
│   │   ├── � neumorphic-shadows.css
│   │   └── 📄 README.md
│   ├── 📁 providers
│   │   ├── 📄 AuthProvider.tsx
│   │   ├── 📄 index.ts
│   │   └── 📄 NavigationProvider.tsx
│   ├── 📁 sections
│   │   ├── 📄 DesignShowcase.tsx
│   │   ├── 📄 index.ts
│   │   ├── 📄 TermsPrivacy.module.css
│   │   └── 📄 TermsPrivacy.tsx
│   └── 📁 shared
│       ├── 📁 ui
│       │   ├── 📄 Card.tsx
│       │   ├── 📄 Field.tsx
│       │   ├── 📄 index.ts
│       │   ├── 📄 Input.tsx
│       │   └── 📄 Stack.tsx
│       ├── � icons.tsx
│       ├── 📄 index.ts
│       ├── 📄 MenuTrigger.tsx
│       ├── � NeuButton.tsx
│       ├── 📄 README.md
│       ├── � ThemeToggle.module.css
│       └── 📄 ThemeToggle.tsx
├── 📄 fonts.ts
├── 📄 global-error.tsx
├── 📄 globals.css
├── 📄 globals.css.backup
├── � HomePageClient.tsx
├── � layout.tsx
├── � not-found.tsx
├── � page.module.css
├── � page.tsx
├── � reset.css
└── � tokens.css

---

## 📁 design/ - מערכת עיצוב מרכזית

תיקיית design מכילה את כל מערכת העיצוב המאוחדת עם טוקנים, עיצובים וכלי עזר.

```text
design/
├── 📁 themes
│   ├── � dark.css
│   ├── 📄 light.css
│   └── 📄 neumorphic.css
├── � tokens
│   ├── 📄 animations.css
│   ├── 📄 shadows.css
│   ├── 📄 tokens.css
│   └── 📄 typography.css
├── 📁 utils
│   ├── 📄 helpers.css
│   └── 📄 transitions.css
└── 📄 index.css
````

---

## 📁 lib/ - קוד משותף וכלים

תיקיית lib מרכזת דומיינים עסקיים, שירותים, קונפיגורציות ורכיבי עזר משותפים.

```text
lib/
├── 📁 domain
│   ├── 📁 auth
│   │   ├── 📄 index.ts
│   │   └── 📄 options.ts
│   └── 📁 wealth-code
│       ├── 📁 data
│       │   ├── 📄 codeStructures.ts
│       │   ├── 📄 dailyApplication.ts
│       │   ├── 📄 digitInterpretations.ts
│       │   └── 📄 index.ts
│       ├── 📁 email
│       │   ├── 📄 index.ts
│       │   ├── 📄 template.ts
│       │   └── 📄 WealthEmail.ts
│       ├── 📁 pdf
│       │   ├── 📄 generate.ts
│       │   ├── 📄 index.ts
│       │   └── 📄 WealthReport.tsx
│       ├── 📁 utils
│       │   ├── 📄 algorithm.ts
│       │   ├── 📄 email.ts
│       │   ├── 📄 index.ts
│       │   ├── 📄 numerology.ts
│       │   └── 📄 share.ts
│       ├── 📄 constants.ts
│       └── 📄 index.ts
├── 📁 generated
│   └── 📁 prisma
│       ├── 📁 runtime
│       │   ├── 📄 edge-esm.js
│       │   ├── 📄 edge.js
│       │   ├── 📄 index-browser.d.ts
│       │   ├── 📄 index-browser.js
│       │   ├── 📄 library.d.ts
│       │   ├── 📄 library.js
│       │   ├── 📄 react-native.js
│       │   ├── 📄 wasm-compiler-edge.js
│       │   └── 📄 wasm-engine-edge.js
│       ├── 📄 client.d.ts
│       ├── 📄 client.js
│       ├── 📄 default.d.ts
│       ├── 📄 default.js
│       ├── 📄 edge.d.ts
│       ├── 📄 edge.js
│       ├── 📄 index-browser.js
│       ├── 📄 index.d.ts
│       ├── 📄 index.js
│       ├── 📄 libquery_engine-darwin-arm64.dylib.node
│       ├── 📄 package.json
│       ├── 📄 query_engine_bg.js
│       ├── 📄 query_engine_bg.wasm
│       ├── 📄 schema.prisma
│       ├── 📄 wasm-edge-light-loader.mjs
│       ├── 📄 wasm-worker-loader.mjs
│       ├── 📄 wasm.d.ts
│       └── 📄 wasm.js
├── 📁 services
│   ├── 📁 core
│   │   ├── 📁 email
│   │   │   ├── 📄 BaseEmailTemplate.ts
│   │   │   ├── 📄 index.ts
│   │   │   └── 📄 styles.ts
│   │   ├── 📄 branding.ts
│   │   ├── 📄 index.ts
│   │   └── 📄 pdfConfig.ts
│   └── 📁 email
│       ├── 📄 transport.ts
│       └── 📄 wealth.ts
├── 📁 utils
│   ├── 📄 base64.ts
│   ├── 📄 cn.ts
│   ├── 📄 fetcher.ts
│   ├── 📄 file.ts
│   ├── 📄 format.ts
│   ├── 📄 index.ts
│   └── 📄 theme.ts
├── 📄 constants.ts
├── 📄 db.ts
├── 📄 env.ts
├── 📄 index.ts
├── 📄 routes.ts
└── 📄 security.config.ts
```

---

## 📁 docs/ - תיעוד מלא

תיקיית docs מכילה את כל התיעוד של הפרויקט.

```text
docs/
├── 📁 guides
│   ├── 📄 EMAIL-PDF-README.md
│   ├── 📄 HOME-SPACING-GUIDE.md
│   └── 📄 TIKTOK-PIXEL-GUIDE.md
├── 📄 APP_DIRECTORY_GUIDE.md
├── 📄 ARCHITECTURE.md
├── 📄 BRANCHING.md
├── 📄 CALCULATOR-DESIGN-COMPARISON.md
├── 📄 CALCULATOR-PAGE-DESIGN.md
├── 📄 color-palette-reference.csv
├── 📄 component-inventory.csv
├── 📄 COOKIE-BANNER-UPDATE.md
├── 📄 DESIGN-FIX-PROMPTS.md
├── 📄 DESIGN-SYSTEM-MIGRATION.md
├── 📄 DESIGN-SYSTEM-QUICK-START.md
├── 📄 DESIGN-SYSTEM.md
├── 📄 DEVELOPMENT.md
├── 📄 HOMEPAGE-BLUEPRINT.md
├── 📄 HOMEPAGE-LAYERS.md
├── 📄 ISSUE-PLAYBOOK.md
├── 📄 MIGRATION-PROGRESS.md
├── 📄 NAVIGATION-REMOVAL.md
├── 📄 NEUMORPHIC-DESIGN.md
├── 📄 PROJECT_STRUCTURE.md
├── 📄 PROJECT_STRUCTURE_AUTO.md
├── 📄 README.md
└── 📄 STANDARD-PAGE-LAYOUT-MIGRATION.md
```

---

## 📁 public/ - נכסים סטטיים

תיקיית public מכילה קבצים סטטיים הנגישים בדפדפן.

```text
public/
├── 📁 brand
│   ├── 📄 logob-backup.png
│   └── 📄 logob.png
├── 📁 email
│   └── 📄 logob.png
├── 📁 fonts
│   └── 📁 Assistant
│       ├── 📁 static
│       │   ├── 📄 Assistant-Bold.ttf
│       │   ├── 📄 Assistant-ExtraBold.ttf
│       │   ├── 📄 Assistant-ExtraLight.ttf
│       │   ├── 📄 Assistant-Light.ttf
│       │   ├── 📄 Assistant-Medium.ttf
│       │   ├── 📄 Assistant-Regular.ttf
│       │   └── 📄 Assistant-SemiBold.ttf
│       ├── � Assistant-VariableFont_wght.ttf
│       ├── 📄 OFL.txt
│       └── 📄 README.txt
├── � og
│   ├── 📄 share-square.png
│   └── 📄 share.png
├── 📄 abyk-icon-1024.png
├── 📄 abyk-icon-192.png
├── 📄 abyk-icon-512.png
├── 📄 ABYKICON.png
├── 📄 manifest.webmanifest
└── 📄 אייקון.png
```

---

## 📁 tests/ - בדיקות אוטומטיות

תיקיית tests מכילה את כל הבדיקות האוטומטיות.

```text
tests/
└── 📁 e2e
    └── 📄 smoke.spec.ts
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

| קובץ/תיקייה                   | תפקיד                               | מיקום          |
| ----------------------------- | ----------------------------------- | -------------- |
| `app/layout.tsx`              | Layout ראשי עם Providers            | UI             |
| `app/page.tsx`                | דף בית ראשי                         | UI             |
| `app/globals.css`             | CSS גלובלי + Tailwind               | Styling        |
| `design/index.css`            | מערכת עיצוב מאוחדת                  | Styling        |
| `design/tokens/`              | טוקני עיצוב בסיסיים                 | Styling        |
| `design/themes/`              | עיצובים לפי מצב (בהיר/כהה/נאומורפי) | Styling        |
| `lib/domain/`                 | לוגיקה עסקית לפי דומיין             | Business Logic |
| `lib/services/`               | שירותים חיצוניים                    | Business Logic |
| `lib/security.config.ts`      | קונפיגורציית אבטחה                  | Config         |
| `lib/constants.ts`            | קבועים גלובליים                     | Config         |
| `lib/env.ts`                  | משתני סביבה                         | Config         |
| `lib/routes.ts`               | הגדרות נתיבים                       | Config         |
| `app/api/send-email/`         | API לשליחת מיילים                   | API            |
| `app/api/generate-pdf/`       | API ליצירת PDF                      | API            |
| `app/api/webhooks/grow/`      | Webhook לתשלומים                    | API            |
| `docs/PROJECT_STRUCTURE.md`   | מבנה הפרויקט (זה)                   | Docs           |
| `docs/ARCHITECTURE.md`        | ארכיטקטורה טכנית                    | Docs           |
| `public/manifest.webmanifest` | PWA configuration                   | Static         |
| `package.json`                | תלויות וסקריפטים                    | Config         |
| `tailwind.config.ts`          | Tailwind configuration              | Config         |

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
- `app/tokens.css` – מושבת; הטוקנים מרוכזים תחת `design/tokens/*` ומיובאים דרך `design/index.css` ב־`app/globals.css`.

אין להשתמש בקבצים המושבתים בקוד חדש. הם יוסרו לאחר השלמת המיגרציה.
