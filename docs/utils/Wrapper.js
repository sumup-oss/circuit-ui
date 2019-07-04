/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import { GlobalStyles, theme as themes } from '../../src/index';

const customCss = `
  div[class^="Sidebar__Footer"] {
    display: none;
  }
`;

const Wrapper = props => (
  <ThemeProvider theme={themes.circuit}>
    <GlobalStyles custom={customCss} />
    {props.children}
  </ThemeProvider>
);

export default Wrapper;
