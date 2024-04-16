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

import { forwardRef, useId } from 'react';
import { resolveNumberFormat } from '@sumup/intl';
import { NumericFormat, type NumericFormatProps } from 'react-number-format';

import { clsx } from '../../styles/clsx.js';
import Input, { type InputElement, type InputProps } from '../Input/index.js';

import { formatPlaceholder } from './PercentageInputService.js';
import classes from './PercentageInput.module.css';

export interface PercentageInputProps
  extends Omit<
      InputProps,
      'placeholder' | 'ref' | 'value' | 'defaultValue' | 'type'
    >,
    Pick<
      NumericFormatProps,
      'onValueChange' | 'decimalScale' | 'fixedDecimalScale' | 'allowNegative'
    > {
  /**
   * One or more Unicode BCP 47 locale identifiers, such as `'de-DE'` or
   * `['GB', 'en-US']` (the first supported locale is used).
   */
  locale?: string | string[];
  /**
   * A short string that is shown inside the empty input.
   * If the placeholder is a number, it is formatted in the local format.
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
}

const DEFAULT_FORMAT = {
  decimalDelimiter: '.',
  groupDelimiter: ',',
};

/**
 * PercentageInput component for fractional values
 */
export const PercentageInput = forwardRef<InputElement, PercentageInputProps>(
  (
    {
      locale,
      placeholder = '0',
      decimalScale = 0,
      'aria-describedby': descriptionId,
      ...props
    },
    ref,
  ) => {
    const percentageSymbolId = useId();
    const descriptionIds = clsx(percentageSymbolId, descriptionId);

    const { groupDelimiter, decimalDelimiter } =
      resolveNumberFormat(locale, {
        style: 'percent',
        // There must be at least 1 decimal for the decimalDelimiter to be resolved
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }) || DEFAULT_FORMAT;

    const placeholderString = formatPlaceholder(placeholder, locale, {
      minimumFractionDigits: decimalScale,
      maximumFractionDigits: decimalScale,
    });

    // Allow common decimal signs as well as the one from resolveNumberFormat()
    const allowedDecimalSeparators = [
      '.',
      ',',
      ...(decimalDelimiter ? [decimalDelimiter] : []),
    ];

    const renderSuffix = (suffixProps: { className?: string }) => (
      <span
        {...suffixProps}
        className={clsx(suffixProps.className, classes.symbol)}
        id={percentageSymbolId}
      >
        %
      </span>
    );

    return (
      <NumericFormat
        // react-number-format props
        thousandSeparator={groupDelimiter}
        decimalSeparator={decimalDelimiter}
        decimalScale={decimalScale}
        customInput={Input}
        getInputRef={ref}
        allowedDecimalSeparators={allowedDecimalSeparators}
        // Circuit input props
        renderSuffix={renderSuffix}
        placeholder={placeholderString}
        textAlign="right"
        type="text"
        inputMode="decimal"
        aria-describedby={descriptionIds}
        {...props}
      />
    );
  },
);

PercentageInput.displayName = 'PercentageInput';
