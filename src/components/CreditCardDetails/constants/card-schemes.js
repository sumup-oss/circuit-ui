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

export const CREDIT_SCHEMES = {
  AMEX: 'amex',
  DINERS: 'diners',
  DISCOVER: 'discover',
  ELO: 'elo',
  JCB: 'jcb',
  MASTERCARD: 'mastercard',
  VISA: 'visa'
};

export const DEBIT_SCHEMES = {
  HIPERCARD: 'hipercard',
  MAESTRO: 'maestro'
};

export const SCHEMES = { ...CREDIT_SCHEMES, ...DEBIT_SCHEMES };

const SCHEMES_CL = [SCHEMES.MASTERCARD, SCHEMES.VISA];

const SCHEMES_BR = [
  SCHEMES.VISA,
  SCHEMES.MASTERCARD,
  SCHEMES.ELO,
  SCHEMES.HIPERCARD,
  SCHEMES.AMEX,
  SCHEMES.DISCOVER,
  SCHEMES.DINERS,
  SCHEMES.JCB
];

const SCHEMES_PL = [
  SCHEMES.MASTERCARD,
  SCHEMES.VISA,
  SCHEMES.AMEX,
  SCHEMES.JCB
];

const SCHEMES_SE = [
  SCHEMES.MASTERCARD,
  SCHEMES.VISA,
  SCHEMES.AMEX,
  SCHEMES.DISCOVER,
  SCHEMES.DINERS
];

const SCHEMES_DEFAULT = [
  SCHEMES.MASTERCARD,
  SCHEMES.VISA,
  SCHEMES.AMEX,
  SCHEMES.DISCOVER,
  SCHEMES.DINERS,
  SCHEMES.JCB
];

export const COUNTRY_SCHEMES = {
  BR: SCHEMES_BR,
  CL: SCHEMES_CL,
  PL: SCHEMES_PL,
  SE: SCHEMES_SE,
  default: SCHEMES_DEFAULT
};
