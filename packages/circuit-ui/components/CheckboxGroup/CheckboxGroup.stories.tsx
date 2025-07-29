/**
 * Copyright 2022, SumUp Ltd.
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
import { action } from 'storybook/actions';

import { Stack } from '../../../../.storybook/components/index.js';

import { CheckboxGroup, type CheckboxGroupProps } from './CheckboxGroup.js';

export default {
  title: 'Forms/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['status:stable'],
};

const storyStyles = { flex: '1', alignSelf: 'flex-start' };

export const Base = (args: CheckboxGroupProps) => <CheckboxGroup {...args} />;

Base.args = {
  name: 'fruits',
  label: 'Choose your favourite fruit',
  defaultValue: ['mango'],
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

export const Validations = (args: CheckboxGroupProps) => (
  <Stack>
    <CheckboxGroup
      {...args}
      name="invalid"
      validationHint="Please choose an option."
      required
      invalid
      style={storyStyles}
    />
    <CheckboxGroup
      {...args}
      name="warning"
      defaultValue={['mango']}
      validationHint="Some people are allergic to mangos."
      hasWarning
      style={storyStyles}
    />
    <CheckboxGroup
      {...args}
      defaultValue={['apple']}
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

export const Disabled = (args: CheckboxGroupProps) => (
  <Stack>
    <CheckboxGroup
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
    <CheckboxGroup
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
  label: 'Select some fruits to order',
  defaultValue: ['apple'],
};
