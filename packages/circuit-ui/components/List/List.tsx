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

import { forwardRef, type OlHTMLAttributes } from 'react';

import { clsx } from '../../styles/clsx.js';
import { deprecate } from '../../util/logger.js';

import classes from './List.module.css';

export interface ListProps extends OlHTMLAttributes<HTMLOListElement> {
  /**
   * A Circuit UI Body size. Should match surrounding text.
   */
  size?: 'one' | 'two';
  /**
   * Whether the list should be presented as an ordered or unordered list. Defaults to `ul`.
   */
  as?: 'ol' | 'ul';
  /**
   * @deprecated Use the `as` prop instead.
   */
  variant?: 'ordered' | 'unordered';
}

const variantMap = {
  unordered: 'ul',
  ordered: 'ol',
} as const;

/**
 * A list, which can be ordered or unordered.
 */
export const List = forwardRef<HTMLOListElement, ListProps>(
  ({ className, variant, as, size = 'one', ...props }, ref) => {
    if (process.env.NODE_ENV !== 'production' && variant) {
      deprecate(
        'List',
        'The `variant` prop has been deprecated. Use the `as` prop instead.',
      );
    }

    const Element = as || (variant ? variantMap[variant] : 'ul');
    return (
      <Element
        className={clsx(classes.base, classes[size], className)}
        {...props}
        ref={ref}
      />
    );
  },
);

List.displayName = 'List';
