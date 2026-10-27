import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://bali-nagomi.pages.dev',
  output: 'static',
  trailingSlash: 'never',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja'],
    routing: { prefixDefaultLocale: false },
  },
  build: { format: 'file', inlineStylesheets: 'never' },
  devToolbar: { enabled: false },
  vite: { build: { sourcemap: false, assetsInlineLimit: 0 } },
});
