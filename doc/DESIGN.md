# מערכת העיצוב | DESIGN SYSTEM

מסמך מאוחד לכללי עיצוב, ניאומורפיזם, טיפוגרפיה, אנימציות ונגישות  
**גרסה:** 4.1 (Typography Classes Update + Color Changes)  
**תאריך:** 27 אוקטובר 2025

**עדכון מהותי בגרסה 4.1:**

- הוספת מחלקות טיפוגרפיה חדשות: Title, LongTitle, LongSubtitle, FocusText, FocusTextLabel
- שינוי צבע LeadText ל-#C29494 (rose-gray) בשני המצבים
- שינוי צבע BigNote לצבע הכותרות (--color-heading)
- Title מחליפה את CardTitle ככותרת ראשית (משקל 600, גודל גדול יותר)
- CardTitle נשמרת לתאימות אחורה
- תיעוד מלא של 20 מחלקות טיפוגרפיה

**עדכון מהותי בגרסה 4.0:**

- כל הכותרות עם line-height 0.9–1.0 בלבד (צפוף וחזק)
- כל הכותרות עם סקייל רספונסיבי מובייל→דסקטופ
- כל ה-margins עם spacing tokens בלבד
- תיעוד מלא של היררכיה והכללים

---

## 🚨 הצהרת עקרונות מחייבים

### כלל זהב: Override = Bug

**כל סטייה מהמערכת המוגדרת במסמך זה נחשבת באג ולא וריאציה.**

❌ **איסורים מוחלטים:**

1. **אסור להשתמש ב-inline styles** (`style=""`) על אלמנטים
2. **אסור להגדיר צבעים ידנית** (hex, rgb) במקום טוקנים
3. **אסור ליצור override מקומי** בקומפוננטה ספציפית
4. **אסור לשנות יישור טקסט מלמרכז** (כל הטקסטים `text-align: center` - למעט טקסט משפטי בלבד)
5. **אסור ליצור סוגי כפתורים חדשים** מעבר ל-4 המוגדרים
6. **אסור להשתמש בגרדיאנטים** בשום מקום באתר
7. **אסור להשתמש ב-line-height מעל 1.0 בכותרות** (טווח מותר: 0.9–1.0)
8. **אסור להגדיר margin-bottom ידני** בכותרות (רק spacing tokens)
9. **אסור להגדיר font-size קבוע** בכותרות (רק responsive scale)
10. **אסור padding אופקי מתחת ל-16px בכרטיסים** (מינימום מוחלט)
11. **אסור padding קבוע בכרטיסים** לכל המסכים (חייב להיות רספונסיבי)
12. **אסור להשתמש ב-flex-wrap** על אלמנטים שחייבים להישאר בשורה אחת (מספרי קוד, כפתורי ניווט מספרים)
13. **אסור להשתמש ב-text-align: right או justify** (רק `text-align: center` בכל האתר)

✅ **הדרך הנכונה:**

- שנה את הטוקן הגלובלי → כל המערכת מתעדכנת
- השתמש במחלקות CSS קיימות
- אם חסר משהו → הוסף למערכת הגלובלית, לא locally

**דוגמה לבאג:**

```css
/* ❌ באג - override מקומי */
.my-special-button {
  background: #ff5733; /* צבע ידני */
  font-size: 22px; /* גודל ידני */
  text-align: right; /* יישור שגוי */
}
```

```css
/* ✅ נכון - שימוש במערכת */
.btn-cta {
  background: var(--btn-cta-bg);
  font-size: var(--text-base);
  text-align: center;
}
```

---

## 📐 עקרונות בסיס

### Background == Surface

שיטה ייחודית שלנו:

- **רקע ומשטח זהים לחלוטין** - אותו צבע בדיוק
- **עומק נוצר רק דרך צללים** - ללא גבולות, ללא הבדלי צבע
- **צללים מינימליים** - 2px offset למקסימום עדינות

### אין גרדיאנטים - איסור מוחלט

**כלל קריטי:** באתר זה **אסור** להשתמש בגרדיאנטים בשום צורה.

❌ **איסורים:**

- `linear-gradient()`
- `radial-gradient()`
- `conic-gradient()`
- כל סוג gradient אחר

✅ **חלופה:**

- צבעים מלאים (solid colors) בלבד
- שכבות מרובות עם `opacity` שונה אם צריך עומק

**למה?**

- גרדיאנטים יוצרים רעש ויזואלי
- הם סותרים את העיצוב הניאומורפי הנקי
- צבעים מלאים נראים יותר אלגנטיים ומודרניים

**חריג היסטורי שבוטל:**

```css
/* ❌ זה היה בעבר - כבר לא תקף! */
.btn-cta {
  background: linear-gradient(135deg, ...); /* אסור! */
}

/* ✅ נכון עכשיו */
.btn-cta {
  background: var(--btn-cta-bg); /* צבע מלא */
}
```

**כל קוד gradient ישן שנמצא הוא באג שצריך לתקן.**

### יישור טקסט למרכז - כלל מוחלט

**חוק קריטי:** כל הטקסטים באתר מיושרים למרכז (`text-align: center`).

✅ **חובה למרכז:**

- **כותרות (H1-H6):** תמיד למרכז
- **פסקאות:** תמיד למרכז
- **כפתורים:** טקסט למרכז
- **כרטיסים:** תוכן למרכז
- **תפריט צד:** פריטים למרכז
- **טפסים:** תוויות ושדות למרכז
- **הערות:** SmallNote, BigNote - תמיד למרכז

❌ **אסור:**

- `text-align: right`
- `text-align: left`
- `text-align: justify`

🔓 **חריג יחיד - טקסט משפטי:**

רק מחלקה **אחת** מותרת לשבור את הכלל:

```css
/* ✅ חריג מותר */
.LegalNote {
  text-align: right; /* רק לטקסט משפטי/חוקי */
}
```

**כל שימוש אחר ב-`text-align: right/left` נחשב באג.**

**למה?**

- מראה אחיד ואלגנטי
- עיצוב סימטרי ומאוזן
- קלות קריאה בעברית RTL

**דוגמה נכונה:**

```css
/* ✅ נכון */
h1,
h2,
h3,
h4,
h5,
h6,
p,
.menu-item,
.btn {
  text-align: center;
}

/* ✅ חריג מותר */
.LegalNote {
  text-align: right;
}

/* ❌ באג - אסור */
h1 {
  text-align: right;
}

.my-component p {
  text-align: left; /* באג! */
}
```

---

### אלמנטים שחייבים להישאר בשורה אחת - ללא flex-wrap

**חוק קריטי:** אלמנטים מסוימים חייבים להישאר בשורה אחת גם במסכים קטנים.

✅ **חובה ללא wrap (תמיד בשורה אחת):**

- **מספרי קוד העושר** (4 ספרות) - תצוגת הקוד בראש עמוד הפירושים
- **כפתורי ניווט מספרים** (1, 2, 3, 9...) - שורה ראשונה בטאבים
- **אלמנטים קריטיים** שחייבים להישאר מסודרים אופקית

❌ **אסור:**

```tsx
/* ❌ באג - flex-wrap גורם למספרים לקפוץ לשורה שנייה */
<div className="flex flex-wrap gap-3">
  {code.split('').map(digit => ...)}
</div>
```

✅ **נכון:**

```tsx
/* ✅ נכון - ללא wrap, תמיד בשורה אחת */
<div className="flex gap-3">
  {code.split('').map(digit => ...)}
</div>
```

**מבנה נכון לכפתורי ניווט:**

```tsx
/* ✅ שורה 1: מספרים בלבד - ללא wrap */
<div className="flex gap-2">
  {uniqueDigits.map(digit => <button className="flex-1">{digit}</button>)}
</div>

/* ✅ שורה 2: יישום יומי - ברוחב מלא */
<button className="w-full">יישום יומי</button>
```

**למה?**

- שמירה על מבנה ויזואלי עקבי
- מניעת שבירות בלתי צפויות במסכים קטנים
- חוויית משתמש אחידה בכל המכשירים

**חשוב:** אם אלמנט חייב להישאר בשורה אחת - אסור להשתמש ב-`flex-wrap`!

---

**וריאציות שהיו בעבר ובוטלו:**

```css
/* ❌ אלה היו בעבר - כבר לא תקפים! */
.LeadText--right {
  text-align: right; /* בוטל! */
}

.SmallNote--right {
  text-align: right; /* בוטל! */
}
```

**כל קוד עם יישור ימין/שמאל (מלבד LegalNote) הוא באג שצריך לתקן.**

## 🎯 מערכת כפתורים וקישורים (Button & Link System)

### עקרון יסוד: CTA Color

**כל מערכת הכפתורים והקישורים באתר בנויה סביב צבע אחד:** `--btn-cta-bg` (CTA Color)

- ✅ **כל הצבעים** של טקסט, רקע ומסגרות בכפתורים **חייבים** להישאב מטוקן זה
- ❌ **אסור להכניס צבעים ידנית** (hex, rgb, או "קרוב לזה")
- ✅ **שינוי אחד במקום אחד** משליך על כל הכפתורים והלינקים

**טוקן מרכזי:**

```css
:root {
  --btn-cta-bg: #3f4f4f; /* זהו המקור היחיד */
}
```

---

### ארבעת סוגי הפעולה (Action Types)

**חוק מוחלט:** יש **רק ארבעה** סוגי פעולה באתר. אין ליצור וריאציות נוספות.

