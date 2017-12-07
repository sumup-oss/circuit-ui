import { keys } from 'lodash';

import * as numbers from '.';

describe('numbers', () => {
  describe('formatNumber()', () => {
    it('should format a number according to the provided format.', () => {
      const number = 1000.5;
      const format = {
        groupLength: 2,
        decimalSep: ',',
        thousandSep: ' '
      };
      const expected = '10 00,50';
      const actual = numbers.formatNumber(number, format);
      expect(actual).toBe(expected);
    });

    it('should format a String number according to the provided format.', () => {
      const number = '1000.50';
      const format = {
        groupLength: 2,
        decimalSep: ',',
        thousandSep: ' '
      };
      const expected = '10 00,50';
      const actual = numbers.formatNumber(number, format);
      expect(actual).toBe(expected);
    });

    it('should handle integers.', () => {
      const number = 1000;
      const format = {
        groupLength: 2,
        decimalSep: ',',
        thousandSep: '',
        precision: 0
      };
      const expected = '1000';
      const actual = numbers.formatNumber(number, format);
      expect(actual).toBe(expected);
    });

    it('should fall back to a default format, if no format is provided', () => {
      const number = 1000.5;
      const expected = '1,000.50';
      const actual = numbers.formatNumber(number);
      expect(actual).toBe(expected);
    });
  });

  describe('getNumberFormat()', () => {
    it('returns the number format for a given locale.', () => {
      const locale = 'de-DE';
      const numberFormat = numbers.getNumberFormat(locale);
      expect(numberFormat).toEqual(numbers.NUMBER_SEPARATORS[locale]);
    });

    it('should throw, if the locale is unknown.', () => {
      const locale = 'test';
      const actual = () => numbers.getNumberFormat(locale);
      expect(actual).toThrow();
    });
  });

  describe('formatNumberForLocale()', () => {
    const locales = keys(numbers.NUMBER_SEPARATORS);
    const number = 1000;
    const expectedNumbers = {
      'bg-BG': '1\xA0000,00',
      'cs-CZ': '1\xA0000,00',
      'da-DK': '1.000,00',
      'de-AT': '1.000,00',
      'de-CH': "1'000.00",
      'de-DE': '1.000,00',
      'en-GB': '1,000.00',
      'en-IE': '1,000.00',
      'en-US': '1,000.00',
      'es-CL': '1.000,00',
      'es-ES': '1.000,00',
      'fr-BE': '1\xA0000,00',
      'fr-CH': '1\xA0000.00',
      'fr-FR': '1\xA0000,00',
      'hr-HR': '1.000,00',
      'hu-HU': '1\xA0000,00',
      'it-CH': '1.000,00',
      'it-IT': '1.000,00',
      'nb-NO': '1\xA0000,00',
      'nl-BE': '1.000,00',
      'nl-NL': '1.000,00',
      'nn-NO': '1\xA0000,00',
      'pl-PL': '1\xA0000,00',
      'pt-BR': '1.000,00',
      'pt-PT': '1\xA0000,00',
      'ro-RO': '1.000,00',
      'ru-RU': '1\xA0000,00',
      'sv-SE': '1\xA0000,00'
    };
    locales.forEach(locale => {
      it(`should localize ${number} to ${expectedNumbers[
        locale
      ]} for ${locale}.`, () => {
        const expected = expectedNumbers[locale];
        const actual = numbers.formatNumberForLocale(number, locale);
        expect(actual).toBe(expected);
      });
    });

    it('should omit the fractional part if param "int" is false', () => {
      const expected = '1,000';
      const actual = numbers.formatNumberForLocale(number, 'en-US', true);
      expect(actual).toBe(expected);
    });
  });

  describe('formatNumberParts()', () => {
    const number = 1000000;
    it('should format the integer part with default group length 3 and thousand separator ",".', () => {
      const expected = '1,000,000';
      const { integer: actual } = numbers.formatNumberParts(number);
      expect(actual).toBe(expected);
    });

    it('should format the integer part according to the groupLength parameter.', () => {
      const expected = '100,0000';
      const { integer: actual } = numbers.formatNumberParts(number, {
        groupLength: 4
      });
      expect(actual).toBe(expected);
    });

    it('should format the integer part according to the thousandSep parameter.', () => {
      const expected = '1|000|000';
      const { integer: actual } = numbers.formatNumberParts(number, {
        thousandSep: '|'
      });
      expect(actual).toBe(expected);
    });

    it('should format the fractional part with precision 2 by default.', () => {
      const expected = 2;
      const { fractional: actual } = numbers.formatNumberParts(number, {
        precision: expected
      });
      expect(actual.length).toBe(expected);
    });

    it('should format the fractional part according to the precision parameter.', () => {
      const expected = 4;
      const { fractional: actual } = numbers.formatNumberParts(number, {
        precision: expected
      });
      expect(actual.length).toBe(expected);
    });
  });
});
