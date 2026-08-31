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

import { defineConfig, type ViteUserConfig } from 'vitest/config';

import { reorderUtilityCssVitePlugin } from './build/reorder-utility-css-plugin.js';
import pkg from './package.json' with { type: 'json' };
import { generateScopedNameFactory } from '../../vite.config.js';

const stylesFileName = 'styles';

const css: ViteUserConfig['css'] = {
  modules: {
    generateScopedName: generateScopedNameFactory('circuit-ui'),
  },
};

const externalPackages = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
];

const isExternal = (id: string) =>
  externalPackages.some(
    (packageName) => id === packageName || id.startsWith(`${packageName}/`),
  ) || id === 'react/jsx-runtime';

export default defineConfig({
  css,
  plugins: [reorderUtilityCssVitePlugin(`${stylesFileName}.css`)],
  build: {
    target: ['es2019'],
    lib: {
      entry: [
        path.resolve(import.meta.dirname, 'index.ts'),
        path.resolve(import.meta.dirname, 'internal.ts'),
        path.resolve(import.meta.dirname, 'experimental.ts'),
        path.resolve(import.meta.dirname, 'legacy.ts'),
      ],
      formats: ['es'],
      fileName: (_, entryName: string) => `${entryName}.js`,
      cssFileName: stylesFileName,
    },
    minify: false,
    rolldownOptions: {
      output: {
        preserveModules: true,
      },
      external: isExternal,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
  },
});
