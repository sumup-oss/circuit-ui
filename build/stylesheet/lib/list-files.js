import { promisify } from 'util';

import glob from 'glob';

const globAsync = promisify(glob);

const REGEX_BLACK_LIST = [/Price(:?Service)?/];

export default async (pattern, options = {}) => {
  const allFiles = await globAsync(pattern, options);
  return allFiles.filter(
    path => !REGEX_BLACK_LIST.some(regex => regex.test(path))
  );
};
