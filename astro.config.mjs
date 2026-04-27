import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import auth from 'auth-astro';

export default defineConfig({
  site: 'https://innovatech-shop.vercel.app',
  output: 'server',
  adapter: vercel(),
  integrations: [react(),auth()],
  vite: {
    optimizeDeps: {
      disabled: true, 
    },
  }
});