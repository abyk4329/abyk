# מיגרציית סגנונות למערכת העיצוב (design/) – Manifest

עודכן: 2025-10-20

מטרה: לאחד את כל הסגנונות למקור אמת יחיד תחת `design/` כדי למנוע כפילויות וחוסר התאמה בין עמודים. התהליך יתבצע בשלבים: מיפוי → העברה/איחוד → סימון כלא פעיל (Deprecated) → מחיקה לאחר בדיקות.

הערות כלליות

- טוקנים, צללים, טיפוגרפיה ואנימציות – כבר מרוכזים ב־`design/tokens/*` ונמשכים דרך `design/index.css` (מיובא ב־`app/globals.css`).
- מחלקות נאומורפיה כלליות – ב־`design/themes/neumorphic.css`.
- CSS Modules ספציפיים לפיצ׳ר/מסך – ייבחנו: אם מכילים דפוסים כלליים, נשבורם ל־utilities/themes; אחרת נשאירם כ־module, אך נשאב מתוכם טוקנים/מחלקות שחוזרות.
- טוקנים, צללים, טיפוגרפיה ואנימציות – כבר מרוכזים ב־`design/tokens/*` ונמשכים דרך `design/index.css` (מיובא ב־`app/globals.css`).
- מחלקות נאומורפיה כלליות – ב־`design/themes/neumorphic.css`.
- CSS Modules ספציפיים לפיצ׳ר/מסך – ייבחנו: אם מכילים דפוסים כלליים, נשבורם ל־utilities/themes; אחרת נשאירם כ־module, אך נשאב מתוכם טוקנים/מחלקות שחוזרות.

אג’נדה להפעלה

1. לאתר דפוסים משותפים בקובצי ה־module ולהעבירם ל־`design/themes/*` או `design/utils/*`.
2. להשאיר חוקים ייחודיים למסכים כ־CSS Modules לצורך בידוד, אך להסתמך על טוקנים ו־utilities בלבד.
3. אחרי כל העברה – לסמן את הקובץ המקורי כ־Deprecated (כותרת קובץ) עד מחיקה.

מצב: אלא אם צוין אחרת – Pending. קבצים שכבר סומנו כ־Deprecated: `app/components/neu/neumorphic-shadows.css`, `app/tokens.css`.

## רשימת קבצים לפי קטגוריה

### A. Global & Base

### B. App Shell & Layout

| מקור                     | יעד מוצע                    | פעולה                 | מצב         | הערות                                                                                           |
| ------------------------ | --------------------------- | --------------------- | ----------- | ----------------------------------------------------------------------------------------------- |
| app/components/layout/\* | design/themes/layout-\*.css | Consolidate utilities | In-Progress | layout-standard-page.css נוסף וחובר דרך design/index.css; overlay פעיל ב־StandardPageLayout.tsx |

| app/components/layout/CookieConsent.module.css | design/themes/cookie-consent.css | Extract shared banner/modal/buttons semantics (overlay) | Done | 2025-10-21: הקובץ נמחק; הרכיב צורך רק מחלקות cookie\* גלובליות |

| מקור                                 | יעד מוצע | פעולה                                                                                                                                | מצב  | הערות                                                                |
| ------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---- | -------------------------------------------------------------------- |
| app/alt/page.tsx + AltPageClient.tsx | N/A      | הוספת מסלול Alt לבדיקות: מטא noindex/nofollow + referrer no-referrer, לקוח שמיישם alt-scope ו-data-alt-theme על body (וניקוי ביציאה) | Done | next.config.js: הוגדרו headers ל-`/alt`; נועד לבידוד בדיקות עשן בלבד |

### C. Neumorphic Components

- app/components/neu/Button.module.css → יעד: design/themes/components/button.css — הושלם 2025-10-21 (המודול נמחק; `Button.tsx` משתמש במחלקות `btn-*` גלובליות)
- app/components/neu/IconButton.module.css → יעד: design/themes/components/icon-button.css — הושלם 2025-10-21 (המודול נמחק; `IconButton.tsx` משתמש במחלקות `icon-button-*` גלובליות)
- app/components/neu/neumorphic-shadows.css → Deprecated (הוחלף ע״י design/themes/neumorphic.css + design/tokens/shadows.css)

