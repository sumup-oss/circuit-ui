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
import preserveDirectives from 'rollup-plugin-preserve-directives';

import { defineConfig, type ViteUserConfig } from 'vitest/config';

import pkg from './package.json' with { type: 'json' };

export const css: ViteUserConfig['css'] = {
  modules: {
    generateScopedName(className, file) {
      const prefix = 'cui';
      const parts = [prefix];

      const filePath = file.split('?')[0];
      const fileName = path.basename(filePath, '.module.css');
      const folderName = last(path.dirname(filePath).split(path.sep));
      const isComponent = filePath.includes('/components');

      if (isComponent) {
        // ./components/Button/Button.module.css -> button
        // ./components/Button/base.module.css -> button
        const componentName =
          fileName !== 'base'
            ? fileName.toLowerCase()
            : folderName.toLowerCase();
        parts.push(componentName);
      }

      if (className !== 'base') {
        parts.push(className);
      }

      const hash = crypto
        .createHash('md5')
        .update(`${filePath}${className}`)
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

function last<T>(collection: T[]): T {
  return collection[collection.length - 1];
}

export default defineConfig({
  css,
  build: {
    target: ['es2019'],
    lib: {
      entry: [
        path.resolve(__dirname, 'index.ts'),
        path.resolve(__dirname, 'internal.ts'),
        path.resolve(__dirname, 'experimental.ts'),
        path.resolve(__dirname, 'legacy.ts'),
      ],
      formats: ['es'],
      fileName: (_, entryName: string) => `${entryName}.js`,
      cssFileName: 'styles',
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
        ...Object.keys(pkg.dependencies),
        ...Object.keys(pkg.peerDependencies),
        // Subfolder imports
        'react/jsx-runtime',
        '@emotion/react/jsx-runtime',
      ],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
  },
});
