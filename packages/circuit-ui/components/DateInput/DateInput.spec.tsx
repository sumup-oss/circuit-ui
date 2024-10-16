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

import { beforeAll, describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';
import MockDate from 'mockdate';

import { render, screen, axe, userEvent } from '../../util/test-utils.js';

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
    yearInputLabel: 'Year',
    monthInputLabel: 'Month',
    dayInputLabel: 'Day',
  };

  beforeAll(() => {
    MockDate.set('2000-01-01');
  });

  // TODO: Move ref to outermost div?
  it('should forward a ref', () => {
    const ref = createRef<HTMLFieldSetElement>();
    render(<DateInput {...baseProps} ref={ref} />);
    const fieldset = screen.getByRole('group');
    expect(ref.current).toBe(fieldset);
  });

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(
      <DateInput {...baseProps} className={className} />,
    );
    // eslint-disable-next-line testing-library/no-container
    const wrapper = container.querySelectorAll('div')[0];
    expect(wrapper?.className).toContain(className);
  });

  it('should select a calendar date', async () => {
    const onChange = vi.fn();

    render(<DateInput {...baseProps} onChange={onChange} />);

    const openCalendarButton = screen.getByRole('button', {
      name: /change date/i,
    });

    await userEvent.click(openCalendarButton);

    const calendarDialog = screen.getByRole('dialog');

    expect(calendarDialog).toBeVisible();

    const dateButton = screen.getByRole('button', { name: /12/ });

    await userEvent.click(dateButton);

    expect(onChange).toHaveBeenCalledWith('2000-01-12');
  });

  it('should');

  it('should have no accessibility violations', async () => {
    const { container } = render(<DateInput {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
