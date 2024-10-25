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

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';

import { render, axe, screen } from '../../util/test-utils';

import { Select } from './Select';

describe('Select', () => {
  const defaultProps = {
    label: 'Label',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(
      <Select {...defaultProps} className={className} />,
    );
    const select = container.querySelector('select');
    expect(select?.className).toContain(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLSelectElement>();
    const { container } = render(<Select ref={ref} {...defaultProps} />);
    const select = container.querySelector('select');
    expect(ref.current).toBe(select);
  });

  it('should accept the options as a prop', () => {
    render(<Select {...defaultProps} />);
    const optionEls = screen.getAllByRole('option');
    expect(optionEls).toHaveLength(
      defaultProps.options.length + 1 /* Options plus placeholder */,
    );
  });

  it('should accept the options as children', () => {
    const children = defaultProps.options.map(({ label, ...rest }) => (
      <option key={rest.value} {...rest}>
        {label}
      </option>
    ));
    render(<Select label="Label">{children}</Select>);
    const optionEls = screen.getAllByRole('option');
    expect(optionEls).toHaveLength(
      defaultProps.options.length + 1 /* Options plus placeholder */,
    );
  });

  it('should be disabled when passed the disabled prop', () => {
    render(<Select {...defaultProps} disabled />);
    const selectEl = screen.getByRole('combobox');
    expect(selectEl).toBeDisabled();
  });

  it('should show the placeholder when no value or defaultValue is passed', () => {
    const placeholder = 'Placeholder';
    render(<Select {...defaultProps} placeholder={placeholder} />);
    const selectEl = screen.getByRole('combobox');
    expect(selectEl.firstChild).toHaveTextContent(placeholder);
  });

  it('should not show the placeholder when a defaultValue is set', () => {
    const placeholder = 'Placeholder';
    const defaultValue = 2;
    render(
      <Select
        {...defaultProps}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />,
    );
    const selectEl = screen.getByRole('combobox');
    expect(selectEl.firstChild).not.toHaveTextContent(placeholder);
  });

  it('should not show the placeholder when a value is selected', () => {
    const placeholder = 'Placeholder';
    const value = 2;
    render(
      <Select
        {...defaultProps}
        placeholder={placeholder}
        value={value}
        onChange={vi.fn()}
      />,
    );
    const selectEl = screen.getByRole('combobox');
    expect(selectEl.firstChild).not.toHaveTextContent(placeholder);
  });

  it('should accept a working ref', () => {
    const tref = createRef<HTMLSelectElement>();
    const { container } = render(<Select {...defaultProps} ref={tref} />);
    const select = container.querySelector('select');
    expect(tref.current).toBe(select);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Select {...defaultProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });

  describe('Labeling', () => {
    it('should have an accessible name', () => {
      render(<Select {...defaultProps} />);
      const inputEl = screen.getByRole('combobox');

      expect(inputEl).toHaveAccessibleName(defaultProps.label);
    });

    it('should optionally have an accessible description', () => {
      const description = 'Description';
      render(<Select validationHint={description} {...defaultProps} />);
      const inputEl = screen.getByRole('combobox');

      expect(inputEl).toHaveAccessibleDescription(description);
    });

    it('should accept a custom description via aria-describedby', () => {
      const customDescription = 'Custom description';
      const customDescriptionId = 'customDescriptionId';
      render(
        <>
          <span id={customDescriptionId}>{customDescription}</span>
          <Select aria-describedby={customDescriptionId} {...defaultProps} />,
        </>,
      );
      const inputEl = screen.getByRole('combobox');

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
          <Select
            validationHint={description}
            aria-describedby={customDescriptionId}
            {...defaultProps}
          />
          ,
        </>,
      );
      const inputEl = screen.getByRole('combobox');

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
      render(<Select {...defaultProps} />);
      const liveRegionEl = screen.getByRole('status');

      expect(liveRegionEl).toBeEmptyDOMElement();
    });

    it('should render status messages in a live region', () => {
      const statusMessage = 'This field is required';
      render(
        <Select invalid validationHint={statusMessage} {...defaultProps} />,
      );
      const liveRegionEl = screen.getByRole('status');

      expect(liveRegionEl).toHaveTextContent(statusMessage);
    });

    it('should not render descriptions in a live region', () => {
      const statusMessage = 'This field is required';
      render(<Select validationHint={statusMessage} {...defaultProps} />);
      const liveRegionEl = screen.getByRole('status');

      expect(liveRegionEl).toBeEmptyDOMElement();
    });
  });

  it('should hide chevron icons from assistive technology', () => {
    const { container } = render(<Select {...defaultProps} />);
    /**
     * We use querySelector because an element with `aria-hidden` is removed
     * from the accessibility tree and cannot be queries with `getByRole()`.
     */
    const chevrons = container.querySelectorAll('svg');

    chevrons.forEach((chevron) => {
      expect(chevron).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
