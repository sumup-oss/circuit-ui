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
  userEvent,
  screen,
  axe,
  fireEvent,
} from '../../util/test-utils.js';

import { Selector } from './Selector.js';

const defaultProps = {
  label: 'Label',
  name: 'selector',
  value: 'test',
};

describe('Selector', () => {
  describe('Structure & Semantics', () => {
    it('should render a radio input by default', () => {
      render(<Selector {...defaultProps} />);
      const inputEl = screen.getByLabelText('Label');
      expect(inputEl).toHaveAttribute('type', 'radio');
    });

    it('should render a checkbox input when multiple options can be selected', () => {
      render(<Selector {...defaultProps} multiple />);
      const inputEl = screen.getByLabelText('Label');
      expect(inputEl).toHaveAttribute('type', 'checkbox');
    });

    it('should be initially unchecked by default', () => {
      render(<Selector {...defaultProps} />);
      const inputEl = screen.getByLabelText('Label');
      expect(inputEl).not.toBeChecked();
    });

    it('should be initially checked (uncontrolled)', () => {
      render(<Selector {...defaultProps} defaultChecked />);
      const inputEl = screen.getByLabelText('Label');
      expect(inputEl).toBeChecked();
    });

    it('should be initially checked (controlled)', () => {
      render(<Selector {...defaultProps} checked />);
      const inputEl = screen.getByLabelText('Label');
      expect(inputEl).toBeChecked();
    });

    it('should be optionally disabled', () => {
      render(<Selector {...defaultProps} disabled />);
      const inputEl = screen.getByLabelText('Label');
      expect(inputEl).toBeDisabled();
    });

    it('should have a name', () => {
      render(<Selector {...defaultProps} />);
      const inputEl = screen.getByLabelText('Label');
      expect(inputEl).toHaveAttribute('name', defaultProps.name);
    });

    it('should have a label (accessible name)', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Selector ref={ref} {...defaultProps} />);
      const inputEl = screen.getByRole('radio');
      expect(inputEl).toHaveAccessibleName(defaultProps.label);
    });

    it('should optionally have a description', () => {
      const description = 'Description';
      render(<Selector {...defaultProps} description={description} />);
      const inputEl = screen.getByRole('radio');
      expect(inputEl).toHaveAccessibleDescription(description);
    });
  });

  describe('State & Interactions', () => {
    it('should forward a ref to the input', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Selector ref={ref} {...defaultProps} />);
      const inputEl = screen.getByLabelText('Label');
      expect(ref.current).toBe(inputEl);
    });

    it('should call the change handler when clicked', async () => {
      const onChange = vi.fn();
      render(<Selector {...defaultProps} onChange={onChange} />);
      const inputEl = screen.getByLabelText('Label');

      await userEvent.click(inputEl);

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should call the blur handler when loosing focus', async () => {
      const onBlur = vi.fn();
      render(<Selector {...defaultProps} onBlur={onBlur} />);
      const inputEl = screen.getByRole('radio');

      await userEvent.click(inputEl);
      fireEvent.blur(inputEl);

      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const { container } = render(
        <Selector {...defaultProps} description="Description" />,
      );
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
