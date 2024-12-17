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

import { css } from './packages/circuit-ui/vite.config.js';
import { coverageConfigDefaults } from 'vitest/config';

export default defineConfig({
  css,
  test: {
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
      ],
    },
  },
});
