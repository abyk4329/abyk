# מבנה העמודים והטקסטים | SITE STRUCTURE

<!-- markdownlint-disable MD024 MD036 MD040 -->

מסמך מאוחד למבנה HTML, טקסטים מדויקים וארכיטקטורת קומפוננטות  
**גרסה:** 2.0  
**תאריך:** 26.10.2025

---

## 📄 עמוד הבית | index.astro

### מבנה ויזואלי

```
┌─────────────────────────────────────┐
│         Header (שקוף)               │
├─────────────────────────────────────┤
│                                     │
│     ┌────────────────────┐          │
│     │   Hero Card        │          │
│     │   - כותרת H1       │          │
│     │   - תיאור          │          │
│     │   - כפתור CTA      │          │
│     └────────────────────┘          │
│                                     │
│     ┌────────────────────┐          │
│     │   Share Card       │          │
│     │   - תיאור שיתוף    │          │
│     │   - כפתור שיתוף    │          │
│     └────────────────────┘          │
│                                     │
│     ┌────────────────────┐          │
│     │   Social Grid      │          │
│     │   [W] [I] [T] [G]  │          │
│     └────────────────────┘          │
│                                     │
└─────────────────────────────────────┘
│      Footer (קבוע בתחתית)          │
└─────────────────────────────────────┘
```

### מבנה HTML

```astro
<BaseLayout
  title="קוד העושר האישי | Awakening by Ksenia"
  description="גלו את קוד העושר שלכם - כלי נומרולוגי להבנת הפוטנציאל האישי"
>
  <div class="page-container">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-card">
        <h1 class="hero-title">גלו את קוד העושר שלכם</h1>
        <p class="hero-description">
          כלי נומרולוגי המבוסס על תאריך לידה. מזהה פוטנציאל אישי ומקצועי
          ומספק כיוון ברור להגשמה ושפע.
        </p>
        <a href="/tools/wealth-code/calculator" class="btn btn-cta">
          מחשבון קוד העושר
        </a>
      </div>
    </section>

    <!-- Share Section -->
    <section class="share-section">
      <div class="share-card">
        <p class="share-description">
          שלחו לחברים ולמשפחה הזמנה לגלות את עצמם בלחיצה אחת
        </p>
        <div class="share-button-wrapper">
          <ShareButton client:load />
        </div>
      </div>
    </section>

    <!-- Social Links -->
    <section class="social-section" id="contact">
      <div class="social-grid">
        <a
          href="https://wa.me/972524616121"
          class="social-button social-whatsapp"
          aria-label="WhatsApp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg><!-- WhatsApp icon --></svg>
        </a>
        <a
          href="https://www.instagram.com/awakening.by.ksenia/"
          class="social-button social-instagram"
          aria-label="Instagram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg><!-- Instagram icon --></svg>
        </a>
        <a
          href="https://www.tiktok.com/@awakening.by.ksenia"
          class="social-button social-tiktok"
          aria-label="TikTok"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg><!-- TikTok icon --></svg>
        </a>
        <a
          href="mailto:awakening.by.ksenia@gmail.com"
          class="social-button social-gmail"
          aria-label="Gmail"
        >
          <svg><!-- Gmail icon --></svg>
        </a>
      </div>
    </section>
  </div>
</BaseLayout>
```

### טקסטים מדויקים

| אלמנט                 | טקסט                                                                                           | הערות                  |
| --------------------- | ---------------------------------------------------------------------------------------------- | ---------------------- |
| **H1**                | "גלו את קוד העושר שלכם"                                                                        | פנייה רבים תמיד        |
| **Hero Description**  | "כלי נומרולוגי המבוסס על תאריך לידה. מזהה פוטנציאל אישי ומקצועי ומספק כיוון ברור להגשמה ושפע." | ללא פנייה אישית        |
| **CTA Button**        | "מחשבון קוד העושר"                                                                             | ללא "שלכם"             |
| **Share Description** | "שלחו לחברים ולמשפחה הזמנה לגלות את עצמם בלחיצה אחת"                                           | פנייה רבים             |
| **Share Button**      | "שתפו עם מי שחשוב לכם"                                                                         | בתוך `ShareButton.tsx` |

### עיצוב CSS

**Hero Card:**

```css
.hero-card {
  background: rgb(var(--color-surface));
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-raised-min);
  padding: 2rem 1.5rem;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .hero-card {
    padding: 3rem 2rem;
  }
}
```

**Typography:**

```css
.hero-title {
  font-size: clamp(2rem, 8vw, 3rem);
  font-weight: 600;
  line-height: var(--leading-tight);
  margin-bottom: 1.5rem;
}

.hero-description {
  font-size: var(--text-base);
  font-weight: 500;
  line-height: var(--leading-normal);
  color: rgb(var(--color-text) / 0.8);
  max-width: 800px;
  margin: 0 auto 2rem;
}

@media (min-width: 768px) {
  .hero-title {
    font-size: clamp(2.5rem, 6vw, 4rem);
  }

  .hero-description {
    font-size: var(--text-lg);
  }
}
```

**CTA Button:**

```css
.btn-cta {
  display: inline-block;
  width: 100%;
  max-width: 350px;
  min-height: 48px;
  padding: 1rem 2rem;
  font-size: var(--text-lg);
  font-weight: 600;
  color: white;
  background: linear-gradient(
    135deg,
    rgb(var(--color-accent)),
    rgb(var(--color-support))
  );
  border-radius: var(--radius-full);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

.btn-cta:active {
  transform: scale(0.98);
}

@media (min-width: 768px) {
  .btn-cta {
    padding: 1.25rem 3rem;
    font-size: var(--text-xl);
  }
}
```

