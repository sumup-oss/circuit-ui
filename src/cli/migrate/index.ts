/**
 * Copyright 2020, SumUp Ltd.
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

import fs from 'fs';

import { sync as spawn } from 'cross-spawn';

export interface MigrateArgs {
  transform: string;
  language: 'TypeScript' | 'JavaScript';
  path: string;
}

const TRANSFORM_DIR = __dirname;
const PARSERS = {
  JavaScript: 'babel',
  TypeScript: 'tsx',
};

export function migrate({ transform, language, path }: MigrateArgs): void {
  const availableTransforms = listTransforms();

  if (!availableTransforms.includes(transform)) {
    throw new Error(`Unknown codemod ${transform}. Run --help for options.`);
  }

  if (!['TypeScript', 'JavaScript'].includes(language)) {
    throw new Error(`Unknown language ${language}. Run --help for options.`);
  }

  const parser = PARSERS[language];

  spawn(
    'npx',
    [
      'jscodeshift',
      '--transform',
      `${TRANSFORM_DIR}/${transform}.js`,
      '--parser',
      parser,
      path,
    ],
    { stdio: 'inherit' },
  );
}

export function listTransforms(): string[] {
  return fs
    .readdirSync(TRANSFORM_DIR)
    .filter((filename) => filename.endsWith('.js'))
    .filter((filename) => filename !== 'index.js')
    .map((filename) => filename.replace('.js', ''));
}
