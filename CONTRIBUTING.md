# 🤝 Contributing to ABYK

תודה שאת רוצה לתרום לפרויקט! ❤️

## 🚀 התחלה מהירה

### 1. פתח את הפרויקט

**מהטלפון/טאבלט:**
- לחץ על: [![Open in Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/abyk4329/abyk)

**מהמחשב:**
```bash
git clone https://github.com/abyk4329/abyk.git
cd abyk
pnpm install
pnpm dev
```

### 2. צור branch חדש

```bash
git checkout -b feature/amazing-feature
```

או ב-VS Code:
- לחץ על Source Control (🔄)
- לחץ על שם ה-branch למטה
- בחר "Create new branch"

### 3. עשה שינויים

ערוך את הקבצים שרוצה. קבצים חשובים:
- `app/components/sections/*.tsx` - החלקים של האתר
- `app/data/*.ts` - התוכן והפירושים
- `app/globals.css` - סגנונות

### 4. בדוק שהכל עובד

```bash
pnpm lint        # בדיקת קוד
pnpm build       # בנייה
```

### 5. שמור את השינויים

```bash
git add .
git commit -m "הוסף תיאור ברור של מה שינית"
git push origin feature/amazing-feature
```

או ב-VS Code:
1. לחץ על Source Control (🔄)
2. רשום תיאור של השינויים
3. לחץ ✓ (Commit)
4. לחץ על Sync Changes (⬆️)

### 6. פתח Pull Request

1. גש ל-https://github.com/abyk4329/abyk
2. לחץ על "Pull requests"
3. לחץ על "New pull request"
4. בחר את ה-branch שלך
5. הסבר מה שינית ולמה
6. לחץ "Create pull request"

---

## 📝 כללי קוד

### סגנון קוד:
```typescript
// ✅ טוב - שמות ברורים בעברית
const userBirthDate = "01/01/2000";
const wealthCode = calculateCode(userBirthDate);

// ❌ לא טוב - שמות לא ברורים
const d = "01/01/2000";
const c = calc(d);
```

### קומפוננטות:
```typescript
// ✅ טוב - קומפוננטה ממוקדת
export function GlassButton({ children, onClick }: Props) {
  return (
    <button onClick={onClick} className="glass-button">
      {children}
    </button>
  );
}

// ❌ לא טוב - קומפוננטה מורכבת מדי
export function MegaComponent() {
  // 500 שורות קוד...
}
```

### CSS/Tailwind:
```tsx
// ✅ טוב - classes מסודרות
<div className="flex flex-col items-center justify-center gap-4 p-6">

// ❌ לא טוב - classes לא מסודרות
<div className="p-6 gap-4 flex items-center flex-col justify-center">
```

---

## 🎨 עיצוב

### פלטת צבעים:
```css
--brown-dark: #473b31      /* טקסט כהה */
--brown-heading: #5e4934   /* כותרות ראשיות */
--brown-bronze: #87674F    /* כותרות משניות */
--brown-neutral: #9f8572   /* Caption */
--beige: #d3c6bd           /* משני */
--white-cream: #fdfcfb     /* רקע */
```

### Glassmorphism:
```tsx
<div className="backdrop-blur-xl bg-white/15 shadow-[0_8px_32px_rgba(71,59,49,0.1)]">
  {/* תוכן */}
</div>
```

---

## 📁 מבנה הפרויקט

```
app/
├── components/
│   ├── layout/          # Header, Footer
│   ├── sections/        # Hero, Calculator, etc.
│   ├── shared/          # GlassButton
│   └── ui/              # Shadcn components
├── data/                # פירושים ותוכן
├── calculator/          # דף מחשבון
├── result/              # דף תוצאות
└── ...
```

---

## ✅ Checklist לפני Pull Request

- [ ] הקוד עובד ללא שגיאות
- [ ] עבר `pnpm lint` בלי שגיאות
- [ ] עבר `pnpm build` בהצלחה
- [ ] בדקתי במובייל (responsive)
- [ ] בדקתי בעברית (RTL)
- [ ] ה-commit messages ברורים
- [ ] הוספתי תיעוד אם צריך

---

## 🐛 דיווח על באגים

פתח issue חדש עם:
1. **תיאור הבעיה** - מה לא עובד?
2. **צעדים לשחזור** - איך לגרום לזה לקרות?
3. **התנהגות צפויה** - מה היה צריך לקרות?
4. **Screenshots** - אם רלוונטי
5. **סביבה** - דפדפן, מכשיר, וכו'

---

## 💡 רעיונות לשיפור

פתח issue חדש עם:
1. **תיאור הרעיון** - מה את רוצה להוסיף?
2. **למה זה שימושי?** - איך זה משפר את האתר?
3. **איך זה יעבוד?** - תיאור טכני בסיסי

---

## 📞 יצירת קשר

- **Instagram**: [@awakening_byksenia](https://instagram.com/awakening_byksenia)
- **WhatsApp**: [+972-52-560-6008](https://wa.me/972525606008)
- **GitHub Issues**: https://github.com/abyk4329/abyk/issues

---

## 📄 License

בתרומה לפרויקט, את מסכימה שהקוד שלך יהיה תחת אותו רישיון של הפרויקט.

© 2025 Awakening by Ksenia. All rights reserved.

---

**תודה שאת תורמת לפרויקט! 🙏💜**
