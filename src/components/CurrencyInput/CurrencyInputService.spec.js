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

import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { createCurrencyMask } from './CurrencyInputService';

jest.mock('text-mask-addons/dist/createNumberMask', () => jest.fn());

describe('CurrencyInputService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('creating currency masks', () => {
    // This is testing implementation details. But since we are testing our
    // interface to a library, I think it kind of makes sense.
    it('should handle currency/locale pairs with no fractional part', () => {
      const currency = 'CLP';
      const locale = 'es-CL';
      const expectedAllowDecimal = false;
      const expectedDecimalLimit = 0;
      createCurrencyMask(currency, locale);
      const options = createNumberMask.mock.calls[0][0];
      const actualAllowDecimal = options.allowDecimal;
      const actualDecimalLimit = options.decimalLimit;
      expect(actualAllowDecimal).toEqual(expectedAllowDecimal);
      expect(actualDecimalLimit).toEqual(expectedDecimalLimit);
    });

    it('should handle currency/locale pairs with fractional part', () => {
      const currency = 'EUR';
      const locale = 'de-DE';
      const expectedAllowDecimal = true;
      const expectedDecimalLimit = 2;
      createCurrencyMask(currency, locale);
      const options = createNumberMask.mock.calls[0][0];
      const actualAllowDecimal = options.allowDecimal;
      const actualDecimalLimit = options.decimalLimit;
      expect(actualAllowDecimal).toEqual(expectedAllowDecimal);
      expect(actualDecimalLimit).toEqual(expectedDecimalLimit);
    });

    it('should handle currency/locale pairs with decimal period and thousands comma separators', () => {
      const currency = 'USD';
      const locale = 'en-US';
      const expectedDecimalSymbol = '.';
      const expectedThousandsSeparatorSymbol = ',';
      createCurrencyMask(currency, locale);
      const options = createNumberMask.mock.calls[0][0];
      const actualDecimalSymbol = options.decimalSymbol;
      const actualThousandsSeparatorSymbol = options.thousandsSeparatorSymbol;
      expect(actualDecimalSymbol).toEqual(expectedDecimalSymbol);
      expect(actualThousandsSeparatorSymbol).toEqual(
        expectedThousandsSeparatorSymbol
      );
    });

    it('should handle currency/locale pairs with decimal comma and thousands period separators', () => {
      const currency = 'EUR';
      const locale = 'de-DE';
      const expectedDecimalSymbol = ',';
      const expectedThousandsSeparatorSymbol = '.';
      createCurrencyMask(currency, locale);
      const options = createNumberMask.mock.calls[0][0];
      const actualDecimalSymbol = options.decimalSymbol;
      const actualThousandsSeparatorSymbol = options.thousandsSeparatorSymbol;
      expect(actualDecimalSymbol).toEqual(expectedDecimalSymbol);
      expect(actualThousandsSeparatorSymbol).toEqual(
        expectedThousandsSeparatorSymbol
      );
    });
  });

  it('should allow specifying options', () => {
    const options = { foo: 'bar' };
    createCurrencyMask('EUR', 'de-DE', options);
    const expected = options.foo;
    const actual = createNumberMask.mock.calls[0][0].foo;
    expect(actual).toEqual(expected);
  });
});
