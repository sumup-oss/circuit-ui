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
import { clamp } from 'lodash/fp';
import { format } from '@sumup/intl';

export const createCurrencyMask = (currencyFormat, options = {}) => {
  const {
    maximumFractionDigits: decimalLimit,
    decimalDelimiter: decimalSymbol = '.',
    groupDelimiter: thousandsSeparatorSymbol = ','
  } = currencyFormat;

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

export function formatPlaceholder(placeholder, locale, options) {
  return typeof placeholder === 'number'
    ? format(placeholder, locale, options)
    : placeholder;
}

const CHAR_WIDTH = 9;

export function getSymbolLength(symbol = '') {
  const length = clamp(2, symbol.length, 5);
  return length * CHAR_WIDTH;
}
