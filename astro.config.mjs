import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://nusi001.com', // update before deploy
  compressHTML: true,
  build: {
    assets: 'assets',
    inlineStylesheets: 'never'
  },
  vite: {
    build: {
      cssCodeSplit: true
    }
  }
});
