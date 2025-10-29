# סיכום תיעוד מלא | Full Documentation Summary

**תאריך יצירה:** 26.10.2025  
**גרסה:** 1.0

---

## 📚 מסמכי תיעוד זמינים

### 1. מסמכי מקור אמת (Root Documentation) - תיקיית `doc/`

| מסמך                 | נושא                             | מתי להשתמש                 |
| -------------------- | -------------------------------- | -------------------------- |
| **doc/RULES.md**     | כללים גלובליים                   | תמיד - לפני כל שינוי       |
| **doc/COLORS.md**    | מערכת צבעים מלאה                 | לפני כל שינוי צבע          |
| **doc/DESIGN.md**    | ניאומורפיזם, טיפוגרפיה, אנימציות | לפני עיצוב/סטייל חדש       |
| **doc/STRUCTURE.md** | מבנה HTML, טקסטים מדויקים        | לפני עריכת עמוד/קומפוננטה  |
| **doc/LOGIC.md**     | Routing, PWA, Performance        | לפני שינוי טכני/ארכיטקטורה |

### 2. מסמכי עזר (Helper Documentation) - שורש הפרויקט

| מסמך                         | נושא                | תוכן                            |
| ---------------------------- | ------------------- | ------------------------------- |
| **TYPOGRAPHY-COLORS.md**     | טבלת התייחסות מהירה | 15 כיתות טיפוגרפיה + פלטת צבעים |
| **DOCUMENTATION-SUMMARY.md** | מסמך זה             | מפת תיעוד + סיכום עבודות        |

---

## 🎨 מערכת עיצוב | Design System

### טיפוגרפיה (Typography System)

**15 כיתות סמנטיות:**

1. **PageTitle** - כותרת עמוד ראשית (2.5rem, fw:600)
2. **SectionTitle** - כותרת סקשן (2rem, fw:600)
3. **CardTitle** - כותרת כרטיס (1.5rem, fw:600)
4. **CardSubtitle** - תת-כותרת כרטיס (1.25rem, fw:600)
5. **LeadText** - טקסט מוביל (1.25rem, fw:500)
6. **BodyText** - טקסט גוף (1rem, fw:500)
7. **SmallText** - טקסט קטן (0.875rem, fw:500)
8. **LegalNote** - הערה משפטית (0.75rem, fw:400)
9. **BtnText** - טקסט כפתורים (1.125rem, fw:600)
10. **LabelText** - תווית טופס (0.9rem, fw:600)
11. **HintText** - טקסט הסבר (0.875rem, fw:400)
12. **NavLink** - קישור ניווט (1rem, fw:500)
13. **FooterText** - טקסט פוטר (0.875rem, fw:400)
14. **BadgeText** - טקסט תג (0.8rem, fw:600)
15. **DisplayLarge** - תצוגה גדולה (3rem, fw:600)

### צבעים (Color Palette)

**Light Mode:**

- Background: `#EEF2F5` (RGB: 238, 242, 245)
- Surface: `#F5F5F5` (RGB: 245, 245, 245)
- Accent: `#1C3B70` (RGB: 28, 59, 112)
- Text Primary: `#333333` (RGB: 51, 51, 51)
- Text Secondary: `#666666` (RGB: 102, 102, 102)

**Dark Mode:**

- Background: `#1A1A1A` (RGB: 26, 26, 26)
- Surface: `#2A2A2A` (RGB: 42, 42, 42)
- Accent: `#4A90E2` (RGB: 74, 144, 226)
- Text Primary: `#EEEEEE` (RGB: 238, 238, 238)
- Text Secondary: `#AAAAAA` (RGB: 170, 170, 170)

### ניאומורפיזם (Neumorphism)

**צללית מוגבהת מינימלית:**

```css
--neu-shadow-raised-min: 4px 4px 8px rgba(0, 0, 0, 0.1), -2px -2px 6px rgba(255, 255, 255, 0.7);
```

**צללית מוגבהת:**

```css
--neu-shadow-raised: 6px 6px 12px rgba(0, 0, 0, 0.15), -4px -4px 10px rgba(255, 255, 255, 0.8);
```

---

## 📱 עמודים מוגמרים | Completed Pages

### 1. עמוד הבית | `index.astro`

**מבנה:**

- Hero Card (כותרת + תיאור + CTA)
- Share Card (תיאור שיתוף + כפתור)
- Social Grid (4 כפתורים: WhatsApp, Instagram, TikTok, Gmail)

