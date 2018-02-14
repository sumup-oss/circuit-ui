import { parse } from 'react-docgen';
import annotationResolver from 'react-docgen-annotation-resolver';

import readFile from './read-file';

const replaceValue = val => {
  const map = {
    'SIZES.KILO': 'kilo',
    'SIZES.MEGA': 'mega',
    'SIZES.GIGA': 'giga',
    'SIZES.TERA': 'tera',
    'SIZES.PETA': 'peta',
    'SIZES.EXA': 'exa',
    'SIZES.ZETTA': 'zetta',
    true: true,
    false: false
  };

  const mappedValue = map[val];

  return mappedValue || mappedValue === false ? mappedValue : val;
};

const getPropMeta = ({ type: { name: type, value }, defaultValue = {} }) => {
  const isMappable = value && !!value.map;
  const { value: def } = defaultValue;
  const values = isMappable && value.map(({ value: val }) => val);
  return { type, values, default: def };
};

const filterProps = props =>
  Object.entries(props).reduce((filteredProps, [prop, data]) => {
    const TYPES_TO_ITERATE = ['bool', 'enum'];
    const { type, values, default: def } = getPropMeta(data);
    if (!TYPES_TO_ITERATE.includes(type)) {
      return filteredProps;
    }
    const cleanValues = (values && values.map(replaceValue)) || [true, false];
    const defaultValue = def && replaceValue(def);
    filteredProps[prop] = { values: cleanValues, defaultValue };
    return filteredProps;
  }, {});

const parseComponent = async path => {
  try {
    const content = await readFile(path);
    const [{ props: rawProps }] = parse(content, annotationResolver);
    const propTypes = filterProps(rawProps);
    return { path, propTypes };
  } catch (e) {
    return { path, error: e, propTypes: null };
  }
};

export default parseComponent;
