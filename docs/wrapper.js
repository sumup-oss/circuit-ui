import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { standard } from '../src/themes/index';

const Wrapper = ({ children }) => (
  <ThemeProvider theme={standard}>{children}</ThemeProvider>
);

export default Wrapper;
