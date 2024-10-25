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
  const props = {
    onChange: vi.fn(),
    label: 'Date of birth',
    yearInputLabel: 'Year',
    monthInputLabel: 'Month',
    dayInputLabel: 'Day',
    openCalendarButtonLabel: 'Change date',
    closeCalendarButtonLabel: 'Close calendar',
    prevMonthButtonLabel: 'Previous month',
    nextMonthButtonLabel: 'Previous month',
    applyDateButtonLabel: 'Apply date',
    clearDateButtonLabel: 'Clear date',
  };

  beforeAll(() => {
    MockDate.set('2000-01-01');
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<DateInput {...props} ref={ref} />);
    // eslint-disable-next-line testing-library/no-container
    const wrapper = container.querySelectorAll('div')[0];
    expect(ref.current).toBe(wrapper);
  });

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(
      <DateInput {...props} className={className} />,
    );
    // eslint-disable-next-line testing-library/no-container
    const wrapper = container.querySelectorAll('div')[0];
    expect(wrapper?.className).toContain(className);
  });

  describe('semantics', () => {
    it('should optionally have an accessible description', () => {
      const description = 'Description';
      render(<DateInput {...props} validationHint={description} />);
      const fieldset = screen.getByRole('group');
      const inputs = screen.getAllByRole('spinbutton');

      expect(fieldset).toHaveAccessibleDescription(description);
      expect(inputs[0]).toHaveAccessibleDescription(description);
      expect(inputs[1]).not.toHaveAccessibleDescription();
      expect(inputs[2]).not.toHaveAccessibleDescription();
    });

    it('should accept a custom description via aria-describedby', () => {
      const customDescription = 'Custom description';
      const customDescriptionId = 'customDescriptionId';
      render(
        <>
          <DateInput {...props} aria-describedby={customDescriptionId} />,
          <span id={customDescriptionId}>{customDescription}</span>
        </>,
      );
      const fieldset = screen.getByRole('group');
      const inputs = screen.getAllByRole('spinbutton');

      expect(fieldset).toHaveAccessibleDescription(customDescription);
      expect(inputs[0]).toHaveAccessibleDescription(customDescription);
      expect(inputs[1]).not.toHaveAccessibleDescription();
      expect(inputs[2]).not.toHaveAccessibleDescription();
    });

    it('should accept a custom description in addition to a validationHint', () => {
      const customDescription = 'Custom description';
      const customDescriptionId = 'customDescriptionId';
      const description = 'Description';
      render(
        <>
          <DateInput
            {...props}
            validationHint={description}
            aria-describedby={customDescriptionId}
          />
          <span id={customDescriptionId}>{customDescription}</span>,
        </>,
      );
      const fieldset = screen.getByRole('group');
      const inputs = screen.getAllByRole('spinbutton');

      expect(fieldset).toHaveAccessibleDescription(
        `${customDescription} ${description}`,
      );
      expect(inputs[0]).toHaveAccessibleDescription(
        `${customDescription} ${description}`,
      );
      expect(inputs[1]).not.toHaveAccessibleDescription();
      expect(inputs[2]).not.toHaveAccessibleDescription();
    });

    it('should render as disabled', async () => {
      render(<DateInput {...props} disabled />);
      expect(screen.getByLabelText(/day/i)).toBeDisabled();
      expect(screen.getByLabelText(/month/i)).toBeDisabled();
      expect(screen.getByLabelText(/year/i)).toBeDisabled();
      expect(
        screen.getByRole('button', { name: props.openCalendarButtonLabel }),
      ).toHaveAttribute('aria-disabled', 'true');
    });

    it('should render as read-only', async () => {
      render(<DateInput {...props} readOnly />);
      expect(screen.getByLabelText(/day/i)).toHaveAttribute('readonly');
      expect(screen.getByLabelText(/month/i)).toHaveAttribute('readonly');
      expect(screen.getByLabelText(/year/i)).toHaveAttribute('readonly');
      expect(
        screen.getByRole('button', { name: props.openCalendarButtonLabel }),
      ).toHaveAttribute('aria-disabled', 'true');
    });

    it('should render as invalid', async () => {
      render(<DateInput {...props} invalid />);
      expect(screen.getByLabelText(/day/i)).toBeInvalid();
      expect(screen.getByLabelText(/month/i)).toBeInvalid();
      expect(screen.getByLabelText(/year/i)).toBeInvalid();
    });

    it('should render as required', async () => {
      render(<DateInput {...props} required />);
      expect(screen.getByLabelText(/day/i)).toBeRequired();
      expect(screen.getByLabelText(/month/i)).toBeRequired();
      expect(screen.getByLabelText(/year/i)).toBeRequired();
    });

    it('should have relevant minimum input values', () => {
      render(<DateInput {...props} min="2000-01-01" />);
      expect(screen.getByLabelText(/day/i)).toHaveAttribute(
        'aria-valuemin',
        '1',
      );
      expect(screen.getByLabelText(/month/i)).toHaveAttribute(
        'aria-valuemin',
        '1',
      );
      expect(screen.getByLabelText(/year/i)).toHaveAttribute(
        'aria-valuemin',
        '2000',
      );
    });

    it('should have relevant maximum input values', () => {
      render(<DateInput {...props} max="2001-01-01" />);
      expect(screen.getByLabelText(/day/i)).toHaveAttribute(
        'aria-valuemax',
        '31',
      );
      expect(screen.getByLabelText(/month/i)).toHaveAttribute(
        'aria-valuemax',
        '12',
      );
      expect(screen.getByLabelText(/year/i)).toHaveAttribute(
        'aria-valuemax',
        '2001',
      );
    });

    it.skip('should mark the year input as readonly when the minimum and maximum dates have the same year', () => {
      render(<DateInput {...props} min="2000-04-29" max="2000-06-15" />);
      expect(screen.getByLabelText(/year/i)).toHaveAttribute('readonly');
      expect(screen.getByLabelText(/month/i)).toHaveAttribute(
        'aria-valuemin',
        '4',
      );
      expect(screen.getByLabelText(/month/i)).toHaveAttribute(
        'aria-valuemax',
        '6',
      );
    });

    it.skip('should mark the year and month inputs as readonly when the minimum and maximum dates have the same year and month', () => {
      render(<DateInput {...props} min="2000-04-09" max="2000-04-27" />);
      expect(screen.getByLabelText(/year/i)).toHaveAttribute('readonly');
      expect(screen.getByLabelText(/month/i)).toHaveAttribute('readonly');
      expect(screen.getByLabelText(/day/i)).toHaveAttribute(
        'aria-valuemin',
        '9',
      );
      expect(screen.getByLabelText(/day/i)).toHaveAttribute(
        'aria-valuemax',
        '27',
      );
    });
  });

  describe('state', () => {
    it('should display a default value', () => {
      render(<DateInput {...props} defaultValue="2000-01-12" />);

      expect(screen.getByLabelText(/day/i)).toHaveValue('12');
      expect(screen.getByLabelText(/month/i)).toHaveValue('1');
      expect(screen.getByLabelText(/year/i)).toHaveValue('2000');
    });

    it('should display an initial value', () => {
      render(<DateInput {...props} value="2000-01-12" />);

      expect(screen.getByLabelText(/day/i)).toHaveValue('12');
      expect(screen.getByLabelText(/month/i)).toHaveValue('1');
      expect(screen.getByLabelText(/year/i)).toHaveValue('2000');
    });

    it('should update the displayed value', () => {
      const { rerender } = render(<DateInput {...props} value="2000-01-12" />);

      rerender(<DateInput {...props} value="2000-01-15" />);

      expect(screen.getByLabelText(/day/i)).toHaveValue('15');
      expect(screen.getByLabelText(/month/i)).toHaveValue('1');
      expect(screen.getByLabelText(/year/i)).toHaveValue('2000');
    });
  });

  describe('user interactions', () => {
    it('should focus the first input when clicking the label', async () => {
      render(<DateInput {...props} />);

      await userEvent.click(screen.getByText('Date of birth'));

      expect(screen.getAllByRole('spinbutton')[0]).toHaveFocus();
    });

    it('should allow users to type a date', async () => {
      const onChange = vi.fn();

      render(<DateInput {...props} onChange={onChange} />);

      await userEvent.type(screen.getByLabelText('Year'), '2017');
      await userEvent.type(screen.getByLabelText('Month'), '8');
      await userEvent.type(screen.getByLabelText('Day'), '28');

      expect(onChange).toHaveBeenCalledWith('2017-08-28');
    });

    it('should update the minimum and maximum input values as the user types', async () => {
      render(<DateInput {...props} min="2000-04-29" max="2001-02-15" />);

      await userEvent.type(screen.getByLabelText(/year/i), '2001');

      expect(screen.getByLabelText(/month/i)).toHaveAttribute(
        'aria-valuemin',
        '1',
      );
      expect(screen.getByLabelText(/month/i)).toHaveAttribute(
        'aria-valuemax',
        '2',
      );

      await userEvent.type(screen.getByLabelText(/month/i), '2');

      expect(screen.getByLabelText(/day/i)).toHaveAttribute(
        'aria-valuemin',
        '1',
      );
      expect(screen.getByLabelText(/day/i)).toHaveAttribute(
        'aria-valuemax',
        '15',
      );
    });

    it('should allow users to delete the date', async () => {
      const onChange = vi.fn();

      render(
        <DateInput {...props} defaultValue="2000-01-12" onChange={onChange} />,
      );

      await userEvent.click(screen.getByLabelText(/year/i));
      await userEvent.keyboard(Array(9).fill('{backspace}').join(''));

      expect(screen.getByLabelText(/day/i)).toHaveValue('');
      expect(screen.getByLabelText(/month/i)).toHaveValue('');
      expect(screen.getByLabelText(/year/i)).toHaveValue('');

      expect(onChange).toHaveBeenCalledWith('');
    });

    it('should allow users to select a date on a calendar', async () => {
      const onChange = vi.fn();

      render(<DateInput {...props} onChange={onChange} />);

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

    it('should allow users to clear the date', async () => {
      const onChange = vi.fn();

      render(
        <DateInput {...props} defaultValue="2000-01-12" onChange={onChange} />,
      );

      const openCalendarButton = screen.getByRole('button', {
        name: /change date/i,
      });
      await userEvent.click(openCalendarButton);

      const calendarDialog = screen.getByRole('dialog');
      expect(calendarDialog).toBeVisible();

      const clearButton = screen.getByRole('button', { name: /clear date/i });
      await userEvent.click(clearButton);

      expect(onChange).toHaveBeenCalledWith('');
    });
  });

  describe('status messages', () => {
    it('should render an empty live region on mount', () => {
      render(<DateInput {...props} />);
      const liveRegionEl = screen.getByRole('status');

      expect(liveRegionEl).toBeEmptyDOMElement();
    });

    it('should render status messages in a live region', () => {
      const statusMessage = 'This field is required';
      render(<DateInput {...props} invalid validationHint={statusMessage} />);
      const liveRegionEl = screen.getByRole('status');

      expect(liveRegionEl).toHaveTextContent(statusMessage);
    });

    it('should not render descriptions in a live region', () => {
      const statusMessage = 'This field is required';
      render(<DateInput {...props} validationHint={statusMessage} />);
      const liveRegionEl = screen.getByRole('status');

      expect(liveRegionEl).toBeEmptyDOMElement();
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<DateInput {...props} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
