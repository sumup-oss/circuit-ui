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

import { createRef } from 'react';

import {
  render,
  axe,
  userEvent,
  screen,
  fireEvent,
} from '../../util/test-utils';

import { Checkbox } from './Checkbox';

const defaultProps = {
  label: 'Label',
  name: 'checkbox',
  value: 'test',
};

describe('Checkbox', () => {
  describe('Structure & Semantics', () => {
    it('should be initially unchecked by default', () => {
      render(<Checkbox {...defaultProps} />);
      const inputEl = screen.getByRole('checkbox');
      expect(inputEl).not.toBeChecked();
    });

    it('should be initially checked (uncontrolled)', () => {
      render(<Checkbox {...defaultProps} defaultChecked />);
      const inputEl = screen.getByRole('checkbox');
      expect(inputEl).toBeChecked();
    });

    it('should be initially checked (controlled)', () => {
      render(<Checkbox {...defaultProps} checked onChange={jest.fn()} />);
      const inputEl = screen.getByRole('checkbox');
      expect(inputEl).toBeChecked();
    });

    it('should be optionally disabled', () => {
      render(<Checkbox {...defaultProps} disabled />);
      const inputEl = screen.getByRole('checkbox');
      expect(inputEl).toBeDisabled();
    });

    it('should be optionally indeterminate', () => {
      render(<Checkbox {...defaultProps} indeterminate />);
      const inputEl: HTMLInputElement = screen.getByRole('checkbox');
      expect(inputEl.indeterminate).toBe(true);
      expect(inputEl).toHaveAttribute('aria-checked', 'mixed');
    });

    it('should have a name', () => {
      render(<Checkbox {...defaultProps} />);
      const inputEl = screen.getByRole('checkbox');
      expect(inputEl).toHaveAttribute('name', defaultProps.name);
    });

    it('should have a label (accessible name)', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Checkbox ref={ref} {...defaultProps} />);
      const inputEl = screen.getByRole('checkbox');
      expect(inputEl).toHaveAccessibleName(defaultProps.label);
    });

    it('should optionally have a description', () => {
      const validationHint = 'Description';
      render(<Checkbox validationHint={validationHint} {...defaultProps} />);
      const inputEl = screen.getByRole('checkbox');
      expect(inputEl).toHaveAccessibleDescription(validationHint);
    });

    it('should accept a custom description via aria-describedby', () => {
      const customDescription = 'Custom description';
      const customDescriptionId = 'customDescriptionId';
      render(
        <>
          <span id={customDescriptionId}>{customDescription}</span>
          <Checkbox aria-describedby={customDescriptionId} {...defaultProps} />
        </>,
      );
      const inputEl = screen.getByRole('checkbox');
      expect(inputEl).toHaveAttribute(
        'aria-describedby',
        expect.stringContaining(customDescriptionId),
      );
      expect(inputEl).toHaveAccessibleDescription(customDescription);
    });

    it('should combine the built-in and custom description', () => {
      const customDescription = 'Custom description';
      const customDescriptionId = 'customDescriptionId';
      const description = 'Description';
      render(
        <>
          <span id={customDescriptionId}>{customDescription}</span>
          <Checkbox
            validationHint={description}
            aria-describedby={customDescriptionId}
            {...defaultProps}
          />
        </>,
      );
      const inputEl = screen.getByRole('checkbox');
      expect(inputEl).toHaveAttribute(
        'aria-describedby',
        expect.stringContaining(customDescriptionId),
      );
      expect(inputEl).toHaveAccessibleDescription(
        `${customDescription} ${description}`,
      );
    });
  });

  describe('State & Interactions', () => {
    it('should forward a ref to the input', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Checkbox ref={ref} {...defaultProps} />);
      const inputEl = screen.getByRole('checkbox');
      expect(ref.current).toBe(inputEl);
    });

    it('should call the change handler when clicked', async () => {
      const onChange = jest.fn();
      render(<Checkbox {...defaultProps} onChange={onChange} />);
      const inputEl = screen.getByRole('checkbox');

      await userEvent.click(inputEl);

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should call the blur handler when loosing focus', async () => {
      const onBlur = jest.fn();
      render(<Checkbox {...defaultProps} onBlur={onBlur} />);
      const inputEl = screen.getByRole('checkbox');

      await userEvent.click(inputEl);
      fireEvent.blur(inputEl);

      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Validations', () => {
    it('should announce validation hints to screen reader users', () => {
      const validationHint = 'This field is required';
      render(
        <Checkbox invalid validationHint={validationHint} {...defaultProps} />,
      );
      const liveRegionEl = screen.getByRole('status');
      expect(liveRegionEl).toHaveTextContent(validationHint);
    });
  });

  describe('Accessibility', () => {
    it('should have no violations', async () => {
      const { container } = render(<Checkbox {...defaultProps} />);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });

    it('should render an empty live region on mount', () => {
      render(<Checkbox {...defaultProps} />);
      const liveRegionEl = screen.getByRole('status');
      expect(liveRegionEl).toBeEmptyDOMElement();
    });

    it('should not render descriptions in a live region', () => {
      const statusMessage = 'This field is required';
      render(<Checkbox validationHint={statusMessage} {...defaultProps} />);
      const liveRegionEl = screen.getByRole('status');
      expect(liveRegionEl).toBeEmptyDOMElement();
    });
  });
});
