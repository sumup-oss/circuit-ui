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

import utilityClasses from '../../styles/utility.js';
import { clsx } from '../../styles/clsx.js';
import { Button, ButtonProps } from '../Button/Button.js';
import { AccessibilityError } from '../../util/errors.js';

import classes from './IconButton.module.css';

export interface IconButtonProps extends Omit<ButtonProps, 'icon' | 'stretch'> {
  /**
   * A single icon element.
   */
  children: ReactElement<IconProps>;
  /**
   * Short label to describe the function of the button. Displayed as title
   * on hover, and accessible to screen readers.
   */
  label: string;
}

/**
 * The IconButton component displays a button with a single icon
 * as its only child.
 */
export const IconButton = forwardRef<any, IconButtonProps>(
  ({ children, label, size = 'giga', className, ...props }, ref) => {
    const child = Children.only(children);
    const iconSize = size === 'kilo' ? '16' : '24';
    const icon = cloneElement(child, {
      'aria-hidden': 'true',
      'size': (child.props.size as string) || iconSize,
    });

    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !label
    ) {
      throw new AccessibilityError(
        'IconButton',
        'The `label` prop is missing.',
      );
    }

    return (
      <Button
        title={label}
        className={clsx(classes[size], className)}
        size={size}
        {...props}
        ref={ref}
      >
        {icon}
        <span className={utilityClasses.hideVisually}>{label}</span>
      </Button>
    );
  },
);

IconButton.displayName = 'IconButton';
