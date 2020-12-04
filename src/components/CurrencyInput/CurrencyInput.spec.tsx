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

import React from 'react';
import NumberFormat from 'react-number-format';

import {
  create,
  render,
  renderToHtml,
  axe,
  act,
  userEvent,
} from '../../util/test-utils';

import CurrencyInput from '.';

describe('CurrencyInput', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<CurrencyInput currency="EUR" label="Amount" />);
    expect(actual).toMatchSnapshot();
  });

  it('should adjust input padding and suffix width to match currency symbol width', () => {
    const actual = create(
      <CurrencyInput placeholder="123,45" currency="CHF" label="Amount" />,
    );
    expect(actual).toMatchSnapshot();
  });

  describe('business logic', () => {
    /**
     * Should accept a working ref
     */
    it('should accept a working ref', () => {
      const tref = React.createRef<NumberFormat>();
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

    it('should format a en-GB amount correctly', () => {
      const { getByLabelText } = render(
        <CurrencyInput
          locale="en-GB"
          currency="EUR"
          value={1234.5}
          label="Amount"
        />,
      );

      const input = getByLabelText(new RegExp('Amount')) as HTMLInputElement;
      expect(input.value).toBe('1,234.5');

      act(() => {
        userEvent.type(input, '1234.56');
      });

      expect(input.value).toBe('1,234.56');
    });

    // FIXME: Our current Node version only supports English locales.
    // Unskip when we upgrade to Node 13+.
    it.skip('should format a de-DE amount correctly', () => {
      const { getByLabelText } = render(
        <CurrencyInput
          locale="de-DE"
          currency="EUR"
          value={1234.5}
          label="Amount"
        />,
      );

      const input = getByLabelText(new RegExp('Amount')) as HTMLInputElement;
      expect(input.value).toBe('1.234,5');

      act(() => {
        userEvent.type(input, '1234,56');
      });

      expect(input.value).toBe('1.234,56');
    });
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <CurrencyInput locale="de-DE" currency="EUR" label="Product price" />,
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
