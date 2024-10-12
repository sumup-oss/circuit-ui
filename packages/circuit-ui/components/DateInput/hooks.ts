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

import {
  useCallback,
  useId,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
} from 'react';
import { Temporal } from 'temporal-polyfill';

import { toPlainDate } from '../../util/date.js';
import { clamp } from '../../util/helpers.js';
import { isNumber } from '../../util/type-check.js';

/**
 * These hooks assume a Gregorian or ISO 8601 calendar:
 *
 * - The maximum number of days in a month is 31.
 */

type PartialPlainDate = {
  year?: number | '';
  month?: number | '';
  day?: number | '';
};

type PlainDateState = {
  date: PartialPlainDate;
  update: (date: PartialPlainDate) => void;
  minDate?: Temporal.PlainDate;
  maxDate?: Temporal.PlainDate;
};

export function usePlainDateState({
  value,
  min,
  max,
}: {
  value?: string;
  min?: string;
  max?: string;
}): PlainDateState {
  const [date, setDate] = useState<PartialPlainDate>(() => {
    const plainDate = toPlainDate(value);
    if (!plainDate) {
      return { day: '', month: '', year: '' };
    }
    const { year, month, day } = plainDate;
    return { year, month, day };
  });

  const update = (newDate: PartialPlainDate) => {
    setDate((prevDate) => ({ ...prevDate, ...newDate }));
  };

  const minDate = toPlainDate(min);
  const maxDate = toPlainDate(max);

  return { date, update, minDate, maxDate };
}

export function useYearSegment(
  state: PlainDateState,
  focusNextSegment: () => void,
): InputHTMLAttributes<HTMLInputElement> {
  if (
    state.minDate &&
    state.maxDate &&
    state.minDate.year === state.maxDate.year
  ) {
    return {
      value: state.minDate.year,
      readOnly: true,
    };
  }

  const min = state.minDate ? state.minDate.year : 1;
  const max = state.maxDate ? state.maxDate.year : 9999;

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    const value = Number.parseInt(event.currentTarget.value, 10);
    // FIXME: Clamping makes for a confusing user experience, especially with custom min and max dates 🤔
    const year = value ? clamp(value, min, max) : '';
    state.update({ year });
    if (year && year > 999) {
      focusNextSegment();
    }
  };

  return {
    value: state.date.year,
    min,
    max,
    placeholder: 'yyyy',
    onChange,
  };
}

export function useMonthSegment(
  state: PlainDateState,
  focusNextSegment: () => void,
): InputHTMLAttributes<HTMLInputElement> {
  if (
    state.minDate &&
    state.maxDate &&
    state.minDate.year === state.maxDate.year &&
    state.minDate.month === state.maxDate.month
  ) {
    return {
      value: state.minDate.month,
      readOnly: true,
    };
  }

  let min = 1;
  let max = 12;

  if (state.minDate && state.minDate.year === state.date.year) {
    min = state.minDate.month;
  }

  if (state.maxDate && state.maxDate.year === state.date.year) {
    max = state.maxDate.month;
  }

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    const value = Number.parseInt(event.currentTarget.value, 10);
    // FIXME: Clamping makes for a confusing user experience, especially with custom min and max dates 🤔
    const month = value ? clamp(value, min, max) : '';
    state.update({ month });
    if (month && month > 1) {
      focusNextSegment();
    }
  };

  return {
    value: state.date.month,
    min,
    max,
    placeholder: 'mm',
    onChange,
  };
}

export function useDaySegment(
  state: PlainDateState,
  focusNextSegment: () => void,
): InputHTMLAttributes<HTMLInputElement> {
  const min = 1;
  let max = 31;

  if (isNumber(state.date.year) && isNumber(state.date.month)) {
    const plainYearMonth = new Temporal.PlainYearMonth(
      state.date.year,
      state.date.month,
    );
    max = plainYearMonth.daysInMonth;
    // TODO: account for min and max dates
  }

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    const value = Number.parseInt(event.currentTarget.value, 10);
    // FIXME: Clamping makes for a confusing user experience, especially with custom min and max dates 🤔
    const day = value ? clamp(value, min, max) : '';
    state.update({ day });
    if (day && day > 3) {
      focusNextSegment();
    }
  };

  return {
    value: state.date.day,
    min,
    max,
    placeholder: 'dd',
    onChange,
  };
}

export function useSegmentFocus(): [Record<string, string>, () => void] {
  const name = useId();

  const focusNextSegment = useCallback(() => {
    const items = document.querySelectorAll<HTMLElement>(
      `[data-focus-list="${name}"]`,
    );
    const currentEl = document.activeElement as HTMLElement;
    const currentIndex = Array.from(items).indexOf(currentEl);

    if (currentIndex === -1) {
      return;
    }

    const newIndex = currentIndex + 1;

    if (newIndex >= items.length) {
      return;
    }

    const newEl = items.item(newIndex);

    newEl.focus();
  }, [name]);

  return [{ 'data-focus-list': name }, focusNextSegment];
}
