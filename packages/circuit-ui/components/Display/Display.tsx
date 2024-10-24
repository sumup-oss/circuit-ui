/**
 * Copyright 2021, SumUp Ltd.
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

import { forwardRef, type HTMLAttributes } from 'react';

import { clsx } from '../../styles/clsx.js';
import { CircuitError } from '../../util/errors.js';
import { deprecate } from '../../util/logger.js';
import { getEnv } from '../../util/env.js';

import classes from './Display.module.css';

export interface DisplayProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Choose from three font weights. Default: `regular`.
   */
  weight?: 'regular' | 'semibold' | 'bold';
  /**
   * Choose from 3 font sizes. Defaults to `m`.
   */
  size?:
    | 's'
    | 'm'
    | 'l'
    /**
     * @deprecated
     */
    | 'one'
    /**
     * @deprecated
     */
    | 'two'
    /**
     * @deprecated
     */
    | 'three'
    /**
     * @deprecated
     */
    | 'four';
  /**
   * The HTML heading element to render.
   * Headings should be nested sequentially without skipping any levels.
   * Learn more at https://www.w3.org/WAI/tutorials/page-structure/headings/.
   */
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const deprecatedSizeMap: Record<string, string> = {
  'one': 'l',
  'two': 'm',
  'three': 'm',
  'four': 's',
};

/**
 * A flexible title component capable of rendering any HTML heading element.
 */
export const Display = forwardRef<HTMLHeadingElement, DisplayProps>(
  (
    { className, as, size: legacySize = 'm', weight = 'bold', ...props },
    ref,
  ) => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !getEnv('UNSAFE_DISABLE_ELEMENT_ERRORS') &&
      !as
    ) {
      throw new CircuitError('Display', 'The `as` prop is required.');
    }

    if (process.env.NODE_ENV !== 'production') {
      if (legacySize in deprecatedSizeMap) {
        deprecate(
          'Display',
          `The "${legacySize}" size has been deprecated. Use the "${deprecatedSizeMap[legacySize]}" size instead.`,
        );
      }
    }

    const Element = as || 'h1';

    const size = (deprecatedSizeMap[legacySize] || legacySize) as
      | 'l'
      | 'm'
      | 's';

    return (
      <Element
        {...props}
        ref={ref}
        className={clsx(
          classes.base,
          classes[size],
          classes[weight],
          className,
        )}
      />
    );
  },
);

Display.displayName = 'Display';
