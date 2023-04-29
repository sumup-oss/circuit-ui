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

import { Stack } from '../../../../.storybook/components/index.js';

import { CurrencyInput, CurrencyInputProps } from './CurrencyInput.js';

export default {
  title: 'Forms/Input/CurrencyInput',
  component: CurrencyInput,
};

const baseArgs = {
  label: 'Amount (de-DE, EUR)',
  placeholder: 123.45,
  validationHint: 'Excluding VAT',
  currency: 'EUR',
  locale: 'de-DE',
  style: { maxWidth: '250px' },
};

export const Base = (args: CurrencyInputProps) => <CurrencyInput {...args} />;

Base.args = baseArgs;

export const Currencies = (args: CurrencyInputProps) => (
  <Stack>
    <CurrencyInput
      {...args}
      label="Amount (pt-BR, BRL)"
      currency="BRL"
      locale="pt-BR"
    />
    <CurrencyInput
      {...args}
      label="Amount (pt-BR, EUR)"
      currency="EUR"
      locale="pt-BR"
    />
  </Stack>
);

Currencies.args = baseArgs;

export const Locales = (args: CurrencyInputProps) => (
  <Stack>
    <CurrencyInput
      {...args}
      label="Amount (de-DE, EUR)"
      currency="EUR"
      locale="de-DE"
    />
    <CurrencyInput
      {...args}
      label="Amount (en-IE, EUR)"
      currency="EUR"
      locale="en-IE"
    />
  </Stack>
);

Locales.args = baseArgs;
