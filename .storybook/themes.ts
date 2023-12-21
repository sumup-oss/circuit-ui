import { create } from '@storybook/theming';
import Link from './components/Link';

const brand = {
  brandTitle: 'Circuit UI',
  brandUrl: 'https://github.com/sumup-oss/circuit-ui',
  brandImage: '/images/logo-name.svg',
  fontBase:
    'aktiv-grotesk, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
};

export const light = create({
  base: 'light',
  ...brand,
  colorPrimary: '#0f131a',
  colorSecondary: '#0f131a',
  appBg: '#ffffff',
});

export const dark = create({
  base: 'dark',
  ...brand,
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
