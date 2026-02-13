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

import {
  Alert,
  Checkmark,
  Notify,
  type IconComponentType,
} from '@sumup-oss/icons';
import { useState } from 'react';
import { action } from 'storybook/actions';

import { Stack } from '../../../../.storybook/components/index.js';

import {
  PhoneNumberInput,
  type PhoneNumberInputProps,
} from './PhoneNumberInput.js';

export default {
  title: 'Forms/PhoneNumberInput',
  component: PhoneNumberInput,
  tags: ['status:stable'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
};

const flagIconMap: { [key: string]: IconComponentType<'16'> } = {
  CA: Checkmark,
  US: Notify,
  DE: Alert,
};

const countryCodeMap: { [key: string]: string } = {
  CA: '+1',
  US: '+1',
  DE: '+49',
};

export const Base = (args: PhoneNumberInputProps) => {
  const [value, setValue] = useState(args.value);
  return (
    <PhoneNumberInput
      {...args}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
    />
  );
};

Base.args = {
  label: 'Phone number',
  countryCode: {
    label: 'Country code',
    defaultValue: 'CA',
    options: Object.keys(countryCodeMap).map((key) => ({
      country: key,
      code: countryCodeMap[key],
    })),
  },
  subscriberNumber: {
    label: 'Subscriber number',
    placeholder: '202 555 0132',
  },
  validationHint: 'Maximum 15 digits',
  onChange: action('onChange'),
};

export const Validations = (args: PhoneNumberInputProps) => (
  <Stack>
    <PhoneNumberInput
      {...args}
      required
      validationHint="This is not valid"
      subscriberNumber={{
        ...args.subscriberNumber,
        invalid: true,
      }}
    />
    <PhoneNumberInput
      {...args}
      hasWarning
      validationHint="This may include additional charges"
    />
    <PhoneNumberInput
      {...args}
      defaultValue="+1202 555 0132"
      validationHint="This looks good"
      showValid
    />
  </Stack>
);

Validations.args = Base.args;

export const Readonly = (args: PhoneNumberInputProps) => (
  <PhoneNumberInput {...args} />
);

Readonly.args = {
  ...Base.args,
  countryCode: {
    ...Base.args.countryCode,
    readonly: true,
  },
};

export const Optional = (args: PhoneNumberInputProps) => (
  <PhoneNumberInput {...args} />
);

Optional.args = {
  ...Base.args,
  required: false,
  optionalLabel: 'This field is optional',
};

export const Disabled = (args: PhoneNumberInputProps) => (
  <PhoneNumberInput {...args} />
);

Disabled.args = {
  ...Base.args,
  disabled: true,
};

export const WithPrefix = (args: PhoneNumberInputProps) => {
  const [selectedCountry, setSelectedCountry] = useState('CA');
  return (
    <PhoneNumberInput
      {...args}
      countryCode={{
        ...args.countryCode,
        onChange: (event) => {
          setSelectedCountry(event.target.value);
        },
        renderPrefix: (props) => {
          const Icon = flagIconMap[selectedCountry];
          return Icon ? <Icon {...props} aria-hidden="true" /> : null;
        },
      }}
    />
  );
};

WithPrefix.args = Base.args;
