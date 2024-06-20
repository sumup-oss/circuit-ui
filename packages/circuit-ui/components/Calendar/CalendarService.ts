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

// biome-ignore lint/suspicious/noShadowRestrictedNames: Necessary to add support for Temporal objects to the`Intl` APIs
import { Temporal, Intl } from 'temporal-polyfill';

import type { Locale } from '../../util/i18n.js';
import { chunk, last } from '../../util/helpers.js';
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
  months: Temporal.PlainYearMonth[];
  focusedDate: Temporal.PlainDate;
  hoveredDate: Temporal.PlainDate | null;
};

export enum CalendarActionType {
  PREV_MONTH,
  NEXT_MONTH,
  NUMBER_OF_MONTHS,
  FOCUS_DATE,
  MOUSE_ENTER_DATE,
  MOUSE_LEAVE_DATE,
}

type CalendarAction =
  | { type: CalendarActionType.PREV_MONTH }
  | { type: CalendarActionType.NEXT_MONTH }
  | { type: CalendarActionType.NUMBER_OF_MONTHS; numberOfMonths: number }
  | { type: CalendarActionType.FOCUS_DATE; date: Temporal.PlainDate }
  | { type: CalendarActionType.MOUSE_ENTER_DATE; date: Temporal.PlainDate }
  | { type: CalendarActionType.MOUSE_LEAVE_DATE };

export function initCalendar({
  selection,
  minDate,
  maxDate,
  numberOfMonths,
}: {
  selection?: Temporal.PlainDate | PlainDateRange | null;
  minDate?: Temporal.PlainDate | null;
  maxDate?: Temporal.PlainDate | null;
  numberOfMonths: number;
}): CalendarState {
  const today = getTodaysDate();
  let date: Temporal.PlainDate | undefined;
  if (selection) {
    date = isPlainDate(selection) ? selection : sortDateRange(selection)[0];
  }
  const focusedDate = clampDate(date || today, minDate, maxDate);
  const hoveredDate = null;
  const months = Array.from(Array(numberOfMonths)).map((_, index) =>
    Temporal.PlainYearMonth.from(focusedDate).add({ months: index }),
  );
  return { today, months, focusedDate, hoveredDate };
}

export function calendarReducer(
  state: CalendarState,
  action: CalendarAction,
): CalendarState {
  switch (action.type) {
    case CalendarActionType.PREV_MONTH: {
      const months = state.months.map((month) => month.subtract({ months: 1 }));
      const focusedDate = isDateInMonths(state.focusedDate, months)
        ? state.focusedDate
        : state.focusedDate.subtract({ months: 1 });
      return { ...state, months, focusedDate };
    }
    case CalendarActionType.NEXT_MONTH: {
      const months = state.months.map((month) => month.add({ months: 1 }));
      const focusedDate = isDateInMonths(state.focusedDate, months)
        ? state.focusedDate
        : state.focusedDate.add({ months: 1 });
      return { ...state, months, focusedDate };
    }
    case CalendarActionType.NUMBER_OF_MONTHS: {
      if (state.months.length === action.numberOfMonths) {
        return state;
      }
      const months = Array.from(Array(action.numberOfMonths)).map((_, index) =>
        Temporal.PlainYearMonth.from(state.focusedDate).add({ months: index }),
      );
      return { ...state, months };
    }
    case CalendarActionType.FOCUS_DATE: {
      const focusedDate = action.date;
      const months = getMonths(focusedDate, state.months);
      return { ...state, focusedDate, months };
    }
    case CalendarActionType.MOUSE_ENTER_DATE:
      return { ...state, hoveredDate: action.date };
    case CalendarActionType.MOUSE_LEAVE_DATE:
      return { ...state, hoveredDate: null };
    default:
      return state;
  }
}

export function getMonths(
  focusedDate: Temporal.PlainDate,
  prevMonths: Temporal.PlainYearMonth[],
) {
  const focusedMonth = Temporal.PlainYearMonth.from(focusedDate);

  if (Temporal.PlainYearMonth.compare(focusedMonth, prevMonths[0]) < 0) {
    return prevMonths.map((_, index) => focusedMonth.add({ months: index }));
  }
  if (Temporal.PlainYearMonth.compare(focusedMonth, last(prevMonths)) > 0) {
    return prevMonths.map((_, index) =>
      focusedMonth.subtract({ months: prevMonths.length - index - 1 }),
    );
  }
  return prevMonths;
}

type Weekday = { narrow: string; long: string };
type Weekdays = [Weekday, Weekday, Weekday, Weekday, Weekday, Weekday, Weekday];

export function getWeekdays(
  firstDayOfWeek: FirstDayOfWeek = 1,
  daysInWeek: DaysInWeek = 7,
  locale?: Locale,
  calendar?: string,
) {
  const narrow = new Intl.DateTimeFormat(locale, {
    weekday: 'narrow',
    calendar,
  });
  const long = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    calendar,
  });
  return Array.from(Array(daysInWeek)).map((_, index) => {
    // 1973 started with a Monday
    const date = new Temporal.PlainDate(1973, 1, index + firstDayOfWeek);
    return {
      narrow: narrow.format(date),
      long: long.format(date),
    };
  }) as Weekdays;
}

export function getMonthHeadline(
  yearMonth: Temporal.PlainYearMonth,
  locale?: Locale,
  calendar = 'iso8601',
) {
  const intl = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    calendar,
  });
  return intl.format(yearMonth);
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
  const [startDate, endDate] = sortDateRange(selection);
  if (
    endDate ||
    (hoveredDate && Temporal.PlainDate.compare(hoveredDate, startDate) > 0)
  ) {
    const laterDate = (endDate || hoveredDate) as Temporal.PlainDate;
    if (date.equals(startDate) && date.equals(laterDate)) {
      return 'selected';
    }
    if (date.equals(startDate)) {
      return 'range-start';
    }
    if (date.equals(laterDate)) {
      return 'range-end';
    }
    if (
      Temporal.PlainDate.compare(date, startDate) > 0 &&
      Temporal.PlainDate.compare(date, laterDate) < 0
    ) {
      return 'range-middle';
    }
  }
  if (date.equals(selection[0])) {
    return 'selected';
  }
  return null;
}

export function isDateInMonthRange(
  date: Temporal.PlainDate,
  minDate?: Temporal.PlainDate | null,
  maxDate?: Temporal.PlainDate | null,
): boolean {
  if (
    (minDate && Temporal.PlainYearMonth.compare(date, minDate) < 0) ||
    (maxDate && Temporal.PlainYearMonth.compare(date, maxDate) > 0)
  ) {
    return false;
  }
  return true;
}

export function isDateInMonths(
  date: Temporal.PlainDate,
  months: Temporal.PlainYearMonth[],
) {
  return months.some((month) => month.equals(date));
}
