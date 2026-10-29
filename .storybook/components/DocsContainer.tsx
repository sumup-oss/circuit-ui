import { useEffect, useState } from 'react';
import { DocsContainer as BaseContainer } from '@storybook/addon-docs/blocks';
import { GLOBALS_UPDATED } from 'storybook/internal/core-events';

import { I18nProvider } from '../../packages/circuit-ui/components/I18nContext/I18nContext.js';
import { FALLBACK_LOCALE } from '../../packages/circuit-ui/util/i18n.js';
import { themes, listenToTheme } from '../themes.js';
import { parseGlobals, type Globals } from '../globals.js';

type Context = {
  globals: Pick<Globals, 'locale'>;
};

type EventListener = (
  eventName: string,
  callback: (context: Context) => void,
) => void;

export function listenToLocale(
  eventEmitter: { on: EventListener; off: EventListener },
  callback: (locale: string) => void,
) {
  const handleGlobalsChange = ({ globals }: Context) => {
    callback(globals.locale);
  };

  const initLocale = () => {
    const { locale } = parseGlobals();
    handleGlobalsChange({ globals: { locale: locale || FALLBACK_LOCALE } });
  };

  initLocale();

  eventEmitter.on(GLOBALS_UPDATED, handleGlobalsChange);

  return () => {
    eventEmitter.off(GLOBALS_UPDATED, handleGlobalsChange);
  };
}

/**
 * Switch theme based on the global types or system preferences.
 * Also provides the i18n context to components that are rendered directly
 * in MDX pages, since story decorators don't apply to them.
 */
export const DocsContainer: typeof BaseContainer = ({ children, context }) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'consumer'>('light');
  const [locale, setLocale] = useState<string>(FALLBACK_LOCALE);

  useEffect(() => listenToTheme(context.channel, setTheme), [context.channel]);
  useEffect(
    () => listenToLocale(context.channel, setLocale),
    [context.channel],
  );

  useEffect(() => {
    document.documentElement.dataset.colorScheme = theme;
  }, [theme]);

  return (
    <BaseContainer context={context} theme={themes[theme]}>
      <I18nProvider locale={locale}>{children}</I18nProvider>
    </BaseContainer>
  );
};
