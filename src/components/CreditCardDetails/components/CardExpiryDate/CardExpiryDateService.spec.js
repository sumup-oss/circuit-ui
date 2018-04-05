import { parseDate, formatDate } from './CardExpiryDateService';

describe('CardExpiryDateService', () => {
  describe('parsing date inputs', () => {
    it('should parse an empty input', () => {
      const input = '';
      const actual = parseDate(input);
      const expected = { month: '', year: '' };
      expect(actual).toEqual(expected);
    });

    it('should parse a single digit month input', () => {
      const input = '6';
      const actual = parseDate(input);
      const expected = { month: '6', year: '' };
      expect(actual).toEqual(expected);
    });

    it('should parse a double digit month input', () => {
      const input = '10';
      const actual = parseDate(input);
      const expected = { month: '10', year: '' };
      expect(actual).toEqual(expected);
    });

    it('should parse a single digit month and single digit year input', () => {
      const input = '1/3';
      const actual = parseDate(input);
      const expected = { month: '1', year: '2030' };
      expect(actual).toEqual(expected);
    });

    it('should parse a single digit month and double digit year input', () => {
      const input = '1/23';
      const actual = parseDate(input);
      const expected = { month: '1', year: '2023' };
      expect(actual).toEqual(expected);
    });

    it('should ignore individual invalid characters', () => {
      const onlyMonthValues = ['1,', '1-/', '1/-', '-1/-'];
      onlyMonthValues.forEach(input => {
        const actual = parseDate(input);
        const expected = { month: '1', year: '' };
        expect(actual).toEqual(expected);
      });

      const mixedValues = ['1,123  ', '1-1/23', '11/-23', '-11/-23'];
      mixedValues.forEach(input => {
        const actual = parseDate(input);
        const expected = { month: '11', year: '2023' };
        expect(actual).toEqual(expected);
      });
    });
  });
});
