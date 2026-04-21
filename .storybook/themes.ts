import { create } from 'storybook/theming';
import { GLOBALS_UPDATED } from 'storybook/internal/core-events';

import { Link } from './components/Link.js';

const brand = {
  brandTitle: 'Circuit UI',
  brandUrl: 'https://github.com/sumup-oss/circuit-ui',
  fontBase:
    '"SumUp Narrow", Arial, system-ui, sans-serif, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
};

export const light = create({
  base: 'light',
  ...brand,
  brandImage: '/images/logo-name-light.png',
  colorPrimary: '#1e1c1c', // var(--cui-fg-accent)
  colorSecondary: '#1e1c1c', // var(--cui-fg-normal)

  // UI
  appBg: '#fbfbf9', // var(--cui-bg-normal)
  appContentBg: '#fbfbf9', // var(--cui-bg-normal)
  appPreviewBg: '#fbfbf9', // var(--cui-bg-normal)
  appBorderColor: '#d0cdc3', // var(--cui-border-normal)
  appBorderRadius: 0,

  // Text colors
  textColor: '#1e1c1c', // var(--cui-fg-normal)
  textMutedColor: '#706464', // var(--cui-fg-subtle)
  textInverseColor: '#fbfbf9', // var(--cui-fg-on-strong)

  // Toolbar default and active colors
  barTextColor: '#706464', // var(--cui-fg-subtle)
  barHoverColor: '#7f7373', // var(--cui-fg-subtle-hovered)
  barSelectedColor: '#8e8282', // var(--cui-fg-subtle-pressed)
  barBg: '#fbfbf9', // var(--cui-bg-normal)

  // Form colors
  buttonBg: '#f5f4ed', // var(--cui-bg-subtle)
  buttonBorder: '#e3e2d6', // var(--cui-border-subtle)
  inputBg: '#fbfbf9', // var(--cui-bg-normal)
  inputBorder: '#d0cdc3', // var(--cui-border-normal)
  inputTextColor: '#1e1c1c', // var(--cui-fg-normal)
  inputBorderRadius: 4, // var(--cui-border-radius-bit)
});

export const dark = create({
  base: 'dark',
  ...brand,
  brandImage: '/images/logo-name-dark.png',
  colorPrimary: '#f0eee7', // var(--cui-fg-accent)
  colorSecondary: '#f0eee7', // var(--cui-fg-normal)

  // UI
  appBg: '#000000', // var(--cui-bg-normal)
  appContentBg: '#000000', // var(--cui-bg-normal)
  appPreviewBg: '#000000', // var(--cui-bg-normal)
});

export const consumer = create({
  base: 'dark',
  ...brand,
  brandImage: '/images/logo-name-dark.png',
  colorPrimary: '#fbfbf9', // var(--cui-fg-accent)
  colorSecondary: '#fbfbf9', // var(--cui-fg-normal)

  // UI
  appBg: '#250723', // var(--cui-bg-normal)
  appContentBg: '#250723', // var(--cui-bg-normal)
  appPreviewBg: '#250723', // var(--cui-bg-normal)
});

export const themes = { light, dark, consumer };

export const components = {
  a: Link,
};

type ColorScheme = 'light' | 'dark' | 'consumer';

type Context = {
  globals: {
    colorScheme: string;
  };
};

type EventListener = (
  eventName: string,
  callback: (context: Context) => void,
) => void;

function parseGlobals(queryParam: string | null | undefined) {
  if (!queryParam) {
    return {};
  }
  return queryParam.split(';').reduce(
    (acc, global) => {
      const [key, value] = global.split(':');
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>,
  );
}

export function listenToColorScheme(
  eventEmitter: { on: EventListener; off: EventListener },
  callback: (colorScheme: ColorScheme) => void,
) {
  const query = window.matchMedia('(prefers-color-scheme: dark)');

  const handleMediaChange = (event: MediaQueryListEvent) => {
    callback(event.matches ? 'dark' : 'light');
  };

  const handleGlobalsChange = ({ globals }: Context) => {
    if (globals.colorScheme === 'system') {
      callback(query.matches ? 'dark' : 'light');
      query.addEventListener('change', handleMediaChange);
    } else {
      callback(globals.colorScheme as ColorScheme);
      query.removeEventListener('change', handleMediaChange);
    }
  };

  const initColorScheme = () => {
    const globals = new URL(window.location.href).searchParams.get('globals');
    const { colorScheme } = parseGlobals(globals);
    handleGlobalsChange({ globals: { colorScheme: colorScheme || 'system' } });
  };

  initColorScheme();

  eventEmitter.on(GLOBALS_UPDATED, handleGlobalsChange);

  return () => {
    eventEmitter.off(GLOBALS_UPDATED, handleGlobalsChange);
  };
}
