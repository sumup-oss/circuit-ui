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

import { css, SerializedStyles } from '@emotion/core';
import { Theme } from '@sumup/design-tokens';
import { curry } from 'lodash/fp';

type ThemeArgs = Theme | { theme: Theme };

function isTheme(args: ThemeArgs): args is Theme {
  return (args as { theme: Theme }).theme === undefined;
}

export const getTheme = (args: ThemeArgs): Theme =>
  isTheme(args) ? args : args.theme;

type StyleFn =
  | ((theme: Theme) => SerializedStyles)
  | ((args: ThemeArgs) => SerializedStyles)
  | false
  | null
  | undefined;

export const cx = (...styleFns: StyleFn[]) => (theme: Theme) =>
  styleFns.map((styleFn) => styleFn && styleFn(theme));

type Spacing = keyof Theme['spacings'] | 0;

const getSpacingValue = (theme: Theme, size: Spacing) => {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof size === 'number' && size !== 0) {
      console.warn(
        [
          `The number "${size as number}" was passed to the spacing mixin.`,
          'This is not supported. Pass a spacing constant or 0 instead.',
        ].join(' '),
      );
    }
  }
  return typeof size === 'string' ? theme.spacings[size] : '0px';
};

export const spacing = curry(
  (
    size:
      | Spacing
      | { top?: Spacing; bottom?: Spacing; right?: Spacing; left?: Spacing },
    args: ThemeArgs,
  ) => {
    const theme = getTheme(args);

    if (typeof size === 'string' || typeof size === 'number') {
      return css({ margin: getSpacingValue(theme, size) });
    }

    const margins: {
      marginTop?: string;
      marginBottom?: string;
      marginRight?: string;
      marginLeft?: string;
    } = {};

    if (typeof size.top !== 'undefined') {
      margins.marginTop = getSpacingValue(theme, size.top);
    }

    if (typeof size.bottom !== 'undefined') {
      margins.marginBottom = getSpacingValue(theme, size.bottom);
    }

    if (typeof size.right !== 'undefined') {
      margins.marginRight = getSpacingValue(theme, size.right);
    }

    if (typeof size.left !== 'undefined') {
      margins.marginLeft = getSpacingValue(theme, size.left);
    }
    return css(margins);
  },
);

export const shadowSingle = (args: ThemeArgs): SerializedStyles => {
  const theme = getTheme(args);
  return css`
    box-shadow: 0 0 0 1px ${theme.colors.shadow},
      0 0 1px 0 ${theme.colors.shadow}, 0 2px 2px 0 ${theme.colors.shadow};
  `;
};

export const shadowDouble = (args: ThemeArgs): SerializedStyles => {
  const theme = getTheme(args);
  return css`
    box-shadow: 0 0 0 1px ${theme.colors.shadow},
      0 2px 2px 0 ${theme.colors.shadow}, 0 4px 4px 0 ${theme.colors.shadow};
  `;
};

export const shadowTriple = (args: ThemeArgs): SerializedStyles => {
  const theme = getTheme(args);
  return css`
    box-shadow: 0 0 0 1px ${theme.colors.shadow},
      0 4px 4px 0 ${theme.colors.shadow}, 0 8px 8px 0 ${theme.colors.shadow};
  `;
};

function createTypeHelper<T extends 'headings' | 'subHeadings' | 'text'>(
  type: T,
  size: keyof Theme['typography'][T],
) {
  return (args: ThemeArgs): SerializedStyles => {
    const theme = getTheme(args);
    const { fontSize, lineHeight } = (theme.typography[type][
      size
    ] as unknown) as {
      fontSize: string;
      lineHeight: string;
    };
    return css`
      font-size: ${fontSize};
      line-height: ${lineHeight};
    `;
  };
}

export const headingKilo = createTypeHelper('headings', 'kilo');
export const headingMega = createTypeHelper('headings', 'mega');
export const headingGiga = createTypeHelper('headings', 'giga');
export const headingTera = createTypeHelper('headings', 'tera');
export const headingPeta = createTypeHelper('headings', 'peta');
export const headingExa = createTypeHelper('headings', 'exa');
export const headingZetta = createTypeHelper('headings', 'zetta');

export const subHeadingKilo = createTypeHelper('subHeadings', 'kilo');
export const subHeadingMega = createTypeHelper('subHeadings', 'mega');

export const textKilo = createTypeHelper('text', 'kilo');
export const textMega = createTypeHelper('text', 'mega');
export const textGiga = createTypeHelper('text', 'giga');

/**
 * Visually communicates to the user that an element is disabled
 * and prevents user interactions.
 */
export const disableVisually = (): SerializedStyles => css`
  opacity: 0.5;
  pointer-events: none;
  box-shadow: none;
`;

/**
 * Visually hides an element while keeping it accessible to users
 * who rely on a screen reader.
 */
export const hideVisually = (): SerializedStyles => css`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

/**
 * Visually communicates to the user that an element is focused.
 */
export const focusOutline = (args: ThemeArgs): SerializedStyles => {
  const theme = getTheme(args);
  return css`
    outline: 0;
    box-shadow: 0 0 0 4px ${theme.colors.p300};

    &::-moz-focus-inner {
      border: 0;
    }
  `;
};

/**
 * A CSS hack to force an element to self-clear its floated children.
 * Taken from [CSS Tricks](https://css-tricks.com/clearfix-a-lesson-in-web-development-evolution/).
 */
export const clearfix = (): SerializedStyles => css`
  &::before,
  &::after {
    content: ' ';
    display: table;
  }
  &::after {
    clear: both;
  }
`;

/**
 * Hide the browser scrollbar on a scrollable element, e.g. with overflow.
 */
export const hideScrollbar = (): SerializedStyles => css`
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

/**
 * Visually communicates to the user that an input is hovered, focused,
 * or active.
 */
export const inputOutline = (
  args:
    | Theme
    | {
        theme: Theme;
        disabled?: boolean;
        invalid?: boolean;
        hasWarning?: boolean;
        showValid?: boolean;
      },
): SerializedStyles => {
  const theme = getTheme(args);
  const options = isTheme(args)
    ? { disabled: false, invalid: false, hasWarning: false }
    : args;

  if (options.disabled) {
    return css`
      box-shadow: 0 0 0 1px ${theme.colors.n500};
    `;
  }

  let colors;

  switch (true) {
    case options.invalid: {
      colors = {
        default: theme.colors.danger,
        hover: theme.colors.r700,
        focus: theme.colors.danger,
        active: theme.colors.danger,
      };
      break;
    }
    case options.hasWarning: {
      colors = {
        default: theme.colors.warning,
        hover: theme.colors.y700,
        focus: theme.colors.warning,
        active: theme.colors.warning,
      };
      break;
    }
    default: {
      colors = {
        default: theme.colors.n500,
        hover: theme.colors.n700,
        focus: theme.colors.p500,
        active: theme.colors.p500,
      };
      break;
    }
  }

  return css`
    box-shadow: 0 0 0 1px ${colors.default};

    &:hover {
      box-shadow: 0 0 0 1px ${colors.hover};
    }

    &:focus {
      box-shadow: 0 0 0 2px ${colors.focus};
    }

    &:active {
      box-shadow: 0 0 0 1px ${colors.active};
    }
  `;
};
