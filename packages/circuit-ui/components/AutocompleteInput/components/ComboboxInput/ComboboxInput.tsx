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

import { forwardRef, useId, useRef } from 'react';

import type { ReturnType } from '../../../../types/return-type.js';
import { idx } from '../../../../util/idx.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../../../util/errors.js';
import {
  FieldLabel,
  FieldLabelText,
  FieldValidationHint,
  FieldWrapper,
} from '../../../Field/index.js';
import { clsx } from '../../../../styles/clsx.js';
import type { InputProps } from '../../../Input/index.js';
import type { ClickEvent } from '../../../../types/events.js';
import type { Locale } from '../../../../util/i18n.js';
import { CloseButton } from '../../../CloseButton/index.js';
import { applyMultipleRefs } from '../../../../util/refs.js';

import classes from './ComboboxInput.module.css';

export interface ComboboxInputProps
  extends Omit<InputProps, 'renderPrefix' | 'renderSuffix' | 'as'> {
  /**
   * Callback function when the user clears the field.
   */
  onClear?: (event: ClickEvent) => void;
  /**
   * Visually hidden text label on the clear button for screen readers.
   * Crucial for accessibility.
   */
  clearLabel?: string;
  /**
   * One or more [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag)
   * locale identifiers such as `'de-DE'` or `['GB', 'en-US']`.
   * When passing an array, the first supported locale is used.
   * Defaults to `navigator.language` in supported environments.
   */
  locale?: Locale;
  'data-id'?: string;
}

export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>(
  (
    {
      value,
      validationHint,
      optionalLabel,
      required,
      invalid,
      hasWarning,
      showValid,
      disabled,
      textAlign,
      inputClassName,
      label,
      hideLabel,
      'id': customId,
      className,
      style,
      'aria-describedby': descriptionId,
      onClear,
      clearLabel,
      locale,
      'data-id': comboboxInputId,
      ...props
    },
    ref,
  ): ReturnType => {
    const id = useId();
    const inputId = customId || id;
    const localRef = useRef<HTMLInputElement>(null);

    const validationHintId = useId();
    const descriptionIds = idx(
      descriptionId,
      validationHint && validationHintId,
    );

    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      props.type !== 'hidden' &&
      !isSufficientlyLabelled(label)
    ) {
      throw new AccessibilityError(
        'AutocompleteInput',
        'The `label` prop is missing or invalid. Pass `hideLabel` if you intend to hide the label visually.',
      );
    }

    const onClick = (event: ClickEvent) => {
      onClear?.(event);
      localRef.current?.focus();
    };

    return (
      <FieldWrapper className={className} style={style} disabled={disabled}>
        <FieldLabel htmlFor={inputId}>
          <FieldLabelText
            label={label}
            hideLabel={hideLabel}
            optionalLabel={optionalLabel}
            required={required}
          />
        </FieldLabel>
        <div className={classes.wrapper}>
          <input
            id={inputId}
            value={value}
            data-id={comboboxInputId}
            defaultValue={value}
            ref={applyMultipleRefs(localRef, ref)}
            aria-describedby={descriptionIds}
            className={clsx(
              classes.base,
              !disabled && hasWarning && classes.warning,
              textAlign === 'right' && classes['align-right'],
              inputClassName,
            )}
            aria-invalid={invalid && 'true'}
            required={required}
            disabled={disabled}
            {...props}
          />
          {value && onClear && clearLabel && (
            <CloseButton className={classes.clear} size="s" onClick={onClick}>
              {clearLabel}
            </CloseButton>
          )}
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

ComboboxInput.displayName = 'ComboboxInput';
