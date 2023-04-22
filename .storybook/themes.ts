import { create } from '@storybook/theming';
import { light as theme } from '@sumup/design-tokens';
import Link from './components/Link';

const brand = {
  brandTitle: 'Circuit UI',
  brandUrl: 'https://github.com/sumup-oss/circuit-ui',
  brandImage: '/images/logo-name.svg',
  fontBase: theme.fontStack.default,
};

export const light = create({
  base: 'light',
  ...brand,
  colorPrimary: theme.colors.p500,
  colorSecondary: theme.colors.p500,
  appBg: theme.colors.bodyBg,
});

export const dark = create({
  base: 'dark',
  ...brand,
  colorPrimary: theme.colors.p300,
  colorSecondary: theme.colors.p300,
  appBg: theme.colors.black,
});

export function getTheme(prefersDark: boolean) {
  return prefersDark ? dark : light;
}

export const components = {
  a: Link,
};
