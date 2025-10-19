# Project Structure / מבנה הפרויקט

**עודכן:** אוקטובר 2025  
**מטרה:** מקור אמת יחיד שמסביר מה יש בכל תיקייה ומה תפקידה.

---

## 🗺 מפת על במהירות

```text
/ (שורש)
├── app/                 # Next.js App Router (UI + API)
├── features/            # מודולים עסקיים ממוקדי דומיין
├── lib/                 # Utilities משותפים ותצורות ליבה
├── docs/                # כל התיעוד
├── design/              # קבצי handoff וייצוא מ-Figma
├── public/              # נכסים סטטיים (תמונות, פונטים, manifest)
├── prisma/              # סכמת בסיס נתונים (עתידי)
├── tests/               # Playwright E2E
├── app/styles/          # קבצי CSS ייעודיים (Neu utilities)
├── package.json         # הגדרות הפרויקט והסקריפטים
├── tsconfig.json        # קומפילציית TypeScript
└── setup-folders.js     # סקריפט שמוודא שמבנה התיקיות קיים
```

---

## תיקיות וקבצים מחוץ ל-`app/`

| נתיב                      | תיאור                                                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `features/`               | מודולים עסקיים מבודדים (כיום `wealth-code`) עם `components`, `data`, `email`, `pdf`, `utils` ועוד – כל Feature הוא יחידה עצמאית. |
| `lib/`                    | קוד משותף לכלל האפליקציה (קונפיגורציה, env, utilities, שירותי Email/PDF).                                                        |
| `docs/`                   | תיעוד מלא של המערכת (מבנה, פיתוח, עיצוב, מדריכים נקודתיים).                                                                      |
| `design/`                 | קבצי handoff, אסטים מ-Figma והפקות עיצוב שאינן נבנות לפרודקשן.                                                                   |
| `public/`                 | נכסים סטטיים זמינים בפרונטאנד (לוגואים, פונטים, תמונות OG, קבצי Manifest).                                                       |
| `app/styles/`             | קבצי CSS גלובליים משלימים מחוץ ל-Tailwind (neumorphism וכו').                                                                    |
| `prisma/`                 | סכמת בסיס נתונים עתידית (`schema.prisma`) – משמשת לתכנון ואינה מחוברת כרגע ל-prod.                                               |
| `tests/`                  | בדיקות E2E עם Playwright (`e2e/smoke.spec.ts`) ובסיס להרחבה.                                                                     |
| `components/`             | קומפוננטות UI משותפות מחוץ ל-App Router (לדוגמה `Card`, `IconButton`) לשימוש חוזר בין פיצ'רים.                                   |
| `setup-folders.js`        | סקריפט Postinstall שמוודא שכל תיקיות החובה קיימות (למשל `public/email`) לפני ריצה מקומית או ב-CI.                                |
| `instrumentation*.ts`     | קבצי אינסטרומנטציה ל-Sentry (client/server/edge) ו-Hooks גלובליים שנקראים בזמן ריצת Next.js.                                     |
| `tailwind.config.ts`      | קונפיגורציית Tailwind (שימוש בטוקנים, ערכות צבע, Container ושבירת מסכים RTL).                                                    |
| `eslint.config.mjs`       | הגדרות ESLint Flat Config – כולל המרות מגרסאות ישנות באמצעות `FlatCompat` ותוספים ייעודיים.                                      |
| `tsconfig.json`           | תצורת TypeScript מאוחדת לכל מקורות הקוד, כולל Aliases לנתיבים כמו `@features/*` ו-`@lib/*`.                                      |
| `package.json` / `pnpm-*` | תלויות הפרויקט, סקריפטים (`pnpm dev`, `pnpm lint` וכו') וקבצי נעילה ששומרים על גרסאות עקביות בין סביבות.                         |
| `vercel.json`             | הגדרות Deployment ל-Vercel (Redirects, Edge Functions, Preview/Production).                                                      |
| `README.md`               | שער כניסה לפרויקט – קישור למסמכי ההמשך, רשימת דרישות מערכת ותהליך Setup מהיר.                                                    |
| `CONTRIBUTING.md`         | כללי תרומת קוד, סטייל גייד, בדיקות חובה לפני פתיחת PR.                                                                           |
| `OWNER-GUIDE.md`          | הנחיות תפעול לבעלת המוצר (ניהול גרסאות, תקלות חירום, תהליכי שחרור).                                                              |
| `CHANGELOG.md`            | יומן גרסאות – נכתב ידנית בעברית במבנה SemVer לאחר כל שחרור.                                                                      |
| `playwright.config.ts`    | קונפיגורציה ל-Playwright (Browsers, נתיבי בדיקות, בסיס URL).                                                                     |

---

## פירוט מלא לפי נתיב

### `features/`

- `wealth-code/` – מודול הדגל. כל קובץ ממופה לפיצ'ר דומייני:
  - `constants.ts` – משייך URLים מהמערכת המרכזית (`app/lib/routes.ts`) ומייצא סוגי תשלום/ולידציה כדי לאפשר שימוש אחיד בראוטים ובכללים.
  - `data/`
    - `codeStructures.ts` – טקסטים קבועים המתארים את שלושת מבני הקוד (Master/Repeating/Diverse).
    - `dailyApplication.ts` – תזכורות תרגול יומי המושתלות בלשוניות הדוח.
    - `digitInterpretations.ts` – מאגר תוכן עיקרי: לכל ספרה מוגדרים תיאור, מתנות, אתגרים ופעולות מומלצות.
  - `components/`
    - `sections/` – כל שלב בפאנל (Hero, Calculator, Result, Sales, Interpretations, ThankYou) + קבצי CSS צמודים; מבטיח הפרדה בין UI לתוכן.
    - `shared/` – רכיבים נומורפיים משותפים (כרטיסים, אינסרטים).
    - `ui/tabs.tsx` – רכיב לשוניות מונגש, מקבל disable של חוקי ESLint ספציפיים.
    - `SendEmailButton.tsx` – קומפוננטת Client עם סטטוס טעינה/שגיאה שמפעילה שליחת מייל דרך ה-API.
    - `index.ts` – Barrel exports שמאפשרים `import { Hero } from "@features/wealth-code"`.
  - `email/`
    - `WealthEmail.ts` – בונה HTML מלא כולל Preheader, כפתורי שיתוף וקישורי וואטסאפ.
    - `template.ts` – re-export מסודר של פונקציות הבנייה (HTML, subject, preheader).
  - `layout/PageWrapper.tsx` – alias אל `app/components/layout/PageLayout.tsx` לשמירת תאימות (אין פריסה ייעודית שונה).
  - `pdf/`
    - `WealthReport.tsx` – קומפוננטת React PDF שמציגה דוח אישי בעברית.
    - `generate.ts` – מייצר Buffer + Base64 לשימוש באימיילים והורדות.
  - `utils/`
    - `numerology.ts` – אלגוריתם חישוב הקוד (כולל ניקוי קלט, מפות אותיות, זיהוי Master numbers).
    - `email.ts` – קריאות fetch ליצירת PDF ולשליחת מייל עם Timeout מובנה ו-cleanup לצרופות.
    - `share.ts` – Web Share API + fallback לוואטסאפ.
    - `index.ts` / `algorithm.ts` – Barrel exports ששומרים תאימות לקוד ישן.

### `components/`

- `ui/Card.tsx` – קומפוננטת מעטפת נומורפית כללית (shadow tokens, padding ברירת מחדל).
- `ui/IconButton.tsx` + `IconButton.module.css` – כפתור אייקון עגול עם Focus Ring ו-Hover scale.
- `ui/index.ts` – Barrel export להורדת מסלולי import כפולים.

### `lib/`

- השורש `lib/` משמש כקומפטביליות לאחור: `lib/utils/index.ts` מייצא מחדש מתוך `app/lib/utils/*` כדי שלא לשבור חבילות חיצוניות.
- הקוד האקטיבי יושב תחת `app/lib/`:
  - `constants.ts` – אוסף קבועים גלובליים (Brand, Social, Pricing, Typography). כל שינוי תוכן מתועד כאן ולא מפוזר בקומפוננטות.
  - `env.ts` – טעינת Environment + `requireEnv` להבטחת זמינות משתנים.
  - `routes.ts` – מקור אמת לנתיבים + פונקציות עזר (`buildUrl`, `getResultUrl`).
  - `utils/`
    - `base64.ts`, `file.ts` – עיבוד base64 לשילוב PDF במיילים.
    - `format.ts` – פונקציות פורמט (תאריכים, מטבע, טלפון, אימות Email, copyToClipboard).
    - `theme.ts`, `cn.ts` – Utilities לניהול Theme ולחיבור classNames.
  - `email/transport.ts` – שכבת שליחה עם fallback (Resend → SMTP) וניקוי קבצים מצורפים.
  - `email/wealth.ts` – שירות דומייני: ולידציה לקוד, ניהול TEST mode, בניית HTML.
  - `core/`
    - `branding.ts` – פרטי המותג (שם, disclaimer, URL) לשימוש חוזר ב-PDF/Email/Share.
    - `email/` – בסיס HTML משותף לכל המיילים (`BaseEmailTemplate.ts`, `styles.ts`, README להסבר).
    - `pdfConfig.ts` – רישום פונטים (Assistant) והגדרות צבע/פריסה למסמכי PDF.
    - `index.ts` – Barrel exports כדי לצרוך בקלות (`import { registerHebrewFonts } from "@/lib/core"`).
  - `pdf/WealthReport.tsx` – דוח PDF גנרי שניתן לשימוש גם מחוץ לפיצ'ר Wealth.
  - `neu-styles.ts` – חישוב צללים וטיפוגרפיה נומורפיים כטוקנים.
  - `navigation.tsx` – re-export של `NavigationProvider` ממיקום חדש, מונע שגיאת import קיימת.

### `docs/`

- `README.md` – אינדקס למסמכים.
- `PROJECT_STRUCTURE.md` – המסמך הנוכחי (מקור אמת – אין לעדכן כפילויות במסמכים אחרים).
- `DEVELOPMENT.md` – הוראות סביבת dev, משתני סביבה, סקריפטים.
- `BRANCHING.md` – Workflow Git (כולל Solo Mode ללא PRs).
- `ARCHITECTURE.md` – תיאור זרימות נתונים ומדיניות Server/Client.
- `guides/` – מדריכים מקצועיים: Email/PDF, TikTok Pixel, spacing לבית.
- מסמכי הקלט (`MIGRATION-PROGRESS.md`, `STANDARD-PAGE-LAYOUT-MIGRATION.md`) מתעדים רפקטורים – לא לשכפל תוכן שלהם במקומות אחרים.

### `design/`

- `figma/` – יצואי רכיבים, מסכים וטוקנים מהעיצוב (לא נכנסים לדיפלוימנט).
- `handoff/` – PDF/notes שמועברים למפתחים. נשמרים כחלק מהידע ההיסטורי.
- סקריפט `setup-folders.js` מוודא שהתיקיות קיימות גם בסביבות CI.

### `public/`

- אייקונים (`abyk-icon-*.png`, `אייקון.png`) – משמשים למסכי בית, favicon ו-PWA.
- `brand/` – לוגואים רשמיים (כולל גיבוי).
- `email/` – לוגו בפורמט מותאם אימייל.
- `fonts/Assistant /` – משקלים סטטיים ו-Variable של Assistant (נצרך ב-PDF ובמיילים). יש לשמור על שם התיקייה עם הרווח להמשכיות.
- `og/` – תמונות שיתוף; קבצי `.bak` נשמרים כגיבוי.
- `manifest.webmanifest` – קובע שם האפליקציה, theme color ואייקונים.

### `prisma/`

- `schema.prisma` – מודל משתמש → רכישות (כולל output ל-`lib/generated/prisma`). כרגע לא מחובר ל-prod אך מייצג את התכנון הרשמי.

### `tests/`

- `e2e/smoke.spec.ts` – בדיקת עשן בעברית (טעינת דפי בית/פרטיות/תנאים, בדיקת Alt scope). מרחיבה עם בדיקות נוספות תחת `tests/e2e/`.

### קבצים תומכי תשתית

- `setup-folders.js` – סקריפט bootstrap: יוצר תיקיות חובה, README לכל ספרייה, סורק barrel files ומייצר `scripts/dev-check.js`.
- `scripts/dev-check.js` (נוצר אוטומטית) – ריצה מהירה: `tsc --noEmit`, `eslint`, בדיקת barrel files.
- `instrumentation.ts` / `instrumentation-client.ts` – הגדרות Sentry עם דגימות שונות ל-Node/Edge.
- `sentry.server.config.ts` / `sentry.edge.config.ts` – הגדרות השלמה לסביבות השונות.
- `tailwind.config.ts` – מגדיר פריסת נומורפיזם, breakpoints (`xs`), ו-Prose RTL.
- `postcss.config.mjs` – תומך ב-nesting ויציבות Tailwind.
- `eslint.config.mjs` – Flat config עם הקלות ממוקדות.
- `tsconfig.json` + `types.d.ts` – path aliases, טיפוסים גלובליים, תמיכה ב-SVG/MD.
- `package.json` / `pnpm-lock.yaml` – רשימות תלויות וסקריפטים (dev/build/lint/test:e2e).
- `playwright.config.ts` – הגדרות Playwright (דפדפנים, baseURL, קונפיג שפייה).
- `vercel.json` – Redirects, headers (למשל noindex ל-`/alt`).

---

## app/ — שכבת ה-UI והראוטינג

- משתמש ב-App Router של Next.js 15.
- מחולק לקבוצות Route Groups לצרכים שונים.

### Route Groups

| תיקייה             | תיאור                                                                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `app/(marketing)/` | דפי קמפיין ונחיתה.                                                                                                                        |
| `app/(funnels)/`   | תהליך המחשבון המלא: `calculator → interpretations → result → sales → thank-you`. כל שלב מחולק לקומפוננטת Client נפרדת עבור אינטראקטיביות. |
| `app/(legal)/`     | עמודי מדיניות: `privacy`, `terms`.                                                                                                        |
| `app/(labs)/`      | ניסויים והדגמות. ניתן להשבית ב-production דרך משתנה סביבה.                                                                                |

### שורש `app/`

| קובץ          | תפקיד                                                 |
| ------------- | ----------------------------------------------------- |
| `layout.tsx`  | מעטפת כללית לכל העמודים (Providers, פונט, SEO בסיסי). |
| `page.tsx`    | דף הבית שמרכיב את שלבי הפאנל לפי המצב.                |
| `globals.css` | הגדרות Tailwind v4 + שכבת Neumorphism גלובלית.        |

### API Routes

| מסלול                     | קובץ                             | תפקיד                                                        |
| ------------------------- | -------------------------------- | ------------------------------------------------------------ |
| `POST /api/generate-pdf`  | `app/api/generate-pdf/route.ts`  | יוצר PDF מותאם אישית ומחזיר base64.                          |
| `POST /api/send-email`    | `app/api/send-email/route.ts`    | שולח מייל דרך Resend/Nodemailer ומשתמש בתבנית ה-Wealth Code. |
| `POST /api/webhooks/grow` | `app/api/webhooks/grow/route.ts` | קולט אירועי תשלום מפלטפורמת Grow ומפעיל את הפייפליין.        |

---

## features/ — מודולים עסקיים

תיקיית `features/` מכילה כל Feature דומייני בתור חבילה אוטונומית (UI, נתונים, PDF, Email וכו'). נכון לאוקטובר 2025 קיים מודול יחיד:

### `features/wealth-code/`

| תת-תיקייה      | תפקיד                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------- |
| `components/`  | UI ספציפי לפאנל העושר. כולל חלוקה לקטעי עמודים (`sections/`), כפתורי פעולה וקומפוננטות עזר. |
| `constants.ts` | מילונים, טקסטים קבועים והגדרות המוצגות למשתמש.                                              |
| `data/`        | נתוני מקור לחישובים (לוחות, מיפויים, תיאורי קוד).                                           |
| `email/`       | תבניות ותצורת HTML למיילים ייעודיים ל-Wealth Code.                                          |
| `layout/`      | מבני פריסה חוזרים (כרטיסים, wrappers) עבור המסכים השונים.                                   |
| `pdf/`         | קומפוננטות PDF + פונקציות `generate` היודעות להרכיב מסמך עם תמיכה בעברית.                   |
| `utils/`       | פונקציות דומייניות: חישוב קוד, שיתוף, שליחת מיילים וכדומה.                                  |

> כאשר מודול חדש נדרש, משכפלים את מבנה התיקייה הזה, מעדכנים תכולה רלוונטית ומרכיבים את הפיצ'ר דרך ה-Route Groups ב-`app/`.

---

## lib/ — שכבת ליבה משותפת

הספרייה מיועדת לקוד שאינו תלוי בדומיין ספציפי אך משרת את כל האפליקציה.

| מיקום              | תיאור                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------- |
| `lib/constants.ts` | ערכי קונפיגורציה חוצי מערכת (שם המותג, מחירים, קישורים).                                     |
| `lib/env.ts`       | טעינת משתני סביבה עם בדיקות סוג.                                                             |
| `lib/routes.ts`    | שמות נתיבים מרוכזים לשימוש ברכיבים ולניווט.                                                  |
| `lib/index.ts`     | Barrel exports כדי להקל על ייבוא חיצוני.                                                     |
| `lib/utils/`       | פונקציות עזר כלליות (base64, פורמט תאריכים, עבודה עם קבצים).                                 |
| `lib/email/`       | שירותי שליחה: `transport.ts` (Resend/Nodemailer) ו-`wealth.ts` (פייפליין שליחת המייל הראשי). |
| `lib/core/`        | תצורות מותג וכלים משותפים (פירוט בהמשך).                                                     |

**lib/core פירוט:**

- `branding.ts` — צבעים, לוגו וטקסטים גלובליים.
- `email/` — תבנית המייל הבסיסית (Header/Footer, כפתורים, סגנון משותף).
- `pdfConfig.ts` — הגדרות טיפוגרפיה וצבע ל-PDF.
- `index.ts` — Barrel exports למציאת המשאבים האלו בקלות.

---

## docs/ — תיעוד

- `README.md` — אינדקס המסביר מה יש בכל מסמך.
- `PROJECT_STRUCTURE.md` — המסמך הנוכחי, מקור האמת למבנה הפרויקט.
- `DEVELOPMENT.md` — מדריך התקנה והרצה.
- `BRANCHING.md` — Git workflow והגנות על production.
- `ARCHITECTURE.md` — תיאור ארכיטקטוני וטכני מעמיק.
- `guides/` — מדריכים נקודתיים (Email/PDF, עיצוב, TikTok Pixel ועוד).

> כל מסמך חדש צריך להתווסף לתיקייה זו ולהיות מקושר מ-`docs/README.md`.

---

## design/

- קבצי handoff, assets ותוצרים מ-Figma.
- תת-תיקיות כמו `figma/`, `handoff/` ו-`tokens/` מחזיקות קבצים לכלים חיצוניים.
- התיקייה אינה נפרסת לייצור אך שומרת על עקביות בין צוות העיצוב לפיתוח.

---

## public/

| תת-תיקייה              | תיאור                                   |
| ---------------------- | --------------------------------------- |
| `brand/`               | לוגואים, אייקונים ושאר נכסי מותג.       |
| `email/`               | אסטים המוטמעים במיילים (תמונות, רקעים). |
| `fonts/`               | קבצי הפונט Assistant (טווח משקלים מלא). |
| `og/`                  | תמונות שיתוף לרשתות חברתיות.            |
| `manifest.webmanifest` | תצורת PWA בסיסית לדפדפנים.              |

---

## app/styles/

- `neumorphism.css` — שכבת CSS משלימה שאינה תלויה ב-Tailwind, בעיקר לאפקטים מיוחדים.
- נטען לפי צורך מתוך רכיבים או דפים ספציפיים.

---

## prisma/

- `schema.prisma` — מגדיר את מבנה הנתונים העתידי. כרגע משמש כבסיס לתכנון ואינו מחובר לפרודקשן.

---

## tests/

- `e2e/smoke.spec.ts` — בדיקת עשן עם Playwright שמוודאת שהנתיב המרכזי נטען ונגיש.
- ניתן להוסיף קבצי בדיקה נוספים תחת תיקייה זו לפי תרחישים נדרשים.

---

## סקריפטים וקבצים חשובים בשורש

| קובץ                 | תפקיד                                                                   |
| -------------------- | ----------------------------------------------------------------------- |
| `package.json`       | מנהל התלויות, סקריפטים (dev, build, test, lint).                        |
| `pnpm-lock.yaml`     | נועל גרסאות תלויות.                                                     |
| `tsconfig.json`      | הגדרות הקומפילציה של TypeScript לכל הפרויקט.                            |
| `tailwind.config.ts` | קונפיגורציית Tailwind CSS.                                              |
| `eslint.config.mjs`  | כללי ESLint מותאמים.                                                    |
| `setup-folders.js`   | רץ כחלק מ-postinstall ומוודא שתיקיות חובה קיימות (למשל `public/email`). |
| `vercel.json`        | קונפיגורציית דיפלוימנט ל-Vercel.                                        |

---

## איך לעדכן את המסמך הזה

1. בצעו את השינוי במבנה התיקיות או בקובץ מרכזי.
2. עדכנו את התיאור הרלוונטי כאן (במידת הצורך הוסיפו סעיף חדש).
3. הריצו `pnpm lint` כדי לוודא שאין שגיאות Markdown.
4. בצעו commit עם הודעה בסגנון `docs: refresh project structure`.

> שמירה על המסמך הזה מעודכן מבטיחה שאין כפילויות הסבר ושהצוות כולו עובד עם אותה אמת.
