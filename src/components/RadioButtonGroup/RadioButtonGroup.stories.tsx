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
};

const options = [
  {
    children: 'Apple',
    value: 'apple',
  },
  {
    children: 'Banana',
    value: 'banana',
  },
  {
    children: 'Mango',
    value: 'mango',
  },
];

const RadioButtonGroupWithState = ({
  value: initial,
  children,
  ...props
}: Partial<RadioButtonGroupProps>) => {
  const [value, setValue] = useState(initial);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <RadioButtonGroup
      {...props}
      options={options}
      value={value}
      onChange={handleChange}
      label="Choose your favourite fruit"
    />
  );
};

export const base = () => (
  <RadioButtonGroupWithState name="radio-button-group" />
);
