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

import React, { useState, ChangeEvent } from 'react';

import { RadioButtonGroup, RadioButtonGroupProps } from './RadioButtonGroup';

export default {
  title: 'Forms/RadioButton/RadioButtonGroup',
  component: RadioButtonGroup,
  argTypes: {
    name: { control: 'text' },
    value: { control: 'text' },
    options: { control: 'array' },
    invalid: { control: 'boolean' },
    showValid: { control: 'boolean' },
    hasWarning: { control: 'boolean' },
    validationHint: { control: 'text' },
  },
};

export const Base = (args: RadioButtonGroupProps) => {
  const [value, setValue] = useState<string>();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return <RadioButtonGroup {...args} value={value} onChange={handleChange} />;
};

Base.args = {
  name: 'radio-button-group',
  label: 'Choose your favourite fruit',
  options: [
    { children: 'Apple', value: 'apple' },
    { children: 'Banana', value: 'banana' },
    { children: 'Mango', value: 'mango' },
  ],
};

export const NoLabel = (args: RadioButtonGroupProps) => {
  const [value, setValue] = useState<string>();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return <RadioButtonGroup {...args} value={value} onChange={handleChange} />;
};

NoLabel.args = {
  name: 'radio-button-group',
  options: [
    { children: 'Apple', value: 'apple' },
    { children: 'Banana', value: 'banana' },
    { children: 'Mango', value: 'mango' },
  ],
};

export const Invalid = (args: RadioButtonGroupProps) => {
  const [value, setValue] = useState<string>();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return <RadioButtonGroup {...args} value={value} onChange={handleChange} />;
};

Invalid.args = {
  name: 'radio-button-group',
  label: 'Choose your favourite fruit',
  options: [
    { children: 'Apple', value: 'apple' },
    { children: 'Banana', value: 'banana' },
    { children: 'Mango', value: 'mango' },
  ],
  invalid: true,
  validationHint: 'This field is required.',
};

export const Valid = (args: RadioButtonGroupProps) => {
  const [value, setValue] = useState<string>();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return <RadioButtonGroup {...args} value={value} onChange={handleChange} />;
};

Valid.args = {
  name: 'radio-button-group',
  label: 'Choose your favourite fruit',
  options: [
    { children: 'Apple', value: 'apple' },
    { children: 'Banana', value: 'banana' },
    { children: 'Mango', value: 'mango' },
  ],
  showValid: true,
  validationHint: 'You chose an option.',
};

export const Warning = (args: RadioButtonGroupProps) => {
  const [value, setValue] = useState<string>();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return <RadioButtonGroup {...args} value={value} onChange={handleChange} />;
};

Warning.args = {
  name: 'radio-button-group',
  label: 'Choose your favourite fruit',
  options: [
    { children: 'Apple', value: 'apple' },
    { children: 'Banana', value: 'banana' },
    { children: 'Mango', value: 'mango' },
  ],
  hasWarning: true,
  validationHint: 'This choice might cause errors.',
};
