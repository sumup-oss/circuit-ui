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

import { forwardRef, useId } from 'react';

import { PatternFormat } from '../../vendor/react-number-format/index.js';
import type { OnValueChange } from '../../vendor/react-number-format/types.js';
import { idx } from '../../util/idx.js';
import { Input, type InputProps } from '../Input/index.js';

export interface PatternInputProps
  extends Omit<
    InputProps,
    'placeholder' | 'ref' | 'value' | 'defaultValue' | 'type'
  > {
  /**
   * The pattern to be followed by the input value.
   */
  pattern: string;
  /**
   * The mask to be used for the input value.
   */
  mask?: string;
  /**
   * A short string that is shown inside the empty input.
   */
  placeholder?: string | number;
  /**
   * The value of the input element.
   */
  value?: string | number;
  /**
   * The default value of the input element.
   */
  defaultValue?: string | number;
  onValueChange?: OnValueChange;
}

/**
 * PatternInput component for forms.
 */
export const PatternInput = forwardRef<HTMLInputElement, PatternInputProps>(
  (
    { 'aria-describedby': descriptionId, pattern, mask = '_', ...props },
    ref,
  ) => {
    const patternSymbolId = useId();
    const descriptionIds = idx(patternSymbolId, descriptionId);

    return (
      <PatternFormat
        customInput={Input}
        format={pattern}
        getInputRef={ref}
        inputMode="numeric"
        mask={mask}
        type="text"
        aria-describedby={descriptionIds}
        {...props}
      />
    );
  },
);

PatternInput.displayName = 'PatternInput';
