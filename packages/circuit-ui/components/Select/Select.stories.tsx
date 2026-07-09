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

import { useState } from 'react';

import { Select, type SelectProps } from './Select.js';
import { Stack } from '../../../../.storybook/components/index.js';
import { Flag, type FlagProps } from '../Flag/Flag.js';

export default {
  title: 'Forms/Select',
  component: Select,
  tags: ['status:stable'],
};

const baseArgs = {
  name: 'select',
  label: 'Countries',
  placeholder: 'Select an option',
  options: [
    {
      label: 'United States',
      value: 'US',
    },
    {
      label: 'Germany',
      value: 'DE',
    },
    {
      label: 'France',
      value: 'FR',
    },
  ],
};

export const Base = (args: SelectProps) => <Select {...args} />;

Base.args = baseArgs;

Base.parameters = {
  chromatic: {
    // covered in the Sizes story
    disableSnapshot: true,
  },
};
export const Invalid = (args: SelectProps) => <Select {...args} />;

Invalid.args = {
  ...baseArgs,
  validationHint: 'This field is required',
  invalid: true,
};

export const Optional = (args: SelectProps) => <Select {...args} />;

Optional.args = {
  ...baseArgs,
  optionalLabel: 'optional',
};

export const WithPrefix = (args: SelectProps) => {
  const [value, setValue] = useState('US');
  return (
    <Select
      {...args}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      renderPrefix={(props) =>
        props.value ? (
          <Flag
            {...props}
            alt=""
            countryCode={props.value as FlagProps['countryCode']}
            size="s"
          />
        ) : null
      }
    />
  );
};

WithPrefix.args = baseArgs;

export const HiddenLabel = (args: SelectProps) => <Select {...args} />;

HiddenLabel.args = { ...baseArgs, hideLabel: true };

export const Sizes = (args: SelectProps) => (
  <Stack>
    <Select {...args} size="s" />
    <Select {...args} size="m" />
  </Stack>
);

Sizes.args = baseArgs;
