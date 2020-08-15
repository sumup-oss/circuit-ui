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
import { boolean, text } from '@storybook/addon-knobs';

import docs from './Selector.docs.mdx';
import { Selector, SelectorProps } from './Selector';

export default {
  title: 'Forms/Selector',
  component: Selector,
  parameters: {
    docs: { page: docs },
  },
};

/* eslint-disable react/prop-types */
const SelectorWithState = (props: Partial<SelectorProps>) => {
  const [checked, setChecked] = useState(props.checked || false);

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Selector
      value="default"
      {...props}
      checked={checked}
      onChange={toggleChecked}
    />
  );
};

export const base = () => (
  <SelectorWithState
    disabled={boolean('Disabled', false)}
    tracking={{ label: text('Tracking Label', 'trackingId') }}
  >
    Select me!
  </SelectorWithState>
);

export const selected = () => (
  <SelectorWithState checked>I am selected!</SelectorWithState>
);

export const disabled = () => (
  <SelectorWithState disabled>I cannot be selected</SelectorWithState>
);
