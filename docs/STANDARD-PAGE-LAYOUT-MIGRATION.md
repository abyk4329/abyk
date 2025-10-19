# Standard Page Layout Migration

## 📝 סיכום

העברנו את כל דפי האתר לשימוש ב-`StandardPageLayout` - קומפוננט מאוחד שכולל את המבנה של עמוד הבית:

- כפתור theme toggle (שמש/ירח) למעלה מימין
- כפתור תפריט (המבורגר) למעלה משמאל
- תוכן מרכזי במרכז העמוד
- תפריט הזזה מימין עם overlay

## ✅ קבצים שנוצרו

### 1. `/app/components/layout/StandardPageLayout.tsx`

קומפוננט מרכזי שכולל:

- כפתורי navigation (theme + menu) בחלק העליון
- תוכן מרכזי עם maxWidth מתכוונן
- תפריט צד (slide-in menu) עם overlay
- קישורי social (אופציונלי)

**Props:**

```tsx
interface StandardPageLayoutProps {
  children: ReactNode;
  showSocial?: boolean; // הצגת כפתורי social
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full"; // רוחב מקסימלי לתוכן
}
```

### 2. `/app/components/layout/StandardPageLayout.module.css`

עיצוב ייעודי לקומפוננט:

- `.pageContainer` - רקע העמוד
- `.iconButton` - כפתורים עגולים (theme + menu)
- `.socialButton` - כפתורי social media
- `.menuCard` - תפריט צד
- `.menuLink` - פריטי תפריט
- עוד...

### 3. עדכון `/app/components/layout/index.ts`

הוספנו export של `StandardPageLayout` למערכת ה-layout.

## 📋 דפים שעודכנו

### Funnel Pages

כל הדפים עברו מ-`NavigationProvider` עם ניווט ישן ל-`StandardPageLayout`:

1. **Calculator** (`/app/(funnels)/calculator/page.tsx`)

   - הוסר: `NavigationProvider` + `navigationOverrides`
   - נוסף: `<StandardPageLayout maxWidth="md">`

2. **Result** (`/app/(funnels)/result/ResultPageClient.tsx`)

   - הוסר: `NavigationProvider` + `navigationOverrides`
   - נוסף: `<StandardPageLayout maxWidth="md">`

3. **Sales** (`/app/(funnels)/sales/SalesPageClient.tsx`)

   - הוסר: `NavigationProvider` + `navigationOverrides`
   - נוסף: `<StandardPageLayout maxWidth="lg">`

4. **Thank You** (`/app/(funnels)/thank-you/ThankYouPageClient.tsx`)

   - הוסר: `NavigationProvider` + `navigationOverrides`
   - נוסף: `<StandardPageLayout maxWidth="md">`

5. **Interpretations** (`/app/(funnels)/interpretations/InterpretationsPageClient.tsx`)
   - הוסר: `NavigationProvider` + `navigationOverrides`
   - נוסף: `<StandardPageLayout maxWidth="lg">`

### Legal Pages

6. **Terms** (`/app/(legal)/terms/page.tsx`)

   - נוסף: `<StandardPageLayout maxWidth="lg">`

7. **Privacy** (`/app/(legal)/privacy/page.tsx`)
   - נוסף: `<StandardPageLayout maxWidth="lg">`

## 🎨 מבנה אחיד לכל העמודים

### לפני (דוגמה - Calculator):

```tsx
<NavigationProvider value={navigationOverrides}>
  <Calculator onCalculate={handleCalculate} />
</NavigationProvider>
```

### אחרי (דוגמה - Calculator):

```tsx
<StandardPageLayout maxWidth="md">
  <Calculator onCalculate={handleCalculate} />
</StandardPageLayout>
```

## 🔄 מה השתנה?

### הוסר:

- ❌ `NavigationProvider` מכל הדפים
- ❌ `navigationOverrides` configuration
- ❌ `useMemo` hooks לניווט
- ❌ כפתורי ניווט ישנים (חיצים)

