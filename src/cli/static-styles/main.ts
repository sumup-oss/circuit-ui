/**
 * Copyright 2019, SumUp Ltd.
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
import path from 'path';

import prettier from 'prettier';
import yargs from 'yargs';

import { components, themes } from './config';
import { globalStyles } from './global-styles';
import { componentStyles } from './component-styles';
import { createTheme, createRootVariables } from './custom-properties';
import { Options } from './types';
import { hydrate } from './hydrate';

export function main(options: Options) {
  try {
    const theme = themes[options.theme];
    const opts = {
      ...options,
      theme: options.customProperties ? createTheme(theme) : theme,
      components: components
        .filter((component) => options.components.includes(component.name))
        .map(hydrate),
      filePath: options.filePath,
    };

    let styleSheet = '';

    if (opts.customProperties && opts.global) {
      styleSheet += createRootVariables(theme);
    }

    if (opts.global) {
      styleSheet += globalStyles(opts.theme);
    }

    styleSheet += componentStyles(opts);

    if (opts.pretty) {
      styleSheet = prettier.format(styleSheet, { parser: 'css' });
    }

    fs.writeFileSync(path.join(process.cwd(), opts.filePath), styleSheet);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main(
  yargs
    .string('theme')
    .boolean('global')
    .boolean('customProperties')
    .boolean('pretty')
    .string('filePath')
    .demandOption(['theme', 'global', 'customProperties', 'pretty', 'filePath'])
    .array('components').argv as Options,
);
