import { curry } from 'lodash/fp';

import { formatAmountForLocale } from '../../util/currency';

export const parseAmount = value => {
  if (!value || !value.length) {
    return value;
  }

  const digits = value.replace(/[^\d]/g, '');

  if (digits === '') {
    return '0.00';
  }

  return `${parseInt(digits, 10) / 100}`;
};

export const formatAmount = curry(
  (currency, locale, amount) =>
    amount && amount.length
      ? formatAmountForLocale(amount, currency, locale)
      : ''
);
