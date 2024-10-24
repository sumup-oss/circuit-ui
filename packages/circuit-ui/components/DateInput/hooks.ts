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
  useEffect,
  useId,
  useMemo,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from 'react';
import { Temporal } from 'temporal-polyfill';

import {
  MAX_MONTH,
  MAX_YEAR,
  MIN_DAY,
  MIN_MONTH,
  MIN_YEAR,
  toPlainDate,
} from '../../util/date.js';
import { isNumber } from '../../util/type-check.js';
import { isBackspace, isDelete } from '../../util/key-codes.js';
import { clamp } from '../../util/helpers.js';

/**
 * These hooks assume a Gregorian or ISO 8601 calendar:
 *
 * - The maximum number of days in a month is 31.
 * - The year has to be positive and can have a maximum of 4 digits.
 */

type PartialPlainDate = {
  year?: number | '';
  month?: number | '';
  day?: number | '';
};

type PlainDateState = {
  date: PartialPlainDate;
  plainDate: Temporal.PlainDate | undefined;
  update: (date: PartialPlainDate) => void;
};

function parseValue(value?: string): PartialPlainDate {
  const plainDate = toPlainDate(value);
  if (!plainDate) {
    return { day: '', month: '', year: '' };
  }
  const { year, month, day } = plainDate;
  return { year, month, day };
}

export function usePlainDateState(
  value?: string,
  defaultValue?: string,
  onChange?: (date: string) => void,
): PlainDateState {
  const [date, setDate] = useState<PartialPlainDate>(() =>
    parseValue(defaultValue || value),
  );

  useEffect(() => {
    if (value) {
      setDate(parseValue(value));
    }
  }, [value]);

  const update = useCallback(
    (newDate: PartialPlainDate) => {
      setDate((prevDate) => {
        let year: PartialPlainDate['year'] =
          (newDate.year ?? prevDate.year) || '';

        if (isNumber(year)) {
          year = clamp(year, MIN_YEAR, MAX_YEAR);
        }

        let month: PartialPlainDate['month'] =
          (newDate.month ?? prevDate.month) || '';

        if (isNumber(month)) {
          month = clamp(month, MIN_MONTH, MAX_MONTH);
        }

        let day: PartialPlainDate['day'] = (newDate.day ?? prevDate.day) || '';

        if (isNumber(day)) {
          let maxDay = 31;
          if (isNumber(year) && year > 999 && isNumber(month)) {
            const plainYearMonth = new Temporal.PlainYearMonth(year, month);
            maxDay = plainYearMonth.daysInMonth;
          }
          day = clamp(day, MIN_DAY, maxDay);
        }

        if (isNumber(year) && isNumber(month) && isNumber(day)) {
          const plainDate = new Temporal.PlainDate(year, month, day);
          onChange?.(plainDate.toString());
        } else {
          onChange?.('');
        }

        return { year, month, day };
      });
    },
    [onChange],
  );

  const { year, month, day } = date;

  const plainDate =
    year && month && day ? new Temporal.PlainDate(year, month, day) : undefined;

  return { date, plainDate, update };
}

export function useSegment(
  focus: FocusHandlers,
): InputHTMLAttributes<HTMLInputElement> {
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const input = event.currentTarget;

    // Focus the following segment after clearing the current one
    if (!input.value && !input.validity.badInput) {
      if (isBackspace(event)) {
        event.preventDefault();
        focus.previous();
      }

      if (isDelete(event)) {
        event.preventDefault();
        focus.next();
      }
    }
  };

  return { onKeyDown };
}

export function useYearSegment(
  state: PlainDateState,
  focus: FocusHandlers,
  minDate?: Temporal.PlainDate,
  maxDate?: Temporal.PlainDate,
): InputHTMLAttributes<HTMLInputElement> {
  const props = useSegment(focus);

  if (minDate && maxDate && minDate.year === maxDate.year) {
    // FIXME: Set value in state
    return {
      value: minDate.year,
      readOnly: true,
    };
  }

  const value = state.date.year;
  const placeholder = 'yyyy';

  const min = minDate ? minDate.year : 1;
  const max = maxDate ? maxDate.year : 9999;

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    const year = Number.parseInt(event.currentTarget.value, 10) || '';
    state.update({ year });
    // FIXME: Don't advance when changing the value using arrow keys
    // if (year && year > 999) {
    //   focus.next();
    // }
  };

  return { ...props, value, placeholder, min, max, onChange };
}

