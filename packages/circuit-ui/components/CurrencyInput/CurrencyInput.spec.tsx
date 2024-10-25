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

import { render, userEvent, axe, screen } from '../../util/test-utils';

import { CurrencyInput, type CurrencyInputProps } from './CurrencyInput';

// Note: these defaults render a '€' as an input suffix
const defaultProps = {
  locale: 'de-DE',
  currency: 'EUR',
  label: 'Amount',
};

describe('CurrencyInput', () => {
  it('should forward a ref', () => {
    const ref = createRef<HTMLInputElement>();
    render(<CurrencyInput {...defaultProps} ref={ref} />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(ref.current).toBe(input);
  });

  it('should format a en-GB amount correctly', async () => {
    render(<CurrencyInput {...defaultProps} currency="GBP" locale="en-GB" />);

    const input: HTMLInputElement = screen.getByRole('textbox');

    await userEvent.type(input, '1234.56');

    expect(input.value).toBe('1,234.56');
  });

  it('should format a de-DE amount correctly', async () => {
    render(<CurrencyInput {...defaultProps} currency="EUR" locale="de-DE" />);

    const input: HTMLInputElement = screen.getByRole('textbox');

    await userEvent.type(input, '1234,56');

    expect(input.value).toBe('1.234,56');
  });

  it('should format an amount in a controlled input with an initial numeric value', async () => {
    const ControlledCurrencyInput = () => {
      const [value, setValue] = useState<CurrencyInputProps['value']>(1234.5);
      return (
        <CurrencyInput
          {...defaultProps}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) =>
            setValue(e.target.value)
          }
        />
      );
    };
    render(<ControlledCurrencyInput />);

    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(input.value).toBe('1.234,5');

    await userEvent.clear(input);
    await userEvent.type(input, '1234,56');

    expect(input.value).toBe('1.234,56');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<CurrencyInput {...defaultProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });

  describe('Labeling', () => {
    const EUR_CURRENCY_SYMBOL = '€'; // formatted by `@sumup-oss/intl`
    /**
     * Note: further labeling logic is covered by the underlying `Input` component.
     */
    it('should have the currency symbol as part of its accessible description', () => {
      render(<CurrencyInput {...defaultProps} />);
      expect(screen.getByRole('textbox')).toHaveAccessibleDescription(
        EUR_CURRENCY_SYMBOL,
      );
    });

    it('should accept a custom description via aria-describedby', () => {
      const customDescription = 'Custom description';
      const customDescriptionId = 'customDescriptionId';
      render(
        <>
          <span id={customDescriptionId}>{customDescription}</span>
          <CurrencyInput
            {...defaultProps}
            aria-describedby={customDescriptionId}
          />
        </>,
      );
      expect(screen.getByRole('textbox')).toHaveAccessibleDescription(
        `${EUR_CURRENCY_SYMBOL} ${customDescription}`,
      );
    });
  });
});
