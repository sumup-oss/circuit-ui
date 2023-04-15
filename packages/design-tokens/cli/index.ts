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

import { FigmaExport, transformFigmaExportToTokens } from './figma-export';
import { validateTokens } from './validate-tokens';
import { createCSSCustomProperties } from './css';

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