**Social Grid:**

```css
.social-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  max-width: 300px;
  margin: 0 auto;
}

@media (min-width: 480px) {
  .social-grid {
    max-width: 350px;
    gap: 1.25rem;
  }
}

@media (min-width: 768px) {
  .social-grid {
    grid-template-columns: repeat(4, 1fr);
    max-width: 600px;
    gap: 1.5rem;
  }
}
```

**Social Buttons:**

```css
.social-button {
  aspect-ratio: 1 / 1;
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(var(--color-surface));
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-raised-min);
  transition: transform 0.2s, box-shadow 0.2s;
}

.social-button svg {
  width: 32px;
  height: 32px;
  fill: currentColor;
}

.social-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
}

/* Hover colors per platform */
.social-whatsapp:hover {
  background: #25d366;
  color: white;
}

.social-instagram:hover {
  background: linear-gradient(
    45deg,
    #f09433,
    #e6683c,
    #dc2743,
    #cc2366,
    #bc1888
  );
  color: white;
}

.social-tiktok:hover {
  background: #000000;
  color: white;
}

.social-gmail:hover {
  background: linear-gradient(45deg, #4285f4, #34a853, #fbbc05, #ea4335);
  color: white;
}

@media (min-width: 480px) {
  .social-button {
    min-height: 80px;
  }
}
```

---

## 🧮 עמוד מחשבון | calculator.astro

### מבנה ויזואלי

```
┌─────────────────────────────────────┐
│         Header (שקוף)               │
├─────────────────────────────────────┤
│                                     │
│   H1: מחשבון קוד העושר              │
│                                     │
│   תיאור: הסבר קצר על הקוד          │
│                                     │
│   ┌─────────────────────┐           │
│   │  Calculator Island  │           │
│   │  - בחירת תאריך      │           │
│   │  - כפתור חישוב      │           │
│   │  - תוצאות           │           │
│   └─────────────────────┘           │
│                                     │
└─────────────────────────────────────┘
│      Footer (קבוע בתחתית)          │
└─────────────────────────────────────┘
```

### מבנה HTML

```astro
<BaseLayout
  title="מחשבון קוד העושר | Awakening by Ksenia"
  description="חשבו את קוד העושר האישי שלכם בהתבסס על תאריך לידה"
>
  <div class="page-container">
    <h1 class="page-title">מחשבון קוד העושר</h1>

    <p class="page-description">
      קוד העושר האישי הוא מפתח להבנה עמוקה של הפוטנציאל,
      המתנות והאתגרים. בחרו תאריך לידה ובואו נגלה אותו ביחד.
    </p>

    <CalculatorIsland client:load />
  </div>
</BaseLayout>
```

### טקסטים מדויקים

| אלמנט                | טקסט                                                                                                        | הערות        |
| -------------------- | ----------------------------------------------------------------------------------------------------------- | ------------ |
| **H1**               | "מחשבון קוד העושר"                                                                                          | ללא "שלכם"   |
| **Page Description** | "קוד העושר האישי הוא מפתח להבנה עמוקה של הפוטנציאל, המתנות והאתגרים. בחרו תאריך לידה ובואו נגלה אותו ביחד." | "בחרו" ברבים |

### עיצוב CSS

```css
.page-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 4.5rem 1.5rem;
}

@media (min-width: 768px) {
  .page-container {
    padding: 5.5rem 2rem;
  }
}

.page-title {
  font-size: 2.25rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }
}

.page-description {
  font-size: var(--text-lg);
  font-weight: 500;
  line-height: var(--leading-normal);
  color: rgb(var(--color-subheading-light));
  text-align: center;
  max-width: 700px;
  margin: 0 auto 2rem;
}

[data-theme='dark'] .page-description {
  color: rgb(var(--color-subheading-dark));
}

@media (min-width: 768px) {
  .page-description {
    font-size: var(--text-xl);
  }
}
```

---

## 📅 יומן בחירת תאריך | HebrewCalendar

### מבנה ויזואלי

```
┌─────────────────────────────────────┐
│  Overlay (ללא blur)                 │
│  ┌───────────────────────────┐      │
│  │ [X]              Calendar │      │
│  │ ───────────────────────── │      │
│  │  Month ▼     Year ▼       │      │
│  │                           │      │
│  │  ש  ו  ה  ר  ג  ב  א      │      │
│  │  1  2  3  4  5  6  7      │      │
│  │  8  9 [10] 11 12 13 14    │      │ ← "היום" במסגרת
│  │ 15 16 17 18 19 20 21      │      │
│  │ 22 23 24 25 26 27 28      │      │
│  └───────────────────────────┘      │
└─────────────────────────────────────┘
```

### מבנה HTML

```tsx
<div className="calendar-overlay" onClick={handleOverlayClick}>
  <div className="calendar-popup">
    <button
      className="calendar-close"
      onClick={onClose}
      aria-label="סגור יומן"
    >
      <svg><!-- X icon --></svg>
    </button>

    <div className="calendar-header">
      <select className="calendar-select" value={selectedMonth}>
        {/* 12 months */}
      </select>
      <select className="calendar-select" value={selectedYear}>
        {/* 1930 - currentYear */}
      </select>
    </div>

    <div className="calendar-days">
      {/* Days of week headers */}
    </div>

    <div className="calendar-grid">
      {/* Date buttons */}
    </div>
  </div>
</div>
```

