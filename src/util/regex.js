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

import { includes } from 'lodash/fp';

function charToRegex(value) {
  const escapeChars = "\\.+*?[^]$(){}=!<>|:-'";
  if (includes(value, escapeChars)) {
    return `\\${value}`;
  }
  return value;
}

function stringToRegex(value) {
  return value
    .split('')
    .map(v => charToRegex(v))
    .join('')
    .replace(/[\s]/g, '\\s');
}

function arrayOfStringsToRegex(values = []) {
  return values.map(value => stringToRegex(value));
}

export function currencyToRegex(
  thousandSeparators = [' ', '.', ',', "'", '`'],
  decimalNumbers = 2,
  decimalSeparators = ['.', ','],
  thousandGroupNumbers = 3
) {
  const thousandSeparatorsRegex = arrayOfStringsToRegex(
    thousandSeparators
  ).join('|');
  const decimalSeparatorsRegex = arrayOfStringsToRegex(decimalSeparators).join(
    '|'
  );

  // eslint-disable-next-line prettier/prettier
  const integerRegex = `(\\d{0,${thousandGroupNumbers - 1}}(?:(?:${thousandSeparatorsRegex})?\\d{${thousandGroupNumbers}})*)`;
  const decimalRegex =
    decimalNumbers > 0
      ? `(?:(?:${decimalSeparatorsRegex})(\\d{0,${decimalNumbers}}))?`
      : '';

  return `^${integerRegex}${decimalRegex}$`;
}
