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

'use client';

import { forwardRef } from 'react';

import { legacyButtonSizeMap } from '../Button/index.js';
import { IconButton, type IconButtonProps } from '../Button/IconButton.js';
import { Skeleton } from '../Skeleton/index.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { deprecate } from '../../util/logger.js';
import { clsx } from '../../styles/clsx.js';

import classes from './Hamburger.module.css';

export interface HamburgerProps
  extends Omit<IconButtonProps, 'ref' | 'children' | 'label' | 'type'> {
  /**
   * When active, the Hamburger transform into a close button.
   */
  isActive?: boolean;
  /**
   * Label for the 'active' state. Important for accessibility.
   */
  activeLabel: string;
  /**
   * Label for the 'inactive' state. Important for accessibility.
   */
  inactiveLabel: string;
  isLoading?: never;
  loadingLabel?: never;
}

/**
 * A hamburger button for menus. Morphs into a close icon when active.
 */

export const Hamburger = forwardRef<any, HamburgerProps>(
  (
    {
      isActive = false,
      activeLabel,
      inactiveLabel,
      size: legacySize = 'm',
      className,
      ...props
    },
    ref,
  ) => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test'
    ) {
      if (!isSufficientlyLabelled(activeLabel)) {
        throw new AccessibilityError(
          'Hamburger',
          'The `activeLabel` prop is missing or invalid.',
        );
      }
      if (!isSufficientlyLabelled(inactiveLabel)) {
        throw new AccessibilityError(
          'Hamburger',
          'The `inactiveLabel` prop is missing or invalid.',
        );
      }
    }

    if (
      process.env.NODE_ENV !== 'production' &&
      legacyButtonSizeMap[legacySize]
    ) {
      deprecate(
        'Hamburger',
        `The \`${legacySize}\` size has been deprecated. Use the \`${legacyButtonSizeMap[legacySize]}\` size instead.`,
      );
    }

    const size = legacyButtonSizeMap[legacySize] || legacySize;

    return (
      <IconButton
        {...props}
        icon={({ size: _size, ...iconProps }) => (
          // @ts-expect-error This doesn't have to be an SVG element.
          <Skeleton
            {...iconProps}
            className={clsx(
              iconProps.className,
              classes.skeleton,
              classes[size],
            )}
          >
            <span className={clsx(classes.base, classes[size])} />
          </Skeleton>
        )}
        className={clsx(classes.button, className)}
        size={size}
        type="button"
        aria-pressed={isActive}
        ref={ref}
      >
        {isActive ? activeLabel : inactiveLabel}
      </IconButton>
    );
  },
);
