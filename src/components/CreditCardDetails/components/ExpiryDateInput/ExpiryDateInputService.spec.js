import { parseDate, formatDate, validate } from './ExpiryDateInputService';

describe('ExpiryDateInputService', () => {
  describe('parsing date input values', () => {
    it('should ignore any non-digit values', () => {
      const values = ['-', '1-', '12/', '12/-23'];
      const expected = [
        { month: '', year: '' },
        { month: '1', year: '' },
        { month: '12', year: '' },
        // This test will break in the year 2100.
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
        // This test will break in the year 2100.
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

  describe('validating expiry dates', () => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    it('should detect the current month as valid', () => {
      const month = currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;
      const year = `${currentYear}`;
      const actual = validate({ month, year });
      expect(actual).toBeNull();
    });

    it('should detect dates with incomplete months', () => {
      const date = { month: '1', year: '' };
      const actual = validate(date).incomplete;
      expect(actual).toBeTruthy();
    });

    it('should detect dates with incomplete years', () => {
      const date = { month: '01', year: '202' };
      const actual = validate(date).incomplete;
      expect(actual).toBeTruthy();
    });

    it('should detect past dates within the current year', () => {
      const month = currentMonth === 1 ? '12' : `${currentMonth - 1}`;
      const year = currentYear;
      const actual = validate({ month, year }).past;
      expect(actual).toBeTruthy();
    });

    it('should detect past dates in a past year', () => {
      const month = `${currentMonth}`;
      const year = `${currentYear - 1}`;
      const actual = validate({ month, year }).past;
      expect(actual).toBeTruthy();
    });
  });
});
