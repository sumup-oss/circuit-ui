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

import { useCallback, useEffect, useState } from 'react';
import { Temporal } from 'temporal-polyfill';

import {
  getMonthName,
  getTodaysDate,
  MAX_MONTH,
  MAX_YEAR,
  MIN_DAY,
  MIN_MONTH,
  MIN_YEAR,
  toPlainDate,
} from '../../../util/date.js';
import { isNumber } from '../../../util/type-check.js';
import { clamp } from '../../../util/helpers.js';
import type { Locale } from '../../../util/i18n.js';
import type { DateSegmentProps } from '../components/DateSegment.js';

export type DateValue = number | '';
type DateValues = {
  year: DateValue;
  month: DateValue;
  day: DateValue;
};

export type PlainDateState = {
  date: Temporal.PlainDate | undefined;
  update: (values: Partial<DateValues>) => void;
  props: {
    year: Omit<DateSegmentProps, 'focus'>;
    month: Omit<DateSegmentProps, 'focus'>;
    day: Omit<DateSegmentProps, 'focus'>;
  };
};

export const emptyDate: DateValues = { year: '', month: '', day: '' };

export function usePlainDateState({
  value,
  defaultValue,
  onChange,
  minDate,
  maxDate,
  locale,
}: {
  value: string | undefined;
  defaultValue: string | undefined;
  onChange: ((date: string) => void) | undefined;
  minDate: Temporal.PlainDate | undefined;
  maxDate: Temporal.PlainDate | undefined;
  locale: Locale | undefined;
}): PlainDateState {
  const [values, setValues] = useState<DateValues>(
    parseValue(defaultValue || value),
  );

  useEffect(() => {
    if (value) {
      setValues(parseValue(value));
    }
  }, [value]);

  const update = useCallback(
    (newValues: Partial<DateValues>) => {
      setValues((prevValues) => {
        const year = clampValue(
          prevValues.year,
          newValues.year,
          MIN_YEAR,
          MAX_YEAR,
        );
        const month = clampValue(
          prevValues.month,
          newValues.month,
          MIN_MONTH,
          MAX_MONTH,
        );

        const yearMonth = safePlainYearMonth(year, month);
        const maxDay = yearMonth?.daysInMonth || 31;

        // TODO: Special handling for February?
        const day = clampValue(prevValues.day, newValues.day, MIN_DAY, maxDay);

        if (onChange) {
          const plainDate = safePlainDate(year, month, day);
          onChange(plainDate?.toString() || '');
        }

        return { year, month, day };
      });
    },
    [onChange],
  );

  const date = safePlainDate(values.year, values.month, values.day);
  const today = getTodaysDate();

  const sameYearLimit = minDate && maxDate && minDate.year === maxDate.year;
  const sameMonthLimit = sameYearLimit && minDate.month === maxDate.month;
  const currentMinYear = minDate && minDate.year === values.year;
  const currentMaxYear = maxDate && maxDate.year === values.year;
  const currentMinMonth = currentMinYear && minDate.month === values.month;
  const currentMaxMonth = currentMaxYear && maxDate.month === values.month;

  const yearMonth = safePlainYearMonth(values.year, values.month);

  const props = {
    year: {
      value: values.year,
      defaultValue: today.year,
      placeholder: 'yyyy',
      step: 10,
      min: minDate ? minDate.year : 1,
      max: maxDate ? maxDate.year : 9999,
      onChange: (year: DateValue) => update({ year }),
    },
    month: {
      value: values.month,
      'aria-valuetext': values.month
        ? [values.month, getMonthName(values.month, locale)].join(', ')
        : undefined,
      defaultValue: today.month,
      placeholder: 'mm',
      step: 3,
      min: sameYearLimit || currentMinYear ? minDate.month : MIN_MONTH,
      max: sameYearLimit || currentMaxYear ? maxDate.month : MAX_MONTH,
      onChange: (month: DateValue) => update({ month }),
    },
    day: {
      value: values.day,
      defaultValue: today.day,
      placeholder: 'dd',
      step: 7,
      min: sameMonthLimit || currentMinMonth ? minDate.day : 1,
      max:
        sameMonthLimit || currentMaxMonth
          ? maxDate.day
          : yearMonth?.daysInMonth || 31,
      onChange: (day: DateValue) => update({ day }),
    },
  };

  return { date, update, props };
}

function parseValue(value?: string): DateValues {
  const plainDate = toPlainDate(value);
  if (!plainDate) {
    return emptyDate;
  }
  const { year, month, day } = plainDate;
  return { year, month, day };
}

function clampValue(
  prevValue: DateValue,
  newValue: DateValue | undefined,
  min: number,
  max: number,
) {
  if (newValue === '' || !isNumber(newValue || prevValue)) {
    return '';
  }
  return clamp((newValue || prevValue) as number, min, max);
}

function safePlainDate(
  year: DateValue | undefined,
  month: DateValue | undefined,
  day: DateValue | undefined,
) {
  try {
    if (isNumber(year) && isNumber(month) && isNumber(day)) {
      return new Temporal.PlainDate(year, month, day);
    }
    return undefined;
  } catch {
    return undefined;
  }
}

function safePlainYearMonth(
  year: DateValue | undefined,
  month: DateValue | undefined,
) {
  try {
    if (isNumber(year) && isNumber(month)) {
      return new Temporal.PlainYearMonth(year, month);
    }
    return undefined;
  } catch {
    return undefined;
  }
}
