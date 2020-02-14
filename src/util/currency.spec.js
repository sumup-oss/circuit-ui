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

/* eslint-disable jest/expect-expect */

import * as currency from './currency';

describe('currency', () => {
  describe('getCurrencyFormat()', () => {
    it('should return a format object for a currency and locale.', () => {
      const ccy = 'EUR';
      const locale = 'de-DE';
      const actual = currency.getCurrencyFormat(ccy, locale);
      expect(actual).toMatchSnapshot();
    });

    describe('when a currency is not supported', () => {
      it('should use the currency code as symbol', () => {
        const ccy = 'UYU';
        const locale = 'en-GB';
        const actual = currency.getCurrencyFormat(ccy, locale);
        expect(actual).toEqual(
          expect.objectContaining({
            symbol: 'UYU'
          })
        );
      });

      it('should fall back to EUR currency formatting', () => {
        const ccy = 'UYU';
        const locale = 'en-GB';
        const actual = currency.getCurrencyFormat(ccy, locale);
        expect(actual).toEqual(
          expect.objectContaining({
            addSpace: true,
            currencyPrecision: 2,
            decimalSep: '.',
            prepend: false,
            thousandSep: ','
          })
        );
      });
    });

    describe('when no locale-specific format exists for a currency', () => {
      it('should fall back to the default format', () => {
        const ccy = 'EUR';
        const locale = 'en-GB';
        const actual = currency.getCurrencyFormat(ccy, locale);
        expect(actual).toMatchSnapshot();
      });
    });
  });

  describe('formatCurrency()', () => {
    const inputs = ['11.23', 1000, 0.98];

    const testCurrency = (amounts, ccy, locale, expected) => {
      const actual = amounts.map(amount =>
        currency.formatCurrency(amount, ccy, locale)
      );
      expect(actual).toEqual(expected);
    };

    it('should localize EUR for Austria', () => {
      const outputs = ['11,23\xA0€', '1.000,00\xA0€', '0,98\xA0€'];
      testCurrency(inputs, 'EUR', 'de-AT', outputs);
    });

    it('should localize EUR for Belgium', () => {
      const outputsFr = ['11,23\xA0€', '1\xA0000,00\xA0€', '0,98\xA0€'];
      testCurrency(inputs, 'EUR', 'fr-BE', outputsFr);

      const outputsNl = ['€\xA011,23', '€\xA01.000,00', '€\xA00,98'];
      testCurrency(inputs, 'EUR', 'nl-BE', outputsNl);
    });

    it('should localize EUR for Cyprus', () => {
      const outputsFr = ['11,23\xA0€', '1.000,00\xA0€', '0,98\xA0€'];
      testCurrency(inputs, 'EUR', 'el-CY', outputsFr);
    });

    it('should localize EUR for Estonia', () => {
      const outputsFr = ['11.23\xA0€', '1\xA0000.00\xA0€', '0.98\xA0€'];
      testCurrency(inputs, 'EUR', 'et-EE', outputsFr);
    });

    it('should localize EUR for Finland', () => {
      const outputsFr = ['11,23\xA0€', '1\xA0000,00\xA0€', '0,98\xA0€'];
      testCurrency(inputs, 'EUR', 'fi-FI', outputsFr);
    });

    it('should localize EUR for France', () => {
      const outputs = ['11,23\xA0€', '1\xA0000,00\xA0€', '0,98\xA0€'];
      testCurrency(inputs, 'EUR', 'fr-FR', outputs);
    });

    it('should localize EUR for Germany', () => {
      const outputs = ['11,23\xA0€', '1.000,00\xA0€', '0,98\xA0€'];
      testCurrency(inputs, 'EUR', 'de-DE', outputs);
    });

    it('should localize EUR for Greece', () => {
      const outputsFr = ['11,23\xA0€', '1.000,00\xA0€', '0,98\xA0€'];
      testCurrency(inputs, 'EUR', 'el-CY', outputsFr);
    });

    it('should localize EUR for Ireland', () => {
      const outputs = ['€11.23', '€1,000.00', '€0.98'];
      testCurrency(inputs, 'EUR', 'en-IE', outputs);
    });

    it('should localize EUR for Italy', () => {
      const outputs = ['11,23\xA0€', '1.000,00\xA0€', '0,98\xA0€'];
      testCurrency(inputs, 'EUR', 'it-IT', outputs);
    });

    it('should localize EUR for Latvia', () => {
      const outputs = ['11,23\xA0€', '1\xA0000,00\xA0€', '0,98\xA0€'];
      testCurrency(inputs, 'EUR', 'lv-LV', outputs);
    });

    it('should localize EUR for Lithuania', () => {
      const outputs = ['11,23\xA0€', '1\xA0000,00\xA0€', '0,98\xA0€'];
      testCurrency(inputs, 'EUR', 'lt-LT', outputs);
    });

    it('should localize EUR for Luxembourg', () => {
      const outputs = ['11,23\xA0€', '1\xA0000,00\xA0€', '0,98\xA0€'];
      testCurrency(inputs, 'EUR', 'fr-LU', outputs);
    });

    it('should localize EUR for Malta', () => {
      const outputs = ['€11.23', '€1,000.00', '€0.98'];
      testCurrency(inputs, 'EUR', 'en-MT', outputs);
    });

    it('should localize EUR for Netherlands', () => {
      const outputs = ['€\xA011,23', '€\xA01.000,00', '€\xA00,98'];
      testCurrency(inputs, 'EUR', 'nl-NL', outputs);
    });

    it('should localize EUR for Portugal', () => {
      const outputs = ['11,23\xA0€', '1.000,00\xA0€', '0,98\xA0€'];
      testCurrency(inputs, 'EUR', 'pt-PT', outputs);
    });

    it('should localize EUR for Spain', () => {
      const outputs = ['11,23\xA0€', '1.000,00\xA0€', '0,98\xA0€'];
      testCurrency(inputs, 'EUR', 'es-ES', outputs);
    });

    it('should localize EUR for Slovakia', () => {
      const outputs = ['11,23\xA0€', '1\xA0000,00\xA0€', '0,98\xA0€'];
      testCurrency(inputs, 'EUR', 'sk-SK', outputs);
    });

    it('should localize EUR for Slovenia', () => {
      const outputs = ['11,23\xA0€', '1.000,00\xA0€', '0,98\xA0€'];
      testCurrency(inputs, 'EUR', 'sl-SI', outputs);
    });

    it('should localize CHF', () => {
      const outputsDe = ['CHF\xA011.23', "CHF\xA01'000.00", 'CHF\xA00.98'];
      testCurrency(inputs, 'CHF', 'de-CH', outputsDe);

      const outputsIt = ['CHF\xA011.23', "CHF\xA01'000.00", 'CHF\xA00.98'];
      testCurrency(inputs, 'CHF', 'it-CH', outputsIt);

      const outputsFr = ['CHF\xA011.23', "CHF\xA01'000.00", 'CHF\xA00.98'];
      testCurrency(inputs, 'CHF', 'fr-CH', outputsFr);
    });

    it('should localize GBP', () => {
      const outputs = ['£11.23', '£1,000.00', '£0.98'];
      testCurrency(inputs, 'GBP', 'en-GB', outputs);
    });

    it('should localize PLN', () => {
      const outputs = ['11,23\xA0zł', '1\xA0000,00\xA0zł', '0,98\xA0zł'];
      testCurrency(inputs, 'PLN', 'pl-PL', outputs);
    });

    it('should localize RUB', () => {
      const outputs = ['11,23\xA0руб.', '1\xA0000,00\xA0руб.', '0,98\xA0руб.'];
      testCurrency(inputs, 'RUB', 'ru-RU', outputs);
    });

    it('should localize BRL', () => {
      const outputs = ['R$\xA011,23', 'R$\xA01.000,00', 'R$\xA00,98'];
      testCurrency(inputs, 'BRL', 'pt-BR', outputs);
    });

    it('should localize SEK', () => {
      const outputs = ['11,23\xA0kr', '1\xA0000,00\xA0kr', '0,98\xA0kr'];
      testCurrency(inputs, 'SEK', 'sv-SE', outputs);
    });

    it('should localize USD', () => {
      const outputs = ['$11.23', '$1,000.00', '$0.98'];
      testCurrency(inputs, 'USD', 'en-US', outputs);
    });

    it('should localize CLP', () => {
      const outputs = ['$\xA011', '$\xA01.000', '$\xA01'];
      testCurrency(inputs, 'CLP', 'es-CL', outputs);
    });

    it('should localize BGN', () => {
      const outputs = ['11,23\xA0лв.', '1\xA0000,00\xA0лв.', '0,98\xA0лв.'];
      testCurrency(inputs, 'BGN', 'bg-BG', outputs);
    });

    it('should localize CZK', () => {
      const outputs = ['11,23\xA0Kč', '1\xA0000,00\xA0Kč', '0,98\xA0Kč'];
      testCurrency(inputs, 'CZK', 'cs-CZ', outputs);
    });

    it('should localize DKK', () => {
      const outputs = ['11,23\xA0kr.', '1.000,00\xA0kr.', '0,98\xA0kr.'];
      testCurrency(inputs, 'DKK', 'da-DK', outputs);
    });

    it('should localize HUF', () => {
      const outputs = ['11\xA0Ft', '1\xA0000\xA0Ft', '1\xA0Ft'];
      testCurrency(inputs, 'HUF', 'hu-HU', outputs);
    });

    it('should localize NOK', () => {
      const outputsNb = ['11,23\xA0kr', '1\xA0000,00\xA0kr', '0,98\xA0kr'];
      testCurrency(inputs, 'NOK', 'nb-NO', outputsNb);

      const outputsNn = ['11,23\xA0kr', '1\xA0000,00\xA0kr', '0,98\xA0kr'];
      testCurrency(inputs, 'NOK', 'nn-NO', outputsNn);
    });

    it('should localize RON', () => {
      const outputs = ['11,23\xA0Lei', '1.000,00\xA0Lei', '0,98\xA0Lei'];
      testCurrency(inputs, 'RON', 'ro-RO', outputs);
    });

    it('should localize HRK', () => {
      const outputs = ['11,23\xA0kn', '1.000,00\xA0kn', '0,98\xA0kn'];
      testCurrency(inputs, 'HRK', 'hr-HR', outputs);
    });

    describe('handling non-configured currencies', () => {
      it('should not throw an error', () => {
        const amount = 10;
        const ccy = 'UYU';
        expect(() => {
          currency.formatCurrency(amount, ccy, 'en-GB');
        }).not.toThrow();
      });

      it('should fall back to the default EUR format', () => {
        const ccy = 'UYU';
        const outputs = [
          `11,23\xA0${ccy}`,
          `1.000,00\xA0${ccy}`,
          `0,98\xA0${ccy}`
        ];
        testCurrency(inputs, ccy, 'de-DE', outputs);
      });
    });

    describe('handling negative amounts', () => {
      it('should place a minus sign in front of the currency', () => {
        const negativeInputs = [-11.23, '-1000', -0.98];

        const eurOutputs = ['-11,23\xA0€', '-1.000,00\xA0€', '-0,98\xA0€'];
        testCurrency(negativeInputs, 'EUR', 'de-DE', eurOutputs);

        const usdOutputs = ['-$11.23', '-$1,000.00', '-$0.98'];
        testCurrency(negativeInputs, 'USD', 'en-US', usdOutputs);

        const gbpOutputs = ['-£11.23', '-£1,000.00', '-£0.98'];
        testCurrency(negativeInputs, 'GBP', 'en-GB', gbpOutputs);
      });
    });
  });

  describe('formatAmountForLocale()', () => {
    describe('when passed a non-string or non-number input', () => {
      it('should return the input as is', () => {
        const notANumber = {};
        const ccy = 'EUR';
        const locale = 'de-DE';
        const actual = currency.formatAmountForLocale(notANumber, ccy, locale);
        expect(actual).toBe(notANumber);
      });
    });

    describe('when given a currency and locale', () => {
      it('should return the formatted amount', () => {
        const inputs = [11.23, 1000, 0.98];
        const ccy = 'CHF';
        const locale = 'de-CH';
        const expected = ['11.23', "1'000.00", '0.98'];

        inputs.forEach((number, i) => {
          expect(currency.formatAmountForLocale(number, ccy, locale)).toBe(
            expected[i]
          );
        });
      });
    });
  });

  describe('currencyRegex()', () => {
    it("should return a regex for 'USD' currency and 'en-US' locale", () => {
      const currencyCode = 'USD';
      const locale = 'en-US';
      const actual = currency.currencyRegex(currencyCode, locale);
      expect(actual).toMatchSnapshot();
    });

    it("should return a regex for 'BGN' currency and 'bg-BG' locale", () => {
      const currencyCode = 'USD';
      const locale = 'en-US';
      const actual = currency.currencyRegex(currencyCode, locale);
      expect(actual).toMatchSnapshot();
    });

    it("should return a regex for 'CLP' currency and 'es-CL' locale", () => {
      const currencyCode = 'CLP';
      const locale = 'es-CL';
      const actual = currency.currencyRegex(currencyCode, locale);
      expect(actual).toMatchSnapshot();
    });
  });
});
