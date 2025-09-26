// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";

const config = [
  {
    ignores: [
      ".next/**",
      "dist/**",
      "node_modules/**",
      "pnpm-lock.yaml",
      "next-env.d.ts",
      "**/favicon.ico/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];

export default config;
