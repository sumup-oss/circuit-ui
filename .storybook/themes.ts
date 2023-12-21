import { create } from '@storybook/theming';
import Link from './components/Link';

const brand = {
  brandTitle: 'Circuit UI',
  brandUrl: 'https://github.com/sumup-oss/circuit-ui',
  fontBase:
    'aktiv-grotesk, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
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
  colorPrimary: '#ffffff',
  colorSecondary: '#ffffff',
  appBg: '#0f131a',
});

export function getTheme(prefersDark: boolean) {
  return prefersDark ? dark : light;
}

export const components = {
  a: Link,
};
