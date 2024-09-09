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
  useState,
  type ChangeEventHandler,
} from 'react';

import { classes as inputClasses } from '../Input/index.js';
import type { InputElement, InputProps } from '../Input/index.js';
import { clsx } from '../../styles/clsx.js';
import {
  FieldLabelText,
  FieldLegend,
  FieldSet,
  FieldValidationHint,
} from '../Field/index.js';
import { applyMultipleRefs } from '../../util/refs.js';

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

export const ColorInput = forwardRef<InputElement, ColorInputProps>(
  (
    {
      'aria-describedby': descriptionId,
      'renderSuffix': RenderSuffix,
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
      readOnly,
      required,
      style,
      value,
      ...props
    },
    ref,
  ) => {
    const [currentColor, setCurrentColor] = useState<string | undefined>(
      defaultValue,
    );
    const colorPickerRef = useRef<InputElement>(null);

    const labelId = useId();
    const pickerId = useId();
    const validationHintId = useId();

    const descriptionIds = clsx(validationHintId, descriptionId);

    const suffix = RenderSuffix && (
      <RenderSuffix className={inputClasses.suffix} />
    );

    const hasSuffix = Boolean(suffix);

    const onPickerColorChange: ChangeEventHandler<InputElement> = (e) => {
      setCurrentColor(e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

    const onInputChange: ChangeEventHandler<InputElement> = (e) => {
      if (colorPickerRef.current) {
        colorPickerRef.current.value = `#${e.target.value}`;
      }
      setCurrentColor(`#${e.target.value}`);
    };

    return (
      <FieldSet
        className={className}
        style={style}
        disabled={disabled}
        aria-orientation="horizontal"
      >
        <FieldLegend id={labelId}>
          <FieldLabelText
            label={label}
            hideLabel={hideLabel}
            optionalLabel={optionalLabel}
            required={required}
          />
        </FieldLegend>
        <div className={classes.wrapper}>
          <label htmlFor={pickerId} className={classes.picker}>
            <input
              id={pickerId}
              type="color"
              aria-labelledby={labelId}
              aria-describedby={descriptionIds}
              className={classes['color-input']}
              onChange={onPickerColorChange}
              ref={applyMultipleRefs(colorPickerRef, ref)}
              readOnly={readOnly}
            />
          </label>
          <span className={classes.symbol}>#</span>
          <input
            id={id}
            aria-labelledby={labelId}
            aria-describedby={descriptionIds}
            className={clsx(
              inputClasses.base,
              !disabled && hasWarning && inputClasses.warning,
              hasSuffix && inputClasses['has-suffix'],
              classes.input,
            )}
            aria-invalid={invalid && 'true'}
            required={required}
            disabled={disabled}
            maxLength={6}
            pattern="[0-9a-f]{3,6}"
            readOnly={readOnly}
            value={currentColor ? currentColor.replace('#', '') : undefined}
            onChange={onInputChange}
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
