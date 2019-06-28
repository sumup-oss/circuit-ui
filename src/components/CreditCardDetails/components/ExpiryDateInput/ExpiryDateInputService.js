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

// The month won't change while this is running, unless you're signing
// up the night before your credit card expires, right before mindnight.
const CURRENT_DATE = new Date();

const CURRENT_MONTH = CURRENT_DATE.getMonth() + 1;
const CURRENT_YEAR = CURRENT_DATE.getFullYear();
const [, CENTURY] = `${CURRENT_YEAR}`.match(/(\d{2})(\d{1})(\d{1})/);

export const normalizeExpiryDate = (value = '') => {
  const [, month, partialYear] = value.match(/(\d{2})\/?(\d{2})/) || [];
  const year = `${CENTURY}${partialYear}`;
  return {
    month: month || '',
    year: partialYear ? year : ''
  };
};

export const isFutureDate = value => {
  const { month, year } = normalizeExpiryDate(value);
  if (!month || !year) {
    return false;
  }

  const isFutureYear = parseInt(year, 10) > CURRENT_YEAR;
  const isCurrentYear = year === `${CURRENT_YEAR}`;
  const hasPassed = parseInt(month, 10) < CURRENT_MONTH;
  return (isCurrentYear && !hasPassed) || isFutureYear;
};

const matchDate = value =>
  (value && value.length && value.match(/(\d{1,2})\/?(\d{1,2})?/)) || [];

export const isCompleteMonth = value => {
  const [, month] = matchDate(value);
  return month && month.length === 2;
};

export const isCompleteYear = value => {
  const [, , year] = matchDate(value);
  return year && year.length === 2;
};
