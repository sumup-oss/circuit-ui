import { useEffect, useState } from 'react';
import { DocsContainer as BaseContainer } from '@storybook/addon-docs/blocks';

import { I18nProvider } from '../../packages/circuit-ui/components/I18nContext/I18nContext.js';
import { FALLBACK_LOCALE } from '../../packages/circuit-ui/util/i18n.js';
import { themes, listenToTheme } from '../themes.js';

/**
 * Switch theme based on the global types or system preferences.
 * Also provides the i18n context to components that are rendered directly
 * in MDX pages, since story decorators don't apply to them.
 */
export const DocsContainer: typeof BaseContainer = ({ children, context }) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'consumer'>('light');

  useEffect(() => listenToTheme(context.channel, setTheme), [context.channel]);

  useEffect(() => {
    document.documentElement.dataset.colorScheme = theme;
  }, [theme]);

  return (
    <BaseContainer context={context} theme={themes[theme]}>
      <I18nProvider locale={FALLBACK_LOCALE}>{children}</I18nProvider>
    </BaseContainer>
  );
};
