const fs = require("fs");
const path = require("path");

// רשימת התיקיות שנרצה ליצור
const directories = [
  "src/components/common",
  "src/components/layout",
  "src/components/widgets",
  "src/styles",
  "src/pages",
  "src/features/wealth-calculator/components",
  "src/features/wealth-calculator/hooks",
  "src/features/wealth-calculator/types",
  "src/hooks",
  "src/utils",
  "src/types",
  "src/services",
  "src/context/theme",
  "src/content/general",
  "src/content/wealth-calculator",
];

// יצירת התיקיות
directories.forEach((dir) => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`נוצרה תיקייה: ${fullPath}`);
  } else {
    console.log(`התיקייה כבר קיימת: ${fullPath}`);
  }
});

// יצירת קובץ README בכל תיקייה להסביר את מטרתה
directories.forEach((dir) => {
  const readmePath = path.join(process.cwd(), dir, "README.md");
  const dirName = dir.split("/").pop();

  if (!fs.existsSync(readmePath)) {
    const content = `# ${dirName}\n\nThis directory contains ${dirName}-related files.`;
    fs.writeFileSync(readmePath, content);
    console.log(`נוצר קובץ README ב: ${readmePath}`);
  }
});

console.log("מבנה התיקיות נוצר בהצלחה!");
