import { create } from '@storybook/theming';
import { GLOBALS_UPDATED } from '@storybook/core-events';

import { Link } from './components/Link';

const brand = {
  brandTitle: 'Circuit UI',
  brandUrl: 'https://github.com/sumup-oss/circuit-ui',
  fontBase:
    '"Inter", Helvetica, Arial, system-ui, sans-serif, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
};

export const light = create({
  base: 'light',
  ...brand,
  brandImage: '/images/logo-name-light.png',
  colorPrimary: '#0f131a', // var(--cui-fg-accent)
  colorSecondary: '#0f131a', // var(--cui-fg-normal)

  // UI
  appBg: '#ffffff', // var(--cui-bg-normal)
  appContentBg: '#ffffff', // var(--cui-bg-normal)
  appPreviewBg: '#ffffff', // var(--cui-bg-normal)
  appBorderColor: '#c2c9d1', // var(--cui-border-normal)
  appBorderRadius: 0,

  // Text colors
  textColor: '#0f131a', // var(--cui-fg-normal)
  textMutedColor: '#6a737c', // var(--cui-fg-subtle)
  textInverseColor: '#ffffff', // var(--cui-fg-on-strong)

  // Toolbar default and active colors
  barTextColor: '#6a737c', // var(--cui-fg-subtle)
  barHoverColor: '#33373e', // var(--cui-fg-subtle-hovered)
  barSelectedColor: '#0f131a', // var(--cui-fg-subtle-pressed)
  barBg: '#ffffff', // var(--cui-bg-normal)

  // Form colors
  buttonBg: '#f6f7f9', // var(--cui-bg-subtle)
  buttonBorder: '#d6dbe1', // var(--cui-border-subtle)
  inputBg: '#ffffff', // var(--cui-bg-normal)
  inputBorder: '#c2c9d1', // var(--cui-border-normal)
  inputTextColor: '#0f131a', // var(--cui-fg-normal)
  inputBorderRadius: 4, // var(--cui-border-radius-bit)
});

export const dark = create({
  base: 'dark',
  ...brand,
  brandImage: '/images/logo-name-dark.png',
  colorPrimary: '#ffffff', // var(--cui-fg-accent)
  colorSecondary: '#ffffff', // var(--cui-fg-normal)

  // UI
  appBg: '#0f131a', // var(--cui-bg-normal)
  appContentBg: '#0f131a', // var(--cui-bg-normal)
  appPreviewBg: '#0f131a', // var(--cui-bg-normal)
});

export const components = {
  a: Link,
};

type ColorScheme = 'light' | 'dark';

type EventListener = (
  eventName: string,
  callback: (context: { globals: Record<string, unknown> }) => void,
) => void;

export function listenToColorScheme(
  eventEmitter: { on: EventListener; off: EventListener },
  callback: (colorMode: ColorScheme) => void,
) {
  const query = window.matchMedia('(prefers-color-scheme: dark)');

  const handleMediaChange = (event: MediaQueryListEvent) => {
    callback(event.matches ? 'dark' : 'light');
  };

  const handleGlobalsChange = ({ globals }) => {
    if (globals.colorScheme === 'system') {
      callback(query.matches ? 'dark' : 'light');
      query.addEventListener('change', handleMediaChange);
    } else {
      callback(globals.colorScheme);
      query.removeEventListener('change', handleMediaChange);
    }
  };

  const initColorScheme = () => {
    const globals = new URL(window.location.href).searchParams.get('globals');

    if (globals) {
      const [key, value] = globals.split(':');
      if (key === 'colorScheme') {
        return handleGlobalsChange({ globals: { colorScheme: value } });
      }
    }

    handleGlobalsChange({ globals: { colorScheme: 'system' } });
  };

  initColorScheme();

  eventEmitter.on(GLOBALS_UPDATED, handleGlobalsChange);

  return () => {
    eventEmitter.off(GLOBALS_UPDATED, handleGlobalsChange);
  };
}
