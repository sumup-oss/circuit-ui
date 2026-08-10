import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    resolve: {
      noExternal: ['@sumup-oss/circuit-ui', '@sumup-oss/illustrations'],
    },
  },
});
