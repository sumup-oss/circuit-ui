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

import chalk from 'chalk';

import * as util from './util';

const IS_DEBUGGING = util.isDebugging();

const getMessage = (arg) => (Array.isArray(arg) ? arg.join('\n') : arg);

const error = (arg) => {
  const msg = getMessage(arg);

  /* eslint-disable no-console */
  console.error(chalk`
🚨 {black.bgRed Oups, something went wrong} 🚨
  `);
  console.error(msg);
  /* eslint-enable no-console */
};

const log = (arg) => {
  const msg = getMessage(arg);
  // eslint-disable-next-line no-console
  console.log(`\n${msg}`);
};

const debug = (arg) => {
  if (!IS_DEBUGGING) {
    return;
  }

  const msg = getMessage(arg);
  // eslint-disable-next-line no-console
  console.debug(chalk.cyan(msg));
};

export default { error, log, info: log, debug };
