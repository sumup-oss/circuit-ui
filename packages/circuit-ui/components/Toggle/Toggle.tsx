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

import { ButtonHTMLAttributes, forwardRef, useId } from 'react';

import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { FieldDescription, FieldWrapper } from '../Field/index.js';
import { clsx } from '../../styles/clsx.js';
import utilityClasses from '../../styles/utility.js';

import classes from './Toggle.module.css';

export interface ToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Describes the function of the toggle. Should not change depending on the state.
   */
  label: string;
  /**
   * Further explanation of the toggle. Can change depending on the state.
   */
  description?: string;
  /**
   * Is the Switch on?
   */
  checked?: boolean;
  /**
   * Label for the 'on' state. Important for accessibility.
   */
  checkedLabel: string;
  /**
   * Label for the 'off' state. Important for accessibility.
   */
  uncheckedLabel: string;
}

/**
 * A toggle component with support for labels and additional explanations.
 */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      label,
      description,
      'aria-describedby': describedBy,
      checkedLabel,
      uncheckedLabel,
      checked = false,
      onChange,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test'
    ) {
      if (!isSufficientlyLabelled(label)) {
        throw new AccessibilityError(
          'Toggle',
          'The `label` prop is missing or invalid.',
        );
      }

      if (!isSufficientlyLabelled(checkedLabel)) {
        throw new AccessibilityError(
          'Toggle',
          'The `checkedLabel` prop is missing or invalid.',
        );
      }
      if (!isSufficientlyLabelled(uncheckedLabel)) {
        throw new AccessibilityError(
          'Toggle',
          'The `checkedLabel` prop is missing or invalid.',
        );
      }
    }

    const switchId = useId();
    const labelId = useId();
    const descriptionId = useId();

    const descriptionIds = [describedBy, description && descriptionId]
      .filter(Boolean)
      .join(' ');

    return (
      <FieldWrapper
        disabled={props.disabled}
        className={clsx(classes.wrapper, className)}
        style={style}
      >
        <button
          type="button"
          onClick={onChange}
          role="switch"
          aria-checked={checked}
          aria-labelledby={labelId}
          aria-describedby={descriptionIds}
          id={switchId}
          className={clsx(classes.track, utilityClasses.focusVisible)}
          {...props}
          ref={ref}
        >
          <span className={classes.knob} />
          <span className={utilityClasses.hideVisually}>
            {checked ? checkedLabel : uncheckedLabel}
          </span>
        </button>
        <label className={classes.label} id={labelId} htmlFor={switchId}>
          {label}
          {description && (
            <FieldDescription aria-hidden="true">
              {description}
            </FieldDescription>
          )}
        </label>
        {description && (
          <p id={descriptionId} className={utilityClasses.hideVisually}>
            {description}
          </p>
        )}
      </FieldWrapper>
    );
  },
);

Toggle.displayName = 'Toggle';
