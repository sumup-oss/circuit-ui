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
import { getEnvVariable } from '../../util/env.js';

import classes from './Display.module.css';

export interface DisplayProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Choose from two font weights.
   *
   * @default 'bold' for sizes s, m, l
   * @default 'black' for size xl
   */
  weight?:
    | 'black'
    | 'bold'
    /**
     * @deprecated
     */
    | 'semibold'
    /**
     * @deprecated
     */
    | 'regular';
  /**
   * Choose from 3 font sizes.
   *
   * @default 'm'
   */
  size?:
    | 's'
    | 'm'
    | 'l'
    | 'xl'
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

function getWeight(weight: DisplayProps['weight'], size: DisplayProps['size']) {
  switch (weight) {
    case 'black':
      return 'black';
    case 'bold':
      return 'bold';
    default:
      return size === 'xl' ? 'black' : 'bold';
  }
}

/**
 * A flexible title component capable of rendering any HTML heading element.
 */
export const Display = forwardRef<HTMLHeadingElement, DisplayProps>(
  ({ className, as, size: legacySize = 'm', weight, ...props }, ref) => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !getEnvVariable('UNSAFE_DISABLE_ELEMENT_ERRORS') &&
      !as
    ) {
      throw new CircuitError('Display', 'The `as` prop is required.');
    }

    if (
      process.env.NODE_ENV !== 'production' &&
      (weight === 'regular' || weight === 'semibold')
    ) {
      deprecate(
        'Display',
        `The "${weight}" weight has been deprecated. Use the "bold" or "black" weights instead.`,
      );
    }

    if (
      process.env.NODE_ENV !== 'production' &&
      legacySize in deprecatedSizeMap
    ) {
      deprecate(
        'Display',
        `The "${legacySize}" size has been deprecated. Use the "${deprecatedSizeMap[legacySize]}" size instead.`,
      );
    }

    const Element = as || 'h1';

    const size = (deprecatedSizeMap[legacySize] || legacySize) as
      | 'xl'
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
          classes[getWeight(weight, size)],
          className,
        )}
      />
    );
  },
);

Display.displayName = 'Display';
