/* eslint-disable @typescript-eslint/no-unsafe-return */
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

import type { Theme } from '@sumup-oss/design-tokens';
import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';

import { isString } from '../../../util/type-check.js';

import type { GridKey, BreakpointOptions, GridValue } from './types.js';

export function normalizeToNumber(value: string | number): number {
  return isString(value) ? Number.parseInt(value, 10) : value;
}

export type CreateStylesFn<Option, ReturnValue> = (
  theme: Theme,
  grid: GridValue,
  option: Option,
) => ReturnValue;

export function composeBreakpoints<Option, ReturnValue>(
  fn: CreateStylesFn<Option, ReturnValue>,
  theme: Theme,
  breakpoints: BreakpointOptions<Option>,
): ReturnValue[] {
  return (Object.entries(breakpoints) as [GridKey, Option][])
    .filter(([breakpoint]) => {
      const hasGridConfig = Boolean(theme.grid[breakpoint]);

      if (process.env.NODE_ENV !== 'production' && !hasGridConfig) {
        throw new Error(
          `The breakpoint '${breakpoint}' isn't supported by the grid.`,
        );
      }

      return hasGridConfig;
    })
    .sort(
      ([breakpointA], [breakpointB]) =>
        theme.grid[breakpointA].priority - theme.grid[breakpointB].priority,
    )
    .map(([breakpoint, option]) => fn(theme, theme.grid[breakpoint], option));
}

export function wrapStyles(
  theme: Theme,
  breakpoint: keyof Theme['breakpoints'] | 'default',
  styles: string,
): SerializedStyles {
  return breakpoint === 'default'
    ? css(styles)
    : css`
        ${theme.mq[breakpoint]} {
          ${styles}
        }
      `;
}
