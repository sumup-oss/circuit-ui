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

import { Children, cloneElement, ReactElement, forwardRef } from 'react';
import type { IconProps } from '@sumup/icons';

import { clsx } from '../../styles/clsx.js';
import Button, { ButtonProps, legacyButtonSizeMap } from '../Button/index.js';
import {
  AccessibilityError,
  CircuitError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { deprecate } from '../../util/logger.js';
import { isString } from '../../util/type-check.js';

import classes from './IconButton.module.css';

export interface IconButtonProps
  extends Omit<ButtonProps, 'navigationIcon' | 'stretch' | 'children'> {
  /**
   * Communicates the action that will be performed when the user interacts
   * with the button. Use one strong, clear imperative verb and follow with a
   * one-word object if needed to clarify.
   * Displayed on hover and accessible to screen readers.
   */
  children?: ReactElement<IconProps> | string;
  /**
   * @deprecated
   *
   * Use the `children` prop instead.
   */
  label?: string;
}

/**
 * The IconButton component displays a button with a single icon
 * as its only child.
 */
export const IconButton = forwardRef<any, IconButtonProps>(
  (
    {
      children,
      label,
      size: legacySize = 'm',
      icon: Icon,
      className,
      ...props
    },
    ref,
  ) => {
    const size = legacyButtonSizeMap[legacySize] || legacySize;

    const labelString = isString(children) ? children : label;

    if (
      process.env.NODE_ENV !== 'production' &&
      !Icon &&
      Children.count(children) !== 1
    ) {
      throw new CircuitError('IconButton', 'The `icon` prop is missing.');
    }

    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !isSufficientlyLabelled(labelString)
    ) {
      throw new AccessibilityError(
        'IconButton',
        'The `children` prop is missing or invalid.',
      );
    }

    if (process.env.NODE_ENV !== 'production' && !isString(children)) {
      deprecate(
        'IconButton',
        'The `children` prop has been deprecated to pass the icon. Use the `icon` prop instead.',
      );
    }

    if (process.env.NODE_ENV !== 'production' && label) {
      deprecate(
        'IconButton',
        'The `label` prop has been deprecated. Use the `children` prop instead.',
      );
    }

    if (
      process.env.NODE_ENV !== 'production' &&
      legacyButtonSizeMap[legacySize]
    ) {
      deprecate(
        'IconButton',
        `The IconButton's \`${legacySize}\` size has been deprecated. Use the \`${legacyButtonSizeMap[legacySize]}\` size instead.`,
      );
    }

    return (
      // @ts-expect-error The `aria-label` replaces the button label.
      <Button
        title={labelString}
        className={clsx(classes[size], className)}
        aria-label={labelString}
        size={size}
        {...props}
        ref={ref}
        icon={(iconProps) => {
          if (Icon) {
            return <Icon {...iconProps} />;
          }
          const child = Children.only(children)!;
          return cloneElement(child, iconProps);
        }}
      />
    );
  },
);

IconButton.displayName = 'IconButton';
