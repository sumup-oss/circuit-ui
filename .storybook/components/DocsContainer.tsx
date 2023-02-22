import { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { DocsContainer as BaseContainer } from '@storybook/addon-docs';

import { getTheme } from '../themes';
import { BaseStyles } from '@sumup/circuit-ui';
import { light } from '@sumup/design-tokens';

/**
 * Automatically switch light/dark theme based on system preferences
 */
const DocsContainer: typeof BaseContainer = ({ children, context }) => {
  const query = window?.matchMedia('(prefers-color-scheme: dark)');

  const [theme, setTheme] = useState(getTheme(query.matches));

  useEffect(() => {
    const handleChange = (event: MediaQueryListEvent) => {
      setTheme(getTheme(event.matches));
    };

    query.addEventListener('change', handleChange);

    return () => {
      query.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <BaseContainer context={context} theme={theme}>
      <ThemeProvider theme={light}>
        <BaseStyles />
      </ThemeProvider>
      {children}
    </BaseContainer>
  );
};

export default DocsContainer;
