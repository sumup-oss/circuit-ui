import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { standard } from '../../src/themes';

export const Wrapper = props => (
  <ThemeProvider theme={standard}>{props.children}</ThemeProvider>
);
