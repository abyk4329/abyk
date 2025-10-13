# 🏗 Architecture Overview - סקירת ארכיטקטורה

## סקירה כללית

ABYK הוא אפליקציית Next.js מודרנית לחישוב נומרולוגי עם מערכת מייל ו-PDF מלאה.

---

## 🎨 Stack טכנולוגי

### Frontend

- **Next.js 15.5.4** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5.9.3** - Type safety
- **Tailwind CSS v4** - Utility-first CSS
- **Framer Motion** - Animations

### Backend/API

- **Next.js API Routes** - Serverless functions
- **Resend** - Email delivery service
- **Nodemailer** - SMTP fallback
- **@react-pdf/renderer** - PDF generation

### Dev Tools

- **ESLint 9** - Code linting
- **Playwright** - E2E testing
- **pnpm** - Package manager

---

## 📁 מבנה מודולרי

```text
app/                     # Next.js App Router (UI + API)
├── (marketing)/         # דפי נחיתה וקמפיינים
├── (funnels)/           # משפך המחשבון המלא
├── (legal)/             # מדיניות פרטיות ותנאים
├── (labs)/              # ניסויים וכלי dev בלבד
├── api/                 # פונקציות שרת (PDF, email, webhooks)
├── components/          # קומפוננטות Layout, ניווט, UI משותף
└── globals.css          # Tailwind + Neumorphism global

features/                # מודולים עסקיים
└── wealth-code/         # UI, נתונים, PDF ומיילים למחשבון העושר

lib/                     # Utilities ותצורת מותג/Email/PDF משותפת

docs/                    # כל התיעוד (ראה docs/README.md)

design/                  # חבילות handoff וייצוא מ-Figma

public/                  # נכסים סטטיים (brand, email assets, fonts, og)

tests/                   # Playwright E2E
```

---

## 🔄 Data Flow

### 1. חישוב Wealth Code

````text
User Input (Birthday)
    ↓
Calculator Component
    ↓
Wealth Code Algorithm (features/wealth-code)
    ↓
Result Page (display code)
    ↓
