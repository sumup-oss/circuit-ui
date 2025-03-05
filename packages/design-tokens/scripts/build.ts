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

/* eslint-disable import/no-extraneous-dependencies */

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

export type TokenConfig = {
  type: 'tokens';
  selectors: string[];
  tokens: Token[];
  colorScheme: ColorScheme;
};

export type FontFaceConfig = {
  type: 'font-faces';
  fontFaces: FontFace[];
};

type Configs = (TokenConfig | FontFaceConfig)[];

function main(): void {
  const files: Record<string, Configs> = {
    'light': [
      {
        type: 'tokens',
        tokens: [...light, ...shared],
        selectors: [':root, ::backdrop'],
        colorScheme: 'light',
      },
    ],
    'dark': [
      {
        type: 'tokens',
        tokens: [...dark, ...shared],
        selectors: [':root, ::backdrop'],
        colorScheme: 'dark',
      },
    ],
    'light-scoped': [
      {
        type: 'tokens',
        tokens: light,
        selectors: ['[data-color-scheme="light"]'],
        colorScheme: 'light',
      },
    ],
    'dark-scoped': [
      {
        type: 'tokens',
        tokens: dark,
        selectors: ['[data-color-scheme="dark"]'],
        colorScheme: 'dark',
      },
    ],
    'dynamic': [
      {
        type: 'tokens',
        tokens: [...light, ...shared],
        selectors: [':root, ::backdrop'],
        colorScheme: 'light',
      },
      {
        type: 'tokens',
        tokens: dark,
        selectors: ['@media (prefers-color-scheme: dark)', ':root, ::backdrop'],
        colorScheme: 'dark',
      },
      {
        type: 'tokens',
        tokens: light,
        selectors: ['[data-color-scheme="light"]'],
        colorScheme: 'light',
      },
      {
        type: 'tokens',
        tokens: dark,
        selectors: ['[data-color-scheme="dark"]'],
        colorScheme: 'dark',
      },
    ],
    'fonts': [
      {
        type: 'font-faces',
        fontFaces: inter,
      },
    ],
  };

  const targets = browserslistToTargets(browserslist());

  Object.entries(files).forEach(([name, configs]) => {
    const filename = `${name}.css`;
    const filepath = path.join(__dirname, '../', filename);
    const styles = configs
      .map((config) => {
        switch (config.type) {
          case 'tokens': {
            validateTokens(config.tokens);
            return createCSSCustomProperties(config);
          }
          case 'font-faces': {
            return createFontFaceDeclarations(config);
          }
          default: {
            throw new Error('Unsupported config type');
          }
        }
      })
      .join('\n');
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
export function validateTokens(tokens: Token[]): void {
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
}

/**
 * Generates CSS custom properties from the tokens
 */
export function createCSSCustomProperties(config: TokenConfig) {
  const selectorStart = config.selectors
    .map((selector) => `${selector} {`)
    .join('');
  const selectorEnd = config.selectors.map(() => '}').join('');
  const customProperties = config.tokens
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

  return `${selectorStart}
    color-scheme: ${config.colorScheme};
    ${customProperties}
  ${selectorEnd}`;
}

/**
 * Generates font face declarations from the font faces
 */
export function createFontFaceDeclarations(config: FontFaceConfig): string {
  return config.fontFaces
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
