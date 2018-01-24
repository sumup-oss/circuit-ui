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

const createWithTheme = component =>
  create(<ThemeProvider theme={standard}>{component}</ThemeProvider>);

global.shallow = shallow;
global.render = render;
global.create = createWithTheme;
global.mount = mount;

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
