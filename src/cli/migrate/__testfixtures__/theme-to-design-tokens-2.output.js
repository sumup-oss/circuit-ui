import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Text } from '@sumup/circuit-ui';
import { light } from '@sumup/design-tokens';

const App = ({ children }) => (
  <ThemeProvider theme={light}>
    <Text>{children}</Text>
  </ThemeProvider>
);