**סטטוס:** ✅ מוגמר ומוגן

---

### 2. מחשבון קוד העושר | `tools/wealth-code/calculator.astro`

**מבנה:**

- כותרת PageTitle
- LeadText הסבר
- יומן עברי (HebrewCalendar component)
- כפתור חישוב

**סטטוס:** ✅ מוגמר ומוגן

---

### 3. עמוד תוצאה | `tools/wealth-code/result.astro`

**מבנה:**

- PageTitle עם קוד מלא
- 3 כרטיסי ResultCard:
  1. Personal Code (קוד אישי)
  2. Growth Code (קוד צמיחה)
  3. Soul Code (קוד נשמה)

**סטטוס:** ✅ מוגמר ומוגן

---

### 4. פירושים מלאים | `tools/wealth-code/interpretations.astro`

**מבנה:**

- PageTitle
- InterpretationsTabs component
- 9 טאבים (1-9) עם פירוש לכל ספרה

**סטטוס:** ✅ מוגמר

---

### 5. עמוד צור קשר | `contact.astro`

**מבנה:**

- PageTitle: "צור קשר"
- LeadText: תיאור
- Share Card
- 4 כרטיסי רשת חברתית:
  - Instagram (32px icon)
  - TikTok (40px icon)
  - WhatsApp (36px icon)
  - Email (32px icon)

**אייקונים:** SVG inline עם `stroke-width="1"`

**סטטוס:** ✅ מוגמר

---

### 6. עמוד תנאים משפטיים | `legal.astro`

**מבנה:**

- PageTitle: "תנאי שימוש ומדיניות פרטיות"
- 3 כרטיסים:
  1. **תנאי שימוש** (5 תת-סעיפים)
  2. **מדיניות פרטיות** (6 תת-סעיפים)
  3. **עדכוני התנאים** (2 פסקאות)

**סטטוס:** ✅ מוגמר

---

### 7. עמוד התחברות | `login.astro`

**מבנה:**

- LoginForm component
- טופס התחברות עם email + password

**סטטוס:** ✅ מוגמר

---

### 8. עמוד הרשמה | `signup.astro`

**מבנה:**

- SignupForm component
- טופס הרשמה עם שם + email + password

**סטטוס:** ✅ מוגמר

---

## 🧩 קומפוננטות מוגמרות | Completed Components

| קומפוננטה      | קובץ                 | תיאור                        | סטטוס   |
| -------------- | -------------------- | ---------------------------- | ------- |
| Header         | `Header.tsx`         | לוגו + תפריט נפתח            | ✅ מוגן |
| Footer         | `Footer.tsx`         | 4 כפתורים קבועים + side menu | ✅ מוגן |
| HebrewCalendar | `HebrewCalendar.tsx` | יומן עברי לבחירת תאריך       | ✅ מוגן |
| ResultCard     | `ResultCard.tsx`     | כרטיס תוצאת קוד עושר         | ✅ מוגן |
| ShareButton    | `ShareButton.tsx`    | כפתור שיתוף (Web Share API)  | ✅ מוגן |
| CookieConsent  | `CookieConsent.tsx`  | חלון הסכמה לקוקיז            | ✅ מוגן |
| ThemeToggle    | `ThemeToggle.tsx`    | מעבר בין מצב בהיר/כהה        | ✅ מוגן |
| LoginForm      | `LoginForm.tsx`      | טופס התחברות                 | ✅ פעיל |
| SignupForm     | `SignupForm.tsx`     | טופס הרשמה                   | ✅ פעיל |

---

## 🔒 כללי הגנה | Protection Rules

### קבצים מוגנים מלאים (אסור לשנות כלל):

1. `wealth-code/data/**` - כל קבצי התוכן המקצועי
2. `src/content/wealth-code/**` - העתקים של התוכן
3. `src/pages/index.astro` - עמוד הבית
4. `src/pages/tools/wealth-code/calculator.astro` - מחשבון
5. `src/pages/tools/wealth-code/result.astro` - תוצאה
6. `src/components/ResultCard.tsx` + `ResultCard.css` - כרטיס תוצאה
7. `src/components/HebrewCalendar.tsx` + `HebrewCalendar.css` - יומן
8. `src/components/Footer.tsx` + `Footer.css` - פוטר + תפריט צד
9. `src/components/CookieConsent.tsx` + `cookie-consent.css` - קוקיז

### ניתן לשנות רק:

