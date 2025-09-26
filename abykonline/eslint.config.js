// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [".next/**", "dist/**", "node_modules/**", "pnpm-lock.yaml"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];
