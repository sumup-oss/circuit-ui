import { useEffect, useState } from 'react';
import { DocsContainer as BaseContainer } from '@storybook/addon-docs/blocks';

import { themes, listenToColorScheme } from '../themes.js';

/**
 * Switch color scheme based on the global types or system preferences
 */
export const DocsContainer: typeof BaseContainer = ({ children, context }) => {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark' | 'consumer'>(
    'light',
  );

  useEffect(
    () => listenToColorScheme(context.channel, setColorScheme),
    [context.channel],
  );

  useEffect(() => {
    document.documentElement.dataset.colorScheme = colorScheme;
  }, [colorScheme]);

  const theme = themes[colorScheme];

  return (
    <BaseContainer context={context} theme={theme}>
      {children}
    </BaseContainer>
  );
};
