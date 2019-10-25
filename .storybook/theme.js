import { create } from '@storybook/theming';
import { circuit } from '../src/themes';

const theme = create({
  base: 'light',
  brandTitle: 'Circuit UI',
  brandUrl: 'https://github.com/sumup/circuit-ui',
  brandImage: '/storybook/images/logo-name.svg',
  fontBase: circuit.fontStack.default,
  colorPrimary: circuit.colors.p500,
  colorSecondary: circuit.colors.p500,
  appBg: circuit.colors.n100
});

export default theme;
