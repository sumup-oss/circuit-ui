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

import { render, axe, screen, userEvent } from '../../../../util/test-utils.js';

import { ComboboxInput } from './ComboboxInput.js';

const defaultProps = {
  label: 'Label',
};

describe('ComboboxInput', () => {
  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(
      <ComboboxInput {...defaultProps} inputClassName={className} />,
    );
    const input = container.querySelector('input');
    expect(input?.className).toContain(className);
  });

  it('should forward a ref to the input', () => {
    const ref = createRef<HTMLInputElement>();
    const { container } = render(<ComboboxInput ref={ref} {...defaultProps} />);
    const input = container.querySelector('input');
    expect(ref.current).toBe(input);
  });

  it('should render an invalid input', () => {
    render(<ComboboxInput invalid {...defaultProps} />);
    const input = screen.getByLabelText(defaultProps.label);
    expect(input).toBeInvalid();
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('should render a readonly input', () => {
    render(<ComboboxInput readOnly {...defaultProps} />);
    const input = screen.getByLabelText(defaultProps.label);
    expect(input).toHaveAttribute('readonly');
  });

  it('should render a disabled input', () => {
    render(<ComboboxInput disabled {...defaultProps} />);
    const input = screen.getByLabelText(defaultProps.label);
    expect(input).toBeDisabled();
  });

  it('should display a clear icon when not empty and an onClear callback is provided', async () => {
    const onClear = vi.fn();
    const clearLabel = 'Clear';

    render(
      <ComboboxInput
        {...defaultProps}
        clearLabel={clearLabel}
        value="Search value"
        onClear={onClear}
      />,
    );
    expect(screen.getByRole('button', { name: clearLabel })).toBeVisible();
    await userEvent.click(screen.getByRole('button', { name: clearLabel }));
    expect(onClear).toHaveBeenCalledOnce();
  });

  describe('Labeling', () => {
    it('should have an accessible name', () => {
      render(<ComboboxInput {...defaultProps} />);
      const inputEl = screen.getByLabelText(defaultProps.label);

      expect(inputEl).toHaveAccessibleName(defaultProps.label);
    });

    it('should optionally have an accessible description', () => {
      const description = 'Description';
      render(<ComboboxInput validationHint={description} {...defaultProps} />);
      const inputEl = screen.getByLabelText(defaultProps.label);

      expect(inputEl).toHaveAccessibleDescription(description);
    });

    it('should accept a custom description via aria-describedby', () => {
      const customDescription = 'Custom description';
      const customDescriptionId = 'customDescriptionId';
      render(
        <>
          <span id={customDescriptionId}>{customDescription}</span>
          <ComboboxInput
            aria-describedby={customDescriptionId}
            {...defaultProps}
          />
          ,
        </>,
      );
      const inputEl = screen.getByLabelText(defaultProps.label);

      expect(inputEl).toHaveAttribute(
        'aria-describedby',
        expect.stringContaining(customDescriptionId),
      );
      expect(inputEl).toHaveAccessibleDescription(customDescription);
    });

    it('should accept a custom description in addition to a validationHint', () => {
      const customDescription = 'Custom description';
      const customDescriptionId = 'customDescriptionId';
      const description = 'Description';
      render(
        <>
          <span id={customDescriptionId}>{customDescription}</span>
          <ComboboxInput
            validationHint={description}
            aria-describedby={customDescriptionId}
            {...defaultProps}
          />
          ,
        </>,
      );
      const inputEl = screen.getByLabelText(defaultProps.label);

      expect(inputEl).toHaveAttribute(
        'aria-describedby',
        expect.stringContaining(customDescriptionId),
      );
      expect(inputEl).toHaveAccessibleDescription(
        `${customDescription} ${description}`,
      );
    });
  });

  describe('Status messages', () => {
    it('should render an empty live region on mount', () => {
      render(<ComboboxInput {...defaultProps} />);
      const liveRegionEl = screen.getByRole('status');

      expect(liveRegionEl).toBeEmptyDOMElement();
    });

    it('should render status messages in a live region', () => {
      const statusMessage = 'This field is required';
      render(
        <ComboboxInput
          invalid
          validationHint={statusMessage}
          {...defaultProps}
        />,
      );
      const liveRegionEl = screen.getByRole('status');

      expect(liveRegionEl).toHaveTextContent(statusMessage);
    });

    it('should not render descriptions in a live region', () => {
      const statusMessage = 'This field is required';
      render(
        <ComboboxInput validationHint={statusMessage} {...defaultProps} />,
      );
      const liveRegionEl = screen.getByRole('status');

      expect(liveRegionEl).toBeEmptyDOMElement();
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<ComboboxInput {...defaultProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
