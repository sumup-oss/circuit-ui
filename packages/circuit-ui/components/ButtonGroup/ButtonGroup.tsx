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

import {
  Button,
  legacyButtonSizeMap,
  type ButtonProps,
} from '../Button/index.js';
import { clsx } from '../../styles/clsx.js';
import { deprecate } from '../../util/logger.js';

import styles from './ButtonGroup.module.css';

type Action = Omit<ButtonProps, 'variant' | 'size'> & {
  /**
   * @deprecated
   */
  size?: ButtonProps['size'];
};

export interface ButtonGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'align'> {
  /**
   * The buttons to group. Expects a primary and optionally a secondary button.
   */
  actions: {
    primary: Action;
    secondary?: Action;
  };
  /**
   * Direction to align the buttons. Defaults to `center`.
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Choose from 2 sizes. Default: 'm'.
   */
  size?: ButtonProps['size'];
}

/**
 * The ButtonGroup component groups and formats two buttons.
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      actions,
      className,
      align = 'center',
      size: legacySize = 'm',
      ...props
    }: ButtonGroupProps,
    ref,
  ) => {
    if (process.env.NODE_ENV !== 'production') {
      if (actions.primary.size) {
        deprecate(
          'ButtonGroup',
          'The `actions.primary.size` prop has been deprecated. Use the top-level `size` prop instead.',
        );
      }
      if (actions.secondary?.size) {
        deprecate(
          'ButtonGroup',
          'The `actions.secondary.size` prop has been deprecated. Use the top-level `size` prop instead.',
        );
      }
    }

    const size = legacyButtonSizeMap[legacySize] || legacySize;

    return (
      <div {...props} className={clsx(styles.container, className)} ref={ref}>
        <div className={clsx(styles.base, styles[align], styles[size])}>
          <Button
            {...actions.primary}
            size={size || actions.primary.size}
            variant="primary"
          />
          {actions.secondary && (
            <Button
              {...actions.secondary}
              size={size || actions.secondary.size}
              variant="secondary"
            />
          )}
        </div>
      </div>
    );
  },
);

ButtonGroup.displayName = 'ButtonGroup';
