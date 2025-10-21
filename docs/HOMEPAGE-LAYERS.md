# תיעוד שכבות – עמוד הבית ותפריט הצד

## סקירה כללית

- עמוד הבית משתמש ב־`hero-shell` הגלובלי, בכרטיסי נאומורפיה ובכפתורי `NeuButton` צרכניים.
- תפריט הצד בנוי משתי מעטפות (Rail צר + Drawer רחב) על גבי שכבת רקע משותפת, וכל כפתור נשען על אותם טוקנים גלובליים של מרווחים, צבעים וצללים.
- הטוקנים המרכזיים מוגדרים ב־`app/globals.css` תחת `:root`, ומשם נגזרים כל הרדיוסים, המרווחים והצבעים.

## טוקנים גלובליים רלוונטיים

| שם טוקן                                                                                            | מקור                                                                             | שימוש מרכזי                          |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------ |
| `--card-stack-gap`, `--card-padding-base`, `--card-padding-desktop`                                | `app/globals.css`                                                                | מרווחים פנימיים לכרטיסים בעמוד הבית  |
| `--button-padding-inline`, `--button-padding-block`, `--button-height`                             | `app/globals.css`                                                                | כל הכפתורים, כולל תפריט הצד וה־CTA   |
| `--secondary-card-max-width`, `--secondary-card-width`                                             | `app/globals.css`                                                                | רוחב מקסימלי/אפקטיבי לכרטיסים משניים |
| `--card-notch-size`, `--card-notch-size-sm`, `--card-notch-radius`                                 | `app/globals.css`                                                                | ממדי השקע לאייקונים מעל כותרות       |
| `--card-icon-lg-size`, `--card-icon-lg-radius`, `--card-icon-sm-size`, `--card-icon-sm-radius`     | `app/globals.css`                                                                | ואריאציות גדלים לשימוש ברכיבים שונים |
| `--neu-card`                                                                                       | `app/globals.css`                                                                | צבע רקע לכרטיסי נאומורפיה            |
| `--shadow-raised`, `--shadow-raised-strong`, `--shadow-raised-emphasis`, `--shadow-inset-strong`   | `app/globals.css` + `design/tokens/shadows.css` + `design/themes/neumorphic.css` | צללות נאומורפיות                     |
| `--neu-gold-signature`, `--neu-accent`, `--neu-accent-dark`, `--neu-accent-light`                  | `design/tokens/tokens.css` (מיובא דרך `design/index.css`)                        | צבעי זהב לעיטור, כפתורים ואייקונים   |
| `--heading-h1-size`, `--paragraph-base-size`, `--heading-paragraph-gap`, `--heading-subtitle-size` | `app/globals.css`                                                                | טיפוגרפיה בעמוד הבית והכרטיס המשני   |

## עמוד הבית (`app/HomePageClient.tsx`, `app/page.module.css`)

### תרשים שכבות (מבחוץ פנימה)

1. **`<main class="hero-shell page">`**
   - מקור כללי: `app/globals.css` (מחלקת `hero-shell`) + `app/page.module.css` (`.page`).
   - מרווחים: `padding-block` = `--home-page-padding-block`, `padding-inline` = `--home-page-padding-inline` שמוגדרים כ־`clamp` בהתאם לרוחב.
   - צבעים: לוקח את `var(--background)` עם RTL מובנה.
   - ייעוד: מעטפת בטיחות המטפלת ב־Safe-Area, גובה מסך מלא והזזת קבוצות ה־Hero (`data-hero-group`).
2. **`div.content`**
   - רוחב מרבי `min(100%, --home-content-max-width)`.
   - יוצר עמודת תוכן ב־`flex-column` עם מרווח `--home-section-gap`.
3. **`section.heroSection`**
   - עוטף את כרטיס ההרואי ומבטיח רוחב מלא.
4. **`Card.heroCard`** (רכיב `Card` עם `padding="none"` + מחלקה יעודית)
   - מרווחים: `padding-block`/`inline` = `--card-padding-base` (או `--card-padding-desktop` מ־768px ומעלה).
   - צבעים: `var(--neu-card)` (רקע), טקסט `var(--neu-text-primary)`.
   - צל: `var(--shadow-raised-strong)`.
   - ייעוד: כרטיס היכרות ראשי עם אייקון, כותרת וכפתור.
