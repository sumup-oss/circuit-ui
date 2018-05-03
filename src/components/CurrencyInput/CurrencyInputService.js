import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { getCurrencyFormat } from '../../util/currency';
import { curry } from '../../util/fp';
import { currencyToRegex } from '../../util/regex';

export const normalizeAmount = value => {
  if (!value || !value.length) {
    return value;
  }

  const matches = value.match(/[^\d](\d{1,2})$/) || [];
  const [, decimals = '00'] = matches;

  const digits = value.replace(/[^\d]/g, '');

  if (digits === '') {
    return '0.00';
  }

  const integers =
    decimals === '00' ? digits : digits.slice(0, -decimals.length);
  const numberString = `${integers}.${decimals}`;
  return parseFloat(numberString);
};

export const createCurrencyMask = (currency, locale, options = {}) => {
  const {
    decimal: decimalSymbol = '.',
    thousand: thousandsSeparatorSymbol = ',',
    currencyPrecision: decimalLimit
  } = getCurrencyFormat(currency, locale);

  return createNumberMask({
    prefix: '',
    suffix: '',
    thousandsSeparatorSymbol,
    allowDecimal: decimalLimit > 0,
    decimalLimit,
    decimalSymbol,
    ...options
  });
};

export const isValidAmount = curry((currency, locale, value) => {
  const { decimalSep, thousandSep, currencyPrecision } = getCurrencyFormat(
    currency,
    locale
  );
  const pattern = currencyToRegex([thousandSep], currencyPrecision, [
    decimalSep
  ]);
  const regex = new RegExp(pattern);
  return regex.test(value);
});
