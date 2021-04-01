import { create } from '@storybook/theming';
import { css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { light } from '@sumup/design-tokens';

import {
  BaseStyles,
  Headline,
  SubHeadline,
  Text,
  List,
} from '../../packages/circuit-ui';

import { Link } from '../components';

export const theme = create({
  base: 'light',
  brandTitle: 'Circuit UI',
  brandUrl: 'https://github.com/sumup-oss/circuit-ui',
  brandImage: '/images/logo-name.svg',
  fontBase: light.fontStack.default,
  colorPrimary: light.colors.p500,
  colorSecondary: light.colors.p500,
  appBg: light.colors.bodyBg,
});

// FIXME: BaseStyles should only be included once, however, I couldn't find
//        any other way to add it to the Docs page.
const withThemeProvider = (Component, baseProps = {}) => (props = {}) => (
  <ThemeProvider theme={light}>
    <BaseStyles />
    <Component {...baseProps} {...props} />
  </ThemeProvider>
);

const TEXT_SIZE = 'mega';

const headingStyles = (theme) => css`
  *:not(h1):not(h2):not(h3) + & {
    margin-top: ${theme.spacings.peta};
  }
`;

const subHeadlineStyles = (theme) => css`
  margin-top: ${theme.spacings.giga};
`;

export const components = {
  h1: withThemeProvider(Headline, {
    as: 'h1',
    size: 'zetta',
    css: headingStyles,
  }),
  h2: withThemeProvider(Headline, {
    as: 'h2',
    size: 'peta',
    css: headingStyles,
  }),
  h3: withThemeProvider(Headline, {
    as: 'h3',
    size: 'giga',
    css: headingStyles,
  }),
  h4: withThemeProvider(SubHeadline, {
    as: 'h4',
    size: 'mega',
    css: subHeadlineStyles,
  }),
  h5: withThemeProvider(SubHeadline, {
    as: 'h5',
    size: 'kilo',
    css: subHeadlineStyles,
  }),
  p: withThemeProvider(Text, { as: 'p', size: TEXT_SIZE }),
  li: withThemeProvider(Text, { as: 'li', size: TEXT_SIZE }),
  strong: withThemeProvider(Text, {
    as: 'strong',
    size: TEXT_SIZE,
    bold: true,
  }),
  em: withThemeProvider(Text, {
    as: 'em',
    size: TEXT_SIZE,
    italic: true,
  }),
  ul: withThemeProvider(List, { size: TEXT_SIZE }),
  ol: withThemeProvider(List, { size: TEXT_SIZE, variant: 'ordered' }),
  a: withThemeProvider(Link, { size: TEXT_SIZE }),
};