5. **`div.heroIcon`**
   - מבנה מבוסס טוקנים (`--card-notch-size`, `--card-notch-radius`) עם `box-shadow: var(--shadow-inset-strong)`.
   - צבעי אייקון: `var(--neu-accent)` על רקע `var(--neu-card)`.
6. **`div.heroContent`**
   - מרווחי טקסט: `gap = --heading-paragraph-gap`.
   - טיפוגרפיה: `h1` נלקח מהטוקנים הגלובליים, `p` משתמש ב־`--paragraph-base-size`.
7. **`NeuButton.heroCta`**
   - וריאנט `cta` עם `box-shadow: var(--shadow-raised)` וגובה `var(--button-height)`.
   - במידה רחבה (`md+`): `min-width = --button-min-width-desktop`.
8. **`section.shareSection > Card.shareCard`**
   - כרטיס משני עם רוחב נשלט טוקנית (`--secondary-card-width`).
   - משתמש באותם טוקנים של `--card-stack-gap` ו־`--card-padding-base`.
   - אייקון משני (`.shareIcon`) מבוסס `--card-notch-size-sm` ו־`--card-notch-radius` עם צל שקוע (`--shadow-inset-strong`).
   - כפתור משני (`NeuButton` וריאנט `secondary`).
9. **`section` לרשתות חברתיות**
   - מכיל את `SocialLinks` (רכיב משותף). משתמש בטוקנים גלובליים למרווחים וצללים עגולים (ראו `app/components/layout/SocialLinks.tsx`).

### נקודות מפתח

- כל החוצצים והכרטיסים מבוססים על טוקנים גלובליים, כך שעדכון אחד יחלחל לכל העמוד.
- ה־Hero והכרטיס המשני שניהם מנוטרלים מרוחבים קשיחים ומנוהלים באמצעות `clamp`.
- הכפתורים משתמשים באותם פדינגים של `--button-padding-inline/block`, שהוגדרו לאחרונה לערך קבוע.
- טיפוגרפיית הכרטיס המשני (`--heading-subtitle-size`) מתרחבת באופן רספונסיבי באמצעות `clamp` כדי להתאים למסכים גדולים.

## תפריט הצד (`app/components/layout/SideMenu.tsx`, `design/themes/side-menu.css`)

### מעטפת חיצונית

1. **`.backdrop`**
   - מיקום: פיקס, מכסה את כל המסך.
   - צבע: `var(--overlay-glass-scrim)` עם `backdrop-filter` של `var(--overlay-glass-blur)`.
   - זיקה: `z-index = var(--z-overlay, 120)`.
   - תפקיד: כיבוי קליק חיצוני והחשכת הרקע.
2. **`.rail`** (תפריט צר) + **`.railSurface`**
   - גודל: `width = clamp(56px, 13vw, 68px)`.
   - padding: `clamp(0.9rem, 3vw, 1.25rem)` סביב הכפתורים.
   - צבע: `var(--neu-card)`, צללים מנוטרלים (`box-shadow: none`).
   - `railSurface` מביא חלוקה אנכית ו־`gap` זהה ל־`railNav`.
3. **`.drawer`** (תפריט רחב)
   - גודל: `width = clamp(270px, 72vw, 312px)`.
   - padding פנימי: `clamp(2rem, 6vw, 2.4rem)` לאורך, `clamp(1.2rem, 3.5vw, 1.6rem)` לרוחב.
   - צבע ורקע: `var(--neu-card)`, ללא צל בסיסי כדי להישאר נקי.
   - מצב פתוח נשלט בעזרת `data-open` + `transform`/`pointer-events`.

### שכבות פנימיות – Rail

| שכבה                             | מרווחים                                            | צבעים                       | ייעוד                    | טוקנים                                                           |
| -------------------------------- | -------------------------------------------------- | --------------------------- | ------------------------ | ---------------------------------------------------------------- |
| `.railNav`                       | `gap = clamp(0.45rem, 1.8vw, 0.75rem)`             | רקע שקוף                    | רשימת כפתורי גישה מהירה  | `--button-padding-inline/block`, `--shadow-raised` דרך הכפתורים  |
| `.railAction`                    | פדינג גלובלי לכפתור, גודל `clamp(44px, 8vw, 52px)` | `var(--card)` + צל נאומורפי | לחצן סמל יחיד            | צללים `--shadow-raised`, צבע פעיל `color-mix` עם `--neu-accent`  |
| `.railThemeToggle`/`.railExpand` | כמו `.railAction` אך עגולים                        | `var(--neu-accent)`         | פתיחת Drawer, החלפת נושא | `--shadow-raised-emphasis`, צבע טקסט `var(--primary-foreground)` |

