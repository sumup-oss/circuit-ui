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

import { useState, type ChangeEvent, type FocusEvent } from 'react';
import { action } from '@storybook/addon-actions';
import { CardReaderAir, CardReaderSolo, MobilePhone } from '@sumup-oss/icons';

import { Stack } from '../../../../.storybook/components/index';
import { Selector, type SelectorProps } from '../Selector/Selector';

import { SelectorGroup, type SelectorGroupProps } from './SelectorGroup';

export default {
  title: 'Forms/SelectorGroup',
  component: SelectorGroup,
  subcomponents: { Selector },
};

const storyStyles = { flex: '1', alignSelf: 'flex-start' };

export const Base = (args: SelectorGroupProps) => <SelectorGroup {...args} />;

Base.args = {
  name: 'fruit',
  label: 'Choose your favourite fruit',
  defaultValue: 'apple',
  options: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Mango', value: 'mango' },
  ],
  // Storybook displays the default mocked function props poorly,
  // so we override them for the default story.
  onChange: (event: ChangeEvent<HTMLInputElement>) =>
    action('SelectorGroup')(event),
  onBlur: (event: FocusEvent<HTMLInputElement>) =>
    action('SelectorGroup')(event),
};

export const Multiple = (args: SelectorGroupProps) => (
  <SelectorGroup {...args} />
);

Multiple.args = {
  name: 'multiple',
  multiple: true,
  label: 'Choose your favourite fruits',
  defaultValue: ['apple', 'mango'],
  options: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Mango', value: 'mango' },
  ],
};

export const Sizes = (args: SelectorGroupProps) => (
  <Stack vertical>
    <SelectorGroup
      {...args}
      name="small"
      label="Small"
      size="s"
      style={storyStyles}
    />
    <SelectorGroup
      {...args}
      name="medium"
      label="Medium"
      size="m"
      style={storyStyles}
    />
    <SelectorGroup
      {...args}
      name="flexible"
      label="Flexible"
      size="flexible"
      style={storyStyles}
    />
  </Stack>
);

Sizes.args = {
  label: 'Choose your favourite fruits',
  options: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Mango', value: 'mango' },
  ],
};

export const WithDescriptions = (args: SelectorGroupProps) => (
  <SelectorGroup {...args} />
);

WithDescriptions.args = {
  name: 'descriptions',
  label: 'Choose your favourite fruit',
  options: [
    {
      label: 'Apple',
      description: 'Braeburn, Granny Smith, or Jonagold',
      value: 'apple',
    },
    {
      label: 'Banana',
      description: 'Cavendish, Lakatan, or Tindok',
      value: 'banana',
    },
    {
      label: 'Mango',
      description: 'Alphonso, Dasheri, or Haden',
      value: 'mango',
    },
  ],
};

export const WithIcons = (args: SelectorGroupProps) => (
  <SelectorGroup {...args} />
);

WithIcons.args = {
  name: 'icons',
  label: 'Choose a device',
  options: [
    {
      icon: CardReaderSolo,
      label: 'SumUp Solo',
      value: 'solo',
      description: 'Accepts payments as a standalone device',
    },
    {
      icon: CardReaderAir,
      label: 'SumUp Air',
      value: 'air',
      description: 'Requires the free SumUp app to accept payments',
    },
    {
      icon: MobilePhone,
      label: 'Phone',
      value: 'phone',
      description: 'Accept payments using the free SumUp app',
    },
  ],
};

export const Validations = (args: SelectorGroupProps) => {
  const [value, setValue] = useState<SelectorProps['value']>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const invalid = !value;

  return (
    <SelectorGroup
      {...args}
      value={value}
      onChange={handleChange}
      invalid={invalid}
      validationHint={invalid ? args.validationHint : undefined}
    />
  );
};

Validations.args = {
  label: 'Choose your favourite fruit',
  name: 'invalid',
  optionalLabel: 'Optional',
  validationHint: 'Please choose an option.',
  required: true,
  options: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Mango', value: 'mango' },
  ],
};

export const Disabled = (args: SelectorGroupProps) => (
  <Stack>
    <SelectorGroup
      {...args}
      label="Fully disabled"
      name="fully-disabled"
      disabled
      options={[
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Mango', value: 'mango' },
      ]}
    />
    <SelectorGroup
      {...args}
      label="Partially disabled"
      name="partially-disabled"
      options={[
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Mango', value: 'mango', disabled: true },
      ]}
    />
  </Stack>
);

Disabled.args = {
  label: 'Select a fruit to order',
  defaultValue: 'apple',
};
