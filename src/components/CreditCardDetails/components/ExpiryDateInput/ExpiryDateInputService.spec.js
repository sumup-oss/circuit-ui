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

  describe('parsing date input values', () => {
    it('should ignore any non-digit values', () => {
      const values = ['-', '1-', '12-', '12/2-'];
      const expected = ['', '1', '12', '12/2'];
      values.forEach((value, index) => {
        const actual = parseExpiryDate(value);
        expect(actual).toEqual(expected[index]);
      });
    });

    it('should allow manually setting the slash', () => {
      const value = '12/';
      const expected = '12/';
      const actual = parseExpiryDate(value);
      expect(actual).toBe(expected);
    });

    it('should allow deleting the slash at the end of the value', () => {
      const value = '12';
      const expected = '12';
      const actual = parseExpiryDate(value);
      expect(actual).toBe(expected);
    });

    it('should allow editing the month', () => {
      const value = '1/';
      const expected = '1/';
      const actual = parseExpiryDate(value);
      expect(actual).toBe(expected);
    });

    it('should not allow deleting the slash, when the year has digits', () => {
      const values = ['121', '1223'];
      const expected = ['12/1', '12/23'];
      values.forEach((value, index) => {
        const actual = parseExpiryDate(value);
        expect(actual).toEqual(expected[index]);
      });
    });

    it('should not allow entering more than 5 characters', () => {
      const value = '12/235';
      const expected = '12/23';
      const actual = parseExpiryDate(value);
      expect(actual).toBe(expected);
    });

    it('should not allow entering invalid months', () => {
      const values = ['2', '13'];
      const expected = ['', '1'];
      values.forEach((value, index) => {
        const actual = parseExpiryDate(value);
        expect(actual).toEqual(expected[index]);
      });
    });

    it('should not allow entering past years', () => {
      const lastYearVal = getDecadeAndYear(CURRENT_YEAR - 1); // i.e. 17
      const thisYearVal = getDecadeAndYear(CURRENT_YEAR); // i.e. 18
      const value = `${padToTwo(CURRENT_MONTH)}/${lastYearVal}`; // i.e. 04/17
      const expected = `${padToTwo(CURRENT_MONTH)}/${thisYearVal[0]}`; // i.e. 04/1
      const actual = parseExpiryDate(value);
      expect(actual).toBe(expected);
    });

    it('should not allow entering current year, when month is in the past', () => {
      const thisYearVal = getDecadeAndYear(CURRENT_YEAR); // i.e. 18
      const lastMonthVal = padToTwo(LAST_MONTH); // i.e. 03
      const value = `${lastMonthVal}/${thisYearVal}`; // i.e. 03/18
      const expected = `${lastMonthVal}/${thisYearVal[0]}`; // i.e. 03/1
      const actual = parseExpiryDate(value);
      expect(actual).toBe(expected);
    });

    it('should allow entering current year, when the entered month is the current month', () => {
      const thisYearVal = getDecadeAndYear(CURRENT_YEAR); // i.e. 18
      const thisMonthVal = padToTwo(CURRENT_MONTH); // i.e. 03
      const value = `${thisMonthVal}/${thisYearVal}`; // i.e. 03/18
      const expected = `${thisMonthVal}/${thisYearVal}`; // i.e. 03/1
      const actual = parseExpiryDate(value);
      expect(actual).toBe(expected);
    });
  });

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
