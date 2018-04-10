import { identity, includes, some } from '../../../../util/fp';

// The month won't change while this is running, unless you're signing
// up the night before your credit card expires, right before mindnight.
const CURRENT_DATE = new Date();

const CURRENT_MONTH = CURRENT_DATE.getMonth() + 1;
const CURRENT_YEAR = CURRENT_DATE.getFullYear();
const [, CENTURY, DECADE, YEAR] = `${CURRENT_YEAR}`.match(
  /(\d{2})(\d{1})(\d{1})/
);
const DECADE_INT = parseInt(DECADE, 10);
const YEAR_INT = parseInt(YEAR, 10);

const parseFirst = digits => (includes(digits, ['0', '1']) ? digits : '');

const parseSecond = digits => {
  const [first, second] = digits;
  const isValid = some(identity, [
    first === '0' && /[0-9]/.test(second),
    first === '1' && /[0-2]/.test(second)
  ]);
  return isValid ? `${digits}` : first;
};

const parseThird = digits => {
  const [, month, decade] = digits.match(/(\d{2})\/?(\d)/);
  return parseInt(decade, 10) >= DECADE_INT
    ? `${month}/${decade}`
    : `${month}/`;
};

const parseFourth = digits => {
  const [, month, decade, year] = digits.match(/(\d{2})\/?(\d)(\d)/) || [];
  const prevValue = `${month}/${decade}`;

  if (!year) {
    return prevValue;
  }

  const monthInt = parseInt(month, 10);
  const yearInt = parseInt(year, 10);
  const decadeInt = parseInt(decade, 10);
  const isFutureMonth = monthInt > CURRENT_MONTH;
  const isCurrentMonth = monthInt === CURRENT_MONTH;
  const isFutureYear = yearInt > YEAR_INT;
  const isCurrentYear = yearInt === YEAR_INT;
  const isFutureDecade = decadeInt > DECADE_INT;
  const isValid =
    isFutureDecade ||
    isFutureYear ||
    (isCurrentYear && (isFutureMonth || isCurrentMonth));

  return isValid ? `${month}/${decade}${year}` : prevValue;
};

export const parseExpiryDate = (value = '') => {
  if (!value) {
    return value;
  }

  const containsSlash = /\//.test(value);
  const slashPosition = value.indexOf('/');
  const isComplete = value.length > 5;
  const isEditingMonth = value.length > 1 && slashPosition < 2;
  const enteredSlash = value.length === 3 && slashPosition === 2;

  if (isComplete) {
    return value.slice(0, value.length - 1);
  }

  // Prevents all kinds of problems with jumping cursors.
  if ((containsSlash && isEditingMonth) || enteredSlash) {
    return value;
  }

  const allDigits = value.replace(/[^\d]/g, '');

  switch (allDigits.length) {
    case 0:
      return '';
    case 1:
      return parseFirst(allDigits);
    case 2:
      return parseSecond(allDigits);
    case 3:
      return parseThird(allDigits);
    default:
      return parseFourth(allDigits);
  }
};

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
