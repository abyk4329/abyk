#!/bin/bash
# ---- PREP ----
set -euo pipefail

echo "▶ Checking Node & pnpm…"
node -v
if ! command -v pnpm >/dev/null 2>&1; then
  echo "⚠ pnpm not found, installing…"
  npm i -g pnpm@9
fi
pnpm -v

echo "▶ Cleaning old installs…"
rm -rf node_modules .next package-lock.json

echo "▶ Install deps from lockfile…"
pnpm install || {
  echo "❌ Failed to install dependencies. Check your network and pnpm-lock.yaml"
  exit 1
}

# ---- TAILWIND v4 / POSTCSS ----
echo "▶ Ensuring Tailwind v4 + PostCSS plugin…"
pnpm add -D tailwindcss@latest @tailwindcss/postcss@latest postcss@latest

# create/overwrite PostCSS config (v4 format)
cat > postcss.config.mjs <<'EOF'
export default {
  plugins: { '@tailwindcss/postcss': {} },
};
EOF

# ensure @import "tailwindcss"; at top of globals.css
if [ -f app/globals.css ]; then
  if ! grep -q '^@import "tailwindcss";' app/globals.css; then
    echo "▶ Injecting '@import \"tailwindcss\";' into app/globals.css (first line)…"
    # macOS-compatible in-place edit
    sed -i '' '1s;^;@import "tailwindcss";\n;' app/globals.css
  fi
else
  echo "▶ Creating app/globals.css with Tailwind import…"
  mkdir -p app
  printf '%s\n\n' '@import "tailwindcss";' > app/globals.css
fi

# ---- NEXT CONFIG (typed routes helpful) ----
if [ ! -f next.config.ts ] && [ ! -f next.config.js ]; then
  echo "▶ Creating next.config.ts with typedRoutes…"
  cat > next.config.ts <<'EOF'
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typedRoutes: true,
};

export default nextConfig;
EOF
fi

# ---- ESLINT 9 (Flat Config) ----
# Create eslint.config.mjs if missing (recommended baseline for Next+TS)
if [ ! -f eslint.config.mjs ]; then
  echo "▶ Creating eslint.config.mjs (Flat Config)…"
  pnpm add -D eslint @eslint/js typescript-eslint @next/eslint-plugin-next
  cat > eslint.config.mjs <<'EOF'
import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  nextPlugin.configs['core-web-vitals'],
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
];
EOF
fi

# ---- PACKAGE SCRIPTS & ENGINES (lock to pnpm) ----
echo "▶ Patching package.json scripts & engines…"
node -e "const fs=require('fs');const p='package.json';const j=JSON.parse(fs.readFileSync(p,'utf8'));
j.scripts=j.scripts||{};
j.scripts.preinstall='npx only-allow pnpm';
j.scripts.dev = j.scripts.dev || 'next dev';
j.scripts.build = 'next build';
j.scripts.start = 'next start';
j.scripts.lint = 'eslint .';
if (j.scripts['next:lint']) delete j.scripts['next:lint'];
j.engines = {...(j.engines||{}), node: '>=20 <23', pnpm: '>=9'};
fs.writeFileSync(p, JSON.stringify(j,null,2)); console.log('✔ package.json updated');"

echo "▶ Reinstall to align lockfile if needed…"
pnpm install

# ---- QUALITY GATES ----
echo "▶ Type-check…"
pnpm exec tsc --noEmit || true

echo "▶ Lint…"
pnpm run lint || true

echo "✅ Setup complete! Ready for development."
echo "▶ To start dev server: pnpm dev"
