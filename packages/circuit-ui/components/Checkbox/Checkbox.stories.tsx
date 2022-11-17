/**
 * Copyright 2023, SumUp Ltd.
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

import { Checkbox, CheckboxProps } from './Checkbox';

export default {
  title: 'Forms/Checkbox',
  component: Checkbox,
  argTypes: {
    disabled: { control: 'boolean' },
  },
};

export const Base = (args: CheckboxProps) => <Checkbox {...args} />;

Base.args = {
  label: 'I have read and agree to the terms and conditions',
  name: 'consent',
  value: 'terms',
};

export const Validations = (args: CheckboxProps) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prevChecked) => !prevChecked);
  };

  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={handleChange}
      validationHint={
        checked
          ? undefined
          : 'Please accept the terms and conditions to continue'
      }
      invalid={!checked}
    />
  );
};

Validations.args = {
  label: 'I have read and agree to the terms and conditions',
  name: 'validations',
  value: 'terms',
};

export const Disabled = (args: CheckboxProps) => <Checkbox {...args} />;

Disabled.args = {
  label: 'Next day delivery',
  name: 'disabled',
  validationHint: 'Express shipping is unavailable in your region',
  disabled: true,
};

export const Indeterminate = (args: CheckboxProps) => (
  <Checkbox
    {...args}
    ref={(el: HTMLInputElement) => {
      if (el) {
        // eslint-disable-next-line no-param-reassign
        el.indeterminate = true;
      }
    }}
  />
);

Indeterminate.args = {
  'name': 'indeterminate',
  'value': 'any value',
  'aria-checked': 'mixed',
};
