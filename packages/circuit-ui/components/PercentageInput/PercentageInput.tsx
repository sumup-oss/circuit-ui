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

import { useId, type Ref } from 'react';
import { resolveNumberFormat } from '@sumup-oss/intl';

import { NumericFormat } from '../../vendor/react-number-format/index.js';
import type { OnValueChange } from '../../vendor/react-number-format/types.js';
import { clsx } from '../../styles/clsx.js';
import { idx } from '../../util/idx.js';
import type { Locale } from '../../util/i18n.js';
import { deprecate } from '../../util/logger.js';
import { useI18n } from '../../hooks/useI18n/useI18n.js';
import { Input, type InputProps } from '../Input/index.js';

import { formatPlaceholder } from './PercentageInputService.js';
import classes from './PercentageInput.module.css';

export interface PercentageInputProps
  extends Omit<
    InputProps,
    'placeholder' | 'ref' | 'value' | 'defaultValue' | 'type'
  > {
  ref?: Ref<HTMLInputElement>;
  /**
   * @deprecated Use the `I18nProvider` component or the `formattingLocale` prop instead.
   *
   * One or more [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag)
   * locale identifiers such as `'de-DE'` or `['GB', 'en-US']`.
   * When passing an array, the first supported locale is used.
   */
  locale?: Locale;
  /**
   * One or more [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag)
   * locale identifiers such as `'de-DE'` or `['GB', 'en-US']`.
   * When passing an array, the first supported locale is used.
   */
  formattingLocale?: Locale;
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
  allowNegative?: boolean;
  decimalScale?: number;
  fixedDecimalScale?: boolean;
  onValueChange?: OnValueChange;
}

const DEFAULT_FORMAT = {
  decimalDelimiter: '.',
  groupDelimiter: ',',
};

/**
 * PercentageInput component for fractional values
 */
export function PercentageInput({
  locale: customLocale,
  formattingLocale: customFormattingLocale,
  placeholder = '0',
  decimalScale = 0,
  'aria-describedby': descriptionId,
  ref,
  ...props
}: PercentageInputProps) {
  if (process.env.NODE_ENV !== 'production' && customLocale) {
    deprecate(
      'PercentageInput',
      'The `locale` prop has been deprecated. Use the `I18nProvider` component or the `formattingLocale` prop instead.',
    );
  }

  const { formattingLocale } = useI18n({
    locale: customLocale,
    formattingLocale: customFormattingLocale,
  });
  const percentageSymbolId = useId();
  const descriptionIds = idx(percentageSymbolId, descriptionId);

  const { groupDelimiter, decimalDelimiter } =
    resolveNumberFormat(formattingLocale, {
      style: 'percent',
      // There must be at least 1 decimal for the decimalDelimiter to be resolved
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }) || DEFAULT_FORMAT;

  const placeholderString = formatPlaceholder(placeholder, formattingLocale, {
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
}
