import { format } from 'prettier';

import listFiles from './lib/list-files';
import parseComponent from './lib/parse-component';
import extractStyles from './lib/extract-styles';

const componentGlob = 'src/components/**/+([A-Z]+([a-z])).js';

const { error } = console;
// eslint-disable-next-line no-console
console.error = (arg1, ...rest) => {
  const isStringMsg = typeof arg1 === 'string';
  const regex = /.*prop.+as required|Invalid prop/;
  const isPropTypesRequiredError = isStringMsg && regex.test(arg1);
  if (isPropTypesRequiredError) {
    return;
  }
  error(arg1, ...rest);
};

async function main() {
  const componentPaths = await listFiles(componentGlob);
  const componentData = await Promise.all(componentPaths.map(parseComponent));
  const allStyles = await Promise.all(componentData.map(extractStyles));
  console.log(format(allStyles.join('\n'), { parser: 'css' }));
}

// eslint-disable-next-line
main().catch(console.error)
