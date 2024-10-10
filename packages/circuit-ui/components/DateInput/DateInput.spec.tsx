/**
 * Copyright 2019, SumUp Ltd.
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
import { createRef } from 'react';

import {
  render,
  screen,
  axe,
  userEvent,
  fireEvent,
} from '../../util/test-utils.js';

import { DateInput } from './DateInput.js';

describe('DateInput', () => {
  const baseProps = {
    onChange: vi.fn(),
    label: 'Date',
    prevMonthButtonLabel: 'Previous month',
    nextMonthButtonLabel: 'Previous month',
    openCalendarButtonLabel: 'Change date',
    closeCalendarButtonLabel: 'Close',
    applyDateButtonLabel: 'Apply',
    clearDateButtonLabel: 'Clear',
  };

  it('should forward a ref', () => {
    const ref = createRef<HTMLInputElement>();
    render(<DateInput {...baseProps} ref={ref} />);
    const input = screen.getByRole('textbox');
    expect(ref.current).toBe(input);
  });

  it('should select a calendar date', async () => {
    render(<DateInput {...baseProps} />);

    const input: HTMLInputElement = screen.getByRole('textbox');
    const openCalendarButton = screen.getByRole('button', {
      name: /change date/i,
    });

    // For some reason, userEvent doesn't work here.
    fireEvent.click(openCalendarButton);

    const calendarDialog = screen.getByRole('dialog');

    expect(calendarDialog).toBeVisible();

    const dateButton = screen.getByRole('button', { name: /12/ });

    await userEvent.click(dateButton);

    expect(input).toHaveValue('2024-10-12');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<DateInput {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