| סוג                 | שימוש עסקי                   | מתי להשתמש                            |
| ------------------- | ---------------------------- | ------------------------------------- |
| **CTAButton**       | הפעולה הקריטית ביותר במסך    | רכישה, הרשמה, "מעבר לשלב הבא"         |
| **PrimaryButton**   | פעולה עיקרית תפעולית         | שליחה, חישוב, אישור                   |
| **SecondaryButton** | פעולה חלופית/משנית           | ביטול, חזרה, "אולי מאוחר יותר"        |
| **TextLinkAction**  | ניווט או מידע משני בתוך תוכן | "קראו עוד", "למידע נוסף", קישור פנימי |

**אסור:**

- ❌ ליצור "TertiaryButton"
- ❌ ליצור "GhostButton" או "OutlineButton" כנפרדים
- ❌ להמציא וריאציות חדשות

---

### 1. CTAButton - הכפתור הדומיננטי

**מהות:** זהו הכפתור הגבוה ביותר בהיררכיה הוויזואלית. הוא מושך את העין ומניע לפעולה.

**מראה:**

- ✅ **רקע מלא** בצבע `var(--btn-cta-bg)`
- ✅ **טקסט בצבע רקע** (לבן או צבע משטח) - חייב ניגודיות ≥4.5:1
- ✅ **אין מסגרת** (border: none)
- ✅ **צללית עדינה** לעומק
- ✅ **border-radius עגול מלא** (`--radius-full` או 50px)

**טיפוגרפיה חובה:**

- Class: `.ButtonPrimaryText`
- font-size: `var(--text-base)` (16-18px)
- font-weight: `600`
- line-height: `1.2`
- letter-spacing: `0.01em`
- **text-align: center** (תמיד)

**CSS מחייב:**

```css
.btn-cta {
  background: var(--btn-cta-bg);
  color: white; /* או rgb(var(--color-surface)) */
  border: none;
  border-radius: var(--radius-full);
  padding: 0.75rem 1rem; /* 12px top/bottom, 16px left/right */
  min-height: 48px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.btn-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.btn-cta:active {
  transform: translateY(0);
  box-shadow: var(--shadow-inset-min);
}
```

**⚠️ כלל Padding אחיד:**

**כל הכפתורים באתר חייבים `padding: 0.75rem 1rem` (12px למעלה/למטה, 16px בצדדים).**

- ❌ אסור: `padding: 1rem` או `p-4`
- ✅ נכון: `padding: 0.75rem 1rem` או `py-3 px-4` (Tailwind)
- 🎯 חל על: `.btn-cta`, `.btn-primary`, `.btn-secondary`, `.btn-inset`
- 📱 אין הבדל מובייל/דסקטופ - תמיד 12px/16px

**דוגמת שימוש:**

```html
<button class="btn btn-cta ButtonPrimaryText">מעבר לרכישה מאובטחת</button>
```

**מתי להשתמש:**

- ✅ כפתור "קנה עכשיו"
- ✅ כפתור "הירשמו"
- ✅ כפתור "התחילו עכשיו"
- ✅ פעולת המרה ראשית

**כמה CTAButton במסך?**

- ✅ **אחד בלבד** למסך (או עד 2 במקרים נדירים)
- ❌ אסור 3+ CTAButton באותו מסך - זה הורס את ההיררכיה

---

### 2. PrimaryButton - כפתור ראשי

**מהות:** פעולה חשובה אבל לא קריטית. מסגרת בצבע CTA, רקע שקוף.

**מראה:**

- ✅ **רקע שקוף** (`background: transparent` או `rgb(var(--color-surface))`)
- ✅ **מסגרת בצבע CTA** (`border: 2px solid var(--btn-cta-bg)`)
- ✅ **טקסט בצבע CTA** (`color: var(--btn-cta-bg)`)
- ✅ **border-radius בינוני** (`--radius-md` או `--radius-lg`)

**טיפוגרפיה חובה:**

- Class: `.ButtonSecondaryText`
- font-size: `var(--text-base)` (16-18px)
- font-weight: `600`
- line-height: `1.2`
- letter-spacing: `0`
- **text-align: center** (תמיד)

**CSS מחייב:**

```css
.btn-primary {
  background: rgb(var(--color-surface));
  color: var(--btn-cta-bg);
  border: 2px solid var(--btn-cta-bg);
  border-radius: var(--radius-lg);
  padding: 0.75rem 1.5rem;
  min-height: 48px;
  box-shadow: var(--shadow-raised-min);
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
}

.btn-primary:hover {
  box-shadow: var(--shadow-raised-min), 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.btn-primary:active {
  box-shadow: var(--shadow-inset-min);
  transform: translateY(0);
}
```

**דוגמת שימוש:**

```html
<button class="btn btn-primary ButtonSecondaryText">חשבו את הקוד</button>
```

**מתי להשתמש:**

- ✅ כפתור "שליחה" בטופס
- ✅ כפתור "חישוב" במחשבון
- ✅ כפתור "אישור" בדיאלוג
- ✅ פעולה תפעולית עיקרית

---

### 3. SecondaryButton - כפתור משני

**מהות:** פעולה חלופית או פחות דחופה. טקסט בלבד בצבע CTA, ללא רקע או מסגרת.

**מראה:**

- ✅ **רקע שקוף לחלוטין** (`background: transparent`)
- ✅ **אין מסגרת** (`border: none`)
- ✅ **טקסט בצבע CTA בלבד** (`color: var(--btn-cta-bg)`)
- ✅ **צללית ניאומורפית עדינה** (אופציונלי)

**טיפוגרפיה חובה:**

- Class: `.ButtonSecondaryText`
- font-size: `var(--text-base)` (16-18px)
- font-weight: `600`
- line-height: `1.2`
- letter-spacing: `0`
- **text-align: center** (תמיד)

**CSS מחייב:**

```css
.btn-secondary {
  background: transparent;
  color: var(--btn-cta-bg);
  border: none;
  border-radius: var(--radius-md);
  padding: 0.75rem 1.5rem;
  min-height: 48px;
  box-shadow: var(--shadow-raised-min); /* אופציונלי */
  transition: opacity 0.2s, transform 0.2s;
  cursor: pointer;
}

.btn-secondary:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

.btn-secondary:active {
  opacity: 1;
  transform: translateY(0);
}
```

**דוגמת שימוש:**

```html
<button class="btn btn-secondary ButtonSecondaryText">ביטול</button>
```

**מתי להשתמש:**

- ✅ כפתור "ביטול"
- ✅ כפתור "חזרה"
- ✅ כפתור "דלג"
- ✅ פעולה משנית/אופציונלית

---

### 4. TextLinkAction - לינק טקסטואלי

**מהות:** קישור בתוך תוכן, נראה כמו לינק לחיץ אבל בצבע CTA.

**מראה:**

- ✅ **טקסט בלבד** (`display: inline`)
- ✅ **קו תחתון** (`text-decoration: underline`)
- ✅ **צבע CTA** (`color: var(--btn-cta-bg)`)
- ✅ **אין רקע, אין מסגרת, אין padding**

**טיפוגרפיה חובה:**

- Class: `.LinkTextAction`
- font-size: `var(--text-base)` (16-18px)
- font-weight: `500`
- line-height: `1.4`
- letter-spacing: `0`
- **text-align: center** (בתוך הקשר שלו)

**CSS מחייב:**

```css
.link-text-action {
  display: inline;
  color: var(--btn-cta-bg);
  text-decoration: underline;
  font-size: var(--text-base);
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
}

.link-text-action:hover {
  opacity: 0.7;
  text-decoration: none;
}
```

**דוגמת שימוש:**

```html
<p class="BodyText">
  לפרטים נוספים,
  <a href="/terms" class="link-text-action LinkTextAction">לחצו כאן</a>.
</p>
```

**מתי להשתמש:**

- ✅ "קראו עוד"
- ✅ "למידע נוסף"
- ✅ "תנאי שימוש"
- ✅ קישור פנימי בתוך פסקה

---

### חוקי יישום מחייבים

#### 1. אסור להחליף טיפוגרפיה

❌ **לא נכון:**

```html
<!-- אסור להשתמש ב-ButtonPrimaryText עם PrimaryButton -->
<button class="btn btn-primary ButtonPrimaryText">שגוי</button>
```

✅ **נכון:**

```html
<button class="btn btn-primary ButtonSecondaryText">נכון</button>
```

#### 2. אסור לעקוף צבעים

❌ **לא נכון:**

```css
/* אסור להגדיר צבע ידנית */
.btn-primary {
  color: #3f4f4f; /* שגוי! */
  border-color: #3f4f4f; /* שגוי! */
}
```

✅ **נכון:**

```css
.btn-primary {
  color: var(--btn-cta-bg); /* נכון! */
  border: 2px solid var(--btn-cta-bg); /* נכון! */
}
```

#### 3. אסור לשנות יישור

❌ **לא נכון:**

```css
.btn-cta {
  text-align: right; /* שגוי! */
}
```

✅ **נכון:**

```css
.btn-cta {
  text-align: center; /* תמיד! */
}
```

#### 4. אסור ליצור וריאציות חדשות

❌ **לא נכון:**

```css
/* אסור ליצור TertiaryButton */
.btn-tertiary {
  ...;
}

/* אסור ליצור GhostButton */
.btn-ghost {
  ...;
}
```

✅ **נכון:**

השתמש רק בארבעה הקיימים: `btn-cta`, `btn-primary`, `btn-secondary`, `link-text-action`

#### 5. אסור להשתמש ב-inline styles

❌ **לא נכון:**

```html
<button class="btn btn-cta" style="background: #666; font-size: 20px;">
  שגוי
</button>
```

