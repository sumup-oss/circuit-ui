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
import SearchInput from '../SearchInput/index.js';
import CurrencyInput from '../CurrencyInput/index.js';
import DateInput from '../DateInput/index.js';

import { Input, InputProps } from './Input.js';

export default {
  title: 'Forms/Input',
  component: Input,
  subcomponents: { SearchInput, CurrencyInput, DateInput },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

const baseArgs = {
  label: 'First name',
  placeholder: 'Jane',
  validationHint: 'Maximum 100 characters',
};

export const Base = (args: InputProps) => <Input {...args} />;

Base.args = baseArgs;

export const Validations = (args: InputProps) => (
  <Stack>
    <Input {...args} validationHint="This field is required." invalid />
    <Input
      {...args}
      defaultValue="poop"
      validationHint="C'mon. Choose an appropriate name."
      hasWarning
    />
    <Input
      {...args}
      defaultValue="john.doe"
      validationHint="Yay! That username is available."
      showValid
    />
  </Stack>
);

Validations.args = {
  label: 'Username',
  placeholder: 'jane123',
};

export const Optional = (args: InputProps) => <Input {...args} />;

Optional.args = {
  ...baseArgs,
  optionalLabel: 'optional',
};

export const Readonly = (args: InputProps) => <Input {...args} />;

Readonly.args = {
  ...baseArgs,
  label: 'API token',
  value: 'a3b2c1',
  validationHint: 'Select and copy me',
  readOnly: true,
};

export const Disabled = (args: InputProps) => <Input {...args} />;

Disabled.args = {
  ...baseArgs,
  value: "You can't edit me",
  disabled: true,
};

export const Inline = (args: InputProps) => (
  <div
    style={{
      display: 'grid',
      gap: 'var(--cui-spacings-mega)',
      gridTemplateColumns: 'repeat(2, 1fr)',
    }}
  >
    <Input {...args} label="First name" placeholder="Jane" />
    <Input {...args} label="Last name" placeholder="Doe" />
  </div>
);

Inline.args = baseArgs;

export const HiddenLabel = (args: InputProps) => <Input {...args} />;

HiddenLabel.args = {
  ...baseArgs,
  label: 'Email',
  placeholder: 'Email',
  type: 'email',
  validationHint: '',
  hideLabel: true,
};
