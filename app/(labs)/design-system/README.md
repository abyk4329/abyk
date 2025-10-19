# Design System - מערכת העיצוב של ABYK

עמוד showcase מקיף המציג את כל מרכיבי מערכת העיצוב Neumorphic של הפרויקט.

## 🎨 מה כלול בעמוד?

### 1. **גדלי עיגולים (Border Radius)**

- **Small** - `rounded-lg` (8px) - כפתורים קטנים, תגיות
- **Medium** - `rounded-xl` (12px) - כפתורים רגילים, כרטיסים קטנים
- **Large** - `rounded-2xl` (16px) - כרטיסים בינוניים
- **Extra Large** - `rounded-3xl` (24px) - אלמנטים מרכזיים

### 2. **סוגי הצללות (Shadow Types)**

ארבעה סוגים עיקריים עם דוגמאות חזותיות:

#### **Raised (בולט)**

```
shadow-[5px_5px_10px_var(--neu-shadow-dark),-5px_-5px_10px_var(--neu-shadow-light)]
```

אלמנט בולט מעל פני השטח - לכפתורים וכרטיסים

#### **Inset (שקוע)**

```
shadow-[inset_5px_5px_10px_var(--neu-shadow-dark),inset_-5px_-5px_10px_var(--neu-shadow-light)]
```

אלמנט שקוע פנימה - לשדות קלט ואזורי תוכן

#### **Flat (שטוח)**

```
shadow-[2px_2px_4px_var(--neu-shadow-dark),-2px_-2px_4px_var(--neu-shadow-light)]
```

אלמנט כמעט שטוח - לרקעים עדינים

#### **Pressed (לחוץ)**

```
shadow-[inset_3px_3px_6px_var(--neu-shadow-dark),inset_-3px_-3px_6px_var(--neu-shadow-light)]
```

שקוע קל - אפקט לחיצה על כפתורים

### 3. **גדלי הצללות (Shadow Sizes)**

- **Small** - `3px_3px_6px` - אלמנטים קטנים
- **Medium** - `5px_5px_10px` - אלמנטים רגילים
- **Large** - `8px_8px_16px` - אלמנטים גדולים

### 4. **משקלי גופן (Font Weights)**

- **200** - Extra Light - טקסט קטן מאוד
- **300** - Light - טקסט משני, תיאורים
- **400** - Regular - טקסט רגיל, פסקאות
- **500** - Medium - כפתורים, תוויות
- **600** - Semi Bold - כותרות משנה
- **700** - Bold - כותרות, הדגשות
- **800** - Extra Bold - כותרות ראשיות

### 5. **גדלי טקסט (Typography Scale)**

כל הכותרות responsive עם `clamp()`:

- **H1** - `clamp(2rem, 6vw, 3rem)` • 32-48px
- **H2** - `clamp(1.5rem, 5vw, 2rem)` • 24-32px
- **H3** - `clamp(1.125rem, 4vw, 1.5rem)` • 18-24px
- **Body** - `clamp(0.875rem, 2.5vw, 1rem)` • 14-16px
- **Small** - `clamp(0.75rem, 2vw, 0.8125rem)` • 12-13px

### 6. **מקלת ריווחים (Spacing Scale)**

- **0.5** - 8px - ריווח זעיר
- **1** - 12px - ריווח קטן
- **2** - 16px - ריווח בסיסי (נפוץ)
- **3** - 24px - ריווח בינוני
- **4** - 32px - ריווח גדול
- **6** - 48px - ריווח גדול מאוד
- **8** - 64px - ריווח ענק

### 7. **ריווח פנימי (Padding)**

- **Small (sm)** - 16px - כפתורים קטנים
- **Medium (md)** - 24px - כרטיסים רגילים
- **Large (lg)** - 32px - כרטיסים גדולים
- **Extra Large (xl)** - 48px - כרטיסים מרכזיים

---

## 🔗 איך לגשת?

```
http://localhost:3000/design-system
```

או:

```
/app/(labs)/design-system/page.tsx
```

---

## 💡 למה עמוד זה חשוב?

1. **תיעוד חזותי** - רואים בדיוק איך כל אלמנט נראה
2. **העתקת קוד** - כל דוגמה מגיעה עם הקוד המדויק
3. **עקביות** - מבטיח שכל המפתחים משתמשים באותם ערכים
4. **התאמה למובייל** - כל הדוגמאות responsive
5. **Dark Mode** - עובד מצוין גם במצב כהה

---

## 🎯 שימוש לדוגמה

### כפתור בולט זהב

```tsx
<button className="neu-raised-md neu-button-gold rounded-2xl px-8 py-4">
  לחץ כאן
</button>
```

### כרטיס עם הצללה בולטת

```tsx
<div className="neu-bg rounded-2xl p-6 shadow-[5px_5px_10px_var(--neu-shadow-dark),-5px_-5px_10px_var(--neu-shadow-light)]">
  תוכן הכרטיס
</div>
```

### אינפוט שקוע

```tsx
<input
  className="neu-bg rounded-xl px-4 py-3 shadow-[inset_5px_5px_10px_var(--neu-shadow-dark),inset_-5px_-5px_10px_var(--neu-shadow-light)]"
  placeholder="הקלד..."
/>
```

---

## 📱 תצוגה responsive

העמוד מותאם באופן מלא למובייל:

- Grid מתכווץ ל-1-2 עמודות
- טקסט מתכווץ עם `clamp()`
- Spacing מתאים למסכים קטנים
- כפתור "חזרה לדף הבית" תמיד נגיש

---

## 🎨 צבעים בשימוש

כל ההצללות משתמשות ב:

- `--neu-shadow-light` - הצללה בהירה (לבן)
- `--neu-shadow-dark` - הצללה כהה (אפור)
- `--neu-accent` - צבע accent (זהב)
- `--neu-card` - רקע כרטיסים

**הצבעים מתעדכנים אוטומטית ב-Dark Mode!**

---

**נוצר עבור ABYK - Awakening by Ksenia** 🌟
