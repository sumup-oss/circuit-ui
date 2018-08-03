/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import { standard } from '../../src/themes';

export const Wrapper = props => (
  <ThemeProvider theme={standard}>{props.children}</ThemeProvider>
);
