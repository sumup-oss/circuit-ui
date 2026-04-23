import { useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import type { Decorator } from '@storybook/react-vite';
import { light } from '@sumup-oss/design-tokens';

type Theme = 'light' | 'dark' | 'consumer';

function setTheme(theme: Theme) {
  document.documentElement.dataset.colorScheme = theme;
}

export const withThemeProvider: Decorator = (Story, context) => {
  const theme = context.globals.theme as Theme | 'system';

  useEffect(() => {
    if (theme !== 'system') {
      setTheme(theme);
      return undefined;
    }

    const query = window.matchMedia('(prefers-color-scheme: dark)');

    setTheme(query.matches ? 'dark' : 'light');

    const handleChange = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? 'dark' : 'light');
    };

    query.addEventListener('change', handleChange);

    return () => {
      query.removeEventListener('change', handleChange);
    };
  }, [theme]);

  return (
    <ThemeProvider theme={light}>
      <Story />
    </ThemeProvider>
  );
};