✅ **נכון:**

```html
<button class="btn btn-cta ButtonPrimaryText">נכון</button>
```

#### 6. איסור Override מקומי (זה באג)

**הצהרה מפורשת:** כל override מקומי ברמת קומפוננטה נחשב **באג** ולא פיצ'ר.

❌ **דוגמאות לבאגים נפוצים:**

```css
/* ❌ באג 1: שינוי צבע מקומי */
.my-page .btn-cta {
  background: #ff5733; /* אסור! צריך var(--btn-cta-bg) */
}

/* ❌ באג 2: שינוי טיפוגרפיה מקומי */
.special-section .btn-primary {
  font-size: 22px; /* אסור! צריך var(--text-base) */
  font-weight: 700; /* אסור! צריך 600 */
}

/* ❌ באג 3: שינוי יישור מקומי */
.card-content p {
  text-align: right; /* אסור! צריך center */
}

/* ❌ באג 4: הוספת מסגרת ל-SecondaryButton */
.my-component .btn-secondary {
  border: 1px solid #ccc; /* אסור! SecondaryButton ללא מסגרת */
}

/* ❌ באג 5: inline style */
<button class="btn-cta" style="padding: 2rem;">
  אסור!
</button>
```

✅ **הדרך הנכונה:**

```css
/* ✅ אם צריך שינוי - שנה את הטוקן הגלובלי */
:root {
  --btn-cta-bg: #new-color; /* שינוי אחד = כל הכפתורים מתעדכנים */
}

/* ✅ אם צריך וריאציה - צור מחלקה גלובלית חדשה */
/* ופנה קודם לאדריכל המערכת */
```

**למה Override הוא באג?**

1. **שובר עקביות** - כל כפתור נראה אחרת
2. **קשה לתחזוקה** - שינוי צבע דורש עריכה ב-100 מקומות
3. **מבלבל מפתחים** - אין מקור אמת אחד
4. **סותר את המערכת** - למה יצרנו מערכת אם עוקפים אותה?

---

### טבלת התאמה: סוג פעולה ← טיפוגרפיה

| סוג פעולה           | Class CSS חובה      | סגנון טיפוגרפיה חובה   | צבע טקסט            | צבע רקע/מסגרת       |
| ------------------- | ------------------- | ---------------------- | ------------------- | ------------------- |
| **CTAButton**       | `.btn-cta`          | `.ButtonPrimaryText`   | לבן או צבע רקע      | `var(--btn-cta-bg)` |
| **PrimaryButton**   | `.btn-primary`      | `.ButtonSecondaryText` | `var(--btn-cta-bg)` | שקוף + מסגרת CTA    |
| **SecondaryButton** | `.btn-secondary`    | `.ButtonSecondaryText` | `var(--btn-cta-bg)` | שקוף (ללא מסגרת)    |
| **TextLinkAction**  | `.link-text-action` | `.LinkTextAction`      | `var(--btn-cta-bg)` | אין                 |

---

### Checklist לפני יצירת כפתור/לינק

- [ ] האם זה באמת צריך להיות CTAButton? (רק פעולה קריטית!)
- [ ] האם השתמשתי בטיפוגרפיה הנכונה? (PrimaryText/SecondaryText/LinkTextAction)
- [ ] האם הצבעים נשאבים מ-`--btn-cta-bg`? (לא hex ידני!)
- [ ] האם הטקסט מיושר למרכז? (text-align: center)
- [ ] האם יש רק 1-2 CTAButton במסך? (לא יותר!)
- [ ] האם בדקתי ניגודיות? (WCAG AA: ≥4.5:1)

---

## 🏛️ Neumorphic Design Principles

**מה זה Neumorphism?**

- עיצוב שמדמה משטחים פיזיים מובלטים או שקועים
- באתר שלנו: צללים עדינים במקום גבולות קשים
- תחושה רכה, אורגנית, חמה

**כללי יישום:**

1. משטח מורם (Raised): `var(--shadow-raised-min)` - 2 צללים מנוגדים
2. משטח שקוע (Inset): `var(--shadow-inset-min)` - 2 צללים פנימיים מנוגדים
3. ללא גבולות (`border: none`) - **למעט PrimaryButton** שיש לו מסגרת בצבע CTA
4. radius עדין: `var(--radius-lg)` (0.75rem) או `var(--radius-xl)` (1rem)

---

## 🎨 אייקונוגרפיה

### כללים קבועים

- ❌ **אסור להשתמש באימוג'ים** בשום מקום באתר
- ✅ **רק אייקוני SVG** עם קו דק ואלגנטי
- ✅ `stroke-width: 1px` תמיד
- ✅ `stroke-linecap: round` + `stroke-linejoin: round`
- ✅ גודל: 20-24px (viewBox רגיל)

### דוגמה לאייקון תקין

```tsx
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width="20"
  height="20"
  fill="none"
  stroke="currentColor"
  strokeWidth="1"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <line x1="4" y1="6" x2="20" y2="6" />
  <line x1="4" y1="12" x2="20" y2="12" />
  <line x1="4" y1="18" x2="20" y2="18" />
</svg>
```

### מקורות מומלצים

- Feather Icons (עיצוב דק ונקי)
- Lucide Icons (מבוסס על Feather)
- Heroicons (outline variant)

**חשוב:** תמיד לאמת ש-`strokeWidth="1"` ולא יותר

---

## 🔤 טיפוגרפיה

### פונט: Assistant

**משקלים זמינים:**

- 300 (Light) - כותרות דקורטיביות, hero גדול
- 400 (Regular) - טקסט רגיל, פסקאות
- 500 (Medium) - ברירת מחדל לכל טקסט רגיל ופסקאות
- 600 (SemiBold) - כותרות H1-H6, כפתורים, הדגשות
- 700 (Bold) - מספרים, מחירים, ניומברים בולטים
- 800 (ExtraBold) - ברנדינג, hero ראשי

**טעינה:**

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;500;600;700;800&display=swap"
  rel="stylesheet"
/>
```

### סולם טיפוגרפי (Fluid Scale)

**תכונה מיוחדת:** משתמשים ב-`clamp()` לרספונסיביות אוטומטית

| Token         | Min (Mobile)    | Preferred         | Max (Desktop)   | שימוש                   |
| ------------- | --------------- | ----------------- | --------------- | ----------------------- |
| `--text-xs`   | 0.75rem (12px)  | 0.7rem + 0.25vw   | 0.875rem (14px) | תווית קטנה, disclaimers |
| `--text-sm`   | 0.875rem (14px) | 0.825rem + 0.25vw | 1rem (16px)     | labels, קטן             |
| `--text-base` | 1rem (16px)     | 0.95rem + 0.25vw  | 1.125rem (18px) | טקסט רגיל               |
| `--text-lg`   | 1.125rem (18px) | 1.05rem + 0.375vw | 1.25rem (20px)  | כפתורים, lead           |
| `--text-xl`   | 1.25rem (20px)  | 1.15rem + 0.5vw   | 1.5rem (24px)   | H4                      |
| `--text-2xl`  | 1.5rem (24px)   | 1.35rem + 0.75vw  | 2rem (32px)     | H3                      |
| `--text-3xl`  | 2rem (32px)     | 1.75rem + 1.25vw  | 2.5rem (40px)   | H2                      |
| `--text-4xl`  | 2.5rem (40px)   | 2rem + 2.5vw      | 3rem (48px)     | H1, מספרים גדולים       |

**הגדרה ב-CSS:**

```css
:root {
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.825rem + 0.25vw, 1rem);
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem);
  --text-xl: clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.35rem + 0.75vw, 2rem);
  --text-3xl: clamp(2rem, 1.75rem + 1.25vw, 2.5rem);
  --text-4xl: clamp(2.5rem, 2rem + 2.5vw, 3rem);
}
```

### מערכת טיפוגרפיה מאוחדת (Typography System)

**קובץ מרכזי:** `src/styles/typography-system.css`

---

## 🚨 כללי קוד - חובה לכל כותרת במערכת

### 1. Line-Height צפוף (0.9–1.0)

**כלל קריטי:** כל סגנון כותרת במערכת חייב להשתמש ב-`line-height` בטווח **0.9 עד 1.0 בלבד**.

❌ **אסור:**

- `line-height: 1.1` או יותר בכותרות
- `line-height: 1.2` / `1.3` בכל סגנון כותרת
- שימוש ב-line-height גבוה "ליצירת אוויר"

✅ **חובה:**

- `line-height: 0.9` עד `1.0` בלבד
- האוויר והנשימה מגיעים מ-`margin-bottom` חיצוני
- השורות בתוך הכותרת צפופות ומוצהרות

**למה?**

- כותרות צריכות להרגיש חזקות וצפופות
- line-height גבוה יוצר תחושה חלשה ומפוזרת
- הריווח האנכי נשלט ממקום אחד (spacing tokens)

### 2. סקייל רספונסיבי חובה

**כלל קריטי:** כל כותרת חייבת להגדיר טווח גדלים רספונסיבי מובייל → דסקטופ.

❌ **אסור:**

- `font-size: 32px` (קבוע)
- גודל יחיד לכל המסכים
- קפיצות ברוטאליות בין breakpoints

✅ **חובה:**

- שימוש ב-`clamp()` או CSS variables עם media queries
- טווח מבוקר: mobile (min) → desktop (max)
- כל סגנון כותרת שומר על ההיררכיה שלו בכל גודל מסך

**דוגמה:**

```css
/* ✅ נכון - רספונסיבי */
font-size: clamp(2rem, 1.75rem + 1.25vw, 2.5rem); /* 32px → 40px */

