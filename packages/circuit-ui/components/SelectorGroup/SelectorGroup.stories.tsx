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

import type { ChangeEvent, FocusEvent } from 'react';
import { action } from '@storybook/addon-actions';

import Selector from '../Selector';
import { Stack } from '../../../../.storybook/components';

import { SelectorGroup, SelectorGroupProps } from './SelectorGroup.js';

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
    action('CheckboxGroup')(event),
  onBlur: (event: FocusEvent<HTMLInputElement>) =>
    action('CheckboxGroup')(event),
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
      name="kilo"
      label="Kilo"
      size="kilo"
      style={storyStyles}
    />
    <SelectorGroup
      {...args}
      name="mega"
      label="Mega"
      size="mega"
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
};
