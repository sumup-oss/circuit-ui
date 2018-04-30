import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import {
  normalizeAmount,
  createCurrencyMask,
  isValidAmount
} from './CurrencyInputService';

import { keys } from '../../util/fp';
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
