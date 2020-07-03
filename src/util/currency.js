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

import { compose, defaultTo, get, isNumber, isString } from 'lodash/fp';

import { NUMBER_SEPARATORS, formatNumber, getNumberFormat } from './numbers';
import { currencyToRegex } from './regex';

export const CURRENCY_FORMATS = {
  EUR: {
    'el-CY': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    'el-GR': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    'et-EE': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    'de-AT': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    'de-DE': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    'de-LU': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    'en-IE': { prependSymbol: true, fractionalPrecision: 2, addSpace: false },
    'en-MT': { prependSymbol: true, fractionalPrecision: 2, addSpace: false },
    'es-ES': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    'fi-FI': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    'fr-BE': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    'fr-FR': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    'fr-LU': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    'it-IT': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    'lt-LT': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    'lv-LV': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    'nl-BE': { prependSymbol: true, fractionalPrecision: 2, addSpace: true },
    'nl-NL': { prependSymbol: true, fractionalPrecision: 2, addSpace: true },
    'pt-PT': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    'sk-SK': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    'sl-SI': { prependSymbol: false, fractionalPrecision: 2, addSpace: true },
    default: { prependSymbol: false, fractionalPrecision: 2, addSpace: true }
  },
  CHF: {
    'de-CH': { prependSymbol: true, fractionalPrecision: 2, addSpace: true },
    'it-CH': { prependSymbol: true, fractionalPrecision: 2, addSpace: true },
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
  },
  COP: {
    default: { prependSymbol: true, fractionalPrecision: 2, addSpace: false },
    'es-CO': { prependSymbol: true, fractionalPrecision: 2, addSpace: false }
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
  HRK: 'kn',
  COP: '$'
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
  const symbol = compose(
    defaultTo(currency),
    get(currency)
  )(CURRENCY_SYMBOLS);

  const { decimal: decimalSep, thousand: thousandSep } = getNumberFormat(
    locale
  );

  const currencyFormats =
    get(currency.toUpperCase(), CURRENCY_FORMATS) ||
    get('EUR', CURRENCY_FORMATS);

  const {
    prependSymbol: prepend,
    fractionalPrecision: currencyPrecision,
    addSpace
  } = get(locale, currencyFormats) || currencyFormats.default;

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
  const currencySymbol = compose(
    defaultTo(currency),
    get(currency)
  )(CURRENCY_SYMBOLS);
  const currencyFormat = getCurrencyFormat(currency, locale);

  const absAmount = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';

  const formattedAmount = toCurrencyNumberFormat(absAmount, currencyFormat);
  const currencyString = addSymbol(
    formattedAmount,
    currencySymbol,
    currencyFormat
  );

  return `${sign}${currencyString}`;
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

export function formatAmountForLocale(number, currency, locale) {
  const currencyFormat = getCurrencyFormat(currency, locale);
  return toCurrencyNumberFormat(number, currencyFormat);
}

export function currencyRegex(currency, locale) {
  const currencyFormat = get(currency, CURRENCY_FORMATS);
  const currencyLocaleFormat = get(locale, currencyFormat);
  const { fractionalPrecision } =
    currencyLocaleFormat || currencyFormat.default;

  const numberFormat = get(locale, NUMBER_SEPARATORS);
  const { decimal, thousand } = numberFormat;

  return currencyToRegex([thousand], fractionalPrecision, [decimal]);
}
