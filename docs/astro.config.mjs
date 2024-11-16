// @ts-check
import { defineConfig } from 'astro/config';
// import starlight from '@astrojs/starlight';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    // starlight({
    //   title: 'Circuit UI',
    //   social: {
    //     github: 'https://github.com/sumup-oss/circuit-ui',
    //   },
    //   sidebar: [
    //     {
    //       label: 'Introduction',
    //       autogenerate: { directory: 'introduction' },
    //     },
    //     {
    //       label: 'Features',
    //       autogenerate: { directory: 'features' },
    //     },
    //     {
    //       label: 'Contributing',
    //       autogenerate: { directory: 'contributing' },
    //     },
    //   ],
    // }),
    react(),
  ],
});
