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

import React, { useState, FC } from 'react';
import { FlagDe, FlagUs, FlagFr } from '@sumup/icons';

import { Select, SelectProps } from './Select';
import docs from './Select.docs.mdx';

export default {
  title: 'Forms/Select',
  component: Select,
  parameters: {
    docs: { page: docs },
  },
};

const baseArgs = {
  name: 'select',
  label: 'Countries',
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
  noMargin: true,
};

const flagIconMap: { [key: string]: FC<{ className?: string }> } = {
  DE: FlagDe,
  US: FlagUs,
  FR: FlagFr,
};

export const Base = (args: SelectProps) => <Select {...args} />;

Base.args = baseArgs;

export const Invalid = (args: SelectProps) => <Select {...args} />;

Invalid.args = {
  ...baseArgs,
  validationHint: 'This field is required',
  invalid: true,
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
      renderPrefix={(props) => {
        const Icon = props.value && flagIconMap[props.value];
        return Icon ? <Icon {...props} /> : null;
      }}
    />
  );
};

WithPrefix.args = baseArgs;

export const HiddenLabel = (args: SelectProps) => <Select {...args} />;

HiddenLabel.args = { ...baseArgs, hideLabel: true };
