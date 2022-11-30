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

import { Ref, forwardRef } from 'react';
import { resolveCurrencyFormat } from '@sumup/intl';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

import styled from '../../styles/styled';
import Input from '../Input';
import { InputProps } from '../Input/Input';
import { uniqueId } from '../../util/id';

import { formatPlaceholder } from './CurrencyInputService';

export interface CurrencyInputProps
  extends Omit<
    InputProps,
    'placeholder' | 'ref' | 'value' | 'defaultValue' | 'type'
  > {
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
   * The ref to the HTML DOM element.
   */
  ref?: Ref<NumericFormatProps<InputProps>>;
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

const CurrencyIcon = styled('span')`
  line-height: ${({ theme }) => theme.spacings.mega};
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * CurrencyInput component for forms. Automatically looks up symbols and places
 * the symbol according to the locale. The corresponding service exports a
 * parser for formatting values automatically.
 */
export const CurrencyInput = forwardRef(
  (
    {
      locale,
      currency,
      placeholder,
      'aria-describedby': descriptionId,
      ...props
    }: CurrencyInputProps,
    ref: CurrencyInputProps['ref'],
  ) => {
    const currencySymbolId = uniqueId('currency-symbol_');
    const descriptionIds = `${
      descriptionId ? `${descriptionId} ` : ''
    }${currencySymbolId}`;

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
            <CurrencyIcon {...prefixProps} id={currencySymbolId}>
              {currencySymbol}
            </CurrencyIcon>
          )
        : undefined;

    const renderSuffix =
      currencyPosition === 'suffix'
        ? (suffixProps: { className?: string }) => (
            <CurrencyIcon {...suffixProps} id={currencySymbolId}>
              {currencySymbol}
            </CurrencyIcon>
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
