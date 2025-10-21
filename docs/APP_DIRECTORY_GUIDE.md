# מדריך תיקיית `app`

המסמך מסביר את כל הקבצים והתיקיות תחת `app/` לפי תפקודם במערכת.

## קבצים בשורש `app/`

- `fonts.ts` – רישום גופן Assistant באמצעות Next Font כדי להטעין משקלים לטינית/עברית עם משתנה CSS.
- `global-error.tsx` – קומפוננטת שגיאה כללית (Client) הלוכדת חריגות דרך Sentry ומציגה מסך שחזור נגיש בעברית.
- `globals.css` – סגנון בסיסי לכל האפליקציה: הגדרות נוומורפיק, משתני צבע, טיפוגרפיה ו־RTL.
- `HomePageClient.tsx` – קומפוננטת Client האחראית לאינטראקטיביות של דף הבית (שיתוף, ניווט, אייקונים).
- `layout.tsx` – Root layout של Next.js: מגדיר `<html dir="rtl">`, בונה את שלד ה־App Shell, Side Menu ו־Header, ומייצא מטא־דאטה וסכמה של themeColor תוך שימוש ב־NavigationRoot.
- `not-found.tsx` – עמוד 404 מותאם RTL עם קישורים נוומורפיים לחזרה למסע.
- ~~`page.module.css` – סגנונות עמוד הבית~~ (נמחק ב־2025-10-21 לאחר העברה ל־`design/themes/pages/home.css`).
- `page.tsx` – עמוד Server שמרנדר את `HomePageClient` כדי לצמצם JS צד לקוח ולשמר SEO.
- `app/styles/neumorphism.css` – קובץ עזר עם מחלקות Utilities נוומורפיות (raised/inset וכו') המשמש את רכיבי העיצוב במערכת.

## תיקיית `(funnels)/`

- `README.md` – תיעוד פנימי לזרימת הפאנל (calculator → interpretations → result → thank-you).
- `_components/FunnelPage.tsx` – עטיפת Client אחידה המבוססת על `StandardPageLayout` עבור עמודי הפאנל.
- `calculator/page.tsx` – קומפוננטת Server שמרנדרת את `CalculatorPageClient`.
- `calculator/CalculatorPageClient.tsx` – קומפוננטת Client שמחשבת את הקוד ומפנה לעמוד התוצאות דרך `getResultUrl`.
- `layout.tsx` – עטיפת Server לקבוצת הפאנלים המוסיפה מזהי data ואכיפת מבנה אחיד.
- `interpretations/page.tsx` – קומפוננטת שרת שמוודאת פרמטר `code` ומפנה למחשבון אם חסר.
- `interpretations/InterpretationsPageClient.tsx` – עמוד לקוח העוטף את רכיב הפרשנויות עם `FunnelPage` ומאפשר חישוב נוסף.
- `result/page.tsx` – קומפוננטת שרת שמחלצת את הקוד מה־URL ומטעינה את דף התוצאה.
- `result/ResultPageClient.tsx` – עמוד לקוח המציג את רכיב התוצאה וניווט לעמוד המכירה באמצעות `FunnelPage`.
- `sales/page.tsx` – שרת שמקבל קוד אופציונלי ומעבירו לרכיב הלקוח.
- `sales/SalesPageClient.tsx` – עמוד לקוח המציג את הצעת המכירה (`SalesPage`) עם עטיפת `FunnelPage`.
- `thank-you/page.tsx` – קומפוננטת שרת שמקבלת קוד (אם קיים) ומטעינה את עמוד התודה.
- `thank-you/ThankYouPageClient.tsx` – עמוד לקוח ששומר את הקוד ב־sessionStorage, מאפשר צפייה בהסברים נוספים או חישוב חדש בתוך `FunnelPage`.

## תיקיית `(legal)/`

- `README.md` – הנחיות לשמירת דפי מדיניות ותנאים בקבוצה זו.
- `privacy/page.tsx` – עמוד שרת למדיניות פרטיות המשתמש בפריסת `StandardPageLayout` ומרנדר את תוכן `TermsPrivacy`.
- `terms/page.tsx` – עמוד שרת לתנאי שימוש המממש את אותו רכיב `TermsPrivacy` לקבלת תוכן זהה.

## תיקיית `api/`

- `generate-pdf/route.ts` – Route API בצד השרת שמקבל קוד/שם, מייצר PDF בעזרת `generateWealthReportPdfBase64` ומחזיר Base64.
- `send-email/route.ts` – Route API ששולח מיילים דרך `dispatchWealthEmail`, כולל טיפול בשגיאות Transport.
- `webhooks/grow/route.ts` – מאזין Webhook למערכת Grow: מאמת סוד, מפענח קוד/מייל, מייצר PDF ושולח מייל רב־שלבי.

## תיקיית `components/`

### `analytics/`

- `TikTokPixel.tsx` – קומפוננטת Client שמזריקה את סקריפט הפיקסל רק לאחר הסכמת קוקיז ושומרת על תאימות טיפוסית.

### `layout/`

- `AppShell.tsx` – מעטפת Client המנהלת ניווט, התאמת פריסות מובייל, ופוקוס על Header/Footer.
- ~~`CookieConsent.module.css`~~ – הוסר; הסגנונות זמינים ב־`design/themes/cookie-consent.css`.
- `CookieConsent.tsx` – ספק/קומפוננטה לניהול הסכמה לקוקיז והצגת ה־UI המתאים.
- `DrawerProvider.tsx` – Context Client לפתיחת/סגירת התפריט הצדדי במובייל.
- ~~`HeaderBar.module.css` – סגנונות פס הניווט העליון~~ (נמחק; הסגנונות קיימים ב־`design/themes/layout-header.css`).
- `HeaderBar.tsx` – רכיב Client המשלב לוגו, כפתורי ניווט, וטריגר לתפריט.
- ~~`NavigationButtons.module.css`~~ – הוסר יחד עם רכיב הניווט הישן.
- ~~`NavigationButtons.tsx`~~ – הוסר כדי למנוע בלבול מול העיצוב הנוכחי.
- `PageLayout.tsx` – קומפוננטת עזר לפריסות כלליות עם שילוב SideMenu ו־Header.
- ~~`PageShell.module.css`~~ – הוסר; הסגנונות זמינים ב־`design/themes/layout-shell.css`.
- `PageShell.tsx` – מעטפת תוכן המשמשת דפים פנימיים שאינם משתמשים ב־StandardPageLayout.
- ~~`SideMenu.module.css`~~ – הוסר; הסגנונות זמינים כעת ב־`design/themes/side-menu.css`.
- `SideMenu.tsx` – קומפוננטת Client לתפריט הניווט הצדדי והקישורים לפיצ׳רים.
- `SocialIcons.tsx` – רשימת אייקונים חברתיים לשימוש בפריסות השונות.
- `SocialLinks.tsx` – קישורים חברתיים בפורמט כפתורי עזר (מופיע בעיקר ב־StandardPageLayout).
- ~~`SplashScreen.module.css`~~ – הוסר יחד עם הקומפוננטה.
- ~~`SplashScreen.tsx`~~ – קומפוננטת splash legacy שנמחקה מהמערכת.
- `StandardPageLayout.tsx` – פריסת Client רב־פעמית לעמודים (טיפוגרפיה, גבולות רוחב, קישורים חברתיים מותנים; הסגנונות ב־`design/themes/layout-standard-page.css`).
- `drawerConstants.ts` – קבועים משותפים לניהול מצבי Drawer ו־SideMenu.
- `index.ts` – אוגדן ייצוא לרכיבי הפריסה המרכזיים.
- `useThemePreference.ts` – hook לקביעת Theme (בהיר/כהה) בהתבסס על העדפת המשתמש/ת והמערכת.

### `providers/`

- `NavigationProvider.tsx` – NavigationRoot ו־hooks לניהול overrides של ניווט (מופעלים מה־AppShell).
- `index.ts` – ריכוז ייצוא של ספקי ה־Context.

### `lib/`

- `neomorphism-styles.ts` – אוסף מחלקות/פונקציות JS לייצור סגנונות נוומורפיים, כולל handlers להובר/לחיצה.

### `neu/`

- `Button.tsx` – רכיב כפתור כללי עם תמיכה ב־variant/size/אייקון (סגנונות גלובליים: `design/themes/components/button.css`).
- `Card.tsx` – קומפוננטת כרטיס בסיסית עם מחלקות נוומורפיות משותפות.
- `IconButton.tsx` – רכיב כפתור אייקון עם hover/active נוומורפי (סגנונות גלובליים: `design/themes/components/icon-button.css`).
- `README.md` – מדריך שימוש ברכיבי נו.
- `index.ts` – ייצוא מרוכז של הכפתור, כרטיס והאייקון.
- `design/themes/neumorphic.css` – מחלקות CSS נאומורפיות מאוחדות (החליף את `app/components/neu/neumorphic-shadows.css`).

### `sections/`

- `DesignShowcase.tsx` – עמוד ניסויי (Client) המדגים כרטיסים, כפתורים, אייקונים וטיפוגרפיה בנוומורפיזם.
- `Hero.tsx` – מקטע Hero שיווקי לעמודי מכירה/בית עם CTA מובנה.
- `TermsPrivacy.tsx` – מקטע טקסט משפטי החוזר בעמודי תנאים ופרטיות (סגנונות גלובליים: `design/themes/sections/terms-privacy.css`).
- `index.ts` – ייצוא מרוכז של רכיבי המקטעים.

### `shared/`

- `NeuButton.tsx` – קומפוננטת CTA זהובה מותאמת עם אנימציות ומצבי נוומורפיזם.
- `README.md` – תיעוד קצר לפטרנים משותפים.
- `ThemeToggle.module.css` – **נמחק**; הסגנונות זמינים ב-`design/themes/widgets/theme-toggle.css`.
- `ThemeToggle.tsx` – קומפוננטת Client להחלפת theme (אור/חושך) תוך שימוש בטוקנים.
- `icons.tsx` – אוסף אייקונים מותאמים/ממוחזרים.
- `index.ts` – ייצוא מרוכז של רכיבי shared.
- `neumorphic.module.css` – מחלקות עזר משותפות להצללות/ריווחים נוומורפיים.
- `ui/Button.tsx` – רכיב כפתור פשוט לגישת UI פונקציונלית (שונה מהנוומורפי הבולט).
- `ui/Card.tsx` – כרטיס בסיסי ל־UI סטנדרטי.
- `ui/Field.tsx` – מעטפת שדה טופס עם תוויות ושגיאות.
- `ui/Input.tsx` – רכיב שדה טקסט מבוסס Native מותאם RTL.
- `ui/Stack.tsx` – רכיב עזר לפריסות Stack במרווחים אחידים.
- `ui/index.ts` – איסוף ייצוא של רכיבי UI המשותפים.

## תיקיית `lib/`

- `constants.ts` – מרכז מותג, תוכן, ונתיבי API (מייבא `routes` לשמירת מקור אמת יחיד).
- `core/branding.ts` – ערכי מיתוג (שמות, תיאורים, סלוגנים) לצרכים רוחביים.
- `core/email/`:
  - `BaseEmailTemplate.ts` – תבנית React בסיסית לכל המיילים (RTL + נוומורפי).
  - `README.md` – מדריך קצר ליצירת תבניות מייל חדשות.
  - `index.ts` – חשיפת הפונקציות/תבניות החוצה.
  - `styles.ts` – טבלת סגנונות Inline לשמירה על תאימות מייל.
- `core/index.ts` – ייצוא מאוחד של מודולי הליבה.
- `core/pdfConfig.ts` – קונפיגורציית PDF (גופנים, צבעים, RTL) ל־React PDF.
- `email/transport.ts` – הגדרת משלוח מייל (Resend ↔️ Nodemailer) בהתאם למשתני סביבה.
- `email/wealth.ts` – יצירת והפצת מייל קוד העושר, כולל ניהול שגיאות מותאם.
- `env.ts` – קריאת משתני סביבה ציבוריים ותקפותם.
- `index.ts` – ייצוא מודולרי של כלי `lib` לשימוש ברחבי האפליקציה.
- `navigation.tsx` – Provider והוקים לניווט מותאם (שמירת היסטוריה, נעילת גלילה וכו').
- `navigation.tsx` – רה-אקספורט אל ספק הניווט שנמצא תחת `app/components/providers` לשמירת תאימות אחורה.
- `neu-styles.ts` – מיפוי CSS-in-JS של נוומורפיזם לשימוש בתוך רכיבים (לדוגמה DesignShowcase). **הוצא משימוש - השתמש ב-design/tokens/**
- `pdf/WealthReport.tsx` – קומפוננטת React PDF שמייצרת את דוח קוד העושר ב־RTL.
- `routes.ts` – מקור האמת של נתיבי הניווט (כולל פונקציות עזר ליצירת URLs דינמיים).
- `utils/base64.ts` – המרות Base64 כולל strip headers.
- `utils/cn.ts` – Helper לשרשור מחלקות (Tailwind-compatible).
- `utils/fetcher.ts` – עטיפת Fetch טיפוסית עם טיפול בשגיאות JSON.
- `utils/file.ts` – כלים לעבודה עם קבצים (למשל הורדה בצד הלקוח).
- `utils/format.ts` – פונקציות עזר לפורמט תאריכים/מספרים בעברית.
- `utils/index.ts` – ייצוא אוגד של עזרי ה־utils.
- `utils/theme.ts` – פונקציות לשליטה בצבעי theme והוספת מחלקות מצב.

## תיקיית `api/` (המשך במבנה הפנימי)

> כבר פורט למעלה; אין קבצים נוספים בתתי־תיקיות מעבר למה שצוין.

## תיקיית `app/styles/`

- `neumorphism.css` – (כאמור לעיל) מחלקות Utilities נוומורפיות המשמשות גם מחוץ לרכיבי המעבדה.

## תתי־תיקיות נוספות

- `components/README.md` אינו קיים (מנוהל דרך המסמך הזה); יתר התיקיות שצוינו לעיל הן המקור להשקה מלאה של ה־App.
