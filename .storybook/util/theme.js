import { create } from '@storybook/theming';
import { css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';

import {
  theme as themes,
  BaseStyles,
  Heading,
  SubHeading,
  Text,
  List
} from '../../src';

import { Link } from '../components';

const { circuit } = themes;

export const theme = create({
  base: 'light',
  brandTitle: 'Circuit UI',
  brandUrl: 'https://github.com/sumup-oss/circuit-ui',
  brandImage: '/images/logo-name.svg',
  fontBase: circuit.fontStack.default,
  colorPrimary: circuit.colors.p500,
  colorSecondary: circuit.colors.p500,
  appBg: circuit.colors.n100
});

// FIXME: BaseStyles should only be included once, however, I couldn't find
//        any other way to add it to the Docs page.
const withThemeProvider = (Component, baseProps = {}) => (props = {}) => (
  <ThemeProvider theme={circuit}>
    <BaseStyles />
    <Component {...baseProps} {...props} />
  </ThemeProvider>
);

const TEXT_SIZE = Text.MEGA;

const headingStyles = theme => css`
  *:not(h1):not(h2):not(h3) + & {
    margin-top: ${theme.spacings.peta};
  }
`;

const subHeadingStyles = theme => css`
  margin-top: ${theme.spacings.giga};
`;

export const components = {
  h1: withThemeProvider(Heading, {
    as: 'h1',
    size: Heading.ZETTA,
    css: headingStyles
  }),
  h2: withThemeProvider(Heading, {
    as: 'h2',
    size: Heading.PETA,
    css: headingStyles
  }),
  h3: withThemeProvider(Heading, {
    as: 'h3',
    size: Heading.GIGA,
    css: headingStyles
  }),
  h4: withThemeProvider(SubHeading, {
    as: 'h4',
    size: SubHeading.MEGA,
    css: subHeadingStyles
  }),
  h5: withThemeProvider(SubHeading, {
    as: 'h5',
    size: SubHeading.KILO,
    css: subHeadingStyles
  }),
  p: withThemeProvider(Text, { as: 'p', size: TEXT_SIZE }),
  li: withThemeProvider(Text, { as: 'li', size: TEXT_SIZE }),
  strong: withThemeProvider(Text, {
    as: 'strong',
    size: TEXT_SIZE,
    bold: true
  }),
  em: withThemeProvider(Text, {
    as: 'em',
    size: TEXT_SIZE,
    italic: true
  }),
  ul: withThemeProvider(List, { size: TEXT_SIZE }),
  ol: withThemeProvider(List, { ordered: true, size: TEXT_SIZE }),
  a: withThemeProvider(Link, { size: TEXT_SIZE })
};
