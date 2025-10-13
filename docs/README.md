# 📚 Documentation / תיעוד

ברוכים הבאים לתיקיית התיעוד של פרויקט ABYK!

---

## 📖 מדריכים עיקריים

### 🚀 [DEVELOPMENT.md](./DEVELOPMENT.md)

#### מדריך פיתוח מלא

- התקנה והגדרה
- סביבת פיתוח
- פקודות נפוצות
- Troubleshooting
- Testing

### 🌿 [BRANCHING.md](./BRANCHING.md)

#### אסטרטגיית Git וענפים

- מבנה הענפים (main, develop, feature/\*)
- תהליך עבודה עם Git
- הגנת production
- דוגמאות מעשיות
- **חובה לקרוא לפני עבודה על הפרויקט!**

### 🏗 [ARCHITECTURE.md](./ARCHITECTURE.md)

#### ארכיטקטורת המערכת

- Stack טכנולוגי
- מבנה מודולרי
- Data flow
- API endpoints
- Design system
- Component architecture

---

## 📁 מבנה התיקייה

```text
docs/
├── README.md              # המדריך הזה
├── DEVELOPMENT.md         # מדריך פיתוח
├── BRANCHING.md           # Git workflow
├── ARCHITECTURE.md        # ארכיטקטורה
├── PROJECT_STRUCTURE.md   # מפת הפרויקט לפי תיקיות
├── guides/                # מדריכים ספציפיים
│   ├── EMAIL-PDF-README.md      # מערכת מייל ו-PDF
│   ├── HOME-SPACING-GUIDE.md    # עיצוב ורווחים
│   └── TIKTOK-PIXEL-GUIDE.md    # אינטגרציית TikTok
└── (empty)                # הוסף תיקיות חדשות בעת הצורך
```

---

## 🎯 למי מיועד כל מסמך?

| מסמך                     | קהל יעד       | מתי לקרוא                  |
| ------------------------ | ------------- | -------------------------- |
| **PROJECT_STRUCTURE.md** | כל מי שמתחיל  | סקירה על מבנה הפרויקט      |
| **DEVELOPMENT.md**       | מפתחים חדשים  | התחלת עבודה                |
| **BRANCHING.md**         | כל מפתח       | לפני commit ראשון          |
| **ARCHITECTURE.md**      | מפתחים מנוסים | הבנת המערכת                |
| **guides/**              | לפי צורך      | בעת עבודה על תכונה ספציפית |

---

## 🔍 מציאת מידע

### רוצה ללמוד איך?

**להתקין את הפרויקט?**  
→ [DEVELOPMENT.md](./DEVELOPMENT.md)

**לעבוד עם Git?**  
→ [BRANCHING.md](./BRANCHING.md)

**להבין את המבנה?**  
→ [ARCHITECTURE.md](./ARCHITECTURE.md)

**לשלוח מייל או ליצור PDF?**  
→ [guides/EMAIL-PDF-README.md](./guides/EMAIL-PDF-README.md)

**לשפר עיצוב וטיפוגרפיה?**  
→ [guides/HOME-SPACING-GUIDE.md](./guides/HOME-SPACING-GUIDE.md)

---

## ✍️ הוספת תיעוד חדש

כשאתה מוסיף תכונה חדשה או משנה ארכיטקטורה:

1. **עדכן** את המסמכים הקיימים
2. **צור מדריך חדש** ב-`guides/` אם צריך
3. **הוסף קישור** למדריך זה (README.md)
4. **עדכן** את README הראשי של הפרויקט

### תבנית למדריך חדש

```markdown
# 🎯 [שם התכונה] - Guide

## מטרה

[הסבר קצר על מה המדריך]

## התקנה/הגדרה

[שלבי התקנה]

## שימוש

[דוגמאות קוד]

## API Reference

[אם רלוונטי]

## Troubleshooting

[בעיות נפוצות]

---

**עודכן**: [תאריך]
```

---

## 🔄 עדכון תיעוד

התיעוד נמצא בשליטת גרסאות (Git) ומתעדכן עם הקוד:

```bash
# עדכון מסמך
git add docs/DEVELOPMENT.md
git commit -m "docs: update development guide with new scripts"
git push
```

---

## 💡 עקרונות תיעוד טוב

✅ **ברור וקצר** - העבר מידע במינימום מילים  
✅ **דוגמאות מעשיות** - הראה קוד אמיתי  
✅ **מבנה לוגי** - כותרות ברורות  
✅ **עדכני** - תיעוד ישן גרוע מאין תיעוד  
✅ **בעברית** - הפרויקט ישראלי

---

## 📞 עזרה נוספת

אם משהו לא ברור:

1. חפש במסמכים הקיימים
2. בדוק את הקוד עצמו (TypeScript מתועד היטב)
3. פתח issue ב-GitHub
4. פנה לצוות: [awakening.by.ksenia@gmail.com](mailto:awakening.by.ksenia@gmail.com)

---

**עודכן לאחרונה**: אוקטובר 2025  
**מתוחזק על ידי**: Awakening by Ksenia Team
