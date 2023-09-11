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

import { HTMLAttributes, forwardRef } from 'react';

import { clsx } from '../../styles/clsx.js';
import { CircuitError } from '../../util/errors.js';

import classes from './SubHeadline.module.css';

export interface SubHeadlineProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * The HTML heading element to render. Headings should be nested sequentially
   * without skipping any levels. Learn more at
   * https://www.w3.org/WAI/tutorials/page-structure/headings/.
   */
  as: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * A flexible SubHeadline component capable of rendering using any HTML heading
 * element, except h1.
 */
export const SubHeadline = forwardRef<HTMLHeadingElement, SubHeadlineProps>(
  ({ className, as, ...props }, ref) => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !process.env.UNSAFE_DISABLE_ELEMENT_ERRORS &&
      !as
    ) {
      throw new CircuitError('SubHeadline', 'The `as` prop is required.');
    }

    const Element = as || 'h2';

    return (
      <Element {...props} ref={ref} className={clsx(classes.base, className)} />
    );
  },
);

SubHeadline.displayName = 'SubHeadline';
