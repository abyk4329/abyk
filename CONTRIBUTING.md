# 🤝 Contributing to ABYK

תודה על העניין לתרום לפרויקט ABYK! מסמך זה מסביר כיצד לתרום בצורה יעילה ומסודרת.

---

## 📋 לפני שמתחילים

1. **קרא את התיעוד**:
   - [BRANCHING.md](./docs/BRANCHING.md) - **חובה!** אסטרטגיית Git
   - [DEVELOPMENT.md](./docs/DEVELOPMENT.md) - הגדרת סביבת פיתוח
   - [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - הבנת המערכת

2. **וודא שיש לך**:
   - Node.js 22
   - pnpm >= 9
   - Git

---

## 🌿 Git Workflow

### סיכום מהיר

```
main (production) ← merge רק לאחר אישור
  ↑
develop (staging) ← merge מ-feature branches
  ↑
feature/xxx ← העבודה שלך
```

### תהליך תרומה

#### 1. Clone והתקנה

```bash
git clone https://github.com/abyk4329/abyk.git
cd abyk
sudo n 22
npm install -g pnpm@10.18.0
pnpm install
cp .env.example .env.local
# ערוך .env.local עם המפתחות שלך
```

#### 2. יצירת ענף חדש

```bash
# עדכן את develop
git checkout develop
git pull origin develop

# צור ענף חדש
git checkout -b feature/your-feature-name
```

**שמות ענפים מומלצים:**
- `feature/user-authentication` - פיצ'ר חדש
- `feature/new-design` - שיפור עיצוב
- `bugfix/calculator-error` - תיקון באג
- `docs/update-readme` - עדכון תיעוד

#### 3. פיתוח

```bash
# הרץ development server
pnpm dev

# עבוד על הקוד שלך
# ...

# בדוק lint
pnpm lint

# commit קטנים ותכופים
git add .
git commit -m "feat: add login form"
git commit -m "style: improve button design"
git commit -m "test: add auth tests"
```

#### 4. Push ו-Pull Request

```bash
# Push לענף שלך
git push origin feature/your-feature-name

# פתח PR ב-GitHub
# feature/your-feature-name → develop
```

---

## ✍️ Commit Messages

השתמש ב-[Conventional Commits](https://www.conventionalcommits.org/):

**פורמט:**
```
<type>(<scope>): <description>

[optional body]
```

**סוגים (types):**
- `feat` - פיצ'ר חדש
- `fix` - תיקון באג
- `docs` - עדכון תיעוד
- `style` - שינויי עיצוב (לא משפיע על לוגיקה)
- `refactor` - שינוי קוד ללא תיקון או פיצ'ר
- `test` - הוספת בדיקות
- `chore` - משימות תחזוקה

**דוגמאות טובות:**
```bash
git commit -m "feat(auth): add user login form"
git commit -m "fix(calculator): correct date validation"
git commit -m "docs(readme): update installation steps"
git commit -m "style(button): improve hover animation"
git commit -m "refactor(api): extract email logic to module"
```

**דוגמאות גרועות:**
```bash
git commit -m "update"
git commit -m "fix stuff"
git commit -m "wip"
```

---

## 🔍 Code Review Process

### לפני שליחת PR

- [ ] הקוד עובר ללא שגיאות
- [ ] `pnpm lint` עובר
- [ ] בדקת את השינויים ידנית
- [ ] commit messages ברורים
- [ ] אין קבצים מיותרים (node_modules, .env, וכו')

### תהליך Review

1. **אתה פותח PR** ל-`develop`
2. **CI רץ אוטומטית** (lint, build)
3. **Code reviewer בודק**:
   - האם הקוד ברור וקריא?
   - האם הוא עוקב אחרי ה-style של הפרויקט?
   - האם יש בעיות אבטחה או ביצועים?
4. **אישור ו-merge** (או בקשה לשינויים)
5. **הענף נמחק** אוטומטית

### טיפים לקבלת Review טוב

✅ **PRs קטנים** - עד 300 שורות  
✅ **תיאור ברור** - מה השינוי ולמה  
✅ **Screenshots** - אם יש שינויי UI  
✅ **ענה במהירות** - לתגובות של reviewers

---

## 🎨 Style Guide

### TypeScript

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
}

function getUserById(id: string): User | null {
  // implementation
}

// ❌ Bad
function getUser(x: any) {
  // implementation
}
```

### React Components

```tsx
// ✅ Good - Named export, typed props
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export function Button({ children, onClick, variant = "primary" }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn-${variant}`}>
      {children}
    </button>
  );
}

// ❌ Bad - Default export, untyped
export default function Button(props) {
  return <button>{props.children}</button>;
}
```

### CSS/Tailwind

```tsx
// ✅ Good - Semantic classes, consistent spacing
<div className="rounded-lg p-4 shadow-md bg-white">
  <h2 className="text-xl font-bold mb-2">Title</h2>
  <p className="text-gray-600">Description</p>
</div>

// ❌ Bad - Inline styles, inconsistent
<div style={{ borderRadius: "8px", padding: "16px" }}>
  <h2 style={{ fontSize: "20px" }}>Title</h2>
</div>
```

---

## 🧪 Testing

### מה לבדוק לפני PR

1. **Functionality** - הפיצ'ר עובד כמצופה
2. **Edge Cases** - מה קורה עם קלט לא תקין?
3. **Mobile** - נראה טוב במסך קטן?
4. **Performance** - אין האטות?
5. **Accessibility** - ניתן לניווט עם מקלדת?

### E2E Tests (Playwright)

אם אתה מוסיף פיצ'ר משמעותי, שקול להוסיף E2E test:

```bash
pnpm test:e2e
```

---

## 🚫 מה לא לעשות

❌ **לעולם אל תעשה push ישיר ל-`main`**  
❌ **אל תכלול קבצים רגישים** (.env, secrets)  
❌ **אל תעלה node_modules** או artifacts  
❌ **אל תכלול קוד מוערם** (commented out)  
❌ **אל תעשה commits ענקיים** (פצל לחלקים)

---

## 🆘 עזרה

### יש לך שאלה?

1. בדוק ב-[docs/](./docs/)
2. חפש ב-GitHub Issues
3. פתח issue חדש
4. פנה למיילים: awakening.by.ksenia@gmail.com

### מצאת באג?

1. בדוק אם כבר דווח
2. פתח issue עם:
   - תיאור הבעיה
   - צעדים לשחזור
   - התנהגות צפויה vs. בפועל
   - Screenshots אם רלוונטי

### רוצה להציע פיצ'ר?

1. פתח issue ל-discussion
2. הסבר את הצורך והתועלת
3. המתן לאישור לפני שמתחיל לפתח

---

## 📚 משאבים נוספים

- [Next.js Best Practices](https://nextjs.org/docs)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)

---

## 🎉 תודה!

כל תרומה, קטנה או גדולה, מוערכת מאוד!  
יחד נבנה מוצר מעולה. 💪

---

**עודכן**: אוקטובר 2025
