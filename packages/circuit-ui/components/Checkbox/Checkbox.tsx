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

import { forwardRef, useId } from 'react';

import { FieldValidationHint, FieldWrapper } from '../Field/index.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { clsx } from '../../styles/clsx.js';

import { CheckboxInput, type CheckboxInputProps } from './CheckboxInput.js';
import classes from './Checkbox.module.css';

export interface CheckboxProps extends Omit<CheckboxInputProps, 'align'> {
  /**
   * A clear and concise description of the input's purpose.
   */
  label: string;
  /**
   * An information or error message, displayed below the checkbox.
   */
  validationHint?: string;
  /**
   * Label to indicate that the checkbox is optional.
   */
  optionalLabel?: string;
  children?: never;
}

/**
 * Checkbox component for forms.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      disabled,
      validationHint,
      optionalLabel,
      className,
      style,
      invalid,
      indeterminate = false,
      'aria-describedby': descriptionId,
      children,
      ...props
    },
    ref,
  ) => {
    const validationHintId = useId();
    const descriptionIds = clsx(descriptionId, validationHintId) || undefined;

    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !isSufficientlyLabelled(label)
    ) {
      throw new AccessibilityError(
        'Checkbox',
        'The `label` prop is missing or invalid.',
      );
    }

    return (
      <FieldWrapper className={className} style={style} disabled={disabled}>
        <CheckboxInput
          {...props}
          ref={ref}
          aria-describedby={descriptionIds}
          invalid={invalid}
          disabled={disabled}
          indeterminate={indeterminate}
          align="start"
        >
          <span className={classes['label-text']}>
            {label || children}
            {optionalLabel ? (
              <span className={classes.optional}>{` (${optionalLabel})`}</span>
            ) : null}
          </span>
        </CheckboxInput>
        <FieldValidationHint
          id={validationHintId}
          disabled={disabled}
          invalid={invalid}
          validationHint={validationHint}
        />
      </FieldWrapper>
    );
  },
);

Checkbox.displayName = 'Checkbox';
