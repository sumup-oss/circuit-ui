/**
 * Copyright 2025, SumUp Ltd.
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

import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { createRef } from 'react';
import MockDate from 'mockdate';

import { render, screen, axe, userEvent } from '../../util/test-utils.js';
import { useMedia } from '../../hooks/useMedia/useMedia.js';

import { DateRangeInput } from './DateRangeInput.js';

vi.mock('../../hooks/useMedia/useMedia.js');

function getInputs() {
  return [
    screen.getAllByLabelText(/day/i),
    screen.getAllByLabelText(/month/i),
    screen.getAllByLabelText(/year/i),
  ].flat();
}

describe('DateRangeInput', () => {
  const props = {
    onChange: vi.fn(),
    label: 'Travel dates',
  };

  beforeEach(() => {
    MockDate.set('2000-01-01');
    (useMedia as Mock).mockReturnValue(false);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<DateRangeInput {...props} ref={ref} />);

    const wrapper = container.firstElementChild;
    expect(ref.current).toBe(wrapper);
  });

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(
      <DateRangeInput {...props} className={className} />,
    );
    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain(className);
  });

  describe('semantics', () => {
    it('should optionally have an accessible description', () => {
      const description = 'Description';
      render(<DateRangeInput {...props} validationHint={description} />);
      const fieldset = screen.getByRole('group');
      const inputs = screen.getAllByRole('spinbutton');

      expect(fieldset).toHaveAccessibleDescription(description);
      expect(inputs[0]).toHaveAccessibleDescription(description);
      expect(inputs[1]).not.toHaveAccessibleDescription();
      expect(inputs[2]).not.toHaveAccessibleDescription();
      expect(inputs[3]).toHaveAccessibleDescription(description);
      expect(inputs[4]).not.toHaveAccessibleDescription();
      expect(inputs[5]).not.toHaveAccessibleDescription();
    });

    it('should accept a custom description via aria-describedby', () => {
      const customDescription = 'Custom description';
      const customDescriptionId = 'customDescriptionId';
      render(
        <>
          <DateRangeInput {...props} aria-describedby={customDescriptionId} />,
          <span id={customDescriptionId}>{customDescription}</span>
        </>,
      );
      const fieldset = screen.getByRole('group');
      const inputs = screen.getAllByRole('spinbutton');

      expect(fieldset).toHaveAccessibleDescription(customDescription);
      expect(inputs[0]).toHaveAccessibleDescription(customDescription);
      expect(inputs[1]).not.toHaveAccessibleDescription();
      expect(inputs[2]).not.toHaveAccessibleDescription();
      expect(inputs[3]).toHaveAccessibleDescription(customDescription);
      expect(inputs[4]).not.toHaveAccessibleDescription();
      expect(inputs[5]).not.toHaveAccessibleDescription();
    });

    it('should accept a custom description in addition to a validationHint', () => {
      const customDescription = 'Custom description';
      const customDescriptionId = 'customDescriptionId';
      const description = 'Description';
      render(
        <>
          <DateRangeInput
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
      expect(inputs[3]).toHaveAccessibleDescription(
        `${customDescription} ${description}`,
      );
      expect(inputs[4]).not.toHaveAccessibleDescription();
      expect(inputs[5]).not.toHaveAccessibleDescription();
    });

    it('should render as disabled', async () => {
      render(<DateRangeInput {...props} disabled />);
      const inputs = getInputs();

      inputs.forEach((input) => {
        expect(input).toBeDisabled();
      });
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-disabled',
        'true',
      );
    });

    it('should render as read-only', async () => {
      render(<DateRangeInput {...props} readOnly />);
      getInputs().forEach((input) => {
        expect(input).toHaveAttribute('readonly');
      });
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-disabled',
        'true',
      );
    });

    it('should render as invalid', async () => {
      render(<DateRangeInput {...props} invalid />);
      getInputs().forEach((input) => {
        expect(input).toBeInvalid();
      });
    });

    it('should render as required', async () => {
      render(<DateRangeInput {...props} required />);
      getInputs().forEach((input) => {
        expect(input).toBeRequired();
      });
    });

    it('should have relevant minimum input values', () => {
      render(<DateRangeInput {...props} min="2000-01-01" />);
      screen.getAllByLabelText(/day/i).forEach((input) => {
        expect(input).toHaveAttribute('aria-valuemin', '1');
      });
      screen.getAllByLabelText(/month/i).forEach((input) => {
        expect(input).toHaveAttribute('aria-valuemin', '1');
      });
      screen.getAllByLabelText(/year/i).forEach((input) => {
        expect(input).toHaveAttribute('aria-valuemin', '2000');
      });
    });

    it('should have relevant maximum input values', () => {
      render(<DateRangeInput {...props} max="2001-01-01" />);
      screen.getAllByLabelText(/day/i).forEach((input) => {
        expect(input).toHaveAttribute('aria-valuemax', '31');
      });
      screen.getAllByLabelText(/month/i).forEach((input) => {
        expect(input).toHaveAttribute('aria-valuemax', '12');
      });
      screen.getAllByLabelText(/year/i).forEach((input) => {
        expect(input).toHaveAttribute('aria-valuemax', '2001');
      });
    });
  });

  describe('state', () => {
    it('should display a default start value', () => {
      const ref = createRef<HTMLInputElement>();
      render(
        <DateRangeInput
          {...props}
          ref={ref}
          defaultValue={{ start: '2000-01-12' }}
        />,
      );

      expect(screen.getAllByLabelText(/day/i)[0]).toHaveValue('12');
      expect(screen.getAllByLabelText(/month/i)[0]).toHaveValue('1');
      expect(screen.getAllByLabelText(/year/i)[0]).toHaveValue('2000');
    });

    it('should display a default end value', () => {
      const ref = createRef<HTMLInputElement>();
      render(
        <DateRangeInput
          {...props}
          ref={ref}
          defaultValue={{ end: '2000-01-12' }}
        />,
      );

      expect(screen.getAllByLabelText(/day/i)[1]).toHaveValue('12');
      expect(screen.getAllByLabelText(/month/i)[1]).toHaveValue('1');
      expect(screen.getAllByLabelText(/year/i)[1]).toHaveValue('2000');
    });

    it('should display an initial start value', () => {
      const ref = createRef<HTMLInputElement>();
      render(
        <DateRangeInput {...props} ref={ref} value={{ start: '2000-01-12' }} />,
      );

      expect(screen.getAllByLabelText(/day/i)[0]).toHaveValue('12');
      expect(screen.getAllByLabelText(/month/i)[0]).toHaveValue('1');
      expect(screen.getAllByLabelText(/year/i)[0]).toHaveValue('2000');
    });

    it('should display an initial end value', () => {
      const ref = createRef<HTMLInputElement>();
      render(
        <DateRangeInput {...props} ref={ref} value={{ end: '2000-01-12' }} />,
      );

      expect(screen.getAllByLabelText(/day/i)[1]).toHaveValue('12');
      expect(screen.getAllByLabelText(/month/i)[1]).toHaveValue('1');
      expect(screen.getAllByLabelText(/year/i)[1]).toHaveValue('2000');
    });

    it('should ignore an invalid value', () => {
      const ref = createRef<HTMLInputElement>();
      render(
        <DateRangeInput {...props} ref={ref} value={{ start: '2000-13-54' }} />,
      );

      expect(screen.getAllByLabelText(/day/i)[0]).toHaveValue('');
      expect(screen.getAllByLabelText(/month/i)[0]).toHaveValue('');
      expect(screen.getAllByLabelText(/year/i)[0]).toHaveValue('');
    });

    it('should update the displayed value', () => {
      const ref = createRef<HTMLInputElement>();
      const { rerender } = render(
        <DateRangeInput {...props} ref={ref} value={{ start: '2000-01-12' }} />,
      );

      rerender(
        <DateRangeInput {...props} ref={ref} value={{ start: '2000-01-15' }} />,
      );

      expect(screen.getAllByLabelText(/day/i)[0]).toHaveValue('15');
      expect(screen.getAllByLabelText(/month/i)[0]).toHaveValue('1');
      expect(screen.getAllByLabelText(/year/i)[0]).toHaveValue('2000');
    });
  });

  describe('user interactions', () => {
    it('should focus the first input when clicking the label', async () => {
      render(<DateRangeInput {...props} />);

      await userEvent.click(screen.getByText('Travel dates'));

      expect(screen.getAllByRole('spinbutton')[0]).toHaveFocus();
    });

    it('should allow users to type a start date', async () => {
      const onChange = vi.fn();

      render(<DateRangeInput {...props} onChange={onChange} />);

      await userEvent.type(screen.getAllByLabelText(/year/i)[0], '2017');
      await userEvent.type(screen.getAllByLabelText(/month/i)[0], '8');
      await userEvent.type(screen.getAllByLabelText(/day/i)[0], '28');

      expect(onChange).toHaveBeenCalled();
    });

    it('should allow users to type an end date', async () => {
      const onChange = vi.fn();

      render(<DateRangeInput {...props} onChange={onChange} />);

      await userEvent.type(screen.getAllByLabelText(/year/i)[1], '2017');
      await userEvent.type(screen.getAllByLabelText(/month/i)[1], '8');
      await userEvent.type(screen.getAllByLabelText(/day/i)[1], '28');

      expect(onChange).toHaveBeenCalled();
    });

    it('should update the minimum and maximum input values as the user types', async () => {
      render(<DateRangeInput {...props} min="2000-04-29" max="2001-02-15" />);

      await userEvent.type(screen.getAllByLabelText(/year/i)[0], '2001');

      expect(screen.getAllByLabelText(/month/i)[0]).toHaveAttribute(
        'aria-valuemin',
        '1',
      );
      expect(screen.getAllByLabelText(/month/i)[0]).toHaveAttribute(
        'aria-valuemax',
        '2',
      );

      await userEvent.type(screen.getAllByLabelText(/month/i)[0], '2');

      expect(screen.getAllByLabelText(/day/i)[0]).toHaveAttribute(
        'aria-valuemin',
        '1',
      );
      expect(screen.getAllByLabelText(/day/i)[0]).toHaveAttribute(
        'aria-valuemax',
        '15',
      );
    });

    it('should allow users to delete the date', async () => {
      const onChange = vi.fn();

      render(
        <DateRangeInput
          {...props}
          defaultValue={{ start: '2000-01-12', end: '2000-02-12' }}
          onChange={onChange}
        />,
      );

      const inputs = screen.getAllByRole('spinbutton');

      await userEvent.click(inputs[inputs.length - 1]);
      await userEvent.keyboard(Array(19).fill('{backspace}').join(''));

      inputs.forEach((input) => {
        expect(input).toHaveValue('');
      });

      expect(onChange).toHaveBeenCalled();
    });

    it('should allow users to select a date on a calendar', async () => {
      const onChange = vi.fn();

      render(<DateRangeInput {...props} onChange={onChange} />);

      const openCalendarButton = screen.getByRole('button', {
        name: /change date/i,
      });

      expect(openCalendarButton).toHaveAttribute('type', 'button');

      await userEvent.click(openCalendarButton);

      const calendarDialog = screen.getByRole('dialog');
      expect(calendarDialog).toBeVisible();

      const dateButton = screen.getByRole('button', { name: /12/ });
      await userEvent.click(dateButton);

      expect(onChange).toHaveBeenCalled();

      // FIXME:
      // expect(openCalendarButton).toHaveFocus();
    });

    it('should allow users to clear the date', async () => {
      const onChange = vi.fn();

      render(
        <DateRangeInput
          {...props}
          defaultValue={{ start: '2000-01-12', end: '2000-02-12' }}
          onChange={onChange}
        />,
      );

      const openCalendarButton = screen.getByRole('button', {
        name: /change date/i,
      });
      await userEvent.click(openCalendarButton);

      const calendarDialog = screen.getByRole('dialog');
      expect(calendarDialog).toBeVisible();

      const clearButton = screen.getByRole('button', { name: /clear date/i });
      await userEvent.click(clearButton);

      expect(onChange).toHaveBeenCalled();
      expect(openCalendarButton).toHaveFocus();
    });

    it('should close calendar on outside click', async () => {
      render(
        <DateRangeInput {...props} defaultValue={{ start: '2000-01-12' }} />,
      );

      const openCalendarButton = screen.getByRole('button', {
        name: /change date/i,
      });
      await userEvent.click(openCalendarButton);

      const calendarDialog = screen.getByRole('dialog');
      expect(calendarDialog).toBeVisible();

      await userEvent.click(screen.getAllByLabelText(/year/i)[0]);
      expect(calendarDialog).not.toBeVisible();
      expect(openCalendarButton).not.toHaveFocus();
    });

    describe('on narrow viewports', () => {
      beforeEach(() => {
        (useMedia as Mock).mockReturnValue(true);
      });

      it('should allow users to select a date on a calendar', async () => {
        (useMedia as Mock).mockReturnValue(true);
        const onChange = vi.fn();

        render(<DateRangeInput {...props} onChange={onChange} />);

        const openCalendarButton = screen.getByRole('button', {
          name: /change date/i,
        });
        await userEvent.click(openCalendarButton);

        const calendarDialog = screen.getByRole('dialog');
        expect(calendarDialog).toBeVisible();

        const dateButton = screen.getByRole('button', { name: /12/i });
        await userEvent.click(dateButton);

        expect(onChange).not.toHaveBeenCalled();

        const applyButton = screen.getByRole('button', { name: /apply/i });
        await userEvent.click(applyButton);

        expect(onChange).toHaveBeenCalled();
      });

      it('should allow users to clear the date', async () => {
        const onChange = vi.fn();

        render(
          <DateRangeInput
            {...props}
            defaultValue={{ start: '2000-01-12' }}
            onChange={onChange}
          />,
        );

        const openCalendarButton = screen.getByRole('button', {
          name: /change date/i,
        });
        await userEvent.click(openCalendarButton);

        const calendarDialog = screen.getByRole('dialog');
        expect(calendarDialog).toBeVisible();

        const clearButton = screen.getByRole('button', { name: /clear date/i });
        await userEvent.click(clearButton);

        expect(onChange).toHaveBeenCalled();
      });

      it('should allow users to close the calendar dialog without selecting a date', async () => {
        const onChange = vi.fn();

        render(
          <DateRangeInput
            {...props}
            defaultValue={{ start: '2000-01-12' }}
            onChange={onChange}
          />,
        );

        const openCalendarButton = screen.getByRole('button', {
          name: /change date/i,
        });
        await userEvent.click(openCalendarButton);

        const calendarDialog = screen.getByRole('dialog');
        expect(calendarDialog).toBeVisible();

        const closeButton = screen.getByRole('button', { name: /close/i });
        await userEvent.click(closeButton);

        expect(calendarDialog).not.toBeVisible();
        expect(onChange).not.toHaveBeenCalled();
      });
    });
  });

  describe('status messages', () => {
    it('should render an empty live region on mount', () => {
      render(<DateRangeInput {...props} />);
      const liveRegionEl = screen.getByRole('status');

      expect(liveRegionEl).toBeEmptyDOMElement();
    });

    it('should render status messages in a live region', () => {
      const statusMessage = 'This field is required';
      render(
        <DateRangeInput {...props} invalid validationHint={statusMessage} />,
      );
      const liveRegionEl = screen.getByRole('status');

      expect(liveRegionEl).toHaveTextContent(statusMessage);
    });

    it('should not render descriptions in a live region', () => {
      const statusMessage = 'This field is required';
      render(<DateRangeInput {...props} validationHint={statusMessage} />);
      const liveRegionEl = screen.getByRole('status');

      expect(liveRegionEl).toBeEmptyDOMElement();
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<DateRangeInput {...props} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
