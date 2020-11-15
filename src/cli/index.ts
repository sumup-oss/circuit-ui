#!/usr/bin/env node

/**
 * Copyright 2020, SumUp Ltd.
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

import { migrate, listTransforms, listLanguages } from './migrate';
import { staticStyles, listComponents, listThemes } from './static-styles';

type CommandType = 'migrate' | 'static-styles';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
yargs
  .command(
    'migrate',
    "Automatically transforms your source code to Circuit UI's latest APIs",
    (yrgs) =>
      yrgs
        .option('language', {
          alias: 'l',
          desc: 'The programming language(s) of the files to be transformed',
          choices: listLanguages(),
          type: 'array',
          required: true,
        })
        .option('path', {
          alias: 'p',
          desc:
            'A path to the folder that contains the files to be transformed',
          type: 'string',
          default: '.',
        })
        .option('transform', {
          alias: 't',
          desc: 'The transform to be applied to the source code',
          choices: listTransforms(),
          type: 'string',
          required: true,
        }),
    (args) => execute('migrate', args),
  )
  .command(
    'static-styles',
    "Automatically transforms your source code to Circuit UI's latest APIs",
    (yrgs) =>
      yrgs
        .option('theme', {
          desc: 'The name of the theme to use.',
          choices: listThemes(),
          default: 'light',
        })
        .option('components', {
          desc:
            // eslint-disable-next-line max-len
            'A comma separated list of the components to include. Also accepts "all" or "none".',
          options: ['all', 'none', ...listComponents()],
          type: 'array',
          default: 'all',
          coerce: (val) => {
            if (val.length === 1) {
              if (val[0] === 'all') {
                return listComponents();
              }
              if (val[0] === 'none') {
                return [];
              }
              if (val[0].includes(',')) {
                return val[0].split(',');
              }
            }
            return val;
          },
        })
        .option('global', {
          desc: 'Whether to include global styles.',
          type: 'boolean',
          default: false,
        })
        .option('customProperties', {
          desc: 'Whether to use CSS custom properties (variables).',
          type: 'boolean',
          default: false,
        })
        .option('pretty', {
          desc: 'Whether the CSS should be formatted with prettier.',
          type: 'boolean',
          default: false,
        })
        .option('filePath', {
          desc:
            // eslint-disable-next-line max-len
            'Path to the file where the stylesheet should be saved, relative to the current directory.',
          type: 'string',
          normalize: true,
        }),
    (args) => execute('static-styles', args),
  )
  .showHelpOnFail(true)
  .demandCommand(1, '')
  .help()
  .version().argv;

function execute(command: CommandType, args: any): void {
  const commands = { migrate, 'static-styles': staticStyles };
  const commandFn = commands[command];

  commandFn(args);
}
