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

import { Body } from '../../../../Body/index.js';
import { Input } from '../../../../Input/index.js';
import type { I18nConfig } from '../../../../I18nContext/I18nContext.js';
import { useTranslations } from '../../../../../hooks/useTranslations/useTranslations.js';
import { clsx } from '../../../../../styles/clsx.js';
import { utilClasses } from '../../../../../styles/utility.js';
import { compactRange } from '../Filter/range.js';
import type { NumberRange } from '../Filter/types.js';

import classes from './AmountFilter.module.css';
import { translations } from './translations/index.js';

export interface AmountFilterProps extends Partial<I18nConfig> {
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

interface AmountFieldProps {
  label: string;
  value?: number;
  invalid: boolean;
  onChange: (value: number | undefined) => void;
}

function AmountField({ label, value, invalid, onChange }: AmountFieldProps) {
  return (
    <Input
      type="number"
      size="s"
      className={classes.field}
      label={label}
      hideLabel
      placeholder={label}
      invalid={invalid}
      value={value ?? ''}
      onChange={(event) =>
        onChange(
          event.target.value === '' ? undefined : Number(event.target.value),
        )
      }
    />
  );
}

/**
 * Lets the user enter a minimum and a maximum number.
 */
export function AmountFilter(props: AmountFilterProps) {
  const {
    label,
    hideLabel,
    value,
    onChange,
    minLabel,
    maxLabel,
    invalidRangeMessage,
  } = useTranslations(props, translations);
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
          label={minLabel}
          value={value?.min}
          invalid={isInvalid}
          onChange={(min) => onChange(compactRange({ ...value, min }))}
        />
        <span className={classes.separator} aria-hidden="true">
          –
        </span>
        <AmountField
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
