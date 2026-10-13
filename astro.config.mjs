import { defineConfig } from 'astro/config';

export default defineConfig({
  srcDir: './src/app',
  output: 'static',
  site: process.env.SITE_URL || 'http://localhost:4322',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
