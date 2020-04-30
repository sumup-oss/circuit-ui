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

import yargs from 'yargs';
import { keys } from 'lodash/fp';

import extractStaticStyles from '.';
import config from './config';

const themeOpts = keys(config.themes);
const componentOpts = config.components.map(({ name }) => name);

function main() {
  const options = yargs
    .option('theme', {
      desc: 'The name of the theme to use.',
      choices: themeOpts,
      default: 'light'
    })
    .option('components', {
      desc:
        // eslint-disable-next-line max-len
        'A comma separated list of the components to include. Also accepts "all" or "none".',
      options: ['all', 'none', ...componentOpts],
      type: 'array',
      default: 'all',
      coerce: val => {
        if (val.length === 1) {
          if (val[0] === 'all') {
            return componentOpts;
          }
          if (val[0] === 'none') {
            return [];
          }
          if (val[0].includes(',')) {
            return val[0].split(',');
          }
        }
        return val;
      }
    })
    .option('global', {
      desc: 'Whether to include global styles.',
      type: 'boolean',
      default: false
    })
    .option('customProperties', {
      desc: 'Whether to use CSS custom properties (variables).',
      type: 'boolean',
      default: false
    })
    .option('pretty', {
      desc: 'Whether the CSS should be formatted with prettier.',
      type: 'boolean',
      default: false
    })
    .option('filePath', {
      desc:
        // eslint-disable-next-line max-len
        'Path to the file where the stylesheet should be saved, relative to the current directory.',
      type: 'string',
      normalize: true
    })
    .showHelpOnFail(true)
    .help()
    .version().argv;

  extractStaticStyles(options);
}

main();
