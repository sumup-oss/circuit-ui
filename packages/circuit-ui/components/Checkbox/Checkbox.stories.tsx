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

import { useState, type ChangeEvent } from 'react';

import { Checkbox, type CheckboxProps } from './Checkbox.js';

export default {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['status:stable'],
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

export const Indeterminate = (args: {
  label: string;
  name: string;
  initialValues: CheckboxProps['value'][];
  parent: CheckboxProps;
  options: CheckboxProps[];
}) => {
  const { label, name, initialValues, parent, options } = args;
  const [values, setValues] = useState(initialValues);

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value;

    setValues((prevValues) =>
      prevValues.includes(eventValue)
        ? prevValues.filter((v) => v !== eventValue)
        : prevValues.concat(eventValue),
    );
  };

  const handleParentChange = () => {
    setValues((prevValues) =>
      prevValues.length === options.length
        ? []
        : options.map((option) => option.value),
    );
  };

  const someChecked = options.some((option) => values.includes(option.value));
  const allChecked = options.every((option) => values.includes(option.value));

  return (
    <fieldset name={name} style={{ border: 'none', margin: 0, padding: 0 }}>
      <legend
        style={{
          display: 'block',
          marginBottom: 'var(--cui-spacings-bit)',
          fontSize: 'var(--cui-body-s-font-size)',
          lineHeight: 'var(--cui-body-s-line-height)',
          padding: 0,
        }}
      >
        {label}
      </legend>
      <Checkbox
        {...parent}
        onChange={handleParentChange}
        name={name}
        indeterminate={someChecked && !allChecked}
        checked={allChecked}
      />
      <ul style={{ listStyle: 'none', marginLeft: '26px' }}>
        {options.map((option) => (
          <li key={option.label}>
            <Checkbox
              {...option}
              onChange={handleOptionChange}
              name={name}
              checked={values.includes(option.value)}
            />
          </li>
        ))}
      </ul>
    </fieldset>
  );
};

Indeterminate.args = {
  label: 'Choose your favorite fruits',
  name: 'indeterminate',
  initialValues: ['mango'],
  parent: {
    label: 'All fruits',
    value: 'all',
  },
  options: [
    {
      label: 'Apple',
      value: 'apple',
    },
    {
      label: 'Banana',
      value: 'banana',
    },
    {
      label: 'Mango',
      value: 'mango',
    },
  ],
};
