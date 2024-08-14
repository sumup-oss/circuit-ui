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

import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  type InputHTMLAttributes,
} from 'react';
import { Checkmark } from '@sumup-oss/icons';

import { FieldValidationHint, FieldWrapper } from '../Field/index.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { applyMultipleRefs } from '../../util/refs.js';
import { clsx } from '../../styles/clsx.js';
import { utilClasses } from '../../styles/utility.js';

import { IndeterminateIcon } from './IndeterminateIcon.js';
import classes from './Checkbox.module.css';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * A clear and concise description of the input's purpose.
   */
  label: string;
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
      value,
      'id': customId,
      name,
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
    passedRef,
  ) => {
    const localRef = useRef<HTMLInputElement>(null);

    // biome-ignore lint/correctness/useExhaustiveDependencies: Because it came from the props, we keep the `indeterminate` state even if the `checked` one is changed.
    useEffect(() => {
      if (localRef.current) {
        localRef.current.indeterminate = indeterminate;
      }
    }, [props.checked, indeterminate]);

    const id = useId();
    const checkboxId = customId || id;
    const validationHintId = useId();
    const descriptionIds = `${
      descriptionId ? `${descriptionId} ` : ''
    }${validationHintId}`;

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
        <input
          {...props}
          id={checkboxId}
          name={name}
          value={value}
          type="checkbox"
          disabled={disabled}
          ref={applyMultipleRefs(passedRef, localRef)}
          aria-describedby={descriptionIds}
          aria-checked={indeterminate ? 'mixed' : undefined}
          className={clsx(
            classes.base,
            invalid && classes.invalid,
            utilClasses.hideVisually,
          )}
        />
        <label htmlFor={checkboxId} className={classes.label}>
          <span className={classes['label-text']}>
            {label || children}
            {optionalLabel ? (
              <span className={classes.optional}>{` (${optionalLabel})`}</span>
            ) : null}
          </span>
          <Checkmark aria-hidden="true" data-symbol="checked" />
          <IndeterminateIcon aria-hidden="true" data-symbol="indeterminate" />
        </label>
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
