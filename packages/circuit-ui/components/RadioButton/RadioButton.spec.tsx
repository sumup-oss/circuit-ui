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

import { render, userEvent, axe } from '../../util/test-utils.jsx';

import RadioButton from '.';

describe('RadioButton', () => {
  describe('Styles', () => {
    it('should render with default styles', () => {
      const { container } = render(<RadioButton label="Label" />);
      expect(container).toMatchSnapshot();
    });

    it('should render with checked styles', () => {
      const { container } = render(
        <RadioButton checked onChange={vi.fn} label="Label" />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render with disabled styles', () => {
      const { container } = render(<RadioButton disabled label="Label" />);
      expect(container).toMatchSnapshot();
    });

    it('should render with invalid styles', () => {
      const { container } = render(<RadioButton invalid label="Label" />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('Logic', () => {
    it('should be unchecked by default', () => {
      const { getByLabelText } = render(<RadioButton label="Label" />);
      const inputEl = getByLabelText('Label', {
        exact: false,
      });
      expect(inputEl).not.toHaveAttribute('checked');
    });

    it('should call the change handler when clicked', async () => {
      const onChange = vi.fn();
      const { getByLabelText } = render(
        <RadioButton onChange={onChange} label="Label" />,
      );
      const inputEl = getByLabelText('Label', {
        exact: false,
      });

      await userEvent.click(inputEl);

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should accept a working ref', () => {
      const tref = createRef<HTMLInputElement>();
      const { container } = render(<RadioButton ref={tref} label="Label" />);
      const input = container.querySelector('input');
      expect(tref.current).toBe(input);
    });
  });

  describe('Accessibility', () => {
    it('should have no violations', async () => {
      const { container } = render(<RadioButton name="radio" label="Label" />);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });

    describe('Input state', () => {
      it.each([undefined, false])(
        'should be valid when the invalid prop is %s',
        (invalid) => {
          const { getByRole } = render(
            <RadioButton invalid={invalid} label="Label" />,
          );
          expect(getByRole('radio')).toBeValid();
        },
      );

      it.each([true, 'Invalid value'])(
        'should be invalid when the invalid prop %s',
        (invalid) => {
          const { getByRole } = render(
            // @ts-expect-error we're testing that aria-invalid is properly set
            // even when the invalid prop is a string
            <RadioButton invalid={invalid} label="Label" />,
          );
          expect(getByRole('radio')).toBeInvalid();
        },
      );
    });
  });
});
