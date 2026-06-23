import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

export default defineConfig({
  output: 'static',
  adapter: cloudflare({
    platformProxy: { enabled: true },
    imageService: 'passthrough',
    imagesBindingName: undefined,
    sessionKVBindingName: undefined,
  }),
  vite: {
    optimizeDeps: {
      exclude: ['@keystatic/core', '@keystatic/astro'],
    },
  },
  integrations: [
    react(),
    keystatic(),
  ],
  i18n: {
    defaultLocale: 'bg',
    locales: ['bg', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  image: {
    domains: ['res.cloudinary.com'],
  },
});
