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

import { describe, expect, it, vi } from 'vitest';
import { Temporal } from 'temporal-polyfill';

import { DAYS_IN_WEEK } from '../../util/date.js';

import {
  calendarReducer,
  getDatesInRange,
  getViewOfMonth,
  getWeekdays,
  initCalendar,
} from './CalendarService.js';

vi.mock('../../util/date.js', async (importOriginal) => {
  const module = await importOriginal<typeof import('../../util/date.js')>();
  return {
    ...module,
    getTodaysDate: vi.fn().mockReturnValue(new Temporal.PlainDate(2020, 3, 15)),
  };
});

describe('CalendarService', () => {
  describe('initCalendar', () => {
    it("should return today's date", () => {
      const selectedDate = new Temporal.PlainDate(2020, 3, 28);
      const minDate = null;
      const maxDate = null;
      const actual = initCalendar({ selectedDate, minDate, maxDate });
      expect(actual.today.toString()).toBe('2020-03-15');
    });

    it('should focus the currently selected date', () => {
      const selectedDate = new Temporal.PlainDate(2020, 3, 28);
      const minDate = null;
      const maxDate = null;
      const actual = initCalendar({ selectedDate, minDate, maxDate });
      expect(actual.focusedDate.toString()).toBe('2020-03-28');
    });

    it("should focus today's date if there is no selected date", () => {
      const selectedDate = null;
      const minDate = null;
      const maxDate = null;
      const actual = initCalendar({ selectedDate, minDate, maxDate });
      expect(actual.focusedDate.toString()).toBe('2020-03-15');
    });

    it('should focus the minimum date if the selected date is smaller', () => {
      const selectedDate = new Temporal.PlainDate(2020, 3, 28);
      const minDate = new Temporal.PlainDate(2020, 4, 1);
      const maxDate = null;
      const actual = initCalendar({ selectedDate, minDate, maxDate });
      expect(actual.focusedDate.toString()).toBe('2020-04-01');
    });

    it('should focus the maximum date if the selected date is larger', () => {
      const selectedDate = new Temporal.PlainDate(2020, 3, 28);
      const minDate = null;
      const maxDate = new Temporal.PlainDate(2020, 3, 1);
      const actual = initCalendar({ selectedDate, minDate, maxDate });
      expect(actual.focusedDate.toString()).toBe('2020-03-01');
    });

    it('should show the currently focused month', () => {
      const selectedDate = new Temporal.PlainDate(2020, 4, 28);
      const minDate = null;
      const maxDate = new Temporal.PlainDate(2020, 3, 1);
      const actual = initCalendar({ selectedDate, minDate, maxDate });
      expect(actual.yearMonth.toString()).toBe('2020-03');
    });
  });

  describe('calendarReducer', () => {
    const state = {
      today: new Temporal.PlainDate(2020, 3, 15),
      yearMonth: new Temporal.PlainYearMonth(2020, 3),
      focusedDate: new Temporal.PlainDate(2020, 3, 31),
    };

    it('should move to the previous month', () => {
      const action = { type: 'prev-month' } as const;
      const actual = calendarReducer(state, action);
      expect(actual.yearMonth.toString()).toBe('2020-02');
      expect(actual.focusedDate.toString()).toBe('2020-02-29');
    });

    it('should move to the next month', () => {
      const action = { type: 'next-month' } as const;
      const actual = calendarReducer(state, action);
      expect(actual.yearMonth.toString()).toBe('2020-04');
      expect(actual.focusedDate.toString()).toBe('2020-04-30');
    });

    it('should update the focused date', () => {
      const action = {
        type: 'focus-date',
        date: new Temporal.PlainDate(2020, 4, 3),
      } as const;
      const actual = calendarReducer(state, action);
      expect(actual.yearMonth.toString()).toBe('2020-04');
      expect(actual.focusedDate.toString()).toBe('2020-04-03');
    });
  });

  describe('getWeekdays', () => {
    it('should return an ordered collection of weekdays', () => {
      const firstDayOfWeek = 1;
      const locale = 'en-US';
      const actual = getWeekdays(firstDayOfWeek, locale);
      expect(actual).toHaveLength(DAYS_IN_WEEK);
      expect(actual).toEqual([
        { long: 'Monday', narrow: 'M' },
        { long: 'Tuesday', narrow: 'T' },
        { long: 'Wednesday', narrow: 'W' },
        { long: 'Thursday', narrow: 'T' },
        { long: 'Friday', narrow: 'F' },
        { long: 'Saturday', narrow: 'S' },
        { long: 'Sunday', narrow: 'S' },
      ]);
    });

    it('should start the weekdays on the specified first day', () => {
      const firstDayOfWeek = 7;
      const locale = 'en-US';
      const actual = getWeekdays(firstDayOfWeek, locale);
      expect(actual).toEqual([
        { long: 'Sunday', narrow: 'S' },
        { long: 'Monday', narrow: 'M' },
        { long: 'Tuesday', narrow: 'T' },
        { long: 'Wednesday', narrow: 'W' },
        { long: 'Thursday', narrow: 'T' },
        { long: 'Friday', narrow: 'F' },
        { long: 'Saturday', narrow: 'S' },
      ]);
    });

    it('should format the weekday names for the specified locale', () => {
      const firstDayOfWeek = 1;
      const locale = 'de-DE';
      const actual = getWeekdays(firstDayOfWeek, locale);
      expect(actual).toEqual([
        { long: 'Montag', narrow: 'M' },
        { long: 'Dienstag', narrow: 'D' },
        { long: 'Mittwoch', narrow: 'M' },
        { long: 'Donnerstag', narrow: 'D' },
        { long: 'Freitag', narrow: 'F' },
        { long: 'Samstag', narrow: 'S' },
        { long: 'Sonntag', narrow: 'S' },
      ]);
    });
  });

  describe('getDatesInRange', () => {
    it('should return a collection of dates between the start and end dates (inclusive)', () => {
      const startDate = new Temporal.PlainDate(2020, 3, 28);
      const endDate = new Temporal.PlainDate(2020, 4, 2);
      const actual = getDatesInRange(startDate, endDate);
      expect(actual).toHaveLength(6);
      expect(actual.map((date) => date.toString())).toEqual([
        '2020-03-28',
        '2020-03-29',
        '2020-03-30',
        '2020-03-31',
        '2020-04-01',
        '2020-04-02',
      ]);
    });
  });

  describe('getViewOfMonth', () => {
    it('should return a collection of days in the specified month, chunked into full weeks including the days outside of the month', () => {
      const yearMonth = new Temporal.PlainYearMonth(2020, 3);
      const firstDayOfWeek = 1; // Monday
      const weeks = getViewOfMonth(yearMonth, firstDayOfWeek);
      expect(weeks).toHaveLength(6);
      weeks.forEach((week) => {
        expect(week).toHaveLength(DAYS_IN_WEEK);
      });
      expect(weeks[0][0].toString()).toBe('2020-02-24');
      expect(weeks[5][6].toString()).toBe('2020-04-05');
    });

    it('should take the first day of the week into account', () => {
      const yearMonth = new Temporal.PlainYearMonth(2020, 3);
      const firstDayOfWeek = 7; // Sunday
      const weeks = getViewOfMonth(yearMonth, firstDayOfWeek);
      expect(weeks).toHaveLength(5);
      weeks.forEach((week) => {
        expect(week).toHaveLength(DAYS_IN_WEEK);
      });
      expect(weeks[0][0].toString()).toBe('2020-03-01');
      expect(weeks[4][6].toString()).toBe('2020-04-04');
    });
  });
});
