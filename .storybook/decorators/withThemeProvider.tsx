import { useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import type { Decorator } from '@storybook/react';
import { light } from '@sumup/design-tokens';

export const withThemeProvider: Decorator = (Story, context) => {
  const theme = context.parameters.theme || context.globals.theme;

  useEffect(() => {
    document.documentElement.dataset.colorScheme = theme;
  }, [theme]);

  return (
    <ThemeProvider theme={light}>
      <Story />
    </ThemeProvider>
  );
};