/* ❌ לא נכון - קבוע */
font-size: 32px;
```

### 3. Spacing Tokens בלבד

**כלל קריטי:** כל `margin-bottom` של כותרת חייב להשתמש בטוקני ריווח גלובליים.

❌ **אסור:**

- `margin-bottom: 24px`
- `margin-bottom: 1.5rem` (מספר ידני)
- מרווחים אקראיים שלא מהסקאלה

✅ **חובה:**

- `margin-bottom: var(--space-lg)`
- `margin-bottom: var(--space-xl)`
- שימוש רק בטוקנים: `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`, `--space-2xl`

**למה?**

- שליטה ממוקדת: שינוי אחד משפיע על כל המערכת
- עקביות מובטחת
- קל לשנות "תחושה" גלובלית (אוורירי/דחוס)

### 4. היררכיה מתועדת

כל סגנון כותרת מוגדר עם:

- **טווח גודל:** מובייל (min) → דסקטופ (max)
- **line-height:** 0.9–1.0 בלבד
- **margin-bottom:** מהסקאלה הגלובלית
- **תפקיד:** היכן משתמשים בו

---

#### רשימת מחלקות (20 סגנונות)

| מחלקה                   | גודל מובייל→דסקטופ | משקל | line-height | margin-bottom    | יישור  |
| ----------------------- | ------------------ | ---- | ----------- | ---------------- | ------ |
| **Title**               | 32px → 40px        | 600  | 0.95        | var(--space-lg)  | center |
| **PageTitle**           | 32px → 40px        | 700  | 0.95        | var(--space-xl)  | center |
| **PageTitleCompact**    | 24px → 32px        | 600  | 0.95        | var(--space-lg)  | center |
| **SectionTitle**        | 24px → 32px        | 600  | 0.9         | 0 (container)    | center |
| **CardTitle**           | 20px → 24px        | 600  | 0.95        | var(--space-md)  | center |
| **CardTitleLong**       | 24px → 32px        | 700  | 0.95        | var(--space-md)  | center |
| **NumberTitle**         | 40px → 56px        | 700  | 1.0         | var(--space-md)  | center |
| **Price**               | 48px → 72px        | 400  | 1.0         | var(--space-sm)  | center |
| **LongTitle**           | 22px → 28px        | 600  | 0.95        | var(--space-md)  | center |
| **LongSubtitle**        | 18px → 22px        | 500  | 1.1         | var(--space-md)  | center |
| **LeadText**            | 18px → 20px        | 500  | 1.4         | var(--space-2xl) | center |
| **BodyText**            | 16px → 18px        | 500  | 1.6         | var(--space-md)  | center |
| **FocusText**           | 18px → 20px        | 600  | 1.4         | var(--space-md)  | center |
| **FocusTextLabel**      | 18px → 20px        | 700  | 0.7         | var(--space-xs)  | center |
| **SmallNote**           | 14px → 16px        | 500  | 1.4         | var(--space-sm)  | center |
| **BigNote**             | 16px → 18px        | 500  | 1.4         | var(--space-sm)  | center |
| **LegalNote**           | 12px → 14px        | 400  | 1.5         | var(--space-sm)  | right  |
| **LabelText**           | 14px → 16px        | 500  | 1.3         | var(--space-xs)  | right  |
| **ButtonPrimaryText**   | 16px → 18px        | 600  | 1.1         | 0 (inline)       | center |
| **ButtonSecondaryText** | 16px → 18px        | 600  | 1.1         | 0 (inline)       | center |

#### פרטי המחלקות - כותרות

**1. PageTitle** - כותרת ראשית של עמוד

```css
.PageTitle {
  font-size: var(
    --text-3xl
  ); /* clamp(2rem, 1.75rem + 1.25vw, 2.5rem) → 32-40px */
  font-weight: 700;
  line-height: 0.95; /* צפוף וחזק */
  letter-spacing: -0.01em;
  color: rgb(var(--color-heading));
  text-align: center;
  margin-bottom: var(--space-xl); /* 2rem / 32px */
}
```

**שימוש:** כותרת H1 בעמודי נחיתה, דף בית, עמודים מרכזיים

---

**2. PageTitleCompact** - כותרת עמוד לטקסט ארוך

```css
.PageTitleCompact {
  font-size: var(
    --text-2xl
  ); /* clamp(1.5rem, 1.35rem + 0.75vw, 2rem) → 24-32px */
  font-weight: 600;
  line-height: 0.95; /* צפוף וחזק */
  letter-spacing: -0.01em;
  color: rgb(var(--color-heading));
  text-align: center;
  margin-bottom: var(--space-lg); /* 1.5rem / 24px */
}
```

**שימוש:** כותרת H1 בעמודים עם טקסט ארוך (תנאים, פרטיות)

---

**3. SectionTitle** - כותרת מקטע

```css
.SectionTitle {
  font-size: var(
    --text-2xl
  ); /* clamp(1.5rem, 1.35rem + 0.75vw, 2rem) → 24-32px */
  font-weight: 600;
  line-height: 0.9; /* הכי צפוף - למקטעים חזקים */
  letter-spacing: -0.01em;
  color: rgb(var(--color-heading));
  text-align: center;
  margin-bottom: 0; /* אין margin - Container מספק padding */
}
```

**שימוש:** כותרת H2/H3 בתוך cards/sections עם padding משלהם

---

**4. CardTitle** - כותרת כרטיסייה קצרה

```css
.CardTitle {
  font-size: var(
    --text-xl
  ); /* clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem) → 20-24px */
  font-weight: 600;
  line-height: 0.95; /* צפוף */
  letter-spacing: 0;
  color: rgb(var(--color-heading));
  text-align: center;
  margin-bottom: var(--space-md); /* 1rem / 16px */
}
```

**שימוש:** כותרת קצרה בכרטיסים (ResultCard, מאמרים)

---

**5. CardTitleLong** - כותרת כרטיסייה ארוכה

```css
.CardTitleLong {
  font-size: clamp(1.5rem, 4vw, 2rem); /* 24-32px - fluid */
  font-weight: 700;
  line-height: 0.95; /* צפוף */
  letter-spacing: 0;
  color: rgb(var(--color-heading));
  text-align: center;
  margin-bottom: var(--space-md); /* 1rem / 16px */
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
```

**שימוש:** כותרות ארוכות בכרטיסי מכירה (SalesPanels)

---

**6. NumberTitle** - תצוגת מספרים גדולים

```css
.NumberTitle {
  font-size: var(
    --text-4xl
  ); /* clamp(2.5rem, 2rem + 2.5vw, 3.5rem) → 40-56px */
  font-weight: 700;
  line-height: 1; /* גבול עליון - מספרים צריכים חללי */
  letter-spacing: 0.05em;
  color: rgb(var(--color-heading));
  text-align: center;
  margin-bottom: var(--space-md); /* 1rem / 16px */
}
```

**שימוש:** תצוגת ספרות קוד העושר, מספרים מודגשים

---

**7. Price** - תצוגת מחירים

```css
.Price {
  font-size: clamp(3rem, 10vw, 4.5rem); /* 48-72px - fluid aggressive */
  font-weight: 400;
  line-height: 1; /* מותאם למספרים גדולים */
  letter-spacing: 0.05em;
  color: rgb(var(--color-support));
  text-align: center;
  margin-bottom: var(--space-sm); /* 0.5rem / 8px */
}
```

**שימוש:** מחירים בעמוד מכירה

---

#### פרטי המחלקות - טקסט גוף

**8. LeadText** - טקסט פתיחה/מכוון

**8. LeadText** - טקסט פתיחה/מכוון

```css
.LeadText {
  font-size: var(
    --text-lg
  ); /* clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem) → 18-20px */
  font-weight: 500;
  line-height: 1.4; /* טקסט - יכול להיות פחות צפוף */
  letter-spacing: 0;
  color: #c29494; /* צבע מיוחד - rose-gray בשני המצבים */
  text-align: center;
  margin-bottom: var(--space-2xl); /* 3rem / 48px - ריווח גדול */
  opacity: 0.9;
}
```

**שימוש:** טקסט מבוא בראש עמוד, lead paragraph

**הערה:** LeadText הוא הטקסט היחיד שמשתמש בצבע קבוע (#C29494) במקום טוקן, בשני מצבי light/dark.

---

**9. BodyText** - טקסט גוף רגיל

```css
.BodyText {
  font-size: var(
    --text-base
  ); /* clamp(1rem, 0.95rem + 0.25vw, 1.125rem) → 16-18px */
  font-weight: 500;
  line-height: 1.6; /* טקסט גוף - קריא */
  letter-spacing: 0;
  color: rgb(var(--color-text));
  text-align: center;
  margin-bottom: var(--space-md); /* 1rem / 16px */
}
```

**שימוש:** פסקאות רגילות, טקסט עיקרי

---

**10. SmallNote** - טקסט משני קטן

```css
.SmallNote {
  font-size: var(
    --text-sm
  ); /* clamp(0.875rem, 0.825rem + 0.25vw, 1rem) → 14-16px */
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0;
  color: rgb(var(--color-text));
  text-align: center;
  margin-bottom: var(--space-sm); /* 0.5rem / 8px */
  opacity: 0.7;
}
```

**שימוש:** הערות, טקסט משני, הסברים קצרים

---

**11. BigNote** - טקסט משני גדול יותר

```css
.BigNote {
  font-size: var(
    --text-base
  ); /* clamp(1rem, 0.95rem + 0.25vw, 1.125rem) → 16-18px */
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0;
  color: rgb(var(--color-heading)); /* צבע הכותרות */
  text-align: center;
  margin-bottom: var(--space-sm); /* 0.5rem / 8px */
  opacity: 0.85;
}
```

**שימוש:** הערות גדולות יותר, תת-כותרות משניות

**הערה:** BigNote משתמש בצבע הכותרות (--color-heading) כדי להדגיש את החשיבות שלו.

---

**12. LongTitle** - כותרת בינונית לכרטיסים

```css
.LongTitle {
  font-size: clamp(1.375rem, 1.25rem + 0.625vw, 1.75rem); /* 22-28px */
  font-weight: 600;
  line-height: 0.95;
  letter-spacing: -0.01em;
  color: rgb(var(--color-heading));
  text-align: center;
  margin-bottom: var(--space-md); /* 1rem / 16px */
}
```

**שימוש:** כותרות בכרטיסים גדולים, כותרות משניות בעמוד

---

**13. LongSubtitle** - תת-כותרת לכרטיסים

```css
.LongSubtitle {
  font-size: clamp(1.125rem, 1.05rem + 0.375vw, 1.375rem); /* 18-22px */
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: 0;
  color: rgb(var(--color-text));
  text-align: center;
  margin-bottom: var(--space-md); /* 1rem / 16px */
  opacity: 0.9;
}
```

**שימוש:** תתי-כותרות, הסברים מתחת לכותרות ראשיות

---

**14. FocusText** - טקסט מודגש

```css
.FocusText {
  font-size: var(
    --text-lg
  ); /* clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem) → 18-20px */
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0;
  color: rgb(var(--color-text));
  text-align: center;
  margin-bottom: var(--space-md); /* 1rem / 16px */
}
```

**שימוש:** טקסט שצריך הדגשה חזקה, נקודות מפתח

---

**15. FocusTextLabel** - תווית מודגשת צפופה

```css
.FocusTextLabel {
  font-size: var(
    --text-lg
  ); /* clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem) → 18-20px */
  font-weight: 700;
  line-height: 0.7; /* צפוף מאוד לרשימות */
  letter-spacing: 0;
  color: rgb(var(--color-text));
  text-align: center;
  margin-bottom: var(--space-xs); /* 0.25rem / 4px */
}
```

**שימוש:** תוויות בולטות, רשימות נומרולוגיה עם מרווחים צפופים

---

**16. LegalNote** - טקסט משפטי

```css
.LegalNote {
  font-size: var(
    --text-xs
  ); /* clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem) → 12-14px */
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0;
  color: rgb(var(--color-text));
  text-align: right; /* היוצא מן הכלל היחיד */
  margin-bottom: var(--space-sm); /* 0.5rem / 8px */
  opacity: 0.6;
}
```

**שימוש:** תנאי שימוש, תקנונים, טקסטים משפטיים (היישור הימני היחיד המותר)

---

**13. LabelText** - טקסט תווית

```css
.LabelText {
  font-size: var(
    --text-sm
  ); /* clamp(0.875rem, 0.825rem + 0.25vw, 1rem) → 14-16px */
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: 0;
  color: rgb(var(--color-text));
  text-align: right;
  margin-bottom: var(--space-xs); /* 0.25rem / 4px */
}
```

**שימוש:** תוויות לשדות טקסט, labels

---

**17. LabelText** - טקסט תווית

```css
.ButtonPrimaryText {
  font-size: var(
    --text-base
  ); /* clamp(1rem, 0.95rem + 0.25vw, 1.125rem) → 16-18px */
  font-weight: 600;
  line-height: 1.1; /* צפוף בכפתור */
  letter-spacing: 0.01em;
  text-align: center;
  /* אין margin - inline element */
}
```

**שימוש:** טקסט בכפתורי CTA ו-Primary

---

**19. ButtonSecondaryText** - טקסט כפתור ראשי ומשני

```css
.ButtonSecondaryText {
  font-size: var(
    --text-base
  ); /* clamp(1rem, 0.95rem + 0.25vw, 1.125rem) → 16-18px */
  font-weight: 600;
  line-height: 1.1; /* צפוף בכפתור */
  letter-spacing: 0;
  text-align: center;
  /* אין margin - inline element */
}
```

**שימוש:** טקסט בכפתורי Secondary ו-TextLink

---

**20. Title** - כותרת חדשה (מחליפה את CardTitle)

```css
.Title {
  font-size: var(
    --text-3xl
  ); /* clamp(2rem, 1.75rem + 1.25vw, 2.5rem) → 32-40px */
  font-weight: 600;
  line-height: 0.95;
  letter-spacing: -0.02em;
  color: rgb(var(--color-heading));
  text-align: center;
  margin-bottom: var(--space-lg); /* 1.5rem / 24px */
}

/* CardTitle שמורה לתאימות אחורה */
.CardTitle {
  font-size: var(
    --text-xl
  ); /* clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem) → 20-24px */
  font-weight: 600;
  line-height: 0.95;
  letter-spacing: 0;
  color: rgb(var(--color-heading));
  text-align: center;
  margin-bottom: var(--space-md); /* 1rem / 16px */
}
```

**שימוש:**

- **Title:** כותרת ראשית בכרטיסים ובסקציות (משקל 600 במקום 700 הקודם)
- **CardTitle:** נשמרת לתאימות אחורה בלבד - המערכת עברה ל-Title

**הבדל מרכזי:**

- **Title:** גדולה יותר (32-40px), משקל 600, מרווח גדול יותר (--space-lg)
- **CardTitle:** קטנה יותר (20-24px), משקל 600, מרווח רגיל (--space-md)

---

#### ❌ וריאציות מבוטלות (Deprecated)

**הווריאציות הבאות בוטלו ואסורות לשימוש:**

```css
/* ❌ בוטל - אין יישור ימין למעט LegalNote */
.LeadText--right {
  text-align: right;
}

/* ❌ בוטל - LabelText תמיד ימין */
.LabelText--center {
  text-align: center;
}

/* ❌ בוטל - אין יישור ימין למעט LegalNote */
.SmallNote--right {
  text-align: right;
}
```

**כלל:** כל טקסט מיושר למרכז. **היוצא מן הכלל היחיד:** `LegalNote` (טקסט משפטי).

---

### 📊 סיכום כללי טיפוגרפיה - עקרונות קוד

#### 🚨 כללים קריטיים - חובה לכל כותרת

##### 1. Line-Height: 0.9–1.0 בלבד

- ✅ כל כותרת (PageTitle, SectionTitle, CardTitle וכו') חייבת להשתמש ב-`line-height` בטווח **0.9 עד 1.0**
- ❌ אסור להשתמש ב-1.1 / 1.2 / 1.3 בכותרות
- ✅ האוויר והנשימה מגיעים מ-`margin-bottom` בלבד

##### 2. Responsive Scale חובה

- ✅ כל כותרת חייבת להגדיר טווח גדלים: מובייל (min) → דסקטופ (max)
- ❌ אסור לקבוע `font-size: 32px` קבוע
- ✅ שימוש ב-`clamp()` או CSS variables עם media queries

##### 3. Spacing Tokens גלובליים בלבד

- ✅ כל `margin-bottom` חייב להשתמש בטוקנים: `var(--space-sm)`, `var(--space-md)`, `var(--space-lg)`, `var(--space-xl)`, `var(--space-2xl)`
- ❌ אסור להשתמש ב-`24px` או `1.5rem` ידניים
- ✅ שליטה ממוקדת: שינוי אחד במקום אחד משפיע על כל המערכת

##### 4. היררכיה מוגדרת

- ✅ כל סגנון כותרת מוגדר עם טווח, line-height, margin, ותפקיד
- ✅ ההיררכיה נשמרת בכל גודל מסך (PageTitle > SectionTitle > CardTitle)
- ❌ אסור ליצור סגנונות כותרת חדשים ללא תיעוד

#### 🎯 טבלת מהירות - כל הכותרות

| כותרת               | Mobile → Desktop | line-height | margin-bottom   | שימוש              |
| ------------------- | ---------------- | ----------- | --------------- | ------------------ |
| PageTitle           | 32px → 40px      | 0.95        | var(--space-xl) | כותרת H1 ראשית     |
| PageTitleCompact    | 24px → 32px      | 0.95        | var(--space-lg) | H1 טקסט ארוך       |
| SectionTitle        | 24px → 32px      | 0.9         | 0 (container)   | H2/H3 במקטעים      |
| CardTitle           | 20px → 24px      | 0.95        | var(--space-md) | כרטיסים קצרים      |
| CardTitleLong       | 24px → 32px      | 0.95        | var(--space-md) | כרטיסים ארוכים     |
| NumberTitle         | 40px → 56px      | 1.0         | var(--space-md) | מספרים מודגשים     |
| Price               | 48px → 72px      | 1.0         | var(--space-sm) | מחירים             |
| ButtonPrimaryText   | 16px → 18px      | 1.1         | 0 (inline)      | כפתורי CTA/Primary |
| ButtonSecondaryText | 16px → 18px      | 1.1         | 0 (inline)      | כפתורי Secondary   |

#### ✅ Checklist - לפני שימוש בכותרת

- [ ] האם ה-`line-height` בטווח 0.9–1.0?
- [ ] האם הגודל רספונסיבי (clamp או tokens)?
- [ ] האם ה-`margin-bottom` משתמש ב-spacing token?
- [ ] האם הכותרת מיושרת למרכז (`text-align: center`)?
- [ ] האם הכותרת מתועדת בטבלה למעלה?

#### 🔧 תיקון קוד ישן

**אם אתה רואה:**

```css
/* ❌ באג */
.MyTitle {
  font-size: 32px;
  line-height: 1.3;
  margin-bottom: 24px;
}
```

**תקן ל:**

```css
/* ✅ נכון */
.MyTitle {
  font-size: var(--text-3xl); /* 32-40px responsive */
  line-height: 0.95; /* צפוף וחזק */
  margin-bottom: var(--space-xl); /* 2rem / 32px */
}
```

---

### כללי משקל גופן (Font Weight)

| אלמנט               | משקל           | דוגמה                 |
| ------------------- | -------------- | --------------------- |
| טקסט רגיל, פסקאות   | `500`          | `<p>`, `<span>`, body |
| כפתורים             | `600`          | `<button>`, `.btn`    |
| כותרות H1-H6        | `600` או `700` | `<h1>` עד `<h6>`      |
| מספרים מודגשים      | `700`          | NumberTitle           |
| מחירים              | `400`          | Price                 |
| Hero גדול           | `300` או `800` | תלוי בסגנון           |
| AWAKENING BY KSENIA | `300`          | תפריט צד, ברנדינג     |

**חשוב:** כפתורים **תמיד** `font-weight: 600`

### Line Height

| Token              | Value | שימוש             |
| ------------------ | ----- | ----------------- |
| `--leading-tight`  | 1.25  | כותרות H1-H3      |
| `--leading-normal` | 1.55  | טקסט רגיל, פסקאות |
| `--leading-loose`  | 1.75  | מאמרים ארוכים     |

### Letter Spacing

| Token               | Value   | שימוש                 |
| ------------------- | ------- | --------------------- |
| `--tracking-tight`  | -0.01em | כותרות גדולות H1, H2  |
| `--tracking-normal` | 0em     | טקסט רגיל, כפתורים    |
| `--tracking-wide`   | 0.02em  | uppercase, small caps |

### דוגמאות שימוש

```html
<!-- כותרת עמוד -->
<h1 class="PageTitle">גלו את קוד העושר שלכם</h1>

<!-- כותרת כרטיסייה -->
<h2 class="CardTitle">הפירוש המלא של קוד העושר</h2>

<!-- מספר קוד -->
<div class="NumberTitle" dir="ltr">12-34-56</div>

<!-- מחיר -->
<div class="Price">₪36.90</div>

<!-- טקסט מכוון -->
<p class="LeadText">קבלו גישה מיידית לפירוש מקיף</p>

<!-- טקסט גוף -->
<p class="BodyText">המספרים בקוד אינם צירוף מקרים.</p>

<!-- הערה קטנה -->
<p class="SmallNote">תשלום מאובטח 100% דרך Grow</p>

<!-- הערה גדולה -->
<p class="BigNote">תשלום חד-פעמי • גישה מיידית</p>

<!-- כפתור CTA -->
<button class="btn btn-cta ButtonPrimaryText">מעבר לרכישה</button>

<!-- כפתור משני -->
<button class="btn btn-primary ButtonSecondaryText">שליחה</button>
```

---

## 🌗 צללים (Shadows)

### הגדרות מלאות

**נושא בהיר (Light Theme):**

```css
--shadow-raised-min-light: 2px 2px 4px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(255, 255, 255, 0.7);

--shadow-inset-min-light: inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px
    4px rgba(255, 255, 255, 0.7);
```

**נושא כהה (Dark Theme):**

```css
--shadow-raised-min-dark: 2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(255, 255, 255, 0.05);

--shadow-inset-min-dark: inset 2px 2px 4px rgba(0, 0, 0, 0.3), inset -2px -2px
    4px rgba(255, 255, 255, 0.05);
```

### מתי להשתמש בכל סוג

| סוג צל         | מתי להשתמש                           | דוגמה                       |
| -------------- | ------------------------------------ | --------------------------- |
| **raised-min** | כרטיסים, כפתורים, אלמנטים בולטים     | Cards, Primary buttons      |
| **inset-min**  | שדות טקסט, אזורים שקועים, כפתור לחוץ | Input fields, Pressed state |

### Class Utilities

```css
.neu-raised-min {
  background: rgb(var(--color-surface));
  box-shadow: var(--shadow-raised-min);
}

.neu-inset-min {
  background: rgb(var(--color-surface));
  box-shadow: var(--shadow-inset-min);
}
```

**דוגמת שימוש:**

```html
<div class="neu-raised-min rounded-lg card-mobile-padding">כרטיס מורם</div>

<input class="neu-inset-min rounded-md px-4 py-2" type="text" />
```

**כלל חשוב - Padding במכשירי מובייל:**

כל כרטיס עם `neu-raised-min` או `neu-inset-min` צריך להשתמש ב-`card-mobile-padding`:

```css
/* במובייל: 24px למעלה/למטה, 18px בצדדים */
.card-mobile-padding {
  padding: 1.5rem 1.125rem; /* 24px × 18px */
}

/* בטאבלט ומעלה: 24px מכל הצדדים */
@media (min-width: 768px) {
  .card-mobile-padding {
    padding: 1.5rem; /* 24px all sides */
  }
}
```

**דוגמאות שימוש:**

```html
<!-- כרטיס רגיל -->
<div class="neu-raised-min rounded-lg card-mobile-padding">תוכן</div>

<!-- פורם -->
<form class="neu-raised-min rounded-xl card-mobile-padding">...</form>

<!-- כרטיס תוכן -->
<section class="neu-raised-min rounded-xl card-mobile-padding">...</section>
```

---

## 📏 Spacing Scale (מרחקים)

```css
:root {
  --space-xs: 0.25rem; /* 4px */
  --space-sm: 0.5rem; /* 8px */
  --space-md: 1rem; /* 16px */
  --space-lg: 1.5rem; /* 24px */
  --space-xl: 2rem; /* 32px */
  --space-2xl: 3rem; /* 48px */
  --space-3xl: 4rem; /* 64px */

  /* מרווחים אחידים לכל העמודים */
  --layout-section-gap: 1.5rem; /* 24px - מרווח בין כרטיסיות */
  --layout-content-gap: 1rem; /* 16px - מרווח בין אלמנטים בתוך כרטיסייה */
  --layout-text-gap: 1.5rem; /* 24px - מרווח בין פסקאות */
  --layout-list-gap: 0.75rem; /* 12px - מרווח בין פריטים ברשימה */
}
```

### כלל חובה - מבנה אחיד של מרווחים

**כל העמודים באתר חייבים להשתמש במרווחים אחידים:**

| מטרה            | משתנה CSS              | Tailwind              | ערך  |
| --------------- | ---------------------- | --------------------- | ---- |
| בין כרטיסיות    | `--layout-section-gap` | `space-y-6` / `gap-6` | 24px |
| בין אלמנטים     | `--layout-content-gap` | `space-y-4` / `gap-4` | 16px |
| בין פסקאות      | `--layout-text-gap`    | `space-y-6`           | 24px |
| בין פריטי רשימה | `--layout-list-gap`    | `space-y-3` / `gap-3` | 12px |

**דוגמאות שימוש:**

```html
<!-- מבנה עמוד עם כרטיסיות -->
<div class="space-y-6">
  <div class="neu-raised-min card-mobile-padding">כרטיסייה 1</div>
  <div class="neu-raised-min card-mobile-padding">כרטיסייה 2</div>
  <div class="neu-raised-min card-mobile-padding">כרטיסייה 3</div>
</div>

<!-- תוכן בתוך כרטיסייה -->
<div class="neu-raised-min card-mobile-padding">
  <h2 class="CardTitle">כותרת</h2>
  <div class="space-y-4">
    <p class="BodyText">פסקה 1</p>
    <p class="BodyText">פסקה 2</p>
  </div>
</div>

<!-- רשימה -->
<ul class="space-y-3">
  <li>פריט 1</li>
  <li>פריט 2</li>
  <li>פריט 3</li>
</ul>

<!-- Grid עם gap -->
<div class="grid md:grid-cols-2 gap-6">
  <div>...</div>
  <div>...</div>
</div>
```

**❌ אסור:**

- `space-y-12` (48px) - גדול מדי
- `space-y-2` (8px) - קטן מדי
- מרווחים שונים בעמודים שונים

**✅ נכון:**

- שימוש עקבי ב-`space-y-6` בין כרטיסיות
- שימוש עקבי ב-`gap-6` ב-grids
- שימוש ב-`space-y-4` לתוכן פנימי

**יחס מתמטי:** כל שלב פי 1.5-2 מהקודם (Golden Ratio inspired)

---

## 🔘 Border Radius

```css
:root {
  --radius-sm: 0.375rem; /* 6px - אייקונים */
  --radius-md: 0.5rem; /* 8px - inputs */
  --radius-lg: 0.75rem; /* 12px - כרטיסים */
  --radius-xl: 1rem; /* 16px - modals */
  --radius-full: 9999px; /* עגול מלא - כפתורי גלולה */
}
```

### מתי להשתמש

| Radius | שימוש                  |
| ------ | ---------------------- |
| `sm`   | אייקונים קטנים         |
| `md`   | שדות טקסט, inputs      |
| `lg`   | כרטיסים, cards         |
| `xl`   | modals, overlays       |
| `full` | כפתורי CTA בצורת גלולה |

---

## 🃏 כרטיסים (Cards)

### 🚨 כללי Padding רספונסיבי - חובה

**עקרון מרכזי:** padding אופקי (ימין ושמאל) של כרטיסים משתנה לפי גודל מסך, לא קבוע.

#### כללים מחייבים

**1. מובייל (עד 768px):**

- ✅ **Padding אופקי:** `var(--space-md)` עד `var(--space-lg)` (16px–24px)
- ✅ **מינימום מוחלט:** 16px (אין לרדת מתחת לזה)
- ✅ **היגיון:** מצמצמים padding כדי להרוויח רוחב תוכן קריא

**2. טאבלט ודסקטופ (768px ומעלה):**

- ✅ **Padding אופקי:** `var(--space-lg)` עד `var(--space-xl)` (24px–32px)
- ✅ **היגיון:** padding גדול בונה תחושת איכות ושקט

**3. איסורים:**

- ❌ אסור padding אופקי מתחת ל-16px (נראה זול, לא קריא, לא מותג)
- ❌ אסור padding קבוע לכל המסכים
- ❌ אסור להמציא מספרים אקראיים לכל כרטיס ("12px כי לא היה מקום")
- ❌ padding הצדדים הוא **החלטת מערכת** לפי breakpoint, לא מצב-רוח של מסך ספציפי

#### הגדרה רשמית

```css
.card {
  background: rgb(var(--color-surface));
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-raised-min);

  /* Mobile: מינימום 16px, מקסימום 24px */
  padding: var(--space-xl) var(--space-md); /* 2rem 1rem → 32px 16px */

  transition: box-shadow 0.3s, transform 0.3s;
}

