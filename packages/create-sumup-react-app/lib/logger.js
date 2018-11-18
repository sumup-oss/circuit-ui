import chalk from 'chalk';

import * as util from './util';

const IS_DEBUGGING = util.isDebugging();

const getMessage = arg => (Array.isArray(arg) ? arg.join('\n') : arg);

const error = arg => {
  const msg = getMessage(arg);

  /* eslint-disable no-console */
  console.error(chalk`
🚨 {black.bgRed Oups, something went wrong} 🚨
  `);
  console.error(msg);
  /* eslint-enable no-console */
};

const log = arg => {
  const msg = getMessage(arg);
  // eslint-disable-next-line no-console
  console.log(`\n${msg}`);
};

const debug = arg => {
  if (!IS_DEBUGGING) {
    return;
  }

  const msg = getMessage(arg);
  // eslint-disable-next-line no-console
  console.debug(chalk.cyan(msg));
};

export default { error, log, info: log, debug };
