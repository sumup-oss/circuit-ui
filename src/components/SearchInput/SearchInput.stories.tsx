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

import { SearchInput, SearchInputProps } from './SearchInput';
import docs from './SearchInput.docs.mdx';

export default {
  title: 'Forms/Input/SearchInput',
  component: SearchInput,
  parameters: {
    docs: { page: docs },
  },
  argTypes: {
    placeholder: { control: 'text' },
  },
};

const baseArgs = {
  placeholder: 'Type a word...',
  label: 'Search',
};

export const Base = (args: SearchInputProps) => <SearchInput {...args} />;

Base.args = baseArgs;

export const Disabled = (args: SearchInputProps) => <SearchInput {...args} />;

Disabled.args = { ...baseArgs, disabled: true };

export const Clearable = (args: SearchInputProps) => {
  const [value, setValue] = useState('');

  const handleChange = ({
    target: { value: inputValue },
  }: ChangeEvent<HTMLInputElement>) => {
    setValue(inputValue);
  };

  const handleClear = () => {
    setValue('');
  };

  return (
    <SearchInput
      {...args}
      value={value}
      onClear={handleClear}
      onChange={handleChange}
    />
  );
};

Clearable.args = baseArgs;