.card:hover {
  box-shadow: var(--shadow-raised-min), 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

/* Tablet & Desktop: padding גדול לאיכות */
@media (min-width: 768px) {
  .card {
    padding: var(--space-2xl) var(--space-xl); /* 3rem 2rem → 48px 32px */
  }
}

/* אופציה: כרטיס קומפקטי */
.card--compact {
  padding: var(--space-lg) var(--space-md); /* 1.5rem 1rem → 24px 16px */
}

@media (min-width: 768px) {
  .card--compact {
    padding: var(--space-xl) var(--space-lg); /* 2rem 1.5rem → 32px 24px */
  }
}
```

#### טבלת Padding לפי מסך

| גודל מסך            | Padding אנכי     | Padding אופקי   | תוכן                  |
| ------------------- | ---------------- | --------------- | --------------------- |
| **Mobile (<768px)** | var(--space-xl)  | var(--space-md) | 32px × 16px (מינימום) |
| **Tablet (≥768px)** | var(--space-2xl) | var(--space-xl) | 48px × 32px (איכות)   |
| **Compact Mobile**  | var(--space-lg)  | var(--space-md) | 24px × 16px (דחוס)    |
| **Compact Desktop** | var(--space-xl)  | var(--space-lg) | 32px × 24px (מאוזן)   |

#### דוגמאות שימוש בכרטיסים

```html
<!-- כרטיס רגיל -->
<div class="card">
  <h3 class="CardTitle">כותרת כרטיס</h3>
  <p class="BodyText">תוכן הכרטיס...</p>
</div>

<!-- כרטיס קומפקטי (לרשימות) -->
<div class="card card--compact">
  <h4 class="CardTitle">פריט</h4>
  <p class="SmallNote">פרטים...</p>
</div>
```

#### Checklist - לפני יצירת כרטיס

- [ ] האם padding אופקי מינימלי 16px במובייל?
- [ ] האם padding משתמש ב-spacing tokens (var(--space-\*))?
- [ ] האם padding גדל במסכים רחבים (≥768px)?
- [ ] האם נמנעתי מערכי px קבועים?
- [ ] האם נמנעתי ממספרים אקראיים לכרטיס ספציפי?

---

## 🎬 אנימציות ומעברים

### Easing Functions

```css
:root {
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### כללי זמן

| משך         | שימוש               |
| ----------- | ------------------- |
| `0.15s`     | Hover states, focus |
| `0.2s-0.3s` | כפתורים, cards      |
| `0.3s-0.5s` | modals, overlays    |
| `0.6s-1s`   | אנימציות מורכבות    |

### דוגמאות

**Slide In (RTL):**

```css
@keyframes slideInBounceRTL {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  60% {
    transform: translateX(-10px);
    opacity: 1;
  }
  100% {
    transform: translateX(0);
  }
}

.slide-in {
  animation: slideInBounceRTL 0.4s var(--ease-bounce);
}
```

**Fade In:**

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.3s var(--ease-out);
}
```

---

## ♿ נגישות (Accessibility)

### WCAG AA Compliance

**ניגודיות מינימלית:**

- טקסט רגיל: ≥4.5:1
- טקסט גדול (18px+): ≥3:1
- אלמנטים גרפיים: ≥3:1

**יחסי ניגודיות באתר:**

- Light theme: 4.8:1 (✅ Pass AA)
- Dark theme: 12.5:1 (✅ Pass AAA)

### Focus States

כל אלמנט אינטראקטיבי חייב focus ring:

```css
button:focus,
a:focus,
input:focus {
  outline: 2px solid rgb(var(--color-accent));
  outline-offset: 2px;
}
```

### Touch Targets

- ✅ מינימום 48x48px למובייל
- ✅ מינימום 44x44px ל-iOS
- ✅ ריווח בין כפתורים: לפחות 8px

### כללי נגישות לכפתורים

**חובה לכל כפתור:**

- ✅ **גודל מינימלי:** 48x48px (touch target)
- ✅ **ניגודיות:** לפחות 4.5:1 לטקסט רגיל, 3:1 לטקסט גדול (WCAG AA)
- ✅ **focus ring:** `outline: 2px solid` עם צבע ברור
- ✅ **כלים לבדיקה:** Axe DevTools, Stark, Chrome DevTools

**חשוב:**

- כל שינוי צבע בכפתור **חייב** בדיקת ניגודיות לפני Commit
- CTAButton: ניגודיות בין טקסט לבין `--btn-cta-bg` חייבת להיות ≥4.5:1
- PrimaryButton, SecondaryButton, TextLinkAction: ניגודיות בין `--btn-cta-bg` לבין רקע חייבת להיות ≥3:1

### Semantic HTML

```html
<!-- נכון ✅ -->
<button type="button" aria-label="פתח תפריט">
  <svg aria-hidden="true">...</svg>
</button>

<!-- לא נכון ❌ -->
<div onclick="openMenu()">
  <svg>...</svg>
</div>
```

### Screen Readers

- ✅ `aria-label` לכפתורים ללא טקסט
- ✅ `aria-hidden="true"` לאייקונים דקורטיביים
- ✅ `alt=""` לתמונות דקורטיביות
- ✅ `role` מתאים לאלמנטים מותאמים אישית

---

## 📱 Responsive Design

### Mobile-First Approach

**עיקרון בסיס:** כל הקוד נכתב קודם למובייל

```css
/* Mobile (default) */
.container {
  padding: 1rem;
  font-size: var(--text-base);
}

/* Tablet and up */
@media (min-width: 480px) {
  .container {
    padding: 1.5rem;
  }
}

/* Desktop */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    font-size: var(--text-lg);
  }
}
```

### Breakpoints

| Breakpoint | Min Width  | שימוש       |
| ---------- | ---------- | ----------- |
| Mobile     | ברירת מחדל | 320px-479px |
| Tablet     | `480px`    | 480px-767px |
| Desktop    | `768px`    | 768px+      |
| Large      | `1024px`   | 1024px+     |

---

## 🔍 סתירות היסטוריות וביטולן

### כללים שהיו בעבר ובוטלו

**חשוב:** קוד ישן עדיין עשוי להכיל דפוסים אלה. **כל מופע שנמצא הוא באג שצריך לתקן.**

#### 1. גרדיאנטים בכפתורים (בוטל)

❌ **היה בעבר:**

```css
.btn-cta {
  background: linear-gradient(
    135deg,
    rgb(var(--color-accent)),
    rgb(var(--color-support))
  );
}
```

✅ **נכון עכשיו:**

```css
.btn-cta {
  background: var(--btn-cta-bg); /* צבע מלא בלבד */
}
```

**איך לתקן:** חפש `linear-gradient` בקוד והחלף ב-`var(--btn-cta-bg)`

---

#### 2. וריאציות יישור (בוטלו)

❌ **היו בעבר:**

```css
.LeadText--right {
  text-align: right;
}

