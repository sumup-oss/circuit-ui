import { useEffect, useState } from 'react';
import { DocsContainer as BaseContainer } from '@storybook/blocks';

import { dark, light, listenToColorScheme } from '../themes';

const themes = { light, dark };

/**
 * Switch color scheme based on the global types or system preferences
 */
export const DocsContainer: typeof BaseContainer = ({ children, context }) => {
  const [colorScheme, setColorScheme] = useState('light');

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
