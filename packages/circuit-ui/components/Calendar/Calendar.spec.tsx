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
import { createRef } from 'react';

import {
  render,
  screen,
  userEvent,
  axe,
  waitFor,
  act,
} from '../../util/test-utils';
import type { PlainDateRange } from '../../util/date';

import { Calendar } from './Calendar';

vi.mock('../../util/date.js', async (importOriginal) => {
  const module = await importOriginal<typeof import('../../util/date.js')>();
  return {
    ...module,
    getTodaysDate: vi.fn().mockReturnValue(new Temporal.PlainDate(2020, 3, 12)),
  };
});

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

describe('Calendar', () => {
  const baseProps = {
    selection: new Temporal.PlainDate(2020, 3, 15),
    prevMonthButtonLabel: 'Previous month',
    nextMonthButtonLabel: 'Next month',
  };

  function getDayElement(day: number) {
    return screen.getByRole('button', { name: day.toString() });
  }
  function getSelectedDayElement() {
    return getDayElement(baseProps.selection.day);
  }

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    render(<Calendar {...baseProps} className={className} />);
    const group = screen.getByRole('group');
    expect(group?.className).toContain(className);
  });

  it('should forward a ref to the outer element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Calendar {...baseProps} ref={ref} />);
    const group = screen.getByRole('group');
    expect(ref.current).toBe(group);
  });

  it('should show the current month and year', () => {
    render(<Calendar {...baseProps} />);
    expect(screen.getByText('March 2020')).toBeVisible();
  });

  it('should mark today as the current date', () => {
    const { container } = render(<Calendar {...baseProps} />);
    const today = screen.getByRole('button', { name: '12' });
    // eslint-disable-next-line testing-library/no-container
    const currentDates = container.querySelectorAll('[aria-current="date"]');
    expect(currentDates).toHaveLength(1);
    expect(currentDates[0]).toEqual(today);
  });

  describe('navigation', () => {
    it('should navigate to the previous month', async () => {
      const spy = vi.fn();
      const onMonthsChange = vi.fn((months: Temporal.PlainYearMonth[]) => {
        spy(months.toString());
      });
      render(<Calendar {...baseProps} onMonthsChange={onMonthsChange} />);
      expect(screen.getByText('March 2020')).toBeVisible();
      const prevButton = screen.getByRole('button', {
        name: /previous month/i,
      });
      await userEvent.click(prevButton);
      expect(screen.getByText('February 2020')).toBeVisible();
      expect(onMonthsChange).toHaveBeenCalledTimes(2);
      expect(onMonthsChange).toHaveBeenCalledWith([
        new Temporal.PlainYearMonth(2020, 2),
      ]);
      // The assertion above returns true for any PlainYearMonth.
      // The assertion below verifies the specific month.
      expect(spy).toHaveBeenCalledWith('2020-02');
    });

    it('should navigate to the next month', async () => {
      const spy = vi.fn();
      const onMonthsChange = vi.fn((months: Temporal.PlainYearMonth[]) => {
        spy(months.toString());
      });
      render(<Calendar {...baseProps} onMonthsChange={onMonthsChange} />);
      expect(screen.getByText('March 2020')).toBeVisible();
      const nextButton = screen.getByRole('button', { name: /next month/i });
      await userEvent.click(nextButton);
      expect(screen.getByText('April 2020')).toBeVisible();
      expect(onMonthsChange).toHaveBeenCalledTimes(2);
      expect(onMonthsChange).toHaveBeenCalledWith([
        new Temporal.PlainYearMonth(2020, 4),
      ]);
      // The assertion above returns true for any PlainYearMonth.
      // The assertion below verifies the specific month.
      expect(spy).toHaveBeenCalledWith('2020-04');
    });

    it('should tab to the focused date', async () => {
      render(<Calendar {...baseProps} />);
      const prevButton = screen.getByRole('button', {
        name: /previous month/i,
      });
      const nextButton = screen.getByRole('button', { name: /next month/i });
      const selectedDay = getSelectedDayElement();
      await userEvent.tab();
      expect(document.activeElement).toEqual(prevButton);
      await userEvent.tab();
      expect(document.activeElement).toEqual(nextButton);
      await userEvent.tab();
      expect(document.activeElement).toEqual(selectedDay);
    });

    it('should navigate the date grid using the arrow keys', async () => {
      render(<Calendar {...baseProps} />);
      const selectedDay = getSelectedDayElement();
      act(() => {
        selectedDay.focus();
      });
      expect(document.activeElement).toEqual(selectedDay);
      await userEvent.keyboard('{ArrowRight}');
      await waitFor(() => {
        expect(document.activeElement).toEqual(getDayElement(16));
      });
      await userEvent.keyboard('{ArrowUp}');
      await waitFor(() => {
        expect(document.activeElement).toEqual(getDayElement(9));
      });
      await userEvent.keyboard('{ArrowLeft}');
      await waitFor(() => {
        expect(document.activeElement).toEqual(getDayElement(8));
      });
      await userEvent.keyboard('{ArrowDown}');
      await waitFor(() => {
        expect(document.activeElement).toEqual(getDayElement(15));
      });
    });

    it('should navigate the date grid using the page keys', async () => {
      render(<Calendar {...baseProps} />);
      const selectedDay = getSelectedDayElement();
      act(() => {
        selectedDay.focus();
      });
      expect(document.activeElement).toEqual(selectedDay);
      expect(screen.getByText('March 2020')).toBeVisible();
      await userEvent.keyboard('{PageUp}');
      await waitFor(() => {
        expect(screen.getByText('February 2020')).toBeVisible();
      });
      await wait(10);
      await userEvent.keyboard('{Shift>}{PageUp}');
      await waitFor(() => {
        expect(screen.getByText('February 2019')).toBeVisible();
      });
      await wait(10);
      await userEvent.keyboard('{PageDown}');
      await waitFor(() => {
        expect(screen.getByText('March 2019')).toBeVisible();
      });
      await wait(10);
      await userEvent.keyboard('{Shift>}{PageDown}');
      await waitFor(() => {
        expect(screen.getByText('March 2020')).toBeVisible();
      });
    });

    it('should navigate the date grid using the home and end keys', async () => {
      render(<Calendar {...baseProps} />);
      const selectedDay = getSelectedDayElement();
      act(() => {
        selectedDay.focus();
      });
      expect(document.activeElement).toEqual(selectedDay);
      await userEvent.keyboard('{Home}');
      await waitFor(() => {
        expect(document.activeElement).toEqual(getDayElement(9));
      });
      await userEvent.keyboard('{End}');
      await waitFor(() => {
        expect(document.activeElement).toEqual(getDayElement(15));
      });
    });
  });

  describe('selection', () => {
    it('should mark the selected date', () => {
      const { container } = render(<Calendar {...baseProps} />);
      const selectedDay = screen.getByRole('button', { name: '15' });
      // eslint-disable-next-line testing-library/no-container
      const selectedDays = container.querySelectorAll('[aria-pressed="true"]');
      expect(selectedDays).toHaveLength(1);
      expect(selectedDays[0]).toEqual(selectedDay);
    });

    it('should mark the selected date range', () => {
      const selection = [
        new Temporal.PlainDate(2020, 3, 15),
        new Temporal.PlainDate(2020, 3, 25),
      ] satisfies PlainDateRange;
      const { container } = render(
        <Calendar {...baseProps} selection={selection} />,
      );
      // eslint-disable-next-line testing-library/no-container
      const selectedDays = container.querySelectorAll('[aria-pressed="true"]');
      expect(selectedDays).toHaveLength(11);

      for (
        let index = selection[0].day;
        index <= selection[1].day;
        index += 1
      ) {
        const selectedDay = screen.getByRole('button', {
          name: index.toString(),
        });
        expect(selectedDay).toHaveAttribute('aria-pressed', 'true');
      }
    });

    it('should call the onSelect callback when clicking a date', async () => {
      const spy = vi.fn();
      const onSelect = vi.fn((date: Temporal.PlainDate) => {
        spy(date.toString());
      });
      render(<Calendar {...baseProps} onSelect={onSelect} />);
      const march21 = getDayElement(21);
      await userEvent.click(march21);
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect).toHaveBeenCalledWith(
        new Temporal.PlainDate(2020, 3, 21),
      );
      // The assertion above returns true for any PlainDate.
      // The assertion below verifies the specific date.
      expect(spy).toHaveBeenCalledWith('2020-03-21');
    });

    it('should call the onSelect callback when pressing a date', async () => {
      const spy = vi.fn();
      const onSelect = vi.fn((date: Temporal.PlainDate) => {
        spy(date.toString());
      });
      render(<Calendar {...baseProps} onSelect={onSelect} />);
      const march21 = getDayElement(21);
      march21.focus();
      await userEvent.keyboard('{Enter}');
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect).toHaveBeenCalledWith(
        new Temporal.PlainDate(2020, 3, 21),
      );
      // The assertion above returns true for any PlainDate.
      // The assertion below verifies the specific date.
      expect(spy).toHaveBeenCalledWith('2020-03-21');
    });
  });

  describe('disabled dates', () => {
    it('should disable the previous month button when the preceding month is before the minimum date', async () => {
      const minDate = new Temporal.PlainDate(2020, 3, 5);
      render(<Calendar {...baseProps} minDate={minDate} />);
      const prevButton = screen.getByRole('button', {
        name: /previous month/i,
      });
      expect(prevButton).toHaveAttribute('aria-disabled', 'true');
      await userEvent.click(prevButton);
      expect(screen.getByText('March 2020')).toBeVisible();
    });

    it('should disable the next month button when the following month is after the maximum date', async () => {
      const maxDate = new Temporal.PlainDate(2020, 3, 25);
      render(<Calendar {...baseProps} maxDate={maxDate} />);
      const nextButton = screen.getByRole('button', {
        name: /next month/i,
      });
      expect(nextButton).toHaveAttribute('aria-disabled', 'true');
      await userEvent.click(nextButton);
      expect(screen.getByText('March 2020')).toBeVisible();
    });

    it('should disable the dates before the minimum date', async () => {
      const minDate = new Temporal.PlainDate(2020, 3, 10);
      render(<Calendar {...baseProps} minDate={minDate} />);
      const march10 = getDayElement(10);
      expect(march10).not.toHaveAttribute('aria-disabled', 'true');
      const march9 = getDayElement(9);
      expect(march9).toHaveAttribute('aria-disabled', 'true');
      await userEvent.click(march9);
      expect(march9).not.toHaveAttribute('aria-pressed', 'true');
    });

    it('should disable the dates after the maximum date', async () => {
      const maxDate = new Temporal.PlainDate(2020, 3, 20);
      render(<Calendar {...baseProps} maxDate={maxDate} />);
      const march20 = getDayElement(20);
      expect(march20).not.toHaveAttribute('aria-disabled', 'true');
      const march21 = getDayElement(21);
      expect(march21).toHaveAttribute('aria-disabled', 'true');
      await userEvent.click(march21);
      expect(march21).not.toHaveAttribute('aria-pressed', 'true');
    });

    it('should disable specific dates using modifiers', () => {
      const modifiers = {
        '2020-03-21': { disabled: true },
      };
      render(<Calendar {...baseProps} modifiers={modifiers} />);
      const march21 = getDayElement(21);
      expect(march21).toHaveAttribute('aria-disabled', 'true');
    });
  });

  it('should add a description to specific dates using modifiers', () => {
    const modifiers = {
      '2020-03-21': { description: 'Booked' },
    };
    render(<Calendar {...baseProps} modifiers={modifiers} />);
    const march21 = getDayElement(21);
    expect(march21).toHaveAccessibleDescription('Booked');
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = render(<Calendar {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
