import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import OriginalButton from '../../../../src/components/Button';
import { standard } from '../../../../src/themes';

const DocButton = () => (
  <ThemeProvider theme={standard}>
    <OriginalButton primary>Button</OriginalButton>
  </ThemeProvider>
);

export default DocButton;