.SmallNote--right {
  text-align: right;
}

.LabelText--center {
  text-align: center;
}
```

✅ **נכון עכשיו:**

- **כל הטקסטים למרכז** - אין צורך ב-`--center`
- **חריג יחיד:** `.LegalNote` בלבד עם `text-align: right`

**איך לתקן:** מחק כל מחלקות `--right` ו-`--center` (למעט במסמכים משפטיים)

---

#### 3. כפתורים עם שמות שונים (בוטלו)

❌ **היו בעבר:**

- `.btn-ghost`
- `.btn-outline`
- `.btn-tertiary`
- `.btn-text`

✅ **נכון עכשיו - רק 4:**

1. `.btn-cta`
2. `.btn-primary`
3. `.btn-secondary`
4. `.link-text-action`

**איך לתקן:** מפה כפתורים ישנים לאחד מ-4 החדשים

---

#### 4. Overrides מקומיים (בוטלו)

❌ **היו בעבר:**

```css
.hero-section .btn-cta {
  font-size: 1.5rem;
  padding: 1.5rem 3rem;
}

.card-component .btn-primary {
  background: #custom-color;
}
```

✅ **נכון עכשיו:**

השתמש במחלקות גלובליות בלבד. אם צריך שינוי - שנה את הטוקן הגלובלי.

**איך לתקן:** מחק כל selector עם scope מקומי (`.page-name .btn-*`)

---

### מפת תיקון מהיר

| מצאת קוד ישן              | תקן ל-                                     | סיבה                       |
| ------------------------- | ------------------------------------------ | -------------------------- |
| `linear-gradient()`       | `var(--btn-cta-bg)`                        | איסור גרדיאנטים            |
| `text-align: right`       | `text-align: center`                       | הכל למרכז (מלבד LegalNote) |
| `.LeadText--right`        | `.LeadText`                                | וריאציה בוטלה              |
| `.btn-ghost`              | `.btn-secondary`                           | רק 4 סוגים                 |
| `.hero .btn-cta { ... }`  | מחק override                               | אסור overrides מקומיים     |
| `style="font-size: 20px"` | מחק, השתמש במחלקה                          | אסור inline styles         |
| `line-height: 1.2`        | `line-height: 0.95`                        | כותרות 0.9–1.0 בלבד        |
| `font-size: 32px`         | `font-size: var(--text-3xl)`               | רספונסיבי בלבד             |
| `margin-bottom: 24px`     | `margin-bottom: var(--space-lg)`           | רק spacing tokens          |
| `margin-bottom: 1.5rem`   | `margin-bottom: var(--space-lg)`           | רק spacing tokens          |
| `padding: 2rem 12px`      | `padding: var(--space-xl) var(--space-md)` | מינימום 16px אופקי         |
| `padding: 32px`           | שני ערכים רספונסיביים                      | חייב להיות אנכי ≠ אופקי    |

---

### דוגמאות תיקון כותרות

#### דוגמה 1: כותרת דף ראשית

```css
/* ❌ לפני - באג */
.hero-title {
  font-size: 40px;
  line-height: 1.3;
  margin-bottom: 24px;
}
```

```css
/* ✅ אחרי - נכון */
.hero-title {
  font-size: var(
    --text-3xl
  ); /* clamp(2rem, 1.75rem + 1.25vw, 2.5rem) → 32-40px */
  line-height: 0.95; /* צפוף וחזק */
  margin-bottom: var(--space-xl); /* 2rem / 32px */
}
```

#### דוגמה 2: כותרת כרטיס

```css
/* ❌ לפני - באג */
.card h3 {
  font-size: 22px;
  line-height: 1.4;
  margin-bottom: 12px;
}
```

```css
/* ✅ אחרי - נכון */
.card h3 {
  font-size: var(
    --text-xl
  ); /* clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem) → 20-24px */
  line-height: 0.95; /* צפוף */
  margin-bottom: var(--space-md); /* 1rem / 16px */
}
```

#### דוגמה 3: כותרת מחיר

```css
/* ❌ לפני - באג */
.price-tag {
  font-size: 60px;
  line-height: 1.1;
  margin-bottom: 8px;
}
```

```css
/* ✅ אחרי - נכון */
.price-tag {
  font-size: clamp(3rem, 10vw, 4.5rem); /* 48-72px fluid */
  line-height: 0.9; /* הכי צפוף - דרמטי */
  margin-bottom: var(--space-sm); /* 0.5rem / 8px */
}
```

---

### דוגמאות תיקון כרטיסים

#### דוגמה 4: כרטיס עם padding קבוע

```css
/* ❌ לפני - באג */
.product-card {
  padding: 32px; /* קבוע לכל המסכים */
  background: #f5f5f5; /* צבע ידני */
}
```

```css
/* ✅ אחרי - נכון */
.product-card {
  /* Mobile: 32px אנכי × 16px אופקי */
  padding: var(--space-xl) var(--space-md);
  background: rgb(var(--color-surface)); /* טוקן */
}

