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

import { PatternInput, type PatternInputProps } from './PatternInput.js';

const defaultProps = {
  label: 'Sort code',
  pattern: '##-##-##',
};

describe('PatternInput', () => {
  it('should forward a ref', () => {
    const ref = createRef<HTMLInputElement>();
    render(<PatternInput {...defaultProps} ref={ref} />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(ref.current).toBe(input);
  });

  describe('Pattern prop', () => {
    it('should format input with a sort code pattern', async () => {
      render(<PatternInput {...defaultProps} pattern="##-##-##" />);

      const input: HTMLInputElement = screen.getByRole('textbox');

      await userEvent.type(input, '123456');

      expect(input.value).toBe('12-34-56');
    });

    it('should format input with a phone number pattern', async () => {
      render(<PatternInput label="Phone" pattern="(###) ###-####" />);

      const input: HTMLInputElement = screen.getByRole('textbox');

      await userEvent.type(input, '1234567890');

      expect(input.value).toBe('(123) 456-7890');
    });

    it('should format input with a date pattern', async () => {
      render(<PatternInput label="Date" pattern="##/##/####" />);

      const input: HTMLInputElement = screen.getByRole('textbox');

      await userEvent.type(input, '31122023');

      expect(input.value).toBe('31/12/2023');
    });
  });

  describe('Mask prop', () => {
    it('should use default underscore mask for partial input', async () => {
      render(<PatternInput {...defaultProps} pattern="##-##-##" />);

      const input: HTMLInputElement = screen.getByRole('textbox');

      await userEvent.type(input, '1234');

      expect(input.value).toBe('12-34-__');
    });

    it('should use custom mask character', async () => {
      render(<PatternInput {...defaultProps} pattern="##-##-##" mask="#" />);

      const input: HTMLInputElement = screen.getByRole('textbox');

      await userEvent.type(input, '1234');

      expect(input.value).toBe('12-34-##');
    });

    it('should use custom mask for phone pattern', async () => {
      render(<PatternInput label="Phone" pattern="(###) ###-####" mask="X" />);

      const input: HTMLInputElement = screen.getByRole('textbox');

      await userEvent.type(input, '12345');

      expect(input.value).toBe('(123) 45X-XXXX');
    });
  });

  it('should format in a controlled input with an initial string value', async () => {
    const ControlledPatternInput = () => {
      const [value, setValue] = useState<PatternInputProps['value']>('123456');
      return (
        <PatternInput
          {...defaultProps}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) =>
            setValue(e.target.value)
          }
        />
      );
    };
    render(<ControlledPatternInput />);

    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(input.value).toBe('12-34-56');

    await userEvent.clear(input);
    await userEvent.type(input, '987654');

    expect(input.value).toBe('98-76-54');
  });

  it('should format in a controlled input with an initial numeric value', async () => {
    const ControlledPatternInput = () => {
      const [value, setValue] = useState<PatternInputProps['value']>(123456);
      return (
        <PatternInput
          {...defaultProps}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) =>
            setValue(e.target.value)
          }
        />
      );
    };
    render(<ControlledPatternInput />);

    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(input.value).toBe('12-34-56');

    await userEvent.clear(input);
    await userEvent.type(input, '987654');

    expect(input.value).toBe('98-76-54');
  });

  it('should have inputMode set to numeric', () => {
    render(<PatternInput {...defaultProps} />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(input.inputMode).toBe('numeric');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<PatternInput {...defaultProps} />);
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
          <PatternInput
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
