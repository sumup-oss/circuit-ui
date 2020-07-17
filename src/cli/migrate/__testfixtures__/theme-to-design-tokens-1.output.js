import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { light } from '@sumup/design-tokens';

const App = ({ children }) => (
  <ThemeProvider theme={light}>{children}</ThemeProvider>
);

const App2 = ({ children }) => (
  <ThemeProvider theme={light}>{children}</ThemeProvider>
);
