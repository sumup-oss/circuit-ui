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

import {
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
      const thisMonthVal = padToTwo(CURRENT_MONTH); // i.e. 03

      const invalidValue = `${thisMonthVal}/${lastYearVal}`;

      expect(isFutureDate(invalidValue)).toBeFalsy();

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
