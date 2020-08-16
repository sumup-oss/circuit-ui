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

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { Stack } from '../../../.storybook/components';

import docs from './CurrencyInput.docs.mdx';
import { CurrencyInput, CurrencyInputProps } from './CurrencyInput';

export default {
  title: 'Forms/Input/CurrencyInput',
  component: CurrencyInput,
  parameters: {
    docs: { page: docs },
  },
};

const storyStyles = css`
  max-width: 250px;
`;

const baseArgs = {
  label: 'Amount (de-DE, EUR)',
  placeholder: 123.45,
  validationHint: 'Excluding VAT',
  currency: 'EUR',
  locale: 'de-DE',
};

export const Base = (args: CurrencyInputProps) => (
  <CurrencyInput {...args} css={storyStyles} />
);

Base.args = baseArgs;

export const Currencies = (args: CurrencyInputProps) => (
  <Stack>
    <CurrencyInput
      {...args}
      label="Amount (pt-BR, BRL)"
      placeholder={1234.5}
      currency="BRL"
      locale="pt-BR"
    />
    <CurrencyInput
      {...args}
      label="Amount (pt-BR, EUR)"
      placeholder={1234.5}
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
      placeholder={1234.5}
      currency="EUR"
      locale="de-DE"
    />
    <CurrencyInput
      {...args}
      label="Amount (en-IE, EUR)"
      placeholder={1234.5}
      currency="EUR"
      locale="en-IE"
    />
  </Stack>
);

Locales.args = baseArgs;
