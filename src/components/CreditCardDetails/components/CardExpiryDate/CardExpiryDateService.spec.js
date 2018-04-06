import { parseDate, formatDate } from './CardExpiryDateService';

describe('CardExpiryDateService', () => {
  describe('parsing date input values', () => {
    it('should ignore any non-digit values', () => {
      const values = ['-', '1-', '12/', '12/-23'];
      const expected = [
        { month: '', year: '' },
        { month: '1', year: '' },
        { month: '12', year: '' },
        { month: '12', year: '2023' }
      ];
      values.forEach((value, index) => {
        const actual = parseDate(value);
        expect(actual).toEqual(expected[index]);
      });
    });

    it('should parse digits into months and years', () => {
      const values = ['1', '12', '122', '1223'];
      const expected = [
        { month: '1', year: '' },
        { month: '12', year: '' },
        { month: '12', year: '202' },
        { month: '12', year: '2023' }
      ];
      values.forEach((value, index) => {
        const actual = parseDate(value);
        expect(actual).toEqual(expected[index]);
      });
    });
  });

  describe('formatting date input values', () => {
    it('should not add a slash when the year is empty', () => {
      const models = [
        {
          month: '1',
          year: ''
        },
        {
          month: '12',
          year: ''
        }
      ];

      models.forEach(model => {
        const actual = formatDate(model);
        expect(actual).not.toContain('/');
      });
    });

    it('should add a slash when the year is not empty', () => {
      const model = {
        month: '12',
        year: '2'
      };
      const actual = formatDate(model);
      const expected = '12/2';
      expect(actual).toBe(expected);
    });
  });
});
