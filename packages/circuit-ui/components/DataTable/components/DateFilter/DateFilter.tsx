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

import { clsx } from '../../../../styles/clsx.js';
import { utilClasses } from '../../../../styles/utility.js';
import { useTranslations } from '../../../../hooks/useTranslations/useTranslations.js';
import { DateInput } from '../../../DateInput/index.js';
import type { I18nConfig } from '../../../I18nContext/I18nContext.js';
import { compactRange } from '../Filter/range.js';
import type { DateRange } from '../Filter/types.js';

import classes from './DateFilter.module.css';
import { translations } from './translations/index.js';

export interface DateFilterProps extends Partial<I18nConfig> {
  /**
   * The name of the filter, used as the label of the from and to fields.
   */
  label: string;
  /**
   * Visually hide the label, e.g. when the trigger button already names the
   * filter.
   */
  hideLabel?: boolean;
  /**
   * The applied range as ISO 8601 dates (`YYYY-MM-DD`). `undefined` means no
   * range is set.
   */
  value?: DateRange;
  /**
   * Called with the range the user entered, or `undefined` when both fields
   * are empty.
   */
  onChange: (value: DateRange | undefined) => void;
  /**
   * Label for the start date field.
   */
  fromLabel?: string;
  /**
   * Label for the end date field.
   */
  toLabel?: string;
}

/**
 * Lets the user pick a start and an end date. Each field offers a calendar,
 * and the dates are limited so that the range cannot end before it starts.
 */
export function DateFilter(props: DateFilterProps) {
  const {
    label,
    hideLabel,
    value,
    onChange,
    fromLabel,
    toLabel,
    locale,
    formattingLocale,
  } = useTranslations(props, translations);

  return (
    <fieldset className={classes.base}>
      <legend
        className={clsx(classes.legend, hideLabel && utilClasses.hideVisually)}
      >
        {label}
      </legend>
      <div className={classes.fields}>
        <DateInput
          label={fromLabel}
          value={value?.from ?? ''}
          max={value?.to}
          locale={locale}
          formattingLocale={formattingLocale}
          onChange={(event) =>
            onChange(
              compactRange({ ...value, from: event.target.value || undefined }),
            )
          }
        />
        <DateInput
          label={toLabel}
          value={value?.to ?? ''}
          min={value?.from}
          locale={locale}
          formattingLocale={formattingLocale}
          onChange={(event) =>
            onChange(
              compactRange({ ...value, to: event.target.value || undefined }),
            )
          }
        />
      </div>
    </fieldset>
  );
}
