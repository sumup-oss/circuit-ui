import { useEffect, useState } from 'react';
import { DocsContainer as BaseContainer } from '@storybook/addon-docs/blocks';

import { themes, listenToTheme } from '../themes.js';

/**
 * Switch theme based on the global types or system preferences
 */
export const DocsContainer: typeof BaseContainer = ({ children, context }) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'consumer'>('light');

  useEffect(() => listenToTheme(context.channel, setTheme), [context.channel]);

  useEffect(() => {
    document.documentElement.dataset.colorScheme = theme;
  }, [theme]);

  return (
    <BaseContainer context={context} theme={themes[theme]}>
      {children}
    </BaseContainer>
  );
};
