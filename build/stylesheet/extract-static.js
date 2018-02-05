import { parse } from 'react-docgen';
import annotationResolver from 'react-docgen-annotation-resolver';

import listFiles from './lib/list-files';
import readFile from './lib/read-file';

const componentGlob = 'src/components/**/+([A-Z]+([a-z])).js';

const blacklist = [/Price(:?Service)?/];

const replaceValues = values => {
  const map = {
    'SIZES.KILO': 'kilo',
    'SIZES.MEGA': 'mega',
    'SIZES.GIGA': 'giga',
    'SIZES.TERA': 'tera',
    'SIZES.PETA': 'peta',
    'SIZES.EXA': 'exa',
    'SIZES.ZETTA': 'zetta'
  };

  return values.map(val => map[val] || val);
};

const getPropMeta = ({ type: { name: type, value } }) => {
  const isMappable = value && !!value.map;
  const values = isMappable && value.map(({ value: val }) => val);
  return { type, values };
};

const filterProps = props =>
  Object.entries(props).reduce((filteredProps, [prop, data]) => {
    const TYPES_TO_ITERATE = ['bool', 'enum'];
    const { type, values } = getPropMeta(data);
    if (!TYPES_TO_ITERATE.includes(type)) {
      return filteredProps;
    }
    const cleanValues = (values && replaceValues(values)) || [true, false];
    filteredProps[prop] = cleanValues;
    return filteredProps;
  }, {});

const parseComponent = async path => {
  try {
    const content = await readFile(path);
    const [{ props: rawProps }] = parse(content, annotationResolver);
    const props = filterProps(rawProps);
    return { path, props };
  } catch (e) {
    return { path, error: e, props: null };
  }
};

async function main() {
  const allFiles = await listFiles(componentGlob);
  const filteredFiles = allFiles.filter(
    path => !blacklist.some(regex => regex.test(path))
  );
  const componentData = await Promise.all(filteredFiles.map(parseComponent));
  console.log(componentData);
}

// eslint-disable-next-line
main().catch(console.error)
