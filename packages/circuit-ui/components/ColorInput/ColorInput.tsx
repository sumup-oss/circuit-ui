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

import classes from './ColorInput.module.css';

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
      id,
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

    const descriptionIds = clsx(validationHintId, descriptionId);

    const handlePaste: ClipboardEventHandler<HTMLInputElement> = (event) => {
      if (!colorPickerRef.current || !colorInputRef.current || readOnly) {
        return;
      }

      event.preventDefault();

      const pastedText = event.clipboardData.getData('text/plain').trim();

      if (!pastedText || !/^#?[0-9A-F]{6}$/i.test(pastedText)) {
        return;
      }

      const pastedColor = pastedText.startsWith('#')
        ? pastedText
        : `#${pastedText}`;

      colorPickerRef.current.value = pastedColor;
      colorPickerRef.current.dispatchEvent(
        new Event('change', { bubbles: true }),
      );

      changeInputValue(colorInputRef.current, pastedColor.replace('#', ''));
    };

    const onPickerColorChange: ChangeEventHandler<HTMLInputElement> = (
      event,
    ) => {
      if (colorInputRef.current) {
        colorInputRef.current.value = event.target.value.replace('#', '');
      }
      if (onChange) {
        onChange(event);
      }
    };

    const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      if (colorPickerRef.current) {
        colorPickerRef.current.value = `#${event.target.value}`;
      }
      if (onChange) {
        onChange({
          ...event,
          target: {
            ...event.target,
            value: `#${event.target.value}`,
          },
        });
      }
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
              className={classes['color-input']}
              onChange={onPickerColorChange}
              disabled={disabled || readOnly}
              defaultValue={defaultValue}
              value={value}
            />
          </label>
          <span className={classes.symbol}>#</span>
          <input
            id={id}
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
            aria-invalid={invalid && 'true'}
            required={required}
            maxLength={6}
            pattern="[0-9a-f]{3,6}"
            readOnly={readOnly}
            disabled={disabled}
            value={value?.replace('#', '')}
            defaultValue={defaultValue?.replace('#', '')}
            placeholder={placeholder?.replace('#', '')}
            onChange={onInputChange}
            onPaste={handlePaste}
            {...props}
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
