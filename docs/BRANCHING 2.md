# 🌿 אסטרטגיית ענפים - Branching Strategy

## מטרה
להבטיח שהאתר הפעיל (production) לא ישתנה ללא אישור, תוך כדי מתן חופש מלא לפיתוח ושיפורים.

---

## 📊 מבנה הענפים

```
main (production)
  ↑
  merge רק לאחר אישור
  ↑
develop (integration)
  ↑
  merge מ-feature branches
  ↑
feature/xxx (new features)
```

---

## 🔒 הענפים הראשיים

### 1. `main` - Production Branch

**מה זה?**
- הקוד שרץ כרגע באתר הפעיל (abyk.online)
- **מוגן ונעול**
- שינויים רק דרך Pull Request + Code Review + Approval

**חוקים:**
- ❌ אסור לעשות push ישיר
- ❌ אסור למזג ללא אישור
- ✅ רק merge מ-`develop` לאחר בדיקה מלאה
- ✅ כל merge מלווה ב-tag version (v1.0.0, v1.1.0, וכו')

**מתי עושים merge ל-`main`?**
רק כשמוכנים לפרסם גרסה חדשה לאתר הפעיל:
1. כל הפיצ'רים החדשים נבדקו ב-`develop`
2. הבעלים אישרה את השינויים
3. הכל עובד כצפוי במצב staging

---

### 2. `develop` - Development Branch

**מה זה?**
- ענף האינטגרציה הראשי לפיתוח
- כל הפיצ'רים החדשים מתמזגים כאן תחילה
- משמש כ-"staging" לפני production

**חוקים:**
- ✅ מקבל merges מ-feature branches
- ✅ ניתן להריץ localy או על סביבת staging (Vercel preview)
- ✅ נבדק היטב לפני merge ל-`main`
- ⚠️ עדיין לא פרודקשן!

**איך עובדים איתו?**
```bash
# כשמתחילים פיצ'ר חדש:
git checkout develop
git pull origin develop
git checkout -b feature/my-new-feature

# אחרי שסיימת:
git push origin feature/my-new-feature
# פותחים PR: feature/my-new-feature → develop
```

---

## 🚀 ענפי פיתוח

### 3. `feature/*` - Feature Branches

**מה זה?**
ענפים זמניים לפיתוח פיצ'רים חדשים.

**דוגמאות:**
- `feature/user-authentication`
- `feature/payment-integration`
- `feature/new-design-system`
- `feature/admin-dashboard`

**תהליך עבודה:**
```bash
# 1. יצירת ענף חדש
git checkout develop
git pull origin develop
git checkout -b feature/user-login

# 2. עבודה על הפיצ'ר
git add .
git commit -m "feat: add login form"
git commit -m "feat: add authentication logic"

# 3. Push ופתיחת PR
git push origin feature/user-login
# GitHub: פתח PR feature/user-login → develop

# 4. אחרי merge - מחיקת הענף
git branch -d feature/user-login
git push origin --delete feature/user-login
```

---

### 4. `bugfix/*` - Bug Fix Branches

**מה זה?**
תיקוני באגים לא-דחופים ב-develop.

**דוגמאות:**
- `bugfix/fix-calculator-error`
- `bugfix/fix-email-template`

**תהליך:**
```bash
git checkout develop
git checkout -b bugfix/fix-calculator
# ... fix the bug ...
git push origin bugfix/fix-calculator
# PR: bugfix/fix-calculator → develop
```

---

### 5. `hotfix/*` - Hotfix Branches

**מה זה?**
תיקונים **דחופים** לבאגים ב-production.

**מתי משתמשים?**
- כשהאתר הפעיל לא עובד
- באג קריטי שצריך תיקון מיידי
- לא יכולים לחכות ל-develop

**תהליך מיוחד:**
```bash
# 1. יוצרים מ-main (לא develop!)
git checkout main
git pull origin main
git checkout -b hotfix/critical-payment-bug

# 2. מתקנים את הבאג
git commit -m "hotfix: fix payment processing"

# 3. Merge חזרה ל-main
git checkout main
git merge hotfix/critical-payment-bug
git push origin main

# 4. Merge גם ל-develop כדי שהתיקון יישאר
git checkout develop
git merge hotfix/critical-payment-bug
git push origin develop

# 5. מחיקה
git branch -d hotfix/critical-payment-bug
```

---

## 🎯 דוגמאות תרחישים

### תרחיש 1: פיצ'ר חדש - User Authentication

```bash
# Step 1: התחלה
git checkout develop
git pull origin develop
git checkout -b feature/user-auth

# Step 2: פיתוח
# ... code, code, code ...
git add .
git commit -m "feat: add login page"
git commit -m "feat: add signup logic"
git commit -m "test: add auth tests"

# Step 3: PR ל-develop
git push origin feature/user-auth
# GitHub: פתח PR → develop
# לאחר review ו-approval → Merge

# Step 4: ניקיון
git checkout develop
git pull origin develop
git branch -d feature/user-auth
```

**אישור לפרודקשן:**
```bash
# רק אחרי אישור הבעלים:
git checkout main
git pull origin main
git merge develop
git tag v1.1.0
git push origin main --tags
# Vercel יפרסם אוטומטית
```

---

### תרחיש 2: שיפורי עיצוב ללא השפעה על production

```bash
# עובדים ב-develop או feature branch
git checkout develop
git checkout -b feature/design-improvements

# משנים צבעים, פונטים, רווחים...
git commit -m "style: update color palette"
git commit -m "style: improve spacing"

# PR ל-develop
git push origin feature/design-improvements
# GitHub: PR → develop

# האתר הפעיל לא משתנה!
# רק develop מתעדכן
```

---

### תרחיש 3: באג קריטי בתשלום (Hotfix)

```bash
# יוצרים מ-main
git checkout main
git checkout -b hotfix/payment-error

# מתקנים
git commit -m "hotfix: fix Grow webhook"

# Merge ל-main
git checkout main
git merge hotfix/payment-error
git push origin main

# Merge ל-develop
git checkout develop
git merge hotfix/payment-error
git push origin develop
```

---

## 🔐 הגנות ב-GitHub

### הגדרות Branch Protection ל-`main`

1. Settings → Branches → Add rule for `main`
2. סמן:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass (build, lint, tests)
   - ✅ Do not allow bypassing the above settings
3. Save

**תוצאה:**
אי אפשר לעשות push ישיר ל-`main` - רק דרך PR מאושר!

---

## 📋 Checklist לפני Merge ל-Production

לפני כל merge מ-`develop` → `main`:

- [ ] כל הבדיקות (tests) עוברות
- [ ] Build מצליח
- [ ] Lint עובר ללא שגיאות
- [ ] הבעלים אישרה את השינויים
- [ ] נבדק על mobile (iOS + Android)
- [ ] נבדק זרימת תשלום
- [ ] נבדק שליחת מייל ו-PDF
- [ ] אין שגיאות ב-console
- [ ] Performance טוב (lighthouse / GTmetrix)

---

## 🎨 סביבות פיתוח

| Branch | URL | מטרה | גישה |
|--------|-----|------|------|
| `main` | https://abyk.online | **Production** | כולם |
| `develop` | https://develop.abyk.vercel.app | **Staging** | פיתוח בלבד |
| `feature/*` | https://feature-xxx.abyk.vercel.app | **Preview** | Vercel auto-preview |

> Vercel יוצר אוטומטית URL לכל PR, כך שניתן לראות שינויים לפני merge.

---

## 💡 טיפים

### איך לשמור על develop נקי?
- מזגו feature branches רק אחרי code review
- רצו tests לפני merge
- מחקו feature branches מיד אחרי merge

### איך לדעת מה יש ב-develop שאין ב-main?
```bash
git checkout develop
git log main..develop --oneline
```

### איך לשחזר commit ששובר משהו?
```bash
git revert <commit-hash>
git push origin develop
```

---

## 📞 שאלות נפוצות

**Q: מה אם אני רוצה לבדוק פיצ'ר לפני merge ל-develop?**  
A: Vercel יוצר preview URL אוטומטית לכל PR. פשוט פתח PR ותקבל לינק.

**Q: מה קורה אם אני עושה טעות ב-develop?**  
A: לא נורא! develop הוא לפיתוח. תתקן ותעשה commit נוסף. main מוגן.

**Q: איך מבטלים merge ש-develop שהשתבש?**  
A: `git revert` או `git reset --hard` (אם אף אחד לא משך את הקוד עדיין)

**Q: אפשר לעבוד על כמה feature branches במקביל?**  
A: בהחלט! זה בדיוק למה יש ענפים נפרדים.

---

**עודכן**: אוקטובר 2025  
**מטרה**: פיתוח בטוח ומאורגן, ללא פגיעה באתר הפעיל
