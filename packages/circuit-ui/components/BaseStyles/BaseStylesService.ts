/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { css, SerializedStyles } from '@emotion/react';

import { StyleProps } from '../../styles/styled';
import { typography } from '../../styles/style-mixins';

const FONTS_BASE_URL = 'https://static.sumup.com/fonts/latin-greek-cyrillic';

export const createBaseStyles = ({
  theme,
}: StyleProps): SerializedStyles => css`
  /**
   * Start downloading custom fonts as soon as possible.
   */
  @font-face {
    font-family: 'aktiv-grotesk';
    font-weight: 400;
    font-display: swap;
    src: url('${FONTS_BASE_URL}/aktiv-grotest-400.woff2') format('woff2'),
      url('${FONTS_BASE_URL}/aktiv-grotest-400.woff') format('woff'),
      url('${FONTS_BASE_URL}/aktiv-grotest-400.eot') format('embedded-opentype');
  }
  @font-face {
    font-family: 'aktiv-grotesk';
    font-weight: 700;
    font-display: swap;
    src: url('${FONTS_BASE_URL}/aktiv-grotest-700.woff2') format('woff2'),
      url('${FONTS_BASE_URL}/aktiv-grotest-700.woff') format('woff'),
      url('${FONTS_BASE_URL}/aktiv-grotest-700.eot') format('embedded-opentype');
  }

  :root {
    /* Neutral backgrounds */
    --cui-bg-neutral-normal-idle: #ffffff;
    --cui-bg-neutral-normal-hovered: #f5f5f5;
    --cui-bg-neutral-normal-pressed: #e6e6e6;
    --cui-bg-neutral-normal-disabled: rgba(255, 255, 255, 0.4);
    --cui-bg-neutral-subtle-idle: #f5f5f5;
    --cui-bg-neutral-subtle-hovered: #e6e6e6;
    --cui-bg-neutral-subtle-pressed: #cccccc;
    --cui-bg-neutral-subtle-disabled: rgba(245, 245, 245, 0.4);
    --cui-bg-neutral-highlight-idle: #e6e6e6;
    --cui-bg-neutral-highlight-hovered: #cccccc;
    --cui-bg-neutral-highlight-pressed: #999999;
    --cui-bg-neutral-highlight-disabled: rgba(230, 230, 230, 0.4);
    --cui-bg-neutral-strong-idle: #000000;
    --cui-bg-neutral-strong-hovered: #000000;
    --cui-bg-neutral-strong-pressed: #000000;
    --cui-bg-neutral-strong-disabled: rgba(0, 0, 0, 0.4);
    /* Accent backgrounds */
    --cui-bg-accent-normal-idle: #ebf4ff;
    --cui-bg-accent-normal-hovered: #dbe9ff;
    --cui-bg-accent-normal-pressed: #c7dbff;
    --cui-bg-accent-normal-disabled: rgba(235, 244, 255, 0.4);
    --cui-bg-accent-strong-idle: #3064e3;
    --cui-bg-accent-strong-hovered: #1c51d3;
    --cui-bg-accent-strong-pressed: #10399e;
    --cui-bg-accent-strong-disabled: rgba(48, 100, 227, 0.4);
    /* Success backgrounds */
    --cui-bg-success-normal-idle: #e9fbe9;
    --cui-bg-success-normal-hovered: #d7f8d7;
    --cui-bg-success-normal-pressed: #c1e8c1;
    --cui-bg-success-normal-disabled: rgba(193, 232, 193, 0.4);
    --cui-bg-success-strong-idle: #018850;
    --cui-bg-success-strong-hovered: #007a4e;
    --cui-bg-success-strong-pressed: #016c26;
    --cui-bg-success-strong-disabled: rgba(1, 135, 48, 0.4);
    /* Warning backgrounds */
    --cui-bg-warning-normal-idle: #fdf4db;
    --cui-bg-warning-normal-hovered: #faeec6;
    --cui-bg-warning-normal-pressed: #f5dea3;
    --cui-bg-warning-normal-disabled: rgba(245, 222, 163, 0.4);
    --cui-bg-warning-strong-idle: #e87c00;
    --cui-bg-warning-strong-hovered: #cc6d00;
    --cui-bg-warning-strong-pressed: #b25c00;
    --cui-bg-warning-strong-disabled: rgba(232, 124, 0, 0.4);
    /* Danger backgrounds */
    --cui-bg-danger-normal-idle: #b25c00;
    --cui-bg-danger-normal-hovered: #fcddd9;
    --cui-bg-danger-normal-pressed: #f7ccc7;
    --cui-bg-danger-normal-disabled: rgba(247, 204, 199, 0.4);
    --cui-bg-danger-strong-idle: #de331d;
    --cui-bg-danger-strong-hovered: #bd2c19;
    --cui-bg-danger-strong-pressed: #9e2415;
    --cui-bg-danger-strong-disabled: rgba(222, 51, 29, 0.4);
    /* Promo backgrounds */
    --cui-bg-promo-normal-idle: #f5edfe;
    --cui-bg-promo-normal-hovered: #ede0fc;
    --cui-bg-promo-normal-pressed: #e0c9f8;
    --cui-bg-promo-normal-disabled: rgba(224, 201, 248, 0.4);
    --cui-bg-promo-strong-idle: #9e33e0;
    --cui-bg-promo-strong-hovered: #8a1ecc;
    --cui-bg-promo-strong-pressed: #7219a9;
    --cui-bg-promo-strong-disabled: rgba(149, 53, 208, 0.4);
    /* Neutral foregrounds */
    --cui-fg-neutral-normal-idle: #1a1a1a;
    --cui-fg-neutral-normal-hovered: #1a1a1a;
    --cui-fg-neutral-normal-pressed: #1a1a1a;
    --cui-fg-neutral-normal-disabled: rgba(26, 26, 26, 0.4);
    --cui-fg-neutral-subtle-idle: #666666;
    --cui-fg-neutral-subtle-hovered: #333333;
    --cui-fg-neutral-subtle-pressed: #1a1a1a;
    --cui-fg-neutral-subtle-disabled: rgba(102, 102, 102, 0.4);
    --cui-fg-neutral-placeholder-idle: #999999;
    --cui-fg-neutral-placeholder-hovered: #999999;
    --cui-fg-neutral-placeholder-pressed: #999999;
    --cui-fg-neutral-placeholder-disabled: rgba(153, 153, 153, 0.4);
    --cui-fg-neutral-on-strong-idle: #ffffff;
    --cui-fg-neutral-on-strong-hovered: #ffffff;
    --cui-fg-neutral-on-strong-pressed: #ffffff;
    --cui-fg-neutral-on-strong-disabled: rgba(255, 255, 255, 0.4);
    /* Accent foregrounds */
    --cui-fg-accent-normal-idle: #3064e3;
    --cui-fg-accent-normal-hovered: #1c51d3;
    --cui-fg-accent-normal-pressed: #10399e;
    --cui-fg-accent-normal-disabled: rgba(48, 100, 227, 0.4);
    /* Success foregrounds */
    --cui-fg-success-normal-idle: #018850;
    --cui-fg-success-normal-hovered: #007a4e;
    --cui-fg-success-normal-pressed: #016c26;
    --cui-fg-success-normal-disabled: rgba(1, 135, 48, 0.4);
    /* Warning foregrounds */
    --cui-fg-warning-normal-idle: #e27900;
    --cui-fg-warning-normal-hovered: #cc6d00;
    --cui-fg-warning-normal-pressed: #b25c00;
    --cui-fg-warning-normal-disabled: rgba(232, 124, 0, 0.4);
    /* Danger foregrounds */
    --cui-fg-danger-normal-idle: #de331d;
    --cui-fg-danger-normal-hovered: #bd2c19;
    --cui-fg-danger-normal-pressed: #9e2415;
    --cui-fg-danger-normal-disabled: rgba(222, 51, 29, 0.4);
    /* Promo foregrounds */
    --cui-fg-promo-normal-idle: #9e33e0;
    --cui-fg-promo-normal-hovered: #8a1ecc;
    --cui-fg-promo-normal-pressed: #7219a9;
    --cui-fg-promo-normal-disabled: rgba(149, 53, 208, 0.4);
    /* Neutral borders */
    --cui-border-neutral-normal-idle: #cccccc;
    --cui-border-neutral-normal-hovered: #999999;
    --cui-border-neutral-normal-pressed: #666666;
    --cui-border-neutral-normal-disabled: rgba(204, 204, 204, 0.4);
    --cui-border-neutral-subtle-idle: #e6e6e6;
    --cui-border-neutral-subtle-hovered: #cccccc;
    --cui-border-neutral-subtle-pressed: #999999;
    --cui-border-neutral-subtle-disabled: rgba(230, 230, 230, 0.4);
    --cui-border-neutral-divider-idle: #cccccc;
    --cui-border-neutral-divider-hovered: #999999;
    --cui-border-neutral-divider-pressed: #666666;
    --cui-border-neutral-divider-disabled: rgba(204, 204, 204, 0.4);
    --cui-border-neutral-strong-idle: #1a1a1a;
    --cui-border-neutral-strong-hovered: #000000;
    --cui-border-neutral-strong-pressed: #000000;
    --cui-border-neutral-strong-disabled: rgba(0, 0, 0, 0.4);
    /* Accent borders */
    --cui-border-accent-normal-idle: #3064e3;
    --cui-border-accent-normal-hovered: #1c51d3;
    --cui-border-accent-normal-pressed: #10399e;
    --cui-border-accent-normal-disabled: rgba(48, 100, 227, 0.4);
    /* Success borders */
    --cui-border-success-normal-idle: #018850;
    --cui-border-success-normal-hovered: #007a4e;
    --cui-border-success-normal-pressed: #016c26;
    --cui-border-success-normal-disabled: rgba(1, 135, 48, 0.4);
    /* Warning borders */
    --cui-border-warning-normal-idle: #e87c00;
    --cui-border-warning-normal-hovered: #cc6d00;
    --cui-border-warning-normal-pressed: #b25c00;
    --cui-border-warning-normal-disabled: rgba(232, 124, 0, 0.4);
    /* Danger borders */
    --cui-border-danger-normal-idle: #de331d;
    --cui-border-danger-normal-hovered: #bd2c19;
    --cui-border-danger-normal-pressed: #9e2415;
    --cui-border-danger-normal-disabled: rgba(222, 51, 29, 0.4);
    /* Promo borders */
    --cui-border-promo-normal-idle: #9e33e0;
    --cui-border-promo-normal-hovered: #8a1ecc;
    --cui-border-promo-normal-pressed: #7219a9;
    --cui-border-promo-normal-disabled: rgba(149, 53, 208, 0.4);
    /* Special colors */
    --cui-bg-overlay: rgba(0, 0, 0, 0.4);
    --cui-border-focus: #ebf4ff;
    /* Aliases */
    --cui-bg-normal: var(--cui-bg-neutral-normal-idle);
    --cui-bg-normal-hovered: var(--cui-bg-neutral-normal-hovered);
    --cui-bg-normal-pressed: var(--cui-bg-neutral-normal-pressed);
    --cui-bg-subtle: var(--cui-bg-neutral-subtle-idle);
    --cui-bg-subtle-hovered: var(--cui-bg-neutral-subtle-hovered);
    --cui-bg-subtle-pressed: var(--cui-bg-neutral-subtle-pressed);
    --cui-bg-highlight: var(--cui-bg-neutral-highlight-idle);
    --cui-bg-highlight-hovered: var(--cui-bg-neutral-highlight-hovered);
    --cui-bg-highlight-pressed: var(--cui-bg-neutral-highlight-pressed);
    --cui-bg-strong: var(--cui-bg-neutral-strong-idle);
    --cui-bg-strong-hovered: var(--cui-bg-neutral-strong-hovered);
    --cui-bg-strong-pressed: var(--cui-bg-neutral-strong-pressed);
    --cui-bg-accent: var(--cui-bg-accent-normal-idle);
    --cui-bg-accent-hovered: var(--cui-bg-accent-normal-hovered);
    --cui-bg-accent-pressed: var(--cui-bg-accent-normal-pressed);
    --cui-bg-accent-strong: var(--cui-bg-accent-strong-idle);
    --cui-bg-success: var(--cui-bg-success-normal-idle);
    --cui-bg-success-hovered: var(--cui-bg-success-normal-hovered);
    --cui-bg-success-pressed: var(--cui-bg-success-normal-pressed);
    --cui-bg-success-strong: var(--cui-bg-success-strong-idle);
    --cui-bg-warning: var(--cui-bg-warning-normal-idle);
    --cui-bg-warning-hovered: var(--cui-bg-warning-normal-hovered);
    --cui-bg-warning-pressed: var(--cui-bg-warning-normal-pressed);
    --cui-bg-warning-strong: var(--cui-bg-warning-strong-idle);
    --cui-bg-danger: var(--cui-bg-danger-normal-idle);
    --cui-bg-danger-hovered: var(--cui-bg-danger-normal-hovered);
    --cui-bg-danger-pressed: var(--cui-bg-danger-normal-pressed);
    --cui-bg-danger-strong: var(--cui-bg-danger-strong-idle);
    --cui-bg-promo: var(--cui-bg-promo-normal-idle);
    --cui-bg-promo-hovered: var(--cui-bg-promo-normal-hovered);
    --cui-bg-promo-pressed: var(--cui-bg-promo-normal-pressed);
    --cui-bg-promo-strong: var(--cui-bg-promo-strong-idle);
    --cui-fg-normal: var(--cui-fg-neutral-normal-idle);
    --cui-fg-normal-hovered: var(--cui-fg-neutral-normal-hovered);
    --cui-fg-normal-pressed: var(--cui-fg-neutral-normal-pressed);
    --cui-fg-subtle: var(--cui-fg-neutral-subtle-idle);
    --cui-fg-subtle-hovered: var(--cui-fg-neutral-subtle-hovered);
    --cui-fg-subtle-pressed: var(--cui-fg-neutral-subtle-pressed);
    --cui-fg-placeholder: var(--cui-fg-neutral-placeholder-idle);
    --cui-fg-placeholder-hovered: var(--cui-fg-neutral-placeholder-hovered);
    --cui-fg-placeholder-pressed: var(--cui-fg-neutral-placeholder-pressed);
    --cui-fg-on-strong: var(--cui-fg-neutral-on-strong-idle);
    --cui-fg-on-strong-hovered: var(--cui-fg-neutral-on-strong-hovered);
    --cui-fg-on-strong-pressed: var(--cui-fg-neutral-on-strong-pressed);
    --cui-fg-accent: var(--cui-fg-accent-normal-idle);
    --cui-fg-accent-hovered: var(--cui-fg-accent-normal-hovered);
    --cui-fg-accent-pressed: var(--cui-fg-accent-normal-pressed);
    --cui-fg-success: var(--cui-fg-success-normal-idle);
    --cui-fg-success-hovered: var(--cui-fg-success-normal-hovered);
    --cui-fg-success-pressed: var(--cui-fg-success-normal-pressed);
    --cui-fg-warning: var(--cui-fg-warning-normal-idle);
    --cui-fg-warning-hovered: var(--cui-fg-warning-normal-hovered);
    --cui-fg-warning-pressed: var(--cui-fg-warning-normal-pressed);
    --cui-fg-danger: var(--cui-fg-danger-normal-idle);
    --cui-fg-danger-hovered: var(--cui-fg-danger-normal-hovered);
    --cui-fg-danger-pressed: var(--cui-fg-danger-normal-pressed);
    --cui-fg-promo: var(--cui-fg-promo-normal-idle);
    --cui-fg-promo-hovered: var(--cui-fg-promo-normal-hovered);
    --cui-fg-promo-pressed: var(--cui-fg-promo-normal-pressed);
    --cui-border-normal: var(--cui-border-neutral-normal-idle);
    --cui-border-normal-hovered: var(--cui-border-neutral-normal-hovered);
    --cui-border-normal-pressed: var(--cui-border-neutral-normal-pressed);
    --cui-border-subtle: var(--cui-border-neutral-subtle-idle);
    --cui-border-subtle-hovered: var(--cui-border-neutral-subtle-hovered);
    --cui-border-subtle-pressed: var(--cui-border-neutral-subtle-pressed);
    --cui-border-divider: var(--cui-border-neutral-divider-idle);
    --cui-border-divider-hovered: var(--cui-border-neutral-divider-hovered);
    --cui-border-divider-pressed: var(--cui-border-neutral-divider-pressed);
    --cui-border-strong: var(--cui-border-neutral-strong-idle);
    --cui-border-strong-hovered: var(--cui-border-neutral-strong-hovered);
    --cui-border-strong-pressed: var(--cui-border-neutral-strong-pressed);
    --cui-border-accent: var(--cui-border-accent-normal-idle);
    --cui-border-accent-hovered: var(--cui-border-accent-normal-hovered);
    --cui-border-accent-pressed: var(--cui-border-accent-normal-pressed);
    --cui-border-accent-focused: var(--cui-border-accent-normal-focused);
    --cui-border-success: var(--cui-border-success-normal-idle);
    --cui-border-success-hovered: var(--cui-border-success-normal-hovered);
    --cui-border-success-pressed: var(--cui-border-success-normal-pressed);
    --cui-border-warning: var(--cui-border-warning-normal-idle);
    --cui-border-warning-hovered: var(--cui-border-warning-normal-hovered);
    --cui-border-warning-pressed: var(--cui-border-warning-normal-pressed);
    --cui-border-danger: var(--cui-border-danger-normal-idle);
    --cui-border-danger-hovered: var(--cui-border-danger-normal-hovered);
    --cui-border-danger-pressed: var(--cui-border-danger-normal-pressed);
    --cui-border-promo: var(--cui-border-promo-normal-idle);
    --cui-border-promo-hovered: var(--cui-border-promo-normal-hovered);
    --cui-border-promo-pressed: var(--cui-border-promo-normal-pressed);
  }

  /**
   * reset.css
   * http://meyerweb.com/eric/tools/css/reset/
   * v2.0 | 20110126
   * License: none (public domain)
   */
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote::before,
  blockquote::after,
  q::before,
  q::after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /**
   * Our global resets
   */

  /**
   * Best practice from http://callmenick.com/post/the-new-box-sizing-reset
   * TLDR: It’s easier to override and a slight performance boost.
   */
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    overflow-x: hidden;

    [type='button'] {
      appearance: none;
    }
  }

  body {
    background-color: ${theme.colors.bodyBg};
    color: ${theme.colors.bodyColor};
    ${typography('one')(theme)};
  }

  /**
   * Form elements don't inherit font settings.
   * https://stackoverflow.com/questions/26140050/why-is-font-family-not-inherited-in-button-tags-automatically
   */
  html,
  body,
  input,
  select,
  optgroup,
  textarea,
  button {
    font-weight: ${theme.fontWeight.regular};
    font-family: ${theme.fontStack.default};
    font-feature-settings: 'kern';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  pre,
  code {
    font-family: ${theme.fontStack.mono};
  }
`;
