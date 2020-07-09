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
import { css } from '@emotion/core';
import { boolean, text } from '@storybook/addon-knobs';

import docs from './CurrencyInput.docs.mdx';
import { CurrencyInput, CurrencyInputProps } from './CurrencyInput';

export default {
  title: 'Forms/Input/CurrencyInput',
  component: CurrencyInput,
  parameters: {
    docs: { page: docs },
  },
};

const BaseCurrencyInput = (props: Partial<CurrencyInputProps>) => (
  <CurrencyInput
    currency="EUR"
    validationHint={text('Validation hint', 'Excluding VAT')}
    invalid={boolean('Invalid', false)}
    showValid={boolean('Show valid', false)}
    hasWarning={boolean('Has warning', false)}
    css={css`
      max-width: 250px;
    `}
    {...props}
  />
);

export const base = () => (
  <BaseCurrencyInput
    label="Amount (de-DE, EUR)"
    placeholder={123.45}
    locale="de-DE"
    currency="EUR"
  />
);

export const currencies = () => (
  <>
    <BaseCurrencyInput
      label="Amount (pt-BR, BRL)"
      placeholder={1234.5}
      currency="BRL"
      locale="pt-BR"
    />
    <BaseCurrencyInput
      label="Amount (pt-BR, EUR)"
      placeholder={1234.5}
      currency="EUR"
      locale="pt-BR"
    />
  </>
);

export const locales = () => (
  <>
    <BaseCurrencyInput
      label="Amount (de-DE, EUR)"
      placeholder={1234.5}
      currency="EUR"
      locale="de-DE"
    />
    <BaseCurrencyInput
      label="Amount (en-IE, EUR)"
      placeholder={1234.5}
      currency="EUR"
      locale="en-IE"
    />
  </>
);