### טקסטים מדויקים

| אלמנט            | טקסט                    | הערות         |
| ---------------- | ----------------------- | ------------- |
| **Close Button** | aria-label: "סגור יומן" | אייקון X בלבד |
| **Months**       | ינואר, פברואר, מרץ...   | בעברית        |
| **Days**         | א, ב, ג, ד, ה, ו, ש     | ראשי תיבות    |
| **Year Range**   | 1930 - שנה נוכחית       | קבוע          |

### עיצוב CSS

```css
.calendar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.calendar-popup {
  position: relative;
  background: rgb(var(--color-surface));
  border-radius: var(--radius-xl);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem 1.5rem;
  max-width: 350px;
  width: 90%;
}

.calendar-close {
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(var(--color-surface));
  border: none;
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-raised-min);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.calendar-close:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-raised-min), 0 2px 8px rgba(0, 0, 0, 0.1);
}

.calendar-close:active {
  box-shadow: var(--shadow-inset-min);
}

.calendar-select {
  background: linear-gradient(
    135deg,
    rgb(var(--color-accent)),
    rgb(var(--color-support))
  );
  color: white;
  font-weight: 600;
  border: none;
  border-radius: var(--radius-md);
  padding: 0.5rem 1rem;
}

.calendar-grid button.today {
  border: 2px solid rgb(var(--color-accent));
  background: rgb(var(--color-accent) / 0.1);
}
```

---

## 🍪 חלון הסכמה לקוקיז | CookieConsent

### מבנה ויזואלי

```
┌─────────────────────────────────────┐
│  Overlay (blur)                     │
│       ┌─────────────────┐           │
│       │  חלון קוקיז     │           │
│       │  - כותרת        │           │
│       │  - הסבר         │           │
│       │  [כפתור קבלה]  │           │
│       └─────────────────┘           │
└─────────────────────────────────────┘
```

### מבנה HTML

```tsx
<div className="cookie-consent-overlay">
  <div className="cookie-consent-modal">
    <h2 className="cookie-consent-title">אנחנו משתמשים בעוגיות 🍪</h2>
    <p className="cookie-consent-text">
      אנו משתמשים בעוגיות כדי לשפר את חוויית השימוש שלכם באתר. לחצו על "מקובל"
      כדי להמשיך.
    </p>
    <button className="cookie-consent-button" onClick={handleAccept}>
      מקובל
    </button>
  </div>
</div>
```

### טקסטים מדויקים

| אלמנט      | טקסט                                                                                   | הערות                         |
| ---------- | -------------------------------------------------------------------------------------- | ----------------------------- |
| **Title**  | "אנחנו משתמשים בעוגיות 🍪"                                                             | יוצא מן הכלל - emoji מותר כאן |
| **Text**   | "אנו משתמשים בעוגיות כדי לשפר את חוויית השימוש שלכם באתר. לחצו על 'מקובל' כדי להמשיך." | "שלכם" פנייה רבים             |
| **Button** | "מקובל"                                                                                |                               |

### עיצוב CSS

```css
.cookie-consent-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.cookie-consent-modal {
  background: rgb(var(--color-surface));
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-raised-min);
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  text-align: center;
}

.cookie-consent-button {
  background: linear-gradient(
    135deg,
    rgb(var(--color-accent)),
    rgb(var(--color-support))
  );
  color: white;
  font-weight: 600;
  font-size: var(--text-lg);
  border: none;
  border-radius: var(--radius-full);
  padding: 0.75rem 2rem;
  min-height: 48px;
  cursor: pointer;
  transition: transform 0.2s;
}

.cookie-consent-button:hover {
  transform: translateY(-2px);
}
```

---

## 🗂️ תפריט צד | Side Menu (Footer.tsx)

### מבנה ויזואלי

```text
┌────────────────────┐
│ [X] [💡]           │ ← כפתורי פעולה עליונים (סגירה + מצב צבע)
├────────────────────┤
│  AWAKENING BY      │
│  KSENIA            │
├────────────────────┤
│  🏠 דף הבית        │
│  🧮 מחשבון         │
│  📧 יצירת קשר       │
│  🔐 התחברות        │
│  📄 תנאים משפטיים   │
│  💾 שמירה למסך הבית│
└────────────────────┘
```

### מבנה HTML

```tsx
<>
  {/* Overlay */}
  <div className="menu-overlay" onClick={closeMenu} />

  {/* Side Menu */}
  <nav className="side-menu">
    <div className="menu-header-actions">
      <button
        type="button"
        className="menu-action-button close-button"
        onClick={closeMenu}
        aria-label="סגור תפריט"
      >
        <svg><!-- X icon --></svg>
      </button>

      <button
        type="button"
        className="menu-action-button theme-toggle-button"
        onClick={toggleThemeMode}
        aria-label="החליפו למצב כהה"
      >
        <svg><!-- Lightbulb icon --></svg>
      </button>
    </div>

    <div className="menu-content">
      <h2 className="menu-title">AWAKENING BY KSENIA</h2>

      <ul className="menu-links">
        <li>
          <a href="/" onClick={closeMenu}>
            <svg><!-- Home icon --></svg>
            <span className="BigNote">דף הבית</span>
          </a>
        </li>
        <li>
          <a href="/tools/wealth-code/calculator" onClick={closeMenu}>
            <svg><!-- Calculator icon --></svg>
            <span className="BigNote">מחשבון קוד העושר</span>
          </a>
        </li>
        <li>
          <a href="/contact" onClick={closeMenu}>
            <svg><!-- Mail icon --></svg>
            <span className="BigNote">יצירת קשר</span>
          </a>
        </li>
        <li>
          <a href="/login" onClick={closeMenu}>
            <svg><!-- Login icon --></svg>
            <span className="BigNote">התחברות</span>
          </a>
        </li>
        <li>
          <a href="/legal" onClick={closeMenu}>
            <svg><!-- File icon --></svg>
            <span className="BigNote">תנאים משפטיים</span>
          </a>
        </li>
        <li>
          <InstallPWA />
        </li>
      </ul>
    </div>
  </nav>
</>
```