@media (min-width: 768px) {
  .product-card {
    /* Desktop: 48px אנכי × 32px אופקי */
    padding: var(--space-2xl) var(--space-xl);
  }
}
```

#### דוגמה 5: כרטיס עם padding מתחת למינימום

```css
/* ❌ לפני - באג קריטי */
.info-card {
  padding: 24px 12px; /* 12px אופקי = זול, לא קריא */
}
```

```css
/* ✅ אחרי - נכון */
.info-card {
  /* Mobile: מינימום 16px אופקי */
  padding: var(--space-lg) var(--space-md); /* 24px × 16px */
}

@media (min-width: 768px) {
  .info-card {
    /* Desktop: איכות וחום */
    padding: var(--space-xl) var(--space-lg); /* 32px × 24px */
  }
}
```

#### דוגמה 6: כרטיס עם מספרים אקראיים

```css
/* ❌ לפני - באג */
.hero-card {
  padding: 28px 18px; /* מספרים מומצאים */
}

.feature-card {
  padding: 20px 14px; /* עוד מספרים שרירותיים */
}
```

```css
/* ✅ אחרי - נכון */
/* שני הכרטיסים משתמשים באותה מערכת */
.hero-card,
.feature-card {
  padding: var(--space-xl) var(--space-md); /* 32px × 16px */
}

