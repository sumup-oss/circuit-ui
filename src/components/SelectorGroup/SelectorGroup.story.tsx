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

import { SelectorGroup, SelectorGroupProps } from './SelectorGroup';

export default {
  title: 'Forms/Selector/SelectorGroup',
  component: SelectorGroup
};

const options = [
  {
    children: 'Apple',
    value: 'apple'
  },
  {
    children: 'Banana',
    value: 'banana'
  },
  {
    children: 'Mango',
    value: 'mango'
  }
];

/* eslint-disable react/prop-types */
const SelectorGroupWithState = (props: Partial<SelectorGroupProps>) => {
  const [value, setValue] = useState<string | string[]>(
    props.multiple ? [] : ''
  );
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValue(prev => {
      if (!props.multiple) {
        return event.target.value;
      }
      const prevArray = prev as string[];
      return prevArray.includes(event.target.value)
        ? prevArray.filter(v => v !== event.target.value)
        : [...prevArray, event.target.value];
    });
  };
  return (
    <SelectorGroup
      name="selector-group"
      label="Choose your favourite fruit"
      options={options}
      onChange={handleChange}
      value={value}
      {...props}
    />
  );
};
/* eslint-enable react/prop-types */

export const base = () => <SelectorGroupWithState />;

export const multiple = () => <SelectorGroupWithState multiple />;
