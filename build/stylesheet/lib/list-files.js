import { promisify } from 'util';

import glob from 'glob';

const globAsync = promisify(glob);

export default (pattern, options = {}) => globAsync(pattern, options);
