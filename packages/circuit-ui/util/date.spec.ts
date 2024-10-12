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

import { describe, expect, it } from 'vitest';
import { Temporal } from 'temporal-polyfill';

import {
  clampDate,
  getFirstDateOfWeek,
  getLastDateOfWeek,
  isPlainDate,
  sortDateRange,
  toPlainDate,
  type PlainDateRange,
} from './date.js';

describe('CalendarService', () => {
  describe('isPlainDate', () => {
    it('should return true for a PlainDate', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const actual = isPlainDate(date);
      expect(actual).toBe(true);
    });

    it('should return false for a Date', () => {
      const date = new Date(2020, 3, 15);
      const actual = isPlainDate(date);
      expect(actual).toBe(false);
    });

    it('should return false for a PlainDateRange', () => {
      const date = {
        from: new Temporal.PlainDate(2020, 3, 15),
        to: new Temporal.PlainDate(2020, 3, 25),
      };
      const actual = isPlainDate(date);
      expect(actual).toBe(false);
    });
  });

  describe('toPlainDate', () => {
    it('should convert an ISO-8601 date string to a PlainDate', () => {
      const date = '2020-03-01';
      const actual = toPlainDate(date);
      expect(actual).toEqual(new Temporal.PlainDate(2020, 3, 1));
    });

    it('should return undefined if the date is invalid', () => {
      const date = '2020-3-1';
      const actual = toPlainDate(date);
      expect(actual).toBeUndefined();
    });

    it('should return null if the date is undefined', () => {
      const date = undefined;
      const actual = toPlainDate(date);
      expect(actual).toBeUndefined();
    });
  });

  describe('sortDateRange', () => {
    it('should sort the start and end date in ascending order', () => {
      const dateRange: PlainDateRange = [
        new Temporal.PlainDate(2020, 3, 25),
        new Temporal.PlainDate(2020, 3, 15),
      ];
      const actual = sortDateRange(dateRange);
      expect(actual[0].toString()).toBe('2020-03-15');
      expect(actual[1].toString()).toBe('2020-03-25');
    });
  });

  describe('clampDate', () => {
    it('should return the date if it is within the range', () => {
      const date = new Temporal.PlainDate(2020, 3, 5);
      const minDate = new Temporal.PlainDate(2020, 3, 1);
      const maxDate = new Temporal.PlainDate(2020, 3, 10);
      const actual = clampDate(date, minDate, maxDate);
      expect(actual).toEqual(date);
    });

    it('should return the date if it matches the minimum date', () => {
      const date = new Temporal.PlainDate(2020, 3, 1);
      const minDate = new Temporal.PlainDate(2020, 3, 1);
      const maxDate = new Temporal.PlainDate(2020, 3, 10);
      const actual = clampDate(date, minDate, maxDate);
      expect(actual).toEqual(date);
    });

    it('should return the date if it matches the maximum date', () => {
      const date = new Temporal.PlainDate(2020, 3, 10);
      const minDate = new Temporal.PlainDate(2020, 3, 1);
      const maxDate = new Temporal.PlainDate(2020, 3, 10);
      const actual = clampDate(date, minDate, maxDate);
      expect(actual).toEqual(date);
    });

    it('should return the minimum date if the date lies before it', () => {
      const date = new Temporal.PlainDate(2020, 3, 4);
      const minDate = new Temporal.PlainDate(2020, 3, 5);
      const maxDate = new Temporal.PlainDate(2020, 3, 10);
      const actual = clampDate(date, minDate, maxDate);
      expect(actual).toEqual(minDate);
    });

    it('should return the maximum date if the date lies after it', () => {
      const date = new Temporal.PlainDate(2020, 3, 11);
      const minDate = new Temporal.PlainDate(2020, 3, 5);
      const maxDate = new Temporal.PlainDate(2020, 3, 10);
      const actual = clampDate(date, minDate, maxDate);
      expect(actual).toEqual(maxDate);
    });
  });

  describe('getFirstDateOfWeek', () => {
    it('should return the first date of the week for a date', () => {
      const date = new Temporal.PlainDate(2020, 3, 28); // Saturday
      const firstDayOfWeek = 1; // Monday
      const actual = getFirstDateOfWeek(date, firstDayOfWeek);
      expect(actual.toString()).toBe('2020-03-23'); // Monday
    });

    it('should take the first day of the week into account', () => {
      const date = new Temporal.PlainDate(2020, 3, 28); // Saturday
      const firstDayOfWeek = 7; // Sunday
      const actual = getFirstDateOfWeek(date, firstDayOfWeek);
      expect(actual.toString()).toBe('2020-03-22'); // Sunday
    });

    it('should return the date if it is the first day of the week', () => {
      const date = new Temporal.PlainDate(2020, 3, 29); // Sunday
      const firstDayOfWeek = 7; // Sunday
      const actual = getFirstDateOfWeek(date, firstDayOfWeek);
      expect(actual.toString()).toBe('2020-03-29'); // Sunday
    });
  });

  describe('getLastDateOfWeek', () => {
    it('should return the last date of the week for a date', () => {
      const date = new Temporal.PlainDate(2020, 3, 31); // Tuesday
      const firstDayOfWeek = 1; // Monday
      const actual = getLastDateOfWeek(date, firstDayOfWeek);
      expect(actual.toString()).toBe('2020-04-05'); // Sunday
    });

    it('should take the first day of the week into account', () => {
      const date = new Temporal.PlainDate(2020, 3, 31); // Tuesday
      const firstDayOfWeek = 7; // Sunday
      const actual = getLastDateOfWeek(date, firstDayOfWeek);
      expect(actual.toString()).toBe('2020-04-04'); // Saturday
    });

    it('should return the date if it is the last day of the week', () => {
      const date = new Temporal.PlainDate(2020, 3, 28); // Saturday
      const firstDayOfWeek = 7; // Sunday
      const actual = getLastDateOfWeek(date, firstDayOfWeek);
      expect(actual.toString()).toBe('2020-03-28'); // Saturday
    });
  });
});
