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
import { Theme } from '@sumup/design-tokens';

import { warn } from '../util/logger';
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
export const cx =
  (...styleFns: StyleFn[]) =>
  (theme: Theme): (SerializedStyles | false | null | undefined)[] =>
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
      warn(
        'spacing',
        `The number "${value as number}" was passed to the spacing mixin.`,
        "This is not supported. Pass a spacing constant, 'auto', or 0 instead.",
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
 * Sets the font size and line height matching the Body component.
 */
export function typography(
  size: keyof Theme['typography']['body'],
): (args: ThemeArgs) => SerializedStyles {
  return (args: ThemeArgs) => {
    const theme = getTheme(args);

    return css(theme.typography.body[size]);
  };
}

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
 * Centers the content horizontally and vertically.
 */
export const center = (): SerializedStyles => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

/**
 * Visually communicates to the user that an element is focused.
 */
// TODO: Simplify the function signature in the next major.
export function focusOutline(
  options: 'inset',
): (args?: ThemeArgs) => SerializedStyles;
export function focusOutline(args?: ThemeArgs): SerializedStyles;
export function focusOutline(
  argsOrOptions?: ThemeArgs | 'inset',
): SerializedStyles | ((args?: ThemeArgs) => SerializedStyles) {
  if (typeof argsOrOptions === 'string') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (_args?: ThemeArgs): SerializedStyles => css`
      outline: 0;
      box-shadow: inset 0 0 0 4px var(--cui-border-focus);

      &::-moz-focus-inner {
        border: 0;
      }
    `;
  }
  return css`
    outline: 0;
    box-shadow: 0 0 0 4px var(--cui-border-focus);

    &::-moz-focus-inner {
      border: 0;
    }
  `;
}

/**
 * Visually communicates to the user that an element is focused when
 * the user agent determines via heuristics that the focus should be
 * made evident on the element.
 */
// TODO: Simplify the function signature in the next major.
export function focusVisible(
  options: 'inset',
): (args?: ThemeArgs) => SerializedStyles;
export function focusVisible(args?: ThemeArgs): SerializedStyles;
export function focusVisible(
  argsOrOptions?: ThemeArgs | 'inset',
): SerializedStyles | ((args?: ThemeArgs) => SerializedStyles) {
  if (typeof argsOrOptions === 'string') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (_args?: ThemeArgs): SerializedStyles => css`
      &:focus {
        outline: 0;
        box-shadow: inset 0 0 0 4px var(--cui-border-focus);

        &::-moz-focus-inner {
          border: 0;
        }
      }

      &:focus:not(:focus-visible) {
        box-shadow: none;
      }
    `;
  }

  return css`
    &:focus {
      outline: 0;
      box-shadow: 0 0 0 4px var(--cui-border-focus);

      &::-moz-focus-inner {
        border: 0;
      }
    }

    &:focus:not(:focus-visible) {
      box-shadow: none;
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
 * Visually communicates to the user that an element is hovered, focused, or
 * active in the disabled, invalid, and warning states.
 */
export const inputOutline = (
  args:
    | Theme
    | {
        theme: Theme;
        disabled?: boolean;
        invalid?: boolean;
        hasWarning?: boolean;
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
        default: theme.colors.alert,
        hover: theme.colors.r700,
        focus: theme.colors.alert,
        active: theme.colors.alert,
      };
      break;
    }
    case options.hasWarning: {
      colors = {
        default: theme.colors.notify,
        hover: theme.colors.y700,
        focus: theme.colors.notify,
        active: theme.colors.notify,
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

/**
 * @private
 *
 * Common styles for list items (e.g. in the Popover component).
 */
export const listItem = (
  args:
    | Theme
    | {
        theme: Theme;
        destructive?: boolean;
      },
): SerializedStyles => {
  const theme = getTheme(args);
  const options = isTheme(args) ? { destructive: false } : args;

  return css`
    background-color: ${theme.colors.white};
    padding: ${theme.spacings.kilo} ${theme.spacings.tera}
      ${theme.spacings.kilo} ${theme.spacings.mega};
    border: 0;
    color: ${options.destructive ? theme.colors.alert : theme.colors.bodyColor};
    text-decoration: none;
    position: relative;

    &:hover {
      background-color: ${theme.colors.n100};
      cursor: pointer;
    }

    ${focusVisible('inset')()};

    &:active {
      background-color: ${theme.colors.n200};
    }

    &:disabled,
    &[disabled] {
      ${disableVisually()};
    }
  `;
};

/**
 * @private
 *
 * Common styles for navigation items (e.g. in the TopNavigation and
 * SideNavigation components).
 */
export const navigationItem = (
  args:
    | Theme
    | {
        theme: Theme;
        isActive?: boolean;
      },
): SerializedStyles => {
  const theme = getTheme(args);
  const options = isTheme(args) ? { isActive: false } : args;

  return css`
    display: flex;
    align-items: center;
    border: none;
    outline: none;
    color: ${options.isActive
      ? 'var(--cui-fg-accent)'
      : 'var(--cui-fg-normal)'};
    background-color: ${options.isActive
      ? 'var(--cui-bg-accent)'
      : 'var(--cui-bg-normal)'};
    text-align: left;
    cursor: pointer;
    transition: color ${theme.transitions.default},
      background-color ${theme.transitions.default};

    &:hover {
      background-color: ${options.isActive
        ? 'var(--cui-bg-accent-hovered)'
        : 'var(--cui-bg-normal-hovered)'};
    }

    &:active {
      background-color: ${options.isActive
        ? 'var(--cui-bg-accent-pressed)'
        : 'var(--cui-bg-normal-pressed)'};
    }

    ${focusVisible('inset')()};

    &:disabled {
      ${disableVisually()};
    }
  `;
};
