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
import { identity } from 'lodash/fp';

import { uniqueId } from '../../util/id';

import SearchInput from './SearchInput';
import docs from './SearchInput.docs.mdx';

export default {
  title: 'Forms/Input/SearchInput',
  component: SearchInput,
  parameters: {
    docs: { page: docs }
  }
};

// SearchInputs always need labels for accessibility.
const SearchInputWithLabel = props => {
  const id = uniqueId();
  return (
    <SearchInput placeholder="Search..." {...props} id={id} label="Search" />
  );
};

const SearchInputWithClear = props => {
  const id = uniqueId();
  const [value, setValue] = useState('');

  const handleChange = ({ target: { value: inputValue } }) => {
    setValue(inputValue);
  };

  const handleClear = () => {
    setValue('');
  };

  return (
    <div>
      <SearchInput
        {...props}
        id={id}
        value={value}
        onClear={handleClear}
        onChange={handleChange}
        placeholder="Search..."
        label="Label"
      />
    </div>
  );
};

export const base = () => <SearchInputWithLabel />;

export const disabled = () => <SearchInputWithLabel disabled />;

export const clearable = () => <SearchInputWithClear onClear={identity} />;
