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

import docs from './CurrencyInput.docs.mdx';
import CurrencyInput from './CurrencyInput';

export default {
  title: 'Forms/Input/CurrencyInput',
  component: CurrencyInput,
  parameters: {
    docs: { page: docs }
  }
};

export const base = () => (
  <CurrencyInput
    placeholder={123.45}
    locale="de-DE"
    currency="EUR"
    label="Amount (de-DE, EUR)"
  />
);

export const currencies = () => (
  <>
    <CurrencyInput
      placeholder={1234.5}
      currency="BRL"
      locale="pt-BR"
      label="Amount (pt-BR, BRL)"
    />
    <CurrencyInput
      placeholder={1234.5}
      currency="USD"
      locale="pt-BR"
      label="Amount (pt-BR, USD)"
    />
  </>
);

export const locales = () => (
  <>
    <CurrencyInput
      placeholder={1234.5}
      currency="EUR"
      locale="de-DE"
      label="Amount (de-DE, EUR)"
    />
    <CurrencyInput
      placeholder={1234.5}
      currency="EUR"
      locale="en-IE"
      label="Amount (en-IE, EUR)"
    />
  </>
);
