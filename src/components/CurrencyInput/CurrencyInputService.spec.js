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
import { keys } from 'lodash/fp';

import {
  normalizeAmount,
  createCurrencyMask,
  isValidAmount
} from './CurrencyInputService';

import { NUMBER_SEPARATORS } from '../../util/numbers';

jest.mock('text-mask-addons/dist/createNumberMask', () => jest.fn());

describe('CurrencyInputService', () => {
  const locales = keys(NUMBER_SEPARATORS);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('normalizing values', () => {
    it('should normalize integers to a decimal number', () => {
      locales.forEach(locale => {
        const { thousand } = NUMBER_SEPARATORS[locale];
        const value = `1${thousand}000`;
        const expected = 1000.0;
        const actual = normalizeAmount(value);
        expect(actual).toBe(expected);
      });
    });

    it('should normalize decimals with only one decimal digit to a decimal number', () => {
      locales.forEach(locale => {
        const { thousand, decimal } = NUMBER_SEPARATORS[locale];
        const value = `1${thousand}000${decimal}5`;
        const expected = 1000.5;
        const actual = normalizeAmount(value);
        expect(actual).toBe(expected);
      });
    });

    it('should normalize decimal values to a decimal number', () => {
      locales.forEach(locale => {
        const { thousand, decimal } = NUMBER_SEPARATORS[locale];
        const value = `1${thousand}000${decimal}50`;
        const expected = 1000.5;
        const actual = normalizeAmount(value);
        expect(actual).toBe(expected);
      });
    });

    it('should correctly normalize values ending in "00"', () => {
      locales.forEach(locale => {
        const { thousand, decimal } = NUMBER_SEPARATORS[locale];
        const value = `1${thousand}000${decimal}00`;
        const expected = 1000.0;
        const actual = normalizeAmount(value);
        expect(actual).toBe(expected);
      });
    });
  });

  describe('validating currency values', () => {
    // These tests are not testing all the possible combinations,
    // because that is already done in modules currency.js and regex.js.
    it('should validate a valid amount', () => {
      const formattedValue = '123.232,00';
      const actual = isValidAmount('EUR', 'de-DE', formattedValue);
      expect(actual).toBeTruthy();
    });

    it('should detect values with invalid thousand separators', () => {
      const formattedValue = '123,232,00';
      const actual = isValidAmount('EUR', 'de-DE', formattedValue);
      expect(actual).toBeFalsy();
    });

    it('should detect values with invalid decimal separators', () => {
      const formattedValue = '123,232.00';
      const actual = isValidAmount('EUR', 'de-DE', formattedValue);
      expect(actual).toBeFalsy();
    });
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
