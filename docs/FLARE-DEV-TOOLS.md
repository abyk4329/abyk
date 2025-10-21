# 🔥 Flare Dev Tools - מדריך התקנה והשימוש

## 📋 סקירה כללית

**Flare Dev Tools** היא מערכת כלי פיתוח מתקדמת עבור VS Code שמספקת:

- 🖥️ **תצוגת אתר** עם בוחר גודלי מסך (מובייל/טאבלט/מחשב)
- 🧪 **בדיקות מהירות** בעברית עם כפתורים פשוטים
- 💻 **קונסול JavaScript** מתקדם
- ⚡ **בדיקות ביצועים ונגישות** אוטומטיות

---

## 🚀 התקנה מהירה

### שלב 1: התקנת Joyride Extension

```bash
# התקנה דרך Command Palette
Cmd+Shift+P → "Extensions: Install Extensions" → חפש "Joyride"
```

או התקנה דרך שורת פקודה:

```bash
code --install-extension betterthantomorrow.joyride
```

### שלב 2: יצירת מבנה הקבצים

צור את המבנה הבא בפרויקט שלך:

```
your-project/
├── .joyride/
│   ├── scripts/
│   │   └── flare.cljs
│   └── keybindings.json
├── assets/
│   └── flare-dev/
│       └── panel.html
└── .vscode/
    └── settings.json (עדכון הגדרות קיימות)
```

### שלב 3: העתקת קבצים

#### 📁 `.joyride/scripts/flare.cljs`

```clojure
(ns flare-script
  (:require [joyride.core :as joyride]
            [joyride.flare :as flare]))

(def panel-config
  {:file "assets/flare-dev/panel.html"
   :title "🔥 כלי פיתוח Flare"
   :key :sidebar-1
   :reveal? true
   :preserve-focus? false
   :webview-options {:enableScripts true
                     :retainContextWhenHidden true}})

(defn show-panel! []
  (flare/flare!+ panel-config))

(when (= (joyride/invoked-script) "scripts/flare.cljs")
  (show-panel!))
```

#### 📁 `.joyride/keybindings.json`

```json
[
  {
    "key": "cmd+option+j f",
    "command": "joyride.runWorkspaceScript",
    "args": "scripts/flare.cljs"
  },
  {
    "key": "ctrl+shift+f",
    "command": "joyride.runWorkspaceScript",
    "args": "scripts/flare.cljs"
  }
]
```

#### 📁 `.vscode/settings.json` (הוספה להגדרות קיימות)

```json
{
  "joyride.autoActivate": true,
  "joyride.cljsRepl.useNpm": false
}
```

#### 📁 `assets/flare-dev/panel.html`

**העתקי את הקובץ המלא מהפרויקט ABYK:**

```bash
# העתק מפרויקט ABYK לפרויקט החדש
cp /path/to/ABYK/assets/flare-dev/panel.html ./assets/flare-dev/panel.html
```

---

## ⚙️ התאמות לפרויקט ספציפי

### 🔧 שינוי כתובת שרת הפיתוח

ערוך את `panel.html` ושנה את ה-URL בשורה:

```html
<input
  type="text"
  class="url-input"
  id="urlInput"
  value="http://localhost:3000"
  ...
/>
```

ל:

```html
<input
  type="text"
  class="url-input"
  id="urlInput"
  value="http://localhost:YOUR_PORT"
  ...
/>
```

### 🎯 התאמת בדיקות ספציפיות לפרויקט

ערוך את הפונקציות בתוך `panel.html` בקטע ה-JavaScript:

```javascript
// דוגמה: בדיקה ספציפית לפרויקט Next.js
checkNextjs: () => {
  const nextScript = document.querySelector('script[src*="_next"]');
  if (nextScript) {
    return { result: `✅ Next.js זוהה בהצלחה!`, type: 'success' };
  } else {
    return { result: `❌ Next.js לא זוהה`, type: 'error' };
  }
},

// דוגמה: בדיקה ספציפית לפרויקט React
checkReact: () => {
  const reactRoot = document.getElementById('root') || document.getElementById('__next');
  if (reactRoot) {
    return { result: `✅ React root נמצא!`, type: 'success' };
  } else {
    return { result: `❌ React root לא נמצא`, type: 'error' };
  }
}
```

והוסף כפתורים בקטע ה-HTML:

```html
<div class="test-category">
  <h3>⚛️ בדיקות React/Next.js</h3>
  <button class="test-button" data-test="checkNextjs">בדוק Next.js</button>
  <button class="test-button" data-test="checkReact">בדוק React Root</button>
</div>
```

---

## 🎮 קיצורי מקלדת

| קיצור            | פעולה                         |
| ---------------- | ----------------------------- |
| `Cmd+Option+J F` | פתיחת Flare Dev Tools         |
| `Ctrl+Shift+F`   | פתיחת Flare Dev Tools (חלופי) |

---

## 📖 איך להשתמש

### 🖥️ **טאב תצוגה**

