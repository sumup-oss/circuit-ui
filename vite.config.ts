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

import { defineConfig } from 'vite';
import GithubActionsReporter from 'vitest-github-actions-reporter';
import path from 'node:path';
import crypto from 'node:crypto';

import { coverageConfigDefaults, type ViteUserConfig } from 'vitest/config';

function last<T>(collection: T[]): T {
  return collection[collection.length - 1];
}

export function generateScopedNameFactory(directory: string) {
  return function generateScopedName(className: string, file: string) {
    const prefix = 'cui';
    const parts = [prefix];

    const filePath = last(file.split('?')[0].split(`/packages/${directory}`));
    const fileName = path.basename(filePath, '.module.css');
    const folderName = last(path.dirname(filePath).split(path.sep));
    const isComponent = filePath.includes('/components');

    if (isComponent) {
      // ./components/Button/Button.module.css -> button
      // ./components/Button/base.module.css -> button
      const componentName =
        fileName !== 'base' ? fileName.toLowerCase() : folderName.toLowerCase();
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
  };
}

const css: ViteUserConfig['css'] = {
  modules: {
    generateScopedName: generateScopedNameFactory('circuit-ui'),
  },
};

export default defineConfig({
  css,
  test: {
    projects: ['packages/**/vitest.config.ts', 'packages/**/vite.config.ts'],
    reporters: process.env.GITHUB_ACTIONS
      ? ['default', new GithubActionsReporter()]
      : 'default',
    coverage: {
      exclude: [
        // Default
        ...coverageConfigDefaults.exclude,
        // Custom
        '**/*.stories.*',
        '**/index.*',
        '**/*.json.js',
        '**/*.module.css.js',
        '**/dist/**',
        '**/*.config.*',
      ],
    },
  },
});
