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

import { Temporal } from 'temporal-polyfill';
import { formatDateTime } from '@sumup/intl';

import type { Locale } from '../../util/i18n.js';
import { chunk } from '../../util/helpers.js';
import {
  clampDate,
  getFirstDateOfWeek,
  getLastDateOfWeek,
  getTodaysDate,
  isPlainDate,
  sortDateRange,
  type DaysInWeek,
  type FirstDayOfWeek,
  type PlainDateRange,
} from '../../util/date.js';

type CalendarState = {
  today: Temporal.PlainDate;
  focusedDate: Temporal.PlainDate;
  hoveredDate: Temporal.PlainDate | null;
  yearMonth: Temporal.PlainYearMonth;
};

type CalendarAction =
  | { type: 'prev-month' }
  | { type: 'next-month' }
  | { type: 'focus-date'; date: Temporal.PlainDate }
  | { type: 'mouse-enter-date'; date: Temporal.PlainDate }
  | { type: 'mouse-leave-date' };

export function initCalendar({
  selection,
  minDate,
  maxDate,
}: {
  selection?: Temporal.PlainDate | PlainDateRange | null;
  minDate?: Temporal.PlainDate | null;
  maxDate?: Temporal.PlainDate | null;
}): CalendarState {
  const today = getTodaysDate();
  let date: Temporal.PlainDate | undefined;
  if (selection) {
    date = isPlainDate(selection) ? selection : sortDateRange(selection)[0];
  }
  const focusedDate = clampDate(date || today, minDate, maxDate);
  const hoveredDate = null;
  const yearMonth = Temporal.PlainYearMonth.from(focusedDate);
  return { today, focusedDate, hoveredDate, yearMonth };
}

export function calendarReducer(
  state: CalendarState,
  action: CalendarAction,
): CalendarState {
  switch (action.type) {
    case 'prev-month':
      return {
        ...state,
        focusedDate: state.focusedDate.subtract({ months: 1 }),
        yearMonth: state.yearMonth.subtract({ months: 1 }),
      };
    case 'next-month':
      return {
        ...state,
        focusedDate: state.focusedDate.add({ months: 1 }),
        yearMonth: state.yearMonth.add({ months: 1 }),
      };
    case 'focus-date':
      return {
        ...state,
        focusedDate: action.date,
        yearMonth: Temporal.PlainYearMonth.from(action.date),
      };
    case 'mouse-enter-date':
      return {
        ...state,
        hoveredDate: action.date,
      };
    case 'mouse-leave-date':
      return {
        ...state,
        hoveredDate: null,
      };
    default:
      return state;
  }
}

type Weekday = { narrow: string; long: string };
type Weekdays = [Weekday, Weekday, Weekday, Weekday, Weekday, Weekday, Weekday];

export function getWeekdays(
  firstDayOfWeek: FirstDayOfWeek = 1,
  daysInWeek: DaysInWeek = 7,
  locale?: Locale,
) {
  return Array.from(Array(daysInWeek)).map((_, i) => {
    const index = i + firstDayOfWeek;
    // 1971 started with a Monday
    const date = new Date(Date.UTC(1971, 1, index));
    return {
      narrow: formatDateTime(date, locale, { weekday: 'narrow' }),
      long: formatDateTime(date, locale, { weekday: 'long' }),
    };
  }) as Weekdays;
}

export function getDatesInRange(
  startDate: Temporal.PlainDate,
  endDate: Temporal.PlainDate,
): Temporal.PlainDate[] {
  const duration = { days: 1 };
  const days: Temporal.PlainDate[] = [startDate];
  let current = startDate;

  while (!current.equals(endDate)) {
    current = current.add(duration);
    days.push(current);
  }

  return days;
}

export function getViewOfMonth(
  yearMonth: Temporal.PlainYearMonth,
  firstDayOfWeek: FirstDayOfWeek = 1,
  daysInWeek: DaysInWeek = 7,
): Temporal.PlainDate[][] {
  const firstDayOfMonth = yearMonth.toPlainDate({ day: 1 });
  const lastDayOfMonth = firstDayOfMonth.add({
    days: yearMonth.daysInMonth - 1,
  });
  const firstDateOfWeek = getFirstDateOfWeek(firstDayOfMonth, firstDayOfWeek);
  const lastDateOfWeek = getLastDateOfWeek(lastDayOfMonth, firstDayOfWeek);
  return chunk(getDatesInRange(firstDateOfWeek, lastDateOfWeek), daysInWeek);
}

export function isDateActive(
  date: Temporal.PlainDate,
  selection?: Temporal.PlainDate | PlainDateRange,
): boolean {
  if (!selection) {
    return false;
  }
  if (isPlainDate(selection)) {
    return date.equals(selection);
  }
  const [startDate, endDate] = sortDateRange(selection);
  if (startDate && endDate) {
    return (
      Temporal.PlainDate.compare(date, startDate) >= 0 &&
      Temporal.PlainDate.compare(date, endDate) <= 0
    );
  }
  if (startDate) {
    return date.equals(startDate);
  }
  return false;
}

export function getSelectionType(
  date: Temporal.PlainDate,
  hoveredDate: Temporal.PlainDate | null,
  selection?: Temporal.PlainDate | PlainDateRange,
): 'selected' | 'range-start' | 'range-middle' | 'range-end' | null {
  if (!selection) {
    return null;
  }
  if (isPlainDate(selection)) {
    return date.equals(selection) ? 'selected' : null;
  }
  if (selection.length === 0) {
    return null;
  }
  if (selection[1] || hoveredDate) {
    const range = [selection[0], selection[1] || hoveredDate] as [
      Temporal.PlainDate,
      Temporal.PlainDate,
    ];
    const [startDate, endDate] = sortDateRange(range);
    if (date.equals(startDate) && date.equals(endDate)) {
      return 'selected';
    }
    if (date.equals(startDate)) {
      return 'range-start';
    }
    if (date.equals(endDate)) {
      return 'range-end';
    }
    if (
      Temporal.PlainDate.compare(date, startDate) > 0 &&
      Temporal.PlainDate.compare(date, endDate) < 0
    ) {
      return 'range-middle';
    }
  }
  if (date.equals(selection[0])) {
    return 'selected';
  }
  return null;
}