export function useMonthSegment(
  state: PlainDateState,
  focus: FocusHandlers,
  minDate?: Temporal.PlainDate,
  maxDate?: Temporal.PlainDate,
): InputHTMLAttributes<HTMLInputElement> {
  const props = useSegment(focus);

  if (
    minDate &&
    maxDate &&
    minDate.year === maxDate.year &&
    minDate.month === maxDate.month
  ) {
    // FIXME: Set value in state
    return {
      value: minDate.month,
      readOnly: true,
    };
  }

  const value = state.date.month;
  const placeholder = 'mm';

  let min = 1;
  let max = 12;

  const sameYear = minDate && maxDate && minDate.year === maxDate.year;

  if (sameYear || (minDate && minDate.year === state.date.year)) {
    min = minDate.month;
  }

  if (sameYear || (maxDate && maxDate.year === state.date.year)) {
    max = maxDate.month;
  }

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    const month = Number.parseInt(event.currentTarget.value, 10) || '';
    state.update({ month });
    // FIXME: Don't advance when changing the value using arrow keys
    // if (month && month > 1) {
    //   focus.next();
    // }
  };

  return { ...props, value, placeholder, min, max, onChange };
}

export function useDaySegment(
  state: PlainDateState,
  focus: FocusHandlers,
  minDate?: Temporal.PlainDate,
  maxDate?: Temporal.PlainDate,
): InputHTMLAttributes<HTMLInputElement> {
  const props = useSegment(focus);

  const value = state.date.day;
  const placeholder = 'dd';

  let min = 1;
  let max = 31;

  if (
    minDate &&
    maxDate &&
    minDate.year === maxDate.year &&
    minDate.month === maxDate.month
  ) {
    min = minDate.day;
    max = maxDate.day;
  }

  if (isNumber(state.date.year) && isNumber(state.date.month)) {
    const plainYearMonth = new Temporal.PlainYearMonth(
      state.date.year,
      state.date.month,
    );
    max = plainYearMonth.daysInMonth;

    if (
      minDate &&
      minDate.year === state.date.year &&
      minDate.month === state.date.month
    ) {
      min = minDate.day;
    }
    if (
      maxDate &&
      maxDate.year === state.date.year &&
      maxDate.month === state.date.month
    ) {
      max = maxDate.day;
    }
  }

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    const day = Number.parseInt(event.currentTarget.value, 10) || '';
    state.update({ day });
    // FIXME: Don't advance when changing the value using arrow keys
    // if (day && day > 3) {
    //   focus.next();
    // }
  };

  return { ...props, value, placeholder, min, max, onChange };
}

type FocusProps = { 'data-focus-list': string };
type FocusHandlers = { previous: () => void; next: () => void };

export function useSegmentFocus(): [FocusProps, FocusHandlers] {
  const name = useId();

  return useMemo(() => {
    const getElements = () => {
      const elements = document.querySelectorAll<HTMLElement>(
        `[data-focus-list="${name}"]`,
      );
      return Array.from(elements);
    };

    const getCurrentIndex = (elements: HTMLElement[]) => {
      const currentElement = document.activeElement as HTMLElement;
      return elements.indexOf(currentElement);
    };

    const previous = () => {
      const elements = getElements();
      const currentIndex = getCurrentIndex(elements);
      const newIndex = currentIndex - 1;

      if (newIndex < 0) {
        return;
      }

      elements[newIndex].focus();
    };

    const next = () => {
      const elements = getElements();
      const currentIndex = getCurrentIndex(elements);
      const newIndex = currentIndex + 1;

      if (newIndex >= elements.length) {
        return;
      }

      elements[newIndex].focus();
    };

    return [{ 'data-focus-list': name }, { previous, next }];
  }, [name]);
}
