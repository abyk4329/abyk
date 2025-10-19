# מבנה הפרויקט המפורט - ABYK (Awakening by Ksenia)

**עודכן:** אוקטובר 2025  
**מטרה:** מקור אמת יחיד המתאר את כל הקבצים והתיקיות בפרויקט בצורה מדויקת

---

## 🗂 מבנה כללי של הפרויקט

```
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

```
app/
├── 📁 (funnels)/                      # Route Group למשפך המרה
│   ├── 📁 _components/                # קומפוננטות משותפות למשפך
│   │   └── 📁 wealth-code/            # קומפוננטות פיצ'ר קוד עושר
│   │       ├── 📁 sections/           # חלקי UI של המשפך
│   │       ├── 📁 shared/             # קומפוננטות משותפות
│   │       ├── 📁 ui/                 # רכיבי UI בסיסיים
│   │       └── 📄 index.ts            # יצוא מאוחד
│   ├── 📄 layout.tsx                  # Layout למשפך
│   └── 📄 page.tsx                    # דף ראשי של המשפך
├── 📁 (legal)/                        # Route Group לעמודי מדיניות
│   ├── 📄 layout.tsx                  # Layout לעמודי מדיניות
│   ├── 📄 page.tsx                    # דף מדיניות פרטיות
│   └── 📄 terms/                      # עמוד תנאי שימוש
│       └── 📄 page.tsx
├── 📁 api/                            # API Routes
│   ├── 📁 auth/                       # אימות משתמשים
│   │   ├── 📁 [...nextauth]/          # NextAuth.js routes
│   │   │   └── 📄 route.ts
│   │   ├── 📄 register/               # רישום משתמשים
│   │   │   └── 📄 route.ts
│   ├── 📁 generate-pdf/               # יצירת PDF
│   │   └── 📄 route.ts
│   ├── 📁 send-email/                 # שליחת מיילים
│   │   └── 📄 route.ts
│   └── 📁 webhooks/                   # Webhooks מתשלומים
│       └── 📁 grow/
│           └── 📄 route.ts
├── 📁 components/                     # קומפוננטות משותפות
│   ├── 📁 analytics/                  # קומפוננטות אנליטיקה
│   ├── 📁 layout/                     # קומפוננטות פריסה
│   │   ├── 📄 Header.module.css       # סגנונות ל-Header
│   │   ├── 📄 Header.tsx              # קומפוננט Header
│   │   ├── 📄 SideMenu.module.css     # סגנונות ל-SideMenu
│   │   ├── 📄 SideMenu.tsx            # קומפוננט SideMenu
│   ├── 📁 lib/                        # כלי עזר לקומפוננטות
│   ├── 📁 neu/                        # קומפוננטות נאומורפיות
│   │   ├── 📄 Card.tsx                # כרטיס נאומורפי
│   │   ├── 📄 NeuButton.tsx           # כפתור נאומורפי
│   │   └── 📁 neumorphic-shadows.css  # צללים נאומורפיים
│   ├── 📁 providers/                  # Context Providers
│   ├── 📁 sections/                   # קומפוננטות חלקים
│   │   ├── 📄 TermsPrivacy.module.css # סגנונות לעמודי מדיניות
│   │   └── 📄 TermsPrivacy.tsx        # קומפוננט עמודי מדיניות
│   └── 📁 shared/                     # קומפוננטות משותפות
│       ├── 📁 ui/                     # רכיבי UI בסיסיים
│       │   ├── 📄 Field.tsx           # שדה קלט
│       │   ├── 📄 Input.tsx           # קלט טקסט
│       │   └── 📄 Stack.tsx           # קונטיינר ערימה
├── 📁 fonts.ts                        # הגדרות פונטים
├── 📁 global-error.tsx                # דף שגיאה גלובלי
├── 📁 globals.css                     # CSS גלובלי
├── 📁 HomePageClient.tsx              # קומפוננט דף בית לקליינט
├── 📁 layout.tsx                      # Layout ראשי
├── 📁 not-found.tsx                   # דף 404
├── 📁 page.module.css                 # סגנונות לדף ראשי
├── 📁 page.tsx                        # דף בית ראשי
├── 📁 reset.css                       # CSS reset
├── 📁 styles/                         # סגנונות נוספים
└── 📁 tokens.css                      # טוקני עיצוב (גיבוי)

