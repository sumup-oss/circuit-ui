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

import React from 'react';
import { storiesOf } from '@storybook/react';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import SimpleCurrencyInput from './SimpleCurrencyInput';
import { CURRENCY_SYMBOLS } from '../../../../util/currency';

const numberMask = createNumberMask({
  prefix: '',
  suffix: '',
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalLimit: 2,
  decimalSymbol: '.'
});

storiesOf('Forms|CurrencyInput/SimpleCurrencyInput', module)
  .addParameters({
    component: SimpleCurrencyInput
  })
  .addParameters({ jest: ['SimpleCurrencyInput'] })
  .add('Default SimpleCurrencyInput', () => (
    <SimpleCurrencyInput
      placeholder="123.45"
      symbol={CURRENCY_SYMBOLS.EUR}
      numberMask={numberMask}
    />
  ))
  .add('SimpleCurrencyInput for USD', () => (
    <SimpleCurrencyInput
      symbol={CURRENCY_SYMBOLS.USD}
      placeholder="1,234.45"
      numberMask={numberMask}
      prependSymbol
    />
  ))
  .add('SimpleCurrencyInput for right aligned CHF', () => (
    <SimpleCurrencyInput
      symbol={CURRENCY_SYMBOLS.CHF}
      placeholder="1,234.45"
      numberMask={numberMask}
      prependSymbol={false}
    />
  ));
