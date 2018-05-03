import {
  parseExpiryDate,
  normalizeExpiryDate,
  isCompleteMonth,
  isCompleteYear,
  isFutureDate
} from '.';

describe('ExpiryDateInputService', () => {
  const padToTwo = val =>
    val.toString().length === 1 ? `0${val}` : val.toString();
  const getDecadeAndYear = fullYear => fullYear.toString().slice(2);
  const CURRENT_DATE = new Date();
  const CURRENT_MONTH = CURRENT_DATE.getMonth() + 1;
  const CURRENT_YEAR = CURRENT_DATE.getFullYear();
  const LAST_MONTH = CURRENT_MONTH === 1 ? 12 : CURRENT_MONTH - 1;

  describe('normalizing date input values', () => {
    it('should convert a valid input value into the current month and year', () => {
      const value = '12/18';
      const expected = {
        month: '12',
        year: `${CURRENT_YEAR.toString().slice(0, 2)}18`
      };
      const actual = normalizeExpiryDate(value);
      expect(actual).toEqual(expected);
    });

    it('should return convert and invalid input value into empty strings', () => {
      const value = '/';
      const expected = {
        month: '',
        year: ''
      };
      const actual = normalizeExpiryDate(value);
      expect(actual).toEqual(expected);
    });
  });

  describe('validating expiry dates', () => {
    it('should validate completeness of months', () => {
      const invalidValues = ['', '1', '1/24'];
      invalidValues.forEach(value => {
        const actualMonth = isCompleteMonth(value);
        expect(actualMonth).toBeFalsy();
      });

      const validValues = ['09', '12', '12/'];
      validValues.forEach(value => {
        const actualMonth = isCompleteMonth(value);
        expect(actualMonth).toBeTruthy();
      });
    });

    it('should validate completeness years', () => {
      const invalidValues = ['1/2', '11', '/23'];
      invalidValues.forEach(value => {
        const actualMonth = isCompleteYear(value);
        expect(actualMonth).toBeFalsy();
      });

      const validValues = ['09/23', '12/03'];
      validValues.forEach(value => {
        const actualMonth = isCompleteYear(value);
        expect(actualMonth).toBeTruthy();
      });
    });

    it('should validate the expiry date is in the future', () => {
      const thisYearVal = getDecadeAndYear(CURRENT_YEAR); // i.e. 18
      const lastYearVal = getDecadeAndYear(CURRENT_YEAR - 1); // i.e. 17
      const nextYearVal = getDecadeAndYear(CURRENT_YEAR + 1); // i.e. 19
      const lastMonthVal = padToTwo(LAST_MONTH); // i.e. 03
      const thisMonthVal = padToTwo(CURRENT_MONTH); // i.e. 03

      const invalidValues = [
        `${thisMonthVal}/${lastYearVal}`,
        `${lastMonthVal}/${thisYearVal}`
      ];
      invalidValues.forEach(value => {
        const actualMonth = isFutureDate(value);
        expect(actualMonth).toBeFalsy();
      });

      const validValues = [
        `${thisMonthVal}/${thisYearVal}`,
        `${thisMonthVal}/${nextYearVal}`
      ];
      validValues.forEach(value => {
        const actualMonth = isFutureDate(value);
        expect(actualMonth).toBeTruthy();
      });
    });
  });
});
