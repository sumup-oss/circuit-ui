/**
 * Copyright 2022, SumUp Ltd.
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

import { useState, ChangeEvent } from 'react';

import { CheckboxGroup, CheckboxGroupProps } from './CheckboxGroup';

export default {
  title: 'Forms/Checkbox/CheckboxGroup',
  component: CheckboxGroup,
  argTypes: {
    name: { control: 'text' },
    value: { control: 'array' },
    options: { control: 'array' },
  },
};

const CheckboxGroupWithState = ({
  options,
  value: initialValue,
  ...props
}: CheckboxGroupProps) => {
  const [value, setValue] = useState<CheckboxGroupProps['value']>(initialValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const onChangeValue = event.target.value;
    if (value) {
      const index = value.indexOf(onChangeValue);
      if (index === -1) {
        setValue([...value, onChangeValue]);
      } else {
        setValue([...value.slice(0, index), ...value.slice(index + 1)]);
      }
    } else {
      setValue([event.target.value]);
    }
  };

  return (
    <CheckboxGroup
      {...props}
      options={options}
      value={value}
      onChange={handleChange}
    />
  );
};

export const Base = (args: CheckboxGroupProps) => (
  <CheckboxGroupWithState {...args} />
);
Base.args = {
  name: 'checkbox-group-base',
  label: 'Choose your favourite fruit',
  options: [
    {
      label: 'Apple',
      value: 'apple',
    },
    { label: 'Banana', value: 'banana' },
    { label: 'Mango', value: 'mango' },
  ],
};

export const Preselected = (args: CheckboxGroupProps) => (
  <CheckboxGroupWithState {...args} />
);
Preselected.args = {
  name: 'checkbox-group-preselected',
  label: 'Choose your favourite fruit',
  value: ['banana', 'mango'],
  options: [
    {
      label: 'Apple',
      value: 'apple',
    },
    { label: 'Banana', value: 'banana' },
    { label: 'Mango', value: 'mango' },
  ],
};

export const PartialyDisabled = (args: CheckboxGroupProps) => (
  <CheckboxGroupWithState {...args} />
);
PartialyDisabled.args = {
  name: 'checkbox-group-partially disabled',
  label: 'Choose your favourite fruit',
  options: [
    {
      label: 'Apple',
      value: 'apple',
      disabled: true,
    },
    { label: 'Banana', value: 'banana', disabled: true },
    { label: 'Mango', value: 'mango', disabled: false },
  ],
};

export const FullyDisabled = (args: CheckboxGroupProps) => (
  <CheckboxGroupWithState {...args} />
);
FullyDisabled.args = {
  name: 'checkbox-group-fully-disabled',
  label: 'Choose your favourite fruit',
  disabled: true,
  options: [
    {
      label: 'Apple',
      value: 'apple',
    },
    { label: 'Banana', value: 'banana' },
    { label: 'Mango', value: 'mango' },
  ],
};

const CheckboxGroupWithStateInvalid = ({
  options: defaultOptions,
  value: initialValue,
  validationHint,
  ...props
}: CheckboxGroupProps) => {
  const [value, setValue] = useState<CheckboxGroupProps['value']>(initialValue);

  const requiredFields = ['banana', 'apple'];

  const initialOptions: CheckboxGroupProps['options'] = defaultOptions.map(
    (option) => {
      const newOption = { ...option };
      if (option.value && requiredFields.includes(option.value?.toString())) {
        newOption.invalid = true;
      }
      return newOption;
    },
  );

  const [options, setOptions] =
    useState<CheckboxGroupProps['options']>(initialOptions);

  const isInvalid = options.some((option) => option.invalid);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const onChangeValue = event.target.value;
    if (value) {
      const index = value.indexOf(onChangeValue);
      if (index === -1) {
        setValue([...value, onChangeValue]);
      } else {
        setValue([...value.slice(0, index), ...value.slice(index + 1)]);
      }
    } else {
      setValue([event.target.value]);
    }

    if (requiredFields.includes(onChangeValue)) {
      setOptions(
        options.map((option) => {
          const newOption = { ...option };
          if (newOption.value === onChangeValue) {
            newOption.invalid = !newOption.invalid;
          }
          return newOption;
        }),
      );
    }
  };

  return (
    <CheckboxGroup
      {...props}
      options={options}
      value={value}
      invalid={isInvalid}
      onChange={handleChange}
      validationHint={isInvalid ? validationHint : undefined}
    />
  );
};

export const Invalid = (args: CheckboxGroupProps) => (
  <CheckboxGroupWithStateInvalid {...args} />
);
Invalid.args = {
  name: 'checkbox-group-invalid',
  label: 'Choose your favourite fruit',
  validationHint: 'Some fields are required.',
  options: [
    {
      label: 'Apple',
      value: 'apple',
    },
    { label: 'Banana', value: 'banana' },
    { label: 'Mango', value: 'mango' },
  ],
};

export const Valid = (args: CheckboxGroupProps) => (
  <CheckboxGroupWithState {...args} />
);
Valid.args = {
  name: 'radio-button-group',
  label: 'Choose your favourite fruit',
  options: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Mango', value: 'mango' },
  ],
  showValid: true,
  validationHint: 'You chose an option.',
};

export const Warning = (args: CheckboxGroupProps) => (
  <CheckboxGroupWithState {...args} />
);
Warning.args = {
  name: 'radio-button-group',
  label: 'Choose your favourite fruit',
  options: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Mango', value: 'mango' },
  ],
  hasWarning: true,
  validationHint: 'This choice might cause errors.',
};
