const fs = require("fs");
const path = require("path");

// =============================
// ABYK folder bootstrap script
// Next.js 15 App Router with explicit route groups:
// - (marketing) public landings & campaigns
// - (funnels)   multi-step conversion flows
// - (legal)     compliance content
// - (labs)      playgrounds, design reviews, experiments
// Also provisions design collaboration folders (Figma exports & dev handoff).
// Safe to re-run (idempotent) and won’t overwrite files.
// =============================

// Directories to create (idempotent)
const directories = [
  // Next.js App Router groups
  "app/(marketing)",
  "app/(funnels)",
  "app/(legal)",
  "app/(labs)",

  // App-level shared layers
  "app/components",
  "app/components/analytics",
  "app/components/layout",
  "app/components/lib",
  "app/components/sections",
  "app/components/shared",
  "app/lib",
  "app/styles",

  // Tooling & scripts
  "scripts",

  // Design collaboration workspace
  "design",
  "design/figma",
  "design/figma/components",
  "design/figma/screens",
  "design/figma/tokens",
  "design/figma/assets",
  "design/handoff",
  "design/handoff/components",
  "design/handoff/styles",
  "design/handoff/assets",

  // Feature modules
  "features",
  "features/wealth-code",
  "features/wealth-code/components",
  "features/wealth-code/components/sections",
  "features/wealth-code/data",
  "features/wealth-code/email",
  "features/wealth-code/layout",
  "features/wealth-code/pdf",
  "features/wealth-code/utils",

  // Shared libraries
  "lib",
  "lib/core",
  "lib/core/email",
  "lib/email",
  "lib/utils",

  // Content & static assets
  "public/images",
  "public/icons",
  "public/fonts",
  "public/design",
  "public/uploads",
  "public/tmp",

  // Tests
  "tests",
  "tests/e2e",
];

// Create directories recursively if missing
function ensureDir(dir) {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ Created: ${fullPath}`);
  } else {
    console.log(`ℹ️  Exists:  ${fullPath}`);
  }
}

directories.forEach(ensureDir);

// Create README.md in each directory describing its purpose (idempotent)
function ensureReadme(dir) {
  const fullPath = path.join(process.cwd(), dir);
  const readmePath = path.join(fullPath, "README.md");
  const dirName = dir.split("/").pop();
  if (!fs.existsSync(readmePath)) {
    const content = `# ${dirName}\n\nThis directory contains ${dirName}-related files.\n- Keep experiments inside \`app/(labs)\` until they are production ready.\n- Promote shared UI into \`app/components/*\` once stable.\n- Leave a short note when you restructure or move code.`;
    fs.writeFileSync(readmePath, content);
    console.log(`📝 README created in: ${readmePath}`);
  }
}

directories.forEach(ensureReadme);

// --- Dev helper files (created once) ---
function ensureFile(filePath, content) {
  const full = path.join(process.cwd(), filePath);
  const dir = path.dirname(full);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(full)) {
    fs.writeFileSync(full, content);
    console.log(`🧩 File created: ${full}`);
  } else {
    console.log(`ℹ️  File exists: ${full}`);
  }
}

const DEV_CHECK = `#!/usr/bin/env node
/*
  dev-check.js — quick health checks for structure & types
  - Validates TypeScript (no emit)
  - Optionally runs ESLint if available
  - Scans for missing barrel files in core folders
*/
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const barrelDirs = [
  'app/components',
  'app/components/layout',
  'app/components/sections',
  'features/wealth-code/components',
  'features/wealth-code/components/sections',
  'features/wealth-code/utils',
  'lib',
  'lib/core',
  'lib/core/email'
];

function run(cmd) {
  try {
    console.log(\`\\n▶ \${cmd}\`);
    execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    console.error(\`✖ Failed: \${cmd}\`);
    process.exitCode = 1;
  }
}

// 1) TypeScript check
if (fs.existsSync('tsconfig.json')) {
  run('npx tsc --noEmit');
} else {
  console.log('ℹ️  No tsconfig.json; skipping tsc check');
}

// 2) ESLint (optional)
try {
  require.resolve('eslint');
  run('npx eslint . --max-warnings=0');
} catch (e) {
  console.log('ℹ️  ESLint not installed; skipping lint');
}

// 3) Barrel presence scan
let missing = [];
for (const dir of barrelDirs) {
  const full = path.join(process.cwd(), dir);
  const index = path.join(full, 'index.ts');
  if (fs.existsSync(full) && !fs.existsSync(index)) {
    missing.push(dir);
  }
}
if (missing.length) {
  console.log('\\n⚠ Missing barrel files (index.ts) in:');
  for (const m of missing) console.log(' - ' + m);
  process.exitCode = 1;
} else {
  console.log('\\n✅ Barrel files present in all core folders');
}

console.log('\\n✔ dev-check finished');
`;

const STRUCTURE_DOC = `# Project Structure

מקור האמת למבנה הפרויקט נמצא ב-\`docs/PROJECT_STRUCTURE.md\`.
אם קובץ זה נוצר אוטומטית, העתיקו אליו את התוכן המעודכן מהמאגר הראשי.
`;

ensureFile("scripts/dev-check.js", DEV_CHECK);
try {
  fs.chmodSync(path.join(process.cwd(), "scripts/dev-check.js"), 0o755);
} catch {}
ensureFile("docs/PROJECT_STRUCTURE.md", STRUCTURE_DOC);

// Create index.ts (barrel files) in common code folders (idempotent)
const barrelDirs = [
  "app/components",
  "app/components/layout",
  "app/components/sections",
  "features/wealth-code/components",
  "features/wealth-code/components/sections",
  "features/wealth-code/utils",
  "lib",
  "lib/core",
  "lib/core/email",
];

function ensureBarrel(dir) {
  const fullPath = path.join(process.cwd(), dir);
  const indexPath = path.join(fullPath, "index.ts");
  if (!fs.existsSync(fullPath)) return; // guard
  if (!fs.existsSync(indexPath)) {
    const header = `// Barrel file for ${dir}\n// Re-export modules from this folder here.\n`;
    fs.writeFileSync(indexPath, header);
    console.log(`📦 Barrel created: ${indexPath}`);
  }
}

barrelDirs.forEach(ensureBarrel);

console.log("\n✨ Folder structure aligned successfully.");
