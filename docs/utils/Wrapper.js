/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import { GlobalStyles, theme as themes } from '../../src/index';

const Wrapper = props => (
  <ThemeProvider theme={themes.circuit}>
    <GlobalStyles />
    {props.children}
  </ThemeProvider>
);

export default Wrapper;