### נוסף:

- ✅ קומפוננט מאוחד `StandardPageLayout`
- ✅ כפתור theme toggle בכל עמוד (מימין למעלה)
- ✅ כפתור תפריט בכל עמוד (משמאל למעלה)
- ✅ תפריט הזזה עם overlay
- ✅ עיצוב אחיד ונאומורפי

## 📐 מבנה המרכיבים

```
StandardPageLayout
├── Top Controls
│   ├── Menu Button (left)
│   └── Theme Toggle (right)
├── Main Content (children)
├── Social Links (optional)
└── Menu Overlay
    ├── Backdrop (dismissible)
    └── Menu Card
        ├── Header (close + brand)
        ├── Navigation Links
        └── Footer (rights)
```

## 🎯 תכונות StandardPageLayout

1. **Theme Toggle** - מעבר בין בהיר/כהה
2. **Menu Button** - פתיחת תפריט צד
3. **Slide-in Menu** - תפריט מימין עם אנימציה
4. **Overlay** - רקע כהה + blur מאחורי התפריט
5. **Responsive** - מתאים לכל המסכים
6. **RTL Support** - תמיכה מלאה בעברית
7. **Neumorphic Design** - עיצוב אחיד עם שאר האתר

## 🔗 קישורים בתפריט

התפריט כולל:

- 🏠 בית
- 🧮 מחשבון קוד העושר
- ✉️ יצירת קשר (mailto)
- 📄 תנאים משפטיים

## 🎨 עיצוב

כל הסגנונות משתמשים במשתנים של ה-neumorphic design system:

- `--neu-base` - רקע
- `--neu-card` - כרטיסים
- `--neu-accent` - זהב (#a87f58)
- `--neu-icon` - צבע אייקונים
- `--neu-shadow-dark/light` - צללים נאומורפיים

## ✨ אפקטים אינטראקטיביים

```css
/* כל הכפתורים עם אפקטי hover/active */
transition-all duration-300
hover:scale-[1.08]
active:scale-95
```

## 📱 גדלי maxWidth

- `sm`: 480px - עמודים קטנים
- `md`: 640px - ברירת מחדל, מחשבון, תוצאות
- `lg`: 900px - sales, interpretations, legal
- `xl`: 1200px - עמודים רחבים מאוד
- `full`: 100% - מלוא הרוחב

## 🚀 שימוש

### דוגמה בסיסית:

```tsx
import { StandardPageLayout } from "@/app/components/layout";

export default function MyPage() {
  return (
    <StandardPageLayout maxWidth="md">
      <div className="hero-card-frame">
        <div className="hero-card">{/* תוכן העמוד */}</div>
      </div>
    </StandardPageLayout>
  );
}
```

### עם Social Links:

```tsx
<StandardPageLayout maxWidth="md" showSocial>
  {/* תוכן */}
</StandardPageLayout>
```

## ✅ סטטוס

- [x] יצירת StandardPageLayout component
- [x] יצירת StandardPageLayout.module.css
- [x] עדכון Calculator page
- [x] עדכון Result page
- [x] עדכון Sales page
- [x] עדכון Thank You page
- [x] עדכון Interpretations page
- [x] עדכון Terms page
- [x] עדכון Privacy page
- [x] עדכון index.ts exports
- [x] ניקוי cache והרצת שרת

## 🎉 תוצאה

כל דפי האתר עכשיו עם:

1. ✅ מבנה אחיד כמו עמוד הבית
2. ✅ כפתור theme toggle בכל עמוד
3. ✅ תפריט ניווט אחיד
4. ✅ ללא כפתורי ניווט ישנים
5. ✅ עיצוב נאומורפי מלא
6. ✅ חווית משתמש עקבית

---

**תאריך:** ${new Date().toLocaleDateString('he-IL')}
**פרויקט:** Awakening by Ksenia
