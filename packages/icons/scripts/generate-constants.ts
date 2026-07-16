/**
 * Copyright 2026, SumUp Ltd.
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

import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

import { BASE_DIR } from '../constants.js';

import manifest from '../manifest.json' with { type: 'json' };

const execFileAsync = promisify(execFile);

type Icon = {
  name: string;
  category: string;
  deprecation?: string;
};

function namesForCategory(
  category: string,
  transform: (name: string) => string = (name) => name,
): string[] {
  return (manifest.icons as Icon[])
    .filter((icon) => icon.category === category && !icon.deprecation)
    .map((icon) => transform(icon.name))
    .sort();
}

function buildConstantsFile(exportName: string, names: string[]): string {
  const entries = names.map((name) => `'${name}',`).join('\n');
  return `
    /**
     * This file is auto-generated from manifest.json by \`npm run build\`.
     * Do not edit it by hand, your changes will be overwritten.
     * To add or remove an entry, edit manifest.json instead.
     */

    export const ${exportName} = [
      ${entries}
    ] as const;
  `;
}

async function writeFile(filePath: string, fileContent: string) {
  await fs.writeFile(filePath, fileContent, { flag: 'w' });
  // Format with the project's real Biome config (including the
  // `@sumup-oss/foundry/biome` extends chain), which the `@biomejs/js-api`
  // used elsewhere in this package doesn't resolve on its own.
  await execFileAsync('npx', ['biome', 'check', '--write', filePath]);
}

async function main() {
  const targets: {
    exportName: string;
    category: string;
    transform?: (name: string) => string;
    relativePath: string;
  }[] = [
    {
      exportName: 'FLAGS',
      category: 'Flag',
      transform: (name) => name.replace(/^flag_/, '').toUpperCase(),
      relativePath: 'src/components/Flag/constants.ts',
    },
    {
      exportName: 'PAYMENT_METHODS',
      category: 'Payment method',
      relativePath: 'src/components/PaymentMethod/constants.ts',
    },
    {
      exportName: 'CARD_SCHEMES',
      category: 'Card scheme',
      relativePath: 'src/components/CardScheme/constants.ts',
    },
  ];

  await Promise.all(
    targets.map(({ exportName, category, transform, relativePath }) => {
      const names = namesForCategory(category, transform);
      const content = buildConstantsFile(exportName, names);
      return writeFile(path.join(BASE_DIR, relativePath), content);
    }),
  );
}

void main();
