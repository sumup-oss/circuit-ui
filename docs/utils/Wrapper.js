/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import { theme } from '../../src/index';

export const Wrapper = props => (
  <ThemeProvider theme={theme.standard}>{props.children}</ThemeProvider>
);
