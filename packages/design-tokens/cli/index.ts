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

import type { Color, Token } from '../types';
import { schema } from '../themes/schema';

type FigmaExport = {
  color: {
    [key: string]: {
      [key: string]: {
        // Currently, only colors are supported
        type: 'color';
        value: Color;
        description: string;
      };
    };
  };
};

/**
 * Transforms the deeply nested Figma export into the simpler token format
 */
export function transformFigmaExportToTokens(
  figmaExport: FigmaExport,
): Token[] {
  return Object.entries(figmaExport.color).flatMap(([key, values]) => {
    // The "usage" is prefixed with a symbol in Figma
    const usage = key.split(' ')[1];

    return Object.entries(values).flatMap(([name, token]) => ({
      name: `--cui-${usage}-${name.replace(/\./g, '-')}`,
      description: token.description,
      value: token.value,
      type: token.type,
    }));
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
      throw new Error(
        `The Figma export is missing the required "${name}" token.`,
      );
    }

    if (token.type !== type) {
      throw new Error(
        [
          `The "${name}" token does not match the expected type.`,
          `Expected "${type as string}", received: "${token.type as string}"`,
        ].join(' '),
      );
    }
  });
}

/**
 * Generates the root CSS custom properties from the tokens
 */
export function createCSSCustomProperties(tokens: Token[]): string {
  const customProperties = tokens
    .flatMap((token) => {
      const { description, name, value } = token;
      const lines = [];

      if (description) {
        lines.push(`/* ${description} */`);
      }

      lines.push(`${name}: ${value};`);

      return lines;
    })
    .join('\n');
  return `:root {${customProperties}}`;
}

function main(): void {
  const [, , sourceFile, destFile = './theme.css'] = process.argv;

  if (!sourceFile) {
    throw new Error('Please provide the path to the source file.');
  }

  const sourceFilePath = path.join(process.cwd(), sourceFile);
  const json = fs.readFileSync(sourceFilePath, { encoding: 'utf8' });
  const figmaExport = JSON.parse(json) as FigmaExport;
  const tokens = transformFigmaExportToTokens(figmaExport);

  validateTokens(tokens);

  const customProperties = createCSSCustomProperties(tokens);
  const { code } = transform({
    filename: destFile,
    code: Buffer.from(customProperties),
    targets: browserslistToTargets(browserslist()),
  });

  const destFilePath = path.join(process.cwd(), destFile);

  fs.writeFileSync(destFilePath, code, { flag: 'wx' });
}

try {
  main();
} catch (error) {
  console.error((error as Error).message);
  process.exit(1);
}
