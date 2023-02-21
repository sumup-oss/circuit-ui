import { useEffect, useState } from 'react';
import { DocsContainer as BaseContainer } from '@storybook/addon-docs';

import { getTheme, light } from '../themes';

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
      {children}
    </BaseContainer>
  );
};

export default DocsContainer;
