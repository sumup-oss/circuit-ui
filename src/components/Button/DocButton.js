import React from 'react';
import Button from './Button';
import { ThemeProvider } from 'emotion-theming';
import { standard } from '../../themes/index';

const DocButton = () => (
  <ThemeProvider theme={standard}>
    <Button primary>Button</Button>
  </ThemeProvider>
);

export default DocButton;
