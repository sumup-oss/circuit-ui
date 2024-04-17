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

function getDateElement(day: number) {
  return screen.getByRole('button', { name: day.toString() });
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

describe('Calendar', () => {
  const baseProps = {
    value: '2020-03-15',
    prevMonthButtonLabel: 'Previous month',
    nextMonthButtonLabel: 'Next month',
  };

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

  it('should mark the selected date', () => {
    const { container } = render(<Calendar {...baseProps} />);
    const selectedDate = screen.getByRole('button', { name: '15' });
    // eslint-disable-next-line testing-library/no-container
    const selectedDates = container.querySelectorAll('[aria-pressed="true"]');
    expect(selectedDates).toHaveLength(1);
    expect(selectedDates[0]).toEqual(selectedDate);
  });

  it('should navigate to the previous month', async () => {
    render(<Calendar {...baseProps} />);
    expect(screen.getByText('March 2020')).toBeVisible();
    const prevButton = screen.getByRole('button', { name: /previous month/i });
    await userEvent.click(prevButton);
    expect(screen.getByText('February 2020')).toBeVisible();
  });

  it('should navigate to the next month', async () => {
    render(<Calendar {...baseProps} />);
    expect(screen.getByText('March 2020')).toBeVisible();
    const nextButton = screen.getByRole('button', { name: /next month/i });
    await userEvent.click(nextButton);
    expect(screen.getByText('April 2020')).toBeVisible();
  });

  describe('minimum and maximum dates', () => {
    it('should disable the previous month button when the preceding month is before the minimum date', async () => {
      render(<Calendar {...baseProps} min="2020-03-05" />);
      const prevButton = screen.getByRole('button', {
        name: /previous month/i,
      });
      expect(prevButton).toHaveAttribute('aria-disabled', 'true');
      await userEvent.click(prevButton);
      expect(screen.getByText('March 2020')).toBeVisible();
    });

    it('should disable the next month button when the following month is after the maximum date', async () => {
      render(<Calendar {...baseProps} max="2020-03-25" />);
      const nextButton = screen.getByRole('button', {
        name: /next month/i,
      });
      expect(nextButton).toHaveAttribute('aria-disabled', 'true');
      await userEvent.click(nextButton);
      expect(screen.getByText('March 2020')).toBeVisible();
    });

    it('should disable the dates before the minimum date', async () => {
      render(<Calendar {...baseProps} min="2020-03-10" />);
      const march10 = getDateElement(10);
      expect(march10).not.toHaveAttribute('aria-disabled', 'true');
      const march9 = getDateElement(9);
      expect(march9).toHaveAttribute('aria-disabled', 'true');
      await userEvent.click(march9);
      expect(march9).not.toHaveAttribute('aria-pressed', 'true');
    });

    it('should disable the dates after the maximum date', async () => {
      render(<Calendar {...baseProps} max="2020-03-20" />);
      const march20 = getDateElement(20);
      expect(march20).not.toHaveAttribute('aria-disabled', 'true');
      const march21 = getDateElement(21);
      expect(march21).toHaveAttribute('aria-disabled', 'true');
      await userEvent.click(march21);
      expect(march21).not.toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('focus management', () => {
    it('should tab to the focused date', async () => {
      render(<Calendar {...baseProps} />);
      const prevButton = screen.getByRole('button', {
        name: /previous month/i,
      });
      const nextButton = screen.getByRole('button', { name: /next month/i });
      const selectedDate = getDateElement(15);
      await userEvent.tab();
      expect(document.activeElement).toEqual(prevButton);
      await userEvent.tab();
      expect(document.activeElement).toEqual(nextButton);
      await userEvent.tab();
      expect(document.activeElement).toEqual(selectedDate);
    });

    it('should navigate the date grid using the arrow keys', async () => {
      render(<Calendar {...baseProps} />);
      const selectedDate = getDateElement(15);
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
      const selectedDate = getDateElement(15);
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
      const selectedDate = getDateElement(15);
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

  it('should meet accessibility guidelines', async () => {
    const { container } = render(<Calendar {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
