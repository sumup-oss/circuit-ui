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

import { useId, type Ref, type InputHTMLAttributes } from 'react';

import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { FieldDescription, FieldWrapper } from '../Field/index.js';
import { clsx } from '../../styles/clsx.js';
import { utilClasses } from '../../styles/utility.js';

import classes from './Toggle.module.css';

export interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
  /**
   * Describes the function of the toggle. Should not change depending on the state.
   */
  label: string;
  /**
   * Further explanation of the toggle. Can change depending on the state.
   */
  description?: string;
}

/**
 * A toggle component with support for labels and additional explanations.
 */
export function Toggle({
  label,
  description,
  'aria-describedby': describedBy,
  className,
  style,
  ref,
  ...props
}: ToggleProps) {
  const switchId = useId();
  const labelId = useId();
  const descriptionId = useId();

  const descriptionIds = [describedBy, description && descriptionId]
    .filter(Boolean)
    .join(' ');

  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test' &&
    !isSufficientlyLabelled(label)
  ) {
    throw new AccessibilityError(
      'Toggle',
      'The `label` prop is missing or invalid.',
    );
  }

  return (
    <FieldWrapper
      disabled={props.disabled}
      className={clsx(classes.wrapper, className)}
      style={style}
    >
      <span className={classes['track-wrapper']}>
        <input
          type="checkbox"
          // All browsers in our support matrix handle this correctly. See https://www.w3.org/WAI/ARIA/apg/patterns/switch/
          // biome-ignore lint/a11y/useAriaPropsForRole: <input type="checkbox"> natively maps its checked state to aria-checked for role="switch" per the HTML-AAM spec.
          role="switch"
          id={switchId}
          aria-labelledby={labelId}
          aria-describedby={descriptionIds || undefined}
          className={clsx(classes.track, utilClasses.focusVisible)}
          {...props}
          ref={ref}
        />
        <span className={classes.knob} aria-hidden="true" />
      </span>
      <label className={classes.label} id={labelId} htmlFor={switchId}>
        {label}
        {description && (
          <FieldDescription aria-hidden="true">{description}</FieldDescription>
        )}
      </label>
      {description && (
        <span id={descriptionId} className={utilClasses.hideVisually}>
          {description}
        </span>
      )}
    </FieldWrapper>
  );
}
