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

import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';

import type { ClickEvent } from '../../../../types/events.js';
import { CloseButton } from '../../../CloseButton/index.js';
import { isArray } from '../../../../util/type-check.js';
import { clsx } from '../../../../styles/clsx.js';

import classes from './Header.module.css';

type CloseProps =
  | {
      /**
       * Callback for the close button. If not specified, the button won't
       * be shown.
       */
      onClose?: (event: ClickEvent) => void;
      /**
       * Text label for the close button for screen readers.
       * Important for accessibility.
       */
      closeButtonLabel?: string;
    }
  | { onClose?: never; closeButtonLabel?: never };

export type CardHeaderProps = {
  /**
   * Headline to be shown.
   */
  children?: ReactNode;
} & CloseProps &
  HTMLAttributes<HTMLElement>;

/**
 * Header used in the Card component. Used for styling and alignment
 * purposes only.
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ onClose, children, closeButtonLabel, className, ...props }, ref) => {
    const noHeadline = isArray(children) && !children[0];
    return (
      <div
        className={clsx(
          classes.base,
          noHeadline && classes['no-headline'],
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
        {onClose && (
          <CloseButton className={classes.close} onClick={onClose}>
            {closeButtonLabel}
          </CloseButton>
        )}
      </div>
    );
  },
);
