#!/usr/bin/env node

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

import fs from 'node:fs';
import path from 'node:path';

import browserslist from 'browserslist';
import { transform, browserslistToTargets } from 'lightningcss';

import { schema } from '../themes/schema.js';
import { light } from '../themes/light.js';

import type { Token } from '../types/index.js';

function main(): void {
  const themes = [{ name: 'light', tokens: light }];

  const targets = browserslistToTargets(browserslist());

  themes.forEach((theme) => {
    validateTokens(theme.tokens);

    const filename = `${theme.name}.css`;
    const filepath = path.join(__dirname, '../', filename);
    const customProperties = createCSSCustomProperties(theme.tokens);
    const { code } = transform({
      filename,
      code: Buffer.from(customProperties),
      targets,
    });

    fs.writeFileSync(filepath, code, { flag: 'w' });
  });
}

/**
 * Validates that the theme includes all expected tokens
 * and that the token values match the expected type.
 */
export function validateTokens(tokens: Token[]): void {
  schema.forEach(({ name, type }) => {
    const token = tokens.find((t) => t.name === name);

    if (!token) {
      throw new Error(`The theme is missing the required "${name}" token.`);
    }

    if (token.type !== type) {
      throw new Error(
        [
          `The "${name}" token does not match the expected type.`,
          `Expected "${type as string}". Received "${token.type as string}."`,
        ].join(' '),
      );
    }
  });
}

/**
 * Generates CSS custom properties from the tokens
 */
export function createCSSCustomProperties(
  tokens: Token[],
  selector = ':root, ::selection, ::backdrop',
): string {
  const customProperties = tokens
    .flatMap((token) => {
      const { description, name, value } = token;
      const lines: string[] = [];

      if (description) {
        lines.push(`/* ${description} */`);
      }

      lines.push(`${name}: ${value};`);

      return lines;
    })
    .join(' ');
  return `${selector} { ${customProperties} }`;
}

try {
  main();
} catch (error) {
  console.error((error as Error).message);
  process.exit(1);
}
