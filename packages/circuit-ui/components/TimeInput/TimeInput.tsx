/**
 * Copyright 2026, SumUp Ltd.
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

import { forwardRef, useId, useRef, type InputHTMLAttributes } from 'react';

import type { ClickEvent } from '../../types/events.js';
import { clsx } from '../../styles/clsx.js';
import { toPlainTime } from '../../util/date.js';
import { CircuitError } from '../../util/errors.js';
import type { Locale } from '../../util/i18n.js';
import { idx } from '../../util/idx.js';
import { changeInputValue } from '../../util/input-value.js';
import { applyMultipleRefs } from '../../util/refs.js';
import {
  FieldLabelText,
  FieldLegend,
  FieldSet,
  FieldValidationHint,
  FieldWrapper,
} from '../Field/index.js';
import type { InputProps } from '../Input/index.js';
import { useSegmentFocus } from '../DateInput/hooks/useSegmentFocus.js';
import { DateSegment } from '../DateInput/components/DateSegment.js';

import { usePlainTimeState } from './hooks/usePlainTimeState.js';
import { getTimeSegments } from './TimeInputService.js';
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
   * Visually hidden label for the hour input.
   */
  hourInputLabel?: string;
  /**
   * Visually hidden label for the minute input.
   */
  minuteInputLabel?: string;
  /**
   * Visually hidden label for the second input.
   */
  secondInputLabel?: string;
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
  (
    {
      label,
      optionalLabel,
      hideLabel,
      value,
      defaultValue,
      min,
      max,
      step = 60,
      locale,
      // TODO: Add default translations
      hourInputLabel,
      minuteInputLabel,
      secondInputLabel,
      required,
      readOnly,
      disabled,
      invalid,
      hasWarning,
      showValid,
      validationHint,
      'aria-describedby': descriptionId,
      autoComplete,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const validationHintId = useId();

    const descriptionIds = idx(
      descriptionId,
      validationHint && validationHintId,
    );

    const minTime = toPlainTime(min);
    const maxTime = toPlainTime(max);

    const handleChange = (newValue: string) => {
      changeInputValue(inputRef.current, newValue);
    };

    const focus = useSegmentFocus();
    const state = usePlainTimeState({
      value,
      defaultValue,
      onChange: handleChange,
      minTime,
      maxTime,
      step,
    });

    // Focus the first date segment when clicking anywhere on the field...
    const handleClick = (event: ClickEvent) => {
      const element = event.target as HTMLElement;
      // ...except when clicking on a specific segment input.
      if (element.getAttribute('role') === 'spinbutton') {
        return;
      }
      focus.next();
    };

    const includeSeconds = step % 60 !== 0;
    const segments = getTimeSegments(locale, includeSeconds);

    if (process.env.NODE_ENV !== 'production') {
      const TIME_REGEX = /^\d{2}:\d{2}(?::\d{2})?$/;

      if (min && !TIME_REGEX.test(min)) {
        throw new CircuitError(
          'TimeInput',
          'The `min` prop must be in the format `HH:mm` or `HH:mm:ss`.',
        );
      }

      if (max && !TIME_REGEX.test(max)) {
        throw new CircuitError(
          'TimeInput',
          'The `max` prop must be in the format `HH:mm` or `HH:mm:ss`.',
        );
      }
    }

    return (
      <FieldWrapper disabled={disabled} className={className} style={style}>
        <FieldSet aria-describedby={descriptionIds}>
          <FieldLegend onClick={handleClick}>
            <FieldLabelText
              label={label}
              hideLabel={hideLabel}
              required={required}
              optionalLabel={optionalLabel}
            />
          </FieldLegend>
          <div className={classes.wrapper}>
            <input
              type="date"
              ref={applyMultipleRefs(ref, inputRef)}
              className={classes.hidden}
              min={min}
              max={max}
              required={required}
              disabled={disabled}
              readOnly={readOnly}
              autoComplete={autoComplete}
              aria-invalid={invalid}
              aria-hidden="true"
              tabIndex={-1}
              value={value}
              defaultValue={defaultValue}
              {...rest}
            />
            {/** biome-ignore lint/a11y/noStaticElementInteractions: Progressive enhancement */}
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: This element isn't keyboard-focusable */}
            <div
              onClick={handleClick}
              className={clsx(
                classes.segments,
                invalid && classes.invalid,
                hasWarning && classes.warning,
                readOnly && classes.readonly,
              )}
            >
              {segments.map((segment, index) => {
                const segmentProps = {
                  required,
                  invalid,
                  disabled,
                  readOnly,
                  focus,
                  // Only the first segment should be associated with the validation hint to reduce verbosity.
                  'aria-describedby': index === 0 ? descriptionIds : undefined,
                };
                switch (segment.type) {
                  case 'hour':
                    return (
                      <DateSegment
                        key={segment.type}
                        aria-label={hourInputLabel}
                        autoComplete={
                          autoComplete === 'bday' ? 'bday-year' : undefined
                        }
                        {...segmentProps}
                        {...state.props.hour}
                      />
                    );
                  case 'minute':
                    return (
                      <DateSegment
                        key={segment.type}
                        aria-label={minuteInputLabel}
                        autoComplete={
                          autoComplete === 'bday' ? 'bday-month' : undefined
                        }
                        {...segmentProps}
                        {...state.props.minute}
                      />
                    );
                  case 'second':
                    return (
                      <DateSegment
                        key={segment.type}
                        aria-label={secondInputLabel}
                        autoComplete={
                          autoComplete === 'bday' ? 'bday-day' : undefined
                        }
                        {...segmentProps}
                        {...state.props.second}
                      />
                    );
                  case 'literal':
                    return (
                      <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: The order of the literals is static
                        key={segment.type + index}
                        className={classes.literal}
                        aria-hidden="true"
                      >
                        {segment.value}
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </div>
          <FieldValidationHint
            id={validationHintId}
            disabled={disabled}
            invalid={invalid}
            hasWarning={hasWarning}
            showValid={showValid}
            validationHint={validationHint}
          />
        </FieldSet>
      </FieldWrapper>
    );
  },
);

TimeInput.displayName = 'TimeInput';
