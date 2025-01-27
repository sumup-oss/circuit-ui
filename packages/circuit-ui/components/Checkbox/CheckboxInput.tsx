/**
 * Copyright 2025, SumUp Ltd.
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

import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { Checkmark } from '@sumup-oss/icons';

import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { clsx } from '../../styles/clsx.js';
import { utilClasses } from '../../styles/utility.js';

import { IndeterminateIcon } from './IndeterminateIcon.js';
import classes from './CheckboxInput.module.css';

export interface CheckboxInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Marks the input as invalid.
   */
  invalid?: boolean;
  /**
   * Marks the input as indeterminate. This is presentational only, the value
   * of an indeterminate checkbox is not included in form submissions.
   */
  indeterminate?: boolean;
  /**
   * Alignment of the checkbox in relation to its label.
   * @default 'center'
   */
  align?: 'center' | 'start';
}

export const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
  (
    {
      id: customId,
      invalid,
      indeterminate,
      children,
      className,
      style,
      align = 'center',
      ...props
    },
    ref,
  ) => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !isSufficientlyLabelled(children, props)
    ) {
      throw new AccessibilityError(
        'CheckboxInput',
        'The input is missing a valid label.',
      );
    }

    const id = useId();
    const inputId = customId || id;

    return (
      <>
        <input
          {...props}
          ref={ref}
          id={inputId}
          type="checkbox"
          aria-checked={indeterminate ? 'mixed' : undefined}
          className={clsx(
            classes.base,
            invalid && classes.invalid,
            utilClasses.hideVisually,
          )}
        />
        <label
          htmlFor={inputId}
          className={clsx(className, classes.label, classes[align])}
          style={style}
        >
          {children}
          <Checkmark size="16" aria-hidden="true" data-symbol="checked" />
          <IndeterminateIcon aria-hidden="true" data-symbol="indeterminate" />
        </label>
      </>
    );
  },
);

CheckboxInput.displayName = 'CheckboxInput';
