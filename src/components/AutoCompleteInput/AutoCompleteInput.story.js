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
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs/react';

import { uniqueId } from '../../util/id';

import docs from './AutoCompleteInput.docs.mdx';
import AutoCompleteInput from './AutoCompleteInput';
import Label from '../Label';
import Text from '../Text';

export default {
  title: 'Forms/Input/AutoCompleteInput',
  component: AutoCompleteInput,
  parameters: {
    docs: { page: docs },
    jest: ['AutoCompleteInput']
  }
};

const options = [
  'Apple',
  'Banana',
  'Cranberries',
  'Pitaya (Dragonfruit)',
  'Kiwi',
  'Mango',
  'Passion fruit',
  'Watermelon'
];

// Inputs always need labels for accessibility.
const AutoCompleteInputWithLabel = props => {
  const id = uniqueId();
  return (
    <Label htmlFor={id}>
      Label
      <AutoCompleteInput {...props} id={id} />
    </Label>
  );
};

export const base = () => (
  <AutoCompleteInputWithLabel
    items={options}
    onChange={action('handleChange')}
    onInputValueChange={action('handleInputValueChange')}
    clearOnSelect={boolean('clearOnSelect', false)}
  />
);

export const customItems = () => {
  const items = options.map(value => ({
    value,
    children: (
      <Text size={Text.GIGA} bold noMargin>
        {value}
      </Text>
    )
  }));
  return (
    <AutoCompleteInputWithLabel
      items={items}
      onChange={action('handleChange')}
      onInputValueChange={action('handleInputValueChange')}
      clearOnSelect={boolean('clearOnSelect', false)}
    />
  );
};

export const asyncItems = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [items, setItems] = useState([]);

  const handleInputValueChange = () =>
    setTimeout(() => {
      setItems(options);
    }, 500);

  return (
    <AutoCompleteInputWithLabel
      items={items}
      onChange={action('handleChange')}
      onInputValueChange={handleInputValueChange}
      clearOnSelect={boolean('clearOnSelect', false)}
    />
  );
};