### טקסטים מדויקים

| אלמנט            | טקסט                                               | הערות                      |
| ---------------- | -------------------------------------------------- | -------------------------- |
| **Close Button** | aria-label: "סגור תפריט"                           | אייקון X                   |
| **Theme Toggle** | aria-label: "החליפו למצב כהה" / "החליפו למצב בהיר" | אייקון נורה, מחליף מצב צבע |
| **Title**        | "AWAKENING BY KSENIA"                              | אנגלית, `font-weight: 300` |
| **דף הבית**      | "דף הבית"                                          |                            |
| **מחשבון**       | "מחשבון קוד העושר"                                 |                            |
| **קשר**          | "יצירת קשר"                                        |                            |
| **התחברות**      | "התחברות"                                          |                            |
| **משפטי**        | "תנאים משפטיים"                                    |                            |
| **PWA**          | "שמירה למסך הבית"                                  |                            |

### עיצוב CSS

```css
.side-menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  background: rgb(var(--color-surface));
  box-shadow: -4px 0 16px rgba(0, 0, 0, 0.1);
  padding: 3rem 1.5rem 2rem;
  overflow-y: auto;
  z-index: 5000;
  animation: slideInBounceRTL 0.4s var(--ease-bounce);
  border-top-left-radius: 32px;
  border-bottom-left-radius: 32px;
}

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

.side-menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  z-index: 4999;
  animation: fadeIn 0.3s;
}

.side-menu-title {
  font-size: var(--text-base);
  font-weight: 300;
  letter-spacing: 0.1em;
  text-align: center;
  margin-bottom: 2rem;
  color: rgb(var(--color-text));
}

.side-menu-list a,
.side-menu-list button {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  font-size: var(--text-sm);
  font-weight: 500;
  color: rgb(var(--color-text));
  background: rgb(var(--color-surface));
  border: none;
  border-radius: 12px;
  box-shadow: var(--shadow-raised-min);
  transition: box-shadow 0.2s, transform 0.2s;
}

.side-menu-list a:hover,
.side-menu-list button:hover {
  box-shadow: var(--shadow-raised-min), 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.side-menu-list svg {
  width: 20px;
  height: 20px;
  stroke-width: 1;
  color: rgb(var(--color-accent));
}
```

---

## 🦶 פוטר קבוע | Fixed Footer (Footer.tsx)

### מבנה ויזואלי

```
┌─────────────────────────────────┐
│  [≡]      [🏠]      [👤]        │
│  תפריט    הבית    התחברות       │
└─────────────────────────────────┘
```

### מבנה HTML

```tsx
<footer className="fixed-footer">
  <button
    className="footer-button"
    onClick={openMenu}
    aria-label="תפריט ניווט"
  >
    <svg><!-- Menu icon --></svg>
  </button>

  <a
    href="/"
    className="footer-button"
    aria-label="דף הבית"
  >
    <svg><!-- Home icon --></svg>
  </a>

  <a
    href="/login"
    className="footer-button"
    aria-label="התחברות"
  >
    <svg><!-- User icon --></svg>
  </a>
</footer>
```

### עיצוב CSS

```css
.fixed-footer {
  position: fixed;
  bottom: env(safe-area-inset-bottom);
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: clamp(2rem, 8vw, 4rem);
  padding: 0.75rem 1.5rem;
  background: rgb(var(--color-surface));
  backdrop-filter: blur(12px);
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.08);
  z-index: 1000;
}

.footer-button {
  width: clamp(48px, 12vw, 56px);
  height: clamp(48px, 12vw, 56px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(var(--color-surface));
  border: none;
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-inset-min);
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
}

.footer-button:hover {
  box-shadow: var(--shadow-raised-min);
  transform: translateY(-2px);
}

.footer-button svg {
  width: clamp(22px, 6vw, 28px);
  height: clamp(22px, 6vw, 28px);
  stroke-width: 1;
  color: rgb(var(--color-accent));
}
```

---

## 🌓 מתג נושאים | PullToggle

### מבנה ויזואלי

```
┌─────────────────────┐
│  ☀️ ━━━━⚪━━━━ 🌙  │  ← Light mode
└─────────────────────┘

┌─────────────────────┐
│  ☀️ ━━━━━━━⚪━━ 🌙  │  ← Dark mode (stars ✨)
└─────────────────────┘
```

### עיצוב CSS

```css
.theme-toggle {
  position: relative;
  width: 5rem;
  height: 2.5rem;
  background: linear-gradient(
    135deg,
    rgb(var(--color-accent)),
    rgb(var(--color-support))
  );
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: background 0.3s;
}

.theme-toggle__thumb {
  position: absolute;
  top: 0.25rem;
  width: 2rem;
  height: 2rem;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.theme-toggle--light .theme-toggle__thumb {
  transform: translateX(0.25rem);
}

.theme-toggle--dark .theme-toggle__thumb {
  transform: translateX(2.75rem);
}

.theme-toggle__stars {
  position: absolute;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s;
}

.theme-toggle--dark .theme-toggle__stars {
  opacity: 1;
  animation: twinkle 2s infinite;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}
```

