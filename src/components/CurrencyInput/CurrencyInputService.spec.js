import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import {
  normalizeAmount,
  createCurrencyMask,
  isValidAmount
} from './CurrencyInputService';

import { keys } from '../../util/fp';
import { NUMBER_SEPARATORS } from '../../util/numbers';
import { CURRENCY_FORMATS, formatAmountForLocale } from '../../util/currency';

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
  });

  describe('validating currency values', () => {
    // TODO: these tests are too automated and removed
    //       from the actual function usage.
    const currencies = keys(CURRENCY_FORMATS);
    const testValidation = value => {
      currencies.forEach(currency => {
        const ccyLocales = keys(CURRENCY_FORMATS[currency]);
        ccyLocales.forEach(locale => {
          if (locale === 'default') {
            return;
          }
          const formattedValue = formatAmountForLocale(value, currency, locale);
          const actual = isValidAmount(currency, locale, formattedValue);
          expect(actual).toBeTruthy();
        });
      });
    };

    it('should validate an amount smaller than 1.00', () => {
      const value = 0.5;
      testValidation(value);
    });

    it('should validate an integer amount', () => {
      const value = 5;
      testValidation(value);
    });

    it('should validate an amount below 1000', () => {
      const value = 999.9;
      testValidation(value);
    });

    it('should validate an amount above 1000', () => {
      const value = 100999.9;
      testValidation(value);
    });

    it('should detect values with invalid thousand separators', () => {
      const formattedValue = '123,2323,00';
      const actual = isValidAmount('EUR', 'de-DE', formattedValue);
      expect(actual).toBeFalsy();
    });

    it('should detect values with invalid decimal separators', () => {
      const formattedValue = '123,2323.00';
      const actual = isValidAmount('EUR', 'de-DE', formattedValue);
      expect(actual).toBeFalsy();
    });
  });

  it('should create a currency mask for a given locale', () => {
    locales.forEach((locale, i) => {
      const {
        decimal: expectedDecimal,
        thousand: expectedThousand
      } = NUMBER_SEPARATORS[locale];

      createCurrencyMask(locale);

      expect(createNumberMask).toHaveBeenCalled();
      const {
        thousandsSeparatorSymbol: actualThousand,
        decimalSymbol: actualDecimal
      } = createNumberMask.mock.calls[i][0];
      expect(actualThousand).toEqual(expectedThousand);
      expect(actualDecimal).toEqual(expectedDecimal);
    });
  });

  it('should allow specifying options', () => {
    const options = { foo: 'bar' };
    createCurrencyMask('de-DE', options);
    const expected = options.foo;
    const actual = createNumberMask.mock.calls[0][0].foo;
    expect(actual).toEqual(expected);
  });
});
