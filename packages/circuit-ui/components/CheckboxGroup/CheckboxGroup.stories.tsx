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

import {
  CheckboxGroup,
  CheckboxGroupProps,
  CheckboxOptions,
} from './CheckboxGroup';

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
  value: initialValue = [],
  ...props
}: CheckboxGroupProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value;

    setValue((prevValue) => {
      if (prevValue.includes(eventValue)) {
        return prevValue.filter((v) => v !== eventValue);
      }
      return prevValue.concat(eventValue);
    });
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

const CheckboxGroupWithoutState = ({
  options,
  defaultValue,
  ...props
}: CheckboxGroupProps) => (
  <CheckboxGroup {...props} options={options} defaultValue={defaultValue} />
);

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
  value: initialValue = [],
  validationHint,
  requiredFields,
  ...props
}: CheckboxGroupProps & {
  requiredFields: CheckboxOptions['value'][];
}) => {
  const [value, setValue] = useState(initialValue);

  const initialOptions = defaultOptions.map((option) => {
    const newOption = { ...option };
    if (requiredFields.includes(newOption.value.toString())) {
      newOption.invalid = true;
    }
    return newOption;
  });

  const [options, setOptions] =
    useState<CheckboxGroupProps['options']>(initialOptions);

  const isInvalid = options.some((option) => option.invalid);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value;

    setValue((prevValue) => {
      if (prevValue.includes(eventValue)) {
        return prevValue.filter((v) => v !== eventValue);
      }
      return prevValue.concat(eventValue);
    });

    if (requiredFields.includes(eventValue)) {
      setOptions((prevOptions) =>
        prevOptions.map((option) => {
          const newOption = { ...option };
          if (newOption.value === eventValue) {
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

export const Invalid = (
  args: CheckboxGroupProps & {
    requiredFields: CheckboxOptions['value'][];
  },
) => <CheckboxGroupWithStateInvalid {...args} />;
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
  requiredFields: ['apple', 'banana'],
};

export const Valid = (args: CheckboxGroupProps) => (
  <CheckboxGroupWithState {...args} />
);
Valid.args = {
  name: 'checkbox-button-group',
  label: 'Choose your favourite fruit',
  value: ['banana'],
  options: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Mango', value: 'mango' },
  ],
  showValid: true,
  validationHint: 'You chose an option.',
};

export const ValidUncontrolled = (args: CheckboxGroupProps) => (
  <CheckboxGroupWithoutState {...args} />
);
ValidUncontrolled.args = {
  name: 'checkbox-button-group-uncontrolled',
  label: 'Choose your favourite fruit',
  defaultValue: ['banana'],
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
  name: 'checkbox-button-group',
  label: 'Choose your favourite fruit',
  value: ['banana'],
  options: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Mango', value: 'mango' },
  ],
  hasWarning: true,
  validationHint: 'This choice might cause errors.',
};
