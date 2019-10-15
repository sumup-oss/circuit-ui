/* global expect */

/**
 * Add custom Jest matchers for the DOM.
 * https://github.com/testing-library/jest-dom#custom-matchers
 */
import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createSerializer } from 'jest-emotion';
import { axe, toHaveNoViolations } from 'jest-axe';
import { render, fireEvent, wait, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'emotion-theming';
import { theme } from '@sumup/circuit-ui';

const { circuit } = theme;

const WithProviders = ({ children }) => (
  <ThemeProvider theme={circuit}>{children}</ThemeProvider>
);

const renderWithProviders = renderFn => (component, ...rest) =>
  renderFn(<WithProviders>{component}</WithProviders>, rest);

global.axe = axe;
global.act = act;
global.wait = wait;
global.fireEvent = fireEvent;
global.userEvent = userEvent;
global.renderToHtml = renderWithProviders(renderToStaticMarkup);
global.render = (component, options) =>
  render(component, { wrapper: WithProviders, ...options });
global.create = (...args) => {
  const { container } = global.render(...args);
  return container.children.length > 1
    ? container.children
    : container.firstChild;
};

global.__DEV__ = false;
global.__PRODUCTION__ = false;
global.__TEST__ = true;

/**
 * This matchers helps you test for basic accessibility
 * violations in a test.
 *
 * https://github.com/nickcolley/jest-axe
 * */
expect.extend(toHaveNoViolations);

/**
 * The serializer will make sure emotion generated styles
 * show up in snapshots.
 *
 * https://github.com/emotion-js/emotion/tree/master/packages/jest-emotion#snapshot-serializer
 * */
expect.addSnapshotSerializer(
  createSerializer({
    classNameReplacer(className, index) {
      return `circuit-${index}`;
    }
  })
);
