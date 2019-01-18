import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import Badge from '../../../../src/components/Badge';
import { theme as themes } from '../../../../src';

const Stable = () => (
  <ThemeProvider theme={themes.circuit}>
    <Badge color={Badge.SUCCESS} style={{ display: 'inline-block' }}>
      Stable
    </Badge>
  </ThemeProvider>
);

const Deprecated = () => (
  <ThemeProvider theme={themes.circuit}>
    <Badge color={Badge.DANGER} style={{ display: 'inline-block' }}>
      Depcreated
    </Badge>
  </ThemeProvider>
);

const InReview = () => (
  <ThemeProvider theme={themes.circuit}>
    <Badge color={Badge.WARNING} style={{ display: 'inline-block' }}>
      In review
    </Badge>
  </ThemeProvider>
);

export { Stable, InReview, Deprecated };