Sales Page
    ﻿# 🏗 Architecture Overview - סקירת ארכיטקטורה

    מסמך זה מספק תמונת-על של המערכת: אילו טכנולוגיות מרכיבות אותה, כיצד האלמנטים השונים מתחברים, ואילו קבצים חשובים מהווים את מקור האמת.

    ---

    ## 🎨 מחסנית טכנולוגית

    ### Frontend

    - **Next.js 15 (App Router)** — שליטה מלאה ברכיבי שרת ולקוח.
    - **React 19** — Hooks, Suspense, ו-React Server Components.
    - **TypeScript 5.9** — בטיחות טיפוסית ברמת הקוד וה-API.
    - **Tailwind CSS v4** — עיצוב Utility-first עם תמיכה ב-RTL.
    - **@react-pdf/renderer** — יצירת PDF בעברית (RTL + פונט Assistant).

    ### Backend & Delivery

    - **Next.js API Routes** — פונקציות שרת ל-generating PDF, שליחת מיילים ו-handling webhooks.
    - **Resend** — ספק המייל הראשי.
    - **Nodemailer (Gmail SMTP)** — גיבוי כאשר Resend לא זמין.

    ### Tooling

    - **pnpm** — מנהל החבילות.
    - **ESLint 9 + Prettier** — בקרת איכות קוד.
    - **Playwright** — בדיקות End-to-End.
    - **Sentry** — ניטור שגיאות וביצועים (מוגדר עם instrumentation + GlobalError).

    ---

    ## 📁 תצורת תיקיות מרכזית

    ```text
    app/                     # Next.js App Router (UI + API)
    ├── (marketing)/         # דפי נחיתה וקמפיינים
    ├── (funnels)/           # משפך המחשבון המלא
    ├── (legal)/             # עמודי מדיניות
    ├── (labs)/              # ניסויים וכלי dev בלבד
    ├── api/                 # פונקציות שרת (generate-pdf, send-email, webhooks)
    ├── components/          # קומפוננטות Layout, ניווט ו-UI משותף
    └── globals.css          # Tailwind + Neumorphism Global

    features/                # מודולים עסקיים מבודדים
    └── wealth-code/         # UI, נתונים, PDF ומיילים של Wealth Code

    lib/                     # Utilities משותפים (branding, email, pdf, env, routes)

    docs/                    # תיעוד (ראה docs/README.md + PROJECT_STRUCTURE.md)

    design/                  # ייצוא Figma, handoff ו-assets מעיצוב

    public/                  # נכסים סטטיים (brand, email, fonts, og)

    tests/                   # Playwright E2E
    ```

    > לפרטים מלאים על כל תיקייה וקבצי המפתח — ראו `docs/PROJECT_STRUCTURE.md`.

    ---

    ## 🔄 זרימות ליבה

    ### מחשבון Wealth Code (Client → PDF/Mail)

    ```text
    User enters birthday in calculator
        ↓
    Client renders result using features/wealth-code/utils
        ↓
    Result/Sales steps מוצגים דרך app/(funnels)
        ↓
    משתמש משלם דרך Grow.link
        ↓
    Webhook מפעיל יצירת PDF ושליחת מייל
        ↓
    Thank-you page מציג לינק הורדה ושיתוף
    ```

    ### פייפליין Email + PDF

    ```text
    Grow payment webhook (order.paid)
        ↓
    /api/webhooks/grow מאמת את הסוד, מושך פרטי לקוח
        ↓
    /api/generate-pdf מרכיב PDF עם @react-pdf/renderer
        ↓
    /api/send-email שולח את המייל (Resend → Gmail fallback)
        ↓
    המשתמש מקבל מייל + PDF מצורף
    ```

    ---

    ## 📦 מודולי תכונות (features)

    ### `features/wealth-code`

    - **components/** — קטעי UI עבור כל שלב (Hero, Calculator, Result, Sales, ThankYou, Interpretations).
    - **layout/** — עטיפות מבנה, CardStack, פריסות נוספות.
    - **data/** — טבלאות, תיאורים ומטא-נתונים לחישובי הקוד.
    - **utils/** — חישוב קוד, לוגיקת שיתוף, שליחת מיילים.
    - **pdf/** — קומפוננטות PDF, פונקציית `generateWealthCodePDF`.
    - **email/** — תבניות HTML וטקסטים למייל.
    - **constants.ts** — טווחי ערכים, טקסטים וסכומות.

    > כל פיצ'ר עתידי ישכפל מבנה זה לקבלת מודולריות ברורה.

    ---

    ## 🧰 ספריות משותפות (lib)

    - **lib/core/** — מותג, תבניות מייל בסיסיות, הגדרות PDF (צבעים, פונט, margins).
    - **lib/email/** — שכבת שליחה (Resend/Nodemailer) ופונקציות high-level לשליחת Wealth Email.
    - **lib/utils/** — כלי עזר כלליים (base64, file helpers, theme, formatters).
    - **lib/routes.ts** — ריכוז נתיבים עבור ניווט ותיעוד.
    - **lib/env.ts** — קריאת משתני סביבה עם בדיקת סוג.

    ---

    ## 🔌 API Endpoints עיקריים

    ### POST `/api/generate-pdf`

    - **תפקיד:** ליצור PDF מותאם אישית עבור הקוד שנשלף מן החישוב.
    - **קלט:** `code`, `name`, `email` (JSON).
    - **פלט:** `pdfBase64` ללא prefix. משמש גם ב-endpoint המייל.

    ```json
    {
      "code": "1234",
      "name": "קסניה",
      "email": "user@example.com"
    }
    ```

    ### POST `/api/send-email`

    - **תפקיד:** שליחת מייל HTML + צירוף PDF.
    - **תהליך:** ניסוי Resend → fallback Nodemailer (Gmail App Password) → שליחה.
    - **ב-development:** ניתן לאלץ שליחת טסט ע"י `MAIL_TEST_MODE=1`.

    ```json
    {
      "to": "user@example.com",
      "name": "קסניה",
      "attachments": [{
        "filename": "wealth-code.pdf",
        "contentType": "application/pdf",
        "content": "<base64>"
      }]
    }
    ```

    ### POST `/api/webhooks/grow`

    - **תפקיד:** תגובה לאירועי `order.paid` מפלטפורמת Grow.
    - **אימות:** Header `x-grow-secret`.
    - **תוצר:** הפקת PDF + שליחת מייל + לוג ריצה.

    ```json
    {
      "event": "order.paid",
      "data": {
        "customer": {
          "email": "user@example.com",
          "name": "Awakening"
        },
        "metadata": { "code": "1234" }
      }
    }
    ```

    ---

    ## 🛡 ניטור ותצפיות (Observability)

    - **Sentry** מופעל דרך קבצי הקונפיגורציה `sentry.client|server|edge.config.ts` וה-`instrumentation.ts` של Next.js.
    - קובץ ה-`app/global-error.tsx` הוא קומפוננטת Client שמדווחת שגיאות React ל-Sentry ומציגה חוויית fallback למשתמש.
    - משתני הסביבה הרלוונטיים: `SENTRY_DSN`, `SENTRY_TRACES_SAMPLE_RATE`, `SENTRY_PROFILES_SAMPLE_RATE` (ברירת מחדל: 1.0 בדב, 0.1 בפרודקשן).
    - ב-CI/Production ניתן להשתמש ב-`SENTRY_AUTH_TOKEN` לצורך העלאת Source Maps (הטוקן נשמר רק ב-Vercel).

    ---

    ## 🧪 בדיקות ואיכות

    - **Playwright (`tests/e2e/smoke.spec.ts`)** — מאמת את המסע הראשי (Calculator → Result → Sales → Thank-you).
    - **`pnpm lint`** — ESLint + TypeScript על כל הפרויקט.
    - **בדיקות ידניות** — תרחישי תשלום, הורדת PDF, שליחת מיילים ב-Gmail.

    > הוספת בדיקות חדשות: צרו קובץ תחת `tests/e2e/` והוסיפו אותו לסקריפט ה-ci.

    ---

    ## 🌐 סביבות ודפלוימנט

    - **Local** — `pnpm dev` (עם `.env.local`).
    - **Preview** — כל Pull Request מקבל Preview ב-Vercel.
    - **Production** — ענף `main` (מוגן). דפלוימנט מתבצע אוטומטית לאחר Merge מאושר.

    ```bash
    pnpm build   # אימות לפני דפלוימנט
    pnpm start   # הרצת גרסת Production מקומית
    ```

    משתני סביבה מוגדרים ב-Vercel Dashboard. ראו `docs/DEVELOPMENT.md` לרשימה מלאה.

    ---

    ## 🗺 המשך תחזוקה

    - הקפידו לעדכן את `docs/PROJECT_STRUCTURE.md` ו-`docs/README.md` עם כל שינוי ארכיטקטוני.
    - פיצ'רים חדשים → ליצור תיקיית `features/<feature-name>` ולשמור על אותם עקרונות מודולריים.
    - שינויים במותג או ב-PDF → לעדכן את `lib/core`. שינויים במייל → `lib/email` + `features/<feature>/email`.

    ---

    **עודכן לאחרונה:** אוקטובר 2025

---

## 🔮 עתיד - Roadmap

### Short-term
- [ ] User authentication
- [ ] User dashboard
- [ ] Payment history
- [ ] Multiple PDF templates

### Long-term
- [ ] Admin panel
- [ ] Analytics dashboard
- [ ] Mobile app (React Native?)
- [ ] Multi-language support

---

## 📚 קבצי תיעוד נוספים

- [DEVELOPMENT.md](./DEVELOPMENT.md) - מדריך פיתוח
- [BRANCHING.md](./BRANCHING.md) - אסטרטגיית ענפים
- [guides/EMAIL-PDF-README.md](./guides/EMAIL-PDF-README.md) - מערכת מייל ו-PDF

---

**עודכן**: אוקטובר 2025
**גרסה**: 1.0.0
````
