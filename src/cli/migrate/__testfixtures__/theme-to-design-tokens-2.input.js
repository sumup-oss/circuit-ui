import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { theme, Text } from '@sumup/circuit-ui';

const App = ({ children }) => (
  <ThemeProvider theme={theme.circuit}>
    <Text>{children}</Text>
  </ThemeProvider>
);
