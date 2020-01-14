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
import { boolean } from '@storybook/addon-knobs/react';

import docs from './Selector.docs.mdx';
import Selector from './Selector';

export default {
  title: 'Forms/Selector',
  component: Selector,
  parameters: {
    docs: { page: docs },
    jest: ['Selector']
  }
};

/* eslint-disable react/prop-types */
const SelectorsWithState = props => {
  const [selected, setSelected] = useState(0);

  const handleChange = index => e => {
    setSelected(index);
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <>
      <Selector
        {...props}
        selected={selected === 0}
        onClick={handleChange(0)}
      />
      <Selector
        {...props}
        selected={selected === 1}
        onClick={handleChange(1)}
      />
    </>
  );
};

export const base = () => (
  <SelectorsWithState disabled={boolean('Disabled', false)}>
    Select me!
  </SelectorsWithState>
);

export const selected = () => <Selector selected>I am selected!</Selector>;

export const disabled = () => (
  <Selector disabled>I cannot be selected</Selector>
);
