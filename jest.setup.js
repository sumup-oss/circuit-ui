import React from 'react';
import 'jest-enzyme';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'jest-emotion';
import { create } from 'react-test-renderer';
import * as emotion from 'emotion';
import { ThemeProvider } from 'emotion-theming';

import { standard } from './src/themes';

Enzyme.configure({ adapter: new Adapter() });

const renderWithTheme = renderFn => (component, ...rest) =>
  renderFn(<ThemeProvider theme={standard}>{component}</ThemeProvider>, rest);

const shallowWithTheme = tree => {
  const context = shallow(<ThemeProvider theme={standard} />)
    .instance()
    .getChildContext();
  return shallow(tree, { context });
};

global.shallow = shallowWithTheme;
global.render = render;
global.create = renderWithTheme(create);
global.mount = renderWithTheme(mount);

// This is defined by webpack in storybook builds using the DefinePlugin plugin.
global.STORYBOOK = false;

// Add a snapshot serializer that removes random hashes
// from emotion class names.
expect.addSnapshotSerializer(
  createSerializer(emotion, {
    classNameReplacer(className, index) {
      return `circuit-${index}`;
    }
  })
);

// Wrap console.error so we can filter out all those PropTypes errors.
const { error } = console;
// eslint-disable-next-line no-console
console.error = (arg1, ...rest) => {
  const isStringMsg = typeof arg1 === 'string';
  const regex = /.*prop.+as required/;
  const isPropTypesRequiredError = isStringMsg && regex.test(arg1);
  if (isPropTypesRequiredError) {
    return;
  }
  error(arg1, ...rest);
};
