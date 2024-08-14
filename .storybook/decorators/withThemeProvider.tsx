import { useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import type { Decorator } from '@storybook/react';
import { light } from '@sumup-oss/design-tokens';

function setColorScheme(colorScheme: 'light' | 'dark') {
  document.documentElement.dataset.colorScheme = colorScheme;
}

export const withThemeProvider: Decorator = (Story, context) => {
  const colorScheme =
    context.parameters.colorScheme || context.globals.colorScheme;

  useEffect(() => {
    if (colorScheme !== 'system') {
      setColorScheme(colorScheme);
      return undefined;
    }

    const query = window.matchMedia('(prefers-color-scheme: dark)');

    setColorScheme(query.matches ? 'dark' : 'light');

    const handleChange = (event: MediaQueryListEvent) => {
      setColorScheme(event.matches ? 'dark' : 'light');
    };

    query.addEventListener('change', handleChange);

    return () => {
      query.removeEventListener('change', handleChange);
    };
  }, [colorScheme]);

  return (
    <ThemeProvider theme={light}>
      <Story />
    </ThemeProvider>
  );
};