### D. Shared Sections / Pages

- app/components/sections/TermsPrivacy.module.css → יעד: design/themes/sections/terms-privacy.css — הושלם 2025-10-21 (המודול נמחק; `TermsPrivacy.tsx` צורך מחלקות `terms-*`)
- app/page.module.css → יעד: design/themes/pages/home.css (hero card/icon well/CTA) — נמחק 2025-10-21 (כל הסגנונות מנוהלים בקובץ ה־theme)

### E. Funnels – Wealth Code

- app/(funnels)/\_components/wealth-code/sections/BirthdatePicker.module.css → יעד: design/themes/wealth-code/birthdate-picker.css — הושלם 2025-10-20 (כל המחלקות הועברו ל־wealthBirthdate\*, המודול נמחק)
- app/(funnels)/\_components/wealth-code/sections/Calculator.module.css → יעד: design/themes/wealth-code/calculator.css — הושלם 2025-10-20 (המודול נמחק; משתמשים רק במחלקות design)
- app/(funnels)/\_components/wealth-code/sections/Interpretations.module.css → יעד: design/themes/wealth-code/interpretations.css — הושלם 2025-10-20 (המחלקות פועלות דרך theme, המודול נמחק)
- app/(funnels)/\_components/wealth-code/sections/Result.module.css → יעד: design/themes/wealth-code/result.css — הושלם 2025-10-20 (רכיבי Result צורכים רק את מחלקות העיצוב)
- app/(funnels)/\_components/wealth-code/sections/SalesPage.module.css → יעד: design/themes/wealth-code/sales.css — הושלם 2025-10-20 (מחלקות הועברו ל־wealthSales\*, המודול נמחק)
- app/(funnels)/\_components/wealth-code/sections/ThankYou.module.css → יעד: design/themes/wealth-code/thank-you.css — הושלם 2025-10-20 (מחלקות הועברו ל־wealthThankYou\*, המודול נמחק)
- app/(funnels)/\_components/wealth-code/shared/CodeInset.module.css → יעד: design/themes/wealth-code/code-inset.css — הושלם 2025-10-20 (הקומפוננטה עושה שימוש ב־wealthCodeInset\*, המודול נמחק)

### F. Auth – Login

- app/(funnels)/login/LoginForm.module.css → יעד: design/themes/auth/login-form.css
- app/(funnels)/login/LoginPage.module.css → יעד: design/themes/auth/login-page.css

### G. Shared Widgets

- app/components/shared/ThemeToggle.module.css → יעד: design/themes/widgets/theme-toggle.css — נמחק 2025-10-21 (הסגנונות זמינים כעת במחלקות גלובליות בלבד)

## טבלת מעקב (מצב/פעולה)

| מקור                                                | יעד מוצע                                 | פעולה                                                   | מצב        | הערות                                                                               |
| --------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------- | ---------- | ----------------------------------------------------------------------------------- |
| app/globals.css                                     | נשאר                                     | Verify imports only design/index.css + add reset import | Pending    | לאחד resets וטוקנים גלובליים                                                        |
| app/reset.css                                       | נשאר                                     | Import דרך globals.css                                  | Pending    | שמירת סדר האיפוס                                                                    |
| app/tokens.css                                      | design/tokens/\*                         | Already moved; mark Deprecated                          | Deprecated | כותרת DEPRECATED נוספה                                                              |
| app/components/neu/neumorphic-shadows.css           | design/themes/neumorphic.css             | Replace; mark Deprecated                                | Deprecated | כותרת DEPRECATED נוספה                                                              |
| app/components/neu/Button.module.css                | design/themes/components/button.css      | Extract shared classes; keep module hooks               | Done       | המודול הוסר; Button.tsx נסמך על מחלקות `.btn-*`                                     |
| app/components/neu/IconButton.module.css            | design/themes/components/icon-button.css | Extract shared                                          | Done       | המודול הוסר; IconButton.tsx משתמש במחלקות `icon-button-*`                           |
| app/components/layout/\*                            | design/themes/layout-\*.css              | Consolidate utilities                                   | Prep       | Placeholders נוצרו, טרם חיבור צרכנים                                                |
| app/components/layout/StandardPageLayout.module.css | design/themes/layout-standard-page.css   | Extract shared spacing vars + container/content         | Partial    | overlay: standardPageContainer/standardPageContent; הקובץ סומן Deprecated (Partial) |
| app/page.module.css                                 | design/themes/pages/home.css             | Port hero patterns                                      | Removed    | נמחק 2025-10-21; כל מחלקות hero/share זמינות ב־`design/themes/pages/home.css`       |
| app/components/layout/HeaderBar.module.css          | design/themes/layout-header.css          | Extract header patterns + overlay                       | Removed    | נמחק 2025-10-21; כל המחלקות קיימות ב־`design/themes/layout-header.css`              |
| app/components/sections/TermsPrivacy.module.css     | design/themes/sections/terms-privacy.css | Port inset                                              | Done       | המודול הוסר; TermsPrivacy.tsx משתמש במחלקות `.terms-*`                              |
| wealth-code/\*.module.css                           | design/themes/wealth-code/\*.css         | Extract common, keep feature specifics                  | Pending    | להימנע משבירת בידוד                                                                 |
| app/components/shared/ThemeToggle.module.css        | design/themes/widgets/theme-toggle.css   | Port                                                    | Removed    | 2025-10-21: הקובץ נמחק לאחר וידוא; ThemeToggle.tsx משתמש במחלקות הגלובליות          |

