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

import React, { Ref } from 'react';
import { resolveCurrencyFormat } from '@sumup/intl';
import TextMaskInput from 'react-text-mask';

import styled from '../../styles/styled';
import Input from '../Input';
import { InputProps } from '../Input/Input';

import { createCurrencyMask, formatPlaceholder } from './CurrencyInputService';

export interface CurrencyInputProps
  extends Omit<InputProps, 'placeholder' | 'ref'> {
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
  ref: Ref<TextMaskInput>;
}

const DEFAULT_FORMAT = {
  currencyPosition: 'left',
  currencySymbol: '$',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  decimalSymbol: '.',
  housandsSeparatorSymbol: ',',
};

const CurrencyIcon = styled('span')`
  label: simple-currency-input__symbol;
  line-height: ${({ theme }) => theme.spacings.mega};
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * CurrencyInput component for forms. Automatically looks up
 * symbols and places the symbol according to the locale. The corresponding
 * service exports a parser for formatting values automatically.
 */
export const CurrencyInput = React.forwardRef(
  (
    { locale, currency, placeholder, ...props }: CurrencyInputProps,
    ref: CurrencyInputProps['ref'],
  ) => {
    const currencyFormat =
      resolveCurrencyFormat(locale, currency) || DEFAULT_FORMAT;
    const {
      currencyPosition,
      currencySymbol,
      minimumFractionDigits,
      maximumFractionDigits,
    } = currencyFormat;
    const numberMask = createCurrencyMask(currencyFormat, locale);
    const placeholderString = formatPlaceholder(placeholder, locale, {
      minimumFractionDigits,
      maximumFractionDigits,
    });

    const renderPrefix =
      currencyPosition === 'prefix'
        ? (preffixProps: { className?: string }) => (
            <CurrencyIcon {...preffixProps}>{currencySymbol}</CurrencyIcon>
          )
        : null;

    const renderSuffix =
      currencyPosition === 'suffix'
        ? (suffixProps: { className?: string }) => (
            <CurrencyIcon {...suffixProps}>{currencySymbol}</CurrencyIcon>
          )
        : null;

    return (
      <TextMaskInput
        ref={ref}
        guide={false}
        render={(inputRef, { defaultValue, ...renderProps }) => (
          <Input
            ref={inputRef}
            value={defaultValue}
            renderPrefix={renderPrefix}
            renderSuffix={renderSuffix}
            placeholder={placeholderString}
            textAlign="right"
            type="text"
            {...renderProps}
          />
        )}
        mask={numberMask}
        {...props}
      />
    );
  },
);

CurrencyInput.displayName = 'CurrencyInput';
