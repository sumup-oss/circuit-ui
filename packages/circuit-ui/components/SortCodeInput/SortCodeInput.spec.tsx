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
import { createRef, useState, type ChangeEvent } from 'react';

import { render, userEvent, axe, screen } from '../../util/test-utils.js';

import { SortCodeInput, type SortCodeInputProps } from './SortCodeInput.js';

const defaultProps = {
  label: 'Sort code',
};

describe('SortCodeInput', () => {
  it('should forward a ref', () => {
    const ref = createRef<HTMLInputElement>();
    render(<SortCodeInput {...defaultProps} ref={ref} />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(ref.current).toBe(input);
  });

  it('should format a sort code correctly', async () => {
    render(<SortCodeInput {...defaultProps} />);

    const input: HTMLInputElement = screen.getByRole('textbox');

    await userEvent.type(input, '123456');

    expect(input.value).toBe('12-34-56');
  });

  it('should format a partial sort code correctly', async () => {
    render(<SortCodeInput {...defaultProps} />);

    const input: HTMLInputElement = screen.getByRole('textbox');

    await userEvent.type(input, '1234');

    expect(input.value).toBe('12-34-__');
  });

  it('should format a sort code in a controlled input with an initial string value', async () => {
    const ControlledSortCodeInput = () => {
      const [value, setValue] = useState<SortCodeInputProps['value']>('123456');
      return (
        <SortCodeInput
          {...defaultProps}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) =>
            setValue(e.target.value)
          }
        />
      );
    };
    render(<ControlledSortCodeInput />);

    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(input.value).toBe('12-34-56');

    await userEvent.clear(input);
    await userEvent.type(input, '987654');

    expect(input.value).toBe('98-76-54');
  });

  it('should format a sort code in a controlled input with an initial numeric value', async () => {
    const ControlledSortCodeInput = () => {
      const [value, setValue] = useState<SortCodeInputProps['value']>(123456);
      return (
        <SortCodeInput
          {...defaultProps}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) =>
            setValue(e.target.value)
          }
        />
      );
    };
    render(<ControlledSortCodeInput />);

    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(input.value).toBe('12-34-56');

    await userEvent.clear(input);
    await userEvent.type(input, '987654');

    expect(input.value).toBe('98-76-54');
  });

  it('should have inputMode set to numeric', () => {
    render(<SortCodeInput {...defaultProps} />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(input.inputMode).toBe('numeric');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<SortCodeInput {...defaultProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });

  describe('Labeling', () => {
    /**
     * Note: further labeling logic is covered by the underlying `Input` component.
     */
    it('should accept a custom description via aria-describedby', () => {
      const customDescription = 'Enter your bank sort code';
      const customDescriptionId = 'customDescriptionId';
      render(
        <>
          <span id={customDescriptionId}>{customDescription}</span>
          <SortCodeInput
            {...defaultProps}
            aria-describedby={customDescriptionId}
          />
        </>,
      );
      expect(screen.getByRole('textbox')).toHaveAccessibleDescription(
        customDescription,
      );
    });
  });
});
