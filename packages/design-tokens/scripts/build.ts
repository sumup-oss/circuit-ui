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
import type { ColorScheme, FontFace, Token } from '../types/index.js';
import { inter } from '../themes/fonts.js';

type StyleGroup = {
  selectors: string[];
  tokens?: Token[];
  colorScheme?: ColorScheme;
  fontFaces?: FontFace[];
};

type Theme = {
  name: string;
  groups: StyleGroup[];
};

function main(): void {
  // TODO: Refactor to separate custom property and font face generation
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
    {
      name: 'fonts',
      groups: [
        {
          selectors: [':root'],
          fontFaces: inter,
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
 * Validates that the token values match the expected type.
 */
export function validateTheme(theme: Theme): void {
  // Validate the token types
  theme.groups.forEach(({ tokens = [] }) => {
    tokens.forEach(({ name, type }) => {
      const token = schema.find((t) => t.name === name);

      if (!token) {
        return;
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
}

export function createStyles(group: StyleGroup) {
  const selectorStart = group.selectors
    .map((selector) => `${selector} {`)
    .join('');
  const selectorEnd = group.selectors.map(() => '}').join('');

  let styles = '';

  if (group.fontFaces) {
    styles += createFontFaceDeclarations(group.fontFaces);
  }

  if (group.colorScheme || group.tokens) {
    styles += selectorStart;

    if (group.colorScheme) {
      styles += `color-scheme: ${group.colorScheme};`;
    }
    if (group.tokens) {
      styles += createCSSCustomProperties(group.tokens);
    }

    styles += selectorEnd;
  }
  return styles;
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

      lines.push(`${name}: ${value.toString()};`);

      return lines;
    })
    .join(' ');
}

/**
 * Generates font face declarations from the font faces
 */
export function createFontFaceDeclarations(fontFaces: FontFace[]): string {
  return fontFaces
    .map((fontFace) => {
      const properties = Object.entries(fontFace)
        .map(([name, value]) => `${name}: ${value};`)
        .join('');

      return `@font-face { ${properties} }`;
    })
    .join(' ');
}

try {
  main();
} catch (error) {
  console.error((error as Error).message);
  process.exit(1);
}
