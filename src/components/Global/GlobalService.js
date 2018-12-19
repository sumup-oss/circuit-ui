import { css } from '@emotion/core';

import { textMega } from '../../styles/style-helpers';

import { RESETS } from './GlobalConstants';

export const createGlobalStyles = (theme, custom) => css`
  /* Use resets */
  ${RESETS};

  /* Our globals */

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
    overflow-x: hidden;
    text-rendering: optimizeLegibility;
  }

  pre,
  code {
    font-family: ${theme.fontStack.mono};
  }

  /**
   * Allow custom styles to override the default styles
   */
  ${custom};
`;
