import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import OriginalButton from '../../../src/components/Button/Button';
import { theme as themes } from '../../../src';

const DocButton = () => (
  <ThemeProvider theme={themes.circuit}>
    <OriginalButton primary>Button</OriginalButton>
  </ThemeProvider>
);

export default DocButton;
