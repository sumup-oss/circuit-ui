import { readFile } from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(readFile);

export default path => readFileAsync(path, { encoding: 'utf8' });
