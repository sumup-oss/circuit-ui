/**
 * Copyright 2024, SumUp Ltd.
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

import { forwardRef, type InputHTMLAttributes } from 'react';

import type { Locale } from '../../util/i18n.js';
import { CircuitError } from '../../util/errors.js';
import { Input, type InputProps } from '../Input/index.js';
import classes from './TimeInput.module.css';

export interface TimeInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    Pick<
      InputProps,
      | 'label'
      | 'hideLabel'
      | 'invalid'
      | 'hasWarning'
      | 'showValid'
      | 'required'
      | 'disabled'
      | 'readOnly'
      | 'validationHint'
      | 'optionalLabel'
    > {
  /**
   * The currently selected time in the `HH:mm` or `HH:mm:ss` format,
   * with leading zeros and using a 24-hour clock regardless of the locale.
   */
  value?: string;
  /**
   * The initially selected time in the `HH:mm` or `HH:mm:ss` format,
   * with leading zeros and using a 24-hour clock regardless of the locale.
   */
  defaultValue?: string;
  /**
   * One or more [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag)
   * locale identifiers such as `'de-DE'` or `['GB', 'en-US']`.
   * When passing an array, the first supported locale is used.
   * Defaults to `navigator.language` in supported environments.
   */
  locale?: Locale;
  /**
   * The minimum selectable time in the `HH:mm` or `HH:mm:ss` format,
   * with leading zeros and using a 24-hour clock regardless of the locale.
   */
  min?: string;
  /**
   * The maximum selectable time in the `HH:mm` or `HH:mm:ss` format,
   * with leading zeros and using a 24-hour clock regardless of the locale.
   */
  max?: string;
  /**
   * Restrict the times a user is allowed to enter in intervals relative to
   * the minimum time. The step value is in seconds. Using a value that is
   * not divisible by 60 enables the user to add seconds to the time.
   *
   * @default 60
   */
  step?: number;
}

/**
 * The TimeInput component allows users to type or select a specific time.
 * The input value is always a string in the `HH:mm` or `HH:mm:ss` format.
 */
export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  (props, ref) => {
    if (process.env.NODE_ENV !== 'production') {
      const TIME_REGEX = /^\d{2}:\d{2}(?::\d{2})?$/;

      if (props.min && !TIME_REGEX.test(props.min)) {
        throw new CircuitError(
          'TimeInput',
          'The `min` prop must be in the format `HH:mm` or `HH:mm:ss`.',
        );
      }

      if (props.max && !TIME_REGEX.test(props.max)) {
        throw new CircuitError(
          'TimeInput',
          'The `max` prop must be in the format `HH:mm` or `HH:mm:ss`.',
        );
      }
    }

    return (
      <Input {...props} ref={ref} type="time" inputClassName={classes.base} />
    );
  },
);

TimeInput.displayName = 'TimeInput';