✅ צבעים - **רק אם המשתמש מבקש במפורש**

---

## 📐 כללים גלובליים | Global Rules

### שפה ופנייה

**פנייה ישירה (CTA, כפתורים):**

- ✅ רבים בלבד: "גלו", "שתפו", "הירשמו", "בחרו"
- ❌ לא יחיד: "גלה", "שתף", "הירשם"

**תיאורים כלליים:**

- ✅ ניטרלי: "קוד העושר האישי" (ללא "שלכם")
- ❌ לא אישי: "קוד העושר שלכם" בתיאורים

### יישור טקסט

✅ **כל הטקסטים למרכז** (`text-align: center`)

### טיפוגרפיה

- ✅ כפתורים: `font-weight: 600`
- ✅ טקסט רגיל: `font-weight: 500`
- ✅ כותרות: `font-weight: 600`

### אייקונים

- ✅ SVG inline בלבד
- ✅ `stroke-width="1"` תמיד
- ❌ אין אימוג'ים (למעט חלון קוקיז)

### RTL

- ✅ `dir="rtl"` על כל המכולות
- ✅ `text-align: center` על כל הטקסטים

---

## 🛠️ כלים טכניים | Technical Stack

### מנהל חבילות

✅ **pnpm** בלבד (לא npm או yarn)

**פקודות נפוצות:**

```bash
pnpm dev              # הפעלה מקומית
pnpm dev --host       # הפעלה ברשת (לבדיקה בטלפון)
pnpm install          # התקנת תלויות
pnpm build            # בנייה לפרודקשן
pnpm outdated         # בדיקת עדכונים
pnpm update           # עדכון תלויות
```

### ספריות מותקנות

- **iconoir-react** 7.11.0 - אייקונים דקים (1px stroke)
- **@react-pdf/renderer** 4.3.1 - יצירת PDF
- **tailwindcss** 3.4.18 - CSS framework
- **astro** - framework ראשי

---

## ✅ Checklist לפני commit

- [ ] בדקתי עדכונים זמינים (`pnpm outdated`)
- [ ] לא שיניתי קבצים ב-`data/`
- [ ] כל הטקסטים מיושרים למרכז
- [ ] כל הפניות הישירות ברבים
- [ ] תיאורים כלליים ללא "שלכם/שלך"
- [ ] כל הכפתורים `font-weight: 600`
- [ ] בדקתי התנגשויות אלמנטים
- [ ] בדקתי ניגודיות צבעים (4.5:1 מינימום)
- [ ] בדקתי תצוגה במכשירים שונים

---

## 📚 איך להשתמש במסמכים?

### תרחיש 1: צריך לשנות צבע

1. קרא `doc/COLORS.md` - הבן את מערכת הצבעים
2. עדכן ב-`src/styles/tokens.css` - RGB variables
3. בדוק ניגודיות (4.5:1 מינימום)
4. תעד ב-`TYPOGRAPHY-COLORS.md` אם נוסף צבע חדש

### תרחיש 2: צריך לערוך עמוד

1. קרא `doc/STRUCTURE.md` - מצא את העמוד
2. קרא `doc/RULES.md` - ודא שאתה עומד בכללים
3. בדוק אם העמוד מוגן (רשימה למעלה)
4. אם מוגן - שנה **רק צבעים** אם התבקש

### תרחיש 3: צריך להוסיף קומפוננטה

1. קרא `doc/DESIGN.md` - הבן את שפת העיצוב
2. קרא `doc/RULES.md` - כללי טיפוגרפיה, RTL, אייקונים
3. השתמש ב-`TYPOGRAPHY-COLORS.md` להתייחסות מהירה
4. תעד ב-`doc/STRUCTURE.md` אחרי סיום

### תרחיש 4: צריך לשנות routing או PWA

1. קרא `doc/LOGIC.md` - הבן את הארכיטקטורה
2. בדוק `src/lib/routes.ts` - מבנה הניתוב
3. עדכן `manifest.json` אם נדרש
4. תעד שינויים ב-`doc/LOGIC.md`

---

## 📞 פרטי קשר ותמיכה

**Ksenia Chudnovskaya**  
Instagram: [@awakening_by_ksenia](https://instagram.com/awakening_by_ksenia)  
TikTok: [@awakening_by_ksenia](https://tiktok.com/@awakening_by_ksenia)  
Email: info@abyk.online

---

**סוף מסמך DOCUMENTATION-SUMMARY.md**