1. **שנה URL**: הכנס כתובת של הפרויקט שלך
2. **בחר מכשיר**: בחר מהרשימה (iPhone/iPad/מחשב)
3. **רענן**: לחץ ↻ לעדכון התצוגה

### 🧪 **טאב בדיקות מהירות**

- **לחץ על כפתור** → הבדיקה רצה אוטומטית
- **תוצאות בצבעים**:
  - 🟢 **ירוק** = הכל בסדר
  - 🔴 **אדום** = יש בעיה
  - 🔵 **כחול** = מידע

### 💻 **טאב קונסול**

- **כתוב פקודות JavaScript** לבדיקת הפרויקט
- **דוגמאות שימושיות**:
  ```javascript
  document.querySelector('h1');
  localStorage.getItem('theme');
  window.innerWidth;
  ```

---

## 🛠️ פתרון בעיות נפוצות

### ❌ **הפאנל לא נפתח**

1. ודא ש-Joyride מותקן ופעיל
2. הפעל מחדש את VS Code
3. נסה: `Cmd+Shift+P` → "Joyride: Activate"

### ❌ **קיצורי המקלדת לא עובדים**

1. בדוק שהקובץ `.joyride/keybindings.json` קיים
2. הפעל מחדש את VS Code
3. נסה הפעלה ידנית: `Cmd+Shift+P` → "Joyride: Run Workspace Script" → `scripts/flare.cljs`

### ❌ **התצוגה לא מוצגת**

1. ודא שהשרת רץ על הכתובת הנכונה
2. בדוק שאין חסימת CORS
3. ודא שהקובץ `panel.html` קיים בנתיב הנכון

### ❌ **הבדיקות לא עובדות**

1. ודא שהאתר נטען במסגרת (iframe)
2. בדוק שאין שגיאות JavaScript בקונסול
3. ודא שה-Content Security Policy מאפשר scripts

---

## 🎨 התאמה אישית

### 🌈 **שינוי צבעים**

ערוך את ה-CSS Variables בתוך `panel.html`:

```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
}
```

### 📱 **הוספת גודלי מסך נוספים**

הוסף ל-`devices` object ב-JavaScript:

```javascript
const devices = {
  'custom-size': {
    name: 'מכשיר מותאם',
    width: 360,
    height: 640,
    class: 'device-custom',
  },
  // ... existing devices
};
```

והוסף את ה-CSS class:

```css
.device-custom {
  width: 360px;
  height: 640px;
}
```

### 🔧 **הוספת בדיקות חדשות**

1. הוסף פונקציה ל-`tests` object
2. הוסף כפתור ב-HTML עם `data-test="yourTestName"`
3. הפונקציה צריכה להחזיר: `{ result: "טקסט", type: "success/error/info" }`

---

## 📝 דוגמאות לפרויקטים שונים

### **Next.js**

```javascript
// URL ברירת מחדל
value = 'http://localhost:3000';

// בדיקות ספציפיות
checkNextjs: () => {
  const nextData = document.getElementById('__NEXT_DATA__');
  return nextData
    ? { result: '✅ Next.js זוהה', type: 'success' }
    : { result: '❌ Next.js לא זוהה', type: 'error' };
};
```

### **Vite**

```javascript
// URL ברירת מחדל
value = 'http://localhost:5173';

// בדיקות ספציפיות
checkVite: () => {
  const viteScript = document.querySelector(
    'script[type="module"][src*="@vite"]'
  );
  return viteScript
    ? { result: '✅ Vite זוהה', type: 'success' }
    : { result: '❌ Vite לא זוהה', type: 'error' };
};
```

### **React**

```javascript
// בדיקות ספציפיות
checkReactVersion: () => {
  if (window.React) {
    return { result: `✅ React ${window.React.version}`, type: 'success' };
  }
  return { result: '❌ React לא זוהה', type: 'error' };
};
```

---

## 🔄 עדכונים עתידיים

כדי לעדכן את הכלים:

1. העתק את `panel.html` המעודכן מפרויקט ABYK
2. עדכן את `flare.cljs` אם יש שינויים
3. הפעל מחדש את VS Code

---

## 💡 טיפים מתקדמים

### **ביצועים**

- השתמש ב-iframe sandbox לביטחון מוגבר
- הוסף debouncing לאירועי resize
- שמור העדפות ב-localStorage

### **שיתוף צוות**

- הוסף את `.joyride/` ו-`assets/flare-dev/` ל-git
- תעד בדיקות ספציפיות לפרויקט ב-README
- הגדר קיצורים אחידים לכל הצוות

### **אבטחה**

- ודא שה-panel.html לא נחשף בפרודקשיון
- השתמש ב-Content Security Policy מחמיר
- הימנע מהכנסת נתונים רגישים בבדיקות

---

## 📞 תמיכה

אם יש בעיות:

1. בדוק את הלוג של Joyride: `Cmd+Shift+P` → "Developer: Show Logs" → "Extension Host"
2. ודא שכל הקבצים במקום הנכון
3. נסה פתיחה ידנית של הסקריפט

---

**🎉 מוכן לשימוש! תהני מכלי הפיתוח החדשים!** 🔥