---

## 📁 design/ - מערכת עיצוב מרכזית

תיקיית design מכילה את כל מערכת העיצוב המאוחדת עם טוקנים, עיצובים וכלי עזר.

```
design/
├── 📁 index.css                       # נקודת כניסה מאוחדת למערכת עיצוב
├── 📁 tokens/                         # טוקני עיצוב בסיסיים
│   ├── 📄 animations.css              # אנימציות ותנועה
│   ├── 📄 shadows.css                 # צללים ועומק
│   ├── 📄 tokens.css                  # צבעים, מרווחים, גודל
│   └── 📄 typography.css              # טיפוגרפיה ופונטים
├── 📁 themes/                         # עיצובים לפי מצב
│   ├── 📄 dark.css                    # עיצוב כהה
│   ├── 📄 light.css                   # עיצוב בהיר
│   └── 📄 neumorphic.css              # עיצוב נאומורפי
└── 📁 utils/                          # כלי עזר לעיצוב
    ├── 📄 helpers.css                 # מחלקות עזר
    └── 📄 transitions.css             # מעברים ואנימציות
```

---



## 📁 docs/ - תיעוד מלא

תיקיית docs מכילה את כל התיעוד של הפרויקט.

```
docs/
├── 📁 guides/                         # מדריכים מקצועיים
│   ├── 📄 EMAIL-PDF-README.md         # מדריך Email/PDF
│   └── 📄 ...                         # מדריכים נוספים
├── 📄 APP_DIRECTORY_GUIDE.md          # מדריך תיקיית app
├── 📄 ARCHITECTURE.md                 # ארכיטקטורה
├── 📄 BRANCHING.md                    # Git workflow
├── 📄 CALCULATOR-DESIGN-COMPARISON.md # השוואת עיצובים
├── 📄 CALCULATOR-PAGE-DESIGN.md       # עיצוב דף מחשבון
├── 📄 CHANGELOG.md                    # יומן שינויים
├── 📄 CONTRIBUTING.md                 # הנחיות תרומה
├── 📄 COOKIE-BANNER-UPDATE.md         # עדכון באנר עוגיות
├── 📄 DESIGN-FIX-PROMPTS.md           # פרומפטים לתיקון עיצוב
├── 📄 DESIGN-SYSTEM-MIGRATION.md      # מיגרציית מערכת עיצוב
├── 📄 DESIGN-SYSTEM-QUICK-START.md    # התחלה מהירה למערכת עיצוב
├── 📄 DESIGN-SYSTEM.md                # מערכת עיצוב
├── 📄 DEVELOPMENT.md                  # פיתוח
├── 📄 HOMEPAGE-BLUEPRINT.md           # תכנית דף בית
├── 📄 HOMEPAGE-LAYERS.md              # שכבות דף בית
├── 📄 ISSUE-PLAYBOOK.md               # ספר משחק בעיות
├── 📄 MIGRATION-PROGRESS.md           # התקדמות מיגרציה
├── 📄 NAVIGATION-REMOVAL.md           # הסרת ניווט
├── 📄 NEUMORPHIC-DESIGN.md            # עיצוב נאומורפי
├── 📄 OWNER-GUIDE.md                  # מדריך בעלים
├── 📄 PROJECT_STRUCTURE.md            # מבנה הפרויקט (זה)
├── 📄 README.md                       # README לתיעוד
└── 📄 STANDARD-PAGE-LAYOUT-MIGRATION.md # מיגרציית פריסת דפים
```

---

## 📁 public/ - נכסים סטטיים

תיקיית public מכילה קבצים סטטיים הנגישים בדפדפן.

