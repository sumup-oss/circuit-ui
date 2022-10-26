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

import { ChangeEvent, createRef, useState } from 'react';
import { NumericFormatProps } from 'react-number-format';

import { render, userEvent, axe } from '../../util/test-utils';
import { InputProps } from '../Input';

import CurrencyInput, { CurrencyInputProps } from '.';

describe('CurrencyInput', () => {
  describe('Styles', () => {
    it('should render with default styles', () => {
      const { container } = render(
        <CurrencyInput currency="EUR" label="Amount" />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should adjust input padding and suffix width to match currency symbol width', () => {
      const { container } = render(
        <CurrencyInput placeholder="123,45" currency="CHF" label="Amount" />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Logic', () => {
    it('should accept a working ref', () => {
      const tref = createRef<NumericFormatProps<InputProps>>();
      const { container } = render(
        <CurrencyInput
          locale="de-DE"
          currency="EUR"
          ref={tref}
          label="Amount"
        />,
      );
      const input = container.querySelector('input');
      expect(tref.current).toBe(input);
    });

    it('should format a en-GB amount correctly', async () => {
      const { getByLabelText } = render(
        <CurrencyInput locale="en-GB" currency="EUR" label="Amount" />,
      );

      const input = getByLabelText(/Amount/) as HTMLInputElement;

      await userEvent.type(input, '1234.56');

      expect(input.value).toBe('1,234.56');
    });

    it('should format a de-DE amount correctly', async () => {
      const { getByLabelText } = render(
        <CurrencyInput locale="de-DE" currency="EUR" label="Amount" />,
      );

      const input = getByLabelText(/Amount/) as HTMLInputElement;

      await userEvent.type(input, '1234,56');

      expect(input.value).toBe('1.234,56');
    });

    it('should format an amount in a controlled input with an initial numeric value', async () => {
      const ControlledCurrencyInput = () => {
        const [value, setValue] = useState<CurrencyInputProps['value']>(1234.5);
        return (
          <CurrencyInput
            locale="de-DE"
            currency="EUR"
            value={value}
            label="Amount"
            onChange={(
              e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>,
            ) => setValue(e.target.value)}
          />
        );
      };
      const { getByLabelText } = render(<ControlledCurrencyInput />);

      const input = getByLabelText(/Amount/) as HTMLInputElement;
      expect(input.value).toBe('1.234,5');

      await userEvent.clear(input);
      await userEvent.type(input, '1234,56');

      expect(input.value).toBe('1.234,56');
    });
  });

  describe('Accessibility', () => {
    it('should have no violations', async () => {
      const { container } = render(
        <CurrencyInput locale="de-DE" currency="EUR" label="Product price" />,
      );
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
