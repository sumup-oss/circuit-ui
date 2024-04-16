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
import { resolveCurrencyFormat } from '@sumup/intl';
import { NumericFormat, type NumericFormatProps } from 'react-number-format';

import { clsx } from '../../styles/clsx.js';
import Input, { type InputElement, type InputProps } from '../Input/index.js';

import { formatPlaceholder } from './CurrencyInputService.js';
import classes from './CurrencyInput.module.css';

export interface CurrencyInputProps
  extends Omit<
      InputProps,
      'placeholder' | 'ref' | 'value' | 'defaultValue' | 'type'
    >,
    Pick<NumericFormatProps, 'onValueChange' | 'allowNegative'> {
  /**
   * A ISO 4217 currency code, such as 'USD' for the US dollar,
   * 'EUR' for the Euro, or 'CNY' for the Chinese RMB.
   */
  currency: string;
  /**
   * One or more Unicode BCP 47 locale identifiers, such as 'de-DE' or
   * ['GB', 'en-US'] (the first supported locale is used).
   */
  locale?: string | string[];
  /**
   * A short string that is shown inside the empty input.
   * If the placeholder is a number, it is formatted in the local
   * currency format.
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
  currencyPosition: 'left',
  currencySymbol: '$',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  decimalDelimiter: '.',
  groupDelimiter: ',',
};

const DUMMY_DELIMITER = '?';

/**
 * CurrencyInput component for forms. Automatically looks up symbols and places
 * the symbol according to the locale. The corresponding service exports a
 * parser for formatting values automatically.
 */
export const CurrencyInput = forwardRef<InputElement, CurrencyInputProps>(
  (
    {
      locale,
      currency,
      placeholder,
      'aria-describedby': descriptionId,
      ...props
    },
    ref,
  ) => {
    const currencySymbolId = useId();
    const descriptionIds = clsx(currencySymbolId, descriptionId);

    const currencyFormat =
      resolveCurrencyFormat(locale, currency) || DEFAULT_FORMAT;
    const {
      currencyPosition,
      currencySymbol,
      minimumFractionDigits,
      maximumFractionDigits,
      decimalDelimiter,
      groupDelimiter,
    } = currencyFormat;
    const placeholderString = formatPlaceholder(placeholder, locale, {
      minimumFractionDigits,
      maximumFractionDigits,
    });
    // Allow common decimal signs as well as the one from resolveCurrencyFormat()
    const allowedDecimalSeparators = [
      '.',
      ',',
      ...(decimalDelimiter ? [decimalDelimiter] : []),
    ];

    const renderPrefix =
      currencyPosition === 'prefix'
        ? (prefixProps: { className?: string }) => (
            <span
              {...prefixProps}
              className={clsx(prefixProps.className, classes.currency)}
              id={currencySymbolId}
            >
              {currencySymbol}
            </span>
          )
        : undefined;

    const renderSuffix =
      currencyPosition === 'suffix'
        ? (suffixProps: { className?: string }) => (
            <span
              {...suffixProps}
              className={clsx(suffixProps.className, classes.currency)}
              id={currencySymbolId}
            >
              {currencySymbol}
            </span>
          )
        : undefined;

    return (
      <NumericFormat
        // react-number-format props
        thousandSeparator={groupDelimiter}
        decimalSeparator={
          maximumFractionDigits > 0 ? decimalDelimiter : DUMMY_DELIMITER
        }
        decimalScale={maximumFractionDigits}
        customInput={Input}
        getInputRef={ref}
        allowedDecimalSeparators={allowedDecimalSeparators}
        // Circuit input props
        renderPrefix={renderPrefix}
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

CurrencyInput.displayName = 'CurrencyInput';
