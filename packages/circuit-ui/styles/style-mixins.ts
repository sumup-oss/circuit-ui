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

/** @jsxImportSource @emotion/react */

import { css, SerializedStyles } from '@emotion/react';
import { Theme } from '@sumup/design-tokens';

import { warn } from '../util/logger.js';
import { isFunction } from '../util/type-check.js';

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
export function shadow(): SerializedStyles {
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
 * @deprecated Use the `disabled` state of the semantic color tokens instead.
 *
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
export function focusOutline(options?: 'inset' | ThemeArgs): SerializedStyles {
  if (options === 'inset') {
    return css`
      outline: 0;
      box-shadow: inset 0 0 0 2px var(--cui-border-focus);

      &::-moz-focus-inner {
        border: 0;
      }
    `;
  }
  return css`
    outline: 0;
    box-shadow:
      0 0 0 2px var(--cui-bg-normal),
      0 0 0 4px var(--cui-border-focus);

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
export function focusVisible(options?: 'inset' | ThemeArgs): SerializedStyles {
  if (options === 'inset') {
    return css`
      &:focus {
        outline: 0;
        box-shadow: inset 0 0 0 2px var(--cui-border-focus);

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
      box-shadow:
        0 0 0 2px var(--cui-bg-normal),
        0 0 0 4px var(--cui-border-focus);

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
export const inputOutline = (options: {
  disabled?: boolean;
  invalid?: boolean;
  hasWarning?: boolean;
}): SerializedStyles => {
  switch (true) {
    case options.disabled: {
      return css`
        box-shadow: 0 0 0 1px var(--cui-border-normal-disabled);
      `;
    }
    case options.invalid: {
      return css`
        box-shadow: 0 0 0 1px var(--cui-border-danger);

        &:hover {
          box-shadow: 0 0 0 1px var(--cui-border-danger-hovered);
        }

        &:focus {
          box-shadow: 0 0 0 2px var(--cui-border-danger);
        }

        &:active {
          box-shadow: 0 0 0 1px var(--cui-border-danger-pressed);
        }
      `;
    }
    case options.hasWarning: {
      return css`
        box-shadow: 0 0 0 1px var(--cui-border-warning);

        &:hover {
          box-shadow: 0 0 0 1px var(--cui-border-warning-hovered);
        }

        &:focus {
          box-shadow: 0 0 0 2px var(--cui-border-warning);
        }

        &:active {
          box-shadow: 0 0 0 1px var(--cui-border-warning-pressed);
        }
      `;
    }
    default: {
      return css`
        box-shadow: 0 0 0 1px var(--cui-border-normal);

        &:hover {
          box-shadow: 0 0 0 1px var(--cui-border-normal-hovered);
        }

        &:focus {
          box-shadow: 0 0 0 2px var(--cui-border-accent);
        }

        &:active {
          box-shadow: 0 0 0 1px var(--cui-border-accent);
        }
      `;
    }
  }
};
