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

import { useId, type ComponentProps } from 'react';
import { resolveNumberFormat } from '@sumup-oss/intl';

import { Body } from '../../../../Body/index.js';
import { CurrencyInput } from '../../../../CurrencyInput/index.js';
import { Input } from '../../../../Input/index.js';
import { PercentageInput } from '../../../../PercentageInput/index.js';
import { useI18n } from '../../../../../hooks/useI18n/useI18n.js';
import { NumericFormat } from '../../../../../vendor/react-number-format/index.js';
import type { OnValueChange } from '../../../../../vendor/react-number-format/types.js';
import { clsx } from '../../../../../styles/clsx.js';
import { utilClasses } from '../../../../../styles/utility.js';
import type { AmountKind } from '../Filter/FilterService.js';
import { compactRange } from '../Filter/range.js';
import type { NumberRange } from '../Filter/types.js';

import classes from './AmountFilter.module.css';

export interface AmountFilterProps {
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
   * The kind of amount to enter. Currencies and percentages show their symbol
   * in the fields and format the value for the locale.
   * @default { kind: 'number' }
   */
  amount?: AmountKind;
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
  minLabel: string;
  /**
   * Label for the maximum field.
   */
  maxLabel: string;
  /**
   * Message shown when the minimum is greater than the maximum.
   */
  invalidRangeMessage: string;
}

const QUANTITY_DECIMAL_SCALE = 3;

/**
 * A plain number input that formats the value for the locale, so it matches
 * the summary on the filter trigger. Unlike `type="number"`, it does not
 * depend on the browser's language.
 */
function QuantityInput(props: ComponentProps<typeof Input>) {
  const { formattingLocale } = useI18n({});
  const { groupDelimiter, decimalDelimiter } = resolveNumberFormat(
    formattingLocale,
    { minimumFractionDigits: 1, maximumFractionDigits: 1 },
  ) ?? { groupDelimiter: ',', decimalDelimiter: '.' };

  return (
    <NumericFormat
      thousandSeparator={groupDelimiter}
      decimalSeparator={decimalDelimiter}
      decimalScale={QUANTITY_DECIMAL_SCALE}
      allowedDecimalSeparators={['.', ',', decimalDelimiter]}
      customInput={Input}
      textAlign="right"
      type="text"
      inputMode="decimal"
      {...props}
    />
  );
}

interface AmountFieldProps {
  amount: AmountKind;
  label: string;
  value?: number;
  invalid: boolean;
  onChange: (value: number | undefined) => void;
}

function AmountField({
  amount,
  label,
  value,
  invalid,
  onChange,
}: AmountFieldProps) {
  const fieldProps = {
    size: 's',
    className: classes.field,
    label,
    hideLabel: true,
    placeholder: label,
    invalid,
  } as const;

  const formatted = {
    ...fieldProps,
    value: value ?? '',
    onValueChange: (({ floatValue }, { event }) => {
      // Skip the calls caused by the `value` prop changing
      if (event) {
        onChange(floatValue);
      }
    }) satisfies OnValueChange,
  };

  if (amount.kind === 'currency') {
    return <CurrencyInput {...formatted} currency={amount.currency} />;
  }

  if (amount.kind === 'percentage') {
    return <PercentageInput {...formatted} decimalScale={2} />;
  }

  return <QuantityInput {...formatted} />;
}

/**
 * Lets the user enter a minimum and a maximum number.
 */
export function AmountFilter({
  label,
  hideLabel,
  amount = { kind: 'number' },
  value,
  onChange,
  minLabel,
  maxLabel,
  invalidRangeMessage,
}: AmountFilterProps) {
  const hintId = useId();

  const isInvalid =
    value?.min !== undefined &&
    value?.max !== undefined &&
    value.min > value.max;

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
          amount={amount}
          label={minLabel}
          value={value?.min}
          invalid={isInvalid}
          onChange={(min) => onChange(compactRange({ ...value, min }))}
        />
        <span className={classes.separator} aria-hidden="true">
          –
        </span>
        <AmountField
          amount={amount}
          label={maxLabel}
          value={value?.max}
          invalid={isInvalid}
          onChange={(max) => onChange(compactRange({ ...value, max }))}
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
