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

import {
  CalendarActionType,
  calendarReducer,
  getDatesInRange,
  getMonthHeadline,
  getMonths,
  getSelectionType,
  getViewOfMonth,
  getWeekdays,
  initCalendar,
  isDateActive,
  isDateInMonthRange,
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
      const selection = new Temporal.PlainDate(2020, 3, 28);
      const minDate = null;
      const maxDate = null;
      const numberOfMonths = 1;
      const actual = initCalendar({
        selection,
        minDate,
        maxDate,
        numberOfMonths,
      });
      expect(actual.today.toString()).toBe('2020-03-15');
    });

    it('should return null for the hoveredDate date', () => {
      const selection = new Temporal.PlainDate(2020, 3, 28);
      const minDate = null;
      const maxDate = null;
      const numberOfMonths = 1;
      const actual = initCalendar({
        selection,
        minDate,
        maxDate,
        numberOfMonths,
      });
      expect(actual.hoveredDate).toBeNull();
    });

    it('should focus the currently selected date', () => {
      const selection = new Temporal.PlainDate(2020, 3, 28);
      const minDate = null;
      const maxDate = null;
      const numberOfMonths = 1;
      const actual = initCalendar({
        selection,
        minDate,
        maxDate,
        numberOfMonths,
      });
      expect(actual.focusedDate.toString()).toBe('2020-03-28');
    });

    it('should focus the start date of a selected date range', () => {
      const selection = {
        start: new Temporal.PlainDate(2020, 3, 18),
        end: new Temporal.PlainDate(2020, 3, 28),
      };
      const minDate = null;
      const maxDate = null;
      const numberOfMonths = 1;
      const actual = initCalendar({
        selection,
        minDate,
        maxDate,
        numberOfMonths,
      });
      expect(actual.focusedDate.toString()).toBe('2020-03-18');
    });

    it("should focus today's date if there is no selected date", () => {
      const selection = null;
      const minDate = null;
      const maxDate = null;
      const numberOfMonths = 1;
      const actual = initCalendar({
        selection,
        minDate,
        maxDate,
        numberOfMonths,
      });
      expect(actual.focusedDate.toString()).toBe('2020-03-15');
    });

    it('should focus the minimum date if the selected date is smaller', () => {
      const selection = new Temporal.PlainDate(2020, 3, 28);
      const minDate = new Temporal.PlainDate(2020, 4, 1);
      const maxDate = null;
      const numberOfMonths = 1;
      const actual = initCalendar({
        selection,
        minDate,
        maxDate,
        numberOfMonths,
      });
      expect(actual.focusedDate.toString()).toBe('2020-04-01');
    });

    it('should focus the maximum date if the selected date is larger', () => {
      const selection = new Temporal.PlainDate(2020, 3, 28);
      const minDate = null;
      const maxDate = new Temporal.PlainDate(2020, 3, 1);
      const numberOfMonths = 1;
      const actual = initCalendar({
        selection,
        minDate,
        maxDate,
        numberOfMonths,
      });
      expect(actual.focusedDate.toString()).toBe('2020-03-01');
    });

    it('should show the currently focused month', () => {
      const selection = new Temporal.PlainDate(2020, 4, 28);
      const minDate = null;
      const maxDate = new Temporal.PlainDate(2020, 3, 1);
      const numberOfMonths = 1;
      const actual = initCalendar({
        selection,
        minDate,
        maxDate,
        numberOfMonths,
      });
      expect(actual.months.toString()).toBe('2020-03');
    });

    it('should show the currently focused month and the following months', () => {
      const selection = new Temporal.PlainDate(2020, 4, 28);
      const minDate = null;
      const maxDate = null;
      const numberOfMonths = 3;
      const actual = initCalendar({
        selection,
        minDate,
        maxDate,
        numberOfMonths,
      });
      expect(actual.months).toHaveLength(numberOfMonths);
      expect(actual.months.toString()).toBe('2020-04,2020-05,2020-06');
    });
  });

  describe('calendarReducer', () => {
    const state = {
      today: new Temporal.PlainDate(2020, 3, 15),
      months: [new Temporal.PlainYearMonth(2020, 3)],
      focusedDate: new Temporal.PlainDate(2020, 3, 31),
      hoveredDate: null,
    };

    it('should move to the previous month', () => {
      const action = { type: CalendarActionType.PREV_MONTH } as const;
      const actual = calendarReducer(state, action);
      expect(actual.months.toString()).toBe('2020-02');
      expect(actual.focusedDate.toString()).toBe('2020-02-29');
    });

    it('should move to the next month', () => {
      const action = { type: CalendarActionType.NEXT_MONTH } as const;
      const actual = calendarReducer(state, action);
      expect(actual.months.toString()).toBe('2020-04');
      expect(actual.focusedDate.toString()).toBe('2020-04-30');
    });

    it('should increase the number of visible months', () => {
      const action = {
        type: CalendarActionType.NUMBER_OF_MONTHS,
        numberOfMonths: 2,
      } as const;
      const actual = calendarReducer(state, action);
      expect(actual.months).toHaveLength(2);
      expect(actual.months.toString()).toBe('2020-03,2020-04');
    });

    it('should decrease the number of visible months', () => {
      const action = {
        type: CalendarActionType.NUMBER_OF_MONTHS,
        numberOfMonths: 1,
      } as const;
      const actual = calendarReducer(
        {
          ...state,
          months: [
            new Temporal.PlainYearMonth(2020, 2),
            new Temporal.PlainYearMonth(2020, 3),
          ],
        },
        action,
      );
      expect(actual.months).toHaveLength(1);
      expect(actual.months.toString()).toBe('2020-03');
    });

    it('should update the focused date', () => {
      const action = {
        type: CalendarActionType.FOCUS_DATE,
        date: new Temporal.PlainDate(2020, 4, 3),
      } as const;
      const actual = calendarReducer(state, action);
      expect(actual.months.toString()).toBe('2020-04');
      expect(actual.focusedDate.toString()).toBe('2020-04-03');
    });

    it('should set the hovered date', () => {
      const action = {
        type: CalendarActionType.MOUSE_ENTER_DATE,
        date: new Temporal.PlainDate(2020, 4, 3),
      } as const;
      const actual = calendarReducer(state, action);
      expect(actual.hoveredDate?.toString()).toBe('2020-04-03');
    });

    it('should unset the hovered date', () => {
      const action = { type: CalendarActionType.MOUSE_LEAVE_DATE } as const;
      const actual = calendarReducer(state, action);
      expect(actual.hoveredDate).toBeNull();
    });
  });

  describe('getMonthHeadline', () => {
    it('should return the localized month name and year', () => {
      const yearMonth = new Temporal.PlainYearMonth(2020, 3);
      const locale = 'en-US';
      const actual = getMonthHeadline(yearMonth, locale);
      expect(actual).toBe('March 2020');
    });
  });

  describe('getWeekdays', () => {
    it('should return an ordered collection of weekdays', () => {
      const firstDayOfWeek = 1;
      const daysInWeek = 7;
      const locale = 'en-US';
      const actual = getWeekdays(firstDayOfWeek, daysInWeek, locale);
      expect(actual).toHaveLength(daysInWeek);
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
      const daysInWeek = 7;
      const locale = 'en-US';
      const actual = getWeekdays(firstDayOfWeek, daysInWeek, locale);
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
      const daysInWeek = 7;
      const locale = 'de-DE';
      const actual = getWeekdays(firstDayOfWeek, daysInWeek, locale);
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
      const daysInWeek = 7;
      const weeks = getViewOfMonth(yearMonth, firstDayOfWeek, daysInWeek);
      expect(weeks).toHaveLength(6);
      weeks.forEach((week) => {
        expect(week).toHaveLength(daysInWeek);
      });
      expect(weeks[0][0].toString()).toBe('2020-02-24');
      expect(weeks[5][6].toString()).toBe('2020-04-05');
    });

    it('should take the first day of the week into account', () => {
      const yearMonth = new Temporal.PlainYearMonth(2020, 3);
      const firstDayOfWeek = 7; // Sunday
      const daysInWeek = 7;
      const weeks = getViewOfMonth(yearMonth, firstDayOfWeek, daysInWeek);
      expect(weeks).toHaveLength(5);
      weeks.forEach((week) => {
        expect(week).toHaveLength(daysInWeek);
      });
      expect(weeks[0][0].toString()).toBe('2020-03-01');
      expect(weeks[4][6].toString()).toBe('2020-04-04');
    });
  });

  describe('isDateActive', () => {
    it('should return true if the date is selected', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const selection = new Temporal.PlainDate(2020, 3, 15);
      const actual = isDateActive(date, selection);
      expect(actual).toBe(true);
    });

    it('should return false if the date is not selected', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const selection = new Temporal.PlainDate(2020, 3, 16);
      const actual = isDateActive(date, selection);
      expect(actual).toBe(false);
    });

    it('should return true if the date matches the start and end of the selected range', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const selection = {
        start: new Temporal.PlainDate(2020, 3, 15),
        end: new Temporal.PlainDate(2020, 3, 15),
      };
      const actual = isDateActive(date, selection);
      expect(actual).toBe(true);
    });

    it('should return true if the date matches the start of the selected range', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const selection = {
        start: new Temporal.PlainDate(2020, 3, 15),
        end: new Temporal.PlainDate(2020, 3, 20),
      };
      const actual = isDateActive(date, selection);
      expect(actual).toBe(true);
    });

    it('should return true if the date is in the middle of the selected range', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const selection = {
        start: new Temporal.PlainDate(2020, 3, 10),
        end: new Temporal.PlainDate(2020, 3, 20),
      };
      const actual = isDateActive(date, selection);
      expect(actual).toBe(true);
    });

    it('should return true if the date matches the end of the selected range', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const selection = {
        start: new Temporal.PlainDate(2020, 3, 10),
        end: new Temporal.PlainDate(2020, 3, 15),
      };
      const actual = isDateActive(date, selection);
      expect(actual).toBe(true);
    });

    it('should return true if the date matches the start of an incomplete range', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const selection = {
        start: new Temporal.PlainDate(2020, 3, 15),
        end: undefined,
      };
      const actual = isDateActive(date, selection);
      expect(actual).toBe(true);
    });

    it('should return false for an empty range', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const selection = { start: undefined, end: undefined };
      const actual = isDateActive(date, selection);
      expect(actual).toBe(false);
    });

    it('should return false if the date falls outside the selected range', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const selection = {
        start: new Temporal.PlainDate(2020, 3, 16),
        end: new Temporal.PlainDate(2020, 3, 18),
      };
      const actual = isDateActive(date, selection);
      expect(actual).toBe(false);
    });

    it('should return false if the date does not match the start date of an incomplete range', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const selection = {
        start: new Temporal.PlainDate(2020, 3, 16),
        end: undefined,
      };
      const actual = isDateActive(date, selection);
      expect(actual).toBe(false);
    });

    it('should return false if there is no selection', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const selection = undefined;
      const actual = isDateActive(date, selection);
      expect(actual).toBe(false);
    });
  });

  describe('getSelectionType', () => {
    it('should return null if there is no selection', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const hoveredDate = new Temporal.PlainDate(2020, 3, 15);
      const selection = undefined;
      const actual = getSelectionType(date, hoveredDate, selection);
      expect(actual).toBeNull();
    });

    it('should return null if the date is not selected', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const hoveredDate = null;
      const selection = new Temporal.PlainDate(2020, 3, 16);
      const actual = getSelectionType(date, hoveredDate, selection);
      expect(actual).toBeNull();
    });

    it('should return null if the selected range is empty', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const hoveredDate = null;
      const selection = { start: undefined, end: undefined };
      const actual = getSelectionType(date, hoveredDate, selection);
      expect(actual).toBeNull();
    });

    it('should return "selected" if the date is selected', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const hoveredDate = null;
      const selection = new Temporal.PlainDate(2020, 3, 15);
      const actual = getSelectionType(date, hoveredDate, selection);
      expect(actual).toBe('selected');
    });

    it('should return "selected" if the date matches the start of an incomplete range', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const hoveredDate = null;
      const selection = {
        start: new Temporal.PlainDate(2020, 3, 15),
        end: undefined,
      };
      const actual = getSelectionType(date, hoveredDate, selection);
      expect(actual).toBe('selected');
    });

    it('should return "selected" if the start of an incomplete range matches the hovered date', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const hoveredDate = new Temporal.PlainDate(2020, 3, 15);
      const selection = {
        start: new Temporal.PlainDate(2020, 3, 15),
        end: undefined,
      };
      const actual = getSelectionType(date, hoveredDate, selection);
      expect(actual).toBe('selected');
    });

    it('should return "range-start" if the date matches the start of the selected range', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const hoveredDate = null;
      const selection = {
        start: new Temporal.PlainDate(2020, 3, 15),
        end: new Temporal.PlainDate(2020, 3, 25),
      };
      const actual = getSelectionType(date, hoveredDate, selection);
      expect(actual).toBe('range-start');
    });

    it('should return "range-start" if the date matches the start of an incomplete range and hovered date', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const hoveredDate = new Temporal.PlainDate(2020, 3, 25);
      const selection = {
        start: new Temporal.PlainDate(2020, 3, 15),
        end: undefined,
      };
      const actual = getSelectionType(date, hoveredDate, selection);
      expect(actual).toBe('range-start');
    });

    it('should return "range-middle" if the date is part of the selected range', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const hoveredDate = null;
      const selection = {
        start: new Temporal.PlainDate(2020, 3, 10),
        end: new Temporal.PlainDate(2020, 3, 20),
      };
      const actual = getSelectionType(date, hoveredDate, selection);
      expect(actual).toBe('range-middle');
    });

    it('should return "range-middle" if the date is between the incomplete range and hovered date', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const hoveredDate = new Temporal.PlainDate(2020, 3, 20);
      const selection = {
        start: new Temporal.PlainDate(2020, 3, 10),
        end: undefined,
      };
      const actual = getSelectionType(date, hoveredDate, selection);
      expect(actual).toBe('range-middle');
    });

    it('should return "range-end" if the date matches the end of the selected range', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const hoveredDate = null;
      const selection = {
        start: new Temporal.PlainDate(2020, 3, 5),
        end: new Temporal.PlainDate(2020, 3, 15),
      };
      const actual = getSelectionType(date, hoveredDate, selection);
      expect(actual).toBe('range-end');
    });

    it('should return "range-end" if the date matches the end of an incomplete range and hovered date', () => {
      const date = new Temporal.PlainDate(2020, 3, 20);
      const hoveredDate = new Temporal.PlainDate(2020, 3, 20);
      const selection = {
        start: new Temporal.PlainDate(2020, 3, 15),
        end: undefined,
      };
      const actual = getSelectionType(date, hoveredDate, selection);
      expect(actual).toBe('range-end');
    });

    it('should prioritize the end date over the hovered date', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const hoveredDate = new Temporal.PlainDate(2020, 3, 25);
      const selection = {
        start: new Temporal.PlainDate(2020, 3, 10),
        end: new Temporal.PlainDate(2020, 3, 15),
      };
      const actual = getSelectionType(date, hoveredDate, selection);
      expect(actual).toBe('range-end');
    });

    it('should ignore the hovered date if it is before the start of an incomplete range', () => {
      const date = new Temporal.PlainDate(2020, 3, 25);
      const hoveredDate = new Temporal.PlainDate(2020, 3, 5);
      const selection = {
        start: new Temporal.PlainDate(2020, 3, 15),
        end: undefined,
      };
      const actual = getSelectionType(date, hoveredDate, selection);
      expect(actual).toBeNull();
    });

    it('should return null if the date is not part of any range', () => {
      const date = new Temporal.PlainDate(2020, 3, 5);
      const hoveredDate = null;
      const selection = {
        start: new Temporal.PlainDate(2020, 3, 12),
        end: new Temporal.PlainDate(2020, 3, 15),
      };
      const actual = getSelectionType(date, hoveredDate, selection);
      expect(actual).toBeNull();
    });
  });

  describe('isDateInMonthRange', () => {
    it('should return true if the date is in the month range', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const minDate = new Temporal.PlainDate(2020, 1, 15);
      const maxDate = new Temporal.PlainDate(2020, 5, 15);
      const actual = isDateInMonthRange(date, minDate, maxDate);
      expect(actual).toBe(true);
    });

    it('should return true if there is no month range', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const minDate = null;
      const maxDate = null;
      const actual = isDateInMonthRange(date, minDate, maxDate);
      expect(actual).toBe(true);
    });

    it('should return true if the date month matches the min month', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const minDate = new Temporal.PlainDate(2020, 3, 5);
      const maxDate = null;
      const actual = isDateInMonthRange(date, minDate, maxDate);
      expect(actual).toBe(true);
    });

    it('should return true if the date month matches the max month', () => {
      const date = new Temporal.PlainDate(2020, 3, 15);
      const minDate = null;
      const maxDate = new Temporal.PlainDate(2020, 3, 25);
      const actual = isDateInMonthRange(date, minDate, maxDate);
      expect(actual).toBe(true);
    });

    it('should return false if the date month is smaller than the min month', () => {
      const date = new Temporal.PlainDate(2020, 2, 15);
      const minDate = new Temporal.PlainDate(2020, 3, 25);
      const maxDate = null;
      const actual = isDateInMonthRange(date, minDate, maxDate);
      expect(actual).toBe(false);
    });

    it('should return false if the date month is larger than the max month', () => {
      const date = new Temporal.PlainDate(2020, 4, 15);
      const minDate = null;
      const maxDate = new Temporal.PlainDate(2020, 3, 25);
      const actual = isDateInMonthRange(date, minDate, maxDate);
      expect(actual).toBe(false);
    });
  });

  describe('getMonths', () => {
    it('should shift the months backward if the focused date is before the current months', () => {
      const focusedDate = new Temporal.PlainDate(2020, 1, 15);
      const prevMonths = [
        new Temporal.PlainYearMonth(2020, 3),
        new Temporal.PlainYearMonth(2020, 4),
      ];
      const actual = getMonths(focusedDate, prevMonths);
      expect(actual).toHaveLength(2);
      expect(actual[0].toString()).toBe('2020-01');
      expect(actual[1].toString()).toBe('2020-02');
    });

    it('should shift the months forward if the focused date is after the current months', () => {
      const focusedDate = new Temporal.PlainDate(2020, 3, 15);
      const prevMonths = [
        new Temporal.PlainYearMonth(2020, 1),
        new Temporal.PlainYearMonth(2020, 2),
      ];
      const actual = getMonths(focusedDate, prevMonths);
      expect(actual).toHaveLength(2);
      expect(actual[0].toString()).toBe('2020-02');
      expect(actual[1].toString()).toBe('2020-03');
    });

    it('should return the current months if the focused date is in the first month', () => {
      const focusedDate = new Temporal.PlainDate(2020, 3, 15);
      const prevMonths = [
        new Temporal.PlainYearMonth(2020, 3),
        new Temporal.PlainYearMonth(2020, 4),
      ];
      const actual = getMonths(focusedDate, prevMonths);
      expect(actual).toHaveLength(2);
      expect(actual[0].toString()).toBe('2020-03');
      expect(actual[1].toString()).toBe('2020-04');
    });

    it('should return the current months if the focused date is in the last month', () => {
      const focusedDate = new Temporal.PlainDate(2020, 4, 15);
      const prevMonths = [
        new Temporal.PlainYearMonth(2020, 3),
        new Temporal.PlainYearMonth(2020, 4),
      ];
      const actual = getMonths(focusedDate, prevMonths);
      expect(actual).toHaveLength(2);
      expect(actual[0].toString()).toBe('2020-03');
      expect(actual[1].toString()).toBe('2020-04');
    });
  });
});
