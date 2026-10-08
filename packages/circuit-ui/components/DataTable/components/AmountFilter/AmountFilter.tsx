/**
 * Copyright 2026, SumUp Ltd.
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

import { useId } from 'react';

import { CurrencyInput } from '../../../CurrencyInput/index.js';
import { Body } from '../../../Body/index.js';
import { Input } from '../../../Input/index.js';
import type { I18nConfig } from '../../../I18nContext/I18nContext.js';
import { PercentageInput } from '../../../PercentageInput/index.js';
import { useTranslations } from '../../../../hooks/useTranslations/useTranslations.js';
import { clsx } from '../../../../styles/clsx.js';
import { utilClasses } from '../../../../styles/utility.js';
import type { FilterKind, NumberRange } from '../Filter/types.js';

import classes from './AmountFilter.module.css';
import { translations } from './translations/index.js';

type AmountKind = Extract<FilterKind, 'number' | 'percentage' | 'currency'>;

interface BaseAmountFilterProps extends Partial<I18nConfig> {
  /**
   * The name of the filter, used as the label of the min and max fields.
   */
  label: string;
  /**
   * Visually hide the label, e.g. when the trigger button already names the
   * filter.
   */
  hideLabel?: boolean;
  /**
   * The applied range. `undefined` means no range is set.
   */
  value?: NumberRange;
  /**
   * Called with the range the user entered, or `undefined` when both fields
   * are empty.
   */
  onChange: (value: NumberRange | undefined) => void;
  /**
   * Label for the minimum field.
   */
  minLabel?: string;
  /**
   * Label for the maximum field.
   */
  maxLabel?: string;
  /**
   * Message shown when the minimum is greater than the maximum.
   */
  invalidRangeMessage?: string;
}

export type AmountFilterProps = BaseAmountFilterProps &
  (
    | { kind: Exclude<AmountKind, 'currency'> }
    | {
        kind: 'currency';
        /**
         * An ISO 4217 currency code, such as 'EUR'.
         */
        currency: string;
      }
  );

interface AmountFieldProps extends Partial<I18nConfig> {
  kind: AmountKind;
  currency?: string;
  label: string;
  value?: number;
  invalid: boolean;
  onChange: (value: number | undefined) => void;
}

function AmountField({
  kind,
  currency,
  label,
  value,
  invalid,
  onChange,
  formattingLocale,
}: AmountFieldProps) {
  const sharedProps = {
    label,
    hideLabel: true,
    placeholder: label,
    invalid,
    value: value ?? '',
  };

  if (kind === 'currency' && currency) {
    return (
      <CurrencyInput
        {...sharedProps}
        currency={currency}
        formattingLocale={formattingLocale}
        onValueChange={({ floatValue }) => onChange(floatValue)}
      />
    );
  }

  if (kind === 'percentage') {
    return (
      <PercentageInput
        {...sharedProps}
        formattingLocale={formattingLocale}
        onValueChange={({ floatValue }) => onChange(floatValue)}
      />
    );
  }

  return (
    <Input
      {...sharedProps}
      type="number"
      onChange={(event) =>
        onChange(
          event.target.value === '' ? undefined : Number(event.target.value),
        )
      }
    />
  );
}

/**
 * Lets the user enter a minimum and a maximum for a quantity, percentage or
 * currency amount.
 */
export function AmountFilter(props: AmountFilterProps) {
  const {
    kind,
    label,
    hideLabel,
    value,
    onChange,
    minLabel,
    maxLabel,
    invalidRangeMessage,
    formattingLocale,
  } = useTranslations(props, translations);
  const currency = 'currency' in props ? props.currency : undefined;
  const hintId = useId();

  const isInvalid =
    value?.min !== undefined &&
    value?.max !== undefined &&
    value.min > value.max;

  const handleChange = (next: NumberRange) => {
    const range: NumberRange = {};
    if (next.min !== undefined) {
      range.min = next.min;
    }
    if (next.max !== undefined) {
      range.max = next.max;
    }
    onChange(Object.keys(range).length > 0 ? range : undefined);
  };

  return (
    <fieldset
      className={classes.base}
      aria-describedby={isInvalid ? hintId : undefined}
    >
      <legend
        className={clsx(classes.legend, hideLabel && utilClasses.hideVisually)}
      >
        {label}
      </legend>
      <div className={classes.range}>
        <AmountField
          kind={kind}
          currency={currency}
          label={minLabel}
          value={value?.min}
          invalid={isInvalid}
          formattingLocale={formattingLocale}
          onChange={(min) => handleChange({ ...value, min })}
        />
        <span className={classes.separator} aria-hidden="true">
          –
        </span>
        <AmountField
          kind={kind}
          currency={currency}
          label={maxLabel}
          value={value?.max}
          invalid={isInvalid}
          formattingLocale={formattingLocale}
          onChange={(max) => handleChange({ ...value, max })}
        />
      </div>
      {isInvalid && (
        <Body as="p" id={hintId} size="s" color="danger">
          {invalidRangeMessage}
        </Body>
      )}
    </fieldset>
  );
}
