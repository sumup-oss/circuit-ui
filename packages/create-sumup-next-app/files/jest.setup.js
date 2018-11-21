/* global expect */

/**
 * Add custom Jest matchers for the DOM.
 * https://github.com/gnapse/jest-dom#table-of-contents
 */
import 'jest-dom/extend-expect';

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createMatchers, createSerializer } from 'jest-emotion';
import { axe, toHaveNoViolations } from 'jest-axe';
import { render } from 'react-testing-library';
import * as emotion from 'emotion';
import { ThemeProvider } from 'emotion-theming';
import { theme } from '@sumup/circuit-ui';

const { standard } = theme;

const renderWithTheme = renderFn => (component, ...rest) =>
  renderFn(<ThemeProvider theme={standard}>{component}</ThemeProvider>, rest);

global.render = renderWithTheme(render);
global.renderToHtml = renderWithTheme(renderToStaticMarkup);
global.axe = axe;

/**
 * This matchers helps you test for basic accessibility
 * violations in a test.
 *
 * https://github.com/nickcolley/jest-axe
 * */
expect.extend(toHaveNoViolations);

/**
 * These matchers help you test agains specific style rules
 * in a test.
 *
 * https://github.com/emotion-js/emotion/tree/master/packages/jest-emotion#tohavestylerule
 * */
expect.extend(createMatchers(emotion));

/**
 * The serializer will make sure emotion generated styles
 * show up in snapshots.
 *
 * https://github.com/emotion-js/emotion/tree/master/packages/jest-emotion#snapshot-serializer
 * */
expect.addSnapshotSerializer(createSerializer(emotion));
