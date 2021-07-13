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

import { isFunction } from '../util/type-check';

type ThemeArgs = Theme | { theme: Theme };

function isTheme(args: ThemeArgs): args is Theme {
  return (args as { theme: Theme }).theme === undefined;
}

/**
 * @private
 */
const getTheme = (args: ThemeArgs): Theme =>
  isTheme(args) ? args : args.theme;

type StyleFn =
  | ((theme: Theme) => SerializedStyles)
  | ((args: ThemeArgs) => SerializedStyles)
  | SerializedStyles
  | false
  | null
  | undefined;

/**
 * Helper to pass multiple style mixins to the `css` prop.
 * Mixins can be applied conditionally, falsy values are omitted.
 */
export const cx = (...styleFns: StyleFn[]) => (
  theme: Theme,
): (SerializedStyles | false | null | undefined)[] =>
  styleFns.map((styleFn) => (isFunction(styleFn) ? styleFn(theme) : styleFn));

type Spacing = keyof Theme['spacings'];

export type SpacingValue = Spacing | 'auto' | 0;

export type SpacingObject = {
  top?: SpacingValue;
  bottom?: SpacingValue;
  right?: SpacingValue;
  left?: SpacingValue;
};

const mapSpacingValue = (theme: Theme, value: SpacingValue) => {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof value === 'number' && value !== 0) {
      // eslint-disable-next-line no-console
      console.warn(
        [
          `The number "${value as number}" was passed to the spacing mixin.`,
          "This is not supported. Pass a spacing constant, 'auto', or 0 instead.",
        ].join(' '),
      );
    }
  }

  if (value === 0 || value === 'auto') {
    return String(value);
  }

  return theme.spacings[value];
};

/**
 * Adds margin to one or more sides of an element.
 */
export const spacing = (
  size: SpacingValue | SpacingObject,
): ((args: ThemeArgs) => SerializedStyles) => {
  if (typeof size === 'string' || typeof size === 'number') {
    return (args: ThemeArgs) => {
      const theme = getTheme(args);

      return css({ margin: mapSpacingValue(theme, size) });
    };
  }

  const margins: {
    marginTop?: string;
    marginBottom?: string;
    marginRight?: string;
    marginLeft?: string;
  } = {};

  return (args: ThemeArgs) => {
    const theme = getTheme(args);

    if (typeof size.top !== 'undefined') {
      margins.marginTop = mapSpacingValue(theme, size.top);
    }

    if (typeof size.right !== 'undefined') {
      margins.marginRight = mapSpacingValue(theme, size.right);
    }

    if (typeof size.bottom !== 'undefined') {
      margins.marginBottom = mapSpacingValue(theme, size.bottom);
    }

    if (typeof size.left !== 'undefined') {
      margins.marginLeft = mapSpacingValue(theme, size.left);
    }
    return css(margins);
  };
};

/**
 * Adds a drop shadow to an element to visually elevate it above the
 * surrounding content.
 */
export function shadow(options?: never): (args: ThemeArgs) => SerializedStyles;
export function shadow(args: ThemeArgs): SerializedStyles;
export function shadow(
  argsOrOptions?: ThemeArgs | never,
): SerializedStyles | ((args: ThemeArgs) => SerializedStyles) {
  if (!argsOrOptions) {
    return (): SerializedStyles => css`
      box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.2);
    `;
  }

  return css`
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.2);
  `;
}

/**
 * @deprecated Use the `shadow` style mixin instead.
 */
export const shadowSingle = (args: ThemeArgs): SerializedStyles => {
  const theme = getTheme(args);
  return css`
    box-shadow: 0 0 0 1px ${theme.colors.shadow},
      0 0 1px 0 ${theme.colors.shadow}, 0 2px 2px 0 ${theme.colors.shadow};
  `;
};

/**
 * @deprecated Use the `shadow` style mixin instead.
 */
export const shadowDouble = (args: ThemeArgs): SerializedStyles => {
  const theme = getTheme(args);
  return css`
    box-shadow: 0 0 0 1px ${theme.colors.shadow},
      0 2px 2px 0 ${theme.colors.shadow}, 0 4px 4px 0 ${theme.colors.shadow};
  `;
};

/**
 * @deprecated Use the `shadow` style mixin instead.
 */
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

/**
 * @private
 */
export const headingKilo = createTypeHelper('headings', 'kilo');
/**
 * @private
 */
export const headingMega = createTypeHelper('headings', 'mega');
/**
 * @private
 */
export const headingGiga = createTypeHelper('headings', 'giga');
/**
 * @private
 */
export const headingTera = createTypeHelper('headings', 'tera');
/**
 * @private
 */
export const headingPeta = createTypeHelper('headings', 'peta');
/**
 * @private
 */
export const headingExa = createTypeHelper('headings', 'exa');
/**
 * @private
 */
export const headingZetta = createTypeHelper('headings', 'zetta');

/**
 * @private
 */
export const subHeadingKilo = createTypeHelper('subHeadings', 'kilo');
/**
 * @private
 */
export const subHeadingMega = createTypeHelper('subHeadings', 'mega');

/**
 * @private
 */
export const textKilo = createTypeHelper('text', 'kilo');
/**
 * @private
 */
export const textMega = createTypeHelper('text', 'mega');
/**
 * @private
 */
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

export function focusOutline(
  options: 'inset',
): (args: ThemeArgs) => SerializedStyles;
export function focusOutline(args: ThemeArgs): SerializedStyles;
export function focusOutline(
  argsOrOptions: ThemeArgs | 'inset',
): SerializedStyles | ((args: ThemeArgs) => SerializedStyles) {
  if (typeof argsOrOptions === 'string') {
    return (args: ThemeArgs): SerializedStyles => {
      const theme = getTheme(args);
      return css`
        outline: 0;
        box-shadow: inset 0 0 0 4px ${theme.colors.p300};

        &::-moz-focus-inner {
          border: 0;
        }
      `;
    };
  }

  const theme = getTheme(argsOrOptions);
  return css`
    outline: 0;
    box-shadow: 0 0 0 4px ${theme.colors.p300};

    &::-moz-focus-inner {
      border: 0;
    }
  `;
}

/**
 * Forces an element to self-clear its floated children.
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
 * Hides the browser scrollbar on a scrollable element, e.g. with overflow.
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