---

## 📧 עמוד יצירת קשר | contact.astro

### מבנה ויזואלי

```
┌─────────────────────────────────────┐
│         Header (שקוף)               │
├─────────────────────────────────────┤
│                                     │
│   H1: יצירת קשר                     │
│   LeadText: הצטרפו אליי...          │
│                                     │
│   ┌─────────────────────┐           │
│   │  Share Card         │           │
│   │  [כפתור שיתוף]      │           │
│   └─────────────────────┘           │
│                                     │
│   ┌─────────────────────┐           │
│   │  Instagram Card     │           │
│   │  📷 Instagram       │           │
│   │  עקבו אחריי...      │           │
│   └─────────────────────┘           │
│                                     │
│   ┌─────────────────────┐           │
│   │  TikTok Card        │           │
│   │  🎵 TikTok          │           │
│   │  הצטרפו אליי...     │           │
│   └─────────────────────┘           │
│                                     │
│   ┌─────────────────────┐           │
│   │  WhatsApp Card      │           │
│   │  💬 WhatsApp        │           │
│   │  שלחו לי...         │           │
│   └─────────────────────┘           │
│                                     │
│   ┌─────────────────────┐           │
│   │  Email Card         │           │
│   │  ✉️ Email           │           │
│   │  שלחו לי...         │           │
│   └─────────────────────┘           │
│                                     │
└─────────────────────────────────────┘
│      Footer (קבוע בתחתית)          │
└─────────────────────────────────────┘
```

### מבנה HTML

```astro
<BaseLayout
  title="יצירת קשר - Awakening by Ksenia"
  description="יצירת קשר עם קסניה - הזמינו ייעוץ אישי בנומרולוגיה וקוד העושר"
>
  <div class="container">
    <h1 class="PageTitle">יצירת קשר</h1>
    <p class="LeadText">הצטרפו אליי ברשתות החברתיות ושתפו עם חברים ומשפחה</p>

    <!-- Share Button -->
    <section class="share-section">
      <div class="share-card">
        <ShareButton client:load title="Awakening by Ksenia" text="הצטרפו אליי ברשתות החברתיות" />
      </div>
    </section>

    <!-- Social Links -->
    <section class="social-section">
      <div class="social-grid">
        <a
          href="https://www.instagram.com/awakening.by.ksenia/"
          target="_blank"
          rel="noopener noreferrer"
          class="social-button instagram"
          aria-label="Instagram"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
          </svg>
          <span class="social-label">Instagram</span>
          <span class="social-description">עקבו אחריי באינסטגרם</span>
        </a>

        <a
          href="https://www.tiktok.com/@awakening.by.ksenia"
          target="_blank"
          rel="noopener noreferrer"
          class="social-button tiktok"
          aria-label="TikTok"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
          </svg>
          <span class="social-label">TikTok</span>
          <span class="social-description">הצטרפו אליי בטיקטוק</span>
        </a>

        <a
          href="https://wa.me/972524616121"
          target="_blank"
          rel="noopener noreferrer"
          class="social-button whatsapp"
          aria-label="WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
            <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>
          </svg>
          <span class="social-label">WhatsApp</span>
          <span class="social-description">שלחו לי הודעה בוואטסאפ</span>
        </a>

        <a
          href="mailto:awakening.by.ksenia@gmail.com"
          class="social-button email"
          aria-label="Email"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
          <span class="social-label">Email</span>
          <span class="social-description">שלחו לי אימייל</span>
        </a>
      </div>
    </section>
  </div>
</BaseLayout>
```

### טקסטים מדויקים

| אלמנט                     | טקסט                                                | הערות      |
| ------------------------- | --------------------------------------------------- | ---------- |
| **H1**                    | "יצירת קשר"                                         | PageTitle  |
| **LeadText**              | "הצטרפו אליי ברשתות החברתיות ושתפו עם חברים ומשפחה" | פנייה רבים |
| **Instagram Label**       | "Instagram"                                         | אנגלית     |
| **Instagram Description** | "עקבו אחריי באינסטגרם"                              | רבים       |
| **TikTok Label**          | "TikTok"                                            | אנגלית     |
| **TikTok Description**    | "הצטרפו אליי בטיקטוק"                               | רבים       |
| **WhatsApp Label**        | "WhatsApp"                                          | אנגלית     |
| **WhatsApp Description**  | "שלחו לי הודעה בוואטסאפ"                            | רבים       |
| **Email Label**           | "Email"                                             | אנגלית     |
| **Email Description**     | "שלחו לי אימייל"                                    | רבים       |

### עיצוב CSS

**Container:**

```css
.container {
  padding: 1.5rem 1rem;
  max-width: 900px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem 1rem;
  }
}
```

**Typography:**

```css
.PageTitle {
  margin-bottom: 1rem;
}

.LeadText {
  margin-bottom: 2rem;
}
```

**Share Card:**

```css
.share-section {
  margin-top: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

.share-card {
  width: 100%;
  max-width: 600px;
  background: rgb(var(--color-surface));
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  box-shadow: var(--shadow-raised-min);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
}
```

**Social Grid:**

```css
.social-section {
  margin-top: 1rem;
  padding: 0;
}

.social-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .social-section {
    margin-top: 2rem;
  }

  .social-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    max-width: 800px;
  }
}
```

