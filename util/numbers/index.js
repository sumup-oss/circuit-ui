import { get } from 'lodash';

export const NUMBER_SEPARATORS = {
  'bg-BG': { decimal: ',', thousand: '\xA0' },
  'cs-CZ': { decimal: ',', thousand: '\xA0' },
  'da-DK': { decimal: ',', thousand: '.' },
  'de-AT': { decimal: ',', thousand: '.' },
  'de-CH': { decimal: '.', thousand: "'" },
  'de-DE': { decimal: ',', thousand: '.' },
  'en-GB': { decimal: '.', thousand: ',' },
  'en-IE': { decimal: '.', thousand: ',' },
  'en-US': { decimal: '.', thousand: ',' },
  'es-CL': { decimal: ',', thousand: '.' },
  'es-ES': { decimal: ',', thousand: '.' },
  'fr-BE': { decimal: ',', thousand: '\xA0' },
  'fr-CH': { decimal: '.', thousand: '\xA0' },
  'fr-FR': { decimal: ',', thousand: '\xA0' },
  'hr-HR': { decimal: ',', thousand: '.' },
  'hu-HU': { decimal: ',', thousand: '\xA0' },
  'it-CH': { decimal: ',', thousand: '.' },
  'it-IT': { decimal: ',', thousand: '.' },
  'nb-NO': { decimal: ',', thousand: '\xA0' },
  'nl-BE': { decimal: ',', thousand: '.' },
  'nl-NL': { decimal: ',', thousand: '.' },
  'nn-NO': { decimal: ',', thousand: '\xA0' },
  'pl-PL': { decimal: ',', thousand: '\xA0' },
  'pt-BR': { decimal: ',', thousand: '.' },
  'pt-PT': { decimal: ',', thousand: '\xA0' },
  'ro-RO': { decimal: ',', thousand: '.' },
  'ru-RU': { decimal: ',', thousand: '\xA0' },
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
  const format = get(NUMBER_SEPARATORS, locale);
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
  const { decimal: decimalSep, thousand: thousandSep } = get(
    NUMBER_SEPARATORS,
    locale,
    NUMBER_SEPARATORS.default
  );
  const precision = int ? 0 : 2;
  return formatNumber(number, { decimalSep, thousandSep, precision });
}
