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

import RadioButtonGroup from '../RadioButtonGroup';

import { RadioButton, RadioButtonProps } from './RadioButton';

export default {
  title: 'Forms/RadioButton',
  component: RadioButton,
  subcomponents: { RadioButtonGroup },
  argTypes: {
    label: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

const RadioButtonWithState = ({
  checked: initial,
  label,
  ...props
}: RadioButtonProps) => {
  const [checked, setChecked] = useState(initial);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  return (
    <RadioButton
      {...props}
      checked={checked}
      onChange={handleChange}
      label={label || (checked ? 'Checked' : 'Unchecked')}
    />
  );
};

export const Base = (args: RadioButtonProps) => (
  <RadioButtonWithState {...args} />
);

Base.args = {
  name: 'base',
  value: 'true',
};

export const Invalid = (args: RadioButtonProps) => (
  <RadioButtonWithState {...args} />
);

Invalid.args = {
  label: 'Invalid',
  name: 'invalid',
  value: 'true',
  invalid: true,
};

export const Disabled = (args: RadioButtonProps) => (
  <RadioButtonWithState {...args} />
);

Disabled.args = {
  label: 'Disabled',
  name: 'disabled',
  value: 'true',
  disabled: true,
};
