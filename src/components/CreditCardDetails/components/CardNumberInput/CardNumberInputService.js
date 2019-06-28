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

/* eslint-disable no-param-reassign */

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
import { SCHEMES } from '../../constants/card-schemes';

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

const getDigits = str => str.replace(/[^\d]/g, '');

export const detectCardScheme = curry((schemes, value) => {
  const cleanValue = value && getDigits(value);

  if (!cleanValue || (cleanValue && !cleanValue.length)) {
    return '';
  }

  const matchingSchemes = reduce(
    (acc, scheme) => {
      const regex = VALIDATION_REGEXES[scheme];
      return regex && regex.test(cleanValue) ? concat(acc, scheme) : acc;
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
  const isDetectedScheme = detectedScheme === scheme;
  return hasValue && !isDetectedScheme;
};

export const shouldRenderSchemesUnderInput = schemes =>
  keys(schemes).length > 5;

export const hasDetectedScheme = detectedScheme =>
  detectedScheme && detectedScheme.length;

// prettier-ignore
export const CARD_NUMBER_MASK = [
    /\d/, /\d/, /\d/, /\d/, ' ',
    /\d/, /\d/, /\d/, /\d/, ' ',
    /\d/, /\d/, /\d/, /\d/, ' ',
    /\d/, /\d/, /\d/, /\d/, ' ',
    /\d/, /\d/, /\d/, /\d/
 ];