## כללי סימון כלא פעיל (Deprecated)

אחרי העברה של חוקים/מחלקות ל־design/:

1. מוסיפים כותרת קובץ בתחילת ה־CSS: `DEPRECATED – moved to design/...` + תאריך.
2. משאירים את הקובץ לשבוע/ספרינט לאימות רגרסיות.
3. מוחקים לאחר שה־E2E והבדיקות הידניות עוברים.

## בדיקות ואיכות

- E2E: להריץ `pnpm test:e2e:smoke` אחרי כל צרור מיגרציות. מצב נוכחי: 12 passed / 3 skipped לאחר הוספת מסלול Alt והרחבת תמת CookieConsent; מאושר שוב לאחר מחיקת app/tokens.css ו־app/components/neu/neumorphic-shadows.css.
- ידני: עמוד הבית, מחשבון, תוצאות, דף מכירה, Thank You, Login – בדיקת RTL, פוקוס, קונטרסט.
- Bundle: לוודא שאין יבוא כפול של מחלקות (globals כפולים), ובמיוחד צללים/טוקנים.

## צעדים מיידיים (Sprint)

1. להוסיף `@import './reset.css'` ב־`app/globals.css` (אם טרם קיים) – יישור איפוסים.
2. ✅ הסתיים – `page.module.css` נמחק והמחלקות זמינות רק ב־`design/themes/pages/home.css`.
3. לאחד לחצני ניווט/כפתורים תחת `design/themes/components/*.css` ולהישען על 3 סוגי הכפתורים המוגדרים.
4. לסמן כ־Deprecated את הקבצים שהועברו; לעדכן מסמך זה במצב "Migrated".

## מחיקות שבוצעו (2025-10-20 → 2025-10-21)

- app/tokens.css — נמחק. הוחלף ע"י `design/tokens/tokens.css` ונצרך דרך `design/index.css`.
- app/components/neu/neumorphic-shadows.css — נמחק. הוחלף ע"י טוקני צל + `design/themes/neumorphic.css`.
- app/components/neu/Button.module.css — נמחק. הסגנונות עברו ל־`design/themes/components/button.css`.
- app/components/neu/IconButton.module.css — נמחק. הסגנונות עברו ל־`design/themes/components/icon-button.css`.
- app/components/sections/TermsPrivacy.module.css — נמחק. הסגנונות עברו ל־`design/themes/sections/terms-privacy.css`.
- app/components/layout/CookieConsent.module.css — נמחק. ההטמעה משתמשת ב־`design/themes/cookie-consent.css`.
- app/components/layout/SideMenu.module.css — נמחק. הסגנונות זמינים ב־`design/themes/side-menu.css`.
- app/components/layout/NavigationButtons.tsx + NavigationButtons.module.css — Legacy ניווט הוסר לחלוטין.
- app/components/layout/SplashScreen.tsx + SplashScreen.module.css — מסך הפתיחה הישן הוסר מהמוצר.
- app/globals.css.backup — נמחק. נותר רק `app/globals.css` הרשמי.
