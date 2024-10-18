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

  it('should display the initial value correctly', () => {
    render(<DateInput {...baseProps} value="2000-01-12" />);

    expect(screen.getByLabelText(/day/i)).toHaveValue(12);
    expect(screen.getByLabelText(/month/i)).toHaveValue(1);
    expect(screen.getByLabelText(/year/i)).toHaveValue(2000);
  });

  it('should render a disabled input', () => {
    render(<DateInput {...baseProps} disabled />);
    expect(screen.getByLabelText(/day/i)).toBeDisabled();
    expect(screen.getByLabelText(/month/i)).toBeDisabled();
    expect(screen.getByLabelText(/year/i)).toBeDisabled();
    expect(
      screen.getByRole('button', { name: baseProps.openCalendarButtonLabel }),
    ).toHaveAttribute('aria-disabled', 'true');
  });

  it('should handle min/max dates', () => {
    render(<DateInput {...baseProps} min="2000-01-01" max="2001-01-01" />);
    expect(screen.getByLabelText(/day/i)).toHaveAttribute('min', '1');
    expect(screen.getByLabelText(/day/i)).toHaveAttribute('max', '31');
    expect(screen.getByLabelText(/month/i)).toHaveAttribute('min', '1');
    expect(screen.getByLabelText(/month/i)).toHaveAttribute('max', '12');
    expect(screen.getByLabelText(/year/i)).toHaveAttribute('min', '2000');
    expect(screen.getByLabelText(/year/i)).toHaveAttribute('max', '2001');
  });

  it('should handle min/max dates as the user types year', async () => {
    render(<DateInput {...baseProps} min="2000-04-29" max="2001-02-15" />);

    await userEvent.type(screen.getByLabelText(/year/i), '2001');
    /*    expect(screen.getByLabelText(/day/i)).toHaveAttribute('min', '1');
    expect(screen.getByLabelText(/day/i)).toHaveAttribute('max', '1'); */
    expect(screen.getByLabelText(/month/i)).toHaveAttribute('min', '1');
    expect(screen.getByLabelText(/month/i)).toHaveAttribute('max', '2');
  });

  it('should handle min/max dates as the user types year and month', async () => {
    render(<DateInput {...baseProps} min="2000-04-29" max="2001-02-15" />);

    await userEvent.type(screen.getByLabelText(/year/i), '2001');
    await userEvent.type(screen.getByLabelText(/month/i), '02');

    expect(screen.getByLabelText(/day/i)).toHaveAttribute('min', '1');
    expect(screen.getByLabelText(/day/i)).toHaveAttribute('max', '15');
  });

  it('years field should be readonly if min/max dates have the same year', () => {
    render(<DateInput {...baseProps} min="2000-04-29" max="2000-06-15" />);
    expect(screen.getByLabelText(/year/i)).toHaveAttribute('readonly');
    expect(screen.getByLabelText(/month/i)).toHaveAttribute('min', '4');
    expect(screen.getByLabelText(/month/i)).toHaveAttribute('max', '6');
  });

  it('years and months fields should render as readonly if min/max dates have the same year and same month', () => {
    render(<DateInput {...baseProps} min="2000-04-09" max="2000-04-27" />);
    expect(screen.getByLabelText(/year/i)).toHaveAttribute('readonly');
    expect(screen.getByLabelText(/month/i)).toHaveAttribute('readonly');

    expect(screen.getByLabelText(/day/i)).toHaveAttribute('min', '9');
    expect(screen.getByLabelText(/day/i)).toHaveAttribute('max', '27');
  });

  describe('Status messages', () => {
    it('should render an empty live region on mount', () => {
      render(<DateInput {...baseProps} />);
      const liveRegionEl = screen.getByRole('status');

      expect(liveRegionEl).toBeEmptyDOMElement();
    });

    it('should render status messages in a live region', () => {
      const statusMessage = 'This field is required';
      render(
        <DateInput {...baseProps} invalid validationHint={statusMessage} />,
      );
      const liveRegionEl = screen.getByRole('status');

      expect(liveRegionEl).toHaveTextContent(statusMessage);
    });

    it('should not render descriptions in a live region', () => {
      const statusMessage = 'This field is required';
      render(<DateInput {...baseProps} validationHint={statusMessage} />);
      const liveRegionEl = screen.getByRole('status');

      expect(liveRegionEl).toBeEmptyDOMElement();
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<DateInput {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
