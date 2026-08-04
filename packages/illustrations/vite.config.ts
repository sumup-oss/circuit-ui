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
import fs from 'node:fs/promises';

import { defineConfig, type ViteUserConfig } from 'vitest/config';

import pkg from './package.json' with { type: 'json' };

const stylesFileName = 'styles';

export const css: ViteUserConfig['css'] = {
  modules: {
    generateScopedName(className) {
      const prefix = 'cui';
      const parts = [prefix];

      const filePath = '/dist/Illustration.module.css';

      const componentName = 'Illustration';
      parts.push(componentName);

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

function cleanupFiles(files: string[]) {
  return {
    name: 'delete-after-build',
    apply: 'build' as const,
    async closeBundle() {
      await Promise.all(
        files.map((file) =>
          fs.rm(path.resolve(__dirname, file), { force: true }),
        ),
      );
    },
  };
}

export default defineConfig({
  css,
  plugins: [cleanupFiles(['dist/Illustration.module.css'])],
  build: {
    target: ['es2019'],
    emptyOutDir: false,
    lib: {
      entry: [path.resolve(__dirname, 'dist/index.js')],
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
