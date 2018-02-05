import { parse } from 'react-docgen';
import annotationResolver from 'react-docgen-annotation-resolver';

import listFiles from './lib/list-files';
import readFile from './lib/read-file';

const componentGlob = 'src/components/**/+([A-Z]+([a-z])).js';

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

const getPropType = ({ type: { name: type, value } }) => {
  const values = value && value.map(({ value: val }) => val);
  return { type, values };
};

const filterProps = props =>
  Object.entries(props).reduce((filteredProps, [prop, data]) => {
    const TYPES_TO_ITERATE = ['bool', 'enum'];
    const { type, values: allowedValues } = getPropType(data);
    if (!TYPES_TO_ITERATE.includes(type)) {
      return filteredProps;
    }
    const values = (allowedValues && replaceValues(allowedValues)) || [
      true,
      false
    ];
    filteredProps[prop] = values;
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
  const files = await listFiles(componentGlob);
  const componentData = await Promise.all(files.map(parseComponent));
  console.log(componentData);
}

// eslint-disable-next-line
main().catch(console.error)
