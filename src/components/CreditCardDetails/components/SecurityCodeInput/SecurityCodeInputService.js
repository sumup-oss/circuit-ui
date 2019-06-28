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

import { curry } from '../../../../util/fp';

import { SCHEMES } from '../../constants/card-schemes';

export const getPlaceholder = cardScheme =>
  cardScheme === SCHEMES.AMEX ? '1234' : '123';

export const getMask = cardScheme =>
  cardScheme === SCHEMES.AMEX ? [/\d/, /\d/, /\d/, /\d/] : [/\d/, /\d/, /\d/];

export const isValidSecurityCode = curry((scheme, value) => {
  if (!value || !value.length) {
    return false;
  }
  return scheme === SCHEMES.AMEX
    ? /^\d{4}$/.test(value)
    : /^\d{3}$/.test(value);
});
