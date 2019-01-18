/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import { theme as themes } from '../../src/index';

export const Wrapper = props => (
  <ThemeProvider theme={themes.circuit}>{props.children}</ThemeProvider>
);
