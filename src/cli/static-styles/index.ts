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

import { sync as spawn } from 'cross-spawn';

import * as config from './config';
import { Options } from './types';

function getFilePath(options: Options) {
  let filePath = `./circuit-ui-${options.theme}`;

  if (options.global) {
    filePath += '-global';
  }

  if (options.customProperties) {
    filePath += '-cp';
  }

  return `${filePath}.css`;
}

export function staticStyles(options: Options) {
  const {
    theme,
    components,
    global,
    pretty,
    customProperties,
    filePath = getFilePath(options),
  } = options;

  const availableThemes = listThemes();
  const availableComponents = listComponents();

  if (!availableThemes.includes(theme)) {
    throw new Error(`Unknown theme "${theme}". Run --help for options.`);
  }

  components.forEach((component) => {
    if (!availableComponents.includes(component)) {
      throw new Error(
        `Unknown component "${component}". Run --help for options.`,
      );
    }
  });

  spawn(
    'npx',
    [
      'babel-node',
      '--extensions',
      '.js,.ts,.tsx',
      '--config-file',
      './babel.config.js',
      '--',
      './dist/es/cli/static-styles/main.js',
      '--theme',
      theme,
      '--components',
      ...components,
      '--global',
      global.toString(),
      '--pretty',
      pretty.toString(),
      '--customProperties',
      customProperties.toString(),
      '--filePath',
      filePath,
    ],
    {
      env: { ...process.env, BABEL_ENV: 'static' },
      stdio: 'inherit',
    },
  );
}

export function listThemes() {
  return Object.keys(config.themes);
}

export function listComponents() {
  return config.components.map(({ name }) => name);
}
