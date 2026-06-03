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

import type { HTMLAttributes, Ref } from 'react';

import type { AsPropType } from '../../types/prop-types.js';
import { deprecate } from '../../util/logger.js';
import { Status, type StatusColor } from '../Status/Status.js';

/**
 * @deprecated Use the Status component instead.
 */
export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  /**
   * @deprecated Use the Status component's `color` prop instead.
   * Choose the style variant. Default: 'neutral'.
   */
  variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'promo';
  /**
   * @deprecated Use `<Status variant="badge">` instead.
   * Use the circular badge to indicate a count of items related to an element.
   */
  circle?: boolean;
  /**
   * Render the text using any HTML element.
   */
  as?: AsPropType;
}

const colorMap: Record<NonNullable<BadgeProps['variant']>, StatusColor> = {
  success: 'confirm',
  warning: 'notify',
  danger: 'alert',
  neutral: 'neutral',
  promo: 'promo',
};

/**
 * @deprecated Use the Status component instead.
 *
 * A badge communicates the status of an element or the count of items
 * related to an element.
 */
export function Badge({ variant = 'neutral', circle, color: _color, children, ref, ...props }: BadgeProps) {
    if (process.env.NODE_ENV !== 'production') {
      deprecate(
        'Badge',
        'The Badge component is deprecated. Use the Status component with variant="pill" or variant="badge" instead.',
      );
    }

    return (
      <Status
        ref={ref}
        variant={circle ? 'badge' : 'pill'}
        color={colorMap[variant]}
        {...props}
      >
        {children as string | number | undefined}
      </Status>
    );
}

