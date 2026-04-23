/**
 * Copyright 2026, SumUp Ltd.
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

import { render, screen, axe, userEvent } from '../../util/test-utils.js';

import { TimeInput } from './TimeInput.js';

vi.mock('../../hooks/useMedia/useMedia.js');

describe('TimeInput', () => {
  const props = {
    onChange: vi.fn(),
    label: 'Time of event',
  };

  it('should forward a ref', () => {
    const ref = createRef<HTMLInputElement>();
    const { container } = render(<TimeInput {...props} ref={ref} />);
    // eslint-disable-next-line testing-library/no-container
    const input = container.querySelector('input[type="time"]');
    expect(ref.current).toBe(input);
  });

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(
      <TimeInput {...props} className={className} />,
    );
    // eslint-disable-next-line testing-library/no-container
    const wrapper = container.querySelectorAll('div')[0];
    expect(wrapper?.className).toContain(className);
  });

  describe('semantics', () => {
    it('should optionally have an accessible description', () => {
      const description = 'Description';
      render(<TimeInput {...props} validationHint={description} />);
      const input = screen.getByLabelText(/time of event/i);
      expect(input).toHaveAccessibleDescription(description);
    });

    it('should accept a custom description via aria-describedby', () => {
      const customDescription = 'Custom description';
      const customDescriptionId = 'customDescriptionId';
      render(
        <>
          <TimeInput {...props} aria-describedby={customDescriptionId} />,
          <span id={customDescriptionId}>{customDescription}</span>
        </>,
      );
      const input = screen.getByLabelText(/time of event/i);

      expect(input).toHaveAccessibleDescription(customDescription);
    });

    it('should accept a custom description in addition to a validationHint', () => {
      const customDescription = 'Custom description';
      const customDescriptionId = 'customDescriptionId';
      const description = 'Description';
      render(
        <>
          <TimeInput
            {...props}
            validationHint={description}
            aria-describedby={customDescriptionId}
          />
          <span id={customDescriptionId}>{customDescription}</span>,
        </>,
      );
      const input = screen.getByLabelText(/time of event/i);

      expect(input).toHaveAccessibleDescription(
        `${customDescription} ${description}`,
      );
    });

    it('should render as disabled', async () => {
      render(<TimeInput {...props} disabled />);
      const input = screen.getByLabelText(/time of event/i);
      expect(input).toBeDisabled();
    });

    it('should render as read-only', async () => {
      render(<TimeInput {...props} readOnly />);
      const input = screen.getByLabelText(/time of event/i);
      expect(input).toHaveAttribute('readonly');
    });

    it('should render as invalid', async () => {
      render(<TimeInput {...props} invalid />);
      const input = screen.getByLabelText(/time of event/i);
      expect(input).toBeInvalid();
    });

    it('should render as required', async () => {
      render(<TimeInput {...props} required />);
      const input = screen.getByLabelText(/time of event/i);
      expect(input).toBeRequired();
    });

    it('should have relevant minimum input values', () => {
      render(<TimeInput {...props} min="09:00" />);
      const input = screen.getByLabelText(/time of event/i);
      expect(input).toHaveAttribute('min', '09:00');
    });

    it('should have relevant maximum input values', () => {
      render(<TimeInput {...props} max="18:00" />);
      const input = screen.getByLabelText(/time of event/i);
      expect(input).toHaveAttribute('max', '18:00');
    });
  });

  describe('state', () => {
    it('should display a default value', () => {
      const ref = createRef<HTMLInputElement>();
      render(<TimeInput {...props} ref={ref} defaultValue="13:15" />);

      expect(ref.current).toHaveValue('13:15');
    });

    it('should display an initial value', () => {
      const ref = createRef<HTMLInputElement>();
      render(<TimeInput {...props} ref={ref} value="13:15" />);

      expect(ref.current).toHaveValue('13:15');
    });

    it('should ignore an invalid value', () => {
      const ref = createRef<HTMLInputElement>();
      render(<TimeInput {...props} ref={ref} value="48:00" />);

      expect(ref.current).toHaveValue('');
    });

    it('should update the displayed value', () => {
      const ref = createRef<HTMLInputElement>();
      const { rerender } = render(
        <TimeInput {...props} ref={ref} value="09:00" />,
      );

      rerender(<TimeInput {...props} ref={ref} value="10:15" />);

      expect(ref.current).toHaveValue('10:15');
    });
  });

  describe('user interactions', () => {
    it('should allow users to type a time', async () => {
      const ref = createRef<HTMLInputElement>();
      const onChange = vi.fn();

      render(<TimeInput {...props} ref={ref} onChange={onChange} />);

      const input = screen.getByLabelText(/time of event/i);

      await userEvent.type(input, '9:00');

      expect(onChange).toHaveBeenCalled();
      expect(ref.current).toHaveValue('09:00');
    });
  });

  describe('status messages', () => {
    it('should render an empty live region on mount', () => {
      render(<TimeInput {...props} />);
      const liveRegionEl = screen.getByRole('status');

      expect(liveRegionEl).toBeEmptyDOMElement();
    });

    it('should render status messages in a live region', () => {
      const statusMessage = 'This field is required';
      render(<TimeInput {...props} invalid validationHint={statusMessage} />);
      const liveRegionEl = screen.getByRole('status');

      expect(liveRegionEl).toHaveTextContent(statusMessage);
    });

    it('should not render descriptions in a live region', () => {
      const statusMessage = 'This field is required';
      render(<TimeInput {...props} validationHint={statusMessage} />);
      const liveRegionEl = screen.getByRole('status');

      expect(liveRegionEl).toBeEmptyDOMElement();
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<TimeInput {...props} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
