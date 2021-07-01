import { create } from '@storybook/theming';
import { css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { light } from '@sumup/design-tokens';

import {
  BaseStyles,
  Headline,
  SubHeadline,
  Body,
  List,
  spacing,
} from '@sumup/circuit-ui';

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

const TEXT_SIZE = 'one';

const headlineStyles = (theme) => css`
  margin-bottom: ${theme.spacings.mega};

  *:not(h1):not(h2):not(h3) + & {
    margin-top: ${theme.spacings.peta};
    margin-bottom: ${theme.spacings.mega};
  }
`;

const italicStyles = css`
  font-style: italic;
`;

export const components = {
  h1: withThemeProvider(Headline, {
    as: 'h1',
    size: 'one',
    css: headlineStyles,
  }),
  h2: withThemeProvider(Headline, {
    as: 'h2',
    size: 'two',
    css: headlineStyles,
  }),
  h3: withThemeProvider(Headline, {
    as: 'h3',
    size: 'three',
    css: headlineStyles,
  }),
  h4: withThemeProvider(Headline, {
    as: 'h4',
    size: 'four',
    css: spacing({ top: 'giga' }),
  }),
  h5: withThemeProvider(SubHeadline, {
    as: 'h5',
    css: spacing({ top: 'giga' }),
  }),
  p: withThemeProvider(Body, {
    as: 'p',
    size: TEXT_SIZE,
    css: spacing({ bottom: 'kilo' }),
  }),
  li: withThemeProvider(Body, { as: 'li', size: TEXT_SIZE }),
  strong: withThemeProvider(Body, {
    as: 'strong',
    size: TEXT_SIZE,
    variant: 'highlight',
  }),
  em: withThemeProvider(Body, {
    as: 'em',
    size: TEXT_SIZE,
    css: italicStyles,
  }),
  ul: withThemeProvider(List),
  ol: withThemeProvider(List, { variant: 'ordered' }),
  a: withThemeProvider(Link, { size: TEXT_SIZE }),
};
