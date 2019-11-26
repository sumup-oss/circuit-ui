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

import { spawn } from 'child_process';

import logger from './logger';
import * as util from './util';

const IS_DEBUGGING = util.isDebugging();

const DEFAULT_OPTIONS = {
  cwd: process.cwd(),
  detached: true,
  stdio: IS_DEBUGGING ? 'inherit' : 'pipe'
};

function getBufferContent(chunks) {
  return Buffer.isBuffer(chunks[0])
    ? Buffer.concat(chunks).toString('utf8')
    : null;
}

export default function asyncSpawn(cmd, args, options) {
  const stdout = [];

  logger.debug(
    `Spawning: "${cmd} ${args.join(' ')}" in working directory "${
      options.cwd
    }".`
  );

  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      ...DEFAULT_OPTIONS,
      ...options
    });

    if (child.stdout) {
      child.stdout.on('data', chunk => {
        stdout.push(chunk);
      });
    }

    child.on('close', code => {
      if (code !== 0) {
        // eslint-disable-next-line no-console
        const err = new Error(`${cmd} exited with an error (code ${code}).`);
        err.log = getBufferContent(stdout);
        reject(err);
        return;
      }

      resolve(getBufferContent(stdout));
    });

    child.on('error', err => {
      logger.error(err);
      process.exit(1);
      // eslint-disable-next-line no-param-reassign
      err.log = getBufferContent(stdout);
      reject(err);
    });
  });
}
