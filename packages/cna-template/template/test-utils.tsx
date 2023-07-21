import { configureAxe } from 'jest-axe';

export const axe = configureAxe({
  rules: {
    // Disable landmark rules when testing isolated components.
    region: { enabled: false },
  },
});

export * from '@testing-library/react';
