import { curry } from '../../../../util/fp';

import { SCHEMES } from '../../constants/card-schemes';

export const getPlaceholder = cardScheme =>
  cardScheme === SCHEMES.AMEX ? '1234' : '123';

export const getMask = cardScheme =>
  cardScheme === SCHEMES.AMEX ? [/\d/, /\d/, /\d/, /\d/] : [/\d/, /\d/, /\d/];

export const isValidSecurityCode = curry((scheme, value) => {
  if (!value || !value.length) {
    return false;
  }
  return scheme === SCHEMES.AMEX
    ? /^\d{4}$/.test(value)
    : /^\d{3}$/.test(value);
});
