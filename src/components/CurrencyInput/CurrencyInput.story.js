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

import { uniqueId } from '../../util/id';

import docs from './CurrencyInput.docs.mdx';
import CurrencyInput from './CurrencyInput';
import Label from '../Label';

export default {
  title: 'Forms/Input/CurrencyInput',
  component: CurrencyInput,
  parameters: {
    docs: { page: docs },
    jest: ['CurrencyInput']
  }
};

// CurrencyInputs always need labels for accessibility.
const CurrencyInputWithLabel = props => {
  const id = uniqueId();
  return (
    <Label htmlFor={id}>
      Amount
      <CurrencyInput placeholder="123.45" {...props} id={id} />
    </Label>
  );
};

export const base = () => (
  <CurrencyInputWithLabel placeholder="123,45" locale="de-DE" currency="EUR" />
);

export const currencies = () => (
  <>
    <CurrencyInputWithLabel
      placeholder="1,234.50"
      currency="USD"
      locale="en-US"
    />
    <CurrencyInputWithLabel
      placeholder="1 234,50"
      currency="RUB"
      locale="ru-RU"
    />
  </>
);

export const locales = () => (
  <>
    <CurrencyInputWithLabel
      placeholder="1.234,50"
      currency="EUR"
      locale="de-DE"
    />
    <CurrencyInputWithLabel
      placeholder="1,234.50"
      currency="EUR"
      locale="en-IE"
    />
  </>
);
