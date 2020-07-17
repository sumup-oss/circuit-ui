import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { theme } from '@sumup/circuit-ui';

const App = ({ children }) => (
  <ThemeProvider theme={theme.circuit}>{children}</ThemeProvider>
);

const App2 = ({ children }) => (
  <ThemeProvider theme={theme.standard}>{children}</ThemeProvider>
);
