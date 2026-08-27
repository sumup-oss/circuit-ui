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

import { useId, type Ref } from 'react';
import { resolveCurrencyFormat } from '@sumup-oss/intl';

import { NumericFormat } from '../../vendor/react-number-format/index.js';
import type { OnValueChange } from '../../vendor/react-number-format/types.js';
import { clsx } from '../../styles/clsx.js';
import { idx } from '../../util/idx.js';
import type { Locale } from '../../util/i18n.js';
import { CircuitError } from '../../util/errors.js';
import { useI18n } from '../../hooks/useI18n/useI18n.js';
import { Input, type InputProps } from '../Input/index.js';

import { formatPlaceholder } from './CurrencyInputService.js';
import classes from './CurrencyInput.module.css';

export interface CurrencyInputProps
  extends Omit<
    InputProps,
    'placeholder' | 'ref' | 'value' | 'defaultValue' | 'type'
  > {
  ref?: Ref<HTMLInputElement>;
  /**
   * A ISO 4217 currency code, such as 'USD' for the US dollar,
   * 'EUR' for the Euro, or 'CNY' for the Chinese RMB.
   */
  currency: string;
  /**
   * One or more [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag)
   * locale identifiers such as `'de-DE'` or `['GB', 'en-US']`.
   * When passing an array, the first supported locale is used.
   */
  formattingLocale?: Locale;
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
  allowNegative?: boolean;
  onValueChange?: OnValueChange;
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
export function CurrencyInput({
  formattingLocale: customFormattingLocale,
  currency,
  placeholder,
  'aria-describedby': descriptionId,
  ref,
  ...props
}: CurrencyInputProps) {
  if (process.env.NODE_ENV !== 'production' && 'locale' in props) {
    throw new CircuitError(
      'CurrencyInput',
      'The `locale` prop has been removed. Use the `I18nProvider` component or the `formattingLocale` prop instead.',
    );
  }

  const { formattingLocale } = useI18n({
    formattingLocale: customFormattingLocale,
  });
  const currencySymbolId = useId();
  const descriptionIds = idx(currencySymbolId, descriptionId);

  const currencyFormat =
    resolveCurrencyFormat(formattingLocale, currency) || DEFAULT_FORMAT;
  const {
    currencyPosition,
    currencySymbol,
    minimumFractionDigits,
    maximumFractionDigits,
    decimalDelimiter,
    groupDelimiter,
  } = currencyFormat;
  const placeholderString = formatPlaceholder(placeholder, formattingLocale, {
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
        maximumFractionDigits && maximumFractionDigits > 0
          ? decimalDelimiter
          : DUMMY_DELIMITER
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
}
