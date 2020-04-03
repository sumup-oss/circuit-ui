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

import React, { useState } from 'react';

import SelectorGroup from './SelectorGroup';

export default {
  title: 'Forms/Selector/SelectorGroup',
  component: SelectorGroup,
  parameters: {
    jest: ['SelectorGroup']
  }
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
const SelectorGroupWithState = ({ children, ...props }) => {
  const [value, setValue] = useState(props.multiple ? [] : '');
  const handleChange = event => {
    event.persist();
    setValue(prev => {
      if (!props.multiple) {
        return event.target.value;
      }
      return prev.includes(event.target.value)
        ? prev.filter(v => v !== event.target.value)
        : [...prev, event.target.value];
    });
  };
  return (
    <SelectorGroup
      {...props}
      value={value}
      onChange={handleChange}
      label="Choose your favourite fruit"
    />
  );
};
/* eslint-enable react/prop-types */

export const base = () => (
  <SelectorGroupWithState options={options} name="selector-group" />
);

export const multiple = () => (
  <SelectorGroupWithState options={options} name="selector-group" multiple />
);
