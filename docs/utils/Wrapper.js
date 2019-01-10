/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import { circuit } from '../../src/themes';

/**
 * Current emotion version doesn't allow [object Module] as theme,
 * only [object Object]
 */
const theme = { ...circuit };

export const Wrapper = props => (
  <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
);
