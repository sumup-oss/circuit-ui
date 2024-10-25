/**
 * Copyright 2024, SumUp Ltd.
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

import type { AsPropType } from '../../types/prop-types';
import { clsx } from '../../styles/clsx';

import classes from './Compact.module.css';

export interface CompactProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Choose from 3 font sizes. Default `m`.
   */
  size?: 's' | 'm' | 'l';
  /**
   * Choose from three font weights. Default: `regular`.
   */
  weight?: 'regular' | 'semibold' | 'bold';
  /**
   * Choose a foreground color. Default: `normal`.
   */
  color?:
    | 'normal'
    | 'subtle'
    | 'placeholder'
    | 'on-strong'
    | 'on-strong-subtle'
    | 'accent'
    | 'success'
    | 'warning'
    | 'danger'
    | 'promo';
  /**
   * Render the text using any HTML element.
   */
  as?: AsPropType;
}

/**
 * The Compact component is used to present the core textual content
 * to our users.
 */
export const Compact = forwardRef<HTMLParagraphElement, CompactProps>(
  (
    {
      className,
      as: Element = 'p',
      size = 'm',
      weight = 'regular',
      color = 'normal',
      ...props
    },
    ref,
  ) => (
    <Element
      {...props}
      ref={ref}
      className={clsx(
        classes.base,
        classes[size],
        classes[weight],
        classes[color],
        className,
      )}
    />
  ),
);

Compact.displayName = 'Compact';