@media (min-width: 768px) {
  .hero-card,
  .feature-card {
    padding: var(--space-2xl) var(--space-xl); /* 48px × 32px */
  }
}
```

---

## ✅ Checklist לפני פרסום

### אייקונים ועיצוב בסיסי

- [ ] כל האייקונים SVG עם `strokeWidth="1"`
- [ ] אין אימוג'ים בשום מקום
- [ ] אין גרדיאנטים - רק צבעים מלאים
- [ ] כל הטקסטים מיושרים למרכז (`text-align: center`)

### טיפוגרפיה

- [ ] **כל הכותרות עם line-height 0.9–1.0** (אין 1.1 / 1.2 / 1.3)
- [ ] **כל הכותרות רספונסיביות** (clamp או CSS variables, לא px קבוע)
- [ ] **כל margin-bottom בכותרות משתמש ב-spacing tokens** (var(--space-\*))
- [ ] כל הכפתורים `font-weight: 600`
- [ ] כל הטקסט הרגיל `font-weight: 500`
- [ ] כל הכותרות `font-weight: 600` או `700`
- [ ] אין inline styles על טקסטים
- [ ] כל כותרת חדשה מתועדת בטבלת היררכיה

### מערכת כפתורים

- [ ] **כל כפתור משויך לאחד מ-4 הסוגים:** CTAButton / PrimaryButton / SecondaryButton / TextLinkAction
- [ ] **כל כפתור משתמש בטיפוגרפיה הנכונה:** ButtonPrimaryText / ButtonSecondaryText / LinkTextAction
- [ ] **כל הצבעים נשאבים מ-`--btn-cta-bg`** - אין hex ידני
- [ ] **יש מקסימום 1-2 CTAButton במסך** - לא יותר
- [ ] **אין וריאציות מותאמות אישית** של כפתורים
- [ ] **אין inline styles** על כפתורים (`style=""`)

### נגישות

- [ ] ניגודיות נבדקה לכל כפתור/צבע חדש (WCAG AA ≥4.5:1)
- [ ] Focus rings על כל האלמנטים האינטראקטיביים
- [ ] Touch targets מינימום 48x48px
- [ ] Semantic HTML (`<button>` לא `<div onclick>`)

### עיצוב ניאומורפי

- [ ] צללים ניאומורפיים (`var(--shadow-raised-min)` או `var(--shadow-inset-min)`)
- [ ] Border radius מתאים לסוג האלמנט
- [ ] אנימציות עם easing functions נכונים
- [ ] Responsive - נבדק במובייל, טאבלט, דסקטופ

### כרטיסים (Cards)

- [ ] **Padding אופקי מינימלי 16px במובייל** (אין לרדת מתחת!)
- [ ] **Padding משתמש ב-spacing tokens** (var(--space-md), var(--space-lg), וכו')
- [ ] **Padding רספונסיבי** - קטן במובייל, גדול בדסקטופ
- [ ] **אין padding קבוע לכל המסכים** (חייב media queries)
- [ ] **אין מספרים אקראיים** ("12px כי לא היה מקום" = באג)
- [ ] נבדק שהכרטיס קריא ונראה איכותי בכל גודל מסך

### בדיקת סתירות ובאגים

**חפש והסר:**

- [ ] ✅ אין `linear-gradient` בשום מקום (חפש בכל קבצי CSS)
- [ ] ✅ אין `text-align: right` או `left` (מלבד `.LegalNote`)
- [ ] ✅ אין מחלקות `--right` או `--left` (`.LeadText--right` וכו')
- [ ] ✅ אין overrides מקומיים (`.my-page .btn-cta { ... }`)
- [ ] ✅ אין inline styles (`style=""`) על אף אלמנט
- [ ] ✅ אין כפתורים עם שמות שלא ברשימה (ghost, tertiary, outline)
- [ ] ✅ אין צבעים ידניים (#hex או rgb) במקום טוקנים
- [ ] ✅ כל הכפתורים עם משקל `600` (לא 500 או 700)

---

## סיכום

מסמך זה מהווה את מקור האמת לכל החלטות העיצוב באתר.  
כל שינוי חייב להתאים לעקרונות המפורטים כאן.

**חוקי הקשחה מרכזיים:**

1. **ארבעה סוגי פעולה בלבד** - אין להמציא חמישי
2. **כל הצבעים מ-CTA Color** - אין צבעים ידניים
3. **כל הטקסטים למרכז** - חריג יחיד: LegalNote
4. **אין inline overrides** - הכל דרך מחלקות CSS גלובליות
5. **אין גרדיאנטים** - רק צבעים מלאים
6. **Override = Bug** - כל סטייה היא באג שצריך לתקן
