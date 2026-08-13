/**
 * Copyright 2023, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import path from 'node:path';
import preserveDirectives from 'rollup-plugin-preserve-directives';

import { defineConfig, type ViteUserConfig } from 'vitest/config';

import pkg from './package.json' with { type: 'json' };
import { generateScopedNameFactory } from '../../vite.config.js';

const stylesFileName = 'styles';

const css: ViteUserConfig['css'] = {
  modules: {
    generateScopedName: generateScopedNameFactory('illustrations/build'),
  },
};

export default defineConfig({
  css,
  esbuild: {
    jsx: 'automatic',
  },
  build: {
    target: ['es2019'],
    lib: {
      entry: [path.resolve(__dirname, 'build/index.js')],
      formats: ['es'],
      fileName: (_, entryName: string) => `${entryName}.js`,
      cssFileName: stylesFileName,
    },
    minify: false,
    rollupOptions: {
      plugins: [
        // @ts-expect-error rollup-plugin-preserve-directives is bundled in a non-standard way.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        (preserveDirectives.default || preserveDirectives)(),
      ],
      output: {
        preserveModules: true,
      },
      external: [
        ...Object.keys(pkg.devDependencies),
        ...Object.keys(pkg.peerDependencies),
        // Subfolder imports
        'react/jsx-runtime',
      ],
    },
  },

  test: {
    globals: false,
    environment: 'node',
  },
});
