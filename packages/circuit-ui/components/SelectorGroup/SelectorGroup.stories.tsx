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

import { useState, ChangeEvent } from 'react';

import Selector from '../Selector';

import { SelectorGroup, SelectorGroupProps } from './SelectorGroup';

export default {
  title: 'Forms/SelectorGroup',
  component: SelectorGroup,
  subcomponents: { Selector },
};

export const Base = (args: SelectorGroupProps) => {
  const [value, setValue] = useState<string>('');

  return (
    <SelectorGroup
      {...args}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
    />
  );
};

Base.args = {
  name: 'base',
  label: 'Choose your favourite fruit',
  options: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Mango', value: 'mango' },
    { label: 'I like all fruits', value: 'all' },
  ],
};

export const Multiple = (args: SelectorGroupProps) => {
  const [value, setValue] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValue((prev) =>
      prev.includes(event.target.value)
        ? prev.filter((v) => v !== event.target.value)
        : [...prev, event.target.value],
    );
  };

  return (
    <SelectorGroup
      {...args}
      value={value}
      onChange={handleChange}
      stretch={false}
    />
  );
};

Multiple.args = {
  name: 'multiple',
  multiple: true,
  label: 'Choose your favourite fruits',
  options: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Mango', value: 'mango' },
  ],
};

export const Descriptions = (args: SelectorGroupProps) => {
  const [value, setValue] = useState<string>('');

  return (
    <SelectorGroup
      {...args}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
    />
  );
};

Descriptions.args = {
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
