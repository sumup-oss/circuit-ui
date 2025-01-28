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

import { forwardRef, useId, type InputHTMLAttributes } from 'react';

import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { clsx } from '../../styles/clsx.js';
import { utilClasses } from '../../styles/utility.js';

import classes from './RadioButtonInput.module.css';

export interface RadioButtonInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Alignment of the radio button in relation to its label.
   * @default 'center'
   */
  align?: 'center' | 'start';
}

export const RadioButtonInput = forwardRef<
  HTMLInputElement,
  RadioButtonInputProps
>(
  (
    { 'id': customId, className, style, children, align = 'center', ...props },
    ref,
  ) => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !isSufficientlyLabelled(children, props)
    ) {
      throw new AccessibilityError(
        'RadioButtonInput',
        'The input is missing a valid label.',
      );
    }

    const id = useId();
    const inputId = customId || id;

    return (
      <>
        <input
          {...props}
          ref={ref}
          id={inputId}
          type="radio"
          className={clsx(classes.base, utilClasses.hideVisually)}
        />
        <label
          htmlFor={inputId}
          className={clsx(className, classes.label, classes[align])}
          style={style}
        >
          {children}
        </label>
      </>
    );
  },
);

RadioButtonInput.displayName = 'RadioButtonInput';
