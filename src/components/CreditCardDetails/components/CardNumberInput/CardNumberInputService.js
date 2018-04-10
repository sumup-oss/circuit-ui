import {
  concat,
  curry,
  find,
  flow,
  includes,
  keys,
  reduce
} from '../../../../util/fp';

import { VALIDATION_REGEXES } from './constants';
import { schemes as cardSchemes } from '../..';

const { SCHEMES } = cardSchemes;

const SCHEME_LENGTHS = {
  '^4': [13, 16], // Visa
  '^(?:2(?:2(?:2[1-9]|[3-9])|[3-6]|7(?:[0-1]|20))|5[1-5])': [16], // MasterCard
  '^3[47]': [15], // American Express
  '^(?:3(?:0(?:[0-5]|95)|[68-9]))': [14], // Diner's Club
  '^6(?:011|22(?:1(?:2[6-9]|[3-9])|[2-8]|9(?:[0-1]|2[0-5]))|4[4-9]|5)': [16], // Discover
  '^(?:5[06-9]|6(?:3(?:04|90)|7))': [12, 13, 14, 15, 16, 17, 18, 19], // Maestro
  '^35': [16] // Japan Credit Bureau
};

const SCHEME_DETECTION_PATTERNS = keys(SCHEME_LENGTHS);

const SCHEME_PRIORITIES = {
  [SCHEMES.AMEX]: 100,
  [SCHEMES.DINERS]: 100,
  [SCHEMES.DISCOVER]: 90,
  [SCHEMES.ELO]: 100,
  [SCHEMES.HIPERCARD]: 100,
  [SCHEMES.JCB]: 100,
  [SCHEMES.MASTERCARD]: 100,
  [SCHEMES.VISA]: 100
};

export const detectCardScheme = curry((schemes, value) => {
  if (!value || (value && !value.length)) {
    return '';
  }

  const matchingSchemes = reduce(
    (acc, scheme) => {
      const regex = VALIDATION_REGEXES[scheme];
      return regex && regex.test(value) ? concat(acc, scheme) : acc;
    },
    [],
    schemes
  );

  const scheme = reduce(
    (acc, s) => (SCHEME_PRIORITIES[acc] < SCHEME_PRIORITIES[s] ? s : acc),
    matchingSchemes[0],
    matchingSchemes.slice(1)
  );

  return scheme || '';
});

const getDigits = str => str.replace(/[^\d]/g, '');

export const normalizeCardNumber = (number = '') =>
  number ? getDigits(number) : number;

const shouldValidate = cardNumber => {
  if (!cardNumber) {
    return false;
  }

  const currentSchemeLengths = flow(
    find(pattern => new RegExp(pattern).test(cardNumber)),
    key => SCHEME_LENGTHS[key]
  )(SCHEME_DETECTION_PATTERNS);

  if (!currentSchemeLengths) {
    return cardNumber.length >= 13;
  }

  return includes(cardNumber.length, currentSchemeLengths);
};

/*
 * https://gist.github.com/DiegoSalazar/4075533
 */
const runLuhnCheck = value => {
  if (/[^\d-\s]+/.test(value)) {
    return false;
  }

  let nCheck = 0;
  let nDigit = 0;
  let bEven = false;
  value = value.replace(/\D/g, '');

  for (let n = value.length - 1; n >= 0; n -= 1) {
    const cDigit = value.charAt(n);
    nDigit = parseInt(cDigit, 10);

    if (bEven) {
      /* eslint-disable */
      if ((nDigit *= 2) > 9) {
        nDigit -= 9;
      }
      /* eslint-enable */
    }

    nCheck += nDigit;
    bEven = !bEven;
  }

  return nCheck % 10 === 0;
};

export const isValidCardNumber = value => {
  const normalizedValue = normalizeCardNumber(value);
  return shouldValidate(normalizedValue) ? runLuhnCheck(value) : false;
};

export const isAcceptedCardScheme = curry((acceptedSchemes, value) => {
  const detectedScheme = detectCardScheme(acceptedSchemes, value);
  return detectedScheme.length;
});

export const isDisabledSchemeIcon = (value, detectedScheme, scheme) => {
  const hasValue = value && value.length;
  const hasDetectedScheme = detectedScheme && detectedScheme.length;
  const isDetectedScheme = detectedScheme === scheme;
  return hasValue && hasDetectedScheme && !isDetectedScheme;
};

export const shouldRenderSchemesUnderInput = schemes =>
  keys(schemes).length > 5;

export const hasDetectedScheme = detectedScheme =>
  detectedScheme && detectedScheme.length;

export const parseCardNumber = (number = '') => {
  const isEditingNumber =
    number && /(^| )(\d{1,3}|\d{5,}) (?=\d{1,})/.test(number);

  if (!number || isEditingNumber) {
    return number;
  }

  return getDigits(number).replace(/(.{4})(?!$)/g, '$& ');
};
