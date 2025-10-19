# Design Fix Prompt Library

אספנו כאן פרומפטים מדויקים שאפשר להעתיק ולהדביק בכל פעם שמתעוררת בעיית עיצוב. כל פרומפט כולל תיאור קצר של המטרה, רשימת פעולות שאנו מבקשים מהעוזר לבצע, והקשר נוסף שניתן למלא לפי הצורך.

> טיפ: לפני השליחה, עדכני את החלקים המסומנים בסוגריים מרובעים כדי להתאים את הפרומפט למצב הנוכחי שלך.

---

## 1. רקע שמדליף או רווחים לא רצויים

```text
Trace the background: Identify which element or layer is painting the visible background in the affected area. Check html, body, layout wrappers, and the specific component containers.
Eliminate gaps: Inspect margins, padding, flex/grid gaps, or transforms that reveal the underlying background.
Unify background: Apply the desired background color/gradient on the top-most container that spans the entire section and ensure child elements inherit correctly.
Safe areas: Respect env(safe-area-*) values if relevant, and confirm the component still aligns with header/footer heights.
Context: [הדביקי כאן תיאור קצר של הרכיב והמסך]
```

## 2. ריווח אנכי סביב כותרות וכפתורים

```text
Audit vertical rhythm: List all margins/padding affecting the [section/component] top and bottom edges.
Standardize spacing: Align with our current design tokens (קלמפים/var(--space-*)). Remove אד-הוק ערכים קשיחים.
Header alignment: וודא שהחלק העליון של ה[כותרת/כפתור] מיושר עם רפרנס קבוע (header, grid line, או safe area).
Deliver snippet: החזר קוד CSS מעודכן שמחליף את הערכים הלא עקביים.
Context: [תארי איזה עמוד/מודול נפגע]
```

## 3. יישור רוחבי או Overflow

```text
Diagnose layout: זהי אם מדובר ב-flex, grid, או position absolute שגורם לחוסר יישור.
Container bounds: בדקי רוחבים מקסימליים (max-width), padding פנימי, ו-clampים שמשנים את הרוחב.
RTL/LTR: אם המסך ב-RTL, ודאי שהיישור מכבד direction ושהחישובים בנויים נכון.
Provide fix: הציעי שינויי CSS או מבנה DOM כדי שהאלמנטים [ימין/שמאל/מרכז] יהיו מיושרים.
Context: [צייני את האלמנטים הספציפיים ש"בורחים"]
```

## 4. נגישות צבעים/קונטרסט

```text
Accessibility review: הערך את יחס הניגודיות בין [foreground element] לבין הרקע המיידי שלו.
Token alignment: הצע צבע מתוך SURFACE/TEXT tokens הקיימים או הצע התאמה מינימלית שנשארת תואמת למותג.
Preview impact: תאר כיצד השינוי משפיע על hover/active/disabled.
Deliver CSS variables: החזר בלוק שמגדיר var(--token-name) או מחליף ערכים קיימים.
Context: [צרפי צילום מסך/ערכי צבע נוכחיים אם יש]
```

## 5. רספונסיביות ונקודות שבירה

```text
Breakpoint audit: הצג טבלה קצרה איך [component] מתנהג ב-<640px, 640-1024px, >1024px.
Compression fixes: הצע שינויים כדי למנוע שבירות/overlap במובייל, כולל התאמת clamp(), grid-template, ו-font-size.
Consistency: ודא ששימוש ב-hero-shell או app-main ממשיך לשמור על var(--page-shell-*) שהוגדרו.
Return diff: הצג שינויי CSS מלאים שניתן להעתיק.
Context: [צייני את המסכים שבהם יש בעיה]
```

## 6. כרטיסים/קומפוננטות ניומורפיות

```text
Neumorphic integrity: בדוק שהצללים, border-radius והגרדיאנטים עומדים בשפה של neu-card.
Elevation levels: הצג באיזה z-index/box-shadow משתמשים, ואם יש חוסר עקביות לעומת hero-card.
Performance note: וודא שהצללים לא כבדים מדי למובייל (נרתע מ-4 box-shadow כבדים).
Provide snippet: החזר card class מעודכן ופרטי shadow/gradient.
Context: [איזה כרטיס משתבש ואיפה]
```

## 7. בעיות עם safe areas (Notch / iOS)

```text
Safe area validation: ודא שכל המכלים העיקריים (app-shell, hero-shell, safe-top/bottom) משתמשים ב-env(safe-area-*) בצורה נכונה.
Overflow guard: בדוק אם body/html מקבלים no-scroll בטעות וגורמים לחיתוך.
Provide fix: הצע עדכונים ל-padding או min-height כדי שכל המידע יוצג גם במכשירים עם notch.
Context: [דגם מכשיר או צילום מסך]
```

## 8. שדרוג צבע רקע גלובלי / גרדיאנט

```text
Global surface: הצג כיצד לעדכן את --page-surface ו--page-surface-gradient עבור [route/component] כך שכל הפערים יישאו אותו הרקע.
Inheritance check: ודא שהערכים מחלחלים דרך hero-shell, app-main והקומפוננטות הפנימיות.
Testing steps: המלץ על Breakpoints/Theme modes לבדיקה.
Context: [הגדרי את שילוב הצבעים הרצוי]
```

---

### איך להשתמש בפרומפטים

1. בחרי את הסנריו הקרוב ביותר לבעיה הנוכחית.
2. מלאי את פרטי ההקשר בסוגריים.
3. העתיקי והדביקי כפרומפט מלא אל העוזר.
4. שמרי את התשובה/קוד המוחזר כפתרון מיידי לרגרסיות עתידיות.

בהצלחה! בכל פעם שעולה סנריו חדש שדורש פרומפט ייעודי, אפשר להרחיב את הקובץ ולשמור גרסה מעודכנת.
