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

import { Children, cloneElement, type ReactElement } from 'react';
import type { IconComponentType, IconProps } from '@sumup/icons';

import { clsx } from '../../styles/clsx.js';
import { CircuitError } from '../../util/errors.js';
import { deprecate } from '../../util/logger.js';
import { isString } from '../../util/type-check.js';

import {
  createButtonComponent,
  legacyButtonSizeMap,
  type SharedButtonProps,
} from './shared.js';
import classes from './IconButton.module.css';

export type IconButtonProps = SharedButtonProps & {
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
  /**
   * The icon provides context for the button, such as a “search” icon for a
   * search field submission.
   */
  icon?: IconComponentType;
};

/**
 * The IconButton component enables the user to perform an action or navigate
 * to a different screen.
 */
export const IconButton = createButtonComponent<IconButtonProps>(
  'IconButton',
  ({
    className,
    icon: Icon,
    label,
    children,
    size: legacySize = 'm',
    ...props
  }) => {
    const size = legacyButtonSizeMap[legacySize] || legacySize;

    if (
      process.env.NODE_ENV !== 'production' &&
      !Icon &&
      Children.count(children) !== 1
    ) {
      throw new CircuitError('IconButton', 'The `icon` prop is missing.');
    }

    if (process.env.NODE_ENV !== 'production' && !isString(children)) {
      deprecate(
        'IconButton',
        'The `children` prop has been deprecated for passing the icon. Use the `icon` prop instead.',
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
        `The \`${legacySize}\` size has been deprecated. Use the \`${legacyButtonSizeMap[legacySize]}\` size instead.`,
      );
    }

    return {
      className: clsx(classes.base, classes[size], className),
      icon: (iconProps) => {
        if (Icon) {
          return <Icon {...iconProps} />;
        }
        const child = Children.only(children)!;
        // TODO: Remove with the next major
        if (isString(child)) {
          return null;
        }
        return cloneElement(child, iconProps);
      },
      size,
      children: isString(children) ? children : label,
      title: isString(children) ? children : label,
      ...props,
    };
  },
);
