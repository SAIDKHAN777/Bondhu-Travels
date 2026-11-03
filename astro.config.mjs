// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  vite: {
    ssr: {
      external: [
        '@prisma/client',
        '/home/saidkhan/Projects/travel-agency-backend/node_modules/@prisma/client'
      ],
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
