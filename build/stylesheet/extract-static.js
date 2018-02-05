import listFiles from './lib/list-files';
import parseComponent from './lib/parse-component';

const componentGlob = 'src/components/**/+([A-Z]+([a-z])).js';

async function main() {
  const componentPaths = await listFiles(componentGlob);
  const componentData = await Promise.all(componentPaths.map(parseComponent));
  console.log(JSON.stringify(componentData[0]));
}

// eslint-disable-next-line
main().catch(console.error)
