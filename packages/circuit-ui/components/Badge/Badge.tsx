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

import type { AsPropType } from '../../types/prop-types';
import { clsx } from '../../styles/clsx';

import classes from './Badge.module.css';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Choose the style variant. Default: 'neutral'.
   */
  variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'promo';
  /**
   * Use the circular badge to indicate a count of items related to an element.
   */
  circle?: boolean;
  /**
   * Render the text using any HTML element.
   */
  as?: AsPropType;
}

const isDynamicWidth = (children: BadgeProps['children']) => {
  if (typeof children === 'string') {
    return children.length > 2;
  }
  return false;
};

/**
 * A badge communicates the status of an element or the count of items
 * related to an element.
 */
export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      as: Element = 'div',
      className,
      style = {},
      variant = 'neutral',
      circle,
      children,
      ...props
    },
    ref,
  ) => {
    const width = isDynamicWidth(children) ? 'auto' : '24px';
    return (
      <Element
        {...props}
        ref={ref}
        className={clsx(
          classes.base,
          classes[variant],
          circle && classes.circle,
          className,
        )}
        style={{ ...style, '--badge-width': width }}
      >
        {children}
      </Element>
    );
  },
);

Badge.displayName = 'Badge';
