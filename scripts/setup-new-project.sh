#!/bin/bash

# 🔥 Flare Dev Tools - הגדרת פרויקט חדש
# שימוש: ./setup-new-project.sh [project-name]

PROJECT_NAME=${1:-"my-project"}
ABYK_PATH="/Users/kseniachudnovskaya/Desktop/ABYK"

echo "🔥 מגדיר Flare Dev Tools לפרויקט: $PROJECT_NAME"

# יצירת תיקיות
mkdir -p "$PROJECT_NAME/.joyride/scripts"
mkdir -p "$PROJECT_NAME/assets/flare-dev"
mkdir -p "$PROJECT_NAME/.vscode"

# העתקת קבצים מפרויקט ABYK
echo "📁 מעתיק קבצים..."

# flare.cljs
cp "$ABYK_PATH/.joyride/scripts/flare.cljs" "$PROJECT_NAME/.joyride/scripts/"

# keybindings.json
cp "$ABYK_PATH/.joyride/keybindings.json" "$PROJECT_NAME/.joyride/"

# panel.html המלא
cp "$ABYK_PATH/assets/flare-dev/panel.html" "$PROJECT_NAME/assets/flare-dev/"

# מדריכים
cp "$ABYK_PATH/docs/FLARE-DEV-TOOLS.md" "$PROJECT_NAME/"
cp "$ABYK_PATH/FLARE-README.md" "$PROJECT_NAME/"

# יצירת הגדרות VS Code
cat > "$PROJECT_NAME/.vscode/settings.json" << 'EOF'
{
  "joyride.autoActivate": true,
  "joyride.cljsRepl.useNpm": false
}
EOF

echo "✅ הושלם! קבצים נוצרו ב: $PROJECT_NAME/"
echo ""
echo "📋 שלבים הבאים:"
echo "1. cd $PROJECT_NAME"
echo "2. code ."
echo "3. התקן Joyride: Cmd+Shift+P → Extensions: Install Extensions → Joyride"
echo "4. הפעל מחדש VS Code"
echo "5. לחץ Ctrl+Shift+F"
echo ""
echo "🔥 תהנה מכלי הפיתוח!"