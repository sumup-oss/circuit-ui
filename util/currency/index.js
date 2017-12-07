import { get, isNumber, isString } from 'lodash/fp';
import { get as _get } from 'lodash';

import { formatNumber, getNumberFormat } from '../numbers';

export const CURRENCY_FORMATS = {
  EUR: {
    'de-AT': { prependSymbol: true, fractionalPrecision: 2, addSpace: true },
    'de-DE': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    'en-IE': { prependSymbol: true, fractionalPrecision: 2, addSpace: false },
    'es-ES': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    'fr-BE': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    'fr-FR': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    'it-IT': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    'nl-BE': { prependSymbol: true, fractionalPrecision: 2, addSpace: true },
    'nl-NL': { prependSymbol: true, fractionalPrecision: 2, addSpace: true },
    'pt-PT': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    default: { prependSymbol: false, fractionalPrecision: 2, addSpace: true }
  },
  CHF: {
    'de-CH': { prependSymbol: true, fractionalPrecision: 2, addSpace: true },
    'it-CH': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    'fr-CH': { prependSymbol: true, fractionalPrecision: 2, addSpace: true },
    default: { prependSymbol: true, fractionalPrecision: 2, addSpace: false }
  },
  GBP: {
    'en-GB': { prependSymbol: true, fractionalPrecision: 2, addSpace: false },
    default: { prependSymbol: true, fractionalPrecision: 2, addSpace: false }
  },
  PLN: {
    'pl-PL': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    default: { prependSymbol: false, fractionalPrecision: 2, addSpace: true }
  },
  RUB: {
    'ru-RU': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    default: { prependSymbol: false, fractionalPrecision: 2, addSpace: true }
  },
  BRL: {
    'pt-BR': { prependSymbol: true, fractionalPrecision: 2, addSpace: true },
    default: { prependSymbol: true, fractionalPrecision: 2, addSpace: true }
  },
  SEK: {
    'sv-SE': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    default: { prependSymbol: false, fractionalPrecision: 2, addSpace: true }
  },
  USD: {
    'en-US': { prependSymbol: true, fractionalPrecision: 2, addSpace: false },
    default: { prependSymbol: true, fractionalPrecision: 2, addSpace: false }
  },
  CLP: {
    'es-CL': { prependSymbol: true, fractionalPrecision: 0, addSpace: true },
    default: { prependSymbol: true, fractionalPrecision: 0, addSpace: true }
  },
  BGN: {
    'bg-BG': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    default: { prependSymbol: false, fractionalPrecision: 2, addSpace: true }
  },
  CZK: {
    'cs-CZ': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    default: { prependSymbol: false, fractionalPrecision: 2, addSpace: true }
  },
  DKK: {
    'da-DK': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    default: { prependSymbol: false, fractionalPrecision: 2, addSpace: true }
  },
  HUF: {
    'hu-HU': { prependSymbol: false, fractionalPrecision: 0, addSpace: true },
    default: { prependSymbol: false, fractionalPrecision: 0, addSpace: true }
  },
  NOK: {
    'nb-NO': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    'nn-NO': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    default: { prependSymbol: false, fractionalPrecision: 2, addSpace: true }
  },
  RON: {
    'ro-RO': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    default: { prependSymbol: false, fractionalPrecision: 2, addSpace: true }
  },
  HRK: {
    'hr-HR': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    default: { prependSymbol: false, fractionalPrecision: 2, addSpace: true }
  }
};

export const CURRENCY_SYMBOLS = {
  EUR: '\u20AC',
  PLN: 'z\u0142',
  GBP: '\u00A3',
  RUB: '\u0440\u0443\u0431.',
  BRL: 'R$',
  CHF: 'CHF',
  SEK: 'kr',
  USD: '$',
  CLP: '$',
  BGN: 'лв.',
  CZK: 'Kč',
  DKK: 'kr.',
  HUF: 'Ft',
  NOK: 'kr',
  RON: 'Lei',
  HRK: 'kn'
};

function prependSymbol(amount, symbol, addSpace) {
  return `${symbol}${addSpace ? '\xA0' : ''}${amount}`;
}

function appendSymbol(amount, symbol, addSpace) {
  return `${amount}${addSpace ? '\xA0' : ''}${symbol}`;
}

function addSymbol(amount, symbol, { addSpace = true, prepend = false } = {}) {
  const symbolAddingFn = prepend ? prependSymbol : appendSymbol;
  return symbolAddingFn(amount, symbol, addSpace);
}

export function getCurrencyFormat(currency, locale) {
  const symbol = _get(CURRENCY_SYMBOLS, currency, '');
  const { decimal: decimalSep, thousand: thousandSep } = getNumberFormat(
    locale
  );
  if (!decimalSep || !thousandSep) {
    throw new TypeError(`No number format available for ${locale}`);
  }
  const currencyFormats = _get(CURRENCY_FORMATS, currency.toUpperCase());

  if (!currencyFormats) {
    throw new TypeError(`Currency ${currency} is invalid.`);
  }

  const {
    prependSymbol: prepend,
    fractionalPrecision: currencyPrecision,
    addSpace
  } = _get(currencyFormats, locale, currencyFormats.default);

  return {
    decimalSep,
    thousandSep,
    prepend,
    currencyPrecision,
    addSpace,
    symbol
  };
}

export function shouldPrependSymbol(currency, locale) {
  const { prepend } = getCurrencyFormat(currency, locale);
  return prepend;
}

export function formatCurrency(amount, currency, locale) {
  const currencySymbol = get(currency, CURRENCY_SYMBOLS);
  const currencyFormat = getCurrencyFormat(currency, locale);
  const formattedAmount = toCurrencyNumberFormat(amount, currencyFormat);
  const currencyString = addSymbol(
    formattedAmount,
    currencySymbol,
    currencyFormat
  );

  return currencyString;
}

function toCurrencyNumberFormat(number, currencyFormat) {
  const isAcceptedNumber = isNumber(number) || isString(number);
  const isCurrencyFormat = Object.keys(currencyFormat).length !== 0;
  if (!isAcceptedNumber || !isCurrencyFormat) {
    return number;
  }
  const numberFormat = {
    decimalSep: currencyFormat.decimalSep,
    thousandSep: currencyFormat.thousandSep,
    precision: currencyFormat.currencyPrecision
  };
  return formatNumber(number, numberFormat);
}

export function formatNumberFor(number, currency, locale) {
  const currencyFormat = getCurrencyFormat(currency, locale);
  return toCurrencyNumberFormat(number, currencyFormat);
}
