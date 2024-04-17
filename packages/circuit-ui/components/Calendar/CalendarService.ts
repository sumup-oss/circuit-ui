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
  DAYS_IN_WEEK,
  clampDate,
  getFirstDateOfWeek,
  getLastDateOfWeek,
  getTodaysDate,
  type FirstDayOfWeek,
} from '../../util/date.js';

type CalendarState = {
  today: Temporal.PlainDate;
  focusedDate: Temporal.PlainDate;
  yearMonth: Temporal.PlainYearMonth;
};

type CalendarAction =
  | { type: 'prev-month' }
  | { type: 'next-month' }
  | { type: 'focus-date'; date: Temporal.PlainDate };

export function initCalendar({
  selectedDate,
  minDate,
  maxDate,
}: {
  selectedDate: Temporal.PlainDate | null;
  minDate: Temporal.PlainDate | null;
  maxDate: Temporal.PlainDate | null;
}): CalendarState {
  const today = getTodaysDate();
  const focusedDate = clampDate(selectedDate || today, minDate, maxDate);
  const yearMonth = Temporal.PlainYearMonth.from(focusedDate);
  return { today, focusedDate, yearMonth };
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
    default:
      return state;
  }
}

export type Weekdays = [
  Weekday,
  Weekday,
  Weekday,
  Weekday,
  Weekday,
  Weekday,
  Weekday,
];
type Weekday = {
  narrow: string;
  long: string;
};

export function getWeekdays(firstDayOfWeek: FirstDayOfWeek, locale?: Locale) {
  return Array.from(Array(DAYS_IN_WEEK)).map((_, i) => {
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
): Temporal.PlainDate[][] {
  const firstDayOfMonth = yearMonth.toPlainDate({ day: 1 });
  const lastDayOfMonth = firstDayOfMonth.add({
    days: yearMonth.daysInMonth - 1,
  });
  const firstDateOfWeek = getFirstDateOfWeek(firstDayOfMonth, firstDayOfWeek);
  const lastDateOfWeek = getLastDateOfWeek(lastDayOfMonth, firstDayOfWeek);
  return chunk(getDatesInRange(firstDateOfWeek, lastDateOfWeek), DAYS_IN_WEEK);
}
