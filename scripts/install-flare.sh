#!/bin/bash

# 🔥 Flare Dev Tools - סקריפט התקנה אוטומטי
# הפעל: chmod +x install-flare.sh && ./install-flare.sh

echo "🔥 מתקין Flare Dev Tools..."

# בדיקה שזה workspace של git או pnpm
if [[ ! -f "package.json" && ! -f ".git/config" ]]; then
    echo "❌ אנא הפעל את הסקריפט מתוך root של הפרויקט (עם package.json או .git)"
    exit 1
fi

# יצירת תיקיות
echo "📁 יוצר מבנה תיקיות..."
mkdir -p .joyride/scripts
mkdir -p assets/flare-dev
mkdir -p .vscode

# הורדת קבצים מפרויקט ABYK (או העתקה ידנית)
echo "📥 מעתיק קבצי Flare Dev Tools..."

# יצירת flare.cljs
cat > .joyride/scripts/flare.cljs << 'EOF'
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
EOF

# יצירת keybindings.json
cat > .joyride/keybindings.json << 'EOF'
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
EOF

# עדכון .vscode/settings.json
if [[ -f ".vscode/settings.json" ]]; then
    echo "📝 מעדכן הגדרות VS Code קיימות..."
    # יצירת גיבוי
    cp .vscode/settings.json .vscode/settings.json.backup
    
    # הוספת הגדרות Joyride (בדיקה שלא קיימות כבר)
    if ! grep -q "joyride.autoActivate" .vscode/settings.json; then
        # הסרת הסוגריים הסוגרות האחרונות והוספת הגדרות חדשות
        sed -i.bak '$ s/}/,\n\n  \/\/ Joyride settings\n  "joyride.autoActivate": true,\n  "joyride.cljsRepl.useNpm": false\n}/' .vscode/settings.json
        rm .vscode/settings.json.bak
    fi
else
    echo "📝 יוצר קובץ הגדרות VS Code חדש..."
    cat > .vscode/settings.json << 'EOF'
{
  "joyride.autoActivate": true,
  "joyride.cljsRepl.useNpm": false
}
EOF
fi

# זיהוי port שרת פיתוח
echo "🔍 מזהה port שרת פיתוח..."
DEV_PORT="3000"

if [[ -f "package.json" ]]; then
    # בדיקת Next.js
    if grep -q "next" package.json; then
        DEV_PORT="3000"
        echo "🚀 זוהה Next.js - Port: 3000"
    # בדיקת Vite
    elif grep -q "vite" package.json; then
        DEV_PORT="5173"
        echo "⚡ זוהה Vite - Port: 5173"
    # בדיקת Create React App
    elif grep -q "react-scripts" package.json; then
        DEV_PORT="3000"
        echo "⚛️ זוהה Create React App - Port: 3000"
    # בדיקת Vue
    elif grep -q "@vue/cli" package.json; then
        DEV_PORT="8080"
        echo "🔧 זוהה Vue CLI - Port: 8080"
    fi
fi

echo "💻 יוצר panel.html עם Port: $DEV_PORT..."

