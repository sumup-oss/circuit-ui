import { configureAxe } from 'jest-axe';

export const axe = configureAxe({
  rules: {
    // Disable landmark rules when testing isolated components.
    region: { enabled: false },
  },
});

// biome-ignore lint/performance/noReExportAll: Proxying the testing-library methods enables overriding them if necessary.
export * from '@testing-library/react';
