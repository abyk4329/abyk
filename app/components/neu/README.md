# Neumorphic Shadow System - מערכת הצללות Neumorphic (מאוחד ב־design)

מערכת הצללות מלאה ומקיפה לעיצוב Neumorphic (Soft UI) המשתמשת בצבעים הקיימים בפרויקט.

## 📦 4 סוגי הצללות עיקריים

### 1. **Raised (בולט)** - `.neu-raised-*`

אלמנט שצף מעל המשטח, נותן תחושה של 3D בולט.

**שימוש:** כפתורים, כרטיסים, אלמנטים אינטראקטיביים

**דוגמאות:**

```html
<!-- Small - כפתורים קטנים, איקונים -->
<button class="neu-raised-sm neu-bg rounded-lg px-4 py-2">לחץ כאן</button>

<!-- Medium - כפתורים רגילים, כרטיסים קטנים -->
<div class="neu-raised-md neu-bg rounded-2xl p-6">תוכן כרטיס</div>

<!-- Large - כרטיסים גדולים, מודלים -->
<div class="neu-raised-lg neu-bg rounded-3xl p-10">תוכן ראשי</div>
```

---

### 2. **Flat Raised (בולט שטוח)** - `.neu-flat-raised-*`

אלמנט בולט עדין יותר, ללא הצללה פנימית.

**שימוש:** אלמנטים משניים, כרטיסי מידע, תגיות

**דוגמאות:**

```html
<!-- Small - תגיות, badges -->
<span class="neu-flat-raised-sm neu-bg rounded-full px-3 py-1"> תגית </span>

<!-- Medium - כרטיסי מידע -->
<div class="neu-flat-raised-md neu-bg rounded-xl p-6">מידע משני</div>

<!-- Large - פאנלים גדולים -->
<section class="neu-flat-raised-lg neu-bg rounded-2xl p-8">פאנל תוכן</section>
```

---

### 3. **Inset (שקוע)** - `.neu-inset-*`

אלמנט שקוע לתוך המשטח, נותן תחושה של עומק.

**שימוש:** שדות טקסט, אזורי תוכן, תיבות חיפוש

**דוגמאות:**

```html
<!-- Small - אינפוטים קטנים -->
<input
  type="text"
  class="neu-inset-sm neu-bg rounded-lg px-3 py-2"
  placeholder="חיפוש..."
/>

<!-- Medium - שדות טקסט רגילים -->
<input
  type="email"
  class="neu-inset-md neu-bg rounded-xl px-4 py-3"
  placeholder="אימייל"
/>

<!-- Large - אזורי תוכן גדולים -->
<textarea
  class="neu-inset-lg neu-bg rounded-2xl p-4"
  rows="6"
  placeholder="הערות..."
></textarea>
```

---

### 4. **Flat Inset (שקוע שטוח)** - `.neu-flat-inset-*`

אלמנט שקוע עדין יותר, אידיאלי לרקעים.

**שימוש:** רקעים עדינים, אזורי קבוצה, containers

**דוגמאות:**

```html
<!-- Small - רקעים עדינים -->
<div class="neu-flat-inset-sm neu-bg rounded-lg p-4">רקע עדין</div>

<!-- Medium - קבוצת פריטים -->
<div class="neu-flat-inset-md neu-bg rounded-xl p-6">קבוצת אלמנטים</div>

<!-- Large - containers גדולים -->
<div class="neu-flat-inset-lg neu-bg rounded-2xl p-8">Container ראשי</div>
```

---

## 🎨 דוגמאות מיוחדות

### כפתור זהב (CTA)

```html
<button
  class="neu-raised-md neu-button-gold rounded-3xl px-12 py-4 text-lg font-semibold"
>
  מחשבון קוד העושר
</button>
```

### איקון עגול

```html
<div
  class="neu-raised-lg neu-bg neu-icon-circle"
  style="width: 120px; height: 120px;"
>
  <span class="text-6xl">🧮</span>
</div>
```

### איקוני רשתות חברתיות

```html
<div class="flex gap-4 justify-center">
  <a
    href="#"
    class="neu-raised-sm neu-bg neu-icon-circle"
    style="width: 64px; height: 64px;"
  >
    <span class="text-3xl">📷</span>
  </a>
  <a
    href="#"
    class="neu-raised-sm neu-bg neu-icon-circle"
    style="width: 64px; height: 64px;"
  >
    <span class="text-3xl">🎵</span>
  </a>
</div>
```

---

## 🛠️ Utility Classes נוספות

### רקע neumorphic

```html
<div class="neu-bg">
  <!-- רקע בצבע --neu-card -->
</div>
```

