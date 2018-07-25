import React from 'react';
import * as emotion from 'react-emotion';
import * as ReactTestRenderer from 'react-test-renderer';
import { ThemeProvider } from 'emotion-theming';

import { circuit } from '../../../src/themes';

const adjustPath = path => `../../../${path}`;

const renderComponent = async (Component, theme, props) => {
  try {
    ReactTestRenderer.create(
      <ThemeProvider theme={circuit}>
        <Component {...{ theme, ...props }} />
      </ThemeProvider>
    );
    // eslint-disable-next-line no-empty
  } catch (e) {}
};

const replaceDefault = ({ values, defaultValue }) =>
  values.reduce(
    (vals, value) =>
      value === defaultValue ? vals.concat(undefined) : vals.concat(value),
    []
  );

const getCombinations = (options, optionIndex, results, current) => {
  const allKeys = Object.keys(options);
  const optionKey = allKeys[optionIndex];

  const vals = options[optionKey];

  for (let i = 0; i < vals.length; i += 1) {
    current[optionKey] = vals[i];

    if (optionIndex + 1 < allKeys.length) {
      getCombinations(options, optionIndex + 1, results, current);
    } else {
      // The easiest way to clone an object.
      const res = JSON.parse(JSON.stringify(current));
      results.push(res);
    }
  }

  return results;
};

const createPropGroups = allProps => {
  if (!allProps || !Object.keys(allProps).length) {
    return [{}];
  }
  const nonDefaultProps = Object.entries(allProps).reduce(
    (acc, [prop, propValues]) =>
      Object.assign({}, acc, { [prop]: replaceDefault(propValues) }),
    {}
  );
  return getCombinations(nonDefaultProps, 0, [], {});
};

const cleanUpClassName = (key, styles) => {
  const [hash] = key.split('-');
  const newKey = key.replace(/^[a-z0-9]+-/, '');
  const isModifierClass = /--/.test(newKey);
  const baseClass =
    isModifierClass && newKey.length ? newKey.split('--')[0] : newKey;
  const replaceRegex = new RegExp(`.css-${hash}-${baseClass}`, 'g');
  const newStyles = styles.replace(
    replaceRegex,
    `.${baseClass}${isModifierClass ? `.${baseClass}` : ''}`
  );
  return { key: newKey, styles: newStyles };
};

const extractStyles = async ({ path, propTypes }) => {
  const relativePath = adjustPath(path);
  const { default: Component } = await import(relativePath);
  const propGroups = createPropGroups(propTypes);
  propGroups.forEach(props => renderComponent(Component, circuit, props));
  const { inserted } = emotion.caches;
  const regex = /-/;
  const filteredStyles = Object.entries(inserted).reduce(
    (filtered, [key, styles]) => {
      const isCssCall = regex.test(key);
      if (!isCssCall) {
        return filtered;
      }

      const { key: newKey, styles: newStyles } = cleanUpClassName(key, styles);
      return { ...filtered, [newKey]: newStyles };
    },
    {}
  );
  return Object.values(filteredStyles).join('\n');
};

export default extractStyles;