**Social Buttons:**

```css
.social-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.5rem 1rem;
  background: rgb(var(--color-surface));
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-raised-min);
  transition: all 0.3s ease;
  color: rgb(var(--color-text));
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}

.social-button svg {
  color: rgb(var(--color-heading));
  stroke: currentColor;
  fill: none;
}

.social-label {
  font-size: var(--text-lg);
  font-weight: 600;
  color: rgb(var(--color-heading));
}

.social-description {
  font-size: var(--text-sm);
  font-weight: 400;
  color: rgb(var(--color-text));
  opacity: 0.8;
}

.social-button:active {
  transform: scale(0.95);
}

@media (min-width: 768px) {
  .social-button {
    padding: 2rem 1rem;
  }

  .social-button:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
  }

  .social-button:active {
    transform: translateY(-2px);
  }
}
```

**Hover Colors (Desktop only):**

```css
.social-button.whatsapp:hover {
  background: #25d366;
  color: white;
}

.social-button.whatsapp:hover .social-label,
.social-button.whatsapp:hover .social-description {
  color: white;
}

.social-button.instagram:hover {
  background: linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  color: white;
}

.social-button.instagram:hover .social-label,
.social-button.instagram:hover .social-description {
  color: white;
}

.social-button.tiktok:hover {
  background: #000000;
  color: white;
}

.social-button.tiktok:hover .social-label,
.social-button.tiktok:hover .social-description {
  color: white;
}

.social-button.email:hover {
  background: linear-gradient(
    135deg,
    #ea4335 0%,
    #fbbc04 33%,
    #34a853 66%,
    #4285f4 100%
  );
  color: white;
}

.social-button.email:hover .social-label,
.social-button.email:hover .social-description {
  color: white;
}
```

### אייקונים

**כל האייקונים עם stroke-width של 1px:**

- Instagram: 32x32px
- TikTok: 40x40px (גדול יותר)
- WhatsApp: 36x36px
- Email: 32x32px

**מקור האייקונים:** SVG inline דקים ומינימליסטיים

---

## 📧 מיילים | Email Templates

### מייל קוד עושר

**Subject:**

```
קוד העושר האישי שלכם מ-Awakening by Ksenia ✨
```

**מבנה HTML:**

```html
<table role="presentation" style="max-width: 600px;">
  <tr>
    <td style="text-align: center; padding: 2rem;">
      <h1>AWAKENING BY KSENIA</h1>
    </td>
  </tr>
  <tr>
    <td style="padding: 2rem;">
      <h2>קוד העושר שלכם: [XX-XX-XX]</h2>

      <p>שמחים להעביר אליכם את הפירוש המלא לקוד העושר האישי שלכם!</p>

      <p>הקוד שלכם מגלה תובנות עמוקות על:</p>
      <ul>
        <li>הפוטנציאל הכלכלי שלכם</li>
        <li>המתנות הרוחניות שלכם</li>
        <li>הדרכים להגשמה אישית</li>
      </ul>

      <a href="[LINK]" style="..."> הורידו את הפירוש המלא </a>
    </td>
  </tr>
  <tr>
    <td style="text-align: center; padding: 2rem; background: #f5f5f5;">
      <p>Awakening by Ksenia</p>
      <p>awakening.by.ksenia@gmail.com</p>
    </td>
  </tr>
</table>
```

**טקסטים:**

- פנייה: **רבים תמיד** ("שלכם", "אליכם")
- כפתור: "הורידו את הפירוש המלא"

---

## 📄 PDF | דוח קוד העושר

### מבנה עמודים

**עמוד 1 - כריכה:**

```
┌─────────────────────────┐
│                         │
│   AWAKENING BY KSENIA   │
│                         │
│  ═══════════════════    │
│                         │
│   קוד העושר האישי       │
│                         │
│      [XX-XX-XX]         │
│                         │
│   שם: [שם מלא]          │
│   תאריך: [DD.MM.YYYY]   │
│                         │
└─────────────────────────┘
```

**עמוד 2 - הקדמה:**

- כותרת: "מהו קוד העושר?"
- הסבר: 2-3 פסקאות
- הוראות: איך להשתמש במסמך

**עמודים 3-6 - פירוט:**

1. המשמעות הנומרולוגית
2. הפוטנציאל הכלכלי
3. המתנות הרוחניות
4. המלצות ליישום

**עמוד אחרון - סיכום:**

- נקודות עיקריות (3-5)
- המלצות פעולה
- פרטי קשר
- זכויות יוצרים

### עיצוב PDF

```css
@page {
  size: A4;
  margin: 20mm;
}

body {
  font-family: 'Assistant', sans-serif;
  font-size: 11pt;
  line-height: 1.6;
  color: rgb(36, 44, 47);
}

h1 {
  font-size: 32pt;
  font-weight: 600;
  color: rgb(var(--color-accent));
}

h2 {
  font-size: 24pt;
  font-weight: 600;
  color: rgb(var(--color-accent));
}

p {
  font-weight: 500;
}
```

---

## ✅ Checklist תוכן

לפני פרסום כל עמוד/קומפוננטה:

- [ ] כל הפניות הישירות ברבים ("גלו", "שתפו", "בחרו")
- [ ] תיאורים כלליים ללא פנייה אישית ("קוד העושר האישי")
- [ ] כל הכפתורים `font-weight: 600`
- [ ] כל הטקסט הרגיל `font-weight: 500`
- [ ] אין אימוג'ים (למעט חלון קוקיז)
- [ ] כל האייקונים SVG עם `stroke-width: 1`
- [ ] מבנה HTML semantic (`<section>`, `<nav>`, `<footer>`)
- [ ] ARIA labels על כל הכפתורים
- [ ] RTL על כל האלמנטים