```
public/
├── 📁 brand/                          # נכסי מותג
│   ├── 📄 abyk-logo.png               # לוגו ראשי
│   └── 📄 ...                         # לוגואים נוספים
├── 📁 email/                          # נכסים למיילים
│   └── 📄 logo-email.png              # לוגו למיילים
├── 📁 fonts/                          # פונטים
│   └── 📁 Assistant/                  # פונט Assistant
│       ├── 📄 Assistant-Bold.woff2    # משקל Bold
│       ├── 📄 Assistant-Light.woff2   # משקל Light
│       ├── 📄 Assistant-Medium.woff2  # משקל Medium
│       ├── 📄 Assistant-Regular.woff2 # משקל Regular
│       └── 📄 ...                     # משקלים נוספים
├── 📁 og/                             # תמונות שיתוף
│   ├── 📄 og-image.png                # תמונת Open Graph
│   └── 📄 ...                         # תמונות נוספות
├── 📄 ABYKICON.png                    # אייקון ראשי
├── 📄 abyk-icon-1024 2.png            # אייקון 1024px (גיבוי)
├── 📄 abyk-icon-1024.png              # אייקון 1024px
├── 📄 abyk-icon-192 2.png             # אייקון 192px (גיבוי)
├── 📄 abyk-icon-192.png               # אייקון 192px
├── 📄 abyk-icon-512 2.png             # אייקון 512px (גיבוי)
├── 📄 abyk-icon-512.png               # אייקון 512px
├── 📄 manifest.webmanifest            # PWA manifest
└── 📄 אייקון.png                      # אייקון בעברית
```

---

## 📁 tests/ - בדיקות אוטומטיות

תיקיית tests מכילה את כל הבדיקות האוטומטיות.

```
```
tests/
└── 📁 e2e/                            # בדיקות End-to-End
    ├── 📄 smoke.spec.ts               # בדיקת עשן
    └── 📄 ...                         # בדיקות נוספות
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

| קובץ/תיקייה | תפקיד | מיקום |
|-------------|--------|--------|
| `app/layout.tsx` | Layout ראשי עם Providers | UI |
| `app/page.tsx` | דף בית ראשי | UI |
| `app/globals.css` | CSS גלובלי + Tailwind | Styling |
| `design/index.css` | מערכת עיצוב מאוחדת | Styling |
| `design/tokens/` | טוקני עיצוב בסיסיים | Styling |
| `design/themes/` | עיצובים לפי מצב (בהיר/כהה/נאומורפי) | Styling |
| `lib/domain/` | לוגיקה עסקית לפי דומיין | Business Logic |
| `lib/services/` | שירותים חיצוניים | Business Logic |
| `lib/security.config.ts` | קונפיגורציית אבטחה | Config |
| `lib/constants.ts` | קבועים גלובליים | Config |
| `lib/env.ts` | משתני סביבה | Config |
| `lib/routes.ts` | הגדרות נתיבים | Config |
| `app/api/send-email/` | API לשליחת מיילים | API |
| `app/api/generate-pdf/` | API ליצירת PDF | API |
| `app/api/webhooks/grow/` | Webhook לתשלומים | API |
| `docs/PROJECT_STRUCTURE.md` | מבנה הפרויקט (זה) | Docs |
| `docs/ARCHITECTURE.md` | ארכיטקטורה טכנית | Docs |
| `public/manifest.webmanifest` | PWA configuration | Static |
| `package.json` | תלויות וסקריפטים | Config |
| `tailwind.config.ts` | Tailwind configuration | Config |

---

## 🔧 איך לעדכן את המסמך

1. בצע שינוי במבנה התיקיות או בקבצים
2. עדכן את התיאורים הרלוונטיים במסמך זה
3. הוסף קבצים/תיקיות חדשות עם תיאור תפקידם
4. הרץ `pnpm lint` לוודא תקינות Markdown
5. בצע commit עם הודעה: `docs: update project structure`

> המסמך הזה הוא מקור האמת היחיד למבנה הפרויקט
