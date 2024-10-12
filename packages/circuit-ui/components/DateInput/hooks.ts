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

import { toPlainDate } from '../../util/date.js';
import { clamp } from '../../util/helpers.js';
import { isNumber } from '../../util/type-check.js';
import { isBackspace, isDelete } from '../../util/key-codes.js';

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
  update: (date: PartialPlainDate) => void;
  minDate?: Temporal.PlainDate;
  maxDate?: Temporal.PlainDate;
};

export function usePlainDateState(props: {
  value?: string;
  min?: string;
  max?: string;
  onChange: (date: string) => void;
}): PlainDateState {
  const [date, setDate] = useState<PartialPlainDate>(() => {
    const plainDate = toPlainDate(props.value);
    if (!plainDate) {
      return { day: '', month: '', year: '' };
    }
    const { year, month, day } = plainDate;
    return { year, month, day };
  });

  const { year, month, day } = date;

  useEffect(() => {
    if (isNumber(year) && isNumber(month) && isNumber(day)) {
      const plainDate = new Temporal.PlainDate(year, month, day);
      props.onChange(plainDate.toString());
    } else {
      props.onChange('');
    }
  }, [year, month, day, props.onChange]);

  const update = useCallback((newDate: PartialPlainDate) => {
    setDate((prevDate) => ({ ...prevDate, ...newDate }));
  }, []);

  const minDate = toPlainDate(props.min);
  const maxDate = toPlainDate(props.max);

  return { date, update, minDate, maxDate };
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
): InputHTMLAttributes<HTMLInputElement> {
  const props = useSegment(focus);

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

  const value = state.date.year;
  const placeholder = 'yyyy';
  const min = state.minDate ? state.minDate.year : 1;
  const max = state.maxDate ? state.maxDate.year : 9999;

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(event.currentTarget.value, 10);
    // FIXME: Clamping makes for a confusing user experience, especially with custom min and max dates 🤔
    const year = newValue ? clamp(newValue, min, max) : '';
    state.update({ year });
    if (year && year > 999) {
      focus.next();
    }
  };

  return { ...props, value, placeholder, min, max, onChange };
}

export function useMonthSegment(
  state: PlainDateState,
  focus: FocusHandlers,
): InputHTMLAttributes<HTMLInputElement> {
  const props = useSegment(focus);

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

  const value = state.date.month;
  const placeholder = 'mm';
  let min = 1;
  let max = 12;

  if (state.minDate && state.minDate.year === state.date.year) {
    min = state.minDate.month;
  }

  if (state.maxDate && state.maxDate.year === state.date.year) {
    max = state.maxDate.month;
  }

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(event.currentTarget.value, 10);
    // FIXME: Clamping makes for a confusing user experience, especially with custom min and max dates 🤔
    const month = newValue ? clamp(newValue, min, max) : '';
    state.update({ month });
    if (month && month > 1) {
      focus.next();
    }
  };

  return { ...props, value, placeholder, min, max, onChange };
}

export function useDaySegment(
  state: PlainDateState,
  focus: FocusHandlers,
): InputHTMLAttributes<HTMLInputElement> {
  const props = useSegment(focus);

  const value = state.date.day;
  const placeholder = 'dd';
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
    const newValue = Number.parseInt(event.currentTarget.value, 10);
    // FIXME: Clamping makes for a confusing user experience, especially with custom min and max dates 🤔
    const day = newValue ? clamp(newValue, min, max) : '';
    state.update({ day });
    if (day && day > 3) {
      focus.next();
    }
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
