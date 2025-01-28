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
  axe,
  screen,
  fireEvent,
} from '../../util/test-utils.js';

import { RadioButtonInput } from './RadioButtonInput.js';

const defaultProps = {
  children: 'Label',
  name: 'radio',
  value: 'test',
};

describe('RadioButton', () => {
  describe('Structure & Semantics', () => {
    it('should be initially unchecked by default', () => {
      render(<RadioButtonInput {...defaultProps} />);
      const inputEl = screen.getByRole('radio');
      expect(inputEl).not.toBeChecked();
    });

    it('should be initially checked (uncontrolled)', () => {
      render(<RadioButtonInput {...defaultProps} defaultChecked />);
      const inputEl = screen.getByRole('radio');
      expect(inputEl).toBeChecked();
    });

    it('should be initially checked (controlled)', () => {
      render(<RadioButtonInput {...defaultProps} checked onChange={vi.fn()} />);
      const inputEl = screen.getByRole('radio');
      expect(inputEl).toBeChecked();
    });

    it('should be optionally disabled', () => {
      render(<RadioButtonInput {...defaultProps} disabled />);
      const inputEl = screen.getByRole('radio');
      expect(inputEl).toBeDisabled();
    });

    it('should have a name', () => {
      render(<RadioButtonInput {...defaultProps} />);
      const inputEl = screen.getByRole('radio');
      expect(inputEl).toHaveAttribute('name', defaultProps.name);
    });

    it('should have a label (accessible name)', () => {
      const ref = createRef<HTMLInputElement>();
      render(<RadioButtonInput ref={ref} {...defaultProps} />);
      const inputEl = screen.getByRole('radio');
      expect(inputEl).toHaveAccessibleName(defaultProps.children);
    });
  });

  describe('State & Interactions', () => {
    it('should forward a ref to the input', () => {
      const ref = createRef<HTMLInputElement>();
      render(<RadioButtonInput ref={ref} {...defaultProps} />);
      const inputEl = screen.getByRole('radio');
      expect(ref.current).toBe(inputEl);
    });

    it('should call the change handler when clicked', async () => {
      const onChange = vi.fn();
      render(<RadioButtonInput {...defaultProps} onChange={onChange} />);
      const inputEl = screen.getByRole('radio');

      await userEvent.click(inputEl);

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should call the blur handler when loosing focus', async () => {
      const onBlur = vi.fn();
      render(<RadioButtonInput {...defaultProps} onBlur={onBlur} />);
      const inputEl = screen.getByRole('radio');

      await userEvent.click(inputEl);

      fireEvent.blur(inputEl);

      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('should have no violations', async () => {
      const { container } = render(<RadioButtonInput {...defaultProps} />);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
