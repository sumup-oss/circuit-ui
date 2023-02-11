/**
 * Copyright 2021, SumUp Ltd.
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

import { forwardRef, useMemo } from 'react';
import { formatDateTimeToParts } from '@sumup/intl';

import { InputProps } from '../Input/Input.js';
import {
  FieldLabel,
  FieldLabelText,
  FieldValidationHint,
  FieldWrapper,
} from '../Field/index.js';
import { uniqueId } from '../../util/id.js';

import styles from './DateInput.module.css';

export interface DateInputProps
  extends Omit<
    InputProps,
    'type' | 'value' | 'defaultValue' | 'placeholder' | 'as'
  > {
  /**
   * The value of the input element.
   */
  value?: string;
  /**
   * The default value of the input element.
   */
  defaultValue?: string | number;
}

// const InputWrapper = styled('div')<
//   Pick<DateInputProps, 'invalid' | 'hasWarning' | 'disabled'>
// >(inputOutline, inputWrapperStyles);

// const SegmentInput = styled('input')<DateSegmentProps>(
//   typography('one'),
//   segmentInputStyles,
// );

interface DateSegmentProps {
  min: number;
  max: number;
  placeholder: string;
}

function DateSegment(props: DateSegmentProps) {
  return (
    <input
      className={styles.segment}
      style={{
        width: `calc(${props.placeholder.length}ch + var(--cui-spacings-kilo))`,
      }}
      type="number"
      spellCheck="false"
      autoCapitalize="none"
      autoCorrect="off"
      enterKeyHint="next"
      inputMode="numeric"
      step="1"
      {...props}
    />
  );
}

// TODO:
// Focus management
// Input labels
// Input sizing
// Validation
// Interactive styles
// State and change handlers

/**
 * DateInput component for forms.
 * The input value is always a string in the format `YYYY-MM-DD`.
 */
export const DateInput = forwardRef(
  ({
    label,
    hideLabel,
    optionalLabel,
    required,
    className,
    style,
    disabled,
    validationHint,
    'aria-describedby': descriptionId,
    hasWarning,
    invalid,
    showValid,
  }: Omit<DateInputProps, 'ref'>) => {
    const locale = 'en-GB';

    const id = uniqueId('input_');
    const validationHintId = uniqueId('validation-hint_');
    const descriptionIds = `${
      descriptionId ? `${descriptionId} ` : ''
    }${validationHintId}`;

    const parts = useMemo(
      () =>
        formatDateTimeToParts(new Date(), locale, {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }) as {
          type: 'year' | 'month' | 'day' | 'literal';
          value: string;
        }[],
      [locale],
    );

    const segments = {
      year: () => <DateSegment placeholder="yyyy" min={0} max={4000} />,
      month: () => <DateSegment placeholder="mm" min={1} max={12} />,
      day: () => <DateSegment placeholder="dd" min={1} max={31} />,
      literal: ({ value }: Intl.DateTimeFormatPart) => <span>{value}</span>,
    };

    return (
      <FieldWrapper className={className} style={style} disabled={disabled}>
        <FieldLabel htmlFor={id}>
          <FieldLabelText
            label={label}
            hideLabel={hideLabel}
            optionalLabel={optionalLabel}
            required={required}
          />
        </FieldLabel>
        <div
          className={styles.wrapper}
          // disabled={disabled}
          // invalid={invalid}
          // hasWarning={hasWarning}
        >
          {parts.map((part, index) => {
            const Segment = segments[part.type];
            return (
              <Segment
                key={index}
                {...part}
                aria-labelledby={id}
                aria-describedby={descriptionIds}
              />
            );
          })}
        </div>
        <FieldValidationHint
          id={validationHintId}
          disabled={disabled}
          invalid={invalid}
          hasWarning={hasWarning}
          showValid={showValid}
          validationHint={validationHint}
        />
      </FieldWrapper>
    );
  },
);

DateInput.displayName = 'DateInput';
