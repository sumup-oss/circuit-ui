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

import { Stack } from '../../../../.storybook/components';
import RadioButton from '../RadioButton';

import { RadioButtonGroup, RadioButtonGroupProps } from './RadioButtonGroup';

export default {
  title: 'Forms/RadioButtonGroup',
  component: RadioButtonGroup,
  subcomponents: { RadioButton },
  argTypes: {
    value: { control: 'text' },
    invalid: { control: 'boolean' },
    showValid: { control: 'boolean' },
    hasWarning: { control: 'boolean' },
  },
};

const storyStyles = { flex: '1', alignSelf: 'flex-start' };

export const Base = (args: RadioButtonGroupProps) => (
  <RadioButtonGroup {...args} />
);

Base.args = {
  name: 'fruit',
  label: 'Choose your favourite fruit',
  defaultValue: 'banana',
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

export const Validations = (args: RadioButtonGroupProps) => (
  <Stack>
    <RadioButtonGroup
      {...args}
      name="invalid"
      validationHint="Please choose an option."
      required
      invalid
      style={storyStyles}
    />
    <RadioButtonGroup
      {...args}
      defaultValue="mango"
      name="invalid"
      validationHint="Some people are allergic to mangos."
      hasWarning
      style={storyStyles}
    />
    <RadioButtonGroup
      {...args}
      defaultValue="apple"
      name="valid"
      validationHint="Good choice! Apples are delicious."
      showValid
      style={storyStyles}
    />
  </Stack>
);

Validations.args = {
  label: 'Choose your favourite fruit',
  optionalLabel: 'Optional',
  options: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Mango', value: 'mango' },
  ],
};

export const Disabled = (args: RadioButtonGroupProps) => (
  <Stack>
    <RadioButtonGroup
      {...args}
      name="fully-disabled"
      disabled
      options={[
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Mango', value: 'mango' },
      ]}
      validationHint="All fruits are sold out"
      style={storyStyles}
    />
    <RadioButtonGroup
      {...args}
      name="partially-disabled"
      options={[
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Mango', value: 'mango', disabled: true },
      ]}
      validationHint="Some fruits are sold out"
      style={storyStyles}
    />
  </Stack>
);

Disabled.args = {
  label: 'Select a fruit to order',
};
