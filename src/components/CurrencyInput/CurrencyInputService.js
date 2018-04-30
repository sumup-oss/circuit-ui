import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { getNumberFormat } from '../../util/numbers';

export const normalizeValue = value => {
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

export const createCurrencyMask = (locale, options = {}) => {
  const {
    decimal: decimalSymbol = '.',
    thousand: thousandsSeparatorSymbol = ','
  } = getNumberFormat(locale);

  return createNumberMask({
    prefix: '',
    suffix: '',
    thousandsSeparatorSymbol,
    allowDecimal: true,
    decimalSymbol,
    ...options
  });
};
