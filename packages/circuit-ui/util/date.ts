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
import { formatDateTime } from '@sumup-oss/intl';

import type { Locale } from './i18n.js';

export type FirstDayOfWeek = 1 | 7;
export type DaysInWeek = number;
export type PlainDateRange =
  | []
  | [Temporal.PlainDate]
  | [Temporal.PlainDate, Temporal.PlainDate];

// ISO 8601 timestamps only support positive 4-digit years
export const MIN_YEAR = 1;
export const MAX_YEAR = 9999;

export const MIN_MONTH = 1;
export const MAX_MONTH = 12;

export const MIN_DAY = 1;
// MAX_DAY is not constant as it depends on the year and month

export function getTodaysDate() {
  return Temporal.Now.plainDateISO();
}

export function isPlainDate(date: unknown): date is Temporal.PlainDate {
  return date instanceof Temporal.PlainDate;
}

export function toPlainDate(date?: string): Temporal.PlainDate | undefined {
  if (!date) {
    return undefined;
  }
  try {
    return Temporal.PlainDate.from(date);
  } catch {
    return undefined;
  }
}

export function sortDateRange<T extends PlainDateRange>(dateRange: T): T {
  return dateRange.sort((a, b) => Temporal.PlainDate.compare(a, b)) as T;
}

export function clampDate(
  date: Temporal.PlainDate,
  minDate?: Temporal.PlainDate | null,
  maxDate?: Temporal.PlainDate | null,
): Temporal.PlainDate {
  if (minDate && Temporal.PlainDate.compare(date, minDate) < 0) {
    return minDate;
  }
  if (maxDate && Temporal.PlainDate.compare(date, maxDate) > 0) {
    return maxDate;
  }
  return date;
}

export function getFirstDateOfWeek(
  date: Temporal.PlainDate,
  firstDayOfWeek: FirstDayOfWeek,
): Temporal.PlainDate {
  const diff =
    (date.dayOfWeek < firstDayOfWeek ? date.daysInWeek : 0) +
    date.dayOfWeek -
    firstDayOfWeek;
  return date.subtract({ days: diff });
}

export function getLastDateOfWeek(
  date: Temporal.PlainDate,
  firstDayOfWeek: FirstDayOfWeek,
): Temporal.PlainDate {
  return getFirstDateOfWeek(date, firstDayOfWeek).add({
    days: date.daysInWeek - 1,
  });
}

export function getMonthName(month: number, locale?: Locale) {
  // The year can be arbitrary since the month names are the same every year
  const yearMonth = new Temporal.PlainYearMonth(2000, month, 'gregory');
  return formatDateTime(yearMonth, locale, { month: 'long' });
}
