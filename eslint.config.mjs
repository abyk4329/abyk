import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  {
    ignores: [
      '**/.next/**',
      '**/node_modules/**',
      '**/figmawebdesign/**',
      '**/.git/**',
    ],
  },
  ...compat.extends('next/core-web-vitals'),
  {
    files: ['**/ui/tabs.tsx', '**/ui/tabs.ts'],
    rules: {
      'jsx-a11y/role-has-required-aria-props': 'off',
      'jsx-a11y/aria-props': 'off',
      'jsx-a11y/aria-proptypes': 'off',
      'jsx-a11y/role-supports-aria-props': 'off',
      'jsx-a11y/aria-required-children': 'off',
      'jsx-a11y/aria-required-parent': 'off',
    },
  },
  {
    files: [
      'app/(funnels)/_components/wealth-code/sections/ui/tabs.tsx',
      './app/(funnels)/_components/wealth-code/sections/ui/tabs.tsx',
    ],
    rules: {
      'jsx-a11y/aria-required-children': 'off',
      'jsx-a11y/aria-required-parent': 'off',
    },
  },
];

export default eslintConfig;
