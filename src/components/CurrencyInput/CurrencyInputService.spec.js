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

import {
  createCurrencyMask,
  formatPlaceholder,
  getSymbolLength
} from './CurrencyInputService';

jest.mock('text-mask-addons/dist/createNumberMask', () => jest.fn());

describe('CurrencyInputService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('createCurrencyMask', () => {
    it('should create a number mask for use with react-text-mask', () => {
      const currencyFormat = {
        maximumFractionDigits: 2,
        decimalDelimiter: '.',
        groupDelimiter: ','
      };
      createCurrencyMask(currencyFormat);
      const options = createNumberMask.mock.calls[0][0];
      const actualAllowDecimal = options.allowDecimal;
      const actualDecimalLimit = options.decimalLimit;
      expect(actualAllowDecimal).toBeTruthy();
      expect(actualDecimalLimit).toBe(2);
    });

    it('should allow specifying options', () => {
      const currencyFormat = {
        maximumFractionDigits: 2,
        decimalDelimiter: '.',
        groupDelimiter: ','
      };
      const options = { foo: 'bar' };
      createCurrencyMask(currencyFormat, options);
      const expected = options.foo;
      const actual = createNumberMask.mock.calls[0][0].foo;
      expect(actual).toEqual(expected);
    });
  });

  describe('formatPlaceholder', () => {
    it('should format a numeric placeholder', () => {
      const placeholder = 1234.56;
      const actual = formatPlaceholder(placeholder, 'de-DE');
      const expected = '1.234,56';
      expect(actual).toBe(expected);
    });

    it('should return a string placeholder', () => {
      const placeholder = '1234.56';
      const actual = formatPlaceholder(placeholder, 'de-DE');
      const expected = placeholder;
      expect(actual).toBe(expected);
    });
  });

  describe('getSymbolLength', () => {
    it('should calculate the symbol width in pixels', () => {
      const symbol = 'CHF';
      const actual = getSymbolLength(symbol);
      const expected = 27;
      expect(actual).toBe(expected);
    });

    it('should clamp the symbol chars between 2 and 5', () => {
      const symbol = '€';
      const actual = getSymbolLength(symbol);
      const expected = 18;
      expect(actual).toBe(expected);
    });
  });
});
