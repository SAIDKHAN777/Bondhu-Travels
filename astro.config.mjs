// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import node from '@astrojs/node';

const isNetlify = !!process.env.NETLIFY;

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  output: 'server',
  adapter: isNetlify ? netlify() : node({ mode: 'standalone' }),
  vite: {
    ssr: {
      external: ['@prisma/client'],
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
