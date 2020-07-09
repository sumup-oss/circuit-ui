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
import { text } from '@storybook/addon-knobs';

import docs from './Toggle.docs.mdx';
import { Toggle, ToggleProps } from './Toggle';

export default {
  title: 'Forms/Toggle',
  component: Toggle,
  parameters: {
    docs: { page: docs },
  },
};

const ToggleWithState = (props: Partial<ToggleProps>) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(prev => !prev);
  };

  return (
    <Toggle
      label="Short label"
      labelChecked="on"
      labelUnchecked="off"
      {...props}
      checked={checked}
      onChange={handleChange}
    />
  );
};

export const base = () => (
  <ToggleWithState
    label="Short label"
    tracking={{ label: text('Tracking Label', 'trackingId') }}
  />
);

export const withExplanation = () => (
  <ToggleWithState explanation="Some more detailed text of what this means" />
);
