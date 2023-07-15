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

import crypto from 'node:crypto';
import path from 'node:path';

import { UserConfig, defineConfig } from 'vite';
import noBundlePlugin from 'vite-plugin-no-bundle';

import {
  dependencies,
  peerDependencies,
  optionalDependencies,
} from './package.json';

export const css: UserConfig['css'] = {
  modules: {
    generateScopedName(name, file) {
      const parts = ['cui'];

      const filePath = file.split('?')[0];
      const fileName = path.basename(filePath, '.module.css');
      const isComponent = filePath.includes('/components');

      if (isComponent) {
        const componentName = fileName.toLowerCase();
        parts.push(componentName);
      }

      if (name !== 'base') {
        parts.push(name);
      }

      const hash = crypto
        .createHash('md5')
        .update(`${filePath}${name}`)
        .digest('base64url')
        // Remove non-word characters and underscores
        .replace(/[\W_]/g, '')
        // 36^4=1,679,616 possibilities
        .substring(0, 4)
        .toLowerCase();

      parts.push(hash);

      return parts.join('-');
    },
  },
};

export default defineConfig({
  css,
  build: {
    lib: {
      entry: [
        path.resolve(__dirname, 'index.ts'),
        path.resolve(__dirname, 'legacy.ts'),
      ],
      formats: ['es'],
      fileName: (_, entryName: string) => `${entryName}.js`,
    },
    minify: false,
    rollupOptions: {
      external: [
        ...Object.keys(dependencies),
        ...Object.keys(peerDependencies),
        ...Object.keys(optionalDependencies),
      ],
    },
  },
  plugins: [
    // @ts-expect-error vite-plugin-no-bundle is bundled in a non-standard way.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    (noBundlePlugin.default || noBundlePlugin)({ root: './' }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
  },
});
