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

import { describe, expect, it } from 'vitest';
import { createRef } from 'react';

import { render, axe, screen } from '../../util/test-utils';

import { Input } from './Input';

const defaultProps = {
  label: 'Label',
};

describe('Input', () => {
  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(
      <Input {...defaultProps} inputClassName={className} />,
    );
    const input = container.querySelector('input');
    expect(input?.className).toContain(className);
  });

  it('should forward a ref to the input', () => {
    const ref = createRef<HTMLInputElement>();
    const { container } = render(<Input ref={ref} {...defaultProps} />);
    const input = container.querySelector('input');
    expect(ref.current).toBe(input);
  });

  it('should forward a ref to the textarea', () => {
    const ref = createRef<HTMLInputElement>();
    const { container } = render(
      <Input as="textarea" ref={ref} {...defaultProps} />,
    );
    const textarea = container.querySelector('textarea');
    expect(ref.current).toBe(textarea);
  });

  it('should render an invalid input', () => {
    render(<Input invalid {...defaultProps} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInvalid();
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('should render a readonly input', () => {
    render(<Input readOnly {...defaultProps} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');
  });

  it('should render a disabled input', () => {
    render(<Input disabled {...defaultProps} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Input {...defaultProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });

  describe('Labeling', () => {
    it('should have an accessible name', () => {
      render(<Input {...defaultProps} />);
      const inputEl = screen.getByRole('textbox');

      expect(inputEl).toHaveAccessibleName(defaultProps.label);
    });

    it('should optionally have an accessible description', () => {
      const description = 'Description';
      render(<Input validationHint={description} {...defaultProps} />);
      const inputEl = screen.getByRole('textbox');

      expect(inputEl).toHaveAccessibleDescription(description);
    });

    it('should accept a custom description via aria-describedby', () => {
      const customDescription = 'Custom description';
      const customDescriptionId = 'customDescriptionId';
      render(
        <>
          <span id={customDescriptionId}>{customDescription}</span>
          <Input aria-describedby={customDescriptionId} {...defaultProps} />,
        </>,
      );
      const inputEl = screen.getByRole('textbox');

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
          <Input
            validationHint={description}
            aria-describedby={customDescriptionId}
            {...defaultProps}
          />
          ,
        </>,
      );
      const inputEl = screen.getByRole('textbox');

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
      render(<Input {...defaultProps} />);
      const liveRegionEl = screen.getByRole('status');

      expect(liveRegionEl).toBeEmptyDOMElement();
    });

    it('should render status messages in a live region', () => {
      const statusMessage = 'This field is required';
      render(
        <Input invalid validationHint={statusMessage} {...defaultProps} />,
      );
      const liveRegionEl = screen.getByRole('status');

      expect(liveRegionEl).toHaveTextContent(statusMessage);
    });

    it('should not render descriptions in a live region', () => {
      const statusMessage = 'This field is required';
      render(<Input validationHint={statusMessage} {...defaultProps} />);
      const liveRegionEl = screen.getByRole('status');

      expect(liveRegionEl).toBeEmptyDOMElement();
    });
  });
});
