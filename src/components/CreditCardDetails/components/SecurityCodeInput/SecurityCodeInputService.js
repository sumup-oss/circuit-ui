import { curry } from '../../../../util/fp';
import getValidationErrors from '../../../../util/get-validation-errors';

import { schemes } from '../..';

const { SCHEMES } = schemes;

export const getPlaceholder = cardScheme =>
  cardScheme === SCHEMES.AMEX ? '1234' : '123';

export const parseSecurityCode = curry((scheme, value) => {
  if (!value || !value.length) {
    return value;
  }

  const onlyDigits = value.replace(/[^\d]/g, '');
  const regex = scheme === SCHEMES.AMEX ? /^\d{4}/ : /^\d{3}/;
  return (onlyDigits.match(regex) || [])[0];
});

const validatePattern = curry(
  (scheme, value) =>
    scheme === SCHEMES.AMEX ? !/^\d{4}$/.test(value) : !/^\d{3}$/.test(value)
);

export const validateSecurityCode = curry((scheme, value) => {
  const required = !value || !value.length;
  const pattern = validatePattern(scheme, value);
  return getValidationErrors({
    required,
    pattern
  });
});
