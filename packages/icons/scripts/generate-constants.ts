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

import { Biome, type Configuration } from '@biomejs/js-api/nodejs';
import { BASE_DIR } from '../constants.js';

import manifest from '../manifest.json' with { type: 'json' };
// eslint-disable-next-line import-x/no-relative-packages
import config from '../../../biome.json' with { type: 'json' };

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
  const biome = new Biome();
  const { projectKey } = biome.openProject();

  biome.applyConfiguration(projectKey, config as Configuration);

  const formatted = biome.formatContent(projectKey, fileContent, { filePath });

  await fs.writeFile(filePath, formatted.content, { flag: 'w' });
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
