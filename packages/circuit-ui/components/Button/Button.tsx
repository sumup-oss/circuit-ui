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

import type {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
} from 'react';
import type { IconComponentType } from '@sumup-oss/icons';

import { CircuitError } from '../../util/errors';
import { clsx } from '../../styles/clsx';
import { deprecate } from '../../util/logger';

import classes from './Button.module.css';
import {
  createButtonComponent,
  legacyButtonSizeMap,
  type SharedButtonProps,
} from './base';

export type ButtonProps = SharedButtonProps & {
  /**
   * Communicates the action that will be performed when the user interacts
   * with the button. Use one strong, clear imperative verb and follow with a
   * one-word object if needed to clarify.
   */
  children: ReactNode;
  /**
   * Stretch the button across the full width of its parent.
   */
  stretch?: boolean;
  /**
   * An icon provides additional context for the button, such as a “search”
   * icon next to the label for a search field submission.
   */
  icon?: IconComponentType;
  /**
   * A navigation icon hints that the button will perform an unexpected action,
   * such as opening a dropdown or navigating the user to a new tab, so make
   * sure you use them only when necessary. Navigation icons are not an
   * alternative to leading icons and should not be used to provide additional
   * context for the button.
   */
  navigationIcon?: IconComponentType;
};

/**
 * The Button component enables the user to perform an action or navigate
 * to a different screen.
 */
export const Button: ForwardRefExoticComponent<
  PropsWithoutRef<ButtonProps> & RefAttributes<any>
> = createButtonComponent<ButtonProps>(
  'Button',
  ({ className, size: legacySize = 'm', stretch, variant, ...props }) => {
    const size = legacyButtonSizeMap[legacySize] || legacySize;

    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      props.icon &&
      props.navigationIcon
    ) {
      throw new CircuitError(
        'Button',
        'The leading and trailing icons cannot be used at the same time. Remove either the `icon` or the `navigationIcon` prop.',
      );
    }

    if (
      process.env.NODE_ENV !== 'production' &&
      legacyButtonSizeMap[legacySize]
    ) {
      deprecate(
        'Button',
        `The \`${legacySize}\` size has been deprecated. Use the \`${legacyButtonSizeMap[legacySize]}\` size instead.`,
      );
    }

    return {
      className: clsx(
        className,
        classes[size],
        stretch && classes.stretch,
        variant === 'tertiary' && classes.tertiary,
      ),
      variant,
      size,
      ...props,
    };
  },
);
