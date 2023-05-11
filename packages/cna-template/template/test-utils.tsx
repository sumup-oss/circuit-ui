import { ReactNode } from 'react';
import { configureAxe } from 'jest-axe';
import { ThemeProvider } from '@emotion/react';
import { render as renderTest } from '@testing-library/react';
import { light } from '@sumup/design-tokens';

const WithProviders = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={light}>{children}</ThemeProvider>
);

export const render = (
  component: Parameters<typeof renderTest>[0],
  options: Parameters<typeof renderTest>[1] = {},
) => renderTest(component, { wrapper: WithProviders, ...options });

export const axe = configureAxe({
  rules: {
    // Disable landmark rules when testing isolated components.
    region: { enabled: false },
  },
});

export * from '@testing-library/react';
