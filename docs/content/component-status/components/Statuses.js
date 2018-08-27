import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import Badge from '../../../../src/components/Badge';
import { circuit } from '../../../../src/themes';

const Stable = () => (
  <ThemeProvider theme={circuit}>
    <Badge color={Badge.SUCCESS} style={{ display: 'inline-block' }}>
      Stable
    </Badge>
  </ThemeProvider>
);

const Deprecated = () => (
  <ThemeProvider theme={circuit}>
    <Badge color={Badge.DANGER} style={{ display: 'inline-block' }}>
      Depcreated
    </Badge>
  </ThemeProvider>
);

const InReview = () => (
  <ThemeProvider theme={circuit}>
    <Badge color={Badge.WARNING} style={{ display: 'inline-block' }}>
      In review
    </Badge>
  </ThemeProvider>
);

export { Stable, InReview, Deprecated };
