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

import { css } from '@emotion/core';

import { StyleProps } from '../../styles/styled';
import { textMega } from '../../styles/style-mixins';

const FONTS_BASE_URL = 'https://static.sumup.com/fonts/latin-greek-cyrillic';

export const createBaseStyles = ({ theme }: StyleProps) => css`
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
    ${textMega({ theme })};
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
