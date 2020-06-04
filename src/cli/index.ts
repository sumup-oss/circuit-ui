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

import { migrate, listTransforms } from './migrate';

type CommandType = 'migrate';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
yargs
  .command(
    'migrate',
    "Automatically transforms your source code to Circuit UI's latest APIs",
    yrgs =>
      yrgs
        .option('transform', {
          alias: 't',
          desc: 'The transform to be applied to the source code',
          choices: listTransforms(),
          type: 'string',
          required: true
        })
        .option('language', {
          alias: 'l',
          desc: 'The programming language of the files to be transformed',
          choices: ['TypeScript', 'JavaScript'],
          type: 'string',
          required: true
        })
        .option('path', {
          alias: 'p',
          desc:
            'A path to the folder that contains the files to be transformed',
          type: 'string',
          default: '.'
        }),
    args => execute('migrate', args)
  )
  .showHelpOnFail(true)
  .demandCommand(1, '')
  .help()
  .version().argv;

function execute(command: CommandType, args: any): void {
  const commands = { migrate };
  const commandFn = commands[command];

  commandFn(args);
}