### צבעי טקסט

```html
<p class="neu-text">טקסט ראשי</p>
<p class="neu-accent-text">טקסט accent</p>
```

### ללא אפקט hover

```html
<div class="neu-raised-md neu-no-hover">
  <!-- ללא אנימציית hover -->
</div>
```

---

## 📐 גדלים זמינים

כל סוג הצללה מגיע ב-3 גדלים:

| גודל | שימוש מומלץ                                |
| ---- | ------------------------------------------ |
| `sm` | כפתורים קטנים, איקונים, תגיות              |
| `md` | כפתורים רגילים, כרטיסים בינוניים, שדות קלט |
| `lg` | כרטיסים גדולים, מודלים, פאנלים ראשיים      |

---

## 🎯 הנחיות שימוש

### 1. **Raised vs Flat Raised**

- השתמש ב-**Raised** כאשר האלמנט צריך להיות הכי בולט (כפתור ראשי, כרטיס מרכזי)
- השתמש ב-**Flat Raised** לאלמנטים משניים שצריכים נוכחות עדינה יותר

### 2. **Inset vs Flat Inset**

- השתמש ב-**Inset** לשדות קלט ואלמנטים אינטראקטיביים שקועים
- השתמש ב-**Flat Inset** לרקעים ו-containers שאינם אינטראקטיביים

### 3. **בחירת גודל נכון**

- `sm` - לאלמנטים קטנים וצפופים
- `md` - הגודל הסטנדרטי לרוב האלמנטים
- `lg` - לאלמנטים מרכזיים וחשובים

### 4. **שילוב עם Tailwind**

```html
<button
  class="neu-raised-md neu-bg rounded-2xl px-8 py-4 text-lg font-semibold hover:scale-105 transition-transform"
>
  כפתור מעוצב
</button>
```

---

## 🌈 צבעים משותפים

המערכת משתמשת בצבעים הבאים מהפרויקט:

### Light Mode (ברירת מחדל)

- `--neu-shadow-light`: `rgba(255, 255, 255, 1)` - הצללה בהירה
- `--neu-shadow-dark`: `rgba(160, 160, 160, 0.5)` - הצללה כהה
- `--neu-card`: `#f5f5f5` - רקע כרטיסים
- `--neu-accent`: `#a87f58` - צבע accent

### Dark Mode

- `--neu-shadow-light`: `rgba(55, 65, 70, 0.7)`
- `--neu-shadow-dark`: `rgba(12, 16, 18, 0.8)`
- `--neu-card`: `#2d3436`
- `--neu-accent`: `#c9a882`

**הצבעים מתעדכנים אוטומטית במעבר בין Light ל-Dark mode!**

---

## 🔗 קבצים קשורים

- **קובץ CSS מעודכן:** `design/themes/neumorphic.css` (מחליף את `/app/components/neu/neumorphic-shadows.css`)
- **טוקני צללים:** `design/tokens/shadows.css`
- **Import מרכזי:** דרך `design/index.css` שמיובא ב־`app/globals.css`

---

## 💡 טיפים

1. **שמור על עקביות** - השתמש באותו סוג הצללה לאלמנטים דומים
2. **אל תפריז** - יותר מדי הצללות חזקות יכולות להפריע
3. **התאם לגודל** - הצללות קטנות לאלמנטים קטנים, גדולות לגדולים
4. **שלב עם אנימציות** - הצללות עובדות מצוין עם transitions
5. **בדוק ב-Dark Mode** - ודא שההצללות נראות טוב גם במצב כהה

---

## 🚀 התחלה מהירה

```tsx
import '@/app/components/neu/neumorphic-shadows.css';

export default function MyComponent() {
  return (
    <div className="p-8" style={{ backgroundColor: 'var(--neu-base)' }}>
      {/* כפתור בולט */}
      <button className="neu-raised-md neu-button-gold rounded-2xl px-8 py-3">
        לחץ כאן
      </button>

      {/* כרטיס */}
      <div className="neu-raised-lg neu-bg rounded-3xl p-6 mt-4">
        <h2>כותרת</h2>
        <p>תוכן הכרטיס</p>
      </div>

      {/* אינפוט שקוע */}
      <input
        className="neu-inset-md neu-bg rounded-xl px-4 py-3 mt-4"
        placeholder="הקלד טקסט..."
      />
    </div>
  );
}
```

---

## 📱 דף דוגמאות חיות

ניתן לראות את כל ההצללות בפעולה בעמוד:

```
http://localhost:3000/shadows
```

---

**נוצר עבור פרויקט ABYK - Awakening by Ksenia** 🌟
