/**
 * Copyright 2024, SumUp Ltd.
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

import {
  PercentageInput,
  type PercentageInputProps,
} from './PercentageInput.js';

export default {
  title: 'Forms/Input/PercentageInput',
  component: PercentageInput,
};

const baseArgs = {
  label: 'Discount',
  placeholder: 0,
  locale: 'de-DE',
};

export const Base = (args: PercentageInputProps) => (
  <PercentageInput {...args} style={{ maxWidth: '250px' }} />
);

Base.args = baseArgs;

export const Locales = (args: PercentageInputProps) => (
  <Stack>
    <PercentageInput
      {...args}
      style={{ maxWidth: '250px' }}
      label="Percentage (de-DE)"
      locale="de-DE"
    />
    <PercentageInput
      {...args}
      style={{ maxWidth: '250px' }}
      label="Percentage (en-IE)"
      locale="en-IE"
    />
  </Stack>
);

Locales.args = {
  ...baseArgs,
  decimalScale: 1,
};

export const Decimals = (args: PercentageInputProps) => (
  <PercentageInput {...args} style={{ maxWidth: '250px' }} />
);

Decimals.args = {
  ...baseArgs,
  decimalScale: 2,
};
