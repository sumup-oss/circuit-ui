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
import { action } from '@storybook/addon-actions';

import { Checkbox, CheckboxProps } from './Checkbox';
import docs from './Checkbox.docs.mdx';

export default {
  title: 'Forms/Checkbox',
  component: Checkbox,
  parameters: {
    docs: { page: docs },
  },
  argTypes: {
    name: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

const CheckboxWithState = ({
  checked: initial = false,
  children,
  ...props
}: CheckboxProps) => {
  const [checked, setChecked] = useState(initial);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    action('Checkbox clicked')(event);
    setChecked((prev) => !prev);
  };
  return (
    <Checkbox {...props} checked={checked} onChange={handleChange}>
      {children || (checked ? 'Checked' : 'Unchecked')}
    </Checkbox>
  );
};

export const Base = (args: CheckboxProps) => <CheckboxWithState {...args} />;

Base.args = {
  name: 'base',
  value: 'true',
};

export const Invalid = (args: CheckboxProps) => {
  const [checked, setChecked] = useState(false);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    action('Checkbox clicked')(event);
    setChecked((prev) => !prev);
  };
  const invalid = !checked;
  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={handleChange}
      validationHint={invalid ? args.validationHint : undefined}
      invalid={invalid}
    >
      {checked ? 'Checked' : 'Unchecked'}
    </Checkbox>
  );
};

Invalid.args = {
  name: 'invalid',
  value: 'true',
  validationHint: 'This field is required.',
};

export const Disabled = (args: CheckboxProps) => (
  <CheckboxWithState {...args} />
);

Disabled.args = {
  name: 'disabled',
  value: 'true',
  disabled: true,
};

export const Multiple = (args: CheckboxProps) => (
  <>
    <CheckboxWithState {...args} value="apples" name="fruits">
      Apples
    </CheckboxWithState>
    <CheckboxWithState {...args} value="bananas" name="fruits">
      Bananas
    </CheckboxWithState>
    <CheckboxWithState {...args} value="oranges" name="fruits">
      Oranges
    </CheckboxWithState>
  </>
);
