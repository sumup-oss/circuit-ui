import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import 'jest-enzyme';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'jest-emotion';
import { axe, toHaveNoViolations } from 'jest-axe';
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

const mountWithTheme = tree => {
  const context = shallow(<ThemeProvider theme={standard} />)
    .instance()
    .getChildContext();

  return mount(tree, {
    context,
    childContextTypes: ThemeProvider.childContextTypes
  });
};

global.shallow = shallowWithTheme;
global.render = renderWithTheme(render);
global.create = renderWithTheme(create);
global.mount = mountWithTheme;
global.renderToHtml = renderWithTheme(renderToStaticMarkup);
global.axe = axe;

// This is defined by webpack in storybook builds using the DefinePlugin plugin.
global.__STORYBOOK__ = false;

// Add custom matchers
expect.extend(toHaveNoViolations);

// Add a snapshot serializer that removes random hashes
// from emotion class names.
expect.addSnapshotSerializer(
  createSerializer(emotion, {
    classNameReplacer(className, index) {
      return `circuit-${index}`;
    }
  })
);
