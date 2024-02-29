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
import { shared } from '../themes/shared.js';
import { light } from '../themes/light.js';
import { dark } from '../themes/dark.js';

import type { ColorScheme, Token } from '../types/index.js';

type StyleGroup = {
  selectors: string[];
  colorScheme: ColorScheme;
  tokens: Token[];
};

type Theme = {
  name: string;
  groups: StyleGroup[];
};

function main(): void {
  const themes: Theme[] = [
    {
      name: 'light',
      groups: [
        {
          tokens: [...light, ...shared],
          selectors: [':root'],
          colorScheme: 'light',
        },
      ],
    },
    {
      name: 'dark',
      groups: [
        {
          tokens: [...dark, ...shared],
          selectors: [':root'],
          colorScheme: 'dark',
        },
      ],
    },
    {
      name: 'light-scoped',
      groups: [
        {
          tokens: light,
          selectors: ['[data-color-scheme="light"]'],
          colorScheme: 'light',
        },
      ],
    },
    {
      name: 'dark-scoped',
      groups: [
        {
          tokens: dark,
          selectors: ['[data-color-scheme="dark"]'],
          colorScheme: 'dark',
        },
      ],
    },
    {
      name: 'dynamic',
      groups: [
        {
          tokens: [...light, ...shared],
          selectors: [':root'],
          colorScheme: 'light',
        },
        {
          tokens: dark,
          selectors: ['@media (prefers-color-scheme: dark)', ':root'],
          colorScheme: 'dark',
        },
        {
          tokens: light,
          selectors: ['[data-color-scheme="light"]'],
          colorScheme: 'light',
        },
        {
          tokens: dark,
          selectors: ['[data-color-scheme="dark"]'],
          colorScheme: 'dark',
        },
      ],
    },
  ];

  const targets = browserslistToTargets(browserslist());

  themes.forEach((theme) => {
    validateTheme(theme);

    const filename = `${theme.name}.css`;
    const filepath = path.join(__dirname, '../', filename);
    const styles = theme.groups.map(createStyles).join('\n');
    const { code } = transform({
      filename,
      code: Buffer.from(styles),
      targets,
    });

    fs.writeFileSync(filepath, code, { flag: 'w' });
  });
}

/**
 * Validates that the theme includes all expected tokens
 * and that the token values match the expected type.
 */
export function validateTheme(theme: Theme): void {
  // Validate the token types
  theme.groups.forEach(({ tokens }) => {
    tokens.forEach(({ name, type }) => {
      const token = schema.find((t) => t.name === name);

      if (!token) {
        return;
        // throw new Error(`The theme is missing the required "${name}" token.`);
      }

      if (token.type !== type) {
        throw new Error(
          [
            `The "${name}" token does not match the expected type.`,
            `Expected "${token.type as string}". Received "${type as string}."`,
          ].join(' '),
        );
      }
    });
  });

  // Validate that the tokens at the root are complete
  const rootGroup = theme.groups.find(
    (group) => group.selectors.length === 1 && group.selectors[0] === ':root',
  );

  if (!rootGroup) {
    return;
  }

  if (rootGroup.tokens.length !== schema.length) {
    schema.forEach(({ name }) => {
      const token = rootGroup.tokens.find((t) => t.name === name);

      if (!token) {
        throw new Error(
          `The "${theme.name}" theme does not globally define the required "${name}" token. Add it to the ":root" selector.`,
        );
      }
    });
  }
}

export function createStyles(group: StyleGroup) {
  const selectorStart = group.selectors
    .map((selector) => `${selector} {`)
    .join('');
  const selectorEnd = group.selectors.map(() => `}`).join('');
  const customProperties = createCSSCustomProperties(group.tokens);
  return `${selectorStart}
    color-scheme: ${group.colorScheme};
    ${customProperties}
  ${selectorEnd}`;
}

/**
 * Generates CSS custom properties from the tokens
 */
export function createCSSCustomProperties(tokens: Token[]): string {
  return tokens
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
}

try {
  main();
} catch (error) {
  console.error((error as Error).message);
  process.exit(1);
}
