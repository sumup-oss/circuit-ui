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

import { get, getOr } from 'lodash/fp';

export const NUMBER_SEPARATORS = {
  'bg-BG': { decimal: ',', thousand: '\xA0' },
  'cs-CZ': { decimal: ',', thousand: '\xA0' },
  'da-DK': { decimal: ',', thousand: '.' },
  'de-AT': { decimal: ',', thousand: '.' },
  'de-CH': { decimal: '.', thousand: "'" },
  'de-DE': { decimal: ',', thousand: '.' },
  'de-LU': { decimal: ',', thousand: '.' },
  'el-CY': { decimal: ',', thousand: '.' },
  'el-GR': { decimal: ',', thousand: '.' },
  'en-GB': { decimal: '.', thousand: ',' },
  'en-IE': { decimal: '.', thousand: ',' },
  'en-MT': { decimal: '.', thousand: ',' },
  'en-US': { decimal: '.', thousand: ',' },
  'es-CL': { decimal: ',', thousand: '.' },
  'es-CO': { decimal: ',', thousand: '.' },
  'es-ES': { decimal: ',', thousand: '.' },
  'et-EE': { decimal: '.', thousand: '\xA0' },
  'fi-FI': { decimal: ',', thousand: '\xA0' },
  'fr-BE': { decimal: ',', thousand: '\xA0' },
  'fr-CH': { decimal: '.', thousand: "'" },
  'fr-FR': { decimal: ',', thousand: '\xA0' },
  'fr-LU': { decimal: ',', thousand: '\xA0' },
  'hr-HR': { decimal: ',', thousand: '.' },
  'hu-HU': { decimal: ',', thousand: '\xA0' },
  'it-CH': { decimal: '.', thousand: "'" },
  'it-IT': { decimal: ',', thousand: '.' },
  'lt-LT': { decimal: ',', thousand: '\xA0' },
  'lv-LV': { decimal: ',', thousand: '\xA0' },
  'nb-NO': { decimal: ',', thousand: '\xA0' },
  'nl-BE': { decimal: ',', thousand: '.' },
  'nl-NL': { decimal: ',', thousand: '.' },
  'nn-NO': { decimal: ',', thousand: '\xA0' },
  'pl-PL': { decimal: ',', thousand: '\xA0' },
  'pt-BR': { decimal: ',', thousand: '.' },
  'pt-PT': { decimal: ',', thousand: '.' },
  'ro-RO': { decimal: ',', thousand: '.' },
  'ru-RU': { decimal: ',', thousand: '\xA0' },
  'sl-SI': { decimal: ',', thousand: '.' },
  'sk-SK': { decimal: ',', thousand: '\xA0' },
  'sv-SE': { decimal: ',', thousand: '\xA0' }
};

function formatInteger(integer, { groupLength = 3, thousandSep = ',' } = {}) {
  // Format the integer part of the number by inserting thousands separators.
  const preGroupDigitPattern = `\\d(?=(\\d{${groupLength}})+$)`;
  const preGroupDigitRegex = new RegExp(preGroupDigitPattern, 'g');
  const preGroupDigitReplacement = `$&${thousandSep}`;
  return integer.replace(preGroupDigitRegex, preGroupDigitReplacement);
}

function getIntegerAndFractionalParts(numberString, precision) {
  const number = Number(numberString);
  const [integer, fractional] = number.toFixed(precision).split('.');
  return precision > 0 ? { integer, fractional } : { integer, fractional: '' };
}

export function getNumberFormat(locale) {
  const format = get(locale, NUMBER_SEPARATORS);
  if (!format) {
    throw new TypeError(`No number format available for ${locale}`);
  }
  return format;
}

export function formatNumberParts(
  number,
  { precision = 2, ...integerOptions } = {}
) {
  // Capture integer and decimal part of number
  const { integer, fractional } = getIntegerAndFractionalParts(
    number,
    precision
  );
  const formattedInteger = formatInteger(integer, integerOptions);
  return { integer: formattedInteger, fractional };
}

export function formatNumber(
  number,
  { decimalSep = '.', precision = 2, ...integerOptions } = {}
) {
  const { integer, fractional } = formatNumberParts(number, {
    precision,
    ...integerOptions
  });

  // Format remaining number, but adding decimal separator and decimals to
  // formatted integer string.
  return precision > 0 ? `${integer}${decimalSep}${fractional}` : `${integer}`;
}

export function formatNumberForLocale(number, locale, int = false) {
  if (!locale) {
    return number;
  }
  const { decimal: decimalSep, thousand: thousandSep } = getOr(
    NUMBER_SEPARATORS.default,
    locale,
    NUMBER_SEPARATORS
  );
  const precision = int ? 0 : 2;
  return formatNumber(number, { decimalSep, thousandSep, precision });
}
