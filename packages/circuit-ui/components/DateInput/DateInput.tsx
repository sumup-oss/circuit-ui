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

import React, { forwardRef, useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';

import styled from '../../styles/styled';
import { Input, InputProps } from '../Input/Input';

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

const BaseInput = styled(Input)`
  height: 42px;
  min-width: 8ch;
`;

/**
 * DateInput component for forms.
 * The input value is always a string in the format `YYYY-MM-DD`.
 */
export const DateInput = forwardRef(
  (props: Omit<DateInputProps, 'ref'>, ref: DateInputProps['ref']) => {
    // When server-side rendering, we assume that the user's browser supports
    // the native date input.
    const [supportsDate, setSupportsDate] = useState(true);

    // We check the browser support after the first render to avoid React's
    // hydration mismatch warning.
    useEffect(() => {
      // Browsers fall back to a text input when the date type isn't supported.
      // Adapted from https://stackoverflow.com/questions/10193294/how-can-i-tell-if-a-browser-supports-input-type-date
      const input = document.createElement('input');
      input.setAttribute('type', 'date');

      setSupportsDate(input.type === 'date');
    }, []);

    const placeholder = 'yyyy-mm-dd';

    // TODO: Fallback explainer, with enforced format
    if (!supportsDate) {
      return (
        <NumberFormat
          // NumberFormat props
          placeholder={placeholder}
          format="####-##-##"
          mask={['y', 'y', 'y', 'y', 'm', 'm', 'd', 'd']}
          customInput={Input}
          getInputRef={ref}
          // Circuit input props
          type="text"
          inputMode="numeric"
          {...props}
        />
      );
    }

    return (
      <BaseInput
        {...props}
        ref={ref}
        type="date"
        pattern="\d{4}-\d{2}-\d{2}"
        placeholder={placeholder}
      />
    );
  },
);

DateInput.displayName = 'DateInput';
