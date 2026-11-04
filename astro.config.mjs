import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

const site = process.env.SITE_URL || undefined;
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  integrations: [react()],
  server: {
    host: true,
    port: 4321,
    allowedHosts: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
