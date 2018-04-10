import { curry } from '../../../../util/fp';

import { schemes } from '../..';

const { SCHEMES } = schemes;

export const getPlaceholder = cardScheme =>
  cardScheme === SCHEMES.AMEX ? '1234' : '123';

export const parseSecurityCode = curry((scheme, value) => {
  if (!value || !value.length) {
    return value;
  }

  const maxLength = scheme === SCHEMES.AMEX ? 4 : 3;

  const onlyDigits = value.replace(/[^\d]/g, '');
  return onlyDigits.length <= maxLength
    ? onlyDigits
    : onlyDigits.slice(0, maxLength);
});

export const isValidSecurityCode = curry(
  (scheme, value) =>
    scheme === SCHEMES.AMEX ? /^\d{4}$/.test(value) : /^\d{3}$/.test(value)
);
