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

import { forwardRef, useId, type InputHTMLAttributes } from 'react';

import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { FieldWrapper, FieldDescription } from '../Field/index.js';
import { clsx } from '../../styles/clsx.js';
import { utilClasses } from '../../styles/utility.js';
import { deprecate } from '../../util/logger.js';
import { RadioButtonInput } from '../RadioButtonGroup/RadioButtonInput.js';

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
 * @deprecated Use the {@link RadioButtonGroup} component instead.
 */
export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      label,
      description,
      disabled,
      'aria-describedby': describedBy,
      'id': customId,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    if (process.env.NODE_ENV !== 'production') {
      deprecate(
        'RadioButton',
        'The RadioButton component has been deprecated. Use the RadioButtonGroup or RadioButtonInput components instead.',
      );
    }
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

    const descriptionIds = clsx(describedBy, description && descriptionId);

    return (
      <FieldWrapper className={className} style={style} disabled={disabled}>
        <RadioButtonInput
          {...props}
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-describedby={descriptionIds}
        >
          {label}
          {description && (
            <FieldDescription aria-hidden="true">
              {description}
            </FieldDescription>
          )}
        </RadioButtonInput>
        {description && (
          <p id={descriptionId} className={utilClasses.hideVisually}>
            {description}
          </p>
        )}
      </FieldWrapper>
    );
  },
);

RadioButton.displayName = 'RadioButton';