### שכבות פנימיות – Drawer רחב

| שכבה                            | מרווחים/מידות                                                                                     | צבעים                            | ייעוד                     | טוקנים ושימוש                                                                               |
| ------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------- |
| `.content`                      | `display: flex` אנכי, גובה מלא                                                                    | שקוף                             | מעטפת כללית לכל התוכן     | נשען על padding של `.drawer`                                                                |
| `.header`                       | `gap` = `clamp(0.75rem, 2.5vw, 1rem)`                                                             | קו תחתון הוסר, צבע טקסט לפי מותג | מיתוג + כפתור סגירה       | כפתור סגירה משתמש ב־`--shadow-raised`                                                       |
| `.closeButton`                  | פדינג גלובלי של כפתור, `width/height clamp(46px, 8vw, 52px)`                                      | `var(--card)`                    | סגירת Drawer              | צל `--shadow-raised`, צבע `var(--primary)` לאייקון (מוגדר ברכיב)                            |
| `.navList`                      | `gap` כמו ה־Rail, `padding-inline` = `clamp(calc(var(--button-padding-inline) * 2), 5vw, 1.5rem)` | שקוף                             | רשימת קישורים מלאה        | יר inherits tokens                                                                          |
| `.navAction`                    | רוחב `clamp(220px, 64vw, 260px)`                                                                  | שקוף                             | עוטף כרטיס לחיץ           | הורשה                                                                                       |
| `.navSurface`                   | `min-height clamp(48px, 9vw, 56px)`, `gap clamp(0.2rem, 1vw, 0.35rem)`                            | רקע `var(--card)`                | כפתור נאומורפי עם טקסט    | צל `--shadow-raised`, במצב פעיל צבע רקע `--neu-accent-dark` (או `--neu-accent-light` בדארק) |
| `.navIcon`                      | גודל `clamp(46px, 8.5vw, 54px)`                                                                   | צבע בסיסי `var(--primary)`       | מקום לאייקון Lucide       | צבע פעיל מותאם, ללא צל מגביל                                                                |
| `.navLabel`                     | טיפוגרפיה: `font-size clamp(0.82rem, 2vw, 0.92rem)`                                               | יורש מהכפתור                     | טקסט ניווט                | משתמש ב־`letter-spacing 0.08em`                                                             |
| `.footer` (דרך `styles.footer`) | מרווח עליון אוטומטי                                                                               | שקוף                             | חתימת מותג וקישורי אימייל | נשען על טיפוגרפיה גלובלית                                                                   |

### מצבי תאורה ופעולה

- מצב פעיל בתפריט הרחב משנה את רקע הכפתור והאייקון בהתאם למצב תאורה (`var(--neu-accent-dark)` מול `var(--neu-accent-light)`).
- תצורת הכפתורים הצרים והרחבים משתמשת באותו פדינג ורדיוס, כך שהתחושה הוויזואלית אחידה.
- כל האינטראקציות (hover/active/focus) נשענות על צללי נאומורפיה מוגדרים מראש (`--shadow-raised-hover`, `--shadow-inset-pressed`) כדי לשמור על עקביות התחושתית.

## טיפים לתחזוקה

- **Token-first בכל מקום:** שינוי בטוקן יחיד (`--button-*`, `--card-*`, `--neu-*`, `--space-*`) מתעדכן אוטומטית בכל השכבות. העדיפו לגעת בטוקנים לפני שינוי מחלקות או קבצי Module CSS.
- **קוהרנטיות בין Rail ל־Drawer:** השתמשו באותם טוקנים של רדיוס, גובה ופדינג לכל וריאנט של כפתורי התפריט. כך נשמרת תחושה עקבית בין המעטפת הצרה למגירה הרחבה.
- **RTL-safe כברירת מחדל:** המשיכו להשתמש בפרופרטיז לוגיים (`padding-inline`, `margin-inline`, `inset-block`) ובאייקונים המגיבים ל־RTL. הימנעו מ־`left/right` כדי למנוע באגים במעברי כיוון.