---

**סוף מסמך STRUCTURE.md**

---

## 📄 עמוד תנאים משפטיים | legal.astro

### מבנה ויזואלי

```
┌─────────────────────────────────────┐
│         Header                      │
├─────────────────────────────────────┤
│                                     │
│     ┌────────────────────┐          │
│     │   PageTitle        │          │
│     │   "תנאי שימוש"     │          │
│     └────────────────────┘          │
│                                     │
│     ┌────────────────────┐          │
│     │   Card: תנאי שימוש │          │
│     │   - CardTitle      │          │
│     │   - CardSubtitle   │          │
│     │   - BodyText (5§)  │          │
│     └────────────────────┘          │
│                                     │
│     ┌────────────────────┐          │
│     │   Card: מדיניות    │          │
│     │   - CardTitle      │          │
│     │   - CardSubtitle   │          │
│     │   - BodyText (6§)  │          │
│     └────────────────────┘          │
│                                     │
│     ┌────────────────────┐          │
│     │   Card: עדכונים    │          │
│     │   - CardTitle      │          │
│     │   - BodyText (2§)  │          │
│     └────────────────────┘          │
│                                     │
└─────────────────────────────────────┘
│         Footer                      │
└─────────────────────────────────────┘
```

### מבנה HTML

```astro
<BaseLayout
  title="תנאי שימוש | Awakening by Ksenia"
  description="תנאי שימוש ומדיניות פרטיות לשירותי Awakening by Ksenia"
>
  <div class="page-container" dir="rtl">

    <!-- כותרת עמוד -->
    <h1 class="PageTitle">תנאי שימוש ומדיניות פרטיות</h1>

    <!-- קארד תנאי שימוש -->
    <div class="legal-card neu-raised-min">
      <h2 class="CardTitle">תנאי שימוש</h2>
      <h3 class="CardSubtitle">כללי</h3>
      <p class="BodyText">
        שימוש באתר ובשירותי Awakening by Ksenia מהווה הסכמה מלאה לתנאים המפורטים במסמך זה.
        השירותים המוצעים הם למטרות אישיות בלבד ואינם מהווים ייעוץ רפואי, פסיכולוגי או משפטי.
      </p>

      <h3 class="CardSubtitle">זכויות יוצרים</h3>
      <p class="BodyText">
        כל התכנים, הפירושים, האלגוריתמים והעיצובים באתר הם רכוש אינטלקטואלי שמור
        של Ksenia Chudnovskaya. אין להעתיק, להפיץ או לעשות שימוש מסחרי בחומרים ללא אישור בכתב.
      </p>

      <h3 class="CardSubtitle">שירותים דיגיטליים</h3>
      <p class="BodyText">
        השירות מסופק "כמות שהוא" (AS-IS). אנו שומרים על הזכות לשנות, להשעות או להפסיק את השירות
        בכל עת, עם או ללא הודעה מוקדמת.
      </p>

      <h3 class="CardSubtitle">הגבלת אחריות</h3>
      <p class="BodyText">
        האתר והשירותים מיועדים לצמיחה אישית בלבד ואינם מהווים תחליף לייעוץ מקצועי.
        אין להסתמך על הפירושים כבסיס יחיד לקבלת החלטות משמעותיות.
      </p>

      <h3 class="CardSubtitle">קניין רוחני</h3>
      <p class="BodyText">
        כל הטקסטים, הפירושים, האלגוריתמים והעיצובים הם קניין רוחני בלעדי של Ksenia Chudnovskaya.
        שימוש מסחרי או הפצה ללא אישור מפורש אסורים בהחלט.
      </p>
    </div>

    <!-- קארד מדיניות פרטיות -->
    <div class="legal-card neu-raised-min">
      <h2 class="CardTitle">מדיניות פרטיות</h2>

      <h3 class="CardSubtitle">איסוף מידע</h3>
      <p class="BodyText">
        אנו אוספים רק את המידע הנדרש למתן השירות: תאריך לידה עברי לחישוב קוד העושר,
        וכתובת אימייל במקרה של בקשה למשלוח תוצאות או יצירת קשר.
      </p>

      <h3 class="CardSubtitle">שימוש במידע</h3>
      <p class="BodyText">
        המידע משמש אך ורק לחישוב קוד העושר האישי ומשלוח תוצאות לפי בקשה.
        אנו לא משתפים, מוכרים או מעבירים את המידע לצדדים שלישיים ללא הסכמתך המפורשת.
      </p>

      <h3 class="CardSubtitle">אבטחת מידע</h3>
      <p class="BodyText">
        אנו נוקטים באמצעי אבטחה סטנדרטיים להגנת המידע האישי שלך.
        עם זאת, שום שיטה של העברת נתונים באינטרנט אינה מאובטחת ב-100%.
      </p>

      <h3 class="CardSubtitle">קובצי Cookie</h3>
      <p class="BodyText">
        האתר משתמש ב-cookies בסיסיים לצורך שיפור חווית המשתמש, זכירת העדפות (מצב כהה/בהיר),
        והפעלת תכונות טכניות כגון מעקב אחר מקורות כניסה באמצעות TikTok Pixel.
      </p>

      <h3 class="CardSubtitle">TikTok Pixel</h3>
      <p class="BodyText">
        האתר משתמש ב-TikTok Pixel לצורך מעקב אחר מקורות כניסה ושיפור קמפיינים שיווקיים.
        TikTok עשוי לאסוף מידע אנונימי על השימוש באתר. ניתן להסיר את ההסכמה בכל עת.
      </p>

      <h3 class="CardSubtitle">זכויותיך</h3>
      <p class="BodyText">
        את/ה זכאי לבקש עיון, עדכון או מחיקה של המידע האישי שלך בכל עת.
        לפרטים נוספים ניתן לפנות דרך עמוד הצור קשר.
      </p>
    </div>

    <!-- קארד עדכונים -->
    <div class="legal-card neu-raised-min">
      <h2 class="CardTitle">עדכוני התנאים</h2>
      <p class="BodyText">
        אנו שומרים לעצמנו את הזכות לעדכן מסמך זה מעת לעת.
        שינויים משמעותיים יפורסמו באתר עם ציון תאריך עדכון.
      </p>
      <p class="BodyText">
        המשך שימוש באתר לאחר עדכון התנאים מהווה הסכמה לתנאים המעודכנים.
      </p>
    </div>

  </div>
</BaseLayout>
```

