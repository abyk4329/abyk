import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://abyk.online',
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // We'll manage base styles ourselves
      config: {
        path: './tailwind.config.mjs',
      },
    }),
  ],
  vite: {
    css: {
      transformer: 'postcss',
    },
  },
});
