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

import { useState } from 'react';

import { Stack } from '../../../../.storybook/components/index.js';

import { Toggle, type ToggleProps } from './Toggle.js';

export default {
  title: 'Forms/Toggle',
  component: Toggle,
};

const baseArgs = {
  label: 'Short label',
  disabled: false,
};

export const Base = (args: ToggleProps) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  return (
    <Stack vertical>
      <Toggle {...args} checked={checked} onChange={handleChange} />
      <Toggle {...args} checked={!checked} onChange={handleChange} />
    </Stack>
  );
};

Base.args = baseArgs;

export const WithDescription = (args: ToggleProps) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  return <Toggle {...args} checked={checked} onChange={handleChange} />;
};

WithDescription.args = {
  ...baseArgs,
  description: 'Some more detailed text of what this means',
};

export const Disabled = (args: ToggleProps) => (
  <Stack vertical>
    <Toggle {...args} />
    <Toggle {...args} checked />
  </Stack>
);

Disabled.args = {
  ...baseArgs,
  disabled: true,
};
