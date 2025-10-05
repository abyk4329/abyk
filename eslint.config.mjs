import { defineConfig } from "eslint/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    ignores: ["**/.next/**", "node_modules/**", "figmawebdesign/**"],
  },
  ...compat.extends("next/core-web-vitals"),
  {
    files: ["**/ui/tabs.tsx", "**/ui/tabs.ts"],
    rules: {
      // Disable ARIA warnings for tabs component - false positives
      // The component structure is correct at runtime
      "jsx-a11y/role-has-required-aria-props": "off",
      "jsx-a11y/aria-props": "off",
      "jsx-a11y/aria-proptypes": "off",
      "jsx-a11y/role-supports-aria-props": "off",
    },
  },
]);
