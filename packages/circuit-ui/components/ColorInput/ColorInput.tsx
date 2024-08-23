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
  useState,
  type ChangeEventHandler,
} from 'react';

import { Input, type InputElement, type InputProps } from '../Input/index.js';
import { clsx } from '../../styles/clsx.js';
import { FieldLabel, FieldLabelText } from '../Field/index.js';
import { applyMultipleRefs } from '../../util/refs.js';

import styles from './ColorInput.module.css';

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
    | 'renderSuffix'
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
  /*
   * Picker label describes the color picker which serves as an alternative
   * to the hex color input.
   */
  pickerLabel: string;
}

export const ColorInput = forwardRef<InputElement, ColorInputProps>(
  (
    { onChange, className, value, defaultValue, pickerLabel, ...props },
    ref,
  ) => {
    const [currentColor, setCurrentColor] = useState<string | undefined>(
      defaultValue,
    );
    const colorDisplayRef = useRef<HTMLDivElement>(null);
    const colorPickerRef = useRef<InputElement>(null);
    const pickerId = useId();

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

    useEffect(() => {
      if (colorDisplayRef.current && currentColor) {
        colorDisplayRef.current.style.backgroundColor = currentColor;
      }
    }, [currentColor]);

    const renderSuffix = useCallback(
      () => (
        <div
          className={clsx(styles.suffix)}
          ref={colorDisplayRef}
          style={{ backgroundColor: currentColor }}
        >
          <FieldLabel htmlFor={pickerId}>
            <FieldLabelText label={pickerLabel} hideLabel />
          </FieldLabel>
          <input
            type="color"
            id={pickerId}
            className={styles.colorInput}
            onChange={onPickerColorChange}
            ref={applyMultipleRefs(colorPickerRef, ref)}
          />
        </div>
      ),
      [],
    );

    return (
      <Input
        className={styles.colorpick}
        renderPrefix={({ className: cn }) => (
          <div className={clsx(cn, styles.prefix)}>
            <span>#</span>
          </div>
        )}
        renderSuffix={renderSuffix}
        value={currentColor ? currentColor.replace('#', '') : undefined}
        inputClassName={styles.input}
        maxLength={6}
        pattern="[0-9a-f]{3,6}"
        onChange={onInputChange}
        {...props}
      />
    );
  },
);

ColorInput.displayName = 'ColorInput';
