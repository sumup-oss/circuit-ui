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

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  type ChangeEventHandler,
  type ClipboardEventHandler,
} from 'react';

import { classes as inputClasses } from '../Input/index.js';
import type { InputProps } from '../Input/index.js';
import { clsx } from '../../styles/clsx.js';
import {
  FieldLabelText,
  FieldLegend,
  FieldSet,
  FieldValidationHint,
} from '../Field/index.js';
import { applyMultipleRefs } from '../../util/refs.js';
import { changeInputValue } from '../../util/input-value.js';
import { idx } from '../../util/idx.js';

import classes from './ColorInput.module.css';
import {
  isSameColor,
  isValidColor,
  normalizeColor,
} from './ColorInputService.js';

export interface ColorInputProps
  extends Omit<
    InputProps,
    | 'ref'
    | 'type'
    | 'defaultValue'
    | 'value'
    | 'placeholder'
    | 'maxLength'
    | 'pattern'
    | 'renderPrefix'
    | 'as'
    | 'textAlign'
    | 'renderSuffix'
  > {
  /**
   * A short string that is shown inside the empty input.
   */
  placeholder?: string;
  /**
   * The value of the input element.
   */
  value?: string;
  /**
   * The default value of the input element.
   */
  defaultValue?: string;
}

export const ColorInput = forwardRef<HTMLInputElement, ColorInputProps>(
  (
    {
      'aria-describedby': descriptionId,
      className,
      defaultValue,
      disabled,
      hasWarning,
      showValid,
      hideLabel,
      invalid,
      label,
      onChange,
      optionalLabel,
      validationHint,
      placeholder,
      readOnly,
      required,
      inputClassName,
      style,
      value,
      ...props
    },
    ref,
  ) => {
    const colorPickerRef = useRef<HTMLInputElement>(null);
    const colorInputRef = useRef<HTMLInputElement>(null);

    const labelId = useId();
    const pickerId = useId();
    const validationHintId = useId();

    const descriptionIds = idx(
      descriptionId,
      validationHint && validationHintId,
    );

    const updatePickerValue = useCallback((color: string) => {
      if (!colorPickerRef.current || !isValidColor(color)) {
        return;
      }

      changeInputValue(colorPickerRef.current, normalizeColor(color));
    }, []);

    const updateInputValue = useCallback((color?: string) => {
      if (!colorInputRef.current || !color) {
        return;
      }

      const currentColor = colorInputRef.current.value;

      if (!isSameColor(currentColor, color)) {
        changeInputValue(colorInputRef.current, color.trim().replace('#', ''));
      }
    }, []);

    useEffect(() => {
      updateInputValue(value);
    }, [updateInputValue, value]);

    const handlePaste: ClipboardEventHandler<HTMLInputElement> = (event) => {
      if (!colorPickerRef.current || !colorInputRef.current || readOnly) {
        return;
      }

      const pastedText = event.clipboardData.getData('text/plain').trim();

      if (!pastedText || !isValidColor(pastedText)) {
        return;
      }

      event.preventDefault();

      updatePickerValue(pastedText);
      updateInputValue(pastedText);
    };

    const onPickerChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      onChange?.(event);
      updateInputValue(event.target.value);
    };

    const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      updatePickerValue(event.target.value);
    };

    return (
      <FieldSet className={className} style={style} disabled={disabled}>
        <FieldLegend id={labelId}>
          <FieldLabelText
            label={label}
            hideLabel={hideLabel}
            optionalLabel={optionalLabel}
            required={required}
          />
        </FieldLegend>
        <div className={classes.wrapper}>
          <label
            htmlFor={pickerId}
            className={classes.picker}
            data-disabled={disabled || readOnly}
          >
            <input
              id={pickerId}
              ref={applyMultipleRefs(colorPickerRef, ref)}
              type="color"
              aria-labelledby={labelId}
              aria-describedby={descriptionIds}
              aria-invalid={invalid ? 'true' : undefined}
              className={classes['color-input']}
              onChange={onPickerChange}
              disabled={disabled || readOnly}
              required={required}
              defaultValue={defaultValue && normalizeColor(defaultValue)}
              value={value && normalizeColor(value)}
              {...props}
            />
          </label>
          <span className={classes.symbol}>#</span>
          <input
            ref={colorInputRef}
            type="text"
            aria-labelledby={labelId}
            aria-describedby={descriptionIds}
            className={clsx(
              inputClasses.base,
              !disabled && hasWarning && inputClasses.warning,
              classes.input,
              inputClassName,
            )}
            aria-invalid={invalid ? 'true' : undefined}
            required={required}
            maxLength={6}
            pattern="[0-9a-f]{3,6}"
            readOnly={readOnly}
            disabled={disabled}
            defaultValue={(defaultValue || value)?.replace('#', '')}
            placeholder={placeholder?.replace('#', '')}
            onChange={onInputChange}
            onPaste={handlePaste}
          />
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
    );
  },
);

ColorInput.displayName = 'ColorInput';