### CSS

```css
/* legal.astro - inline styles */
.page-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  direction: rtl;
}

.legal-card {
  background: var(--surface);
  padding: 2rem;
  border-radius: var(--radius-lg);
  margin-bottom: 2rem;
  box-shadow: var(--neu-shadow-raised-min);
}

.legal-card h2 {
  margin-bottom: 1.5rem;
}

.legal-card h3 {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.legal-card p {
  margin-bottom: 1rem;
  line-height: 1.8;
}

.legal-card p:last-child {
  margin-bottom: 0;
}
```

---

## 📋 אינדקס עמודים | Page Index

### עמודים ראשיים

| עמוד                 | קובץ                                      | סטטוס    | תיאור                           |
| -------------------- | ----------------------------------------- | -------- | ------------------------------- |
| **עמוד הבית**        | `index.astro`                             | ✅ מוגמר | Hero + Share + Social Grid      |
| **מחשבון קוד העושר** | `tools/wealth-code/calculator.astro`      | ✅ מוגמר | יומן עברי + חישוב               |
| **עמוד תוצאה**       | `tools/wealth-code/result.astro`          | ✅ מוגמר | 3 קארדים (Personal/Growth/Soul) |
| **פירושים מלאים**    | `tools/wealth-code/interpretations.astro` | ✅ מוגמר | Tabs עם פירושי ספרות            |
| **צור קשר**          | `contact.astro`                           | ✅ מוגמר | Social media cards + share      |
| **תנאי שימוש**       | `legal.astro`                             | ✅ מוגמר | תנאים + פרטיות + עדכונים        |
| **התחברות**          | `login.astro`                             | ✅ מוגמר | LoginForm component             |
| **הרשמה**            | `signup.astro`                            | ✅ מוגמר | SignupForm component            |
| **UI Showcase**      | `ui-showcase.astro`                       | 🔧 פיתוח | בדיקת קומפוננטות                |

### עמודי redirect

| עמוד            | מפנה ל...             | תיאור          |
| --------------- | --------------------- | -------------- |
| `privacy.astro` | `legal.astro#privacy` | מדיניות פרטיות |
| `terms.astro`   | `legal.astro#terms`   | תנאי שימוש     |

### קומפוננטות מוגמרות

| קומפוננטה        | קובץ                              | תיאור                      | סטטוס   |
| ---------------- | --------------------------------- | -------------------------- | ------- |
| **Header**       | `Header.tsx`                      | לוגו + תפריט               | ✅ מוגן |
| **Footer**       | `Footer.tsx`                      | כפתורים קבועים + side menu | ✅ מוגן |
| **יומן עברי**    | `HebrewCalendar.tsx`              | בחירת תאריך לידה           | ✅ מוגן |
| **כרטיס תוצאה**  | `ResultCard.tsx`                  | תצוגת קוד עושר             | ✅ מוגן |
| **כפתור שיתוף**  | `ShareButton.tsx`                 | Web Share API              | ✅ מוגן |
| **חלון קוקיז**   | `CookieConsent.tsx`               | הסכמה לקוקיז               | ✅ מוגן |
| **Theme Toggle** | `ThemeToggle.tsx`                 | מצב בהיר/כהה               | ✅ מוגן |
| **טפסים**        | `LoginForm.tsx`, `SignupForm.tsx` | התחברות/הרשמה              | ✅ פעיל |

### עמודי API

| Endpoint               | תיאור               | סטטוס    |
| ---------------------- | ------------------- | -------- |
| `/api/webhooks/tiktok` | TikTok Pixel events | 🔧 פיתוח |

---

## 📱 ארכיטקטורת Navigation

### תפריט ראשי (Header)

```
Logo → עמוד הבית
תפריט הורד:
  ├─ קוד העושר האישי
  ├─ פירושים מלאים
  ├─ צור קשר
  ├─ תנאי שימוש
  └─ אזור אישי (login/signup)
```

### Footer קבוע

```
[Home] [Calculator] [Contact] [Menu]
```

### Side Menu (נפתח מ-Footer)

```
├─ עמוד הבית
├─ מחשבון קוד העושר
├─ פירושים מלאים
├─ צור קשר
├─ תנאי שימוש
├─ התחברות
└─ הרשמה
```

---

**סוף מסמך STRUCTURE.md**
