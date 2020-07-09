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

// eslint-disable-next-line import/no-extraneous-dependencies
import prettier from 'prettier';

import config from './config';
import globalStyles from './global-styles';
import componentStyles from './component-styles';
import { createTheme, createGlobalStyles } from './custom-properties';

function getFilePath(options) {
  let filePath = `./${options.theme}`;

  if (options.global) {
    filePath += '-global';
  }

  if (options.customProperties) {
    filePath += '-cp';
  }

  return `${filePath}.css`;
}

export default function extractStaticStyles(options) {
  const theme = config.themes[options.theme];
  const opts = {
    ...options,
    theme: options.customProperties ? createTheme(theme) : theme,
    components: config.components.filter(component =>
      options.components.includes(component.name),
    ),
    filePath: options.filePath || getFilePath(options),
  };

  let styleSheet = '';

  if (opts.customProperties && opts.global) {
    styleSheet += createGlobalStyles(theme);
  }

  if (opts.global) {
    styleSheet += globalStyles(opts);
  }

  styleSheet += componentStyles(opts);

  if (opts.pretty) {
    styleSheet = prettier.format(styleSheet, { parser: 'css' });
  }

  fs.writeFileSync(path.join(process.cwd(), opts.filePath), styleSheet);
}
