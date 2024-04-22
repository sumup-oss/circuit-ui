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

import { describe, it, vi } from 'vitest';
import { Temporal } from 'temporal-polyfill';

import {
  render,
  screen,
  userEvent,
  axe,
  waitFor,
} from '../../util/test-utils.js';

import { Calendar } from './Calendar.js';

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
    selectedDate: new Temporal.PlainDate(2020, 3, 15),
    prevMonthButtonLabel: 'Previous month',
    nextMonthButtonLabel: 'Next month',
  };

  function getDateElement(day: number) {
    return screen.getByRole('button', { name: day.toString() });
  }
  function getSelectedDateElement() {
    return getDateElement(baseProps.selectedDate.day);
  }

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
      const onMonthChange = vi.fn((yearMonth: Temporal.PlainYearMonth) => {
        spy(yearMonth.toString());
      });
      render(<Calendar {...baseProps} onMonthChange={onMonthChange} />);
      expect(screen.getByText('March 2020')).toBeVisible();
      const prevButton = screen.getByRole('button', {
        name: /previous month/i,
      });
      await userEvent.click(prevButton);
      expect(screen.getByText('February 2020')).toBeVisible();
      expect(onMonthChange).toHaveBeenCalledTimes(2);
      expect(onMonthChange).toHaveBeenCalledWith(
        new Temporal.PlainYearMonth(2020, 2),
      );
      // The assertion above returns true for any PlainYearMonth.
      // The assertion below verifies the specific month.
      expect(spy).toHaveBeenCalledWith('2020-02');
    });

    it('should navigate to the next month', async () => {
      render(<Calendar {...baseProps} />);
      expect(screen.getByText('March 2020')).toBeVisible();
      const nextButton = screen.getByRole('button', { name: /next month/i });
      await userEvent.click(nextButton);
      expect(screen.getByText('April 2020')).toBeVisible();
    });

    it('should tab to the focused date', async () => {
      render(<Calendar {...baseProps} />);
      const prevButton = screen.getByRole('button', {
        name: /previous month/i,
      });
      const nextButton = screen.getByRole('button', { name: /next month/i });
      const selectedDate = getSelectedDateElement();
      await userEvent.tab();
      expect(document.activeElement).toEqual(prevButton);
      await userEvent.tab();
      expect(document.activeElement).toEqual(nextButton);
      await userEvent.tab();
      expect(document.activeElement).toEqual(selectedDate);
    });

    it('should navigate the date grid using the arrow keys', async () => {
      render(<Calendar {...baseProps} />);
      const selectedDate = getSelectedDateElement();
      selectedDate.focus();
      expect(document.activeElement).toEqual(selectedDate);
      await userEvent.keyboard('{ArrowRight}');
      await waitFor(() => {
        expect(document.activeElement).toEqual(getDateElement(16));
      });
      await userEvent.keyboard('{ArrowUp}');
      await waitFor(() => {
        expect(document.activeElement).toEqual(getDateElement(9));
      });
      await userEvent.keyboard('{ArrowLeft}');
      await waitFor(() => {
        expect(document.activeElement).toEqual(getDateElement(8));
      });
      await userEvent.keyboard('{ArrowDown}');
      await waitFor(() => {
        expect(document.activeElement).toEqual(getDateElement(15));
      });
    });

    it('should navigate the date grid using the page keys', async () => {
      render(<Calendar {...baseProps} />);
      const selectedDate = getSelectedDateElement();
      selectedDate.focus();
      expect(document.activeElement).toEqual(selectedDate);
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
      const selectedDate = getSelectedDateElement();
      selectedDate.focus();
      expect(document.activeElement).toEqual(selectedDate);
      await userEvent.keyboard('{Home}');
      await waitFor(() => {
        expect(document.activeElement).toEqual(getDateElement(9));
      });
      await userEvent.keyboard('{End}');
      await waitFor(() => {
        expect(document.activeElement).toEqual(getDateElement(15));
      });
    });
  });

  describe('selection', () => {
    it('should mark the selected date', () => {
      const { container } = render(<Calendar {...baseProps} />);
      const selectedDate = screen.getByRole('button', { name: '15' });
      // eslint-disable-next-line testing-library/no-container
      const selectedDates = container.querySelectorAll('[aria-pressed="true"]');
      expect(selectedDates).toHaveLength(1);
      expect(selectedDates[0]).toEqual(selectedDate);
    });

    it('should call the onSelect callback when clicking a date', async () => {
      const spy = vi.fn();
      const onSelect = vi.fn((date: Temporal.PlainDate) => {
        spy(date.toString());
      });
      render(<Calendar {...baseProps} onSelect={onSelect} />);
      const march21 = getDateElement(21);
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
      const march21 = getDateElement(21);
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
      const march10 = getDateElement(10);
      expect(march10).not.toHaveAttribute('aria-disabled', 'true');
      const march9 = getDateElement(9);
      expect(march9).toHaveAttribute('aria-disabled', 'true');
      await userEvent.click(march9);
      expect(march9).not.toHaveAttribute('aria-pressed', 'true');
    });

    it('should disable the dates after the maximum date', async () => {
      const maxDate = new Temporal.PlainDate(2020, 3, 20);
      render(<Calendar {...baseProps} maxDate={maxDate} />);
      const march20 = getDateElement(20);
      expect(march20).not.toHaveAttribute('aria-disabled', 'true');
      const march21 = getDateElement(21);
      expect(march21).toHaveAttribute('aria-disabled', 'true');
      await userEvent.click(march21);
      expect(march21).not.toHaveAttribute('aria-pressed', 'true');
    });

    it('should disable specific dates using modifiers', () => {
      const modifiers = {
        '2020-03-21': { disabled: true },
      };
      render(<Calendar {...baseProps} modifiers={modifiers} />);
      const march21 = getDateElement(21);
      expect(march21).toHaveAttribute('aria-disabled', 'true');
    });
  });

  it('should add a description to specific dates using modifiers', () => {
    const modifiers = {
      '2020-03-21': { description: 'Booked' },
    };
    render(<Calendar {...baseProps} modifiers={modifiers} />);
    const march21 = getDateElement(21);
    expect(march21).toHaveAccessibleDescription('Booked');
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = render(<Calendar {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
