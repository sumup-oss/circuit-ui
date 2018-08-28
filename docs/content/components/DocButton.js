import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import OriginalButton from '../../../src/components/Button/Button';
import { standard } from '../../../src/themes/index';

const DocButton = () => (
  <ThemeProvider theme={standard}>
    <OriginalButton primary>Button</OriginalButton>
  </ThemeProvider>
);

export default DocButton;
