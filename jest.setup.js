/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import '@testing-library/jest-dom/extend-expect';
import { createSerializer } from 'jest-emotion';
import { axe, toHaveNoViolations } from 'jest-axe';
import { render, fireEvent, wait, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'emotion-theming';
import { light } from '@sumup/design-tokens';

import ComponentsContext, {
  defaultComponents
} from './src/components/ComponentsContext';

// eslint-disable-next-line react/prop-types
const WithProviders = ({ children }) => (
  <ComponentsContext.Provider value={defaultComponents}>
    <ThemeProvider theme={light}>{children}</ThemeProvider>
  </ComponentsContext.Provider>
);

const renderWithProviders = renderFn => (component, ...rest) =>
  renderFn(<WithProviders>{component}</WithProviders>, rest);

global.axe = axe;
global.act = act;
global.wait = wait;
global.fireEvent = fireEvent;
global.userEvent = userEvent;
global.render = (component, options) =>
  render(component, { wrapper: WithProviders, ...options });
global.renderToHtml = renderWithProviders(renderToStaticMarkup);
global.create = (...args) => {
  const { container } = global.render(...args);
  return container.children.length > 1
    ? container.children
    : container.firstChild;
};

// This is defined by webpack in storybook builds using the DefinePlugin plugin.
global.STORYBOOK = false;

global.__DEV__ = false;
global.__PRODUCTION__ = false;
global.__TEST__ = true;

// react-popper relies on document.createRange
if (global.document) {
  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document
    }
  });
}

// Add custom matchers
expect.extend(toHaveNoViolations);

// Add a snapshot serializer that removes random hashes
// from emotion class names.
expect.addSnapshotSerializer(
  createSerializer({
    classNameReplacer(className, index) {
      return `circuit-${index}`;
    }
  })
);
