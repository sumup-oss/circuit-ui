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

import { InputHTMLAttributes, forwardRef, useId } from 'react';

import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { FieldWrapper, FieldDescription } from '../Field/index.js';
import { clsx } from '../../styles/clsx.js';
import utilityClasses from '../../styles/utility.js';

import classes from './RadioButton.module.css';

export interface RadioButtonProps
  extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * A clear and concise description of the option's purpose.
   */
  label: string;
  /**
   * Further details about the option's purpose.
   */
  description?: string;
  children?: never;
}

/**
 * @private
 */
export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      label,
      description,
      'aria-describedby': describedBy,
      'id': customId,
      name,
      value,
      checked,
      disabled,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !isSufficientlyLabelled(label)
    ) {
      throw new AccessibilityError(
        'RadioButton',
        'The `label` prop is missing or invalid.',
      );
    }
    const id = useId();
    const inputId = customId || id;
    const descriptionId = useId();

    const descriptionIds = [describedBy, description && descriptionId]
      .filter(Boolean)
      .join(' ');

    return (
      <FieldWrapper className={className} style={style} disabled={disabled}>
        <input
          {...props}
          type="radio"
          name={name}
          id={inputId}
          value={value}
          disabled={disabled}
          checked={checked}
          ref={ref}
          className={clsx(classes.base, utilityClasses.hideVisually)}
        />
        <label
          htmlFor={inputId}
          className={classes.label}
          style={style}
          aria-describedby={descriptionIds}
        >
          {label}
          {description && (
            <FieldDescription aria-hidden="true">
              {description}
            </FieldDescription>
          )}
        </label>
        {description && (
          <p id={descriptionIds} className={utilityClasses.hideVisually}>
            {description}
          </p>
        )}
      </FieldWrapper>
    );
  },
);

RadioButton.displayName = 'RadioButton';
