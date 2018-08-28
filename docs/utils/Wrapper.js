/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import { circuit } from '../../src/themes';

export const Wrapper = props => (
  <ThemeProvider theme={circuit}>{props.children}</ThemeProvider>
);
