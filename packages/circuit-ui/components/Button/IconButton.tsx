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

import type { IconComponentType } from '@sumup-oss/icons';

import { clsx } from '../../styles/clsx.js';
import { CircuitError } from '../../util/errors.js';
import { deprecate } from '../../util/logger.js';

import {
  createButtonComponent,
  legacyButtonSizeMap,
  type SharedButtonProps,
} from './base.js';
import classes from './IconButton.module.css';

export type IconButtonProps = SharedButtonProps & {
  /**
   * Communicates the action that will be performed when the user interacts
   * with the button. Use one strong, clear imperative verb and follow with a
   * one-word object if needed to clarify.
   * Displayed on hover and accessible to screen readers.
   */
  children: string;
  /**
   * The icon provides context for the button, such as a “search” icon for a
   * search field submission.
   */
  icon: IconComponentType;
};

/**
 * The IconButton component enables the user to perform an action or navigate
 * to a different screen.
 */
export const IconButton = createButtonComponent<IconButtonProps>(
  'IconButton',
  ({ className, size: legacySize = 'm', ...props }) => {
    const size = legacyButtonSizeMap[legacySize] || legacySize;

    if (process.env.NODE_ENV !== 'production' && !props.icon) {
      throw new CircuitError('IconButton', 'The `icon` prop is missing.');
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
      size,
      title: props.children,
      'aria-label': props.children,
      ...props,
    };
  },
);