# יצירת panel.html עם port מותאם
cat > assets/flare-dev/panel.html << EOF
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta
    http-equiv="Content-Security-Policy"
    content="default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-rsa5dha5e4hj5euh4'; img-src data: https:; frame-src http://localhost:$DEV_PORT https://localhost:$DEV_PORT;"
  />
  <title>🔥 כלי פיתוח Flare</title>
  <style>
    /* כל הסגנונות יוכנסו כאן */
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: var(--vscode-editor-background, #1e1e1e);
      color: var(--vscode-editor-foreground, #d4d4d4);
      height: 100vh;
      display: flex;
      flex-direction: column;
      direction: rtl;
    }
    .header {
      padding: 8px 12px;
      border-bottom: 1px solid var(--vscode-widget-border, #464647);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--vscode-editorGroupHeader-tabsBackground, #2d2d2d);
    }
    .header h1 { font-size: 14px; font-weight: 600; }
    .tabs { display: flex; gap: 4px; }
    .tab {
      padding: 4px 8px;
      background: var(--vscode-tab-inactiveBackground, #2d2d2d);
      border: 1px solid var(--vscode-tab-border, #464647);
      border-radius: 3px;
      cursor: pointer;
      font-size: 11px;
    }
    .tab.active {
      background: var(--vscode-tab-activeBackground, #1e1e1e);
      color: var(--vscode-tab-activeForeground, #ffffff);
    }
    .content { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
    .tab-panel { display: none; flex: 1; flex-direction: column; }
    .tab-panel.active { display: flex; }
    .preview-container { flex: 1; display: flex; flex-direction: column; }
    .preview-controls {
      padding: 8px;
      border-bottom: 1px solid var(--vscode-widget-border, #464647);
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .url-input {
      flex: 1;
      padding: 4px 8px;
      background: var(--vscode-input-background, #3c3c3c);
      border: 1px solid var(--vscode-input-border, #464647);
      color: var(--vscode-input-foreground, #cccccc);
      border-radius: 3px;
      font-size: 12px;
      direction: ltr;
    }
    .btn {
      padding: 4px 8px;
      background: var(--vscode-button-background, #0e639c);
      color: var(--vscode-button-foreground, #ffffff);
      border: none;
      border-radius: 3px;
      cursor: pointer;
      font-size: 11px;
    }
    .preview-frame-container {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 16px;
      background: var(--vscode-editor-background, #1e1e1e);
      overflow: auto;
    }
    .preview-frame {
      border: 2px solid var(--vscode-widget-border, #464647);
      border-radius: 8px;
      background: white;
      width: 375px;
      height: 667px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🔥 כלי פיתוח Flare</h1>
    <div class="tabs">
      <div class="tab active" data-tab="preview">תצוגה</div>
    </div>
  </div>

  <div class="content">
    <div class="tab-panel active" id="preview-panel">
      <div class="preview-container">
        <div class="preview-controls">
          <input type="text" class="url-input" id="urlInput" value="http://localhost:$DEV_PORT" placeholder="הכנס כתובת...">
          <button class="btn" id="refreshBtn">↻ רענון</button>
        </div>
        
        <div class="preview-frame-container">
          <iframe class="preview-frame" id="previewFrame" src="http://localhost:$DEV_PORT" title="תצוגת האתר"></iframe>
        </div>
      </div>
    </div>
  </div>

  <script nonce="rsa5dha5e4hj5euh4">
    const vscode = acquireVsCodeApi();
    
    const urlInput = document.getElementById('urlInput');
    const refreshBtn = document.getElementById('refreshBtn');
    const previewFrame = document.getElementById('previewFrame');

    refreshBtn.addEventListener('click', () => {
      previewFrame.src = urlInput.value;
    });

    urlInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        previewFrame.src = urlInput.value;
      }
    });

    vscode.postMessage({
      command: 'ready',
      text: 'כלי פיתוח Flare מוכנים לעבודה!'
    });
  </script>
</body>
</html>
EOF

# הוספת .gitignore rules אם קיים
if [[ -f ".gitignore" ]]; then
    if ! grep -q "# Flare Dev Tools" .gitignore; then
        echo "" >> .gitignore
        echo "# Flare Dev Tools - keep these files" >> .gitignore
        echo "# .joyride/" >> .gitignore
        echo "# assets/flare-dev/" >> .gitignore
    fi
fi

echo ""
echo "✅ התקנה הושלמה בהצלחה!"
echo ""
echo "🚀 להתחלת שימוש:"
echo "   1. הפעל מחדש את VS Code"
echo "   2. התקן Joyride Extension: code --install-extension betterthantomorrow.joyride"
echo "   3. הפעל את שרת הפיתוח שלך על port $DEV_PORT"
echo "   4. לחץ Ctrl+Shift+F או Cmd+Option+J F"
echo ""
echo "📖 מדריך מלא: docs/FLARE-DEV-TOOLS.md"
echo ""
echo "🔥 תהנה מכלי הפיתוח החדשים!"