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
  Flag,
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
    size: { options: ['s', 'm'] },
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

const StatefulPhoneNumberInput = (args: PhoneNumberInputProps) => {
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

export const Base = (args: PhoneNumberInputProps) => (
  <StatefulPhoneNumberInput {...args} />
);

Base.args = {
  value: '',
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

Base.parameters = {
  chromatic: {
    // covered in the Sizes story
    disableSnapshot: true,
  },
};

export const Validations = (args: PhoneNumberInputProps) => (
  <Stack>
    <StatefulPhoneNumberInput
      {...args}
      required
      validationHint="This is not valid"
      subscriberNumber={{
        ...args.subscriberNumber,
        invalid: true,
      }}
    />
    <StatefulPhoneNumberInput
      {...args}
      hasWarning
      validationHint="This may include additional charges"
    />
    <StatefulPhoneNumberInput
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
  <StatefulPhoneNumberInput {...args} />
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

export const WithoutCountryNames = (args: PhoneNumberInputProps) => (
  <StatefulPhoneNumberInput {...args} />
);

WithoutCountryNames.args = {
  ...Base.args,
  shouldDisplayCountryNames: false,
};

const precomputedCountryLabels: Record<string, string> = {
  CA: 'Canada (+1)',
  US: 'United States (+1)',
  DE: 'Germany (+49)',
};

export const WithCustomLabels = (args: PhoneNumberInputProps) => (
  <StatefulPhoneNumberInput {...args} />
);

WithCustomLabels.args = {
  ...Base.args,
  countryCode: {
    ...Base.args.countryCode,
    options: Base.args.countryCode.options.map((option) => ({
      ...option,
      label: precomputedCountryLabels[option.country],
    })),
  },
};

export const WithCustomDropdown = (args: PhoneNumberInputProps) => (
  <StatefulPhoneNumberInput
    {...args}
    countryCode={{
      ...args.countryCode,
      options: args.countryCode.options.map((option) => ({
        ...option,
        label: precomputedCountryLabels[option.country],
      })),
      renderOption: (option) => (
        <>
          <Flag countryCode={option.country as 'CA' | 'US' | 'DE'} alt="" />
          <span>{option.label}</span>
        </>
      ),
    }}
  />
);

WithCustomDropdown.args = Base.args;

WithCustomDropdown.parameters = {
  docs: {
    source: {
      code: `<PhoneNumberInput
  label="Phone number"
  countryCode={{
    label: 'Country code',
    defaultValue: 'CA',
    options: [
      { country: 'CA', code: '+1', label: 'Canada (+1)' },
      { country: 'US', code: '+1', label: 'United States (+1)' },
      { country: 'DE', code: '+49', label: 'Germany (+49)' },
    ],
    renderOption: (option) => (
      <>
        <Flag countryCode={option.country} alt="" />
        <span>{option.label}</span>
      </>
    ),
  }}
  subscriberNumber={{
    label: 'Subscriber number',
    placeholder: '202 555 0132',
  }}
/>`,
    },
  },
};

export const Sizes = (args: PhoneNumberInputProps) => (
  <Stack>
    <StatefulPhoneNumberInput {...args} size="s" />
    <StatefulPhoneNumberInput {...args} size="m" />
  </Stack>
);

Sizes.args = Base.args;
