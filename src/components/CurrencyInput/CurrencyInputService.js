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

import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { curry } from 'lodash/fp';

import { getCurrencyFormat } from '../../util/currency';
import { currencyToRegex } from '../../util/regex';

export const normalizeAmount = value => {
  if (!value || !value.length) {
    return value;
  }

  const matches = value.match(/[^\d](\d{1,2})$/) || [];
  const [, decimals] = matches;

  const digits = value.replace(/[^\d]/g, '');

  if (digits === '') {
    return '0.00';
  }

  const integers =
    decimals === undefined ? digits : digits.slice(0, -decimals.length);
  const numberString = `${integers}.${decimals}`;
  return parseFloat(numberString);
};

export const createCurrencyMask = (currency, locale, options = {}) => {
  const {
    decimalSep: decimalSymbol = '.',
    thousandSep: thousandsSeparatorSymbol = ',',
    currencyPrecision: decimalLimit
  } = getCurrencyFormat(currency, locale);

  return createNumberMask({
    prefix: '',
    suffix: '',
    thousandsSeparatorSymbol,
    allowDecimal: decimalLimit > 0,
    decimalLimit,
    decimalSymbol,
    ...options
  });
};

export const isValidAmount = curry((currency, locale, value) => {
  const { decimalSep, thousandSep, currencyPrecision } = getCurrencyFormat(
    currency,
    locale
  );
  const pattern = currencyToRegex([thousandSep], currencyPrecision, [
    decimalSep
  ]);
  const regex = new RegExp(pattern);
  return regex.test(value);
});
