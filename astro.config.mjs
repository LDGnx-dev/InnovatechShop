import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  // Esto es crucial para Vercel
  output: 'server', 
  adapter: vercel(),
  integrations: [react()],
});