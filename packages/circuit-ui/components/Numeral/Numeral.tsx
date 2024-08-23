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

import { forwardRef, type HTMLAttributes } from 'react';

import type { AsPropType } from '../../types/prop-types.js';
import { clsx } from '../../styles/clsx.js';

import classes from './Numeral.module.css';

export interface NumeralProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Choose from 3 font sizes. Default `m`.
   */
  size?: 's' | 'm' | 'l';
  /**
   * Choose from two font weights. Default: `regular`.
   */
  weight?: 'regular' | 'bold';
  /**
   * Render the text using any HTML element.
   */
  as?: AsPropType;
}

/**
 * The Numeral component is used to present the core textual content
 * to our users.
 */
export const Numeral = forwardRef<HTMLParagraphElement, NumeralProps>(
  (
    { className, as: Element = 'p', size = 'm', weight = 'regular', ...props },
    ref,
  ) => (
    <Element
      {...props}
      ref={ref}
      className={clsx(classes.base, classes[size], classes[weight], className)}
    />
  ),
);

Numeral.displayName = 'Numeral';